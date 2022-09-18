import { core } from 'nexus';

import { path } from '../../path';

//Must be globally unique
export type FederationShareableObject = true;

export type Options = {};

export const object = (options?: Options) =>
  core.printedGenTyping({
    description: `
    Indicates that every field on an object can be resolved
    by multiple subgraphs. Any subgraph that includes a shareable
    field can potentially resolve a query for that field. To successfully
    compose, a field must have the same shareability mode (either
    shareable or non-shareable) across all subgraphs.

    Adding the shareable to an object is equivalent to marking each
    field on the object shareable.

    \`\`\`ts
    objectType({
      name: 'User',
      shareable: true,
      definition: (t) => {
        t.string('name');  // shareable because User is marked shareable
        t.string('email'); // shareable because User is marked shareable
      },
    });
    \`\`\`

    [Sharable - Apollo Federation 2.0 Subgraph Spec](https://www.apollographql.com/docs/federation/federated-types/federated-directives#shareable)
  `,
    imports: [
      core.printedGenTypingImport({
        module: path(__filename),
        bindings: ['FederationShareableObject'],
      }),
    ],
    name: 'shareable',
    optional: true,
    type: 'FederationShareableObject',
  });
