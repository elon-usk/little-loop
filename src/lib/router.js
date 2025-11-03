export function getPath() {
  const raw = window.location.hash || "#/";
  const path = raw.replace(/^#\/?/, "/");
  return path;
}

export function navigate(to) {
  if (!to.startsWith("/")) to = "/" + to;
  window.location.hash = to;
}

import React from "react";
export function Link({ to, children, ...props }) {
  const href = to.startsWith("/") ? # : #/;
  return (
    <a href={href} {...props}>
      {children}
    </a>
  );
}

export function useRouter() {
  const [path, setPath] = React.useState(getPath());
  React.useEffect(() => {
    const onHashChange = () => setPath(getPath());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);
  return { path };
}

export function match(pathname, route) {
  return pathname === route;
}
