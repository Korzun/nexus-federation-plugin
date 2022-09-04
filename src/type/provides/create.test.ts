import { core, objectType } from 'nexus';

import * as testHelper from '../../test';

import { create } from './create';

describe('provides', () => {
  it('is correctly added to schema', () => {
    const schema = testHelper.createSchema(create);
    expect(schema).toMatchSnapshot();
  });
  it('is correctly added to typegen', async () => {
    const types = await testHelper.createTypegen(create);
    expect(types).toMatchSnapshot();
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
        const schema = testHelper.createSchema(create, testTypes);
        expect(schema).toMatchSnapshot();
      });
      it('is correctly added to typegen', async () => {
        const typegen = await testHelper.createTypegen(create, testTypes);
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
        const schema = testHelper.createSchema(create, testTypes);
        expect(schema).toMatchSnapshot();
      });
      it('is correctly added to typegen', async () => {
        const typegen = await testHelper.createTypegen(create, testTypes);
        expect(typegen).toMatchSnapshot();
      });
    });
  });
});
