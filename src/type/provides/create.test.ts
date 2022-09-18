import { core, objectType } from 'nexus';

import * as testHelper from '../../test';
import * as fieldSet from '../field-set';

import * as self from './index';

const create = [fieldSet.create, self.create];

describe('provides', () => {
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
  describe('`prefixFieldSet` configured to `false`', () => {
    const typeCreateOptions: self.CreateOptions = { prefixFieldSet: false };
    it('is added to schema with fields type as `FieldSet`', () => {
      const schema = testHelper.createSchema(create, typeCreateOptions);
      expect(schema).toMatchSnapshot();
    });

    it('is added to types with fields type as `FieldSet`', async () => {
      const typegen = await testHelper.createTypegen(create, typeCreateOptions);
      expect(typegen).toMatchSnapshot();
    });
  });
  describe('`prefixFieldSet` configured to `true`', () => {
    const typeCreateOptions: self.CreateOptions = { prefixFieldSet: true };
    it('is added to schema with fields type as `_FieldSet`', () => {
      const schema = testHelper.createSchema(create, typeCreateOptions);
      expect(schema).toMatchSnapshot();
    });

    it('is added to types with fields type as `_FieldSet`', async () => {
      const typegen = await testHelper.createTypegen(create, typeCreateOptions);
      expect(typegen).toMatchSnapshot();
    });
  });

  describe('field configuration', () => {
    describe('is present', () => {
      let testTypes: Array<
        core.NexusObjectTypeDef<'Product'> | core.NexusObjectTypeDef<'Review'>
      >;
      beforeEach(() => {
        testTypes = [
          objectType({
            name: 'Product',
            definition: (t) => {
              t.string('upc');
              t.string('name');
            },
          }),
          objectType({
            name: 'Review',
            definition: (t) => {
              t.field('product', {
                type: 'Product',
                // @ts-expect-error reflection types have not been generated
                provides: ['name', 'upc'],
              });
            },
          }),
        ];
      });
      it('is correctly added to the schema', () => {
        const schema = testHelper.createSchema(create, {}, testTypes);
        expect(schema).toMatchSnapshot();
      });
      it('is correctly added to typegen', async () => {
        const typegen = await testHelper.createTypegen(create, {}, testTypes);
        expect(typegen).toMatchSnapshot();
      });
    });
    describe('is NOT present', () => {
      let testTypes: Array<
        core.NexusObjectTypeDef<'Product'> | core.NexusObjectTypeDef<'Review'>
      >;
      beforeEach(() => {
        testTypes = [
          objectType({
            name: 'Product',
            definition: (t) => {
              t.string('upc');
              t.string('name');
            },
          }),
          objectType({
            name: 'Review',
            definition: (t) => {
              t.field('product', { type: 'Product' });
            },
          }),
        ];
      });
      it('is correctly added to the schema', () => {
        const schema = testHelper.createSchema(create, {}, testTypes);
        expect(schema).toMatchSnapshot();
      });
      it('is correctly added to typegen', async () => {
        const typegen = await testHelper.createTypegen(create, {}, testTypes);
        expect(typegen).toMatchSnapshot();
      });
    });
  });
});
