import { createMDX } from 'fumadocs-mdx/next';
import path from 'node:path';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  // Keep the @/* imports working consistently in both Next's MDX build and
  // the app router (the target is the src/ directory, as in tsconfig.json).
  webpack(webpackConfig) {
    webpackConfig.resolve.alias['@/.source'] = path.resolve(process.cwd(), '.source/index.ts');
    webpackConfig.resolve.alias['@'] = path.resolve(process.cwd(), 'src');
    return webpackConfig;
  },
};

export default withMDX(config);
