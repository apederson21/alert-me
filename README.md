# AlertME.js
An open source library for beautiful out of the box user alerts and notifications

* [Installation](#installation)
* [Code Structure](#code-structure)
* [Commands](#commands)
* [Developer Guide](#developer-guide)
  * [Quickstart](#dev-quickstart)
  * [AlertMe Api](#dev-api)
    * [Options](#dev-options)
  * [AlertMe Config File](#config-file)

<a name='installation'></a>
## Installation
Install the latest version of [Node](https://nodejs.org)

Then, in your local directory, run npm install to get all required dependencies
```
npm install
```

<a name='code-structure'></a>
## Code Structure
CSS, HTML, and JS files in ./app are bundled and output in ./build. Gulp tasks allow you to easily build, watch, and/or start a local dev server. Some sample commands are below.

<a name='commands'></a>
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

<a name='developer-guide'></a>
## Developer Guide
<a name='dev-quickstart'></a>
### Quickstart
1. Pull down the repo and run a gulp build
2. Include the AlertMe JS (`./build/alertMe.min.js`) and AlertMe CSS (`./build/alertMe.css`) into your build process or page.
3. Bind an alert to something in your code. Example button clicks: https://codepen.io/apederson21/pen/OvPQbO

<a name='dev-api'></a>
### AlertMe Api
Alerts, notifications, and ribbons are invoked through the `alertMe` object on the global window object.

* To create an alert, call `alertMe.alert()`
* To create a notification, call `alertMe.notification()`
* To create a ribbon, call `alertMe.ribbon()`

These methods take various configuration options noted below. Also note that you can set the default theme by running:
* `alertMe.setTheme()`
  * pass in `'flat'` for the Flat theme, which has squared corners
  * pass in `'round'` for the Round theme, which has rounded corners

There is also a close method on the global alertMe object. Calling `alertMe.close()` will close/remove all AlertMe elements from the DOM. This method can also take an optional element Id. AlertMe will generate a unique Id for each element added to the DOM via `new Date().toISOString()`.

The following options are available for alerts, notifications, or ribbons.

<a name='dev-options'></a>
| Option | Description | Alerts | Notifications | Ribbons |
| --- | --- | -- | -- | -- |
| `autoClose` | Boolean. Automatically remove element from the DOM after specified duration (below) | ❌ | ✅ | ✅ |
| `autoCloseDuration` | Int. Duration in MS before element is removed from DOM | ❌ | ✅ | ✅ |
| `class` | String. Custom class to be added to the element. Will be prefixed with `alertMe_` | ✅ | ✅ | ✅ |
| `closeX` | Boolean. Control the visibility of the close X. Cannot be shown when autoClose is true. | ❌ | ✅ | ✅ |
| `effect` | String. Type of effect/animation to add to the element's appearance. Valid value(s): `slideIn` | ✅ | ✅ | ✅ |
| `heading` | String. Heading text for your element. | ✅ | ✅ | ✅ |
| `ok` | Object. If populated, will render an "Ok" button on your element. | ✅ | ❌ | ❌ |
| `ok.text` | String. Override of the default "Ok" text on the button. | ✅ | ❌ | ❌ |
| `ok.clickEvent` | Function. Override the default (removes the element) click handler for the "Ok" button. | ✅ | ❌ | ❌ |
| `text` | String. The body text for your element. | ✅ | ✅ | ✅ |

<a name='config-file'></a>
### AlertMe Config File
You can add your own configuration file named `alertMe.json` in the root of your project directory to override the default configuration.

The available options are:
* `theme` The CSS theme. Possible values are 'round', 'flat'
* `defaultDuration` Default time (in milliseconds) before an alert with the autoClose property is removed from the DOM