import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { baseOptions } from '@/app/layout.config';
import { source } from '@/lib/source';
import { DocsHeader, DocsSidebar } from '@/components/docs-chrome';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout 
      tree={source.pageTree} 
      {...baseOptions}
      nav={{ component: <DocsHeader /> }}
      sidebar={{ component: <DocsSidebar />, collapsible: false }}
      containerProps={{ className: 'docs-layout' }}
    >
      {children}
    </DocsLayout>
  );
}
