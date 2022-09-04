import { core, objectType } from 'nexus';

import * as testHelper from '../../test';

import { create } from './create';

describe('keys', () => {
  it('is added to schema', () => {
    const schema = testHelper.createSchema(create);
    expect(schema).toMatchSnapshot();
  });

  it('is added to types', async () => {
    const typegen = await testHelper.createTypegen(create);
    expect(typegen).toMatchSnapshot();
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
        const schema = testHelper.createSchema(create, testType);
        expect(schema).toMatchSnapshot();
      });
      it('is correctly added to typegen', async () => {
        const typegen = await testHelper.createTypegen(create, testType);
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
        const schema = testHelper.createSchema(create, testType);
        expect(schema).toMatchSnapshot();
      });
      it('is correctly added to typegen', async () => {
        const typegen = await testHelper.createTypegen(create, testType);
        expect(typegen).toMatchSnapshot();
      });
    });
  });
});
