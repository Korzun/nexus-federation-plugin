import { addDirective, core } from 'nexus';

import { TypeCreate } from '../../builder';

import { directive, Options as DirectiveOptions } from './directive';
import { object, Options as ObjectOptions } from './object';

export type Options = DirectiveOptions & ObjectOptions;

export const create: TypeCreate<Options> = (builder, options) => {
  /**
   * Adds `@key` directive to the schema
   */
  builder.addOnInstallFunction((t) => {
    t.addType(directive(options));
  });

  /**
   * Adds `keys` to Nexus object definitions and generates the `@key` directive
   * when it is detected in a object definition
   */
  builder.addObjectDefType(object(options));
  builder.addOnObjectDefinitionFunction((block, objectConfig) => {
    // @ts-expect-error reflection types have not been generated
    if (objectConfig.keys) {
      if (!objectConfig.directives) {
        objectConfig.directives = new Array();
      }
      (objectConfig.directives as Array<core.NexusDirectiveUse>).push(
        // @ts-expect-error reflection types have not been generated
        addDirective('key', { fields: objectConfig.keys.join(' ') }),
      );
    }
  });

  return builder;
};
