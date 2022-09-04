import { core } from 'nexus';

import { path } from '../../path';

// Must be globally unique
export type FederationInaccessibleInputObject = true;

export const inputObject = core.printedGenTyping({
  description: `
    Indicates that an **input object** within the schema is inaccessible.
    Inaccessible elements are available to query at the subgraph
    level but are not available to query at the supergraph level
    (through the router or gateway). This directive enables you
    to preserve composition while adding the **input object** to your remaining
    subgraphs. You can remove the \`@inaccessible\` directive when the
    rollout is complete and begin using the **input object**.

    \`\`\`ts
    inputObjectType({
      name: 'CreateProductInput',
      inaccessible: true,
      definition: (t) => {
        t.nullable.string('sku');
        t.nullable.string('package');
        t.nullable.field('createdBy', { type: 'User' });
        t.nullable.string('hidden');
      },
    });
    \`\`\`

    [Inaccessible - Apollo Federation 2.0 Subgraph Spec](https://www.apollographql.com/docs/federation/federation-spec/#inaccessible)
  `,
  imports: [
    core.printedGenTypingImport({
      module: path(__filename),
      bindings: ['FederationInaccessibleInputObject'],
    }),
  ],
  name: 'inaccessible',
  optional: true,
  type: 'FederationInaccessibleInputObject',
});
