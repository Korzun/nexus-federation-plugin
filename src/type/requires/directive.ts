import { arg, directive as nexusDirective, nonNull } from 'nexus';

import * as fieldSet from '../field-set';

export type Options = {
  prefixFieldSet?: boolean;
};

export const directive = ({ prefixFieldSet = true }: Options = {}) =>
  nexusDirective({
    name: 'requires',
    locations: ['FIELD_DEFINITION'],
    args: {
      fields: nonNull(arg({ type: fieldSet.getModelName(prefixFieldSet) })),
    },
  });
