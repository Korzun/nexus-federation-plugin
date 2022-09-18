import { directive as nexusDirective } from 'nexus';

export type Options = {};

export const directive = (options?: Options) =>
  nexusDirective({
    name: 'external',
    locations: ['FIELD_DEFINITION'],
  });
