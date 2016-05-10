'use strict';

let chai = require('chai');
let sinonChai = require('sinon-chai');
chai.use(sinonChai);

if (!Promise.defer) {
    Promise.defer = function() {
        let deferred = {};
        deferred.promise = new Promise((resolve, reject) => {
            deferred.resolve = resolve;
            deferred.reject = reject;
        });
        return deferred;
    };
}