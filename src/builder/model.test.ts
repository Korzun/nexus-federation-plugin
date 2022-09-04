import { GraphQLSchema } from 'graphql';
import {
  InputDefinitionBlock,
  NexusFinalArgConfig,
  NexusInputFieldDef,
  NexusInputObjectTypeConfig,
  NexusObjectTypeConfig,
  NexusOutputFieldDef,
  ObjectDefinitionBlock,
  PluginBuilderLens,
} from 'nexus/dist/core';

import { create } from './model';
import type { TypeBuilder } from './model.type';

describe('Type Builder', () => {
  let typeBuilder: TypeBuilder;
  beforeEach(() => {
    typeBuilder = create();
  });

  describe('argDefType', () => {
    it('builds added types into plugin', () => {
      const argTypeDef = 'argTypeDef';
      typeBuilder.addArgDefType(argTypeDef);

      const pluginTypes = typeBuilder.build();

      expect(pluginTypes.argTypeDefTypes).toContain(argTypeDef);
    });
  });

  describe('fieldDefType', () => {
    it('builds added types into plugin', () => {
      const fieldTypeDef = 'fieldTypeDef';
      typeBuilder.addFieldDefType(fieldTypeDef);

      const pluginTypes = typeBuilder.build();

      expect(pluginTypes.fieldDefTypes).toContain(fieldTypeDef);
    });
  });

  describe('inputFieldDefType', () => {
    it('builds added types into plugin', () => {
      const inputFieldDefType = 'inputFieldDefType';
      typeBuilder.addInputFieldDefType(inputFieldDefType);

      const pluginTypes = typeBuilder.build();

      expect(pluginTypes.inputFieldDefTypes).toContain(inputFieldDefType);
    });
  });

  describe('inputObjectDefType', () => {
    it('builds added types into plugin', () => {
      const inputObjectDefType = 'inputObjectDefType';
      typeBuilder.addInputObjectDefType(inputObjectDefType);

      const pluginTypes = typeBuilder.build();

      expect(pluginTypes.inputObjectTypeDefTypes).toContain(inputObjectDefType);
    });
  });

  describe('objectDefType', () => {
    it('builds added types into plugin', () => {
      const objectDefType = 'objectDefType';
      typeBuilder.addObjectDefType(objectDefType);

      const pluginTypes = typeBuilder.build();

      expect(pluginTypes.objectTypeDefTypes).toContain(objectDefType);
    });
  });

  describe('onAddArgFunction', () => {
    it('builds added functions into plugin', () => {
      const onAddArgFunction = jest.fn();
      typeBuilder.addOnAddArgFunction(onAddArgFunction);
      const onAddArgFunctionTwo = jest.fn();
      typeBuilder.addOnAddArgFunction(onAddArgFunctionTwo);
      const finalArgConfig = {} as NexusFinalArgConfig;

      const pluginTypes = typeBuilder.build();
      pluginTypes.onAddArg(finalArgConfig);

      expect(onAddArgFunction).toHaveBeenCalledWith(finalArgConfig);
      expect(onAddArgFunctionTwo).toHaveBeenCalledWith(finalArgConfig);
    });
  });

  describe('onAddInputFieldFunction', () => {
    it('builds added functions into plugin', () => {
      const onAddInputFieldFunction = jest.fn();
      typeBuilder.addOnAddInputFieldFunction(onAddInputFieldFunction);
      const onAddInputFieldFunctionTwo = jest.fn();
      typeBuilder.addOnAddInputFieldFunction(onAddInputFieldFunctionTwo);
      const inputFieldDef = {} as NexusInputFieldDef;

      const pluginTypes = typeBuilder.build();
      pluginTypes.onAddInputField(inputFieldDef);

      expect(onAddInputFieldFunction).toHaveBeenCalledWith(inputFieldDef);
      expect(onAddInputFieldFunctionTwo).toHaveBeenCalledWith(inputFieldDef);
    });
  });

  describe('onAddFieldFunction', () => {
    it('builds added functions into plugin', () => {
      const onAddFieldFunction = jest.fn();
      typeBuilder.addOnAddFieldFunction(onAddFieldFunction);
      const onAddFieldFunctionTwo = jest.fn();
      typeBuilder.addOnAddFieldFunction(onAddFieldFunctionTwo);
      const outputFieldDef = {} as NexusOutputFieldDef;

      const pluginTypes = typeBuilder.build();
      pluginTypes.onAddOutputField(outputFieldDef);

      expect(onAddFieldFunction).toHaveBeenCalledWith(outputFieldDef);
      expect(onAddFieldFunctionTwo).toHaveBeenCalledWith(outputFieldDef);
    });
  });

  describe('onAddOutputFieldFunction', () => {
    it('builds added functions into plugin', () => {
      const onAddOutputFieldFunction = jest.fn();
      typeBuilder.addOnAddOutputFieldFunction(onAddOutputFieldFunction);
      const onAddOutputFieldFunctionTwo = jest.fn();
      typeBuilder.addOnAddOutputFieldFunction(onAddOutputFieldFunctionTwo);
      const outputFieldDef = {} as NexusOutputFieldDef;

      const pluginTypes = typeBuilder.build();
      pluginTypes.onAddOutputField(outputFieldDef);

      expect(onAddOutputFieldFunction).toHaveBeenCalledWith(outputFieldDef);
      expect(onAddOutputFieldFunctionTwo).toHaveBeenCalledWith(outputFieldDef);
    });
  });

  describe('onAfterBuildFunction', () => {
    it('builds added functions into plugin', () => {
      const onAfterBuildFunction = jest.fn();
      typeBuilder.addOnAfterBuildFunction(onAfterBuildFunction);
      const onAfterBuildFunctionTwo = jest.fn();
      typeBuilder.addOnAfterBuildFunction(onAfterBuildFunctionTwo);
      const graphQlSchema = {} as GraphQLSchema;

      const pluginTypes = typeBuilder.build();
      pluginTypes.onAfterBuild(graphQlSchema);

      expect(onAfterBuildFunction).toHaveBeenCalledWith(graphQlSchema);
      expect(onAfterBuildFunctionTwo).toHaveBeenCalledWith(graphQlSchema);
    });
  });

  describe('onBeforeBuildFunction', () => {
    it('builds added functions into plugin', () => {
      const onBeforeBuildFunction = jest.fn();
      typeBuilder.addOnBeforeBuildFunction(onBeforeBuildFunction);
      const onBeforeBuildFunctionTwo = jest.fn();
      typeBuilder.addOnBeforeBuildFunction(onBeforeBuildFunctionTwo);
      const pluginBuilderLens = {} as PluginBuilderLens;

      const pluginTypes = typeBuilder.build();
      pluginTypes.onBeforeBuild(pluginBuilderLens);

      expect(onBeforeBuildFunction).toBeCalledWith(pluginBuilderLens);
      expect(onBeforeBuildFunctionTwo).toBeCalledWith(pluginBuilderLens);
    });
  });

  describe('onInputObjectDefinitionFunction', () => {
    it('builds added functions into plugin', () => {
      const onInputObjectDefinitionFunction = jest.fn();
      typeBuilder.addOnInputObjectDefinitionFunction(
        onInputObjectDefinitionFunction,
      );
      const onInputObjectDefinitionFunctionTwo = jest.fn();
      typeBuilder.addOnInputObjectDefinitionFunction(
        onInputObjectDefinitionFunctionTwo,
      );
      const inputDefinitionBlock = {} as InputDefinitionBlock<string>;
      const objectTypeConfig = {} as NexusInputObjectTypeConfig<string>;

      const pluginTypes = typeBuilder.build();
      pluginTypes.onInputObjectDefinition(
        inputDefinitionBlock,
        objectTypeConfig,
      );

      expect(onInputObjectDefinitionFunction).toHaveBeenCalledWith(
        inputDefinitionBlock,
        objectTypeConfig,
      );
      expect(onInputObjectDefinitionFunctionTwo).toHaveBeenCalledWith(
        inputDefinitionBlock,
        objectTypeConfig,
      );
    });
  });

  describe('onInstallFunction', () => {
    it('builds added functions into plugin', () => {
      const onInstallFunction = jest.fn();
      typeBuilder.addOnInstallFunction(onInstallFunction);
      const onInstallFunctionTwo = jest.fn();
      typeBuilder.addOnInstallFunction(onInstallFunctionTwo);
      const pluginBuilderLens = {} as PluginBuilderLens;

      const pluginTypes = typeBuilder.build();
      pluginTypes.onInstall(pluginBuilderLens);

      expect(onInstallFunction).toHaveBeenCalledWith(pluginBuilderLens);
      expect(onInstallFunctionTwo).toHaveBeenCalledWith(pluginBuilderLens);
    });
  });

  describe('onMissingTypeFunction', () => {
    it('builds added functions into plugin', () => {
      const onMissingTypeFunction = jest.fn();
      typeBuilder.addOnMissingTypeFunction(onMissingTypeFunction);
      const onMissingTypeFunctionTwo = jest.fn();
      typeBuilder.addOnMissingTypeFunction(onMissingTypeFunctionTwo);
      const missingTypeName = 'foo';
      const pluginBuilderLens = {} as PluginBuilderLens;

      const pluginTypes = typeBuilder.build();
      pluginTypes.onMissingType(missingTypeName, pluginBuilderLens);

      expect(onMissingTypeFunction).toHaveBeenCalledWith(
        missingTypeName,
        pluginBuilderLens,
      );
      expect(onMissingTypeFunctionTwo).toHaveBeenCalledWith(
        missingTypeName,
        pluginBuilderLens,
      );
    });
  });

  describe('onObjectDefinitionFunction', () => {
    it('builds added functions into plugin', () => {
      const onObjectDefinitionFunction = jest.fn();
      typeBuilder.addOnObjectDefinitionFunction(onObjectDefinitionFunction);
      const onObjectDefinitionFunctionTwo = jest.fn();
      typeBuilder.addOnObjectDefinitionFunction(onObjectDefinitionFunctionTwo);
      const objectDefinitionBlock = {} as ObjectDefinitionBlock<string>;
      const objectTypeConfig = {} as NexusObjectTypeConfig<string>;

      const pluginTypes = typeBuilder.build();
      pluginTypes.onObjectDefinition(objectDefinitionBlock, objectTypeConfig);

      expect(onObjectDefinitionFunction).toHaveBeenCalledWith(
        objectDefinitionBlock,
        objectTypeConfig,
      );
      expect(onObjectDefinitionFunctionTwo).toHaveBeenCalledWith(
        objectDefinitionBlock,
        objectTypeConfig,
      );
    });
  });
});
