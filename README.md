# Nexus Federation Plugin

[![npm version](https://badge.fury.io/js/@korzun%2Fnexus-federation-plugin.svg)](https://badge.fury.io/js/@korzun%2Fnexus-federation-plugin)

A [Nexus](https://nexusjs.org/) plugin integrating [Apollo Federation 2.0](https://www.apollographql.com/docs/federation)

## Installation

```shell
yarn add @korzun/nexus-federation-plugin
or
npm i @korzun/nexus-federation-plugin
```

Note you must also add `nexus`. The plugin pins to it as a [peer dependency](https://nodejs.org/en/blog/npm/peer-dependencies/).

## Setup

```ts
import { plugin as federationPlugin } from '@korzun/nexus-federation-plugin';
import { makeSchema, objectType } from 'nexus';

// Create example User Type
const User = objectType({
  name: 'User',
  keys: ['id'],
  definition(t) {
    t.id('id');
    t.string('name');
  },
});

// Build Nexus Schema
const schema = makeSchema({
  types: [User],
  plugins: [
    federationPlugin(),
  ]
});
```

### With Apollo Server

```ts
import { ApolloServer, gql } from 'apollo-server-core';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { getResolversFromSchema } from '@graphql-tools/utils';

// Create Subgraph Schema from Nexus Schema
const resolvers = getResolversFromSchema(nexusSchema);
const typeDefs = gql.(printSchema(nexusSchema));
//@ts-expect-error buildSubgraphSchema doesn't recognize the IResolvers type
const subgraphSchema = buildSubgraphSchema({ typeDefs, resolvers });

// Start Apollo Server
const server = new GraphQLServer({ schema })
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
```

## Configuration

| Name/Type      | Description |
| ----------- | ----------- |
| `prefixFieldset`<br/>`Boolean`| Some future version of Federation 2.0 specification is going to switch from `_FieldSet` to `FieldSet`. Version 0.8.1 of the Rover CLI throws an error when the underscore prefix is omitted. This configuration allows compatibility with that version, whenever it is released. |
| `enableKeyOnInterface`<br/>`Boolean` | The Federation 1.0 specification allows `@key` on interfaces. The Federation 2.0 specification does not. This configuration allows for backward compatibility. |

## Examples

### External

```ts
objectType({
  name: 'User',
  definition: (t) => {
    t.string('email', { external: true });
    t.string.field('review', { type: 'Review' });
  },
});
```

### Keys

```ts
objectType({
  name: 'User',
  keys: ['id'],
  definition(t) {
    t.id('id');
    t.string('name');
  },
});
```

### Override

```ts
objectType({
  name: 'User',
  keyFields: ['id'],
  definition: (t) => {
    t.id('id');
    t.nullable.string('name', override: 'SubgraphA');
  },
});
```

### Provides

```ts
objectType({
  name: 'Review',
  keyFields: ['id'],
  definition: (t) => {
    t.field('product', { type: 'Product', provides: ['name'] });
  },
});
```

### Requires

```ts
objectType({
  name: 'User',
  keyFields: ['id'],
  definition: (t) => {
    t.id('id', { external: true });
    t.nullable.string('email', { external: true });
    t.list.field('reviews', { type: 'Review', requires: ['email'] });
  },
});
```

### Sharable

#### Sharable Field

```ts
objectType({
  name: 'Product',
  keyFields: ['upc'],
  definition: (t) => 
  {
    t.field('upc', { type: 'UPC' });              // shareable, upc is a key field
    t.string('name');                             // non-shareable
    t.string('description', { shareable: true }); // shareable
  }
});
```

#### Sharable Object Type

```ts
objectType({
  name: 'User',
  shareable: true,
  definition: (t) => {
    t.string('name');  // shareable, User is marked shareable
    t.string('email'); // shareable, User is marked shareable
  },
});
```
