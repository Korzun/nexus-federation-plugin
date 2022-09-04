import {
  core,
  makeSchema as makeNexusSchema,
  plugin as createPlugin,
  queryField,
} from 'nexus';

import { create as createBuilder, TypeCreate } from '../builder';

const makeSchema = (
  pluginTypeCreate: TypeCreate,
  typeCreateOptions: Record<string, any> = {},
  types?: any,
) => {
  // Nexus will occasionally adds an `ok` query, this `testQuery` prevents
  // that behavior and makes schema and typegen output more reliable.
  const testQuery = queryField('test', { type: 'Boolean' });
  const typeBuilder = pluginTypeCreate(createBuilder(), typeCreateOptions);
  return makeNexusSchema({
    types: [testQuery, types],
    features: {
      abstractTypeStrategies: {
        resolveType: true,
        __typename: true,
      },
    },
    plugins: [
      createPlugin({
        name: 'federation',
        ...typeBuilder.build(),
      }),
    ],
  });
};

const makeMetadata = () => {
  return new core.TypegenMetadata({
    outputs: { typegen: null, schema: null },
  });
};

export const createSchema = (
  pluginTypeCreate: TypeCreate,
  typeCreateOptions: Record<string, any> = {},
  types?: any,
): string => {
  const schema = makeSchema(pluginTypeCreate, typeCreateOptions, types);
  const metadata = makeMetadata();
  return metadata.generateSchemaFile(metadata.sortSchema(schema));
};

export const createTypegen = async (
  pluginTypeCreate: TypeCreate,
  typeCreateOptions: Record<string, any> = {},
  types?: any,
) => {
  const schema = makeSchema(pluginTypeCreate, typeCreateOptions, types);
  const metadata = makeMetadata();
  return await metadata.generateTypesFile(metadata.sortSchema(schema), '');
};
