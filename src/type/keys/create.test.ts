import { core, objectType } from 'nexus';

import * as testHelper from '../../test';

import { create } from './create';

describe('keys', () => {
  describe('default config', () => {
    it('is added to schema', () => {
      const schema = testHelper.createSchema(create);
      expect(schema).toMatchSnapshot();
    });

    it('is added to types', async () => {
      const typegen = await testHelper.createTypegen(create);
      expect(typegen).toMatchSnapshot();
    });
  });
  describe('`prefixFieldset` configured to `false`', () => {
    const typeCreateOptions = { prefixFieldset: false };
    it('is added to schema with fields type as `FieldSet`', () => {
      const schema = testHelper.createSchema(create, typeCreateOptions);
      expect(schema).toMatchSnapshot();
    });

    it('is added to types with fields type as `FieldSet`', async () => {
      const typegen = await testHelper.createTypegen(create, typeCreateOptions);
      expect(typegen).toMatchSnapshot();
    });
  });
  describe('`prefixFieldset` configured to `true`', () => {
    const typeCreateOptions = { prefixFieldset: true };
    it('is added to schema with fields type as `_FieldSet`', () => {
      const schema = testHelper.createSchema(create, typeCreateOptions);
      expect(schema).toMatchSnapshot();
    });

    it('is added to types with fields type as `_FieldSet`', async () => {
      const typegen = await testHelper.createTypegen(create, typeCreateOptions);
      expect(typegen).toMatchSnapshot();
    });
  });
  describe('`enableKeyOnInterface` configured to `true`', () => {
    const typeCreateOptions = { enableKeyOnInterface: true };
    it('is added to schema allowing `OBJECT` and `INTERFACE`', () => {
      const schema = testHelper.createSchema(create, typeCreateOptions);
      expect(schema).toMatchSnapshot();
    });

    it('is added to types allowing `OBJECT` and `INTERFACE`', async () => {
      const typegen = await testHelper.createTypegen(create, typeCreateOptions);
      expect(typegen).toMatchSnapshot();
    });
  });
  describe('`enableKeyOnInterface` configured to `false`', () => {
    const typeCreateOptions = { enableKeyOnInterface: false };
    it('is added to schema only allowing `OBJECT`', () => {
      const schema = testHelper.createSchema(create, typeCreateOptions);
      expect(schema).toMatchSnapshot();
    });

    it('is added to types only allowing `OBJECT`', async () => {
      const typegen = await testHelper.createTypegen(create, typeCreateOptions);
      expect(typegen).toMatchSnapshot();
    });
  });

  describe('object configuration', () => {
    describe('is present', () => {
      let testType: core.NexusObjectTypeDef<'User'>;
      beforeEach(() => {
        testType = objectType({
          name: 'User',
          //@ts-expect-error reflection types have not been generated
          keys: ['id', 'email'],
          definition: (t) => {
            t.id('id');
            t.string('email');
            t.string('name');
          },
        });
      });
      it('is correctly added to the schema', () => {
        const schema = testHelper.createSchema(create, {}, testType);
        expect(schema).toMatchSnapshot();
      });
      it('is correctly added to typegen', async () => {
        const typegen = await testHelper.createTypegen(create, {}, testType);
        expect(typegen).toMatchSnapshot();
      });
    });
    describe('is NOT present', () => {
      let testType: core.NexusObjectTypeDef<'User'>;
      beforeEach(() => {
        testType = objectType({
          name: 'User',
          definition: (t) => {
            t.id('id');
            t.string('email');
            t.string('name');
          },
        });
      });
      it('is correctly added to the schema', () => {
        const schema = testHelper.createSchema(create, {}, testType);
        expect(schema).toMatchSnapshot();
      });
      it('is correctly added to typegen', async () => {
        const typegen = await testHelper.createTypegen(create, {}, testType);
        expect(typegen).toMatchSnapshot();
      });
    });
  });
});
