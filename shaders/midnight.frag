// Dark slate gradient, for the white ribbon.
void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    vec2 uv = fragCoord / iResolution.xy;
    vec3 bottom = vec3(8.0, 9.0, 14.0) / 255.0;
    vec3 top = vec3(28.0, 31.0, 44.0) / 255.0;
    vec3 col = mix(bottom, top, uv.y);
    // Faint vignette to keep the corners deep
    col *= 1.0 - 0.35 * dot(uv - 0.5, uv - 0.5);
    fragColor = vec4(col, 1.0);
}
