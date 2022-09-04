import { arg, directive as nexusDirective, nonNull } from 'nexus';

import * as fieldSet from '../field-set';

export type Options = {
  enableKeyOnInterface?: boolean;
  prefixFieldset?: boolean;
};

export const directive = ({
  enableKeyOnInterface = false,
  prefixFieldset,
}: Options = {}) =>
  nexusDirective({
    name: 'key',
    locations: enableKeyOnInterface ? ['INTERFACE', 'OBJECT'] : ['OBJECT'],
    isRepeatable: true,
    args: {
      fields: nonNull(arg({ type: fieldSet.model({ prefixFieldset }) })),
    },
    description: `
      **Apollo Federation 2.0 Subgraph**
      https://www.apollographql.com/docs/federation/federation-spec/#key

      Indicates a combination of fields that can be used
      to uniquely identify and fetch an object or interface.
    `,
  });
