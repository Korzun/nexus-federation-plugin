import { list, stringArg, directive as nexusDirective } from 'nexus';

export const directive = nexusDirective({
  name: 'link',
  locations: ['SCHEMA'],
  isRepeatable: true,
  args: {
    url: stringArg(),
    as: stringArg(),
    //TODO: The federation spec defines this as `link__Purpose`
    for: stringArg(),
    //TODO: The federation spec defines this as `[link__Import]`
    import: list(stringArg()),
  },
});
