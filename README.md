# egg-view-ejs

[![NPM version](https://img.shields.io/npm/v/egg-view-ejs.svg?style=flat-square)](https://npmjs.org/package/egg-view-ejs)
[![NPM quality](http://npm.packagequality.com/shield/egg-view-ejs.svg?style=flat-square)](http://packagequality.com/#?package=egg-view-ejs)
[![NPM download](https://img.shields.io/npm/dm/egg-view-ejs.svg?style=flat-square)](https://npmjs.org/package/egg-view-ejs)

[![Continuous Integration](https://github.com/eggjs/egg-view-ejs/actions/workflows/nodejs.yml/badge.svg)](https://github.com/eggjs/egg-view-ejs/actions/workflows/nodejs.yml)
[![Test coverage](https://img.shields.io/codecov/c/github/eggjs/egg-view-ejs.svg?style=flat-square)](https://codecov.io/gh/eggjs/egg-view-ejs)


egg view plugin for [ejs].

## Install

```bash
$ npm i egg-view-ejs --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.ejs = {
  enable: true,
  package: 'egg-view-ejs',
};

// {app_root}/config/config.default.js
exports.view = {
  mapping: {
    '.ejs': 'ejs',
  },
};
```

Create a ejs file

```js
// app/view/hello.ejs
hello <%= data %>
```

Render it

```js
// app/controller/render.js
exports.ejs = async ctx => {
  await ctx.render('hello.ejs', {
    data: 'world',
  });
};
```

The file will be compiled and cached, you can change `config.ejs.cache = false` to disable cache, it's disable in local env by default.

### Include

You can include both relative and absolute file.

Relative file is resolve from current file path.

```html
// app/view/a.ejs include app/view/b.ejs
<% include('b.ejs') %>
```

Absolute file is resolve from `app/view`.

```html
// app/view/home.ejs include app/view/partial/menu.ejs
<% include('/partial/menu.ejs') %>
```

### Layout

You can render a view with layout also:

```js
// app/view/layout.ejs

<% body %>

// app/controller/render.js
exports.ejs = async ctx => {
  const locals = {
    data: 'world',
  };

  const viewOptions = {
    layout: 'layout.ejs'
  };

  await ctx.render('hello.ejs', locals, viewOptions);
};
```

## Configuration

see [config/config.default.js](config/config.default.js) for more detail.

## Questions & Suggestions

Please open an issue [here](https://github.com/eggjs/egg/issues).

## License

[MIT](LICENSE)

[ejs]: https://github.com/mde/ejs
