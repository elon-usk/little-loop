import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import InteractiveMap from "../components/InteractiveMap.jsx";
import heroImage from "../assets/herowall1.png";
import aiLogo from "../assets/ailogo3.png";
import { askLittleLoopAI } from "../lib/aiClient.js";

export default function Home() {
  const heroRef = useRef(null);
  const chatLogRef = useRef(null);
  const messageRefs = useRef({});
  const [bgOffset, setBgOffset] = useState(0);
  const [heroHeight, setHeroHeight] = useState(null);
  const imageMetaRef = useRef({ width: 0, height: 0 });
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    {
      role: "assistant",
      content:
        "Salut! Sunt LittleLoop AI. Îți pot sugera activități creative pentru părinți și copii în București sau idei pentru acasă. Despre ce vrei să vorbim azi?",
    },
  ]);
  const [hasExpandedChat, setHasExpandedChat] = useState(false);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [chatError, setChatError] = useState("");

  const heroCtaText = "Împreună, desenăm amintiri";

  const shopItems = useMemo(
    () => [
      {
        id: "story-kit",
        name: "Kit de Povestit",
        price: "69 RON",
        description:
          "Carduri ilustrate și ghiduri pentru a inventa povești împreună.",
      },
      {
        id: "art-pack",
        name: "Pachet Artistic Mini",
        price: "54 RON",
        description:
          "Set creativ cu stickere, hârtie texturată și idei de colaje.",
      },
      {
        id: "city-pass",
        name: "Abonament Explorator Urban",
        price: "129 RON",
        description:
          "Acces la cinci spații culturale family-friendly din București.",
      },
      {
        id: "playbox",
        name: "Cutia STEM Playbox",
        price: "115 RON",
        description:
          "Experimente simple de știință pentru copii curioși între 6-10 ani.",
      },
      {
        id: "printables",
        name: "Pachet Printabile",
        price: "39 RON",
        description:
          "Fișe de activități, planuri de weekend și checklist-uri tematice.",
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

  // Scroll-based parallax for hero background
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
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Load hero image and compute height
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

    if (img.complete) handleLoad();
    else img.addEventListener("load", handleLoad);

    return () => img.removeEventListener("load", handleLoad);
  }, [calculateHeight]);

  // Recalculate hero height on resize
  useEffect(() => {
    calculateHeight();
    window.addEventListener("resize", calculateHeight);
    return () => window.removeEventListener("resize", calculateHeight);
  }, [calculateHeight]);

  const handleHeroChatSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      const trimmed = chatInput.trim();
      if (!trimmed || isChatLoading) return;

      const userMessage = { role: "user", content: trimmed };
      const historyBeforeSend = chatMessages;

      setChatMessages((prev) => [...prev, userMessage]);
      if (!hasExpandedChat) {
        setHasExpandedChat(true);
      }
      setChatInput("");
      setChatError("");
      setIsChatLoading(true);

      try {
        const aiReply = await askLittleLoopAI({
          input: trimmed,
          history: historyBeforeSend,
        });
        setChatMessages((prev) => [
          ...prev,
          { role: "assistant", content: aiReply },
        ]);
      } catch (error) {
        console.error(error);
        setChatError(error.message);
      } finally {
        setIsChatLoading(false);
      }
    },
    [chatInput, chatMessages, isChatLoading]
  );

  useEffect(() => {
    const container = chatLogRef.current;
    if (!container || chatMessages.length === 0) return;
    const lastMessage = chatMessages[chatMessages.length - 1];

    if (lastMessage.role === "user") {
      container.scrollTop = container.scrollHeight;
      return;
    }

    const lastKey = `assistant-${chatMessages.length - 1}`;
    const target = messageRefs.current[lastKey];
    if (target) {
      const offset = target.offsetTop - container.offsetTop;
      container.scrollTop = offset;
    }
  }, [chatMessages]);

  return (
    <>
      {/* HERO SECTION */}
      <header
        ref={heroRef}
        className="hero"
        style={{
          backgroundImage: `
            linear-gradient(135deg, rgba(188, 231, 253, 0.35), rgba(247, 240, 109, 0.25)),
            url(${heroImage})
          `,
          backgroundPosition: `center ${bgOffset * 120}%`,
          backgroundSize: `cover`,
          height: heroHeight ? `${heroHeight}px` : "100vh",
        }}
      >
        <div
          className={`hero-overlay ${
            hasExpandedChat ? "hero-overlay--expanded" : ""
          }`}
          role="region"
          aria-label="Asistent LittleLoop AI"
        >
          <div
            className={`hero-overlay-body ${
              hasExpandedChat ? "hero-overlay-body--expanded" : ""
            }`}
          >
            <div
              className="hero-chat-log"
              aria-live="polite"
              ref={chatLogRef}
            >
              {chatMessages.map((message, index) => {
                const messageKey = `${message.role}-${index}`;
                return (
                  <div
                    key={messageKey}
                    ref={(node) => {
                      if (message.role === "assistant") {
                        messageRefs.current[messageKey] = node;
                      }
                    }}
                    className={`hero-chat-bubble hero-chat-bubble--${message.role}`}
                  >
                    <span className="hero-chat-author">
                      {message.role === "user" ? (
                        "Tu"
                      ) : (
                        <img
                        src={aiLogo}
                        alt="LittleLoop AI"
                        className="hero-chat-avatar"
                      />
                    )}
                  </span>
                  <p>{message.content}</p>
                  </div>
                );
              })}
              {isChatLoading && (
                <div className="hero-chat-bubble hero-chat-bubble--assistant hero-chat-bubble--pending">
                  <span className="hero-chat-author">
                    <img
                      src={aiLogo}
                      alt="LittleLoop AI"
                      className="hero-chat-avatar"
                    />
                  </span>
                  <p>Scriu un răspuns...</p>
                </div>
              )}
            </div>

            {chatError && <p className="hero-chat-error">{chatError}</p>}

            <form className="hero-chat" onSubmit={handleHeroChatSubmit}>
              <input
                className="hero-chat-input"
                type="text"
                placeholder="Astăzi vrem să... râdem"
                aria-label="Mesaj către LittleLoop AI"
                value={chatInput}
                onChange={(event) => setChatInput(event.target.value)}
                disabled={isChatLoading}
              />
              <button className="hero-chat-send" type="submit" disabled={isChatLoading}>
                {isChatLoading ? "..." : "Trimite"}
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* MAP SECTION */}
      <section className="section map-section" aria-labelledby="map-title">
        <div className="container map-section-inner">
          <div className="map-copy">
            <h2 id="map-title">Plimbă-te prin Bucureștiul creativ</h2>
            <p>
              Harta noastră interactivă te poartă prin ateliere, galerii și
              spații prietenoase cu copiii. Dă scroll până aici, explorează zona
              și găsește un nou loc de descoperit în weekendul acesta.
            </p>
          </div>

          {/* MAP */}
          <InteractiveMap />
        </div>
      </section>

      {/* SHOP SECTION */}
      <section className="section shop-section" aria-labelledby="shop-title">
        <div className="container">
          <div className="shop-intro">
            <span className="shop-tag">Nou</span>
            <h2 id="shop-title">Magazinul LittleLoop</h2>
            <p>
              Resurse digitale și kituri pregătite să transforme timpul petrecut
              împreună în amintiri creative. Alege ce vi se potrivește și hai
              să construim lucruri frumoase.
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
    </>
  );
}
