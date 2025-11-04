import React from "react";
import logoImage from "../assets/logo2.png";

const ANNOUNCEMENT_HIDE_SCROLL = 140;
const HERO_OFFSET_BUFFER = 120;
const HERO_MIN_THRESHOLD = 140;

const navLinks = [
  { label: "Acasă", href: "/", match: "/" },
  { label: "Povestea", href: "/poveste.html", match: "/poveste" },
  { label: "Misiunea", href: "/misiune.html", match: "/misiune" },
  { label: "Blog", href: "/blog.html", match: "/blog" },
  { label: "Activități", href: "/activitati.html", match: "/activitati" },
  { label: "Resurse", href: "/resurse.html", match: "/resurse" },
  { label: "Comunitatea", href: "/comunitate.html", match: "/comunitate" },
  { label: "Contact", href: "/contact.html", match: "/contact" },
];

function getActivePath() {
  if (typeof window === "undefined") return "/";
  const { pathname, hash } = window.location;
  if (hash && hash.startsWith("#/")) {
    const normalized = hash.replace(/^#\/?/, "/");
    return normalized === "" ? "/" : normalized;
  }
  if (pathname === "/" || pathname === "") return "/";
  return pathname.replace(/\.html?$/, "");
}

export default function Nav({ brand = "littleloop.ro" }) {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [activePath, setActivePath] = React.useState("/");
  const [showAnnouncement, setShowAnnouncement] = React.useState(true);
  const [isHeroScrollZone, setIsHeroScrollZone] = React.useState(false);
  const [isReturning, setIsReturning] = React.useState(false);
  const heroThresholdRef = React.useRef(0);
  const heroElRef = React.useRef(null);
  const prevLogoOnlyRef = React.useRef(false);
  const returnTimeoutRef = React.useRef(null);
  const leftLinks = React.useMemo(() => navLinks.slice(0, 4), []);
  const rightLinks = React.useMemo(() => navLinks.slice(4, 7), []);
  const ctaLink = navLinks[7];

  React.useEffect(() => {
    setActivePath(getActivePath());
    const onLocationChange = () => setActivePath(getActivePath());
    window.addEventListener("hashchange", onLocationChange);
    window.addEventListener("popstate", onLocationChange);
    return () => {
      window.removeEventListener("hashchange", onLocationChange);
      window.removeEventListener("popstate", onLocationChange);
    };
  }, []);

  React.useEffect(() => {
    return () => {
      if (returnTimeoutRef.current) {
        window.clearTimeout(returnTimeoutRef.current);
      }
    };
  }, []);

  React.useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const updateScrollState = (scrollPos) => {
      const threshold = heroThresholdRef.current;
      const scrolled = threshold <= 0 ? scrollPos > 0 : scrollPos >= threshold;
      setIsScrolled(scrolled);
      setShowAnnouncement(scrollPos < ANNOUNCEMENT_HIDE_SCROLL);
    };

    const resolveHero = () => heroElRef.current || document.querySelector(".hero");

    const heroEl = resolveHero();
    if (!heroEl) {
      heroThresholdRef.current = 0;
      updateScrollState(window.scrollY || window.pageYOffset || 0);
      return undefined;
    }

    if (!heroElRef.current) heroElRef.current = heroEl;

    const computeThreshold = () => {
      const rect = heroEl.getBoundingClientRect();
      const scrollTop = window.scrollY || window.pageYOffset || 0;
      const heroBottom = rect.bottom + scrollTop;
      heroThresholdRef.current = Math.max(
        heroBottom - HERO_OFFSET_BUFFER,
        HERO_MIN_THRESHOLD
      );
      updateScrollState(scrollTop);
    };

    computeThreshold();

    let resizeObserver = null;
    if ("ResizeObserver" in window) {
      resizeObserver = new ResizeObserver(() => computeThreshold());
      resizeObserver.observe(heroEl);
    }

    window.addEventListener("resize", computeThreshold);
    window.addEventListener("orientationchange", computeThreshold);
    window.addEventListener("load", computeThreshold);

    return () => {
      window.removeEventListener("resize", computeThreshold);
      window.removeEventListener("orientationchange", computeThreshold);
      window.removeEventListener("load", computeThreshold);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, []);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const threshold = heroThresholdRef.current;
      const scrolled = threshold <= 0 ? scrollY > 0 : scrollY >= threshold;
      setIsScrolled(scrolled);
      setShowAnnouncement(scrollY < ANNOUNCEMENT_HIDE_SCROLL);

      const heroZoneActive =
        threshold > 0 ? scrollY > 24 && scrollY < threshold : scrollY > 24 && !scrolled;
      setIsHeroScrollZone(heroZoneActive);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isLogoOnly = !isScrolled && isHeroScrollZone;
  const navClassNames = ["nav"];
  if (isLogoOnly) navClassNames.push("nav-logo-only");
  if (isReturning && !isLogoOnly) navClassNames.push("nav-returning");
  if (isScrolled) navClassNames.push("nav-scrolled");
  if (showAnnouncement) navClassNames.push("nav-with-announcement");

  React.useEffect(() => {
    const prevLogoOnly = prevLogoOnlyRef.current;
    if (prevLogoOnly && !isLogoOnly) {
      setIsReturning(true);
      if (returnTimeoutRef.current) {
        window.clearTimeout(returnTimeoutRef.current);
      }
      returnTimeoutRef.current = window.setTimeout(() => {
        setIsReturning(false);
        returnTimeoutRef.current = null;
      }, 650);
    } else if (isLogoOnly) {
      setIsReturning(false);
      if (returnTimeoutRef.current) {
        window.clearTimeout(returnTimeoutRef.current);
        returnTimeoutRef.current = null;
      }
    }
    prevLogoOnlyRef.current = isLogoOnly;
  }, [isLogoOnly]);

  return (
    <>
      <a className="skip" href="#main">
        Sari la conținut
      </a>
      <div
        className={`announcement-bar${showAnnouncement ? " is-visible" : ""}`}
        role="region"
        aria-label="Invitație grup Skool"
        aria-hidden={!showAnnouncement}
      >
        Înscrie-te în grupul nostru de Skool.
      </div>
      <nav className={navClassNames.join(" ")} aria-label="Navigație principală">
        <div className="container nav-inner">
          <div className="menu menu-left" role="menubar">
            {leftLinks.map((link) => {
              const isActive = activePath === link.match;
              return (
                <a
                  key={link.href}
                  role="menuitem"
                  href={link.href}
                  className={`nav-link ${isActive ? "is-active" : ""}`}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span className="nav-link-label">{link.label}</span>
                </a>
              );
            })}
          </div>
          <div className="brand">
            <a className="brand-link" href="/" aria-label={brand}>
              <img src={logoImage} alt="" className="brand-logo" />
            </a>
          </div>
          <div className="menu-slot-right">
            <div className="menu menu-right" role="menubar">
              {rightLinks.map((link) => {
                const isActive = activePath === link.match;
                return (
                  <a
                    key={link.href}
                    role="menuitem"
                    href={link.href}
                    className={`nav-link ${isActive ? "is-active" : ""}`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <span className="nav-link-label">{link.label}</span>
                  </a>
                );
              })}
            </div>
            {ctaLink && (
              <a
                href={ctaLink.href}
                className="nav-link nav-cta"
                role="menuitem"
                aria-current={activePath === ctaLink.match ? "page" : undefined}
              >
                {ctaLink.label}
              </a>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
