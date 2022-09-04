import { addDirective, core } from 'nexus';

import { TypeCreate } from '../../builder';

import { directive } from './directive';
import { field } from './field';
import { inputObject } from './input-object';
import { object } from './object';

//TODO: Add missing type for argType, enum, enumValue
export const create: TypeCreate = (builder) => {
  builder.addOnInstallFunction((t) => {
    t.addType(directive);
  });

  /**
   * Adds `inaccessible` to Nexus field definitions and generates the
   * `@inaccessible` directive when it is detected in a field definition
   */
  builder.addFieldDefType(field);
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
  builder.addObjectDefType(object);
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

  //FIXME: Nexus Bug - the key `inaccessible` isn't properly surfaced in onAdd function
  // /**
  //  * Adds `inaccessible` to Nexus input object definitions and generates the
  //  * `@inaccessible` directive when it is detected in an input object definition
  //  */
  builder.addInputObjectDefType(inputObject);
  // builder.addOnInputObjectDefinitionFunction((inputObjectConfig) => {
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
