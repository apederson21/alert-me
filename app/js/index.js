'use strict';

let Q = require("q");
let config = require('./config/get');
let updateConfig = require('./config/update');
let dom = require('./dom');

// declare global alert module
global["alertMe"] = {
    "ribbon": null,
    "notification": null,
    "alert": null,
    "close": globalClose,
    "setTheme": setTheme
}

/**
 * Global Alert Me close function
 * @param {string} itemId
 */
function globalClose(itemId) {
    // close item by ID
    let element = document.getElementById(itemId);
    if (!!element) {
      element.parentNode.removeChild(element);
    } else {
      // fallback scenario
      var elements = document.body.getElementsByClassName('alertMe_container');
      while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
      }
    }
}

/**
 * Runtime configuration of alertMe theme (mainly used for testing)
 * @param {string} theme (flat or round)
 */
function setTheme(theme) {
    if (!!theme) {
        // validate theme before setting config
        configData.theme = 
            (theme.toLocaleLowerCase() === 'round' || theme.toLocaleLowerCase() === 'flat')
                ? theme.toLocaleLowerCase() : 'round';
    }
}

// declare default config JSON
let configData = {
    "theme": "round",
    "defaultDuration": 2500
}

// created promise to load user config file (if exists)
let getConfigFile = () => {
    let deferred = Q.defer();
    deferred.resolve(config.loadConfig());
    return deferred.promise;
}

// check if user config file is provided
// and has data, then merge user config w/base
getConfigFile()
    .then((data) => {
        // if config check returned data, merge it
        if (data) {
            configData = updateConfig.merge(configData, data);
        }
        // setup global functions (w/config)
        setupFunctions();
    })
    .catch(() => {
        // config file not found (most likely)
        // setup global functions (w/config)
        setupFunctions();
    });

// setup functions and params for notification creation
function setupFunctions() {
    global.alertMe.notification = (options) => dom.buildHTML('notification', options, configData);
    global.alertMe.ribbon = (options) => dom.buildHTML('ribbon', options, configData);
    global.alertMe.alert = (options) => dom.buildHTML('alert', options, configData);
}