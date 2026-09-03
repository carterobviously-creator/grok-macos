# Lumen Desktop

A **browser mock** of a glass-style desktop. Entertainment only.

**Not macOS. Not Apple. Not Siri. Not Apple Intelligence. Not the App Store.**

Apple product names, official icons, official wallpapers, Liquid Glass, and system chrome are copyrighted. This project does **not** use them. Icons are original SVGs. Wallpaper is an original CSS gradient. Aura is a local phrase helper loaded at boot. Settings can turn on an optional third-party text demo for longer answers. It is not a product AI and not an Apple assistant.

Live: https://carterobviously-creator.github.io/grok-macos/

About page: [about.html](about.html)

## Features

- Boot animation that loads a tiny local phrase book + lock screen + desktop icons
- Glass surfaces with blur, specular edge, and a tint slider
- Draggable / resizable windows with close / minimize / zoom
- Dock with hover lift and open indicators
- Launchpad (`F4` or dock grid)
- Mission Control (`F3`)
- Files, Notes, Calculator, Web, Settings, Gallery
- Calendar, Music, Photos, Terminal, Mail, Maps, Stickies
- Weather, Clock, Writer, Reminders, Messages, Contacts, Pulse
- Preview, Voice Pad, Phone, Flows, Camera, Sketch, Radio, Board
- Spotlight (`⌘K` / `Ctrl+K`)
- Working menubar dropdowns
- Control Center and notification drawer
- Aura helper: local phrase book, speech APIs, optional demo text API

## Run locally

Open `index.html` in a browser, or serve the folder.

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.
