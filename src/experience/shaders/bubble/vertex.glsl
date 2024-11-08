out vec2 vUv;

void main() {
    vec4 worldPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * worldPosition;

    vUv = uv;
}


