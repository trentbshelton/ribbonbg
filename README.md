# ribbonbg

Animated RetroArch XMB ribbon as a Wayland wallpaper.

RetroArch's menu has a "ribbon" background: a sheet that slowly folds and
drifts across a color gradient. I wanted it as my desktop wallpaper on
Hyprland, but existing shader wallpaper tools only run full-screen fragment
shaders, and the ribbon is not one. It is a 64x64 vertex mesh that gets
bent in the vertex shader each frame and blended on top of the background.

ribbonbg is a fork of [shaderbg](https://git.sr.ht/~mstoeckl/shaderbg)
by mstoeckl. shaderbg draws a Shadertoy-style fragment shader on the
wlr-layer-shell background layer. This fork keeps that, and adds a second
pass that draws RetroArch's ribbon over it:

- the same 64x64 triangle-strip mesh RetroArch builds in `xmb.c`
- RetroArch's ribbon vertex and fragment shaders, unchanged
- RetroArch's blend mode (`GL_DST_COLOR, GL_ONE`), which brightens the
  background where the sheet folds
- RetroArch's clock rate (0.01 per frame at 60 fps), tied to real time so
  the speed stays the same at lower frame rates

Because of that blend mode the ribbon is invisible on pure black. The
background shader needs some color.

## Usage

    ribbonbg [--fps F] [--layer background|bottom|top|overlay] output background.frag

`output` is a monitor name, or `'*'` for all monitors. The background shader
uses the Shadertoy interface (`mainImage`, `iTime`, `iResolution`). Two are
included in `shaders/`: `electric_blue.frag` (RetroArch's default theme) and
`purple.frag`.

Example, capped at 30 fps to save battery:

    ribbonbg --fps 30 '*' shaders/electric_blue.frag

On a laptop with Intel UHD 620 graphics this uses about 2% CPU.

## Building

Needs meson, wayland, EGL and OpenGL.

    meson setup build
    ninja -C build

Works on compositors that support wlr-layer-shell (Hyprland, Sway, river,
and others).

## Credits

- shaderbg by mstoeckl, GPL-3.0
- the ribbon shaders and mesh layout come from
  [RetroArch](https://github.com/libretro/RetroArch), GPL-3.0

This fork is GPL-3.0 as well. See `COPYING`.
