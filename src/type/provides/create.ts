import { addDirective, core } from 'nexus';

import { TypeCreate } from '../../builder';

import { directive, Options as DirectiveOptions } from './directive';
import { field, Options as FieldOptions } from './field';

export type Options = DirectiveOptions & FieldOptions;

export const create: TypeCreate<Options> = (builder, options) => {
  /**
   * Adds `@provides` directive to the schema
   */
  builder.addOnInstallFunction((t) => {
    t.addType(directive(options));
  });

  /**
   * Adds `provides` to Nexus field definitions and generates the `@provides`
   * directive when it is detected in a field definition
   */
  builder.addFieldDefType(field(options));
  builder.addOnAddFieldFunction((fieldConfig) => {
    // @ts-expect-error reflection types have not been generated
    if (fieldConfig.provides) {
      if (!fieldConfig.directives) {
        fieldConfig.directives = new Array();
      }
      (fieldConfig.directives as Array<core.NexusDirectiveUse>).push(
        // @ts-expect-error reflection types have not been generated
        addDirective('provides', { fields: fieldConfig.provides.join(' ') }),
      );
    }
  });

  return builder;
};
