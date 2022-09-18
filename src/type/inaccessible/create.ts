import { addDirective, core } from 'nexus';

import { TypeCreate } from '../../builder';

import { directive, Options as DirectiveOptions } from './directive';
import { field, Options as FieldOptions } from './field';
import { inputField, Options as InputFieldOptions } from './input-field';
// import { inputObject, Options as InputObjectOptions } from './input-object';
import { object, Options as ObjectOptions } from './object';

export type Options = DirectiveOptions &
  FieldOptions &
  InputFieldOptions &
  ObjectOptions;

//TODO: Add missing type for argType, enum, enumValue
export const create: TypeCreate<Options> = (builder, options) => {
  builder.addOnInstallFunction((t) => {
    t.addType(directive(options));
  });

  /**
   * Adds `inaccessible` to Nexus field definitions and generates the
   * `@inaccessible` directive when it is detected in a field definition
   */
  builder.addFieldDefType(field(options));
  builder.addOnAddFieldFunction((fieldConfig) => {
    // @ts-expect-error reflection types have not been generated
    if (fieldConfig.inaccessible) {
      if (!fieldConfig.directives) {
        fieldConfig.directives = new Array();
      }
      (fieldConfig.directives as Array<core.NexusDirectiveUse>).push(
        addDirective('inaccessible', {}),
      );
    }
  });

  /**
   * Adds `inaccessible` to Nexus object definitions and generates the
   * `@inaccessible` directive when it is detected in an object definition
   */
  builder.addObjectDefType(object(options));
  builder.addOnObjectDefinitionFunction((t, objectConfig) => {
    // @ts-expect-error reflection types have not been generated
    if (objectConfig.inaccessible) {
      if (!objectConfig.directives) {
        objectConfig.directives = new Array();
      }
      (objectConfig.directives as Array<core.NexusDirectiveUse>).push(
        addDirective('inaccessible', {}),
      );
    }
  });

  /**
   * Adds `inaccessible` to Nexus input field definitions and generates the
   * `@inaccessible` directive when it is detected in an input field definition.
   *
   * For some reason it is not necessary to call `addInputFieldDefType` to add
   * the input field. The type added through `addFieldDefType` appears to be sufficient
   */
  builder.addInputFieldDefType(inputField(options));
  builder.addOnAddInputFieldFunction((inputFieldConfig) => {
    // @ts-expect-error reflection types have not been generated
    if (inputFieldConfig.inaccessible) {
      if (!inputFieldConfig.directives) {
        inputFieldConfig.directives = new Array();
      }
      (inputFieldConfig.directives as Array<core.NexusDirectiveUse>).push(
        addDirective('inaccessible', {}),
      );
    }
  });

  //FIXME: Nexus Bug - `directives` isn't properly implemented on `inputObjectConfig`
  // /**
  //  * Adds `inaccessible` to Nexus input object definitions and generates the
  //  * `@inaccessible` directive when it is detected in an input object definition
  //  */
  // builder.addInputObjectDefType(inputObject(options));
  // builder.addOnInputObjectDefinitionFunction((inputObjectConfig) => {
  //   // @ts-expect-error reflection types have not been generated
  //   if (inputObjectConfig.inaccessible) {
  //     if (!inputObjectConfig.directives) {
  //       inputObjectConfig.directives = new Array();
  //     }
  //     (inputObjectConfig.directives as Array<core.NexusDirectiveUse>).push(
  //       addDirective('inaccessible', {}),
  //     );
  //   }
  // });

  return builder;
};
