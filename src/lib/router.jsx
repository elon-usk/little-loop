import React from "react";

export function getPath() {
  const raw = window.location.hash || "#/";
  return raw.replace(/^#\/?/, "/");
}

export function navigate(to) {
  const normalized = to.startsWith("/") ? to : `/${to.replace(/^\/?/, "")}`;
  window.location.hash = normalized;
}

export function Link({ to, children, ...props }) {
  const normalized = to.startsWith("/") ? to : `/${to.replace(/^\/?/, "")}`;
  const href = `#${normalized}`;

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
