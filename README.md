# AlertME.js
An open source library for beautiful out of the box user alerts and notifications

## Installation
Install the latest version of [Node](https://nodejs.org)

Then, in your local directory, run npm install to get all required dependencies
```
npm install
```

## Code Structure
CSS, HTML, and JS files in ./app are bundled and output in ./build. Gulp tasks allow you to easily build, watch, and/or start a local dev server. Some sample commands are below.

### Commands
Build the codebase
```
npm run build
```

Dev command (build the codebase, start dev server on port 3000, and run watches)
```
npm run dev
```

Run unit tests (mocha)
```
npm test
```

## Developer Guide
### Quickstart
1. Pull down the repo and run a gulp build
2. Include the AlertMe JS (`./build/alertMe.min.js`) and AlertMe CSS (`./build/alertMe.css`) into your build process or page.
3. Bind an alert to something in your code. Example button clicks: https://codepen.io/apederson21/pen/OvPQbO
