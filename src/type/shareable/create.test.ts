import { core, objectType } from 'nexus';

import * as testHelper from '../../test';

import * as self from './index';

describe('shareable', () => {
  it('is correctly added to schema', () => {
    const schema = testHelper.createSchema(self.create);
    expect(schema).toMatchSnapshot();
  });
  it('is correctly added to typegen', async () => {
    const types = await testHelper.createTypegen(self.create);
    expect(types).toMatchSnapshot();
  });

  describe('object configuration', () => {
    describe('is present', () => {
      let testType: core.NexusObjectTypeDef<'User'>;
      beforeEach(() => {
        testType = objectType({
          name: 'User',
          //@ts-expect-error reflection types have not been generated
          shareable: true,
          definition: (t) => {
            t.id('id');
            t.string('email');
            t.string('name');
          },
        });
      });
      it('is correctly added to the schema', () => {
        const schema = testHelper.createSchema(self.create, {}, testType);
        expect(schema).toMatchSnapshot();
      });
      it('is correctly added to typegen', async () => {
        const typegen = await testHelper.createTypegen(
          self.create,
          {},
          testType,
        );
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
        const schema = testHelper.createSchema(self.create, {}, testType);
        expect(schema).toMatchSnapshot();
      });
      it('is correctly added to typegen', async () => {
        const typegen = await testHelper.createTypegen(
          self.create,
          {},
          testType,
        );
        expect(typegen).toMatchSnapshot();
      });
    });
  });

  describe('field configuration', () => {
    describe('is present', () => {
      const testType = objectType({
        name: 'User',
        definition: (t) => {
          t.id('id');
          t.string('email');
          // @ts-expect-error reflection types have not been generated
          t.string('name', { shareable: true });
        },
      });
      it('is correctly added to the schema', () => {
        const schema = testHelper.createSchema(self.create, {}, testType);
        expect(schema).toMatchSnapshot();
      });
      it('is correctly added to typegen', async () => {
        const typegen = await testHelper.createTypegen(
          self.create,
          {},
          testType,
        );
        expect(typegen).toMatchSnapshot();
      });
    });
    describe('is NOT present', () => {
      const testType = objectType({
        name: 'User',
        definition: (t) => {
          t.id('id');
          t.string('email');
          t.string('name');
        },
      });
      it('is correctly added to the schema', () => {
        const schema = testHelper.createSchema(self.create, {}, testType);
        expect(schema).toMatchSnapshot();
      });
      it('is correctly added to typegen', async () => {
        const typegen = await testHelper.createTypegen(
          self.create,
          {},
          testType,
        );
        expect(typegen).toMatchSnapshot();
      });
    });
  });
});
