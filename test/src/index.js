import {
  webcomponents,
} from '../../src';

describe('forgiven-webcomponents', () => {
  it('should export the webcomponents plugin', () => {
    webcomponents.should.be.ok;
  });

  // TODO: this is an initial import of something that was working
  // more integration tests need to be created
});
