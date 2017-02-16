'use strict';

const View = require('../../lib/view');

module.exports = {
  get [Symbol.for('egg#view')]() {
    return View;
  },
};
