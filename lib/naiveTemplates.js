'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
/**
 *  Simple Micro Templating Function
 */

exports['default'] = function (str, data) {

  // Iterates through the keys in file object
  // and interpolate / replace {{key}} with it's value
  for (var k in data) {
    if (data.hasOwnProperty(k)) {
      var exp = '{{' + k + '}}';
      var regex = new RegExp(exp, 'g');

      str = str.replace(regex, data[k]);
    }
  }

  // Assign the final result back into the contents field
  data.contents = new Buffer(str);

  return data;
};

module.exports = exports['default'];