import { core } from 'nexus';

import { path } from '../../path';

// Must be globally unique
export type FederationProvidesField<
  TypeName extends string,
  FieldName extends string,
> = Array<keyof core.SourceValue<core.FieldTypeName<TypeName, FieldName>>>;

export type Options = {};

export const field = (options?: Options) =>
  core.printedGenTyping({
    description: `
    Annotates the expected returned fieldset from a field
      on a base type that is guaranteed to be selectable by the
      gateway. Given the following example:

      \`\`\`ts
      objectType({
        name: 'Review',
        keyFields: ['id'],
        definition: (t) => {
          t.field('product', { type: 'Product', provides: ['name'] });
        },
      });

      objectType({
        name: 'Product',
        keyFields: ['upc'],
        definition: (t) => {
          t.string('upc', { external: true });
          t.string('name', { external: true });
        },
      });
      \`\`\`

      When fetching \`Review.product\` from the Reviews service,
      it is possible to request the name with the expectation that
      the Reviews service can provide it when going from review to
      product. \`Product.name\` is an external field on an external
      type which is why the local type extension of \`Product\` and
      annotation of \`name\` is required.

      [Provides - Apollo Federation 2.0 Subgraph Spec](https://www.apollographql.com/docs/federation/federation-spec/#provides)
    `,
    imports: [
      core.printedGenTypingImport({
        module: path(__filename),
        bindings: ['FederationProvidesField'],
      }),
    ],
    name: 'provides',
    optional: true,
    type: 'FederationProvidesField<TypeName, FieldName>',
  });
