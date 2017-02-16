'use strict';

const path = require('path');
const ejs = require('ejs');

module.exports = class EjsView {

  constructor(ctx) {
    this.ctx = ctx;
    this.app = ctx.app;
    this.config = ctx.app.config.ejs;
  }

  render(name, locals) {
    const filename = path.join(this.config.root, name);
    const config = Object.assign({}, this.config, { filename });

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

  renderString(tpl, locals) {
    // should disable cache when no filename
    const config = Object.assign({}, this.config, { cache: null });
    try {
      return Promise.resolve(ejs.render(tpl, locals, config));
    } catch (err) {
      return Promise.reject(err);
    }
  }

  get helper() {
    return this.ctx.helper;
  }

};
