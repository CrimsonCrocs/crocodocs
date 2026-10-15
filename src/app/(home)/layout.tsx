import type { ReactNode } from 'react';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/app/layout.config';
import { HomeHeader } from '@/components/header-controls';

export default function Layout({ children }: { children: ReactNode }) {
  return <HomeLayout {...baseOptions} nav={{ ...baseOptions.nav, component: <HomeHeader /> }}>{children}</HomeLayout>;
}
