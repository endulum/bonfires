import {
  type To,
  useNavigate,
  useLocation,
  useResolvedPath,
} from "react-router-dom";

export function NavTabs({ tabs }: { tabs: Array<{ to: To; title: string }> }) {
  return (
    <div role="tablist" className="navtabs flex-row align-start gap-1">
      {tabs.map((tab) => (
        <NavTab key={tab.title} to={tab.to} title={tab.title} />
      ))}
    </div>
  );
}

function NavTab({ to, title }: { to: To; title: string }) {
  const navigate = useNavigate();
  const { pathname: toPathname } = useResolvedPath(to);
  const { pathname: locationPathname } = useLocation();
  const selected = locationPathname === toPathname;

  return (
    <button role="tab" onClick={() => navigate(to)} aria-selected={selected}>
      {title}
    </button>
  );
}
