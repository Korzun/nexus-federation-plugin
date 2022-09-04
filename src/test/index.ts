import {
  core,
  makeSchema as makeNexusSchema,
  plugin as createPlugin,
} from 'nexus';

import { create as createBuilder, TypeCreate } from '../builder';

const makeSchema = (pluginTypeCreate: TypeCreate, types?: any) => {
  const typeBuilder = pluginTypeCreate(createBuilder());
  return makeNexusSchema({
    types,
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
  types?: any,
): string => {
  const schema = makeSchema(pluginTypeCreate, types);
  const metadata = makeMetadata();
  return metadata.generateSchemaFile(metadata.sortSchema(schema));
};

export const createTypegen = async (
  pluginTypeCreate: TypeCreate,
  types?: any,
) => {
  const schema = makeSchema(pluginTypeCreate, types);
  const metadata = makeMetadata();
  return await metadata.generateTypesFile(metadata.sortSchema(schema), '');
};
