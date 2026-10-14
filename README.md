# ribbonbg

Animated RetroArch XMB ribbon as a Wayland wallpaper.

RetroArch's menu has a "ribbon" background: a sheet that slowly folds and
drifts across a color gradient. I wanted it as my desktop wallpaper on
Hyprland, but existing shader wallpaper tools only run full-screen fragment
shaders, and the ribbon is not one. It is a vertex mesh that gets bent in
the vertex shader each frame and blended on top of the background.

ribbonbg is a fork of [shaderbg](https://git.sr.ht/~mstoeckl/shaderbg)
by mstoeckl. shaderbg draws a Shadertoy-style fragment shader on the
wlr-layer-shell background layer. This fork keeps that, and adds a second
pass that draws a ribbon based on RetroArch's over it:

- RetroArch's ribbon displacement (the vertex shader math is the same)
- RetroArch's clock rate (0.01 per frame at 60 fps), tied to real time so
  the speed stays the same at lower frame rates
- a denser mesh (128x128 instead of RetroArch's 64x64)
- smooth shading: normals are computed per vertex and interpolated, where
  RetroArch uses flat per-pixel `dFdx`/`dFdy` normals that look faceted
- a translucent white ribbon, blended additively (`GL_SRC_ALPHA, GL_ONE`)
  so overlapping folds glow. RetroArch's blend (`GL_DST_COLOR, GL_ONE`)
  only brightens the background, so it disappears on dark colors. This one
  works on any background, dark ones included.

The original RetroArch-exact version is commit `ce690b9`.

## Usage

    ribbonbg [--fps F] [--layer background|bottom|top|overlay] output background.frag

`output` is a monitor name, or `'*'` for all monitors. The background shader
uses the Shadertoy interface (`mainImage`, `iTime`, `iResolution`). Three
are included in `shaders/`: `midnight.frag` (dark slate), `electric_blue.frag`
(RetroArch's default theme) and `purple.frag`.

Example, capped at 30 fps to save battery:

    ribbonbg --fps 30 '*' shaders/midnight.frag

On a laptop with Intel UHD 620 graphics this uses about 2-3% CPU.

## Building

Needs meson, wayland, EGL and OpenGL.

    meson setup build
    ninja -C build

Works on compositors that support wlr-layer-shell (Hyprland, Sway, river,
and others).

## Credits

- shaderbg by mstoeckl, GPL-3.0
- the ribbon displacement shader and mesh layout are adapted from
  [RetroArch](https://github.com/libretro/RetroArch), GPL-3.0

This fork is GPL-3.0 as well. See `COPYING`.
