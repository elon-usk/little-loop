import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import InteractiveMap from "../components/InteractiveMap.jsx";
import heroImage from "../assets/herowall1.png";

export default function Home() {
  const heroRef = useRef(null);
  const [bgOffset, setBgOffset] = useState(0);
  const [heroHeight, setHeroHeight] = useState(null);
  const imageMetaRef = useRef({ width: 0, height: 0 });
  const heroCtaText = "Împreună, desenăm amintiri";
  const shopItems = useMemo(
    () => [
      {
        id: "story-kit",
        name: "Storytelling Kit",
        price: "69 RON",
        description: "Carduri ilustrate și ghiduri pentru a inventa povești împreună.",
      },
      {
        id: "art-pack",
        name: "Art Pack Mini",
        price: "54 RON",
        description: "Set creativ cu stickere, hârtie texturată și idei de colaje.",
      },
      {
        id: "city-pass",
        name: "City Explorer Pass",
        price: "129 RON",
        description: "Acces la cinci spații culturale family-friendly din București.",
      },
      {
        id: "playbox",
        name: "Playbox STEM",
        price: "115 RON",
        description: "Experimente simple de știință pentru copii curioși între 6-10 ani.",
      },
      {
        id: "printables",
        name: "Printables Bundle",
        price: "39 RON",
        description: "Fișe de activități, planuri de weekend și checklist-uri tematice.",
      },
    ],
    []
  );

  const calculateHeight = useCallback(() => {
    const heroEl = heroRef.current;
    const { width, height } = imageMetaRef.current;
    if (!heroEl || !width) return;
    const heroWidth = heroEl.offsetWidth || window.innerWidth;
    const computedHeight = heroWidth * (height / width);
    setHeroHeight(computedHeight);
  }, []);

  useEffect(() => {
    const updateOffset = () => {
      const heroEl = heroRef.current;
      if (!heroEl) return;
      const sectionHeight = heroEl.offsetHeight || 1;
      const heroTop = heroEl.offsetTop;
      const scrollPos = window.scrollY;
      const progress = Math.min(
        Math.max((scrollPos - heroTop) / (sectionHeight * 0.6), 0),
        1
      );
      setBgOffset((prev) => (Math.abs(prev - progress) > 0.002 ? progress : prev));
    };

    let rafId = 0;
    const scheduleUpdate = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        updateOffset();
      });
    };

    updateOffset();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  useEffect(() => {
    const img = new Image();
    img.src = heroImage;
    const handleLoad = () => {
      imageMetaRef.current = {
        width: img.naturalWidth || 1,
        height: img.naturalHeight || 1,
      };
      calculateHeight();
    };
    if (img.complete) {
      handleLoad();
    } else {
      img.addEventListener("load", handleLoad);
    }
    return () => {
      img.removeEventListener("load", handleLoad);
    };
  }, [calculateHeight]);

  useEffect(() => {
    calculateHeight();
    window.addEventListener("resize", calculateHeight);
    return () => {
      window.removeEventListener("resize", calculateHeight);
    };
  }, [calculateHeight]);

  const handleHeroChatSubmit = useCallback((event) => {
    event.preventDefault();
  }, []);

  return (
    <main id="main">
      <header
        ref={heroRef}
        className="hero"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(188, 231, 253, 0.35), rgba(247, 240, 109, 0.25)), url(${heroImage})`,
          backgroundPosition: `center ${bgOffset * 120}%, var(--hero-bg-x, center) ${bgOffset * 120}%`,
          backgroundSize: `cover, var(--hero-bg-size, cover)`,
          height: heroHeight ? `${heroHeight}px` : "100vh",
        }}
      >
        <div className="hero-overlay" role="region" aria-label="Asistent LittleLoop AI">
          <div className="hero-overlay-header">
            <span className="hero-signal" aria-hidden="true" />
            <span className="hero-signal" aria-hidden="true" />
            <span className="hero-signal" aria-hidden="true" />
            <span className="hero-overlay-id">LL - AI Console</span>
          </div>
          <div className="hero-overlay-body">
            <h1>{heroCtaText}</h1>
            <form className="hero-chat" onSubmit={handleHeroChatSubmit}>
              <input
                className="hero-chat-input"
                type="text"
                placeholder="Astăzi vrem să... râdem"
                aria-label="Mesaj către LittleLoop AI"
              />
              <button className="hero-chat-send" type="submit">
                Trimite
              </button>
            </form>
          </div>
        </div>
      </header>

      <section className="section map-section" aria-labelledby="map-title">
        <div className="container map-section-inner">
          <div className="map-copy">
            <h2 id="map-title">Plimbă-te prin Bucureștiul creativ</h2>
            <p>
              Harta noastră interactivă te poartă prin ateliere, galerii și spații
              prietenoase cu copiii. Dă scroll până aici, explorează zona și găsește un
              nou loc de descoperit weekendul acesta.
            </p>
          </div>
          <InteractiveMap />
        </div>
      </section>

      <section className="section shop-section" aria-labelledby="shop-title">
        <div className="container">
          <div className="shop-intro">
            <span className="shop-tag">Nou</span>
            <h2 id="shop-title">Magazinul LittleLoop</h2>
            <p>
              Resurse digitale și kituri pregătite să transforme timpul petrecut împreună
              în amintiri creative. Alege ce vi se potrivește și hai să construim lucruri
              frumoase.
            </p>
          </div>
          <div className="shop-grid">
            {shopItems.map((item) => (
              <article key={item.id} className="shop-card">
                <div className="shop-card-media" aria-hidden="true" />
                <div className="shop-card-body">
                  <h3 className="shop-card-title">{item.name}</h3>
                  <p className="shop-card-copy">{item.description}</p>
                  <div className="shop-card-meta">
                    <span className="shop-card-price">{item.price}</span>
                    <button type="button" className="shop-card-button">
                      Adaugă în coș
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
