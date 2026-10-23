/** Drawn stand-in for a project that has no site capture to show. */
export default function Cover({ project }) {
  return (
    <div className="cover" aria-hidden="true">
      <span className="cover__rings" />
      <span className="cover__kind">{project.kind}</span>
      <span className="cover__name">{project.name}</span>
      {project.domain && <span className="cover__domain">{project.domain}</span>}
    </div>
  );
}
