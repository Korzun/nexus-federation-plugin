import { core, plugin as createPlugin } from 'nexus';

import {
  create as createTypes,
  CreateOptions as CreateTypesOptions,
} from './type';

export type PluginOptions = CreateTypesOptions;

export const plugin = (options?: PluginOptions): core.NexusPlugin => {
  const types = createTypes(options);
  return createPlugin({
    name: 'federation',
    description: `
      Apollo Federation 2.0 is a powerful, open architecture for creating
      a supergraph that combines multiple GraphQL APIs

      With federation, you can responsibly share ownership of your supergraph
      across any number of teams. And even if you currently only have
      one GraphQL API, Apollo Federation is essential for scaling that
      API as you grow your features, user base, and organization.
      
      [Apollo Federation 2.0 Subgraph Spec](https://www.apollographql.com/docs/federation/federation-spec)
    `,
    ...types,
  });
};
