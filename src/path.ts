import { extname, join, relative, parse } from 'path';

export const path = (filenamePath: string): string => {
  const path = parse(
    join(
      '@korzun/nexus-federation-plugin/dist',
      extname(__filename) === 'js' ? 'cjs' : 'esm',
      relative(__dirname, filenamePath),
    ),
  );
  return join(path.dir, path.name);
};
