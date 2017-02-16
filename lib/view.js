'use strict';

const path = require('path');
const ejs = require('ejs');

module.exports = class EjsView {

  constructor(ctx) {
    this.ctx = ctx;
    this.app = ctx.app;
    this.viewConfig = ctx.app.config.ejs;
    this.prefix = path.join(ctx.app.config.baseDir, this.viewConfig.root);
  }

  render(name, locals) {
    const { prefix, viewConfig } = this;
    const filename = path.join(prefix, name);
    locals = Object.assign({}, viewConfig, { filename }, locals);

    return new Promise((resolve, reject) => {
      ejs.renderFile(filename, locals, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  renderString(tpl, locals) {
    const { viewConfig } = this;
    locals = Object.assign({}, viewConfig, locals);
    try {
      return Promise.resolve(ejs.render(tpl, locals));
    } catch (err) {
      return Promise.reject(err);
    }
  }

  get helper() {
    return this.ctx.helper;
  }

};
