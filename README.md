# forgiven-webcomponents

[![Build Status](https://travis-ci.org/pghalliday/forgiven-webcomponents.svg?branch=master)](https://travis-ci.org/pghalliday/forgiven-webcomponents)
[![Build status](https://ci.appveyor.com/api/projects/status/8jaac5m0tgfwf283/branch/master?svg=true)](https://ci.appveyor.com/project/pghalliday/forgiven-webcomponents/branch/master)
[![Coverage Status](https://coveralls.io/repos/github/pghalliday/forgiven-webcomponents/badge.svg?branch=master)](https://coveralls.io/github/pghalliday/forgiven-webcomponents?branch=master)

[Forgiven](https://www.npmjs.com/package/forgiven) extensions for [web-component-tester](https://github.com/Polymer/web-component-tester) test-fixtures

## Usage

```shell
npm install --save-dev web-component-tester forgiven forgiven-mocha forgiven-webcomponents
```

```javascript
import {
  create,
} from 'forgiven';
import {
  mocha,
} from 'forgiven-mocha';
import {
  webcomponents,
} from 'forgiven-webcomponents';

global.given = create(mocha, {
  fixture: webcomponents,
});
```

## Contributing

Run unit tests and build before pushing/opening a pull request.

- `npm test` - lint and test
- `npm start` - watch and build, etc with alarmist
- `npm run build` - run tests then build
- `npm run watch` - watch for changes and run build
- `npm run ci` - run build and submit coverage to coveralls
