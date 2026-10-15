import { docs } from '@/.source';
import { loader } from 'fumadocs-core/source';
import { icons } from 'lucide-react';
import { createElement } from 'react';
import {
  ArrowsClockwise, BookOpen, Books, BracketsCurly, CircleNotch, ClipboardText,
  CompassTool, Crosshair, Cube, Eye, Factory, FlowArrow, GearSix,
  HandGrabbing, Lightning, ListChecks, Notebook, Nut, PencilSimple, Plug,
  PresentationChart, Printer, Ruler, Stack, Swap, TestTube, Toolbox, Trophy,
  UsersThree, Wrench,
} from '@phosphor-icons/react/ssr';

const phosphorIcons = {
  ArrowsClockwise, BookOpen, Books, BracketsCurly, CircleNotch, ClipboardText,
  CompassTool, Crosshair, Cube, Eye, Factory, FlowArrow, GearSix,
  HandGrabbing, Lightning, ListChecks, Notebook, Nut, PencilSimple, Plug,
  PresentationChart, Printer, Ruler, Stack, Swap, TestTube, Toolbox, Trophy,
  UsersThree, Wrench,
};

// See https://fumadocs.vercel.app/docs/headless/source-api for more info
export const source = loader({
  // it assigns a URL to your pages
  baseUrl: '/docs',
  source: docs.toFumadocsSource(),
  icon(icon) {
    if (!icon) return;

    if (icon.startsWith('engineering:') || icon.startsWith('phosphor:')) {
      const name = icon.slice(icon.indexOf(':') + 1);
      if (name in phosphorIcons) {
        return createElement(phosphorIcons[name as keyof typeof phosphorIcons], {
          className: 'text-primary',
          size: 16,
          'aria-hidden': true,
        });
      }
      return;
    }
    
    if (icon in icons) {
      return createElement(icons[icon as keyof typeof icons], { 
        className: 'text-primary',
        size: 16,
        'aria-hidden': true,
      });
    }
  },
});
