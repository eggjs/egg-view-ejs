'use strict';

const ejs = require('ejs');

module.exports = class EjsView {

  constructor(ctx) {
    this.ctx = ctx;
    this.app = ctx.app;
    this.config = ctx.app.config.ejs;
  }

  _render(filename, locals, config) {
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

  * render(filename, locals, viewOptions) {
    const config = Object.assign({}, this.config, viewOptions, { filename });
    const html = yield this._render(filename, locals, config);
    if (config.layout) {
      locals.body = html;
      const layout = yield this.app.view.resolve(config.layout);
      return yield this._render(layout, locals, config);
    }

    return html;
  }

  renderString(tpl, locals, viewOptions) {
    // should disable cache when no filename
    const config = Object.assign({}, this.config, viewOptions, { cache: null });
    try {
      return Promise.resolve(ejs.render(tpl, locals, config));
    } catch (err) {
      return Promise.reject(err);
    }
  }

};
