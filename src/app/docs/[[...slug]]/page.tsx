import { source } from "@/lib/source";
import type { ComponentProps } from "react";
import {
  DocsPage,
  DocsBody,
  DocsDescription,
  DocsTitle,
} from "fumadocs-ui/page";
import { notFound } from "next/navigation";
import { createRelativeLink } from "fumadocs-ui/mdx";
import { getMDXComponents } from "@/mdx-components";
import { Wordmark } from "@/components/wordmark";
import { cn } from "@/lib/utils";
import ToBeAdded from "@/components/tba";
import { Card, Cards } from "fumadocs-ui/components/card";
import { SeeMain } from "@/components/see-main";
import { Icon } from "@/components/icon";
import { siteDescription, socialMetadata } from "@/lib/social-metadata";
import { StarterLabel } from "@/components/starter-guide";
import { starterPhases } from "@/lib/starter-guide";

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDXContent = page.data.body;
  const starter = params.slug?.[0] === 'starter-guide';
  const toc = starter && params.slug?.length === 1
    ? [...starterPhases.map(phase => ({ title: phase.title, url: `#${phase.title.toLowerCase().replaceAll(' ', '-')}`, depth: 2 })), ...page.data.toc]
    : page.data.toc;

  return (
    <DocsPage key={page.url} toc={toc} full={page.data.full} article={{ id: 'main-content', tabIndex: -1, className: cn('docs-article', starter && 'starter-article') }}>
      {starter && <StarterLabel slug={params.slug?.[1]} />}
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDXContent
          components={getMDXComponents({
            // this allows you to link to other pages with relative file paths
            a: createRelativeLink(source, page),
            Wordmark: ({ className, ...props }: ComponentProps<typeof Wordmark>) => (
              <Wordmark {...props} className={cn("article-wordmark", className)} />
            ),
            TBA: ToBeAdded,
            LinkedCards: ({
              className,
              data,
            }: {
              className?: string;
              data: { title?: string; description: string; href: string }[];
            }) => (
              <Cards className={className}>
                {data.map((card) => (
                  <Card
                    key={card.title}
                    title={card.title}
                    description={card.description}
                    href={card.href}
                  />
                ))}
              </Cards>
            ),
            SeeMain: SeeMain,
            Icon: Icon,
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
    ...socialMetadata(`${page.data.title} | CrocoDocs`, page.data.description ?? siteDescription, page.url),
  };
}
