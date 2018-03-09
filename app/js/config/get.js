'use strict';

let Q = require("q");

module.exports = {
    loadConfig: loadConfig
}


function loadConfig() {
    // Setup a promise b/c fetch .json()
    // returns a promise
    let deferred = Q.defer();
    // Fetch against the user defined config
    fetch('/alertMe.json')
    .then((response) => {
        // pass the promise JSON to next block
        return response.json();
    })
    .then((data) => {
        // resolve the promise JSON data
        deferred.resolve(data);
    })
    .catch(() => {
        // reject the promise (file not found)
        deferred.reject();
    })
    return deferred.promise;
}
