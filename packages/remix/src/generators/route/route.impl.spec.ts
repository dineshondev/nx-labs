import { Tree } from '@nrwl/devkit';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import routeGenerator from './route.impl';
import applicationGenerator from '../application/application.impl';

describe('app', () => {
  let tree: Tree;

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
    tree.write(
      '.gitignore',
      `/node_modules
/dist`
    );
  });

  it('should add route component', async () => {
    await applicationGenerator(tree, { name: 'demo' });
    await routeGenerator(tree, {
      project: 'demo',
      path: 'path/to/example',
      style: 'css',
    });

    const content = tree
      .read('apps/demo/app/routes/path/to/example.tsx')
      .toString();
    expect(content).toMatch('LinksFunction');
    expect(content).toMatch('function PathToExample(');
    expect(
      tree.exists('apps/demo/app/styles/path/to/example.css')
    ).toBeTruthy();
  });

  it('should support --style=none', async () => {
    await applicationGenerator(tree, { name: 'demo' });
    await routeGenerator(tree, {
      project: 'demo',
      path: 'example',
      style: 'none',
    });

    const content = tree.read('apps/demo/app/routes/example.tsx').toString();
    expect(content).not.toMatch('LinksFunction');
    expect(tree.exists('apps/demo/app/styles/example.css')).toBeFalsy();
  });

  it('should handle trailing and prefix slashes', async () => {
    await applicationGenerator(tree, { name: 'demo' });
    await routeGenerator(tree, {
      project: 'demo',
      path: '/example/',
      style: 'css',
    });

    const content = tree.read('apps/demo/app/routes/example.tsx').toString();
    expect(content).toMatch('function Example(');
  });
});
