import { core, inputObjectType, objectType } from 'nexus';

import * as testHelper from '../../test';

import * as self from './index';

describe('inaccessible', () => {
  it('is correctly added to schema', () => {
    const schema = testHelper.createSchema(self.create);
    expect(schema).toMatchSnapshot();
  });
  it('is correctly added to typegen', async () => {
    const types = await testHelper.createTypegen(self.create);
    expect(types).toMatchSnapshot();
  });

  describe('field configuration', () => {
    describe('is present', () => {
      let testType: core.NexusObjectTypeDef<'User'>;
      beforeEach(() => {
        testType = objectType({
          name: 'User',
          definition: (t) => {
            t.id('id');
            // @ts-expect-error reflection types have not been generated
            t.string('email', { inaccessible: true });
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

  describe('object configuration', () => {
    describe('is present', () => {
      let testType: core.NexusObjectTypeDef<'User'>;
      beforeEach(() => {
        testType = objectType({
          name: 'User',
          // @ts-expect-error reflection types have not been generated
          inaccessible: true,
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

  describe('input field configuration', () => {
    describe('is present', () => {
      let testType: core.NexusInputObjectTypeDef<'User'>;
      beforeEach(() => {
        testType = inputObjectType({
          name: 'User',
          definition: (t) => {
            t.id('id');
            // @ts-expect-error reflection types have not been generated
            t.string('email', { inaccessible: true });
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
      let testType: core.NexusInputObjectTypeDef<'User'>;
      beforeEach(() => {
        testType = inputObjectType({
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

  // describe('input object configuration', () => {
  //   describe('is present', () => {
  //     let testType: core.NexusInputObjectTypeDef<'User'>;
  //     beforeEach(() => {
  //       testType = inputObjectType({
  //         name: 'User',
  //         // inaccessible: true,
  //         definition: (t) => {
  //           t.id('id');
  //           t.string('email');
  //           t.string('name');
  //         },
  //       });
  //     });
  //     it('is correctly added to the schema', () => {
  //       const schema = testHelper.createSchema(self.create, {}, testType);
  //       expect(schema).toMatchSnapshot();
  //     });
  //     it('is correctly added to typegen', async () => {
  //       const typegen = await testHelper.createTypegen(
  //         self.create,
  //         {},
  //         testType,
  //       );
  //       expect(typegen).toMatchSnapshot();
  //     });
  //   });
  //   describe('is NOT present', () => {
  //     let testType: core.NexusInputObjectTypeDef<'User'>;
  //     beforeEach(() => {
  //       testType = inputObjectType({
  //         name: 'User',
  //         definition: (t) => {
  //           t.id('id');
  //           t.string('email');
  //           t.string('name');
  //         },
  //       });
  //     });
  //     it('is correctly added to the schema', () => {
  //       const schema = testHelper.createSchema(self.create, {}, testType);
  //       expect(schema).toMatchSnapshot();
  //     });
  //     it('is correctly added to typegen', async () => {
  //       const typegen = await testHelper.createTypegen(
  //         self.create,
  //         {},
  //         testType,
  //       );
  //       expect(typegen).toMatchSnapshot();
  //     });
  //   });
  // });
});
