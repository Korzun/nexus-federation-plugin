import { core, objectType } from 'nexus';

import { plugin, PluginOptions } from './plugin';
import * as testHelper from './test';

describe('plugin', () => {
  let testTypes: core.NexusObjectTypeDef<any>[];
  beforeEach(() => {
    testTypes = [];
    testTypes.push(
      objectType({
        name: 'Company',
        //@ts-expect-error reflection types have not been generated
        shareable: true,
        definition: (t) => {
          t.id('id');
          //@ts-expect-error reflection types have not been generated
          t.string('name', { external: true });
        },
      }),
    );
    testTypes.push(
      objectType({
        name: 'User',
        //@ts-expect-error reflection types have not been generated
        keys: ['id', 'email'],
        definition: (t) => {
          t.id('id');
          //@ts-expect-error reflection types have not been generated
          t.string('email', { shareable: true });
          t.string('name');
          //@ts-expect-error reflection types have not been generated
          t.string('title', { external: true });
          //@ts-expect-error reflection types have not been generated
          t.field('company', { type: 'Company', provides: ['name'] });
        },
      }),
    );
  });
  describe('default config', () => {
    const options: PluginOptions = {};
    it('generates the schema', () => {
      const nexusSchema = testHelper.makeSchema(plugin(options), testTypes);
      const metadata = testHelper.makeMetadata();
      const schema = metadata.generateSchemaFile(
        metadata.sortSchema(nexusSchema),
      );
      expect(schema).toMatchSnapshot();
    });
    it('generates typegen', async () => {
      const nexusSchema = testHelper.makeSchema(plugin(options), testTypes);
      const metadata = testHelper.makeMetadata();
      const typegen = await metadata.generateTypesFile(
        metadata.sortSchema(nexusSchema),
        '',
      );
      expect(typegen).toMatchSnapshot();
    });
  });
  describe('`prefixFieldset` configured to `false`', () => {
    const options: PluginOptions = { prefixFieldset: false };
    it('generates the schema with `FieldSet`', () => {
      const nexusSchema = testHelper.makeSchema(plugin(options), testTypes);
      const metadata = testHelper.makeMetadata();
      const schema = metadata.generateSchemaFile(
        metadata.sortSchema(nexusSchema),
      );
      expect(schema).toMatchSnapshot();
    });
    it('generates typegen with `FieldSet`', async () => {
      const nexusSchema = testHelper.makeSchema(plugin(options), testTypes);
      const metadata = testHelper.makeMetadata();
      const typegen = await metadata.generateTypesFile(
        metadata.sortSchema(nexusSchema),
        '',
      );
      expect(typegen).toMatchSnapshot();
    });
  });
  describe('`prefixFieldset` configured to `true`', () => {
    const options: PluginOptions = { prefixFieldset: true };
    it('generates the schema with `_FieldSet`', () => {
      const nexusSchema = testHelper.makeSchema(plugin(options), testTypes);
      const metadata = testHelper.makeMetadata();
      const schema = metadata.generateSchemaFile(
        metadata.sortSchema(nexusSchema),
      );
      expect(schema).toMatchSnapshot();
    });
    it('generates typegen with `_FieldSet`', async () => {
      const nexusSchema = testHelper.makeSchema(plugin(options), testTypes);
      const metadata = testHelper.makeMetadata();
      const typegen = await metadata.generateTypesFile(
        metadata.sortSchema(nexusSchema),
        '',
      );
      expect(typegen).toMatchSnapshot();
    });
  });
  describe('`enableKeyOnInterface` configured to `true`', () => {
    const options: PluginOptions = {
      enableKeyOnInterface: true,
    };
    it('generates the schema with `key` allowing `OBJECT` and `INTERFACE`', () => {
      const nexusSchema = testHelper.makeSchema(plugin(options), testTypes);
      const metadata = testHelper.makeMetadata();
      const schema = metadata.generateSchemaFile(
        metadata.sortSchema(nexusSchema),
      );
      expect(schema).toMatchSnapshot();
    });
    it('generates typegen with `key` allowing `OBJECT` and `INTERFACE`', async () => {
      const nexusSchema = testHelper.makeSchema(plugin(options), testTypes);
      const metadata = testHelper.makeMetadata();
      const typegen = await metadata.generateTypesFile(
        metadata.sortSchema(nexusSchema),
        '',
      );
      expect(typegen).toMatchSnapshot();
    });
  });
  describe('`enableKeyOnInterface` configured to `false`', () => {
    const options: PluginOptions = {
      enableKeyOnInterface: false,
    };
    it('generates the schema with `key` only allowing `OBJECT`', () => {
      const nexusSchema = testHelper.makeSchema(plugin(options), testTypes);
      const metadata = testHelper.makeMetadata();
      const schema = metadata.generateSchemaFile(
        metadata.sortSchema(nexusSchema),
      );
      expect(schema).toMatchSnapshot();
    });
    it('generates typegen with `key` only allowing `OBJECT`', async () => {
      const nexusSchema = testHelper.makeSchema(plugin(options), testTypes);
      const metadata = testHelper.makeMetadata();
      const typegen = await metadata.generateTypesFile(
        metadata.sortSchema(nexusSchema),
        '',
      );
      expect(typegen).toMatchSnapshot();
    });
  });
});
