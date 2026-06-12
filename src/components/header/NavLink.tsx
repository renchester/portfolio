import Link from 'next/link';

function NavLink({
  href,
  label,
  index,
  onNavigate,
}: {
  href: string;
  label: string;
  index?: string;
  onNavigate?: () => void;
}) {
  return (
    <li className="nav__item">
      <Link href={href} className="nav__link" onClick={onNavigate}>
        {index && (
          <span className="nav__index" aria-hidden>
            {index}
          </span>
        )}
        {label}
      </Link>
    </li>
  );
}
export default NavLink;
