'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.webcomponents = webcomponents;
// only require forgiven if not a browser build
if (!forgiven) {
  // eslint-disable-next-line no-var
  var forgiven = require('forgiven');
}

function webcomponents(setup) {
  return {
    as: function as(context, name) {
      if (typeof context === 'string') {
        name = context;
        context = undefined;
      }
      var nameStr = void 0;
      if (typeof name === 'undefined') {
        if (typeof context === 'function') {
          nameStr = forgiven.descriptionFromFuncStr(context.toString());
        } else {
          throw new Error('no name provided for fixture');
        }
      } else {
        nameStr = '`' + name + '`';
      }
      var setupFixture = function setupFixture(conjunction, id, data) {
        return setup({
          description: 'as ' + nameStr + ' ' + conjunction + ' ' + id,
          beforeEach: function beforeEach(done) {
            context = context || this;
            var element = document.getElementById(id).create(data);
            element.record = {
              event: function event(_event) {
                return {
                  as: function as(eventContext, name) {
                    if (typeof eventContext === 'string') {
                      name = eventContext;
                      eventContext = undefined;
                    }
                    eventContext = eventContext || context;
                    element.addEventListener(_event, function (event) {
                      if (typeof eventContext === 'function') {
                        eventContext(event);
                      } else {
                        eventContext[name] = event;
                      }
                    });
                  }
                };
              },
              events: function events(event) {
                return {
                  as: function as(eventContext, name) {
                    if (typeof eventContext === 'string') {
                      name = eventContext;
                      eventContext = undefined;
                    }
                    eventContext = eventContext || context;
                    if (typeof eventContext !== 'function') {
                      eventContext[name] = [];
                    }
                    element.addEventListener(event, function (event) {
                      if (typeof eventContext === 'function') {
                        eventContext(event);
                      } else {
                        eventContext[name].push(event);
                      }
                    });
                  }
                };
              }
            };
            element.promise = {
              event: function event(_event2) {
                return {
                  as: function as(eventContext, name) {
                    if (typeof eventContext === 'string') {
                      name = eventContext;
                      eventContext = undefined;
                    }
                    eventContext = eventContext || context;
                    var promise = new Promise(function (resolve) {
                      var listener = function listener(evt) {
                        element.removeEventListener(_event2, listener);
                        resolve(evt);
                      };
                      element.addEventListener(_event2, listener);
                    });
                    if (typeof eventContext === 'function') {
                      eventContext(promise);
                    } else {
                      eventContext[name] = promise;
                    }
                  }
                };
              }
            };
            if (typeof context === 'function') {
              context(element);
            } else {
              context[name] = element;
            }
            flush(done);
          },
          afterEach: function afterEach(done) {
            document.getElementById(id).restore();
            flush(done);
          }
        });
      };
      var chain = {};
      forgiven.SETUP_CONJUNCTIONS.forEach(function (conjunction) {
        chain[conjunction] = setupFixture.bind(null, conjunction);
      });
      return chain;
    }
  };
};