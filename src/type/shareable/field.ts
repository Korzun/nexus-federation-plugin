import { core } from 'nexus';

import { path } from '../../path';

//Must be globally unique
export type FederationShareableField = true;

export type Options = {};

export const field = (options?: Options) =>
  core.printedGenTyping({
    description: `
      Indicates that every field on an object can be resolved
      by multiple subgraphs. Any subgraph that includes a shareable
      field can potentially resolve a query for that field. To successfully
      compose, a field must have the same shareability mode (either
      shareable or non-shareable) across all subgraphs.

      \`\`\`ts
      objectType({
        name: 'Product',
        keyFields: ['upc'],
        definition: (t) => 
        {
          t.field('upc', { type: 'UPC' });              // shareable because upc is a key field
          t.string('name');                             // non-shareable
          t.string('description', { shareable: true }); // shareable
        }
      });
      \`\`\`

      [Sharable - Apollo Federation 2.0 Subgraph Spec](https://www.apollographql.com/docs/federation/federation-spec/#shareable)
    `,
    imports: [
      core.printedGenTypingImport({
        module: path(__filename),
        bindings: ['FederationShareableField'],
      }),
    ],
    name: 'shareable',
    optional: true,
    type: 'FederationShareableField',
  });
