import { create as createTypeBuilder, PluginTypes } from '../builder';

import {
  create as createExternalType,
  CreateOptions as ExternalTypeCreateOptions,
} from './external';
import {
  create as createFieldSetType,
  CreateOptions as FieldSetTypeCreateOptions,
} from './field-set';
import {
  create as createInaccessibleType,
  CreateOptions as InaccessibleTypeCreateOptions,
} from './inaccessible';
import {
  create as createKeysType,
  CreateOptions as KeysTypeCreateOptions,
} from './keys';
import {
  create as createOverrideType,
  CreateOptions as OverrideTypeCreateOptions,
} from './override';
import {
  create as createProvidesType,
  CreateOptions as ProvidesTypeCreateOptions,
} from './provides';
import {
  create as createRequiresType,
  CreateOptions as RequiresTypeCreateOptions,
} from './requires';
import {
  create as createShareableType,
  CreateOptions as ShareableTypeCreateOptions,
} from './shareable';

export type CreateOptions = ExternalTypeCreateOptions &
  FieldSetTypeCreateOptions &
  InaccessibleTypeCreateOptions &
  KeysTypeCreateOptions &
  OverrideTypeCreateOptions &
  ProvidesTypeCreateOptions &
  RequiresTypeCreateOptions &
  ShareableTypeCreateOptions;

export const create = (options: CreateOptions = {}): PluginTypes => {
  // Order of operations is important `createFieldSetType` is used
  // by other types, so it must come first
  return [
    createFieldSetType,
    createExternalType,
    createInaccessibleType,
    createKeysType,
    createOverrideType,
    createProvidesType,
    createRequiresType,
    createShareableType,
  ]
    .reduce((typeBuilder, create) => {
      return create(typeBuilder, options);
    }, createTypeBuilder())
    .build();
};
