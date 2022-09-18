import { directive as nexusDirective } from 'nexus';

export type Options = {};

export const directive = (options?: Options) =>
  nexusDirective({
    name: 'external',
    locations: ['FIELD_DEFINITION'],
    description: `
      **Apollo Federation 2.0 Subgraph**
      https://www.apollographql.com/docs/federation/federated-types/federated-directives#external

      Marks a field as owned by another service. This allows
      \`Service A\` to use fields from \`Service B\` while also
      knowing at runtime the types of that field. For example:

      \`\`\`gql
      # extended from the Users service
      extend type User @key(fields: "id") {
        id: ID! @external
        email: String @external
        reviews: [Review] @requires(fields: "email")
      }
      \`\`\`

      This type extension in the \`Reviews Service\` extends the
      \`User\` type from the \`Users Service\`. It extends it for
      the purpose of adding a new field \`reviews\`, which returns
      a list of \`Reviews\`.
    `,
  });
