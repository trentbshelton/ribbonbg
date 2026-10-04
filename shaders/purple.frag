// Vertical purple gradient, sampled from Trent's reference image.
void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    float t = fragCoord.y / iResolution.y;
    vec3 bottom = vec3(55.0, 34.0, 55.0) / 255.0;
    vec3 top = vec3(126.0, 77.0, 126.0) / 255.0;
    fragColor = vec4(mix(bottom, top, t), 1.0);
}
