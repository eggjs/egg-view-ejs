'use strict';

const path = require('path');
const mm = require('egg-mock');
const fs = require('fs').promises;

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
      return app.httpRequest()
        .get('/locals')
        .expect(/hello world\r?\n/)
        .expect(200);
    });

    it('should render with include', () => {
      return app.httpRequest()
        .get('/include')
        .expect(/hello header\r?\n\r?\nhello footer\r?\n/)
        .expect(200);
    });

    it('should render with helper', () => {
      return app.httpRequest()
        .get('/helper')
        .expect(/hello world\r?\n/)
        .expect(200);
    });

    it('should render with cache', async () => {
      const cacheFile = path.join(fixtures, 'apps/ejs-view/app/view/cache.ejs');
      await fs.writeFile(cacheFile, '1');
      await app.httpRequest()
        .get('/cache')
        .expect('1')
        .expect(200);

      await fs.writeFile(cacheFile, '2');
      await app.httpRequest()
        .get('/cache')
        .expect('1')
        .expect(200);
    });

    it('should render with html extension', () => {
      return app.httpRequest()
        .get('/htmlext')
        .expect(/hello world\r?\n/)
        .expect(200);
    });

    it('should render with layout', () => {
      return app.httpRequest()
        .get('/render-layout')
        .expect(/in layout\r?\nhello world\r?\n\r?\n/)
        .expect(200);
    });

    it('should render error', () => {
      return app.httpRequest()
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
      return app.httpRequest()
        .get('/render-string')
        .expect('hello world')
        .expect(200);
    });

    it('should renderString with helper', () => {
      return app.httpRequest()
        .get('/render-string-helper')
        .expect('hello world')
        .expect(200);
    });

    it('should renderString error', () => {
      return app.httpRequest()
        .get('/render-string-error')
        .expect('Could not find matching close tag for "<%".')
        .expect(200);
    });
  });

  describe('no cache', () => {
    let app;
    before(() => {
      mm.env('local');
      app = mm.app({
        baseDir: 'apps/ejs-view',
      });
      return app.ready();
    });
    after(() => app.close());

    it('should render without cache', async () => {
      const cacheFile = path.join(fixtures, 'apps/ejs-view/app/view/cache.ejs');
      await fs.writeFile(cacheFile, '1');
      await app.httpRequest()
        .get('/cache')
        .expect('1')
        .expect(200);

      await fs.writeFile(cacheFile, '2');
      await app.httpRequest()
        .get('/cache')
        .expect('2')
        .expect(200);
    });
  });
});
