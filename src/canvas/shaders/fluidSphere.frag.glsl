uniform float uTime;
uniform vec2 uMouse;
uniform vec2 uResolution;
uniform vec3 uColor1;
uniform vec3 uColor2;

varying vec3 vNormal;
varying vec2 vUv;

void main() {
  float fresnel = pow(1.0 - max(dot(normalize(vNormal), vec3(0.0, 0.0, 1.0)), 0.0), 2.0);
  float mouse = length(uMouse) * 0.5;
  float pulse = sin(uTime * 0.65 + vUv.x * 5.0) * 0.07;
  vec3 color = mix(uColor1, uColor2, clamp(vUv.y + mouse + pulse, 0.0, 1.0));
  color = mix(color, vec3(0.02, 0.02, 0.05), fresnel * 0.8);
  color *= 0.55;
  gl_FragColor = vec4(color, 1.0);
}
