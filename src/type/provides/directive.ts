import { arg, directive as nexusDirective, nonNull } from 'nexus';

import * as fieldSet from '../field-set';

export type Options = {
  prefixFieldSet?: boolean;
};

export const directive = ({ prefixFieldSet }: Options = {}) =>
  nexusDirective({
    name: 'provides',
    locations: ['FIELD_DEFINITION'],
    args: {
      fields: nonNull(arg({ type: fieldSet.getModelName(prefixFieldSet) })),
    },
  });
