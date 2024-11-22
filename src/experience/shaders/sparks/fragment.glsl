uniform sampler2D uTexture;
uniform vec3 uColor;

void main()
{
    vec2 coord = gl_PointCoord - vec2(0.5);
    float dist = length(coord) * 2.0;
    float brightness = 1.0 - smoothstep(0.0, 1.0, dist);
    brightness *= 2.0;

    float textureAlpha = texture(uTexture, gl_PointCoord).r;
    gl_FragColor = vec4(uColor * brightness, textureAlpha);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}