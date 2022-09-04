import { directive as nexusDirective, nonNull, stringArg } from 'nexus';

export type Options = {};

export const directive = (options?: Options) =>
  nexusDirective({
    name: 'override',
    locations: ['FIELD_DEFINITION'],
    args: { from: nonNull(stringArg()) },
    description: `
      **Apollo Federation 2.0 Subgraph**
      https://www.apollographql.com/docs/federation/federated-types/federated-directives#override
      
      Indicates that the current subgraph is taking
      responsibility for resolving the marked field away from the
      subgraph specified in the from argument.

      > Only one subgraph can @override any given field. If
      > multiple subgraphs attempt to @override the same field, a
      > composition error occurs.

      The following example will result in all query plans made to
      resolve \`User.name\` to be directed to \`Subgraph B\`.

      \`\`\`gql
      # In SubgraphA
      type User @key(fields: "id") {
        id: ID!
        name: String
      }

      # In SubgraphB
      type User @key(fields: "id") {
        id: ID!
        name: String @override(from: "SubgraphA")
      }
      \`\`\`
    `,
  });
