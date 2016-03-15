'use strict';

var child_process = require('child_process');
var async = require('async');

// delete heroku apps using the cli in series
(function (app_names) {
    function deleteHerokuApp(app_name, callback) {
        console.log('deleting app: ' + app_name + ' ... ');
        child_process.execFile('heroku', ['destroy', '--app', app_name, '--confirm', app_name], function (err, stdout, stderr) {
            if (stdout) {
                console.log('Deleted app: ', app_name);
                callback(null, stdout);
            }
        });
    }

    var fns = app_names.map(function (app_name) {
        return deleteHerokuApp.bind(null, app_name);
    });

    async.series(fns, function (err, results) {
        if (err) console.log('error ... ');else console.log(results);
    });
})(["randomapp1", "randomapp2"]);

//# sourceMappingURL=app-compiled.js.map