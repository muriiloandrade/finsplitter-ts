import path from 'node:path';
import { PluginMetadataGenerator } from '@nestjs/cli/lib/compiler/plugins/plugin-metadata-generator';
import { ReadonlyVisitor } from '@nestjs/swagger/dist/plugin';

const generator = new PluginMetadataGenerator();
const currentPath = path.resolve('./src');

generator.generate({
  visitors: [
    new ReadonlyVisitor({
      introspectComments: true,
      pathToSource: currentPath,
    }),
  ],
  outputDir: currentPath,
  watch: true,
  tsconfigPath: '../tsconfig.json',
});
