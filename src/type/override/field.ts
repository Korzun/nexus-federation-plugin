import { core } from 'nexus';

import { path } from '../../path';

// Must be globally unique
export type FederationOverrideField = string;

export type Options = {};

export const field = (options?: Options) =>
  core.printedGenTyping({
    description: `
      Indicates that the current subgraph is taking responsibility
      for resolving the marked field away from the subgraph
      specified in the from argument.

      > Only one subgraph can @override any given field. If
      > multiple subgraphs attempt to @override the same field, a
      > composition error occurs.

      The following example will result in all query plans made to
      resolve \`User.name\` to be directed to \`Subgraph B\`.

      \`\`\`ts
      // in SubgraphA
      objectType({
        name: 'User',
        keyFields: ['id'],
        definition: (t) => {
          t.id('id');
          t.nullable.string('name');
        },
      });

      // in SubgraphB
      objectType({
        name: 'User',
        keyFields: ['id'],
        definition: (t) => {
          t.id('id');
          t.nullable.string('name', override: 'SubgraphA');
        },
      });
      \`\`\`

      [Override - Apollo Federation 2.0 Subgraph Spec](https://www.apollographql.com/docs/federation/federated-types/federated-directives#override)
    `,
    imports: [
      core.printedGenTypingImport({
        module: path(__filename),
        bindings: ['FederationOverrideField'],
      }),
    ],
    name: 'override',
    optional: true,
    type: 'FederationOverrideField',
  });
