import Link from "next/link";
import { ArrowRight, CompassTool } from "@phosphor-icons/react/ssr";
import {
  starterBase,
  starterLessons,
  starterPhases,
} from "@/lib/starter-guide";

export function StarterCourse() {
  let number = 0;
  return (
    <div className="starter-course not-prose">
      <Link className="starter-begin" href={`${starterBase}/first-and-ftc`}>
        <CompassTool size={22} weight="duotone" aria-hidden="true" />
        Start with FIRST and FTC <ArrowRight size={18} aria-hidden="true" />
      </Link>
      {starterPhases.map((phase) => (
        <section
          key={phase.title}
          className="starter-phase"
          aria-label={phase.title}
        >
          <h2 id={phase.title.toLowerCase().replaceAll(' ', '-')}>{phase.title}</h2>
          <p>{phase.description}</p>
          <ol start={number + 1}>
            {phase.lessons.map((lesson) => {
              number += 1;
              return (
                <li key={lesson.slug}>
                  <Link href={`${starterBase}/${lesson.slug}`}>
                    <span className="starter-lesson-number" aria-hidden="true">
                      {String(number).padStart(2, "0")}
                    </span>
                    <span>
                      <strong>{lesson.title}</strong>
                      <span>{lesson.description}</span>
                    </span>
                    <ArrowRight size={17} aria-hidden="true" />
                  </Link>
                </li>
              );
            })}
          </ol>
        </section>
      ))}
      <Link className="starter-glossary" href={`${starterBase}/glossary`}>
        Look up a word in the glossary{" "}
        <ArrowRight size={16} aria-hidden="true" />
      </Link>
    </div>
  );
}

export function StarterLabel({ slug }: { slug?: string }) {
  const index = starterLessons.findIndex((lesson) => lesson.slug === slug);
  return (
    <div className="starter-label">
      <Link href={starterBase}>
        <CompassTool size={17} weight="duotone" aria-hidden="true" />
        Starter Guide
      </Link>
      {slug === undefined && <span>Introduction</span>}
      {index >= 0 && (
        <span>
          Lesson {index + 1} of {starterLessons.length}
        </span>
      )}
      {slug === "glossary" && <span>Reference</span>}
    </div>
  );
}
