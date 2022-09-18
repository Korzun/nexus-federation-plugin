import {
  core,
  makeSchema as makeNexusSchema,
  plugin as createPlugin,
  queryField,
} from 'nexus';

import { create as createBuilder, TypeCreate } from '../builder';

export const createSchema = (
  pluginTypeCreate: TypeCreate | TypeCreate[],
  typeCreateOptions: Record<string, any> = {},
  types?: any,
): string => {
  const plugin = makePlugin(
    Array.isArray(pluginTypeCreate) ? pluginTypeCreate : [pluginTypeCreate],
    typeCreateOptions,
  );
  const schema = makeSchema(plugin, types);
  const metadata = makeMetadata();
  return metadata.generateSchemaFile(metadata.sortSchema(schema));
};

export const createTypegen = async (
  pluginTypeCreate: TypeCreate | TypeCreate[],
  typeCreateOptions: Record<string, any> = {},
  types?: any,
) => {
  const plugin = makePlugin(
    Array.isArray(pluginTypeCreate) ? pluginTypeCreate : [pluginTypeCreate],
    typeCreateOptions,
  );
  const schema = makeSchema(plugin, types);
  const metadata = makeMetadata();
  return await metadata.generateTypesFile(metadata.sortSchema(schema), '');
};

export const makeMetadata = () => {
  return new core.TypegenMetadata({
    outputs: { typegen: null, schema: null },
  });
};

export const makePlugin = (
  pluginTypeCreate: TypeCreate[],
  typeCreateOptions: Record<string, any> = {},
): core.NexusPlugin => {
  const typeBuilder = pluginTypeCreate.reduce(
    (typeBuilder, pluginTypeCreate) =>
      pluginTypeCreate(typeBuilder, typeCreateOptions),
    createBuilder(),
  );
  return createPlugin({
    name: 'federation',
    ...typeBuilder.build(),
  });
};

export const makeSchema = (plugin: core.NexusPlugin, types?: any) => {
  // Nexus adds an `ok` query to schemas lacking a query. The query can
  // vary a bit depending on the scenario. This `testQuery` prevents
  // that behavior making the schema and typegen output more consistent.
  const testQuery = queryField('test', { type: 'Boolean' });
  return makeNexusSchema({
    types: [testQuery, types],
    plugins: [plugin],
    features: {
      abstractTypeStrategies: {
        resolveType: true,
        __typename: true,
      },
    },
  });
};
