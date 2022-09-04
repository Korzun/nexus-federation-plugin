import * as testHelper from '../../test';

import { create } from './create';

describe('field set', () => {
  describe('model', () => {
    it('is added to schema', () => {
      const schema = testHelper.createSchema(create);
      expect(schema).toMatchSnapshot();
    });

    it('is added to types', async () => {
      const typegen = await testHelper.createTypegen(create);
      expect(typegen).toMatchSnapshot();
    });
  });
});
