import { CustomSectionGroup, Award, Education, Experience, Project, Skill, URL } from "@reactive-resume/schema";
import { cn, isUrl, linearTransform } from "@reactive-resume/utils";
import get from "lodash.get";
import React, { Fragment } from "react";

import { useArtboardStore } from "../store/artboard";
import { TemplateProps } from "../types/template";

const Header = () => {
  const basics = useArtboardStore((state) => state.resume.basics);

  return (
    <div className="flex flex-col items-center justify-center space-y-2 pb-2 text-center">
      <div>
        <div className="text-2xl font-bold">{basics.name}</div>
        <div className="text-base">{basics.headline}</div>
      </div>

      <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-sm">
        {basics.phone && (
          <div className="flex items-center gap-x-1.5">
            <i className="ph ph-bold ph-phone text-primary" />
            <a href={`tel:${basics.phone}`} target="_blank" rel="noreferrer">
              {basics.phone}
            </a>
          </div>
        )}
        {basics.email && (
          <div className="flex items-center gap-x-1.5">
            <i className="ph ph-bold ph-at text-primary" />
            <a href={`mailto:${basics.email}`} target="_blank" rel="noreferrer">
              {basics.email}
            </a>
          </div>
        )}
        {basics.url && <Link url={basics.url} />}
      </div>
    </div>
  );
};

type LinkProps = {
  url: URL;
  icon?: React.ReactNode;
  label?: string;
  className?: string;
};

const Link = ({ url, icon, label, className }: LinkProps) => {
  if (!isUrl(url.href)) return null;

  return (
    <div className="flex items-center gap-x-1.5">
      {icon ?? <i className="ph ph-bold ph-link text-primary" />}
      <a
        href={url.href}
        target="_blank"
        rel="noreferrer noopener nofollow"
        className={cn("inline-block", className)}
      >
        {label || url.label || url.href}
      </a>
    </div>
  );
};

type SectionProps<T> = {
  section: SectionWithItem<T>| CustomSectionGroup;
  children?: (item: T) => React.ReactNode;
  className?: string;
  urlKey?: keyof T;
  levelKey?: keyof T;
  summaryKey?: keyof T;
  keywordsKey?: keyof T;
};

const Section = <T,>({
  section,
  children,
  className,
  urlKey,
  levelKey,
  summaryKey,
  keywordsKey,
}: SectionProps<T>) => {
  if (!section.visible || !section.items.length) return null;
  return (
    <section id={section.id} className="grid">
      <div className="mb-2 hidden font-bold text-primary group-[.main]:block">
        <h4>{section.name}</h4>
      </div>

      <div className="mx-auto mb-2 hidden items-center gap-x-2 text-center font-bold text-primary group-[.sidebar]:flex">
        <div className="h-1.5 w-1.5 rounded-full border border-primary" />
        <h4>{section.name}</h4>
        <div className="h-1.5 w-1.5 rounded-full border border-primary" />
      </div>

      <div
        className="grid gap-x-6 gap-y-3 group-[.sidebar]:mx-auto group-[.sidebar]:text-center"
        style={{ gridTemplateColumns: `repeat(${section.columns}, 1fr)` }}
      >
        {section.items
          .filter((item) => item.visible)
          .map((item) => {
            const url = (urlKey && get(item, urlKey)) as URL | undefined;
            const level = (levelKey && get(item, levelKey, 0)) as number | undefined;
            const summary = (summaryKey && get(item, summaryKey, "")) as string | undefined;
            const keywords = (keywordsKey && get(item, keywordsKey, [])) as string[] | undefined;

            return (
              <div
                key={item.id}
                className={cn(
                  "relative space-y-2",
                  "border-primary group-[.main]:border-l group-[.main]:pl-4",
                  className,
                )}
              >
                <div>{children?.(item as T)}</div>

const isEmptyString = (str) => {
  return !str || str.trim() === '';
};


if (summary !== undefined && !isEmptyString(summary)) {
  return <div className="wysiwyg" dangerouslySetInnerHTML={{ __html: summary }} />;
}

                {level !== undefined && level > 0 && <Rating level={level} />}

                {keywords !== undefined && keywords.length > 0 && (
                  <p className="text-sm">{keywords.join(", ")}</p>
                )}

                {url !== undefined && <Link url={url} />}

                <div className="absolute left-[-4.5px] top-px hidden h-[8px] w-[8px] rounded-full bg-primary group-[.main]:block" />
              </div>
            );
          })}
      </div>
    </section>
  );
};

const Experience = () => {
  const section = useArtboardStore((state) => state.resume.sections.experience);

  return (
    <Section<Experience> section={section} urlKey="url" summaryKey="summary">
      {(item) => (
        <div>
          <div className="font-bold">{item.company}</div>
          <div>{item.position}</div>
          <div>{item.location}</div>
          <div className="font-bold">{item.date}</div>
        </div>
      )}
    </Section>
  );
};

const Education = () => {
  const section = useArtboardStore((state) => state.resume.sections.education);

  return (
    <Section<Education> section={section} urlKey="url" summaryKey="summary">
      {(item) => (
        <div>
          <div className="font-bold">{item.institution}</div>
          <div>{item.area}</div>
          <div>{item.score}</div>
          <div>{item.studyType}</div>
          <div className="font-bold">{item.date}</div>
        </div>
      )}
    </Section>
  );
};

const Awards = () => {
  const section = useArtboardStore((state) => state.resume.sections.awards);

  return (
    <Section<Award> section={section} urlKey="url" summaryKey="summary">
      {(item) => (
        <div>
          <div className="font-bold">{item.title}</div>
          <div>{item.awarder}</div>
          <div className="font-bold">{item.date}</div>
        </div>
      )}
    </Section>
  );
};

const Projects = () => {
  const section = useArtboardStore((state) => state.resume.sections.projects);

  return (
    <Section<Project> section={section} urlKey="url" summaryKey="summary" keywordsKey="keywords">
      {(item) => (
        <div>
          <div>
            <div className="font-bold">{item.name}</div>
            <div>{item.description}</div>

            <div className="font-bold">{item.date}</div>
          </div>
        </div>
      )}
    </Section>
  );
};

const Skills = () => {
  const section = useArtboardStore((state) => state.resume.sections.skills);

  return (
    <Section<Skill> section={section} levelKey="level" keywordsKey="keywords">
      {(item) => (
        <div>
          <div className="font-bold">{item.name}</div>
          <div>{item.description}</div>
        </div>
      )}
    </Section>
  );
};

const mapSectionToComponent = (section: string) => {
  switch (section) {
    case "experience":
      return <Experience />;
    case "education":
      return <Education />;
    case "awards":
      return <Awards />;
    case "projects":
      return <Projects />;
    case "skills":
      return <Skills />;
    default:
      return null;
  }
};

export const Wilson = ({ columns, isFirstPage = false }: TemplateProps) => {
  const [main, sidebar] = columns;

  return (
    <div className="p-custom space-y-3">
      {isFirstPage && <Header />}

      <div className="grid grid-cols-3 gap-x-4">
        <div className="sidebar group space-y-4">
          {sidebar.map((section) => (
            <Fragment key={section}>{mapSectionToComponent(section)}</Fragment>
          ))}
        </div>

        <div className="main group col-span-2 space-y-4">
          {main.map((section) => (
            <Fragment key={section}>{mapSectionToComponent(section)}</Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
