import type {
  GraphQLSchema,
  GraphQLResolveInfo,
  GraphQLFieldResolver,
} from 'graphql';
import type { core, PluginBuilderLens, PluginConfig } from 'nexus';

//Type Defs ---------------------------------------------------------
//Arg Def Type
export type ArgDefType = core.StringLike;
export type AddArgDefType = (argDefType: ArgDefType) => void;

//Field Def Type
export type FieldDefType = core.StringLike;
export type AddFieldDefType = (fieldDefType: FieldDefType) => void;

//Input Field Def Type
export type InputFieldDefType = core.StringLike;
export type AddInputFieldDefType = (
  inputFieldDefType: InputFieldDefType,
) => void;

//Input Object Def Type
export type InputObjectDefType = core.StringLike;
export type AddInputObjectDefType = (
  inputObjectDefType: InputObjectDefType,
) => void;

//Object Def Type
export type ObjectDefType = core.StringLike;
export type AddObjectDefType = (objectDefType: ObjectDefType) => void;

//On Add Functions --------------------------------------------------
//On Add Arg Function
export type OnAddArgFunction = (
  arg: core.NexusFinalArgConfig,
) => core.NexusFinalArgConfig | void;
export type AddOnAddArgFunction = (onAddArgFunction: OnAddArgFunction) => void;

//On Add Input Field Function
export type OnAddInputFieldFunction = (
  field: core.NexusInputFieldDef,
) => core.NexusInputFieldDef | void;
export type AddOnAddInputFieldFunction = (
  onAddInputFieldFunction: OnAddInputFieldFunction,
) => void;

//On Add Field Function
export type OnAddFieldFunction = (
  field: core.NexusOutputFieldDef,
) => core.NexusOutputFieldDef | void;
export type AddOnAddFieldFunction = (
  onAddFieldFunction: OnAddFieldFunction,
) => void;

//On Add Output Field Function DEPRECATED
/**
 * @deprecated Retiring inconsistent naming, use `OnAddFieldFunction` instead.
 */
export type OnAddOutputFieldFunction = (
  field: core.NexusOutputFieldDef,
) => core.NexusOutputFieldDef | void;
/**
 * @deprecated Retiring inconsistent naming, use `AddOnAddFieldFunction` instead.
 */
export type AddOnAddOutputFieldFunction = (
  onAddOutputFieldFunction: OnAddOutputFieldFunction,
) => void;

//On Build Functions ------------------------------------------------
//On After Build Function
export type OnAfterBuildFunction = (schema: GraphQLSchema) => void;
export type AddOnAfterBuildFunction = (
  onAfterBuildFunction: OnAfterBuildFunction,
) => void;

//On Before Build Function
export type OnBeforeBuildFunction = (builder: PluginBuilderLens) => void;
export type AddOnBeforeBuildFunction = (
  onBeforeBuildFunction: OnBeforeBuildFunction,
) => void;

//On Create Functions -----------------------------------------------
//On Create Field Resolver Function
export type OnCreateFieldResolverFunction = (
  createResolverInfo: core.CreateFieldResolverInfo,
) => MiddlewareFunction | undefined;
export type AddOnCreateFieldResolverFunction = (
  onCreateFieldResolverFunction: OnCreateFieldResolverFunction,
) => void;

//On Create Field Subscribe
export type OnCreateFieldSubscribeFunction = (
  createSubscribeInfo: core.CreateFieldResolverInfo,
) => MiddlewareFunction | undefined;
export type AddOnCreateFieldSubscribeFunction = (
  onCreateFieldSubscribeFunction: OnCreateFieldSubscribeFunction,
) => void;

//On Definition Function --------------------------------------------
//On Input Object Definition
export type OnInputObjectDefinitionFunction = (
  block: core.InputDefinitionBlock<any>,
  objectConfig: core.NexusInputObjectTypeConfig<any>,
) => void;
export type AddOnInputObjectDefinitionFunction = (
  onInputObjectDefinitionFunction: OnInputObjectDefinitionFunction,
) => void;

//On Object Definition Function
export type OnObjectDefinitionFunction = (
  block: core.ObjectDefinitionBlock<string>,
  objectConfig: core.NexusObjectTypeConfig<string>,
) => void;
export type AddOnObjectDefinitionFunction = (
  onObjectDefinitionFunction: OnObjectDefinitionFunction,
) => void;

//Unategorized On Functions -----------------------------------------
//On Install Function
export type OnInstallFunction = (builder: PluginBuilderLens) => void;
export type AddOnInstallFunction = (
  onInstallFunction: OnInstallFunction,
) => void;

//On Missing Type Function
export type OnMissingTypeFunction = (
  missingTypeName: string,
  builder: PluginBuilderLens,
) => any;
export type AddOnMissingTypeFunction = (
  onMissingTypeFunction: OnMissingTypeFunction,
) => void;

// Middleware Compose -----------------------------------------------
export type MiddlewareFunction = (
  source: any,
  args: any,
  context: any,
  info: GraphQLResolveInfo,
  resolver: GraphQLFieldResolver<any, any>,
) => Promise<any>;
export type ComposeMiddlewareFunctionArray = (
  middlewareFunctionArray: MiddlewareFunction[],
) => MiddlewareFunction;

// Build ------------------------------------------------------------
export type PluginTypes = Required<
  Omit<
    PluginConfig,
    'name' | 'description' | 'onCreateFieldResolver' | 'onCreateFieldSubscribe'
  >
>;
export type Build = () => PluginTypes;

// Builder ----------------------------------------------------------
export type TypeCreate<Options extends Record<string, any> = {}> = (
  builder: TypeBuilder,
  options?: Options,
) => TypeBuilder;
export type Create = () => TypeBuilder;
export interface TypeBuilder {
  addArgDefType: AddArgDefType;
  addFieldDefType: AddFieldDefType;
  addInputFieldDefType: AddInputFieldDefType;
  addInputObjectDefType: AddInputObjectDefType;
  addObjectDefType: AddObjectDefType;
  addOnAddArgFunction: AddOnAddArgFunction;
  addOnAddInputFieldFunction: AddOnAddInputFieldFunction;
  addOnAddFieldFunction: AddOnAddFieldFunction;
  /**
   * @deprecated Retiring inconsistent naming, use `addOnAddFieldFunction` instead.
   */
  addOnAddOutputFieldFunction: AddOnAddOutputFieldFunction;
  addOnAfterBuildFunction: AddOnAfterBuildFunction;
  addOnBeforeBuildFunction: AddOnBeforeBuildFunction;
  addOnInputObjectDefinitionFunction: AddOnInputObjectDefinitionFunction;
  addOnInstallFunction: AddOnInstallFunction;
  addOnMissingTypeFunction: AddOnMissingTypeFunction;
  addOnObjectDefinitionFunction: AddOnObjectDefinitionFunction;
  build: Build;
}
