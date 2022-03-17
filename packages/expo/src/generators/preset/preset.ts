import { Tree } from '@nrwl/devkit';
import expoApplicationGenerator from '../application/application';
import { PresetGeneratorSchema } from './schema';

export default async function expoPresetGenerator(
  tree: Tree,
  options: PresetGeneratorSchema
) {
  await expoApplicationGenerator(tree, options);
}
