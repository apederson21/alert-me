'use strict';

module.exports = {
    buildHTML: buildHTML,
    domAppend: domAppend
}

// build the HTML for the notification,
// ribbon, or alert, then append
function buildHTML(type = 'notification', options = null, config = null) {
    // they did not provide options or config, return error
    if (options === null || config === null) {
      let errName = (options === null) ? "Missing Options" : "Missing Config";
      let errMessage = (options === null) ? "Options are missing." : "Configuration missing.";
      return createError(errName, errMessage);
    }
    
    // if they pass an empty object, handle it
    if (Object.keys(options).length === 0) {
        let errName = "Missing Options";
        let errMessage = "Options are missing.";
        return createError(errName, errMessage);
    }

    // check to see if there are current alerts in the DOM
    // and reject new one if there are
    let currentAlerts = document.getElementsByClassName('alertMe_alert');
    if (type === 'alert' && Object.keys(currentAlerts).length > 0) {
        return createError('Active Alert Detected', 'Only 1 active alert permitted at a time.');
    }

    let htmlOutput = document.createElement('div'); // parent div
    htmlOutput.classList.add('alertMe_container');
    return buildItem(type, options, config, htmlOutput);
}

// build the innards of the alert,
// notification, or ribbon
function buildItem(type, options, config, htmlOutput) {
    // declare our valid effects
    let alertEffects = [
        'slideIn'
    ];

    // declare a unique ID (time string)
    let itemId = new Date().toISOString();
    htmlOutput.setAttribute('id', itemId);
    // add the class (notification, alert, ribbon)
    htmlOutput.classList.add(`alertMe_${type}`);
    if (alertEffects.indexOf(options.effect) >= 0) {
        htmlOutput.classList.add(`alertMe_${options.effect}`);
    }
    
    let optionClass = options.class || 'default';
    if (!!options.heading || !!options.closeX) {
        // determine if we should show the heading
        let theHeading = '';
        if (!!options.heading) {
          theHeading = options.heading;
        }

        // determine if we should show the
        // close X
        let closeX = '';
        if (!options.closeX) {
          if ((type === 'notification' || type === 'ribbon') && !options.autoClose) {
            closeX = `<div onClick="alertMe.close('${itemId}')"><div class="alertMe_closeX"></div><span></span></div>`;
          }
        }

        htmlOutput.innerHTML = htmlOutput.innerHTML + `<div class="alertMe_header alertMe_${optionClass} alertMe_${config.theme}">${theHeading}` + closeX + '</div>';
    } else {

    }
    let theBody = document.createElement('div');
    theBody.classList.add('alertMe_body');
    if (!!options.text) {
        theBody.innerHTML = theBody.innerHTML + options.text;
    }
    if (!!options.ok && type === 'alert' || type === 'alert') {
        // defaults
        let btnText = 'Ok';
        let btnClickEvt = `alertMe.close('${itemId}')`;
        if (!!options.ok) {
          btnText = (!!options.ok.text) ? options.ok.text : btnText;
          btnClickEvt = (!!options.ok.clickEvent) ? options.ok.clickEvent : btnClickEvt;
        }
        theBody.innerHTML = theBody.innerHTML + `<div class="alertMe_buttons"><button class="alertMe_button alertMe_${optionClass} alertMe_${config.theme}" onclick="${btnClickEvt}">${btnText}</button></div>`;
    }
    if (theBody.innerHTML.length > 0) {
      htmlOutput.append(theBody);
    }
    if (htmlOutput.innerHTML.length > 0) {
      let result = domAppend(htmlOutput);
      // check for auto close if DOM append was successful
      // and type is notification or ribbon
      if (result && type !== 'alert') {
        if (options.autoClose) {
            let duration = options.autoCloseDuration || config.defaultDuration;
            window.setTimeout(function () {
                alertMe.close(itemId);
            }, duration);
        }
      }
    } else {
      let errName = "HTML error";
      let errMessage = `"HTML could not be generated for ${type}."`;
      return createError(errName, errMessage);
    }
}

// append notification, ribbon, alert
// to the DOM
function domAppend(html) {
    try {
        document.body.append(html);
        return true;
    } catch(e) {
        return e;
    }
}

// general error creation function
function createError(name = null, message = null) {
    let err = new Error();
    err.name = name || "An unknown error occurred.";
    err.message = message || "Something went wrong and we weren't able to track it.";
    console.error(err);
    return err;
}
