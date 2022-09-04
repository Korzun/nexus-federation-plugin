import { TypeCreate } from '../../builder';

import { model, Options as ModelOptions } from './model';

export type Options = ModelOptions;

export const create: TypeCreate<Options> = (builder, options) => {
  builder.addOnInstallFunction((t) => {
    t.addType(model(options));
  });

  return builder;
};
