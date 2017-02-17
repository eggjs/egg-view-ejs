'use strict';

const ejs = require('ejs');

module.exports = class EjsView {

  constructor(ctx) {
    this.ctx = ctx;
    this.app = ctx.app;
    this.config = ctx.app.config.ejs;
  }

  render(filename, locals, options) {
    const config = Object.assign({}, this.config, options, { filename });

    return new Promise((resolve, reject) => {
      ejs.renderFile(filename, locals, config, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  renderString(tpl, locals, options) {
    // should disable cache when no filename
    const config = Object.assign({}, this.config, options, { cache: null });
    try {
      return Promise.resolve(ejs.render(tpl, locals, config));
    } catch (err) {
      return Promise.reject(err);
    }
  }

};
