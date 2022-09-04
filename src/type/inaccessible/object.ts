import { core } from 'nexus';

import { path } from '../../path';

// Must be globally unique
export type FederationInaccessibleObject = true;

export const object = core.printedGenTyping({
  description: `
    Indicates that an **object** within the schema is inaccessible.
    Inaccessible elements are available to query at the subgraph
    level but are not available to query at the supergraph level
    (through the router or gateway). This directive enables you
    to preserve composition while adding the **object** to your remaining
    subgraphs. You can remove the \`@inaccessible\` directive when the
    rollout is complete and begin using the **object**.

    \`\`\`ts
    objectType({
      name: 'Product',
      inaccessible: true
      definition: (t) =>
      {
        t.id('id');
        t.nullable.string('sku');
        t.nullable.string('package');
        t.nullable.field('createdBy', { type: 'User' });
        t.nullable.string('hidden');
      }
    });
    \`\`\`

    [Inaccessible - Apollo Federation 2.0 Subgraph Spec](https://www.apollographql.com/docs/federation/federation-spec/#inaccessible)
  `,
  imports: [
    core.printedGenTypingImport({
      module: path(__filename),
      bindings: ['FederationInaccessibleObject'],
    }),
  ],
  name: 'inaccessible',
  optional: true,
  type: 'FederationInaccessibleObject',
});
