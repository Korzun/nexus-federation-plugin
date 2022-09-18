import { arg, directive as nexusDirective, nonNull } from 'nexus';

import * as fieldSet from '../field-set';

export type Options = {
  prefixFieldset?: boolean;
};

export const directive = ({ prefixFieldset = true }: Options = {}) =>
  nexusDirective({
    name: 'requires',
    locations: ['FIELD_DEFINITION'],
    args: {
      fields: nonNull(arg({ type: fieldSet.getModelName(prefixFieldset) })),
    },
    description: `
      **Apollo Federation 2.0 Subgraph**
      https://www.apollographql.com/docs/federation/federated-types/federated-directives#requires
      
      Annotates the required input fieldset from a base
      type for a resolver. It is used to develop a query plan
      where the required fields may not be needed by the client,
      but the service may need additional information from other
      services. For example:

      \`\`\`gql
      # extended from the Users service
      extend type User @key(fields: "id") {
        id: ID! @external
        email: String @external
        reviews: [Review] @requires(fields: "email")
      }
      \`\`\`

      In this case, the \`Reviews Service\` adds new capabilities
      to the \`User\` type by providing a list of reviews related
      to a user. In order to fetch these reviews, the \`Reviews
      Service\` needs to know the email of the \`User\` from the
      \`Users Service\` in order to look up the reviews. This
      means the reviews field / resolver requires the email field
      from the base \`User\` type.
    `,
  });
