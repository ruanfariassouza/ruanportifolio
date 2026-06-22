import { clamp, lerp } from './math'

export default class VirtualScroll {
  constructor({ wheelMultiplier = 1, touchMultiplier = 1.8 } = {}) {
    this.target = 0
    this.current = 0
    this.wheelMultiplier = wheelMultiplier
    this.touchMultiplier = touchMultiplier
    this.touchY = 0
    this.max = 0
    this.raf = null
    this.running = false

    this.onWheel = this.onWheel.bind(this)
    this.onTouchStart = this.onTouchStart.bind(this)
    this.onTouchMove = this.onTouchMove.bind(this)
    this.onResize = this.onResize.bind(this)
    this.tick = this.tick.bind(this)

    this.init()
  }

  init() {
    this.onResize()
    document.body.style.overflow = 'hidden'
    window.addEventListener('wheel', this.onWheel, { passive: false })
    window.addEventListener('touchstart', this.onTouchStart, { passive: true })
    window.addEventListener('touchmove', this.onTouchMove, { passive: false })
    window.addEventListener('resize', this.onResize)
    this.running = true
    this.tick()
  }

  onResize() {
    this.max = Math.max(0, document.documentElement.scrollHeight - window.innerHeight)
    this.target = clamp(this.target, 0, this.max)
  }

  onWheel(event) {
    event.preventDefault()
    this.target = clamp(this.target + event.deltaY * this.wheelMultiplier, 0, this.max)
  }

  onTouchStart(event) {
    this.touchY = event.touches[0]?.clientY ?? 0
  }

  onTouchMove(event) {
    const nextY = event.touches[0]?.clientY ?? this.touchY
    const delta = (this.touchY - nextY) * this.touchMultiplier
    this.touchY = nextY
    this.target = clamp(this.target + delta, 0, this.max)
    event.preventDefault()
  }

  update() {
    this.current = lerp(this.current, this.target, 0.075)
    if (Math.abs(this.current - this.target) < 0.01) this.current = this.target
    window.dispatchEvent(new CustomEvent('virtualscroll', {
      detail: { current: this.current, target: this.target },
    }))
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
    document.body.style.overflow = ''
  }
}
