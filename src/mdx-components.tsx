import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import getPageCardComponents from '@suin/fumadocs-page-card';
import { source } from './lib/source';
import { Bracket } from './components/bracket';
import { Wordmark } from './components/wordmark';
import { Tabs, Tab } from 'fumadocs-ui/components/tabs';
import { FTCPlayground } from './components/ftc-playground';
import { CADPartModel } from './components/cad-part-model';
import { StarterCourse } from './components/starter-guide';

// use this function to get MDX components, you will need it for rendering MDX
export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {  
    ...defaultMdxComponents,
    ...getPageCardComponents({ source }),
    Bracket,
    Wordmark,
    Tabs,
    Tab,
    FTCPlayground,
    CADPartModel,
    StarterCourse,
    ...components,
  };
}
