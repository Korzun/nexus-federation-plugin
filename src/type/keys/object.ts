import { core } from 'nexus';

import { path } from '../../path';

// Must be globally unique
export type FederationKeysObject<TypeName extends string> =
  (keyof core.SourceValue<TypeName>)[];

export type Options = {};

export const object = (options?: Options) =>
  core.printedGenTyping({
    description: `
      Indicates a combination of fields that can be used to
      uniquely identify and fetch an object or interface.

      \`\`\`ts
      objectType({
        name: 'User',
        keys: ['id'],
        definition(t) {
          t.id('id');
          t.string('name');
        },
      });
      \`\`\`

      [Key - Apollo Federation 2.0 Subgraph Spec](https://www.apollographql.com/docs/federation/federation-spec/#key)
    `,
    imports: [
      core.printedGenTypingImport({
        module: path(__filename),
        bindings: ['FederationKeysObject'],
      }),
    ],
    name: 'keys',
    optional: true,
    type: 'FederationKeysObject<TypeName>',
  });
