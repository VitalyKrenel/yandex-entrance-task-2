# Project \#2 for Yandex Academy (September, 2018) 

![Status: development](https://img.shields.io/badge/status-development-brightgreen.svg)

To start the project type in terminal:

```
npm i
npm run start
```
(Assumed you have NPM installed on your device)

## Description

The project is developed with native JS (ES6), CSS, HTML with mobile-first approach. Project bundler is expected to be adopted later. Images are not optimized. 

Browsers compability is a bit lacking. In plans to support **at least** 2 last versions of all major browsers (Chrome, Edge, Opera, Firefox, Safari) on desktop and mobile. 

If you'd like to explore the project through [Github Pages Link](https://vitalykrenel.github.io/yandex-entrance-task-2/dist/index.html). I suggest using Chrome with Device Mode switched on (`Ctrl/Command` + `Shift` + `M`) for now.

[Design is avaliable here.](https://yandex-shri-2018.github.io/entrance-task-2-2/guide/)

**Note:** Because of testing purposes only the card **Xiaomi Yeelight LED** is clickable. It triggers lighting preferences modal.

## Todo:

### Dimmer
[ ] Add Dimmer UI component to control floor's temperature. ([Design](https://yandex-shri-2018.github.io/entrance-task-2-2/guide/#artboard0))

### Cards
[ ] Add slider for cards containers

[ ] Add :hover state for cards

### Accessibility

[ ] Test accessibility

### Overall
[ ] Improve resposive behaviour on medium and large screens

[ ] Optimize svg and png images ([SVGO](https://imageoptim.com/mac), something else for raster)

[X] ~~Add bundling for CSS and JS~~ Solved [#310d083](https://github.com/VitalyKrenel/yandex-entrance-task-2/commit/310d083835d2d9630989dce8eec0376e78e87318)

[ ] Improve dist folder structure (should mimic src folder)
