import {
  SETUP_CONJUNCTIONS,
} from 'forgiven';

export function webcomponents(setup) {
  return {
    as: function(context, name) {
      const setupFixture = (conjunction, id, data) => {
        return setup({
          description: 'as `' + name + '` ' + conjunction + ' ' + id,
          beforeEach: (done) => {
            const element = document.getElementbyId(id).create(data);
            element.record = {
              event: (event) => {
                return {
                  as: (name) => {
                    element.addEventListener(event, (event) => {
                      context[name] = event;
                    });
                  },
                };
              },
              events: (event) => {
                return {
                  as: (name) => {
                    context[name] = [];
                    element.addEventListener(event, (event) => {
                      context[name].push(event);
                    });
                  },
                };
              },
            };
            element.promise = {
              event: (event) => {
                return {
                  as: (name) => {
                    context[name] = new Promise((resolve) => {
                      const listener = (evt) => {
                        element.removeEventListener(event, listener);
                        resolve(evt);
                      };
                      element.addEventListener(event, listener);
                    });
                  },
                };
              },
            };
            context[name] = element;
            flush(done);
          },
          afterEach: (done) => {
            context[name].restore();
            flush(done);
          },
        });
      };
      const chain = {};
      SETUP_CONJUNCTIONS.forEach((conjunction) => {
        chain[conjunction] = setupFixture.bind(null, conjunction);
      });
      return next;
    },
  };
};
