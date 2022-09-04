import { list, stringArg, directive as nexusDirective } from 'nexus';

export const directive = nexusDirective({
  name: 'link',
  locations: ['SCHEMA'],
  isRepeatable: true,
  args: {
    url: stringArg(),
    as: stringArg(),
    //TODO: The federation spec defines this as `link__Purpose`
    for: stringArg(),
    //TODO: The federation spec defines this as `[link__Import]`
    import: list(stringArg()),
  },
  description: `
    **Apollo Federation 2.0 Subgraph**
    https://www.apollographql.com/docs/federation/federation-spec/#link

    Links definitions within the document to external schemas.

    External schemas are identified by their \`url\`, which optionally
    ends with a name and version with the following format:
    \`{NAME}/v{MAJOR}.{MINOR}\`

    The presence of a \`@link\` directive makes a document a core
    schema.

    The \`for\` argument describes the purpose of a \`@link\`.
    Currently accepted values are \`SECURITY\` or \`EXECUTION\`.
    Core schema-aware servers such as Apollo Router and Gateway
    will refuse to operate on schemas that contain \`@link\`s to
    unsupported specs which are for: \`SECURITY\` or for:
    \`EXECUTION\`.

    By default, \`@link\`ed definitions will be namespaced, i.e.,
    \`@federation__requires\`. The \`as\` argument lets you pick the
    name for this namespace:

    \`\`\`gql
    extend schema @link(url: "https://specs.apollo.dev/federation/v2.0", as: "fed2")
    type User {
      metrics: Metrics @external
      favorites: UserFavorites @fed2__requires(fields: "metrics")
    }
    \`\`\`

    The import argument enables you to import external definitions
    into your namespace, so they are not prefixed.

    \`\`\`gql
    schema
      @link(url: "https://specs.apollo.dev/link/v1.0")
      @link(url: "https://specs.apollo.dev/federation/v2.0", import: ["@key", "@requires", "@provides", "@external", { name: "@tag", as: "@mytag" }, "@extends", "@shareable", "@inaccessible", "@override"])
    \`\`\`

    In the example above, we import various directives from \`federation/v2.0\`
    into our namespace. We also rename one of them, bringing in
    federation's \`@tag\` as \`@mytag\` to distinguish it from a
    different \`@tag\` directive already in the schema.
  `,
});
