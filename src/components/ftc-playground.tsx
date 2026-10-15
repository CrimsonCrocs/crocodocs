import { ArrowUpRight, Play } from '@phosphor-icons/react/dist/ssr';
import { playgroundExamples, playgroundUrl, type PlaygroundExampleId } from '@/lib/playground-examples';

export function FTCPlayground({ example }: { example: PlaygroundExampleId }) {
  const lesson = playgroundExamples[example];
  const url = playgroundUrl(lesson);

  return (
    <div className="ftc-playground not-prose">
      <div className="ftc-playground-heading">
        <div><Play size={16} weight="fill" aria-hidden="true" /><span>{lesson.title}</span></div>
        <a href={url} target="_blank" rel="noopener noreferrer">Open example<ArrowUpRight size={14} aria-hidden="true" /><span className="sr-only"> in a new tab</span></a>
      </div>
      <iframe
        src={url}
        title={`FTC playground: ${lesson.title}`}
        width="100%"
        height="600"
        loading="lazy"
        allow="fullscreen; gamepad"
        allowFullScreen
      />
      <p className="ftc-playground-note">Edit the code, then press Play. Reload this page to restore the example.</p>
    </div>
  );
}
