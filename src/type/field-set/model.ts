import { scalarType } from 'nexus';

export type Options = {
  prefixFieldset?: boolean;
};

//TODO: In some future version of the Federation Spec this will change from _FieldSet to FieldSet, need to support.
export const model = ({ prefixFieldset = true }: Options = {}) =>
  scalarType({
    name: prefixFieldset ? '_FieldSet' : 'FieldSet',
    description: `
  Represents a set of fields. Grammatically, a field set
  is a selection set minus the braces. This means it can
  represent a single field "upc", multiple fields "id
  countryCode", and even nested selection sets "id organization
  { id }".
  
  [FieldSet - Apollo Federation 2.0 Subgraph Spec](https://www.apollographql.com/docs/federation/subgraph-spec/#scalar-fieldset)
  `,
  });
