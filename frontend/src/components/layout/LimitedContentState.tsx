import { createLimitedContentModel } from "../../lib/content/contentGuards";

interface LimitedContentStateProps {
  eyebrow?: string;
  placeName: string;
  heroSummary: string;
  promptHref: string;
  promptLabel: string;
}

export function LimitedContentState(props: LimitedContentStateProps) {
  const model = createLimitedContentModel(props);

  return (
    <section className="limited-content-state" aria-labelledby="limited-title">
      <p className="eyebrow">{props.eyebrow ?? "Province skeleton"}</p>
      <h2 id="limited-title">{model.title}</h2>
      <p>{model.summary}</p>
      <a href={model.promptHref}>{model.promptLabel}</a>
    </section>
  );
}
