// only require forgiven if not a browser build
if (!forgiven) {
  // eslint-disable-next-line no-var
  var forgiven = require('forgiven');
}

export function webcomponents(setup) {
  return {
    as: function(context, name) {
      if (typeof context === 'string') {
        name = context;
        context = undefined;
      }
      let nameStr;
      if (typeof name === 'undefined') {
        if (typeof context === 'function') {
          nameStr = forgiven.descriptionFromFuncStr(context.toString());
        } else {
          throw new Error('no name provided for fixture');
        }
      } else {
        nameStr = '`' + name + '`';
      }
      const setupFixture = (conjunction, id, data) => {
        return setup({
          description: 'as ' + nameStr + ' ' + conjunction + ' ' + id,
          beforeEach: function(done) {
            context = context || this;
            const element = document.getElementById(id).create(data);
            element.record = {
              event: (event) => {
                return {
                  as: (eventContext, name) => {
                    if (typeof eventContext === 'string') {
                      name = eventContext;
                      eventContext = undefined;
                    }
                    eventContext = eventContext || context;
                    element.addEventListener(event, (event) => {
                      if (typeof eventContext === 'function') {
                        eventContext(event);
                      } else {
                        eventContext[name] = event;
                      }
                    });
                  },
                };
              },
              events: (event) => {
                return {
                  as: (eventContext, name) => {
                    if (typeof eventContext === 'string') {
                      name = eventContext;
                      eventContext = undefined;
                    }
                    eventContext = eventContext || context;
                    if (typeof eventContext !== 'function') {
                      eventContext[name] = [];
                    }
                    element.addEventListener(event, (event) => {
                      if (typeof eventContext === 'function') {
                        eventContext(event);
                      } else {
                        eventContext[name].push(event);
                      }
                    });
                  },
                };
              },
            };
            element.promise = {
              event: (event) => {
                return {
                  as: (eventContext, name) => {
                    if (typeof eventContext === 'string') {
                      name = eventContext;
                      eventContext = undefined;
                    }
                    eventContext = eventContext || context;
                    const promise = new Promise((resolve) => {
                      const listener = (evt) => {
                        element.removeEventListener(event, listener);
                        resolve(evt);
                      };
                      element.addEventListener(event, listener);
                    });
                    if (typeof eventContext === 'function') {
                      eventContext(promise);
                    } else {
                      eventContext[name] = promise;
                    }
                  },
                };
              },
            };
            if (typeof context === 'function') {
              context(element);
            } else {
              context[name] = element;
            }
            flush(done);
          },
          afterEach: function(done) {
            document.getElementById(id).restore();
            flush(done);
          },
        });
      };
      const chain = {};
      forgiven.SETUP_CONJUNCTIONS.forEach((conjunction) => {
        chain[conjunction] = setupFixture.bind(null, conjunction);
      });
      return chain;
    },
  };
};
