import { scalarType } from 'nexus';

export type Options = {
  prefixFieldSet?: boolean;
};

//TODO: In some future version of the Federation Spec this will change from _FieldSet to FieldSet, need to support.
export const model = ({ prefixFieldSet }: Options = {}) =>
  scalarType({
    name: getName(prefixFieldSet),
  });

export const getName = (prefix = true) => {
  return prefix ? '_FieldSet' : 'FieldSet';
};
