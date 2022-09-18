import { arg, directive as nexusDirective, nonNull } from 'nexus';

import * as fieldSet from '../field-set';

export type Options = {
  enableKeyOnInterface?: boolean;
  prefixFieldSet?: boolean;
};

export const directive = ({
  enableKeyOnInterface = false,
  prefixFieldSet,
}: Options = {}) =>
  nexusDirective({
    name: 'key',
    locations: enableKeyOnInterface ? ['INTERFACE', 'OBJECT'] : ['OBJECT'],
    isRepeatable: true,
    args: {
      fields: nonNull(arg({ type: fieldSet.getModelName(prefixFieldSet) })),
    },
    description: `
      **Apollo Federation 2.0 Subgraph**
      https://www.apollographql.com/docs/federation/federated-types/federated-directives#key

      Indicates a combination of fields that can be used
      to uniquely identify and fetch an object or interface.
    `,
  });
