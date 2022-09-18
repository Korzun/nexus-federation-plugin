import { core } from 'nexus';

import { path } from '../../path';

//Must be globally unique
export type FederationRequiresField<TypeName extends string> =
  (keyof core.SourceValue<TypeName>)[];

export type Options = {};

export const field = (options?: Options) =>
  core.printedGenTyping({
    description: `
      Annotates the required input fieldset from a base type
      for a resolver. It is used to develop a query plan where the
      required fields may not be needed by the client, but the
      service may need additional information from other services.
      For example:

      \`\`\`ts
      objectType({
        name: 'User',
        keyFields: ['id'],
        definition: (t) => {
          t.id('id', { external: true });
          t.nullable.string('email', { external: true });
          t.list.field('reviews', { type: 'Review', requires: ['email'] });
        },
      });
      \`\`\`

      In this case, the Reviews service adds new capabilities to the
      User type by providing a list of reviews related to a user. In
      order to fetch these reviews, the Reviews service needs to
      know the email of the User from the Users service in order to
      look up the reviews. This means the reviews field / resolver
      requires the email field from the base User type.

      [Requires - Apollo Federation 2.0 Subgraph Spec](https://www.apollographql.com/docs/federation/federated-types/federated-directives#requires)
    `,
    imports: [
      core.printedGenTypingImport({
        module: path(__filename),
        bindings: ['FederationRequiresField'],
      }),
    ],
    name: 'requires',
    optional: true,
    type: 'FederationRequiresField<TypeName>',
  });
