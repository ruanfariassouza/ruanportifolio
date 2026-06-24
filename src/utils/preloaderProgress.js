const MIN_DURATION_MS = 1200

export function trackInitialLoad(onProgress) {
  const started = performance.now()
  const weights = { fonts: 0.42, home: 0.48, time: 0.1 }
  const status = { fonts: 0, home: 0, time: 0 }
  let intervalId

  const report = () => {
    status.time = Math.min(1, (performance.now() - started) / MIN_DURATION_MS)
    const value = (
      status.fonts * weights.fonts
      + status.home * weights.home
      + status.time * weights.time
    ) * 100
    onProgress(Math.min(99, Math.round(value)))
  }

  const fontsPromise = document.fonts?.ready ?? Promise.resolve()
  const homePromise = import('../pages/Home')

  intervalId = window.setInterval(report, 48)

  return Promise.all([
    fontsPromise.then(() => { status.fonts = 1 }),
    homePromise.then(() => { status.home = 1 }),
    new Promise((resolve) => window.setTimeout(resolve, MIN_DURATION_MS)),
  ]).then(() => {
    window.clearInterval(intervalId)
    onProgress(100)
  })
}