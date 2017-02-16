'use strict';

const path = require('path');
const request = require('supertest');
const mm = require('egg-mock');
const fs = require('mz/fs');

const fixtures = path.join(__dirname, 'fixtures');


describe('test/egg-view-ejs.test.js', () => {

  describe('render', () => {
    let app;
    before(() => {
      app = mm.app({
        baseDir: 'apps/ejs-view',
      });
      return app.ready();
    });
    after(() => app.close());

    it('should render with locals', () => {
      return request(app.callback())
        .get('/locals')
        .expect('hello world\n')
        .expect(200);
    });

    it('should render with include', () => {
      return request(app.callback())
        .get('/include')
        .expect('hello world\n\n')
        .expect(200);
    });

    it('should render with helper', () => {
      return request(app.callback())
        .get('/helper')
        .expect('hello world\n')
        .expect(200);
    });

    it('should render with cache', function* () {
      const cacheFile = path.join(fixtures, 'apps/ejs-view/app/view/cache.ejs');
      yield fs.writeFile(cacheFile, '1');
      yield request(app.callback())
        .get('/cache')
        .expect('1')
        .expect(200);

      yield fs.writeFile(cacheFile, '2');
      yield request(app.callback())
        .get('/cache')
        .expect('1')
        .expect(200);
    });

    it('should render with html extension', () => {
      return request(app.callback())
        .get('/htmlext')
        .expect('hello world\n')
        .expect(200);
    });

    it('should render error', () => {
      return request(app.callback())
        .get('/error')
        .expect('Could not find matching close tag for "<%".')
        .expect(200);
    });
  });

  describe('renderString', () => {
    let app;
    before(() => {
      app = mm.app({
        baseDir: 'apps/ejs-view',
      });
      return app.ready();
    });
    after(() => app.close());

    it('should renderString with data', () => {
      return request(app.callback())
        .get('/render-string')
        .expect('hello world')
        .expect(200);
    });

    it('should renderString with helper', () => {
      return request(app.callback())
        .get('/render-string-helper')
        .expect('hello world')
        .expect(200);
    });

    it('should renderString error', () => {
      return request(app.callback())
        .get('/render-string-error')
        .expect('Could not find matching close tag for "<%".')
        .expect(200);
    });
  });

});
