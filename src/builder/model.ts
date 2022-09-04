import type {
  ArgDefType,
  Build,
  Create,
  FieldDefType,
  InputFieldDefType,
  InputObjectDefType,
  ObjectDefType,
  OnAddArgFunction,
  OnAddInputFieldFunction,
  OnAddFieldFunction,
  OnAfterBuildFunction,
  OnBeforeBuildFunction,
  OnInputObjectDefinitionFunction,
  OnInstallFunction,
  OnMissingTypeFunction,
  OnObjectDefinitionFunction,
} from './model.type';

export const create: Create = () => {
  const argDefTypeContainer: ArgDefType[] = [];
  const fieldDefTypeContainer: FieldDefType[] = [];
  const inputFieldDefTypeContainer: InputFieldDefType[] = [];
  const inputObjectDefTypeContainer: InputObjectDefType[] = [];
  const objectDefTypeContainer: ObjectDefType[] = [];
  const onAddArgFunctionContainer: OnAddArgFunction[] = [];
  const onAddInputFieldFunctionContainer: OnAddInputFieldFunction[] = [];
  const onAddFieldFunctionContainer: OnAddFieldFunction[] = [];
  const onAfterBuildFunctionContainer: OnAfterBuildFunction[] = [];
  const onBeforeBuildFunctionContainer: OnBeforeBuildFunction[] = [];
  const onInputObjectDefinitionFunctionContainer: OnInputObjectDefinitionFunction[] =
    [];
  const onObjectDefinitionFunctionContainer: OnObjectDefinitionFunction[] = [];
  const onInstallFunctionContainer: OnInstallFunction[] = [];
  const onMissingTypeFunctionContainer: OnMissingTypeFunction[] = [];

  const build: Build = () => ({
    argTypeDefTypes: argDefTypeContainer,
    fieldDefTypes: fieldDefTypeContainer,
    inputFieldDefTypes: inputFieldDefTypeContainer,
    inputObjectTypeDefTypes: inputObjectDefTypeContainer,
    objectTypeDefTypes: objectDefTypeContainer,
    onAddArg: (...args) => {
      onAddArgFunctionContainer.forEach((onAddArgFunction) =>
        onAddArgFunction(...args),
      );
    },
    onAddInputField: (...args) => {
      onAddInputFieldFunctionContainer.forEach((onAddInputFieldFunction) =>
        onAddInputFieldFunction(...args),
      );
    },
    onAddOutputField: (...args) => {
      onAddFieldFunctionContainer.forEach((onAddFieldFunction) =>
        onAddFieldFunction(...args),
      );
    },
    onAfterBuild: (...args) => {
      onAfterBuildFunctionContainer.forEach((onAfterBuildFunction) =>
        onAfterBuildFunction(...args),
      );
    },
    onBeforeBuild: (...args) => {
      onBeforeBuildFunctionContainer.forEach((onBeforeBuildFunction) =>
        onBeforeBuildFunction(...args),
      );
    },
    onInputObjectDefinition: (...args) => {
      onInputObjectDefinitionFunctionContainer.forEach(
        (onInputObjectDefinitionFunction) =>
          onInputObjectDefinitionFunction(...args),
      );
    },
    onInstall: (...args) => {
      onInstallFunctionContainer.forEach((onInstallFunction) =>
        onInstallFunction(...args),
      );
    },
    onMissingType: (...args) => {
      onMissingTypeFunctionContainer.forEach((onMissingTypeFunction) =>
        onMissingTypeFunction(...args),
      );
    },
    onObjectDefinition: (...args) => {
      onObjectDefinitionFunctionContainer.forEach(
        (onObjectDefinitionFunction) => onObjectDefinitionFunction(...args),
      );
    },
  });

  return {
    addArgDefType: (value) => {
      argDefTypeContainer.push(value);
    },
    addFieldDefType: (value) => {
      fieldDefTypeContainer.push(value);
    },
    addInputFieldDefType: (value) => {
      inputFieldDefTypeContainer.push(value);
    },
    addInputObjectDefType: (value) => {
      inputObjectDefTypeContainer.push(value);
    },
    addObjectDefType: (value) => {
      objectDefTypeContainer.push(value);
    },
    addOnAddArgFunction: (value) => {
      onAddArgFunctionContainer.push(value);
    },
    addOnAddInputFieldFunction: (value) => {
      onAddInputFieldFunctionContainer.push(value);
    },
    addOnAddFieldFunction: (value) => {
      onAddFieldFunctionContainer.push(value);
    },
    /**
     * @deprecated Retiring inconsistent naming, use `addOnAddFieldFunction` instead
     */
    addOnAddOutputFieldFunction: (value) => {
      onAddFieldFunctionContainer.push(value);
    },
    addOnAfterBuildFunction: (value) => {
      onAfterBuildFunctionContainer.push(value);
    },
    addOnBeforeBuildFunction: (value) => {
      onBeforeBuildFunctionContainer.push(value);
    },
    addOnInputObjectDefinitionFunction: (value) => {
      onInputObjectDefinitionFunctionContainer.push(value);
    },
    addOnInstallFunction: (value) => {
      onInstallFunctionContainer.push(value);
    },
    addOnMissingTypeFunction: (value) => {
      onMissingTypeFunctionContainer.push(value);
    },
    addOnObjectDefinitionFunction: (value) => {
      onObjectDefinitionFunctionContainer.push(value);
    },
    build,
  };
};
