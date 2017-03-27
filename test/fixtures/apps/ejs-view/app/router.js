'use strict';

module.exports = app => {
  app.get('/locals', 'view.renderWithLocals');
  app.get('/include', 'view.include');
  app.get('/cache', 'view.cache');
  app.get('/helper', 'view.renderWithHelper');
  app.get('/htmlext', 'view.htmlext');
  app.get('/error', 'view.error');
  app.get('/render-string', 'view.renderStringWithData');
  app.get('/render-string-helper', 'view.renderStringWithHelper');
  app.get('/render-string-error', 'view.renderStringError');
  app.get('/render-layout', 'view.renderWithLayout');
};
