import { clamp, lerp } from './math'

export default class VirtualScroll {
  constructor({
    wheelMultiplier = 0.9,
    touchMultiplier = 1.8,
    lerpFactor = 0.08,
  } = {}) {
    this.target = 0
    this.current = 0
    this.wheelMultiplier = wheelMultiplier
    this.touchMultiplier = touchMultiplier
    this.lerpFactor = lerpFactor
    this.loopHeight = 0
    this.loopElement = null
    this.touchY = 0
    this.max = 0
    this.raf = null
    this.running = false
    this.onUpdate = null

    this.onWheel = this.onWheel.bind(this)
    this.onTouchStart = this.onTouchStart.bind(this)
    this.onTouchMove = this.onTouchMove.bind(this)
    this.onResize = this.onResize.bind(this)
    this.tick = this.tick.bind(this)
  }

  setLoopElement(element) {
    this.loopElement = element
    this.loopHeight = element?.offsetHeight ?? 0
    this.onResize()
  }

  start() {
    if (this.running) return
    this.onResize()
    document.documentElement.classList.add('is-smooth-scroll')
    document.body.classList.add('is-smooth-scroll')
    window.addEventListener('wheel', this.onWheel, { passive: false })
    window.addEventListener('touchstart', this.onTouchStart, { passive: true })
    window.addEventListener('touchmove', this.onTouchMove, { passive: false })
    window.addEventListener('resize', this.onResize)
    this.running = true
    this.tick()
  }

  hasLoop() {
    return this.loopHeight > 0
  }

  normalizeLoopPosition() {
    if (!this.hasLoop()) return
    while (this.current >= this.loopHeight) {
      this.current -= this.loopHeight
      this.target -= this.loopHeight
    }
    while (this.current < 0) {
      this.current += this.loopHeight
      this.target += this.loopHeight
    }
  }

  onResize() {
    if (this.loopElement) this.loopHeight = this.loopElement.offsetHeight

    if (this.hasLoop()) {
      this.max = this.loopHeight
    } else {
      this.max = Math.max(0, document.documentElement.scrollHeight - window.innerHeight)
    }

    if (this.hasLoop()) {
      this.normalizeLoopPosition()
    } else {
      this.target = clamp(this.target, 0, this.max)
      this.current = clamp(this.current, 0, this.max)
    }

    this.applyScroll()
  }

  applyScroll() {
    window.scrollTo(0, this.current)
    this.onUpdate?.(this.current)
  }

  setScroll(value, immediate = false) {
    if (this.hasLoop()) {
      let next = value
      while (next >= this.loopHeight) next -= this.loopHeight
      while (next < 0) next += this.loopHeight
      this.target = next
    } else {
      this.target = clamp(value, 0, this.max)
    }

    if (immediate) {
      this.current = this.target
      this.applyScroll()
    }
  }

  applyDelta(delta) {
    if (this.hasLoop()) {
      this.target += delta
      return
    }
    this.target = clamp(this.target + delta, 0, this.max)
  }

  onWheel(event) {
    event.preventDefault()
    this.applyDelta(event.deltaY * this.wheelMultiplier)
  }

  onTouchStart(event) {
    this.touchY = event.touches[0]?.clientY ?? 0
  }

  onTouchMove(event) {
    const nextY = event.touches[0]?.clientY ?? this.touchY
    const delta = (this.touchY - nextY) * this.touchMultiplier
    this.touchY = nextY
    this.applyDelta(delta)
    event.preventDefault()
  }

  update() {
    this.current = lerp(this.current, this.target, this.lerpFactor)
    if (Math.abs(this.current - this.target) < 0.08) this.current = this.target
    this.normalizeLoopPosition()
    this.applyScroll()
    return this.current
  }

  tick() {
    if (!this.running) return
    this.update()
    this.raf = requestAnimationFrame(this.tick)
  }

  destroy() {
    this.running = false
    cancelAnimationFrame(this.raf)
    window.removeEventListener('wheel', this.onWheel)
    window.removeEventListener('touchstart', this.onTouchStart)
    window.removeEventListener('touchmove', this.onTouchMove)
    window.removeEventListener('resize', this.onResize)
    document.documentElement.classList.remove('is-smooth-scroll')
    document.body.classList.remove('is-smooth-scroll')
    document.body.style.overflow = ''
    this.loopElement = null
    this.loopHeight = 0
  }
}