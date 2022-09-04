import { directive as nexusDirective } from 'nexus';

export const directive = nexusDirective({
  name: 'inaccessible',
  locations: [
    'ARGUMENT_DEFINITION',
    'ENUM_VALUE',
    'ENUM',
    'FIELD_DEFINITION',
    'INPUT_FIELD_DEFINITION',
    'INPUT_OBJECT',
    'INTERFACE',
    'OBJECT',
    'SCALAR',
    'UNION',
  ],
  description: `
    **Apollo Federation 2.0 Subgraph**
    https://www.apollographql.com/docs/federation/federation-spec/#inaccessible

    Indicates that a location within the schema is inaccessible.
    Inaccessible elements are available to query at the subgraph
    level but are not available to query at the supergraph level
    (through the router or gateway). This directive enables you
    to preserve composition while adding the field to your remaining
    subgraphs. You can remove the \`@inaccessible\` directive when the
    rollout is complete and begin using the field.

    \`\`\`gql
    interface Product {
      id: ID!
      sku: String
      package: String
      createdBy: User
      hidden: String @inaccessible
    }
    \`\`\`
  `,
});
