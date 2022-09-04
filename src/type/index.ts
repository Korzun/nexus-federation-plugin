import { create as createTypeBuilder } from '../builder';

import {
  create as createExternalType,
  CreateOptions as ExternalTypeCreateOptions,
} from './external';
import {
  create as createFieldSetType,
  CreateOptions as FieldSetTypeCreateOptions,
} from './field-set';
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
  KeysTypeCreateOptions &
  OverrideTypeCreateOptions &
  ProvidesTypeCreateOptions &
  RequiresTypeCreateOptions &
  ShareableTypeCreateOptions;

export const create = (options: CreateOptions = {}) => {
  const typeBuilder = createTypeBuilder();
  createFieldSetType(typeBuilder, options);
  createExternalType(typeBuilder, options);
  createKeysType(typeBuilder, options);
  createOverrideType(typeBuilder, options);
  createProvidesType(typeBuilder, options);
  createRequiresType(typeBuilder, options);
  createShareableType(typeBuilder, options);
  return typeBuilder.build();
};
