// RetroArch XMB "Electric Blue" background gradient (menu/drivers/xmb.c).
// Corner colors: bottom-left, bottom-right, top-left, top-right.
void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    vec2 uv = fragCoord / iResolution.xy;
    vec3 bl = vec3(1.0, 2.0, 67.0) / 255.0;
    vec3 br = vec3(1.0, 73.0, 183.0) / 255.0;
    vec3 tl = vec3(1.0, 93.0, 194.0) / 255.0;
    vec3 tr = vec3(3.0, 162.0, 254.0) / 255.0;
    vec3 col = mix(mix(bl, br, uv.x), mix(tl, tr, uv.x), uv.y);
    fragColor = vec4(col, 1.0);
}
