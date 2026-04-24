import { Link } from "react-router-dom";

interface BreadcrumbsProps {
  provinceName?: string;
  provinceHref?: string;
  cityName?: string;
}

export function Breadcrumbs({
  provinceName,
  provinceHref,
  cityName,
}: BreadcrumbsProps) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <Link to="/">National map</Link>
      {provinceName ? (
        provinceHref ? <Link to={provinceHref}>{provinceName}</Link> : <span>{provinceName}</span>
      ) : null}
      {cityName ? <span>{cityName}</span> : null}
    </nav>
  );
}
