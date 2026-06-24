import { gsap } from './gsap'

const ease = 'expo.out'
const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

function showImmediately(targets) {
  return gsap.set(targets, { y: 0, autoAlpha: 1, clearProps: 'transform' })
}

export function revealHero(targets, options = {}) {
  if (reduceMotion()) return showImmediately(targets)
  return gsap.fromTo(targets, { y: options.y ?? 80, autoAlpha: 0 }, {
    y: 0,
    autoAlpha: 1,
    duration: options.duration ?? 1.15,
    stagger: options.stagger ?? 0.12,
    delay: options.delay ?? 0,
    ease,
  })
}

export function revealSection(targets, trigger, options = {}) {
  if (reduceMotion()) return showImmediately(targets)
  return gsap.fromTo(targets, { y: options.y ?? 48, autoAlpha: 0 }, {
    y: 0,
    autoAlpha: 1,
    duration: options.duration ?? 0.95,
    stagger: options.stagger ?? 0.12,
    ease,
    scrollTrigger: {
      trigger,
      start: options.start ?? 'top 72%',
      invalidateOnRefresh: true,
    },
  })
}

export function revealCard(targets, trigger, options = {}) {
  if (reduceMotion()) return showImmediately(targets)
  return gsap.fromTo(targets, { y: options.y ?? 54, autoAlpha: 0 }, {
    y: 0,
    autoAlpha: 1,
    duration: options.duration ?? 0.95,
    stagger: options.stagger ?? 0.09,
    delay: options.delay ?? 0.1,
    ease,
    scrollTrigger: {
      trigger,
      start: options.start ?? 'top 82%',
      invalidateOnRefresh: true,
    },
  })
}
