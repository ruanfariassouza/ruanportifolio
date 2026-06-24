import VirtualScroll from './virtualScroll'
import { ScrollTrigger } from './gsap'

let instance = null
let handleRefresh = null

export function initSmoothScroll(options = {}) {
  if (instance) return instance
  if (typeof window === 'undefined') return null
  if (window.matchMedia('(prefers-reduced-motion: reduce), (max-width: 767px), (pointer: coarse)').matches) return null

  const scroller = new VirtualScroll(options)
  scroller.onUpdate = () => ScrollTrigger.update()
  scroller.start()

  ScrollTrigger.defaults({ scroller: document.documentElement })

  ScrollTrigger.scrollerProxy(document.documentElement, {
    scrollTop(value) {
      if (arguments.length) scroller.setScroll(value)
      return scroller.current
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      }
    },
    pinType: 'fixed',
  })

  handleRefresh = () => scroller.onResize()
  ScrollTrigger.addEventListener('refresh', handleRefresh)
  ScrollTrigger.refresh()

  instance = scroller
  return instance
}

export function getSmoothScroll() {
  return instance
}

export function setInfiniteLoopElement(element) {
  instance?.setLoopElement(element)
  ScrollTrigger.refresh()
}

export function clearInfiniteLoopElement() {
  instance?.setLoopElement(null)
  ScrollTrigger.refresh()
}

export function destroySmoothScroll() {
  if (!instance) return
  ScrollTrigger.defaults({ scroller: window })
  ScrollTrigger.scrollerProxy(document.documentElement, {})
  if (handleRefresh) ScrollTrigger.removeEventListener('refresh', handleRefresh)
  instance.destroy()
  instance = null
  handleRefresh = null
  ScrollTrigger.refresh()
}

export function resetScroll(immediate = true) {
  if (instance) {
    instance.setScroll(0, immediate)
    return
  }
  window.scrollTo(0, 0)
}

export function scrollToElement(element, immediate = false) {
  if (!element) return
  const top = (instance?.current ?? window.scrollY) + element.getBoundingClientRect().top
  if (instance) {
    instance.setScroll(top, immediate)
    return
  }
  element.scrollIntoView({ behavior: immediate ? 'auto' : 'smooth', block: 'start' })
}
