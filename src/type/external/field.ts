import { core } from 'nexus';

import { path } from '../../path';

// Must be globally unique
export type FederationExternalField = true;

export type Options = {};

export const field = (options?: Options) =>
  core.printedGenTyping({
    description: `
      Marks a field as owned by another service. This allows
      \`Service A\` to use fields from \`Service B\` while also
      knowing at runtime the types of that field. For example:

      \`\`\`ts
      objectType({
        name: 'User',
        definition: (t) => {
          t.string('email', { external: true });
          t.list.field('review', { type: 'Review' });
        },
      });
      \`\`\`

      This type extension in the \`Reviews Service\` extends the
      \`User\` type from the \`Users Service\`. It extends it for
      the purpose of adding a new field \`reviews\`, which returns
      a list of \`Reviews\`.

      [External - Apollo Federation 2.0 Subgraph Spec](https://www.apollographql.com/docs/federation/federated-types/federated-directives#external)
    `,
    imports: [
      core.printedGenTypingImport({
        module: path(__filename),
        bindings: ['FederationExternalField'],
      }),
    ],
    name: 'external',
    optional: true,
    type: 'FederationExternalField',
  });
