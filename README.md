# forgiven-webcomponents

[![Build Status](https://travis-ci.org/pghalliday/forgiven-webcomponents.svg?branch=master)](https://travis-ci.org/pghalliday/forgiven-webcomponents)
[![Build status](https://ci.appveyor.com/api/projects/status/8jaac5m0tgfwf283/branch/master?svg=true)](https://ci.appveyor.com/project/pghalliday/forgiven-webcomponents/branch/master)

[Forgiven](https://www.npmjs.com/package/forgiven) extensions for [web-component-tester](https://github.com/Polymer/web-component-tester) test-fixtures

## Usage

```shell
bower install --save-dev forgiven forgiven-mocha forgiven-webcomponents
```

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, minimum-scale=1, initial-scale=1, user-scalable=yes">

    <title>my-button test</title>

    <script src="../../webcomponentsjs/webcomponents-lite.js"></script>
    <script src="../../web-component-tester/browser.js"></script>
    <script src="../../forgiven/browser.js"></script>
    <script src="../../forgiven-mocha/browser.js"></script>
    <script src="../../forgiven-webcomponents/browser.js"></script>

    <link rel="import" href="../src/button.html">
  </head>
  <body>
    <test-fixture id="some text">
      <template is="dom-template">
        <my-button text="[[text]]"></my-button>
      </template>
    </test-fixture>
    <script>

      chai.should();
      var given = forgiven.create(forgiven.ui.mocha, {
        fixture: forgiven.plugins.webcomponents,
      });

      given.a.fixture.as('myButton').with('some text', {
        text: 'hello'
      })
      .and(function() {this.myButton.record.event('button-click').as('event')})
      .and(function() {this.myButton.record.events('button-click').as('events')})
      .and(function() {this.myButton.promise.event('button-click').as('promise')})
      .and(function() {this.myButton.$.button.click()})
      .then(function() {this.myButton.$.button.textContent.should.eql('hello')})
      .and(function() {this.event.detail.should.eql('hello')})
      .and(function() {this.events[0].detail.should.eql('hello')})
      .and(function() {
        return this.promise.then(function(event) {
          event.detail.should.eql('hello');
        });
      })
      .end();

    </script>
  </body>
</html>
```

## Contributing

Run unit tests and build before pushing/opening a pull request.

- `npm test` - lint and test
- `npm start` - watch and build, etc with alarmist
- `npm run build` - run tests then build
- `npm run watch` - watch for changes and run build
