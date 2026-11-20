// Monochrome background for the white ribbon (matches the homelab map / pit wall pages).
// Pure neutral black at the bottom rising to a soft charcoal, with a deep vignette
// and a touch of noise dither so the gradient never bands.
float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    vec2 uv = fragCoord / iResolution.xy;
    vec3 bottom = vec3(0.0);
    vec3 top = vec3(22.0) / 255.0;
    vec3 col = mix(bottom, top, smoothstep(0.0, 1.0, uv.y));
    col *= 1.0 - 0.55 * dot(uv - 0.5, uv - 0.5);
    col += (hash(fragCoord) - 0.5) / 255.0;
    fragColor = vec4(col, 1.0);
}
