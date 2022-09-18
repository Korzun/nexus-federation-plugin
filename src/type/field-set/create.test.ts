import * as testHelper from '../../test';

import * as self from './index';

describe('field set', () => {
  describe('default config', () => {
    it('is added to schema  as `FieldSet`', () => {
      const schema = testHelper.createSchema(self.create);
      expect(schema).toMatchSnapshot();
    });

    it('is added to types  as `FieldSet`', async () => {
      const typegen = await testHelper.createTypegen(self.create);
      expect(typegen).toMatchSnapshot();
    });
  });
  describe('`prefixFieldset` configured to `false`', () => {
    const typeCreateOptions = { prefixFieldset: false };
    it('is added to schema as `FieldSet`', () => {
      const schema = testHelper.createSchema(self.create, typeCreateOptions);
      expect(schema).toMatchSnapshot();
    });

    it('is added to types as `FieldSet`', async () => {
      const typegen = await testHelper.createTypegen(
        self.create,
        typeCreateOptions,
      );
      expect(typegen).toMatchSnapshot();
    });
  });
  describe('`prefixFieldset` configured to `true`', () => {
    const typeCreateOptions = { prefixFieldset: true };
    it('is added to schema as `_FieldSet`', () => {
      const schema = testHelper.createSchema(self.create, typeCreateOptions);
      expect(schema).toMatchSnapshot();
    });

    it('is added to types as `_FieldSet`', async () => {
      const typegen = await testHelper.createTypegen(
        self.create,
        typeCreateOptions,
      );
      expect(typegen).toMatchSnapshot();
    });
  });
});
