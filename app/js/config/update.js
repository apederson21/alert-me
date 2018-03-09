'use strict';

module.exports = {
    merge: merge
}

// Merge the base and user provided config data
// into one master config object
function merge(base, target) {
    if (!base || !target) {
        return {}
    }
    let merged = Object.assign(base, target);
    return merged;
}