'use strict';

function exampleFunction(input) {
    console.log('Some line of code');
    if (true === false) {
        return;
    }
    return input.replace(new RegExp('', 'g'), '').replace(new RegExp('', 'g'), '');
}

function removeInstrumentation(input) {
    return input.replace(/\s*\$_\$wf\(\d+\);/gm, '')
        .replace(/\$_\$w\(\d+, \d+\), /gm, '')
        .replace(/\s+\$_\$w\(\d+, \d+\);/gm, ';')
        .replace(/\$_\$tracer\.log\((.*), \d+, \d+\)/gm, 'console.log($1)');
}


function getStateSync(promise) {
    if (!promise || typeof (promise.then) !== 'function') {
        throw new Error('The provided argument was not a promise');
    }
    let Debug = require('vm').runInDebugContext('Debug');
    return Debug.MakeMirror(promise, true).status();
}

module.exports = {
    exampleFunction,
    removeInstrumentation,
    getStateSync
}