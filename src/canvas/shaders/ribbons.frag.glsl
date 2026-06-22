uniform vec3 uColor;
uniform float uTime;
varying vec2 vUv;

void main() {
  float edge = smoothstep(0.0, 0.15, vUv.x) * smoothstep(1.0, 0.85, vUv.x);
  float shimmer = 0.78 + sin(vUv.y * 12.0 - uTime * 1.5) * 0.22;
  gl_FragColor = vec4(uColor * shimmer, edge * 0.7);
}
