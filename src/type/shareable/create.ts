import { addDirective, core } from 'nexus';

import { TypeCreate } from '../../builder';

import { directive, Options as DirectiveOptions } from './directive';
import { field, Options as FieldOptions } from './field';
import { object, Options as ObjectOptions } from './object';

export type Options = DirectiveOptions & FieldOptions & ObjectOptions;

export const create: TypeCreate<Options> = (builder, options) => {
  /**
   * Adds `@shareable` directive to the schema
   */
  builder.addOnInstallFunction((t) => {
    t.addType(directive(options));
  });

  /**
   * Adds `shareable` to Nexus object definitions and generates the `@shareable`
   * directive when it is detected in an object definition
   */
  builder.addObjectDefType(object(options));
  builder.addOnObjectDefinitionFunction((t, objectConfig) => {
    // @ts-expect-error reflection types have not been generated
    if (objectConfig.shareable) {
      if (!objectConfig.directives) {
        objectConfig.directives = new Array();
      }
      (objectConfig.directives as Array<core.NexusDirectiveUse>).push(
        addDirective('shareable', {}),
      );
    }
  });

  /**
   * Adds `shareable` to Nexus field definitions and generates the `@shareable`
   * directive when it is detected in a field definition
   */
  builder.addFieldDefType(field(options));
  builder.addOnAddFieldFunction((fieldConfig) => {
    // @ts-expect-error reflection types have not been generated
    if (fieldConfig.shareable) {
      if (!fieldConfig.directives) {
        fieldConfig.directives = new Array();
      }
      (fieldConfig.directives as Array<core.NexusDirectiveUse>).push(
        addDirective('shareable', {}),
      );
    }
  });

  return builder;
};
