import { directive as nexusDirective, nonNull, stringArg } from 'nexus';

export type Options = {};

export const directive = (options?: Options) =>
  nexusDirective({
    name: 'override',
    locations: ['FIELD_DEFINITION'],
    args: { from: nonNull(stringArg()) },
  });
