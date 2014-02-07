'use strict';

var sysPath = require('path');

exports.config = {
  files: {
    javascripts: {
      joinTo: {
        'javascripts/app.js': /^app/,
        'javascripts/vendor.js': /^(bower_components|vendor)/
      },
      order: {
        before: [
          'bower_components/jquery/jquery.js',
          'vendor/javascripts/jquery-ui.js',
          'vendor/javascripts/handlebars.js',
          'vendor/javascripts/ember.js',
          'vendor/javascripts/ember-data.js'
        ]
      }
    },
    stylesheets: {
      joinTo: {
        'stylesheets/app.css': /^(bower_components|app)/
      }
    },
    templates: {
      defaultExtension: 'hbs',
      precompile: true,
      root: 'templates/',
      joinTo: {
        'javascripts/app.js': /^app/
      },
    }
  },
  conventions: {
    ignored: function(path) {
      var sep, startsWith;
      startsWith = function(string, substring) {
        return string.indexOf(substring, 0) === 0;
      };
      sep = sysPath.sep;
      if (path.indexOf("app" + sep + "templates" + sep) === 0) {
        return false;
      } else {
        return startsWith(sysPath.basename(path), '_');
      }
    }
  }
};
