import { directive as nexusDirective } from 'nexus';

export type Options = {};

export const directive = (options?: Options) =>
  nexusDirective({
    name: 'shareable',
    locations: ['FIELD_DEFINITION', 'OBJECT'],
    description: `
      **Apollo Federation 2.0 Subgraph**
      https://www.apollographql.com/docs/federation/federation-spec/#shareable

      Indicates that an object type's field is allowed to be resolved
      by multiple subgraphs (by default in Federation 2, object
      fields can be resolved by only one subgraph).

      \`\`\`gql
      type Position {
        x: Int! @shareable
        y: Int! @shareable
      }
      \`\`\`

      If applied to an object type definition, all of that type's fields
      are considered \`@shareable\`:

      \`\`\`gql
      type Position @shareable {
        x: Int!
        y: Int!
      }
      \`\`\`

      If a field is marked \`@shareable\` in any subgraph, it must beo
      marked as either \`@shareable\` or \`@external\` in every Federation
      2 subgraph that defines it.

      If a Federation 2 supergraph includes a Federation 1 subgraph,
      all value types in the Federation 1 subgraph are automatically
      considered \`@shareable\` by the Federation 2 composition algorithm.
      
      If a field is included in an entity's \`@key\` directive, that
      field is automatically considered \`@shareable\` and the directive
      is not required in the corresponding subgraph(s).
    `,
  });
