import { arg, directive as nexusDirective, nonNull } from 'nexus';

import * as fieldSet from '../field-set';

export type Options = {
  prefixFieldset?: boolean;
};

export const directive = ({ prefixFieldset }: Options = {}) =>
  nexusDirective({
    name: 'provides',
    locations: ['FIELD_DEFINITION'],
    args: {
      fields: nonNull(arg({ type: fieldSet.model({ prefixFieldset }) })),
    },
    description: `
      **Apollo Federation 2.0 Subgraph**
      https://www.apollographql.com/docs/federation/federation-spec/#provides
      
      Annotates the expected returned fieldset from a
      field on a base type that is guaranteed to be selectable
      by the gateway. Given the following example:

      \`\`\`gql
      type Review @key(fields: "id") {
        product: Product @provides(fields: "name")
      }
      
      extend type Product @key(fields: "upc") {
        upc: String @external
        name: String @external
      }
      \`\`\`

      When fetching \`Review.product\` from the Reviews service,
      it is possible to request the name with the expectation that
      the Reviews service can provide it when going from review to
      product. \`Product.name\` is an external field on an external
      type which is why the local type extension of \`Product\` and
      annotation of \`name\` is required.
    `,
  });
