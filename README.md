# Lumen Desktop

Browser desktop mock for entertainment.

Live: https://carterobviously-creator.github.io/grok-macos/

Not macOS. Not Apple. Not Siri. Not Apple Intelligence. Not the App Store.

Icons and the ridge wallpaper are original. App windows load separate HTML pages under `pages/`. The boot screen fetches `data/tiny-mind.json`, a tiny local phrase table. Ask (Aura) can open those apps, save notes, and do light math. Saying "hey siri" is accepted only as a wake phrase for this local helper.

## Pages

- `index.html` desktop shell
- `pages/*.html` Files, Notes, Calculator, Web, Gallery, Settings, Calendar, Music, Photos, Mail, Maps, Terminal, Weather, Reminders
- `css/gate27.css` glass layer
- `js/gate27.js` page windows and boot helper
