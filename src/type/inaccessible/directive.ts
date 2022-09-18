import { directive as nexusDirective } from 'nexus';

export type Options = {};

export const directive = (options?: Options) =>
  nexusDirective({
    name: 'inaccessible',
    locations: [
      'ARGUMENT_DEFINITION',
      'ENUM_VALUE',
      'ENUM',
      'FIELD_DEFINITION',
      'INPUT_FIELD_DEFINITION',
      'INPUT_OBJECT',
      'INTERFACE',
      'OBJECT',
      'SCALAR',
      'UNION',
    ],
  });
