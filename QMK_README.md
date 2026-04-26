# QMK × STM32 W17 Numpad

> 17-key numpad built on STM32 with QMK Firmware, custom PCB, WS2812 RGB matrix, and VIA/VIAL support.

---

## Overview

| Spec | Detail |
|------|--------|
| Keys | 17 (standard numpad layout) |
| MCU | STM32 (DFU bootloader) |
| Firmware | QMK Firmware |
| RGB | WS2812 addressable LEDs (RGB Matrix) |
| Interface | VIA / VIAL (no recompile needed) |
| Connection | USB (HID) |

---

## Features

- **Custom PCB** — designed with matrix scanning to minimize IO usage
- **2-layer keymap** — Layer 0 for numpad input, Layer 1 for RGB control via `LT()`
- **RGB Matrix** — per-key addressable lighting with mode, hue, saturation, brightness, and speed control
- **VIA / VIAL support** — remap keys in real time without reflashing
- **Reproducible build flow** — compile → flash via DFU → test

---

## File Structure

```
keyboards/morempty/w17/
├── config.h          # Hardware config (matrix pins, RGB settings, brightness limit)
├── w17.h             # LAYOUT_numpad_17 macro definition
├── w17.c             # RGB Matrix LED position map
├── w17.json          # QMK info file (VIA/VIAL metadata)
└── keymaps/
    └── default/
        └── keymap.c  # Layer 0 & Layer 1 key definitions
```

---

## Keymap

### Layer 0 — Numpad

```
┌───┬───┬───┬───┐
│NLk│ / │ * │ - │
├───┼───┼───┼───┤
│ 7 │ 8 │ 9 │   │
├───┼───┼───┤ + │
│ 4 │ 5 │ 6 │   │
├───┼───┼───┼───┤
│ 1 │ 2 │ 3 │   │
├───┴───┼───┤Ent│
│   0   │ . │   │
└───────┴───┴───┘
```

> Hold `LT()` key to switch to Layer 1. Tap for normal input.

### Layer 1 — RGB Control

| Key | Function |
|-----|----------|
| Mode + | `RM_NEXT` — next RGB animation |
| Mode − | `RM_PREV` — previous RGB animation |
| Hue + / − | Adjust hue |
| Sat + / − | Adjust saturation |
| Val + / − | Adjust brightness |
| Spd + / − | Adjust animation speed |

---

## RGB Configuration

```c
// config.h
#define RGB_MATRIX_MAXIMUM_BRIGHTNESS 120   // prevent overcurrent & overheating
#define RGB_MATRIX_DEFAULT_MODE RGB_MATRIX_BREATHING
```

RGB Matrix is used instead of legacy RGBLIGHT for per-key control support.

---

## Build & Flash

### Prerequisites

- [QMK Firmware](https://github.com/qmk/qmk_firmware) set up locally (`qmk setup`)
- STM32 DFU-compatible USB bootloader on the MCU

### Copy keyboard files

```bash
# Copy this keyboard folder into your local QMK installation
cp -r keyboards/morempty/w17  ~/qmk_firmware/keyboards/morempty/w17
```

### Compile

```bash
qmk compile -kb morempty/w17 -km default
```

### Flash

1. Enter DFU mode: hold BOOT button while plugging in USB (or press RESET while BOOT is held)
2. Flash:

```bash
qmk flash -kb morempty/w17 -km default
```

### Enable VIA / VIAL

Open [VIA](https://www.caniusevia.com/) or [VIAL](https://get.vial.today/) and load the keyboard automatically (no sideload needed if VIA JSON is embedded).

---

## Hardware

- **Matrix**: standard row/column scanning, wired to STM32 GPIO
- **RGB**: WS2812 addressable LEDs driven from a single data pin
- **Decoupling caps**: 100nF per LED power rail for stability
- **PCB**: designed in KiCAD / Altium Designer (schematics not included in this repo)

---

## License

This project's custom keyboard files (`keyboards/morempty/w17/`) are released under the [MIT License](LICENSE).

QMK Firmware itself is licensed under [GPL-2.0](https://github.com/qmk/qmk_firmware/blob/master/LICENSE).

---

## Author

**江嘉元 (Jcsk7049)**
- GitHub: [@Jcsk7049](https://github.com/Jcsk7049)
- Personal site: [personal-website-1kf.pages.dev](https://personal-website-1kf.pages.dev)
