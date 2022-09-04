import { TypeCreate } from '../../builder';

import { directive } from './directive';

export const create: TypeCreate = (builder) => {
  builder.addOnInstallFunction((t) => {
    t.addType(directive);
  });

  return builder;
};
