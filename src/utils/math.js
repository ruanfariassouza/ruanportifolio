export const lerp = (a, b, t) => a + (b - a) * t

export const clamp = (val, min, max) => Math.min(Math.max(val, min), max)

export const normalize = (val, min, max) => {
  if (max === min) return 0
  return (val - min) / (max - min)
}

export const mapRange = (val, inMin, inMax, outMin, outMax) =>
  outMin + normalize(val, inMin, inMax) * (outMax - outMin)
