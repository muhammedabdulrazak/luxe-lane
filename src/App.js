import { useState, useEffect, useRef } from "react";

const INSTAGRAM_URL = "https://www.instagram.com/luxe._.lane";
const WHATSAPP_NUMBER = "919876543210"; // 🔁 Replace with your actual WhatsApp number (country code + number, no + or spaces)

function buildWhatsAppURL(product, category) {
  const emoji = category === "women" ? "👗" : "🧒";
  const section = category === "women" ? "Women's Collection" : "Kids' Collection";
  const msg =
    `Hi Luxe Lane! ${emoji}\n\n` +
    `Thank you for being here! 🙏\n\n` +
    `I'm interested in the *${product.name}* from your *${section}*.\n\n` +
    `Could you please share more details — sizes, colours & pricing? 😊`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

const goldGradient = "linear-gradient(135deg, #c8a84b 0%, #f5e07a 40%, #c8a84b 70%, #a67c2a 100%)";
const goldText = {
  background: goldGradient,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

const fabrics = [
  {
    name: "Cotton",
    desc: "Naturally breathable and soft, our premium cotton is skin-friendly and perfect for everyday comfort. Lightweight and hypoallergenic, it keeps you cool in warm weather while remaining gentle on sensitive skin.",
    tags: ["Breathable", "Hypoallergenic", "Soft", "Everyday Wear"],
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    icon: (
      <svg viewBox="0 0 40 40" width="36" height="36" fill="none">
        <circle cx="20" cy="20" r="18" stroke="#c8a84b" strokeWidth="1.2" opacity="0.4"/>
        <path d="M20 10 C14 10 10 14 10 20 C10 26 14 30 20 30 C26 30 30 26 30 20" stroke="#c8a84b" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        <path d="M20 10 C20 10 23 14 23 20 C23 26 20 30 20 30" stroke="#f5e07a" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
        <circle cx="20" cy="10" r="2.5" fill="#c8a84b"/>
        <path d="M16 16 Q20 13 24 16" stroke="#c8a84b" strokeWidth="1" fill="none" opacity="0.6"/>
      </svg>
    ),
  },
  {
    name: "Linen",
    desc: "A timeless fabric with rustic elegance — linen is highly absorbent and gets softer with every wash. Its natural texture gives each piece a luxurious, lived-in charm that only improves over time.",
    tags: ["Durable", "Natural Texture", "Eco-Friendly", "Luxurious"],
    img: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&q=80",
    icon: (
      <svg viewBox="0 0 40 40" width="36" height="36" fill="none">
        <circle cx="20" cy="20" r="18" stroke="#c8a84b" strokeWidth="1.2" opacity="0.4"/>
        <line x1="10" y1="14" x2="30" y2="14" stroke="#c8a84b" strokeWidth="1.2" opacity="0.5"/>
        <line x1="10" y1="18" x2="30" y2="18" stroke="#f5e07a" strokeWidth="1.5"/>
        <line x1="10" y1="22" x2="30" y2="22" stroke="#c8a84b" strokeWidth="1.2" opacity="0.5"/>
        <line x1="10" y1="26" x2="30" y2="26" stroke="#f5e07a" strokeWidth="1.5"/>
        <line x1="14" y1="10" x2="14" y2="30" stroke="#c8a84b" strokeWidth="1" opacity="0.3"/>
        <line x1="20" y1="10" x2="20" y2="30" stroke="#c8a84b" strokeWidth="1" opacity="0.3"/>
        <line x1="26" y1="10" x2="26" y2="30" stroke="#c8a84b" strokeWidth="1" opacity="0.3"/>
      </svg>
    ),
  },
  {
    name: "Polyester",
    desc: "Engineered for longevity, our polyester blends resist wrinkles and retain their shape wash after wash. Vibrant colors, quick-dry properties and a smooth finish make it a practical luxury for modern lifestyles.",
    tags: ["Wrinkle-Free", "Vibrant Colors", "Quick-Dry", "Long-Lasting"],
    img: "https://images.unsplash.com/photo-1586195831645-d4b892dc48af?w=600&q=80",
    icon: (
      <svg viewBox="0 0 40 40" width="36" height="36" fill="none">
        <circle cx="20" cy="20" r="18" stroke="#c8a84b" strokeWidth="1.2" opacity="0.4"/>
        <polygon points="20,11 25,16 23,23 17,23 15,16" stroke="#f5e07a" strokeWidth="1.4" fill="none"/>
        <circle cx="20" cy="19" r="3" stroke="#c8a84b" strokeWidth="1.2" fill="rgba(200,168,75,0.1)"/>
        <line x1="20" y1="23" x2="20" y2="29" stroke="#c8a84b" strokeWidth="1.4" strokeLinecap="round"/>
        <line x1="17" y1="26" x2="23" y2="26" stroke="#c8a84b" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
        <circle cx="20" cy="11" r="1.5" fill="#c8a84b"/>
      </svg>
    ),
  },
];

const womenProducts = [
  {
    name: "Cotton Set",
    desc: "Effortlessly elegant two-piece cotton ensemble — crafted for the modern woman who values comfort without compromising style.",
    badge: "Bestseller",
    emoji: "👗",
    img: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&q=80",
  },
  {
    name: "Cord Set",
    desc: "Textured corduroy co-ord set with a rich, structured look. Perfect for festive occasions and casual outings alike.",
    badge: "New Arrival",
    emoji: "✨",
    img: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&q=80",
  },
  {
    name: "Normal Wear",
    desc: "Everyday essentials reimagined with premium fabrics and thoughtful cuts. Designed for all-day wear with timeless grace.",
    badge: "Essential",
    emoji: "🌸",
    img: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&q=80",
  },
];

const kidsProducts = [
  {
    name: "Frog Set",
    desc: "Adorable and playful frog-themed outfit for your little ones — fun prints with soft, comfortable fabric for active kids.",
    badge: "Fan Favourite",
    emoji: "🐸",
    img: "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=600&q=80",
  },
  {
    name: "Cotton Eleverse Set",
    desc: "A breezy cotton set with an elevated sporty twist — lightweight, easy to move in, and charming for little adventurers.",
    badge: "Comfort Pick",
    emoji: "🌟",
    img: "https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=600&q=80",
  },
  {
    name: "Cord Set",
    desc: "Mini corduroy coord sets that match the grown-up vibes — dress your little one in style with this premium textured set.",
    badge: "Trending",
    emoji: "👑",
    img: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=600&q=80",
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, inView];
}

function GoldDivider() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "0 auto 40px", maxWidth: 300 }}>
      <div style={{ flex: 1, height: 1, background: goldGradient }} />
      <span style={{ color: "#c8a84b", fontSize: 18 }}>✦</span>
      <div style={{ flex: 1, height: 1, background: goldGradient }} />
    </div>
  );
}

function ProductCard({ product, delay = 0, category = "women" }) {
  const [ref, inView] = useInView();
  const [hovered, setHovered] = useState(false);
  const [imgErr, setImgErr] = useState(false);

  const handleClick = () => {
    window.open(buildWhatsAppURL(product, category), "_blank");
  };
  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "linear-gradient(145deg, #111000 0%, #0a0a0a 100%)",
        border: hovered ? "1px solid #c8a84b" : "1px solid #2a2200",
        borderRadius: 20,
        cursor: "pointer",
        transition: "all 0.4s ease",
        transform: inView
          ? hovered ? "translateY(-8px)" : "translateY(0)"
          : "translateY(40px)",
        opacity: inView ? 1 : 0,
        transitionDelay: `${delay}ms`,
        boxShadow: hovered ? "0 24px 60px rgba(200,168,75,0.18)" : "0 4px 20px rgba(0,0,0,0.5)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Gold shimmer top border */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 2,
        background: goldGradient,
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.3s", zIndex: 2,
      }} />

      {/* Photo */}
      <div style={{
        position: "relative", width: "100%", height: 280,
        overflow: "hidden", background: "#100e00",
      }}>
        {!imgErr ? (
          <img
            src={product.img}
            alt={product.name}
            onError={() => setImgErr(true)}
            style={{
              width: "100%", height: "100%",
              objectFit: "cover",
              objectPosition: "center center",
              transition: "transform 0.6s ease",
              transform: hovered ? "scale(1.06)" : "scale(1)",
              display: "block",
            }}
          />
        ) : (
          <div style={{
            width: "100%", height: "100%",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 60,
          }}>{product.emoji}</div>
        )}
        {/* Dark overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(8,8,4,0.7) 0%, transparent 60%)",
        }} />
        {/* Badge on photo */}
        <div style={{
          position: "absolute", top: 12, left: 12,
          background: "rgba(200,168,75,0.18)",
          backdropFilter: "blur(6px)",
          border: "1px solid rgba(200,168,75,0.4)",
          borderRadius: 20,
          padding: "4px 12px",
          fontSize: 10,
          color: "#f5e07a",
          letterSpacing: 1.5,
          textTransform: "uppercase",
          fontFamily: "'Josefin Sans', sans-serif",
        }}>{product.badge}</div>
      </div>

      {/* Content */}
      <div style={{ padding: "20px 22px 24px" }}>
        <h3 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(17px, 3vw, 21px)",
          margin: "0 0 10px",
          ...goldText,
        }}>{product.name}</h3>
        <p style={{
          color: "#777", fontSize: 13, lineHeight: 1.7, margin: "0 0 18px",
        }}>{product.desc}</p>
        {/* Two action buttons */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>

          {/* View on Instagram */}
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            style={{
              flex: 1,
              display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
              border: "1px solid rgba(200,168,75,0.4)",
              color: "#c8a84b",
              fontFamily: "'Josefin Sans', sans-serif",
              fontSize: 10, fontWeight: 600,
              letterSpacing: 1.2, textTransform: "uppercase",
              padding: "10px 8px",
              borderRadius: 30,
              textDecoration: "none",
              transition: "all 0.3s ease",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "rgba(200,168,75,0.1)";
              e.currentTarget.style.borderColor = "#c8a84b";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.borderColor = "rgba(200,168,75,0.4)";
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#c8a84b">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            View
          </a>

          {/* Order on WhatsApp */}
          <button
            onClick={e => {
              e.stopPropagation();
              window.open(buildWhatsAppURL(product, category), "_blank");
            }}
            style={{
              flex: 1,
              display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
              background: "linear-gradient(135deg, #25d366, #128c7e)",
              border: "none",
              color: "#fff",
              fontFamily: "'Josefin Sans', sans-serif",
              fontSize: 10, fontWeight: 700,
              letterSpacing: 1.2, textTransform: "uppercase",
              padding: "10px 8px",
              borderRadius: 30,
              cursor: "pointer",
              transition: "all 0.3s ease",
              whiteSpace: "nowrap",
              boxShadow: "0 3px 12px rgba(37,211,102,0.3)",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = "0 5px 18px rgba(37,211,102,0.5)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = "0 3px 12px rgba(37,211,102,0.3)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#fff">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Order
          </button>

        </div>
      </div>
    </div>
  );
}

function FabricCard({ fabric, delay = 0 }) {
  const [ref, inView] = useInView();
  const [hovered, setHovered] = useState(false);
  const [imgErr, setImgErr] = useState(false);
  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "linear-gradient(145deg, #0e0c00, #0a0a0a)",
        border: hovered ? "1px solid #c8a84b" : "1px solid #2a2200",
        borderRadius: 20,
        overflow: "hidden",
        transition: "all 0.5s ease",
        transitionDelay: `${delay}ms`,
        transform: inView
          ? hovered ? "translateY(-6px)" : "translateY(0)"
          : "translateY(50px)",
        opacity: inView ? 1 : 0,
        boxShadow: hovered ? "0 20px 50px rgba(200,168,75,0.12)" : "0 4px 20px rgba(0,0,0,0.4)",
      }}
    >
      {/* Photo */}
      <div style={{
        position: "relative", width: "100%", height: 180,
        overflow: "hidden", background: "#0d0c00",
      }}>
        {!imgErr ? (
          <img
            src={fabric.img}
            alt={fabric.name}
            onError={() => setImgErr(true)}
            style={{
              width: "100%", height: "100%",
              objectFit: "cover",
              transition: "transform 0.6s ease",
              transform: hovered ? "scale(1.07)" : "scale(1)",
            }}
          />
        ) : (
          <div style={{
            width: "100%", height: "100%",
            background: "linear-gradient(135deg, #1a1400, #0a0900)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ fontSize: 48, opacity: 0.4 }}>🧵</span>
          </div>
        )}
        {/* gradient overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(8,6,0,0.85) 0%, transparent 55%)",
        }} />
        {/* Icon badge on photo */}
        <div style={{
          position: "absolute", bottom: 14, left: 16,
          width: 48, height: 48,
          background: "rgba(8,6,0,0.7)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(200,168,75,0.35)",
          borderRadius: "50%",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 0 12px rgba(200,168,75,0.2)",
        }}>
          {fabric.icon}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "20px 22px 24px" }}>
        <h3 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 22,
          margin: "0 0 10px",
          ...goldText,
        }}>{fabric.name}</h3>
        <p style={{ color: "#777", fontSize: 13, lineHeight: 1.75, marginBottom: 18 }}>{fabric.desc}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
          {fabric.tags.map(tag => (
            <span key={tag} style={{
              background: "rgba(200,168,75,0.07)",
              border: "1px solid rgba(200,168,75,0.18)",
              borderRadius: 20,
              padding: "4px 11px",
              fontSize: 10,
              color: "#a0802a",
              letterSpacing: 0.8,
              fontFamily: "'Josefin Sans', sans-serif",
              textTransform: "uppercase",
            }}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState("women");
  const [heroVisible, setHeroVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [showBackTop, setShowBackTop] = useState(false);

  useEffect(() => {
    // Loading animation
    let prog = 0;
    const interval = setInterval(() => {
      prog += Math.random() * 18 + 6;
      if (prog >= 100) {
        prog = 100;
        setLoadProgress(100);
        clearInterval(interval);
        setTimeout(() => setLoading(false), 600);
      } else {
        setLoadProgress(Math.round(prog));
      }
    }, 120);

    setTimeout(() => setHeroVisible(true), 3200);
    const onScroll = () => {
      setScrollY(window.scrollY);
      setShowBackTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearInterval(interval);
    };
  }, []);

  const [fabricRef, fabricInView] = useInView();
  const [collectionsRef, collectionsInView] = useInView();
  const [ctaRef, ctaInView] = useInView();

  // Generate starfield particles once
  const particles = useRef(
    Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 0.5,
      duration: Math.random() * 6 + 4,
      delay: Math.random() * 6,
      opacity: Math.random() * 0.6 + 0.1,
    }))
  ).current;

  const logoUrl = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAQABgADASIAAhEBAxEB/8QAHQABAAICAwEBAAAAAAAAAAAAAAYHBQgCAwQBCf/EAF4QAAIBAwIDBAcDBwcGCwUFCQABAgMEBQYRBxIhEzFBUQgUImFxgZEyobEVI0JSYpLBFjNygqKy0RckU3PC0iU0NTY3Q1RjdLPhRGSDhPAmVZOUo8PT8UY4VmWV4v/EABoBAQADAQEBAAAAAAAAAAAAAAADBAUCAQb/xABEEQEAAgECAwQIBAUCBAUEAwEAAQIDBBESITETQVFhBSIycYGRscEUI6HRM0JS4fAVNCRicpI1Q1OCsgai0vFFY8Li/9oADAMBAAIRAxEAPwDTIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPqTfctwPgPXbYzJXMuW3x91Wf7FGT/BEgsuHGubuKlR0zfqL7pThyL6y2I7ZaU9qYh3XHa3SEUBYdDgxxBqrf8kUKf9O8pL/aPdR4F63l/PLH0fjcc391Mr29IaWvXJHzSxpM89KT8lXAt+PAHU7+1lsVH51H/snfH0fc8+/UGKX9Sr/unH+qaP8A9SHX4HUf0SpkFyy9H7Pruz+Kf9Sr/unmrcBdTwW8MpjJ/OovxiP9U0f/AKkH4HUf0SqMFjVOC2u4tqFlZ1F4NXcI7/Vo8tzwh1/QW7wsKn+ru6Uvwkd19IaW3TJHzhzOkzx1pPyQMEmutAaztqbqVdN5DkXfKFPnX1W5hLnG5G2e1xYXVF/t0pL8UWa5aW9mYlFbHavWHkB9aa71sfDtwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH2MZSe0YuTfgkB8BNtKcKtc6kUaljhKtKg+vbXLVGH9rq/kWxpr0cLSnShW1HqGcqj6uha0tope+bf8Cln9I6bB7d43WcWkzZfZq1xMxg9LajzlXs8Thb68f8A3dFtL59xsmqXAnQU+eVPHVbyl1XPUld1W/6K5kvmkYvUXpH4m2Xq2ncBWuqcfsTuJKjFf1Um/vRU/wBRz5f4GGZ855Qm/CY6fxckfDmr7B8Bdd38lK8oWmNpPvdaupSX9WO7J3jfRxxVGClktR3VxOL3lCjQjTjt/Sbb+4geouPOucmnCyqWmKpv/QUuaf70939CB5rVGpM3UU8pm7+8kuiVStJpfBdx7OH0jl9q8Ujyjf6naaSk+rWbe+dmxdzorgvp1OWQp49tf9pv5Tl0/ZU/4HXR4j8IdO0HSxNvbyXla2O7/ekkzW+ww2ZyVVQssbe3U3+pSlInOI4G8TclSVWnp128H1TubinSf0b3Ib+jsNeeoz2n322hJXV5Jn8rHEfDdYV76RGK7R9jp++uI+DnXjD+DMLeekHdy39V03Rj/rbly/uxR0W/o/ZKjQ7XOatwWK2741Kyk/rukeetw04Z2G8clxbtO0X6NCyc19VJnNNH6Mj2a8X/AHS9tqtZPW23yh4b3jrrGtv6vRx9v/8ADc/7zZ4JcauIT7srbR+FjRf4xMpDCcEbOTVzq3MX/wDqbRx/gd1W74CW0fzON1BeS/bm4/xRYjDpI9nBv/7f3Rzl1E9cv6/sjdbi7r+r35uEf6NpRj+ETzPihrt//wAwVl8KVNf7JnVqbhFBvl4e39Ty5sjNfxO/GZ7hrlMlQx+O4WVqtxcTUKcHlanVs6iMcR/t/wBK/u44sk8u1/Wf2RlcTtdr/wDmG4fxpwf+yeyhxd1/RW0c1CX9Ozoy/GBnM1m+HGGy1xjMhwrqUri3qOFSKy1Rr4pnRPVfCGolvw1vKf8AQyk3/ETXFaN50+/wr+5FrxP8X9Z/Z4P8suv/ANLKW0v/AJGivwiem1416zpyTrysbheTo8n91oyFvf8AAm6jy3WEz1g/OlWlN/fI4VsbwNvXy2mezuOfnXoua+6LOZwaSfawf/bH2d1y6iPZy/r+7J2vHy66et6coz/1Vy4/3osy9D0g8b0i9O31uvFwu4y+7lRGKPDvhnePkseLFuqj7o1bBxX1lKJ31uCELii6mF1zhMh03Ud+Vv8AdlL7ytfS+jLe1WY/7oTRqNbHS2/ylMa3EfhlnYOOS7H2119dsXJr5pS/E6qWn+DObW9s8Wpy7uzvJ0ZP5OSX3FY33BziDaxcvyNTrJf6K6pSf7vNv9xFMtp3P4iq6eSw99aSX+loSj9+x1j9H4L/AO3zzHutEvL6zLE/m4on3xsvK/4Facut547MX1pF/Z5lGtH/AGfxIjmuBWpraS/Jd5Z5GLXc32Ml+90+8rSwymVxlbtLK/u7SovGnVlB/cTHE8X9dWG6nlIXkW+quaUZP95bS+8l/D+kcXsZYt74/ZHGbR39ukx7pYHN6J1Zhk5ZHA31Kmv+sVJyh+8t0R+ScXtJNNeDL+wXpB28moZrAVKTffVta3Ml/Vkt/wC0Z+pqHgzrOUXkfyf28nttc0pUKm/vktv7wn0hqsP8fDPvrzPwmDJ/CyfPk1hBsnm+BGlchbKtgsnd2Mmm4ye1xTk/DxT2+bKx1Fwb1pi5SlbWtHKUk+krWouf9x7S+4sYPSulzTtF9p8J5Isugz4+c13jy5q6B23NvXtqrpXFCpRmns4zi4tfJnUaKmAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAE50Jwq1lrGPb43Gujab9bm5fZwfw36v5HGTLTHXivO0Oq0tedqxugxnNLaS1Hqe47DB4m4vJeLhHaK+LfQ2R09wd4daBspZXW2SoZSpBb81eXZUIS9yT3k+7/AAMZrD0h8PjKH5N0XiY1qUI8sJyTpUo/CK9qXz2M2fSNs3LS04vPpC3GkrSN81tvLrLFaK9HGvzq41jlI0Ix6u1tGpy+c+5fLclsszwX4YOf5Lha1L+K2apb3Nx+9u4x+qNd9XcQ9X6pbjlsxWlQb37Cl+bp/ux7/nuYvTunM7qK8VrhcXdXtWXhSptpfF9yI50GbNHFqsvLwjlDr8Tjx8sNOfjPOVwat9IvMXfsaexdOy/724l2kvlFbRXz3Kr1LrfVWo5J5fNXVeC6qmpckF/VjsixbbgdSwtnG+4haux2nqPjRg1Wqv3bJnCtqbg7pJqOnNLXGpruP/tOSm4U9/NQRLgppcf+3pvPjEfeXOW+fJ/Ftt/ngqzC4PMZu49XxWNubyq/0aVNssDFcE9TTtndagvMdp6guu97XipNfBPc82e4z6yv4djjq9vg7df9Vj6Sp/f3kCyWSyGTuHcZC9r3VV98qs3J/eW/z7+Ff1/ZX/Ljz/RZdLT3B7Cyl+VdZ3+cqx/6uwtHThv/AEmdllxL0TgK2+muG9lJx+zWyFd1Z/HYqUD8LE+3aZ+P7bHbTHsxEf55rayvpB8Rbum6Vrd2ePpeEaFtHdL3N77EFy+tdWZao55DUORrtvd715JfREfB1j02HH7FYj4PLZb39qXOpVq1P5ypOf8ASk2cACdGAAD1YqwuspkKNhZUnVuK0uWnBeLLr4IcO9Q6f1os9nrNWtpZUZ7TlJS3lJNdNvFLd/Io63rVbevCvQqSp1IPeMovZplucA9ZZe613TxGYydxeW1/SlTVOtPmTmlvFLfz2a+Zn+koyzp78HTad/H4LWjmna14vFlOLekchxByWL1dozHV722yNu41JSSg1Km+Vbpvp0X3FM53FX2EytfGZKg6F1Qly1IN77Mtrjhqu405krDR+lLytjLTF0fztOhUfScuuzk+raX3tlO3t1c3t1O6u6061ao95zm922e+j4ydlXf2e7x27t/gavh7SfHv8N+90gAvqocoylH7MmvgziAMrjNRZ7GT58fmL62f/d15L+JLcdxk17ZxUHlKdxFf6ahByf8AWST+8r0EOTT4skbXrE/BJTNkp7NphatzxVxGajGOqNFWN80utSlPkl8d2nL+0dfYcH87RjyXeQ03cvv5oSq01/e3+qKuBB+BpX+HM1908vlO8fol/E2n24iffH36rQnwguMhR7fSmpsRm4P7NONVU6nzTey+pD8/ozVOBh2mVwl3b0t9u05eaD/rR3RgqVWpSmp0qk4SXc4vZkx0/wAUdbYWMadDM1LiilsqdylUSXkm+q+TOprqaezMW9/L9Y/Zzvit1iY93P8Az5o7hc9mcLcKvisndWlRdPzdRpP3NdzLO01x2zVrBUs7j6OSS2Xa0pKjU2962cX9DpjrjQGppuOrNJ07GvKO3rVm3tv57LZ/XmOMuGumdQwlcaN1ZbzbW6tbjvT8t+kv7O3vKeonT5Y21WPbz25fOFjD22Od8F9/88JWHa684c60tI22ZdvGfTahf01Fxf7Mu76SRjNRcEtPZWHrWnchLHOUd4Rb7WjP4PfmS+cimtTaI1Np2CqZPF1I0G9lWpNVKbf9KO6XzPNpnVWoNN1+1w+Tr227TlT35oS284voyKno+1I49Fm2jwnnCW2ti88Opx7/AKSymquHOrtN0pXF/i5TtYvrXoSVSC8t9usfnsREvvRnHihPs7bVGPdKW2zu7Xqvi4Pqvk/kSe+0tw54iWtS/wAf6tOu++4s59nUg/247L6uPXzPf9Szablq8e0f1Rzh5+CxZuenvvPhPKWroLL1xwez+ChO6xlRZe0it32UOWrFebh4/GLZW04yhJwnFxkujTWzRq4dRjz14sdt4UMmK+KeG8bS4gAmRgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGc0hpPPasyMbDB4+rdVX3tdIxXm2+h5a0VjeZexEzO0MGTbh7wv1freXaYnHShZxe07qs1CnH4b979yL50TwN0foi0ln9f5G2vnQipShOXJQot+b39p+4wXEr0jIQt3iNB2UKVGC5Y3VWkowiv2Kf16v6GXbX5M08Olrv5z0hbjTVxxxZp28u9IMDw34b8LsdHLaqvLXIX0NpRubtbQUvKnS3fN80/kRPX3pHXdRu00bZ9jTj09auoJtrw5afcvnuUTlspls/kpXeSvLm/u6r6yqSc5P4FlaS4H527xqzmrLu303hlDtHVuZx7Rx90d918yL8DhpPaay/Hbz6e6ISfib2jgwV4Y8uvxlXGezma1Ffu7y+Qub+4l0TqSb29yXcvkS3SHCPV2oKMbyrbUsTj2t3dX1RUo7e5PqyUXer+G+gpRhoHFLOZFLrkr+D2i/wBmLK91rrvVOsK6qZ3K1riC+zSXswj8IroX4tlvERjrwx5/srTFK87TvP8Anemdez4TaNfLc3NzrDIw74Ut6Vun8fE8eX41asnb+o6eVrp2wS2VGxpRTa98ttysgd/hqTzv60+f7dHHazHs8nbc3Nxc1HUuK9StOT3cpybbfzOoAsIwAAAAAAAAkWi9H5jVV5K2x1Ce/YzqQnKL5ZuK+yn3bvuI6T/hZxNyeh6de2p0VeWtaUWqc5tKn1fM47eL3+4h1E5YxzOKN7JMUUm0cfRDsviMliKlOnkrOrazqR54RqLZtHhJZxat3Q1zfVIurKhdctzQdSW7cJpSW3u6siZ3jtxVi3i5tG1pgJ3wCx1TJcW8BRppvs7jtnt5QTl/AghsN6FGBdzq2/z1RexbUuxg35yT3+4r67L2WnvbySaenHkrCB+krh54ji3lN+sLtQuYvz5orf6NMrU2p9NzTPaY7E6pow9q3m7Su0v0X1i/qpGqxz6Ozdtpq2+HydaqnDltAezEYy/y97GyxtrUuriSbVOmt20jxkk4ZWF7ktcYy0sK9WhUlWUpVKb2cYLrJ/RMtZLcNZnwQ1jeYh2al0LqHT+GssnkbGtTp3Kk5xcOtHZpbT8m90yLlo8WuKd1qm2u8DStKVKyhcrkrJvnqRhvtuu7q+vQq4i01stse+aNpSZ4xxfbHO8AALCEAAAAADlCUoPmhJxa8U9jiAJppnibqzBxjSjfK9t1Hl7K7XaJR8k/tL5MktPU3DbVs99UYOWGvXFx9Zs91BvwbUV4e+Lb8ypgVb6PFaeKPVnxjlKauovEbTzjzWZmeEOTla/lDSeTtNRWMusXSlGFVLycW9m/cnv7iAyjlcHkXGSusfeUZdV1pzizswOdzGCuvWcRkK9pUa2bpy2Ul5NdzLEsOKGMztrDH8QcFRyVOPSF1Rgo1Ie/Zbfc18yOZ1OLrHHX5T8uk/o6iMV+k8M/p+7t0jxsy1m40NRW6yFHu7aio06q+KS5ZfRP3lgVLHh3xRt51aUqU73k61aX5q4pPr9qP6S6eKktvFFbZbhpjszaPJ6Ay9LI0e+VpVqJVIe7d7f2kvduV1dW+TweTlRr07ixvaEuqe8JwZR/B6bPab6a3BePDl86rcarNijhzRxV8/tKe664O6k0+ql1jo/lfHxXN2lKKjVivfT3b+a3RWzTTaaaa8GXFoDjfk7CpTs9Uxd/a/Z9ZpxSrQ+K7p/Pr7ywc7o7QXErHyy+KuaUbiS29ctdlJS26RqQe276PvSfvZ1+Pz6SeHV15f1R0+Lz8Li1Eb6eefhLVsEs15oHPaQq817SjXs5S2hdUXvB+5rvi/c0iJmvjy0y1i1J3hn3pak8No2kAB25AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOVOE6k1CnCU5N7JJbtkg0Ho3P61zVPF4KylXqSft1H0hTXnKT6I2e0pozh/wSwKzmqby2vMxLdKvUhzbPb7FKnv1fv2+hT1Wtpg9WOdp6RHVPh09snPpHigPCz0dr6+hDK64qyx1rspws4tdrVX7T39hfeTLWvGXRfDzFvTWhrChdVKKcVSoz/M0pftT6ub7+i+pUvFjjlqXWNStZY2pUxOImuV0qcvztVftyXh7lsviQjQ2i9Ra0yisMDYSuJ986kmowgvNyfTwZT/CXzfmay3KO7uj3rE56Y/UwRz8e/wCD5rXWWo9Z5FXecv6lzJdKdGK5adNeUYrovxJhoPgrqLPWay+brUtO4RR5pXd40nJL9WLab7iR264dcI4t3MaOrdUQ6xSbVC3f3pldcRuI+qdd3va5m+l6tB/mbSl7NKkvJJd/zLdbXvEVwxw18f2hXmKxO953n/O9YtbXvD3hzQna8OsTHK5Rrkq5S9i2k14wT+ZUeqdT53U+QnfZvJV7urL9eXsxXkl3IwwJsenpjni6z4z1cWyWtG3cAAnRgAAAAAAAAAAk/DfSN5rHUVHG0FONBy/P1o7fmls3v1+By4haOraNv4WF3krO6um2506Mm3Tj+i38Uzy6D1Te6Qz0cxY04VK0KcoRjNvl3a23e3eSvX9KtrbTsOIFCjTV3BqhlKVP9FrpGe3kypa2WueN59T7rERjnFy9r7K1BNeFHDzKcQsvUsMdWp0VSW85za6fLcxfELSmQ0Zqe4weRSdSltKMl+lF9zJ4zUm/ZxPPwQ8FuHi25JDfJ6p4VUL5vnv9PS7Gpsurt5P2X8mefgZhcBnuIdlj9R14U7SW7jTm9o1ppdIN+G528Ca8Z63hhK6U7XLUZ2tWD7nvFtfeiKZS2udPamr2zbp17G5aTT6pxfQh4ZnjxRO3fHx/uk3j1bzzZ7jRjcLiOJGWx2ATjZUavKoddoy26pb+G5s/6L2Kq2vDWhR25Z1m6z8+81t4z45rN2OpaMJO0zVrC5Umu6eyU19fxNpuBd9CrpCxrWjXL2UU14GV6UvP4SsR/my5pK/nSlHHLAQ1HwvzmNaTqerSq035Sh7S/u7fM0E01DFyz9pDNSqRsO1XbOmuu3/8T9A+MWZjguGmeyktvzdpOMVv3ykuVL7zQrQWAr6m1XaY6kmqcp9pXnt9inHrJ/RHPoW3Dp8k2nasfpy5vddG+WsR1WP6SlLB2VPCY3HW1ChXpQk4xpQUeWl0S327+qff1Mbwppy03oDUmuKkEqjpeo2Lku+cmlJp+a3X3kY4tZZZvX+QrUkuypTVvSS7todG18Xu/mTbjZa1NK8PdJaPp8sVKlK6unH9Obfj8HKS+RaxUnHgxYLTvNuv1n9keS0Xy3yxG0R0+kKcbbbb72fDK6TwV9qXP2uFx0Yu5uZcseZ7JdN22/BbHs1/pO/0bn5YfI1KNSqoKalTe6af3o1O0rx8G/NS4Z24u516R0xfanq3NDHVrZXFCn2kaVWpyuovHZvp4eJx1fprJaYyMbLI02pOnCfOlvBuUVLZPue2/gZ3hjQljad/rCuo9hjaUo0k5bdpVktkl9fvMNrHV2Y1XcUquUqU32SfLCnDlju+9/H/AAIYtlnNMRtwx890s1xxi3nfi/TZgAAWUAAAAAAAAAAAPTjb+9xt5C8sLqrbXFN7xqU5OLRZWF4kYvN20cVxCxVK/t9toXdKmozg/PaOz+cWt/FMqwEGXT48vO0c/Hvj4pMeW2Pos/UXCudxYrM6Iv6ebx9T2lRjJdtD3ftNeWyfuIFiMpl9O5RXOPua9jd03s9uj96afevcz7p7PZbAXqu8Te1bapttJJ7xkvJruaLNpaq0bxCpQstYWdPEZVQ5aOQodIylt05vL4S3Xk4or2tlwxtkjjr+vxjv+HyTRGPJzpPDb9Pn3JBobjDjcvTjjdVUaNnXlHkdfl3oVd+9Sjs+Tf5r4Hn11wgx+ThLJaQq0LacoqStnUTo1ffGW75N/Jtr3ruK01voHN6WfbVoRurGWzhc0eq2a3XMl1juvPo/A+aG19n9J1FTs66r2TlvO1rdY/GL74v3rYo/geH8/QX237v5ZWvxXF+Vq677d/fCO5TH32LvallkbWrbXFN7Sp1I7NHlNnqdbRPFjDOHLGdzTh/NyfJcW0n4p+K3XvXmk2UrxF4dZnSFxKrKLvMa5bU7qnHu9049eV/c/Bst6T0lXNbsskcN47p+yDUaK2OvaUnir4x90LABpKQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB9jGUpKMU229kl4gfCz+D/AAezWu6nrtxJ43Dw+1dTju5+6K8Se8GeBdOjb0NVa/VOjZKHbUrCpLbnjs3vN7rlXczx8ZuPFe87TT+h5Kzx9OLoyuoQSco921Nforv9rvfuMvLrL5rzh0vOe+e6FymCtK8ebp4d8pbq7iRpDhDgpaR0Xa0rnI01tUUXulP9arNd7/ZXz2Na9VajzerMw8jmbud3cz2jFJbRivCMYrol7kcNMYDM6pzNPGYe0qXl3Wbey8PFtt9y+JdVOjofglZwnewt9Sa3ceZU4ybo2bfg2um4xYcWjnl62SfnP7Q8vkvn5zyrHyRrS/Cm0xmOhqHiVklg8ausLXvuK/kkl3Hi13xUuLmzendG0fyJgKS5IxpLlqVl5yl3kL1jqjNasy9TKZu8nc15von0jBeSXgYUt1wzaeLLO8+HdCGckRG1OT6229292z4AWUQAAAAAAAAAAAB9i0pJtbpPqvMCWaA0DndY3K9SpKhZptTu6vSEX5ebfuRhdUYW709nLnEXrg69vLaTg9091umi89C8XtD6awljY0sNKlGdNKpCMO09Xl+k05d7k+u/ehqHg7b66VxqzSmp4XiuvznZ1115vJy8PmZFdfkx5pnURw06R/eWhbS0tjiMU8Vu9RWAweWz147TEWNW7rKPM4wXcvMmHCHPx0nrCtjc5b7WV5GVpeU6v6G6a329zMvw7us7wn156vqHH1Le0uWqVafLzR/Zkmu/r4GC434u7sdfX19On/m19U7a3qLrGSe3TfzRZtk7a84p24ZjlPihjH2dIyR7UTzh15iGe4X69qvFXdS3q0/at6q7qlOXd8Tlq3A61zmC/wAouYhK6truW06263ik+VdPBFgcS9M3epODWndYUo9pc2tqoVkurlDfbf7jw6S4xY/HcLZaTyuLqXFajQnQprpyVFLfbm8ttyKue96xfHWJtE7Wd2w1raa3naJjeEH4Hxc+LGnUv+2J/cyRekHhatfjzkcdaU96l5UpOKS26yit/wCJ5PRyx1W94oWl9CH5nHxnc1PJJRexsbgv5EcQ8nS1lYUovJ0Yumqjm1KnJdNpR3+hBrNV+H1PHtyiu3xmeW7vT4e2xcG/PdXtlqLBZi+q8Ic1aUo2NtRjQtLlr21Vit31+JPuAeBzGl3kNM5Wg54+hPmtrnfpUi93siH5DgReXut6mdlmuzU66qtw23X3l23uRscPiqavr+hRhTgoRnVmo8z7u8ydZqcdqRjwzvxdfKfGF7BhvEzfJG236x4ID6WVPO5XSmM07hLOpcev3aVXk8Eu7cr3TdzgNDarsOHeLtaVzfXNN/lS9k+qqqHNGK92/ejZmlf291QVe3rwrUKkd4Tg0013dGUKuCX5M4hR1ZT1J2kad27jkqU95S7949/yOcGpwzgthyztG0+POfP3PcmHJGauXHzmdvhCmL/TUZ8eKeEjH83cX8KzXlGSVR/iz2+lHWc+J0qO72pWlLZb9263LY4g5LSuhc1S1pWxXrWXruNrT/ONbRS2bS7k4w6b+9FZ+lPjZw1hZZ2n7VvkLSHJNd3srb8NjU0WpnUZcV5jlwzHx5bquqwxipesdd9/h3I1w90/riysK2udPWnJQsoS/Pz26rulsn3kWq1MtqbPc9WVa+yF3U6t9ZSky1MFxopYrhZS0pa4mo76nbyt4VOZdntLf2ttt2+r6Eh4FaKWnMVW1hn6KpV6lKUqPOutCls+aW3m1v8AIs5NXfBF8mWsRO+1fGUFMFcs1pjt5z5K/wCLlS2wOPxug8fJShYRVa8mv+srSW/Xz23f1XkVzOE4fbjKPxWxMcbj9Taw1dcZ/H49V27vtpTq7RpR9rdJt9NtvAnHGPIXGts7YaTwOMd1f20320oQ2jCWyTgm/BbPd/4dZqZuxmuPr1m079Pejtj7SJv08I8VO4yyuMjf0LG1gp1681CEW9t2zNax0XqDSdSnHMWfJCovZq05KcH5rdeJbulOBVpirVZfW+XhbwpLnlRpzUYx2857/gdmpeKOhcu73G3VK/q2cKM6VOL/AJqs/wBbZdebp0e5FPpDtMm2COKI6/2lJGkitPzZ4Z7mvYPstuZ8q2W/Q+GoogAAAAAAAAAAAACZaG4hZfTUVZ1FG/xj35rat15U1s+Vvfb4dz8USXJ6S01rW0nktDV4W17CKlXsKr5Fv47bv2evj1j/AEe4qg9ONvrzG3lO8sLmpbXFJ7wqU5bNMqZNL63aYp4bfpPvj/JWKZ+XBeN4/WPdLunDLafy20lc4+/t5e+E4MurhxxbtMlGOI1cqNKpKPIrmUF2VXo/Zmu6Lfdvts/HbvMTitU6b4h2NPD6ypUrPKRTjb3kNoRbfin3Re/6L9l7vblfUgWudF5XSl3tcx7ezm/zN1TXsy8dn+q/cyplpi1n5Worw3jp+9ZWMd8mm/Mw23rPX9phZfE7g4nGeV0hS6v26lgpbrZ9d6cm+v8ARfybKQqQnTnKFSLjKL2aa2aLF4XcUb7S/LjsnGpfYnuUd/zlD+i/Fb/ov7i0db6IwHEjDQz+BuKML6pFuncw+zW2S9ia7913b7brx3RFTV5dDaMeqnevdb93dtPj1VePByt31/ZrOD25rF3+GyNXH5K2nb3FJ7SjJfevNe88RtRMTG8MyY2AAegAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB3WVrcXt1TtbWjOtWqSUYQit22x0HG2oVrmvChb05VatSSjCEVu2zZ/hRwvw/DzBx1xr6VvG8hDtadCuk4W+6ezfX2pPp02ZkdBaC0twb0vU1brOrQuMvGKcU0pKjLrtCC/SkyhuL3ErMcQcy61zKVvjqUm7a0Ut1H9qXnJ+Zj3zX19px4Z2pHW3j5QvVpXTRxZOdu6P3ZnjTxiy2uripY2TqWOGT27Pf26+3jP3eUe5e8wPDDhxmdcXc50WrLFUN3dZCstqdJJb+LW76Ga4TcMVnbSpqfVVz+SdMWi5qlep0dfv8AZh/idvFvirLO2MdK6UtliNMWrcIUaXR115y93uJ6bY/yNNG23We6P3lHbe35mafh4/tD36k4gYfRGJraT4Yz6TXLe5hx/OV34qG/cu8p6tUqVqsqtWcqk5PeUpPdtnAFzFhrjjl17575QXvN+oACVwAAAAAAAAAAAAAAAAEt4b69zehsn61janPQn/O2837M1/B+8iQOMmOuSs1vG8S6raaTvWebculrDHa+4c3eUwFnQuMnRp7u0uFuqdTv2k/fs9miqMzqWlqHSNfIX+Bo3qs32eSsZ1HTqUJLpzwlt3e59V57bo58Cde6bxmI/JN7Kjiq1NbyqSltC4fX2m9u9b7bP5Esz1jou5u6OrLfM0bOndvsbmjGnJxv4eMeTlW78mkz5fHSulz2xTjnbfeJ5z8N4blrTnxVvF4322mPvzYx62xmma2krV06lDCVKEpunNczjCVOHKpLx6tktyPDzhnrC2uMxa0LdSryjtWoTnFb+PRdPAxOSrxyFSNR6OtKNG33VG+yzjSpQb26KMurXd4IzNzp3NX9GEb3UVWypx22pY6mqcUv2ZPd7EGXLGOtbVmaW59++/PfuS1x9paYmOKOXdt3bd734zSOmtOaVyOH0w6dlXu6EqVS8qS9rmaaW7b6LfwKy4faAnoXVNtm7/XGPo0aTfbUaW/55NP2Xu9tiQ8RbfLaa0jO90hOdS5oy5rmpdPt6s4eLjzb9V3tJd3wK10Xxd13c6oxlnfZbtbStcQpVoerw6xk9n1STXyJ9Hj1GXBe9LxaLdd+vT3Sg1NsVMta2rtMbbeH2bCx4n6K6p5+k9vKEn+ESvuKWO0zxKytlVp63lZ0aEJRjRhYVJ7tvdvw3fyLX59583NIp30lsjqC0jg/yJUvKft1nKdsm30Udk2vmZ3ou1baiIx71md+czE93/Su6+sxhmb84jbx/dOOG9TE6C0hHD1tQ17+lGpKcKk7OpDlT747bS6fQ9N7xC0tUnySzEFJ9yqU5w/FIrT0dszxAvdV1Y5qvlK2LVtLmdzFqKn05dm13l9VK0+7nkc+k8VMWeYyTNpnnymP2NFe18UTXlEcu/8AdQvEPh/kOIee/KeJ1NYVrWnSjClQe8nTe28vs79W93uTmlpi3yfDex0fq+HbTtqKh6zTi1yTi3tJN7P7OxXHGPiVrHTPES4x+DvVQtKNKk1F28ZKo5R5m22uvft8iS8I9Q6q1pB3GotO2Cxa6evRi6FSb8opP2vuL+ox6mNLTJFoitdpjx+0KuG2Gc9qTEzad4nwZTR3C3QOjI1czkak8o7dOp2lylGNJLfd7b7eRjb3ibiNU2t7kLKwuLXH4tSVRzXNGrHlk9kvJpcuz80SLVuGt7bFXU6Gaucba9m+0lVq9pSUV1banumunmiFY3Hahhhe1xNli9Q4ptxUrJxocyf2uaL3hJtdNk0/MixWrqcc5MtptbeOs7RH2TTWcOThpG0bT0jdhpa2v8Lpy1z+Qp0qNarPmsLG1j2cYrvipPr4NN7bLZrv36TTSmr8npvh7ca11XaUIesNK2t6NN9o+ZtLmlJuW7976Ii2IwGH1PrKwubi8cbaxpbQw9xT7OpSlFJdU3vKPRPfr3JbmJ44cTbTKWN1pPF28a1BTUa1zLu3i09or3Nbbl62GMuSuGlOvO09No36Qq9pbHSclrdOUd+8+KB8Q+IWoda3bnkrjs7WL3p21N7Qj8fN+9kRAPo8eOuOsVpG0Ma97Xne07yAA7cgAAAAAAAAAAAAAAABYWguIk8fbxwepaKyOFmuzkpxUp04vw6/aW/Xbfp4NFegizYaZq8N4d0yWpO9Vha84fK0snqLStdZLBVFz7wknOgvf4tLfbfbp4pGD0FrTL6PyXrFhU7S3m121rN+xUX8H711OegtbZXSV2/V5dvY1X+ftZv2Z9Nt15S695LdXaNxOp8Q9V6D5ZR/9rx66Spy23bjHwfR+z4968Uqc2nHHZajnWeUT9p8/NZiIt+Zh5Wju/ZZVeOkOMOl1OP5i8ox2Utl21rN/ovu5k2vg/czX3W2lctpLLyx+TpdH7VGtDrCrHzT/h3rxPNpjP5TTOXhksXXdGvDpKLW8ZrxjJPvRsbhctpbi1pOpZXtGMLuEd61DmXaUJ9yqQk+rTfj8n4N057T0XO8eti/Wv8AZZ3pro58sn1augkmv9H5LR+W9UvF2tCpu6FxFbRqLx+DXiiNm1jyVyVi1Z3iWZek0ma2jmAA7cgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAc6NKpWqwpUoSnUm1GMUt22B34nH3mVyNDH2FCde5rzUKdOK6ts2y0PpjTfBHRVXO6jr0Z5mtBdrU2UpQez2pU14t+LX4Hj4a6MwPBzR9XWmralOWXlSUktt3Q5k9oQW/WUt18Pka/cVNe5XXuoZ5G+nKnawbVrbc28aUf4yfizGyWt6QvOOnLHHWfHyhfpEaWOK3tT08nHidrvL67zsr/ITdO3g2re2i/Zpx/i34smPCvhtj6WMjrjiFVjYacorno0ptqd2+uyST323Xz+8+cJ9B4m1wc+IOvn2OBtuttat7TvJruSXftv9SK8UuIOV1xlees3bYug9rOxh0hRjtt4d76Fn2/yMHKscpmO7yjz+iH2fzMnOZ7vvL08W+JGS11kY0+RWeJtvYtbSHSMYrom/ftsQMAu48dcdYrWNohBe83newADtyAAAAAABaPBrhdV1jCrkL2TpWdPrFPp2nz3XQizZqYaTe88nVKTedoVcDcfRPCDQN9a1IxtLO5UejlCTnt95RnpFcOLbQGobd46o5WF7Fypxf6DW267/AHlPT+k8OfL2UbxKxk0l8dOOeiqzutLW5u6qpWtCpWm/0YRbZ0rqy9MNmsZwg0xj5yxcMhnslSVxNVOipQfct9mWs+WccRFY3mekIcdItPOdoUpeY++s3td2deg/+8g0eY2bwuq4cVtI5+hmdN08f2Nq50bqEd4OaTaS6L2un03NZn7M/PZnGm1FsvFW0bTHXvdZcUU2mJ3iWxnD/gZga2mra81JO5q3tzTVRwp1eSNLdbqPTfd7NFScYNHUtF6reOtbide1q01Voyn9pLdpp/BpovzWVxlNY8JaF9o29r07lwp1lCjPllNR6Sp7+DT8PHZGsWochmclfurnK91Xuqa7PevvzRS8Opn+jMmbNe98l++Y4fBb1tcWOta0r8fFjQZKlgcxVxM8tTx9eVlD7VVR6d+2/nt1XUx8ac5PaMJSfkkbMWieks+YmHZZXNS0uqdzSUHOnLmjzwUo7+9Poy5+FeTvtUUa8rKVCeqadRL1m5Sap2z71ShttFr4FeYDh/qrM0+2oY129v417qaowXzlsSrSGlsZi9Q2lG14j2tpm6snTjG1t3VhHddU578pR1lsd8c1iefu3+e3cs6eL0tEzHL5fJa3ErRUdXWdlRvc/XxlrZSlvCUFUUt9urlKS6rr1fmccNq/S2lNPWmnrbKXWcr2kJU07ek6tSp7Ta+zvFbb7fafcRHO1NCYq+nU1Xqq51Pdwfs0valGL28IQaivm/kc7Dihla9pOjo7QdONtBcqlUklH48sUvxZgU0WTJijHeZtWOfdWPnPrS151OPHebV2i0++0/KOSUw1bqm+qKeM0Ddpfou8vIUF8XF7v7zjTo8SLmpJ9tp7CJLfloUJ15v+H3mAsaPF7MVefI5Sywduuu8KVKpJfJbv7zLV+Fl/neX8r8Qs1fpLpTjbuEfvex7XTY8XL1I+E2+vJxOom87zxT8Yq7qtprymt3ry2S9+Ko/7UjrdPWEv5ziRQh/RxlpH/bPVi/R5wk3/AJ1d5Oove9v9okNn6OOh5Q3rVLpfGu/945n8NT+ePhSpGXJb+Wf+6UYjU1jBbUuJNGb/AGsXZv8A22c4VeI01vT1lj6q9+Jpr+4yY3Xoy6AX2LnIQ/8Ait/xMDkPRj07Hd2upclRXkoqX8TicmknrePjSPs6ic3dWfhaXQ8lxHoLlr2GByW3+jqVKMn++mjnW4gais+mW0JllGK61LavC5SX9TbZHgjwOzeI3/I/EvJUKnhF0Wo/dP8AgYi6wfG7CV3G2y1hl6f/AHrpxf8AbSa+o7PSZo24qT/3US8eanWLR8rJS+IOgM7a1Mdf38KKqrkqW93TnTcl4p8yS+8yf8mtM3mib7T+mq1PG2t4t5VrOSls90917XV9PMrTUWv7uklS11w4XYyXKqkJKcH5tNp/dJGMs7zhTc14XOD1FltI3m+7cY1HT+G27X3k1PR00jfHNqxynutHL3I7ayJna8RPd31n9Xl4yVKukbLHaap3/wCUrmEe3p39WPLcUUpNJKSfjt8dvkVFcVqtxXqV603OrUk5Tk+9t97LY1No2prS9nlMVr/DZ685YwVGcfVZ7LuSi3sQzL8PdZ4qg695p+77FdXUpJVY/WLZu6PJjpSK2tHF393P3TsyNRFr2m0RO3d3osDlOnOD2nCUX5NbGWhpnOTwUs3Gwqeox6uput9t9t9u/bfxLs2rXrKtFZnoknB3QlPWuUuPXLmdvZWii6vIvam5b7RXl3PqTniFwUsrLBXOS07XuXWtqbqO3qPnVSK6y2a7mlu9vcVHpbU2b01c1a2Fu3QnWjy1FyKSkvDdNNGyvCPK5mpw0uMtrKvOSXa1Y1a+yk6KW6392+6Ri+kb6rBljNW8cO8Rw+LS0dcGWk47V58+fg1ROylRrVm1SpVKjX6sWznSpesX0aNPp2lRRj82bN5vUGB4J4fFY2x04shdXVFzr3L2jzNd65mn59xo6nVThmtKV4rT0jp0U8OGL7zadohq9KMovaSaa8Gj4XjxEo6X4g6Eu9bYK1jY5LH7euUVFJtPZbPbZPzTS67Mo4k0+ftq7zG0x1jweZsXZ2233iekgLH4E8PFr3O1YXEpRs7XZ1Wntvvv0+42CrcJeElvyYm6s7dXk17Ld04VJLziubd/Qran0li09+C28z5JMOkvlrxR0abAsfjZwwudAZKnVt607vFXMmqVZx2cJL9CXv8Af4lcFzDmpmpF6TvEoMmO2O01t1AASOAAAAAAMvpXUOT03k43+MruEu6pB9YVI+Ul4mIBzasWja0cnsTMTvC2M3g8TxDxdTP6XhC3zVNJ3ljul2j817+j2a6S7uj762xWQyWBy9O9s6k7W9t5NJuPVPuaaff4ppnLTmbyOn8rSyWMrulXp+a3jNPvjJPo0/Jlo5rE4nijhJ6g07TpWmpLeK9dsebbtvDdNvv6dH49z67OVGZ/Depk5457/Dyny81r+P61eV/r7vNONN5/T/FPS1XG5GhThdKKVe2ctpQkltGpTb67b/Tue676L4h6OyGj8y7S6Tq21Rt21wo7RqLxXukt+qMPichkMHlad7ZVZ213Ql06fVNPvXg0zY7AZTA8VtFVrO+pQhcwSVxR750am3SpBvrs31XzT99G1bei78dOeKesf0+ceS1Fo11eG38SP1axgz2uNLZHSebqY2/jzR+1RrRXs1YeDX8V3pmBNyl63rFqzvEsu1ZrO0gAOngAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPqTb2XebQcEuHmO0Bpqpr7W/Y0Lx0u0tqVX/wBmh+u14yfTZfAwfoz8K7a6pR13qqnGFhQblZUKr5VVaT3nLyiveRH0g+KVxrnNzx1hVccLa1PY277ia6c793kv8TJ1GS2ryTp8U7RHtT9oXcVYw17W8c+6PuwPF/iLk9f5ztq0pUcdQlL1W337t++cvOT2Xw7iR8IOHmMqYWtr7XVT1XTdn1pU333cuqSW3Xbf6/UxXBvQFHUVS41DqGr6npnFrtLutJ7drt+hH3vY8/GHiHX1lkqdnj6bsdPWK7Owso9FGKSXM/NvYmmvTT4OUR1nw8o85R7z/Fyc5np5/wBmO4oa5yOt847qv+YsaK5LS1h0hSgui6LpuREAvUpWlYrWOUILWm07yAA6cgAAAAAAAOVOPPUjHzaRtlxQtlpD0ZbS3sJdlXrwp05zj0fLJ+fyZqrj7etUlO4pcu1slVnvJLomu7fvNtdWU6evuDlhaUKkdriyXYyfhUi94/fFr5mR6Tyxjvim3s8XNf0WOb1vEddlEcFeKl5w6ubtKz9etbpLmpuWzi14oxnF3iFkOIWfhkLqkrehRjy0aCluo+b+LIZOMoTlCaalF7NPwZ34y0q5DI21jR/nLirGnH4t7F/8NhrlnNt63iq9rkmnZ78vB129GvXny0KNSrJeEItv7iweK11HUeGwupqMlGVKgrG7oSe0qVSHu8mWBrydjwk0La4rBUYTyWQ3jK6nH2t47OU3+8kl3ePea/XNxXuripXr1ZVKtSXNOUnu5N+JDp834vbLWNojfbz8eSTNjnBvjmeff5LVv+L9N6HWAx2Jlb13aK2lV50oxW2zaSW/n3vxKlAJ8Gmxaffs423nefejyZr5duOd9kk0XrXPaTrOWLufzE3vO3qLmpyfnt4P3rqWBV41WeRt1TzWkre6e2384mvpKL2+pUFvb17iap0KNSrNvZRhFtv6E407wm1hl4Rqzs6dhRl15rmfLLbz5F7X3FbV4NHv2mbaJ8d9pTYMuoiODHvMeHVKXxosKUIxttN1IqPdB14qKW222yjtt7jhhdda41BeO30PpqysXttKVC2i385NbfcZ+z4f8ONCWiyGsMpDJVn9inLdLfx2pwbb+bR48nrfWGrKMsXw+wdTF4qC5JVYwjGUk18No/IzcePTW37DHy75tvw/Keq5e+bl21+fhG2/9mI1TRo4+cZ8QNR3Gdye29LFWdT2IS8pNdF8jHYXhRqXUNWWSdpSxNtU/OQhv1hD4bmT05i81oO6jnM1iMZTVKXPOtf1OatWXjyJPccQOPGoM3dyjgqUcVa7bLdKc3799uhcic+8UwREx490eURCtPZzHFk+Xf8AGUsw/DDSWnIRvcrXV5FdXOsmkvkd+Z4uaNwdF2OLtXeKPRuiuVfUoipeao1TcqlOvkMnU/V5nJL+BLMBwhzV4lVyt7a42ltu05qc9vk9l82eZMOOnranJu8pa9uWGrK5LjhfOUnicHaWjfjUk5kXueKuu6zfLnq1GL/RpRUdvuJTTwXCTT8nHLZqpl6qfWNOUn90On9o6VxI0biHKGn9D2/+srNLf5NSl/aPaTi/8rDM++NvqTW38+SI/X6IQ9U6yu5dM1l6rf6taf8AAdtrar17bPS/rVSZ1+OOpUnGxsMfZx8oKUvxZ43xt19vvC/tYf8AysH+KJd9T3Yqx8f/APlxth77z8v7sBRzfECw2dPI6go7f95UMrb8WuJtilGWpchJLuVeKn/eRkqHHniJSa3v7Sa8vVYL8EZmj6QubnT5MlpzC3y22bnS7zm1c1vbw1n4/vDqJxx7OSY+H92LsuPmvqT/AM7r2N7HyqW6j98NiT2PpCwrU1TyuAnGXjO3rppfKS3+8w1DiPw0zFVrU3DO2pcz61bK5nFr5bo77nTnA7UVNLB6pvcBcNdKd5TlNOXl16JfMqZdHo7fxcEx7o//ABT49TqK+xk39/8AdM7DiBo/NycaOWo06lR7dlcJ0pPfwbl0f1PBqPhnpfO/5zRouwqTXMq1qkoy97j9l/LYgWb4G6xtaPrGJdlm7fwlZ14uT+C36/Ih2MzmqtIXtS3t7m7x9WMtqlvVj7La8HCS2ZBi9GVrvbQ5pjy6p76+bbV1WPdntQ8K9S4yo6mPhDKUFts6D5an7j6v5bmZ0zTvLhRtNN6hv9PZiKXaY2/qPs60l+o5fgzK6U4vWN3KNvqGh6jPbbt6Sc6cn74/aj8Vv8C3bbh1pPX+Flfflr8pU6s3O2qUmv8AN0+ijHbZ9/n18zq+u1GH1NXXbzjnH7fRzGmw39bT238p5SonN611hiLpW2tdPWV82vYlcW8VuvOMlvF/HZmXocZcVOhy3GIuqba5ZRTjOPLttt4dNum2xMdUYHWmgqDpZOl/K7Ta6Or2SlXpRS2W6aaml/8ATRCLvRWidX0XcaSv4WVxFbzow3a38nTm+ePxTkhP4PLWLZK+r4132+MdzqsZ6zMY7c/Cdt/hPe8mM4g6Gw9V18bpKSreE+WMZL4Sbk18iNa/4j5vVtJWdXltLCMubsKcm+d+Dm39r8Dz53h5qfFQnVdkrujBbynbS52l5uP2l80ROcZQe0ouL8mtjT02m0szGXHPFPjvuoZsuePUvG3ltsQlKE4zi9pRe6fvLSyfF2tldFzwmTxcbi5nS7OVVtcj2Wylttun8H3lWAtZdPjzTWbxvMc4QY818e/DPVYGkq9XC8MdRV61JyWYVO2tYrru03zS29y3IA009mmn7zKaZzt9gcrb39pUb7KW7pye8ZLxTRsLmdP6a4maNp5a0oRt7upTboV1FKpCS39iSX2lutnv17n7inqNVGjvFr19W09fCekbrGLBOortWecR0VJwa4kXXDzJ3NaFqrq2uopVae+zTXc0zGcTdaXWs9Y1NQOk7SXLGNKEZdYKPd18yKzi4TlB98XszlbUZ3FxToUk5TqSUYpebLkYMcZJy7c571ftLzXg35NrNV3U9YejE8tfyU7mdkq0pf8AeU57b/Plf1NTzbfW9rbYXg09DWUoUrqFgqfPXqckJSlUTa3837ey9xqVVhKnUlTltzRbT2fijM9DWiaZOHpxTt7l30jExanF12hxABss4AAAAAAAAPfgMvf4PKUsjjqzpV6e/vUk+jTXimvA8APLVi0bT0exMxO8Lb1NjcfxJwk9UaeoRo5yhFev2afWpsu9eb2W6fj3Pqt5VzpjO5HTWapZPHVOzr0m1KMlvGce5xkvFHLSeocjprMU8ljqiU4+zUhLrGpDxjJeRPOIOn8bqfBfy80rFJS65GzX2qc/0pJfjt3rqvFKhERp57K/Ok8o8vKft8lqZ7X8yvtR1/f91l/8BcWdCygmqVRNbNrmqWlbb700vmveumuGfxN7g8vcYvIUuzuKEtpJPdNbbpp+Ka2e5k9Aarv9I52GQtG50ZezcUN9lVh5e5rvT8y9OIum8ZxI0bbZ3CVISvoUue1qbbc8fGlPye+6Xk1t3Pco0mfRmWKT/CtPL/lnw9y1fbXY+KP4kdfOGtIOVSE6dSVOpFxnF7Si1s0zibzKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACzeA/DK413mZXd45UMLZSTuau32312iuq79iGaJ05f6s1NZ4LGxTr3M9k30UV4t/I2e4q6gx/BzhjY6R0/KP5SrU5QpTXfu/t1pfN7L3/Aztdqb12w4fbt+keK1p8VZ/Mv7MIR6SPE6lOlPQempRp2VGMaV3Kk+kVHbajH4bLd+Pd5lZ8I9BXeu9Qu1VX1bHW0e1vbp7bUoLr4vvexH9MYTJao1Db4jHU3XvLuey3fzbbLa4s5rG8P8ASq4XaVrc1y9p5m9j0dSb68n3/geVxxpqRp8PtT3/AFmXtrzmtOTJ0j/NoR/jPr21yrpaT0ovVdL45KnThBbesTXfUl5lYAF7Firirw1Vr2m07yAAkcgAAAAAAAAAAF8+jpql18VX0xc1Fz2zda23ffB96XwfX5soYkOjcZqeeQpZHT9ncTrUJbqcI9Pg9+9FPX6euowWpadvPzWdJmthyxeqwOOOhakL2rqTE0XOFR73dKC+y9v5xLyfil3MqnEXtXGZW1yFD+dtq0asfinubY6YuMrmcPWubnA17W7ox2nTqNuKk10lFrvhv3+K38SrNX6U0nf5KX5Wq1tKZKfWTlS5ravLzi1tH4/Z+Bl+jtfaKzgzxvNfDny90Lut0td4y4p6+PJJtUWmI4v6UtbnFX6p39r7UYS6ulJpKUZx79nsvaXT69KjloXWOn8xRrV9O1ruNCop/m49rTqJde+O/QkkODutLasrvTWSsb+mknG4tbxU+/3tr8TNWukeOipqMspVpxXdzZCnJ/c2SYcmLSxOPHlrw+E9YcZKZM88dqTxeMd6R4HA4DVuOq32S0j+THR6VI3dDsvmpRS3X0I7kpcGMbW5JRtatSL2lGhTq1Wn8/Z+85ZHh3qKpa9vrjX/AKvaR61IyquX95pM5YRcOcReU7DSGlrzW2Y22VWfMqUZefdt93zKtcFJmZpktMeFZnaPfaVi2W8REWpWJ8ZiN5+EMrprUuVydFx0PomFvZwTU729lC3oQXm+VLf6s8Tjkc7kKmPhlbjVmQT5alK1/wA3xts/OU1/ObfwJtYcNNc65jF67z0MNjU01irBR5UvJuL2JPqHUHDLhBhKWPs4wp3MesaFvLmqTfnL6+JHW+Gt9sFeK0+G8/O0/ZzbtJrvknavny+UQgml+C+HxcvyhqGushXT3arbxoQ+HXd7Hi4gcYLHS8Z4nSroXlfZqUoxXZUvh06sq7ibxV1BrS4nRdR2WO39i2pPbf4vxGjuHNa9tvytqG4WPsYrtHCUlGpKO2+7b6RT9/V+CZoRpto7TV238lXtN/UwR8UcuK2pdbZmVWrOvf3U+9t7QgvwiiU0NF4PT9tG91XkYTm47xt4NqLfl09qXySXvOzNa8xuHtpYrR9lShRjunXlD2G9urUX1k+/2pfJIrq/vLq/up3V5XqV603vKc5btlytc2Xl7Ff1/simcWL/AJrfp/dYF9xIpWVGNrpvGUqFKEdlOrFJb+ahHp+85ELzOezGYqKeRyFevy/Zi5bRj8IrojGAnxabFinesc/HvRZM+TJytPIABOiAAAAAAAAZfTupc9p659Yw2VurOpts+zn0fxXcyxLDi9bZqhCw4h6ds83QXT1mnBU60ff02+7YqQEGXS4ss72jn49J+aSma9OUTyW9mOGGF1HYzzHDbLwvKW28sfWltUg/Fczf4pfFkJwGe1dw71BKVnVucbeUny1aFSPsy9zi+jMFi8jf4u8heY67rWtxB7xqUpOLRaeN4hae1hZ0cNxFx0OeK5aOTorllTfm0lv5ea7+hXtXLirtb16/r/f6ponHknePVt+n9lycI+O2G1VGOM1KqWNyTW0W5Ps63we3R+5no4m8DtP6iuHlcTOOJyEvac6Ud6VR+HMk19Ua1a44f5HT6d9ZVY5LFyXPC4pbNqL7nJL8VuiQ8KuNeoNIKGPyUp5XEbpdlUn7dNfsyf4MzL+j5rvn0Ftt+7uXK6qJjs9THxSq809qvTzhayyssdcpNQpZFqrZ1tvClWfWD/ZezMLqPMXGN5aGt9HOKqfYuKXLWpSXnFvd/wBovnCas0fxBw1ShaV7e/pVI/n7WvFKpBftRfw70RLLaGzOEVSpo/Jxu7Rr28Pk/wA5Ra3+zGT6x+HcU6avHa/DqK8N/jX9YWuyyRXfFbevwn9JVHGfCi7g1y0KDX60a8JP6No4VcRwxlSk7e6r3NdxfZ0LWVSc5y26bJrz82erMYzhzlLqdrf2d/ovLLpOlUTlRcvdv06/FHmfCPO2/Z5HA5y0uYp70qtOTi/3lvH7zSjsse03y2r755fP+6pPHk5Vx1n3Rz+X9kVxOgtR5C6jB2FSxoye6qXfsbR+D6v5IuqnlsPw50lQtp3O8aNNqjB7c9eW7b6Lzk+r7kvMgtXRnFerHlllasoe6/6fifLHg3qG/r9tmMxQpeMm3KpPbxe72X1ZxqsmDUzHa5o4Y57R3vcFMuCJ4Mc8U989yqpude4lJRblUk3sl4tl6cHeHFLEqnqXU9JO4j7VtZPvW/dKez6fA5aUw+kcHlaUNP21bM3ye0rttOFHo/0tnGL+HM/gSXX11qWnjZ0dN4+Ve5rRaVaVeCdFd27Ta9rv26dO/vOdfr8mSYw4vVieszO3J1o9JSsTlyc9u6OaqeO+qHm9Q+pQue39Xm516ie6dV9OXfxUUkvjuVsZHM4XL4mollLC4tpS6p1I9JfPuMcbWmxUw4q0p0hmZslsl5tbrIACdEAAAAAAAAAAASPQGq7zSmZV1RXbWtT2Lmg30qR/xW/RkcBxkx1yVmto3iXVbTSeKOqw+KOlbCnb0tWaZkquGvNpTjH/AKib92/RN79PB9PJvhwe13U0xkvyfe1N8VdTXPzdexn3c693mvFfBHDhNrC3w1zWwecSr4HIp068JrdUm1tzfDu3+vekYviVpC40jnXbc3bWNddpaV001Ug+u3Tputyh2cXidLn5xPSfGP3j+63F5pMZ8XKe+PD+0rH496LjdW71diqcOeME72MNvzkeijVW3Rvqt9u/o/Mo8u7gLrGF3Q/kjlZxclCStZT7qkNnvTlv37LfbzW68iE8YNFT0lqBytoTeLu2520n+g/GDfu36ea2ZFoM18N50maecezPjH9kusx1yVjUYuk9Y8JQcAGuzQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD6k20kt2+5Hwun0YuH9vqDL1tS5iipY3HSSpQmvZq1fD5LvINRqKafHOS/SEmHFbLeKV6ytDhTp7HcHOFt3qzUVLs8zcUe0rRb9unFv2KUf2n038t/czWPW+pMjrDVN1m8hKUq9zPaEE91CK6RgvclsiwPSU4h1dV6nlhrGvzYrHTcd491Wr3N+9LuXw38Tj6PukrCvXvNdak5Y4PBxdXln3VqqT5V8nt82kZ2lpOCltVn9u36eFYWs0xktGHH7Mf5MpHi6dHgpw3llLmNOWss7T5aFKWzdrRfj7nt1+PTwZQlapUrVZVas3Oc3vKTe7bJBxH1Ze601beZ299ntZctKmn0p010jFfIjhf0+KaRNr+1PX9vgrZbxM7V6QAAsogAAAAAAAAAAADI6eweUz9+7HEWk7q4UJVHCO32Ut2+p5MxEby9iN+UJrwI0dYaozt7eZefLjMTbu5uF+tsnsvuPBrTiBnM/kHRsKkrLHUJONtbWy5VGPg+neyWejjcW1ejqjSla5ha3eXs+ytpTe280n0JB6O2Eq6d1PmcNqDDVaWSnCLt6lahvDljvvtLZrr0ZlanURhtkyXjfhiNo8u+YXcOKckVpWdt+sqYt9WaotJvsc5kaT8Uq0iwtEam4oajxlxStLqxylpTnGFWF/Spz3ezaXVbtdGev0odO4nF5PH5Wwp06FxeOca9OEeVS5VFqe3h37fIrTQupbzS+eo39vJuk2o16XhUhv+K70/Bo79TV6aMuKsbzzjeO95G+DNwZLTtHXaU1yHDrW1xlat7Rp2GMlN/zdrcSjFfBLcyeN4TanuuuX1TK3XlCVSq/vcV95kONH5ednQ1dp7OXix7pQjUp0avJGMGly1FFPue+z8n395X+IuOIWprepUs8zfV6VOXJLnvlDZ7b7dZLwKuK+qz4YyRkrXx5dJ8OcrF64ceSacEz8evyWxiOFWkMVL1rUF7c5KMeu91V7KmvilL+Jmq/FvQWjrN2GEhTnyLZUbGnut/fPon95SlHh1qu/uNr26oU9+spVK7qbe/pue/8AkBpbHQUs1rGjCa76cFFfxlL+yQ/hcWWfz805PKOn6O+2yU/h44r7/wC7Kaz496ozFGdphKSw9Ga2lUjPtK0l/S2SXyRCsHo3Umo6qu6kJ06VV8zuLqTTn5tJ+1L5IlFDUvD3Tjc8Liql7dQTUaso77vwfPPfb5RRHtR8RtQZbenQqrHUHDklC3b5pr9qb9p/DfY0MOO2OvBp8fDHjP7dVO9q2niy34p8kkhS0foSHaVZLJZeC3gukpp7eXWFNde980ungQjV2rctqWtH12qqdtTbdK3p9IQ38fOT973ZgW23u2234s+FrFpq0njtPFbxn7eCG+abRw15R4AALKEAAAAAAAAAAAAAAAAAAEm0brXL6an2dCUbize/Nb1eseve4vvi/gS6OD0frxSrYOusPk2t528ktpP+j0+sP3UVWcoTlCanCTjJdU09mirl00WnjpPDbx/eO9PTPMRw2jeP86M7lsDqTSl5C4rUbi1lGX5q5oS3juvKUfwJ9pDjnnsfGNDP26y1GMdo1IyVKqvi0uWXzW/vI1hOJmds6Tt8lGllqDiovt1+cS8ubx+D3RlPWeGOoOV3NvXwlzJPmlHdRT83ypxfyjEq6jHGWvDqcXFHjHP+8J8N5xzxYb7T5/5stqhrbhpr2yp2OXlauo+6jfRdKSfukui+UkRzOcF8fOqr3S2orjHxl1hTlvUivhOLT+5kGu+FbrUPWMDnra/jy8yUorr84OS+uxj7fSvEPCyVSxdeh77e+gvuUt/uKGPS48XLS5+HynnHylbvntk/j4t58Y5T+iYPTnF/Gfm7TNK8gukeavGXT/4iOqON4gVKTlmtOrNV4y3i62Rj2a/+HGXKRXJaz4i4arClkMjcUZyXNDtqVOW6892mXJwZvM3Q0dfa11jmHLHzoSnSozowSVOL25+i33lJcq+J7qZ1Gmp2lopPdG0TEzPhyMU4ctuGJtHvmJiPmqHVmr9fYurTsL6EcMuXmpUqFGMPZ9z69PgzBU9d6vg91n7yX9KSf4nRrfU2R1Xnq2UyFTfdtUqa+zShv0iiRcCMTjMvrmFHKUIXFOnRlUhSmt1KS7t147b7/I1Zpjw4Zvekco3naFCLZMuWK1tPPozeguK1zO+hitYUqF7jrj83OpKkk4b+Mkukl18t/Ij3GfR1LSGqI07KTnjryHbWzb3ceu0o7+Oz8fFbEs44YCwv9Y4nG6csqayldbV6NvBJbPZxnLbpF9/yR5fSRuYLMYTBwrKtWsLNRq7eEpKKS+kU/mVdNak5KXxRwxeJmY+kps9b8Fq5J3msxET9lSA9uYxWSw90rXJ2Va0rOKmoVYOLafczxGtExPOGfMbAAPQAAAAAAAAAAAtbh7krPWGlKmgs1UhC4pp1MdcT23i1u+X5denim/FIqk7bS4rWtzTubepKlWpSU4Ti9nFruZDnw9rXaJ2mOk+EpcWTs7b93e9NzRyGCzMqVTntr20q96ezjJPo0bBYC/seKXD2rY386dK6ilG4UI9adVdY1Ir39X85Igmr7ejr3RlPV9hThHLWEFTyNGPfOK7pJe5Lde7dfokL0Bqa50rqKjkaXNOi/YuKSlt2kH/Fd696M7U4ba3DxV9XJSflMd3ulbw5I02TaedLfrDFZrG3eHylxjb6k6VxQnyzj+DXmmup4zYHjfpq01HpunqjEyhVubWkpudNb+sUH13/AKUd9/PbfyNfi5otVGpxRfpPfHhKvqtPODJw93d7gAFtXAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZfRun73VGpbLBY+KdxdVORNvZJd7b+CNnuMmZsOF3Ci00lhav8AnNSi7a2kntLr1q1X+9svj7jG+i3pOz05o+64gZmMaVW4hL1ec+nZUI788vnt9xRHFfWNzrfWNzl6m8LdPs7Wlv8AYpru+b738TGv/wAbq+D+TH185/sv1n8Ph4v5rfRjNGaev9V6ltMJj4717iezk30jFdXJ/BFh8dM/Y4yysuGum6v/AAXiV/nc4v8An6/e9347Nv5v3Gc0IqfCvhLdayu6cHnc5HsMdRn0lTp9fb2+/wDd8yias5VKkqk23KTbbfi2XKT2+Wbfy16ec98/Dorz+XTbvn6OIALqAAAAAAAAAAAAAAD2Ye6yFpfRni6tanczThF0m1J79NjzUadStVjSpQc5ye0YpdWzYfTOL0/wU09R1BqWjTyGo7ynvb2e6/NeW5X1GeMUbbbzPSPFLixzed99ojvRLRHAfW+bUb26cMNS33VStL2/ikupeuhtI5PTbjb5viDTyVBLaNKtGCcfhJyUkawa64l6t1fdzqZDJ1aVu5bwt6MuSEF5dO8h8qtWT3lUm375MoZ9DqNXXbLeIjwiIn9ZWcWpx4J3pWd/HduZxY4K2vEG4tcjZagdrK3oypQjKKnGW8m9+/zZrFxK4cal0HfujlrVytpPaldU+sJ/4Pr3McP+I+rNGXar4rIVZ22+9S3qtypyXz7vijbrQGs8JxT0VVqXNonCX5m8tantckn/AAfeipa+p9F1iLetjjl4TCeK4dbM7erf6qZ4D3trqXQVzp2/gqitFKhUi39ujNScfo+b7iprK6vtB63ubGt7dOhXdKvDwnDfpJeT2e6ZaOF0/PhvxhtqdncKvgMvUnbUqqfSM091CXk1JJfBmL9KjTsbPOWGoaK9m9g6NX+lBLlfzi19Gd4LY66u2P8AkyxvHv73uXitp63/AJqTt8O5gONVtVdxaZm2uKkrevBUpxjLaKaScZJLolKL/ssrR9erLVxq/lHwqqW6cZ17ek4veXVTpe1F7f0PZXxZVRpaGeGk4561nb4dynq43vF4/mjcABdVQAAAAABntEaRzuscvDGYOyncVH9ue20Ka85PuRsHj+GXDXhbhqeU4iXdPI5GT5qVBSe268Ixi+vh1Kmo1mPDPDPO090dU2PBbJHF3eLXTAaaz2er9jh8TdXtTypw3LExfo+8RLql2t1Z2uPj/wC8XEE/puZnU/pF52pSnaaTxtthbdezGaSlU28Cq89rPVWdnzZXO31z7pVWl9EcROryd0V/Wfs6mMNfGf0WFLgDn4fzuotPQfk7uP8AieetwI1NyuVpl8Debf6K9hv+JVLqVH31JP5nxTmu6cl8ySMef+uPl/dzx4/6f1d2SsrjHX9exu6fZ16E3CpHffZo859bbe7e7PhahCA+xTk1GKbb7kjZTgHwSowt6GptZ2jnUqbStLComuVeE5rz8o/NlbVavHpcfHklNhw2zW4aq54Y8F9T6yhC+rR/JeKkt1c1o7uf9GPe/j3FpZXhjwm0Fi4V9S3Ermo9+Wd1VknUflGnDq/vLB4y8QrHQOm1WjGnO9qp07O1T25munM0u6K/9DTLVOocvqbLVMpmbudzcT8X0UV4JJdEkZGntqvSM9pNuDH3bdZXssYNJHDEcVvPotRZrgrlcgsc9O1bGjUfLG69uKTfc3tNtfRkC4paRno/UjsqdSVayrwVa0qvbeUH3p7eKe6IpHfmW3fv0Ld9IRVY4TRsLnb1mNi1U/cpfx3NCtPw+ala2mYtv1nfpG+6tNu2x2mYiJjboqEAGgqAAA7KNatRkpUqs6cl3OMmi1+FF1fzwuQyWWyFeravaFPtpc8acYe1Oa3felsvmypUm2ku9lsa6301w1scNTW1S5jGjJ7dem1Sp8+aSXwKGviLxXFHW07fDrK3pJ4ZnJ/Si2MoX3ETiHa2PM4QuKvLFLuo0Y7yk/om/ey3fSdy9PD6QxWlLGEKMLnaUqcf0KVNJRj8G/7phfRVw1OV3lM9Wj1pqNtRb9+8ptfJJf1jIX2n7PiNxEvM7mridvgrWorOzpx6O4cXs2n3qLnv3dW37m1n58tJ1sRafUxx+s9FvHjtGmnb2rz+kKb0npDPanrOOKs3OnF7TrTfLTj7t349O5dS19H8JVhb+hk7/NVncUJcyjbRcI7+Tk+v3FlapyeF0Tpd15042tlbLkt7elHaT3+zCK833tv3s1x1nxG1BqKtKMa8sfZ90aFvJx3X7Uu+T+45x6jWekd+y9SnjPOZdXw6bR7dp61vDuheOrrXUVepJaayNLF9rT/P1HbqU5S8913fHl395Rur9Eatw055PIUZ3lLm553VOfPs9++SftR+aRGKWQv6VRVKV7cwkuqaqtMnWj+LGoMRXhDKVHlLT7LVRpVYru6S269PB7os4dJqdJHqTFo920z8UOXUYNRPrxNfjvHyQ7Uedyuocj+UMxdzurnkjT55eEYrZIxhafEvR2OvMR/LLSjpysqkFUuKFNbKKeyc4rw6vaUfDw6FWGjps1MtN6ctuW3h5KWbHbHba3z8QAE6IAAAAAAAAAAAAASnhnqmppbUULice0sq67K6pNbqUH4/Fb7no4q6VjpzOqvZNVMVfLtrWpF7pJpNx+W629zRDi2uHl1S1toi70Hezpwvrem6uOrT9z32+XX5SfkilqPyL9vHTpb3ePw+izh/Nr2U9e73+HxZP0ftVqtbvSl7U9ukpVLLne6lB7ucNn5dZJf0iD8X9Iy0rqWToQax17vVtZfqvpzQ/qt7fDZ+JF7Svf4TMwuKMp217Z1t0+5wnFmxeXtbTihwtp3FtGnC8lBTodd3Srw6OG/gns1/Wi/Ao5/+B1UZo9i/K3lPdK3h/wCKwTin2q8493g1nByqQlTqSpzi4yi2mn4M4m2ywAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJZwm0hca21vY4Wl7NFy7S5qfqUo9ZP6ETNqfR0wVponhbe65yslTqX1GVbm8YUIb7L4ya/Apa/UzgwzNfanlHvlY0uLtckRPSOc+54PSs1hb4rB2uhMO1RVWEXWhT6KnQh0jH+s1v8IrzKg4H6M/llrWjb3MH+TLSLuL2e+yUEui38N3siN6xzt1qbU99mrv8Anbuq5KK7ox7oxXuS2RbeWlHhnwNpYmL7HUOpV2lZxftU6Pl7vZe39ZlfHhnSaauGk+vbv856z8E18kZ805LezH07oQbjXrSWtNaVruiuTH2q9Xs6a6JQj47eG76kGANLHjrjpFK9IU72m9ptIADtyAAAAAAAAAAAAALa9F3AUsnxAeXu4QlaYii7iakk05NNR6ff8iF8TtUXOsNa5DN121GrUaowb+xBdIr6Fmej3XeN4aa8ydNb1o2yjH3fm5/4/cUa+r3KOD19TktPdtEfLefqs5I4cNI8d5+wAC8rNtNAWGirL0eJ39awt7iFWzl63NUuapKp1SXmnvsRv0PrLIW/8orypQqUsfVjTjCc+ick5b/RblT8N+Jme0RRrWllGjc2VeXNUt68d47+7yMjrTjJqjUWIeJpKhjLKf8AOU7VcvP7mzEy6DNauTF1i89ZnpHuaNNTjiaXmOde7xTLROSpax1FqrSbqJqrfyyGNqt/YqQnv0+OyJp6UWJf+TetVcU/VrunOL8lu1/tGtmg85X07q7H5ig/ao1lzLfvi+j+4229JmcLjgxka8PsydGcfg5Rf8StrcM4dbhmOm/68olNpskX0+SJ67NdeB13yXuSsZOPLOnCsov9Jxbi19J/cQHL27tMrdWr76VaUPo2SbhB11vbw32UqNXf5Rcv4GN4hRUda5XZbKVw5fXqa+PaurvHjET9lO/PTVnwmY+7AgAuqgAABntB6XyGsNT2uCx0fzteXtTfdCK72zAm1voVaVpUsLkdVV4/nq8+woN+EVvv95V1uo/D4Zum0+LtckVTLJV9L8COGXZW0YzuGnGmmtql1Wfi/hv8kacaw1HlNVZ64zGWuJVq9aW+zfswXhFLwRYfpUarqah4mXNhSrc9li/zFNJ9Ofb239SpCv6N0vZ07W/O9ucyl1ebjtwV9mOgADSVAAAACS8NNJ3etNX2eDtXyRqS5q9XbpTprrJ/RHN71pWbW6Q9rE2naFo+izw5WYyq1hmKCdhZT2tKc47xr1durfuj0fvexszqPL2eFxNzl8jWjRtraEqlWo/BLw+LfT5nHEWFlhcVbYnGUo0bS1pqnSprwiv4vvNdvS11sq91Q0ZY1d40nGvfOL75Nbwh8k9372vI+M47+ltZEdK/Z9DERodPv3/dTnEHVWQ1jqi6zV/N/nJNUaa+zSpr7MV8iPAH2daxSsVr0h89MzM7ykPDvBT1Hq+wxkU+zlU56zS+zTj1k/oiU+kVmYZLXSsqT9jHUVQey2XO3zSXy3S+RJeHVpR4e8ObzW+Qp055C8goWtGT6xTfsLb3tcz90feUte3Na8vK13cTc61abnOT72292UcU9vqJyR0ryj39/wCy1f8AKwxTvtz+Hc6QAaCoAADMaKso5DVeMtJ/YncR5/6Ke7+5Es48XvbaltbJbpW1BuXX9KUm/wAFExfByiq3ECwTXSMakvpBjjHUc+IWQj4U40oL5UolC08WtiPCsz85W4jbSzPjP0hevo7Wyp8OrBcypKtWqVXPbfbebjv8uVEZqZvH/wCWbTmlrWo6ePxdVwaT6OtyNRT82nt/WbfiSjhDcLHcJrG7ntyULSrWlv3ezKc9vuNYZXty8k8gqslcOr2vOn1Ut99/qZOgw/idRqLW6bzEe/nG7Q1WXscOKseET92zXpJ4O9vVpadvirrI2kL6o7ylQTk3Fqny77d26U+vxO/jZw70XZcNsnksfh7bHXNnSjUo1Ibxe/Mlyvr133+JCsB6ROStcVStstg6d/c047OtCryKfvcdn1+BCeJ/FTPa4pQsq8KdjjYSUlbUm3zNdzlJ9X+B1ptFrK2x459WtJnnE9ee/RFm1GnmL2jnNvLogAAPo2StL0fs6qOYuNO3XLO3voSlTjP7KlGL5o/CUd1t7kQbW2GeA1VkMTzOUKFX83Jrbmg+sX9Gjho6+ljdVYu+j30bqnLr4rdbk49JCy9W15Sud/8AjVnTl+7vD/ZKER2er5dLR+sf2W5nj0/P+Wf0lWIAL6oAAAAAAAAAAAAAB7cFkrnD5e2yVpPlrW81OL8/NHiB5MRMbSRO3NZ/GnFWuQt7HXWIivUsjCMa6XfGaWyb975Wn74t+Jw4Caq/JOfeEupxjaZCS5HJ7KFVJ7fBS+y/k/A7+DeRts1isjoLLSXY3lOU7STXWE0t2l80pL+i14lcZWxusPl69hcxdO5tarhJeTT7zNrhjLjvpMnd093d8l6cs0yV1FO/696wfSA0ysVqOGbtacY2uR351HujWW3N0/aW0vm/IrI2Ns5U+J3CqVKUqav3FRnKX/V3EO6Xf0UvPu9t+RrpVpzpVZU6kXGcG4yT8Gh6Lz2tjnDk9unKftJr8Va37Sns25w4gA01EAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEn4XaWrax1xjsDSfLGtNyrT26RpxXNJ/RF6elzqujY4iw0VjWqcakYzqwh3Qow6Rj82t/kjs9FDTNvhtKZDXGTUIO4UoUJz/Qow3c5fNr7iguI+pq+rtZ5DO190q9TalDf7FOK2ivokY3+71//Lj/APlP7ND+BpvO/wBGZ4G6WjqjXdtC6SWNsU7q8m3slCC32+bR5uMuq/5Ya8vsnSnJ2cGqNrFrbanHounv7/mTNNaA4CqUWqWb1XPb9uFtF/dun/aKaL2L83LOXujlH3/X6K1/UpFPHnP2AAW0AAAAAAAAAAAAAAAAC9fRZuKd1Yap09OUVK8t1KKl/RnB/wB9MpG/tqtne1rSvBwq0ZuE4tdU09iQ8LdUT0jrSyy+8nQUuzuIrxpy6P5rv+RYvpHaDnSvXrnDclfHXyjO4VNb9nJpbT+EunwZmxaMGrmLdL9PfHLb5Lkx2uCJjrX6SprH2V3kLqNrZW9SvWn9mEFu2Si+4Za5s8bLI1tPXXq0Vu5xSlt8kWv6I+kI5OllM7OcVyNUI7ru6Ns2MxF7JVq+KqRTjST+HkytrfS04Ms0rG+3VJp9F2tOK07bvzsfR7MFm+klpmw01xFq08ZTjRt7ukq6px7oS7pbe7dMjXDe30jcZmcNYXVehaOH5t0t+sve13I1KZ63xRliOUxuqWxTXJwSjNNb1Ipd+6NxOPadHgBVpTfVWtqn8eaBr/xF4fQ0tlsRc4y9V/i8lVj6vUXf3p7e/o0bAelLU7Dg/WoR6fnqFN/Df/0MjX5a5s2n4J5TO/ymF7TY5pTLFo7mtfBiHPr+0XlRrf8AlSMdxHXLrnLQX6Fw4/ToZzgVDfXcZ7fYtqv3rb+JHdeVO11pmam++97V/vM0a89Zb/pj6yrW/wBtHvn6MIAC6qgAAG9no1042XAjH1o9/Z1Kn3tmiZuh6I+Y/KnCSeKk+b1StOjJeSl1X3GR6aiZ08T4TC7oP4u3k04ytaVxk7qvNtyqVpybfvbPMe7P2s7HOX1nUTUqNxODTXlJo8JrV6clOeoAD14AAAbfei9ol6Y0VPUN9TUb/LJOCffCkm9l831+Rrlwc0t/K7XthjKiatYS7a5kvCnHq/r3fM3fqT2UYRShSpxUIQXcklskfN//AFBrOCkYK9Z6+5rejNNx27SekMVrLPW2ndNX+cvGuztKMpuLf2n3JfOTS+ZofmMhc5XK3WSvKjqXFzVlVqSfe23ubAelpq3lt7LSFrU61Nrq828l9iP4y+hrqk20km2+5IsegdL2ODtLdbfRH6TzceXgjpD4Wfwi0BSyEHqnU3JbYG1TqJVZcqrbePnyp/XuR7+GvDChCw/lXriUbPE0afaxt6j2dRddnPZ7xW+3Tvf3mE4scRKmp6ixGIg7PA27SpUUuV1du6UkvDyXh8S3kzzqbThwT0628PKPP6IKY64ojJl+EePv8mN4qa2udZZ51lvSsKDcbaj3dPGTXm/uWyIcAXsWOuKkUpG0QrXvN7Ta3UAB25AABPeBC319T91tV/umN4uLbiJll5Th/ciZTgH/ANINJedtV/umM4v/APSNl35zg/rTiZtf/ELf9MfVdn/Zx/1fZbtl/wD00VKiez/J8l0/1kka7GxWGXP6M9df/wCPq/dUk/4FW8M+H9xq3t7+7vaeNw9q1291UaXxS3aXzb27it6NyVxxmtblHHKbW1nJ2UV/phBwWVxc0nozBYyyu9L5qF3Oc3CpT9YjVclt9pbd3wZkPRf0Paax152uUpxq47Hw7WrTl3Tk+kU/dv1NL8XTsZzc9oUuxt2nZ96K4PhlrrNWCvsfp66nbv7M57Q5vhzNbkYydhe4y+q2OQtqttc0pcs6dSO0os/SLMOjSoRp01GEIrZRitkkaw+l9h7R2eKztKjCNyqrt6k0tnKLTaT89mn9TK0fpmc+o7K1donou6j0fGPFx1nfbqozQuOlltYYrHxW/bXME/ct92/oia+klcupr6naSacrWzhGWz7nJuf+0Zn0a9OxpXF/rbIpU7TH0pxoynslJ8r52t/KPT4tFV6rzFfP6jvsxc7dpdVnNpdyXgl8ti/We11czHSkbfGf7K8+pp9p/mn9IYsAF9UAAAAAAAAAAAAAAAAejG3lxj7+hfWtR069CoqkJJ9U09yyOLtpRz+DxuvcdCKhcU40b2Ce7hNdIt/Rx+S8yry0+CV7QzNnktBZOW9tf0p1KD/0c0t5bfuxl/U28Snq/wAvbPH8vX3d/wC6xp/X3xT3/XueDgRqb8iar/J1xUUbPJJUpOXdGot+R+7d+z8JHp9IHTf5M1JDN0I/5tkt3PbuVaKXN+8tpfN+RXd/bXGNyda0rRlTr21Vwkn0alFmxVxSjxK4QKrtTd9Klzx2743FPdbf1uv76KWrn8NqaaiPZt6tvtK3p/z8FsM9a84+8NbAfZJxk4tbNPZnw2WYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHu0/ja+ZzdliraLlWuq0aUV8XseEu70SdNxyGrbzUdxDeli6ajT3XR1aiaX0SbK+qzxgw2yT3JcGOcuSKR3rD9Ie/s9EcHbPSONnyu5hC0pLxdOO0qkvdv0/eNeeE+l56u1zYYjZqg5drcSXhTj1f17vmSL0kdUvUfEa4oUqvPaYxerUtu5yXWb/AHt/oSPhVCGieDef13U5fXr9ep2Kl5N8u/13f9QztNS2m0cf12+srea1c2on+mv0hCuOWqaeqNeXFW09mwsoq0tYrouWHRtLw3e7IIfZNyk5Pvb3Z8NbFjjHSKV6Qo3vN7Tae8AB25AAAPsYylJRim2+5I9uCxN9mslTsMfRdWtU9+yil3yb7kkvFl7aK0dhtJ2FS8na08xlIQ54uq1TpuW69iPN083vLy7inqtbj0+0T7U9IWMGmvm3mOkd6utO8JNYZag7uvZxx1nFbuvcyUVt57GXwvDfSNzf0cdW1wrq8qy5VGwtJVYRfk59yPVm9eW13b07/UeVlmbpt8uLoJxt6GzaSl4Tfd7T3+BHbvitqZzUcZGyxtvHpGjTt4ziv3k19EVbfjcsTwzt+kfrEzPyhNEaem2/P/Pgst8B9OJbLM5GT/WUIfgR3PcCLujCU8Pm6Vxt3QuKbg37lJNr67ETocW9c0fs5Og15Ss6T/2SQYHjfmKPsZrH0byD/Tovs5L5dY/cVOx9LYvWi8W8lntPR9+U1mFc6j09mNPXatsvZVLeb6wk9nGa84yXR/IxRtLZ5HTuvcDKKjTvLSouWtRktpU5eG674yXg10f1RQXEfSNxpLNer8zrWVbeVtWa2bXjGXlJdzRd0HpH8RacWWOG8dYV9XouyiMlJ3rPei4ANRQC9eAfEq2p2cdF6nqQlZ1E6drVrdYpS76ct/B79H4blFBdHuiDU6emopwW/wD0lw5rYbcVW73C7Rb0NXy9DHXXa4y7qKtSoy+1Sl3OO/jHbxJjWuqdCnUrVZQpw2cqk91FJebZrRwR4yUrC2hpvWNaUrPldO3vJdXTTT9mfi14b+B4OOukdQ2NN5nE5q+y2mK21SCd1KqqG/h39Y+TPlcnozJk1M1z32me/blb+7brrKUw8WKu8eG/RFOPGrbXV+v7i+sHzWdCEaFGf6+3fL4N7kC5Zbc3K9vPY+02lOLkt0mt0XfrHV+A19gsFoTSGD9UuJ1KarVZpRSUV1f3Nn0+/wCGrWla+rHf4RDF/i2m0zzn9VgcIMFYZrhppN5WjKrUs5yr28W+ianPbf3bNM9XpVy24VTT8b2l+MiO8UNQUNJ22ndKYmr2U61ehCoov2oUISitn5OTX3Mkfpdfm+F9CKT9q9h/E+bwUvfVY8tp5WtMx7t2zmmtcN8cRziI39+yjvR+gnqDJzf6Nl0+dSJAc8+bN3z797io/wC0ywPR+/5byn/hI/30V7mv+V7z/Xz/ALzPoMX+7ye6Puyr/wC3p75+zyAAvKoAABafo38QYaH1j2d/KX5Mv9qddb9IvwkVYCPLirlpNLdJd0vNLRaF+elloCrj8+9Z4ymqmOv0ncOHdCpsva+Eu8oMvvgpxisaGEei9eRd1i6kezpV6nVRi/0Z+O3k/A+8ROAkpU5ZnQd/RyNlVXPC2c1zJfsy32f4mfg1E6bbDn5bdJ7pWsuGMv5mLn4x3woMGRyuCzOLrOjkcZd2009tqlJox7jJd8X9DTiYnopzEx1fAc4Uas/sUpy+EWyU6M0BqbU1/Qp2uLuIWsppVLipHkhCPi9339PI5vkrSN7TtD2tLWnaIXz6KGl54vSl1qK6hy1spJKhv3qlBtb/ADlv+6W7lbylYY+4v60kqNvSlUqS8oxi2/wOONt7XHWFvZWkI0rahTVKnCPdFJbJfcQzirxMwmhY0La9tKt/c3lOUo29PZLkT75N9F17uj7j4DLa/pDVzMRvvPTyh9RWK6TBtM7fu15p6Q1txN1Jd6hhj3St7yvJ+s13yU4RXRRW/V7LZbJFhWuA4ecIqcb3OXkcvn4LmpUkt5J/sw7o/GX0IXrXjlqvNuVHEuOFtWuXai+aq1/Ta6fLYq2vWq16sqtapOpUk95Sk92z6+unz568OWeGvhHX4z+zCnLix86RxW8Z/ZLOI/EDM61vVK7kreypybpWtN+yt/GX60veyIAGhjxUxVilI2iFS97XnitO8gAO3IAAAAAnnAb/AKR7RedCt/5bPNxs/wCkvKfCj/5MD18A/wDpKs/9TW/8tnm44f8ASflv/g/+TAy4/wDEp/6PuvT/ALKP+r7Ly4X4aOf4B0cWqipO5s61J1HFtR3qT2b267bkc4r4qjprgrRwtjNzp0qtOnKajyue8m5SfxkvwMpp5VIei1OdCo6dSNlUqKUX1TVaUv4HTpDL23E3hvdYu9nCGUpR5K++y9vfeFRLwTcVv5dfMxo48eW2Xf1K5J38vNpRFLY4x/zTTl+zXWtZXlCkqta1r06b7pTptJ/MuL0WNWUcJmshh6taFGd+oToyk9ueUd94b+9P6oyeq+L2BzHDG7wN9YVoZeVH1edFw3gprZcyl4JNb+fgUGm0902mvFG5w31uC+PNXh35f3ZW9dNkrfHbi/zo36qZGtXlzVKhBeJmkrvX1xjcRzuhjbet293Vjs5S2W0YxXm1JtvwTXmVfwWwPEXVVCF3dalyWL0zQ37W5lccspRXfGDfXbzfcj2cX+M1vDHLSmgqtWjaUoulWvt3zTXioN9er33l3vc+fwejMuHUbYr8Vo79uVfOfNq5NdjyYvXrtH1Y/jxrXGW+LhoLTEqatLfaF1Ki/YjyvpSi/Hr1b8WUkfW2222233tnw+q02nrp8fBX/wDc+LEzZZy24pAATogkWkdGZ7VFT/g212oJ7Sr1HywXz8X7luZ3hDoiOpb6V/kU1jbaaUo93bS7+XfwXm/8S69UakwmjMPR9ZcaNNR5La2pRXNNLwjFdEt+9v397MjXekrYskYMFeK8/o0dLoovTtcs7VQXFcCrbvymoZt+Mbeh0+smvwM1Q4G6SnUjTlmMkm+m+0CCZzjPqK5rf8E29tj6S6Lmgqsn8d1y/RGFlxS1tJ7vK037vVKW390rfhvSt+c5YhP23o+nKKTKX1OHHDu9ru0tNc1MVeJ8saeStJ0oye/60tkYvUvA7W+Lqc2PtKeYtnHmVa1qRfTz2b3PFacVcrOnOhmsbYZOhP7UXTUPotnH7idcPtc4+NWH8l8j+RrlRf8AwZe1ZO3qeO0JdeR/0ejfTl8SeZ1uHnM7+/aY+cbTHylWrXT5J2ULWpVKNWVKrCUJxezjJbNHA2h4naOwutbed5GhRsMtyJxuKe/K5bLeEkukkn05l8TWvN4u9w2SrY/IUXRuKT2kn3NeDT8U113Lei9IYtXExX2o6wi1Okvp59bpPe8QALyqAAAe3BZGvicxaZK2k41barGpFp+T7jxA8mImNpInZZ/Hywt6+QxurLBxdrlaEeZpd04xW2/vcWt/emZD0bc+rfK3enaz6Xce2otvulFPnj849f6qOGkf/thwdyen9oyv8T+et92uaUd5TW3y7Rf1olZ6cydfDZ2zylu0qltWjNb9z2fVP5GVGDt9NfTW615fes/Rodr2WeuevSef7pPxr0/+Qdc3LpU1C1vl6zR2XRb/AG4r4SUkQg2I494ujneH9DP2so1HYuNeEor7VGqoKXX3Pk+813JvRmonPpqzbrHKffCLXYYxZpiOk8490gANBUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA2s4Z9nw+9HmpnLimoXNalUvJbrrJyfLTi/7D+bNadHYirntU43D0ftXVxCnv5Jvq/obDelrmI43SGI0xbbRjdVFJx8Y0qMUor5t/cY/pOe2y4tN/VO8+6F/R/l0vm8I2j3y1tt6VzlcrClTUqtzdVtkvGUpMtn0jLi3w1pp3QFlJ9nh7VTr9e+pNJ/4v+sYv0aMNHJcTLe/rx/zXF0p3dWbXSLUXyt/PYhvEDOz1LrLKZuceX1qu5Rjv9mK6JfRIuW/M1MV7qxv8Z5R+m6vHq4pnvn7MEAC4gAAAOVOEqk4whFylJ7JLxZxJ1wawsMjn6mQrQUqdjFSin3Oo3tH6dZfIiz5a4cc5LdISYsc5LxSO9YWgNP09OYZU5Qg7qslO4qeLe2+yf6sd/m9/cQniRrupeVJ4nEVHC3jvGtWi+s33NR8l7/EkvFjOvEYNWVvPlurxOC2fWMO6Uv8AZX9Yg/Cjh9l9fZz1Owg40KXtV6rXSK8viYuhxVtE6zUfDyamsycG2mw/FD3SqqkqzpzVNvZSa6N/E4Et4mY3P4rLRs8vj6mPtoOStKLW0VDfvREjcpbjrFmTaOGdgEm4c6Nyets8sXjkoqMXOtVfdTj5lo6t9HTJ4nEVLqyy1K4uacJT7CaUXNJb9Ovf7iHLrMOG8UvbaZSUwZL14qxyU9pPPXunM1RyVnLrB7VKbfs1IPviy79fU7bVvDyrc2sOeXZK6t3t1TiuZ9f6Kkn70jXtpptPvXQvvhmqj4cWvbbuDpTS3/V56n/qZ/pWkUnHnr1iY+S76PtN4vinpMKDB9fezvurG7taFvXuLedOlcQ56M2uk1vtujZ3Zjzn1JvuW5nNEaYyOrM7SxeOptym/bnt0gvNmy9fRuguDOmIZnUNnG/v5+zSjLdynPyRU1GrrhmK7b2nuhNiwWyRNukQ1PVCu1uqNRr+iye8K+JOQ0dXlZX1KV/hq6ca1rU68qfe479xM8j6RN3Uk1ZaPxFCn4Ka5n+BjLzippTUMey1RoW13/0tpPla9+xFe2XLXhyYuXvhLSKUtvS/P3MFxE0LbUMctW6Qqu+05cPfp9u2l4xkn17z0ejbDfiNGrvs6drU2+e0f4ks0tShglXy2hbv8v6auFtkcXV/nacduvsvruuvU+8N8LYYrjBa3WHqueFy9pXdq9+sJKPNKnLyaaKufPM6bJSZ35Tt49Okx4/VPixxGal45c493vjyVVqjO183r+tmK0mnK8i4Lf7EYySivkkjZz0rpescIadVddrmjJv4pmrNtgr++jl722jHs8a+evzS2aXNt0NkeMdx+WOClaEXzTpW1Csl8ORv7pM511q482n27p2+hpotfHlny3U96P8AUjHP5Km++dn0+U4kI1XRdvqbJ0X3wuqi/tMlHA6bWuI0l/1ltU/s7S/2TGcVqCoa/wAoktlUqRq/vxUv4l2k7a20eNY+qG0b6Ws+Eyi4AL6mAAAAABINKaz1Lpeo5YXK17eMtuam3zQl8YvoR8HNq1tG1o3exaazvC3rfjzn+y5L3EY+4k++Scob/Lfb7jrnxko1OtXReIqS85Rg/wAYFSgqR6O00TvFNvdvCz+Nzz1tutefGzKQTVpp7E28fKKkvwaRb/AvUGf1RhLrMZm2tqVu6qp2nZQa35U+dttvdbuKNUsVY3GSyVvj7Sm6le4qRp04rxbexvBpLB22m9MWGFt9nC1oxg2l9qXe385NsxfTePT6fFFa1jit9IaPou+bNl3tadoZCtWVOEqkpbQim25PpGKW7bNMeK+pf5Va5v8AKQb9XUlRt0/9HHon8+/5mwPpG6rWA0Y8ZbVEr3JOVGOz6xh055fNNR+bNUzv/wCntJwUnPbrbp7nPpbUcVoxR3AAPpGMAAAAAAAAAACwvR8hzcSbaW3SFvWb+cGv4nl46tPihldvCNBf/owJD6M9tGeqMjdy76Npyr4ymkRHi5XVxxJzk4vmUbp09/PlSj/Ay6Rv6RtPhWI/VetO2jrH/NP0Xlhoul6LFVPveMrffOT/AIlRcAcg7LiNa0Hu6d5TqUZLfvfK5R/tRRZGWv61nwKrY59IQxkFy/0uzX4zK24L4jILi1iLSraVKVanKVaUKkdmoqm5b/Qo6StbafUcXSZss6jeubDt3RVieLNCnb8R85TpQUIetykopbJb9f4kx4WcO8XGxo6y4g1/UNOx3lSg/tXL8kk90t9jz2Npjc/rLO641JCf5Bt72T5Id9eTe0Ka+iM7qm3r6mpWuodc5COntNUly47HU/arSh4bQXXy6s0L5LcFccTty2me/p0jzU4rHFN9t/D+6McUuKuX1ZtisdJ43A0FyUbWj7CnFdzlt3lcbPyZYlDXGlMRzQweiLWfXpWvarqT+ncZzCcZMTRap5bQGJvKPjyNwaJqzbFXbHj5e+HFtrzva6ngbVVeEGg+J2jo6i0HJYu5mm+xbbSn4we/cay6iw2R0/mbjEZW3lb3dvLlqQkd6fVY88zWOUx1jvcZMNse0z0ljwclCbg5qEnFd726I+Lo0WUTY3TXYaV0JQlWa7O1tu1quPRt7c0vm5SUfoUHqbNXufzNfJ31RyqVX7Md+kIroor3JFx8TblvhrUlR3Ua0KT3XjByi/4IpPGWVzkchQsbOm6txXmoU4rxbMX0Rija+e3tTMtP0jknemKOkRDzA2Ix3otZ+viO3uM5a0b1rfsVHePw33KV1xpPM6OzlTEZq2dGtHrGX6M15pmlh1eHNM1pbeYUb4b0je0MCZBYbJ/kqOVjaVHZt7Kquq3MeTDhTkMtS1VbYzHx9YpX0uyrW0+sKkX37olyWmtd47nFYiZ2lnuFfESpjJ08Pm6rnZy9mjcSbbpP9WXnH8PuJ/xG0rR1XiuWChC/oRcras9ku7fkcvGMvB+D+LIV6RXDOWhc9TvLGDeLvEnHbupz26xMpwS1RLI2U8He1N7q1inQl+lUprw97j0+T9x8/rMMbRrtL1jr5tfSZd99Ln6T0UtWpzo1p0qsXGcJOMovvTRwLG46YCGOztDLUIKNK/i+0S7lVjtu/mnGXxbK5N3T5q58VcleksrNjnFeaT3AAJkYAAJnwYzccJr+wq1ZqNvcN29XmfspSWyb+Etn8jH8SsG9O61yOMUWqUanaUd/GnJc0fuZHYycZKUXs090WlxgX5e0jpnWdNRc69v6tdNd6nFvZv4tT+hUv+Xnrb+rl8Y5x91ivr4Zr4c/tP2Tbgvc2up+F9fT9z1dvGdpW3XdCfM4S+K3f7qNfslaVrDIXFjcRcK1vVlTmn4NPZlj+jlmvUNbSxlWajRyFJx6/rwTlH5tcy+Z0+kThvybr+pfU4rscjSjXTX669mf3rf5lHSx+H12TF3X9aPf3rWee20tMnfXl8O5WwANlmgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC6/RJwnrWsb3PVF7GOt+SG63/ADlTdf3VIjfpG5yOa4p5BU5b0bFRtY+1uuaK9tr+s2W76P8AbUdMcH62oLhbesKte1N/GFNSjFf2ZfU1lvK9XI5SrcVG5Vbms5yfm5Pf+JjaT8/XZcs9K7Vj7tHP+XpcdPHmuDQ6/kn6PWodQtpXebqxtLfwaim4t/Brn+hSpdnpEqlp7S2ktEWsly2lu69ZJ9XJ9Ov9bnfzKTLuinjrOX+qd/h0hW1McNop4R/+wAFxXAAALt4KWXYaQncxft3NeUn8FtCP3uRSRsbwlt40+ENO+a60aFxWT8nGVRr8DI9N2mNPFY75iGj6LiO24p7omVKcRMpHL6tvK9Jp0acuxpbeKj03+b3fzNo+FnqXCbgFLUF9tTvrun27i+9yl9mP4fU1DsY9tkqEH1560U/mzYX0mMhWzOW0roTHScYuMXOKfi9ox3+CTZ5rccT2WmjlXv8AdWHOnvPr5p6/eUBp6e4kcZL281J2LuoU20p1JKEIr9WJW+SsrnHX9exu6fZ16E3CpHyaNlOM3Eajw+wNtoLRSp29aFBRrVod9NNf3n1ZrPcVqtxXnXrVJVKk25SlJ7tvzLOgy5MtOOaxFP5Y79kOppWltt97d7ZP0KqtrCjn1uvWeam9vHk2f8TI8buKstKaoucVDFVbm4nRVSnVnVUaa3XTptu9via9cPtX5TRWoKeXxcouSTjVpS+zUi+9MurL8UeFutLGlU1ViJwuaSfLTq0ZTcfhOm02vc9jM1uin8X216Tek90dYld02pjsOzrbht+kqK0rgshqnUNLGY+nzVq8nKT2e0F3tsuriBXoaF0RVxFPendKm7OjBtcyly8sn9JSk/fJGHp8StEaU556JwdVXEv02nSXTu3lJyk11fToir9Y6myuqsxPJ5WqpVH0jCPSMFvvsv4vvZctiyazLW144aV57T1mUNclNNS0Vne08vcwpbXBvWWmHZLSHECzo3OGc+e2rVVL8xLybj1SfuKlBo5sNc1OGf06wpY8k47bw3l0flOE+kbGVXAZLC4+hU6zlTr7uXxbbZQ/pQcTMTre7ssbhJzr21lOUpV30jNvp0XkUkZzR+lczqrIep4m1dRr+cqSe0IL3t/gZuD0Zi0t5z3vMz4zK1k1V81ezrXb3MGC9sdwNwVHljmNYwjW8YUowiv7Ut/uO/Pej7Qlauvp/PynNLdU7imuWX9ZPpv71sS/6vpOKI4uvlOzz/T8+2/D9FJ6dzeSwGUpZLF3MqFxT7mu5rxTXijY3hnlsTqy3hqHHUYW+Zs6yq3tlH7Mm04SqQXvia0X1pcWN5Ws7ulKjXozcKkJLZxaMxoPU17pPUdvlbKbXK+WrDwnB96ZJrNLGopM16/XycafPOK209Fl6sxn8mM/r+1cdre+sFXoPw9qae31bJFo66lltAWlpWalC4snby398eXf6oyXpAULPIcKaOqbOSm7qFOCkv1HNPb6kT4PXvrOjaNBz3dtUnSa8k5br/zH9DF1XFk0sZe+to/SNmppdq55x90x991ccMa7x3EPHqo+RurO3lv02c4yh+LMpxztpQ1fTvGvZubaLT83FuH+yjE66oSw3EK6qUkoJXEbmnyvoubaf3N7fImnHOlSvcLjMrbRbhCo/aXVdnUjFw/uy+pqWtH4rFl/qiY+6hFZ7DJjn+Wd/sqIAGoogAAAAAAAABktMYW91DnbXEY+nz17iaiuuyivGTfgkup5MxWN5exG/Jb/AKK+kZ3eZr6tuobULROja80ekpyi1KS/op/Vo2Mu61OhQqV60lTp0489Sc3tFJLdt+5JHg0ng7LTen7PDY+Kjb21NQ7usm+rk/e22ym/Sf11K2oR0fjLjapWip30ovrGHeofF9792x8Pkm3pbW7V6fZ9NTh0Om3nr91R8WdXVNZawuMkt42lP8zawfhTT737292/iREA+2x4646RSvSHzV7Te02nrIADtyAAAAAAAAAAC8fRotY0sZmL+q+WNSrTpqT7kopt/wB5FQVu0y2pZuO8ql3dvb3uU/8A1Lk01V/IHAitdwaVWpbVaje3XmqS5I/c4srfhJZK81xaTm9oW6lWb239pL2f7TiYumyR2mo1HhO3/bDTz09TDh+PzlavEupCnoi/t4LaFaNOlBf/ABqe33RMreY2eJ1vrnP0YqassbRsqEvKrUhHbb3rovmQzjVfyt7Cwt4STda6jNrx9iKf41PuNhNTVcJpfhxV1FlqUG7tRu6qffUq8q5Y+/8AR+hm4uLFgpy3m0zH6x+y5ntF8lo7q7fSf3UTnLa24XYywrZOdO7zNOipWOOfWnSqS6yrzXc316IpzUGayefydXJZa7nc3NV7ylL8EvA9GsNQ5LVGfuMxlKzq16z+UUu5L5GNs7aveXVK1tqUqtarJRhCK3bbPo9Ph7OvFfnbvli5L8U7V6OkF72PBTB4nHK91VnJLaHNWUJKlSpvy53vv9DEVdAcPcvX9XwGreyrbNqMpxq7vy2fK38tyvHpXT234d5iO+Inb5p50GaIjfaJ8N43ZT0X+KuN0XUusFnp9jYXU+0hcPrGnPbbZryZcGv73gbq6mr/AFRlMZcSpx/N1qVxKNTZfo7RfX5o1I1fpbLaXvvV8jRXZyb7KtDrCol5eT9z6owRxfQYs+SNRjvMTPhPV7XU3xV7K9d/esbi1q3TV/GGA0Pi1j8HRnzuUt3OvLbbd79diuQDRx44x14YU7Wm07yvLh1Ts9XcPVgrm4jTnGjOjUk31i4vmg/7v7rK3oUs1w61xZ31e2/P2NdVaTa9irFPwfvX0MfpHUmR0zkfXLCUJJ7c9Kot4T27t/f7yztKcX8XVjKlq7EKu+bdVKdGNSDX7UJeO2y338DPnDl003mleKtp327+a92tM8Vi88M1jbdsRwY4r4/iHK8haY25svVFFydZpqTfgmvgVj6cdSzqWunui9bU6iXnybR/idVDjrojTuJnR09jas5d8aFG1VvFvzcv/QofiJrTMa4z0srl6kU0uWjRh9ilDyX+PiUtDo7xqO1ik0rHSJ6pdTnr2XBxcUsdpTCXOotQWmGtJ06da5nyRlUltFe9suXM8D9Z6BdtqjTmStsrcWb7WUKcOWUEu97N+0vgURTnOnUjUpzlCcXupRezRsn6N/E/J5erV0vnruV1VhS5rSrPrKUUusW/HZdU34Ivekb58VO0x7TWOsT3wr6SuK9uC/KZ6SnmQu7Ti/6P95KjTiryNJ1FF99OtDq19z+pqRovKTwWq7G/6qNKry1UntvCXsyX0bNl+ENahpTinrHR1OptY3MIX1vDv5VJLmj9J/cauZ2KpZy+hHujc1Ev3mQej4rM5MUezO0x7rQ71W8cOTv6T74Xvx1sY3PD+pc8qbta9KcWvLdxf150a9Gy2slG99H66vZR3lUsLeo3+12lJt/ia0nvoTeuC1J/ltMO/Se05Yt4xEgANhmgAAFp8O3LUPC/UOl91Ktbr1q3T/ef3w2/rFWE74F5J2HESzpNKVO8jK3lGT6Ntezv/WSKutrM4ZmOsc4+HNPprbZIiek8vnyRHB31TF5mzyFJtTtq0ai29z3L29ISyhl9D2ebt2pRs6kaie3V06qS3+vJ9SldbYmWD1ZksW+qoV5KD84vrF/RovjRFP8AljwWWMk+arK1ladHu+0g/Y/CmZ/pKYpfDqo6RP6SuaKs3rkwT3x+sNbgfWmm01s10Z8NpmAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHKlCVSrCnH7U5KK+LOJLuDmIjnOJOGsakOekq/bVF+zTTm/7pxkvGOk3nudUrNrRWO9ffGPsdG8CoYKlJKpUpUbGKT8ekptfuy+pQ/BbCxz/EvD2NRb0o1XXqrf9GmnN/gWd6XeUhOWCxMJLmiqlxNJ+e0V+EjB+jVTt8c9SatuUuXF2e1Nv9aSlL71Db5mFopti9HWy/zW3n4zO0NPU7X1cU7q7R8I5ojxvzkM/wATcve0pc1GnUVvSfnGmlHf5tN/MhRzr1HWr1Ksu+cnJ/NnA3MWOMdIpHdDMvab2m094ACRyAAAbK8GUrzgXd0IveUaV3RSXfu4ya/vGtRsB6KF/GtZZvDVHvyOFxGO/fFpxl/smX6Xrvp+L+mYle9HW2zcPjEwoW0qdje0an6lSMvoy8s9P1n0gsJdt/m61lz0ZeHSlNJ/VFL6kx9XFagyGNqpxnbXE6b390miy6GU7fA6P1hKXPVxVx6je9d3ydFF7eWz+871mPtIi0d8THzj+znT34N4numJ+Uq01He1sjnr69uJOVStXnKTfxZkuH+j8xrXPU8Th6DnNtOpPwpx82dGu8a8Tq/J2L+zC4lKD84y9pfc0bTehtp2GH0XX1FVj/nGTn7DfhCLaX1Z1rNXXTabtI8tnODBObLwz8VMcaOElDhzh7WvVyzubqvPbs+XYqUuf0vdRTzHFGpj4zbo46jCmlv+k4pyKq07hMjn8irDGUHWrOEptb7JJLdtvw7iTSXtOCL5Z5zzR5qx2k1pDGhLd7I+yTjJxfensyxvR603a6h13Gd/SjVtrGn28oS7pS32jv8ANp/Imz5q4cc5LdIcY8c5LxSOsvulODOsM5bRuq1GljaE0pQdy/akvPlW72MjmeA2rrOlKdnXsr9pb8kJuDfw5tkyz+PfEbJaMhZ2OHpR9cvFKr29WHNGEU9ttn0ct/MpV8YeIDrdo81F9d+X1Wly/TlMjT5vSGprGWvDFZ7paOXHpMMzjtvMwilDBZOpqKngZ2tSlfyqqk6U1s4ssHiPqZ6ZsKWg9NVlQo2kOW+uKa2nWqv7S37/AI/+hmOGObWtuJkc3kbOhRu7Sz2k6fdUbahzbeaUinctcVbvKXV1WlzVKtWU5P3tl2szny8OSPZiJ285/bZVtHZY+Kk9Zn5Q87nNvdzk35tmwPoyWuorezur+7uqkcPWjtQoVHvzTT+2vJd695r6013p9SZ4bibqrEadhhLG6pU6VOLjTqumnOEd99k308X17x6RwZNRgnHj25+JpMtMWTjvvy8Hp4/XFtc8UspUtpRlGMaUJuPdzxpxUvvRHqmBdTSENQWlR1IU63Y3cPGk39l/BmFq1J1akqlSTnOT3lJvq2XBwHxEMxojWlnXW9KrRpxXT9JRqSW3zSOr2jR6evPlXaPs8rE6jLPjO8/dy0XnXl+AmptMVnvUsVCvR3/V5t2YLgbkezyl3ipPpXgqsV58u6kv3W38iFYjLXWJhe0bd+zdUXQqLzW5803kamIztpkKa3dGonKL/Si+jXzTZzl0kWx5KR/Nz+Oz3Hn4b0t4J7x3xyhc47J04pKcZ0J7d/R80W/lLb5GT0z/APaThbVxsOSVf1eVv16vtKclOn9VtFEg4hY5ZzRl3Gk1UnCCuLfl8ZR9r74yl9xXHBvMepagljakoxp3q2hzdyqxT5fqnKPzM7TWnPoomPaxz9F7NWMWqnf2bx9UFa2ezBJeJGGWG1PWhShy21wu2o7b7JP7UVv5S5l8iNG7jvGSsWjpLJtWazMSE+4d8Ls9q2ELxpWGNb/4xUW7n/Rj3v49x4OEmnrfUmsre1vv+JUYyrXHXbeMV0W/veyMxxQ4lX2cuamJwtadnhKPsU4UvYdVLxfkvJFbPky2t2WHlPfM93902KmOK8eTp3R4rFoaI4QadUYZfJW11WXe7m773/Rg1t8zL4//ACLc6oW/8m5N93Ol+Mv8TV1tt7t7nwp29FWvO981vnssxr615Vx1bkUNA8PMnT7SngMTcUn05qCW370JGEzfAfRWQptWUbvF1X3So1XOK/qz6/eav4vK5LF3EbjG39zaVYvdSpVHF/cWto7j9qTG8lDUFtSzFultzralWS/pJbN/FFPJ6M12D1sGaZ8pT01mly8suPb3PJqzgRq/Et1cU6GZof8AdS5Ki/qS7/luWzwC4cz0fiqmTy9KH5ZvI8sqfR9hDfpDf9Z9G/Lu8ydacztrqPA2easY1qdC5p88I1YOMo7Nppr4rvRkOflRlav0tqcmOcGSNp6Tt1XtPoMNbRlpz8ER4u68stEadlc80auSud42dB9d5Lvk/KMd/m+nmad5O+uslkK9/e1p1rm4qOpUqSe7lJvdmwfG3hbmdS5ivqLE5GVzWcEvUa72UIxiltTl3eDez27/ABNe8hZXmPup2t9bVravTe0qdWDjJP4M3vQePT0w74rb2nr4+5l+k7ZrZfXjaO55wAbbNAAAAAAA5RhOW/LGUtlu9lvsgOIAAHfj7Wre31CzoxcqlapGnFLxbex0FhcDsN67qSpk6sFKjZQ9nfudSSaXzS5pfIiz5YxY5vPckxUnJeKx3pRxwvaeM0nYYK12VOrOMILuapUopdfi2v3Tp4DYx0cPe5WcUnc1VThLxUYd/wBZSX0IXxQy8tR63qU7OTrUaMla2yX6XXq18ZOT+hdOJtrbS2kKdOrJOlj7VyqyX6WycpdffNtL5GDqItp9FTD1tefrzauGYy6m2X+WqoeLeSjd65jbRlzUrPlptL9Zvml972+RZnpcaohc4/Tembeb5aFsq9Xr4uKSKCvLurd5Otf1faqVarqy+Le579T5q61Nn3fXK2qVeSnGK8Ekkka1dJFZx+FIZ1s824/+Yv8AT9zZaWx+fr1IRpX9WpToU/0mobc0vhu9iU+j07ePE+xdbl5uyq9nzfrcj+/bfYz3pGY1YTH6PwtKLjRtbGcY++W8eZ/Uqawu7iwvaN5aVZUq9GSnTnHvi0Kz+M007T7W/wB4e/7fNG/dsvr0j9N5vKUaObs7jt7CzpPtrXucHv1qbfpdNvetjX9Np7p7MsPUPFzUeYwc8XOja0O1g4Vq1NNykn3pJvaO/u2K7OPRuHNgwRjy7cum3g61uXHlyzfHvz8VycO8qtd6UvtG5mrB3VOgpW1xN+01F+y2/OL2W/6rfkVBO3qxupWzhJ1YzcOVLrvvtsSfhDOtDiJiuw35pTlGW36rhLf7jO3OYsdG8c73L18eruhbXU6kaG+y5pR3T+Te4pHYZr0pHWOLbz7/AJl57XHW1u7lv5Pdp7gBxFy9GnXnj7expTSkncV4qWz/AGU2z7q70f8AiHp+yd4sfTyNCK3nK1mpOK967ztufSI4kzuZTtr6yoUuZuNP1OEtl5NyTZtnwA1le644cWuby1vSpXU5zpT5VtGTi9uZLyZV1Gq1mniMmSK7JceLT5PVrvu/PCUXGTjJNNPZpnwvP0x9IY/Tevra/wAXQjQoZOi6soRfTnT2bKWxNpG+yNCzncU7dVZqPa1Psx38zUw5q5ccZI6SpXpNLTWXlLX4QcEs3xFwdfL2mQt7S3pzcIqa5nJr4dxANW6bymmMo8flKKjNx5qdSD5oVI+cX4lseh7q6vhuIsMDUqy9UykXDk8O0S6Mi1WS/YTkwzz6u8VK9pFbwqzWulM3pDMTxectJW9Zb8r71NeaZ6eFl7Ow4g4avBtb3Mactv1Z+y/uZtD6aenqeR0Rb5uMd7nGVe9eNOTUZfR7fU1l4RY+WQ1/jV0VO3lK5qSk9lFQi5dX8UiLDqY1Olm9o7p3S3wzhzxWPJa2Mul/l9zN/wA/5u2xsHVfxjT3/F/QoK8qu4va1Z99SpKX1ZZ1tkp0NJas1hU/N18xcO0tNn15Xupbe7lb+hX+k8VXzmpcdiLaLlVuriFNJe99fuPNHhjFvPhER8o/u91OTtJjbvmZ+cti+IdCWJ9G2NCS2nOytKT+cqcv4GsBsx6X+UjYafwum7eXLGtUdacP2KcVGP3uX0NZzj0TX8ib/wBUzLr0hP5vD4REAANRRAAAO6xrztb2hcwe0qVSM0/enudIExuLM9ISlTuNS47P0JKVLJ2FOaa8HGKW37vKSH0YslFflfFTntLeFeCb8OsZfe4mD1ZT/KvA7T2S5uepj6rpT81zSlH8IQ+ph+Bl8rLiRj4yfs3CnR2323bi+X70jEyYu19H3xf07x/2zyadMnZ6ut/Hafmw/EnGRw+uctYwg40o3DnST/Un7UfuaI8Wj6SNgqGsbW+Tbd1apTf7UG4/hylXGlo8vbYKX8YhT1OPs8tqeEgALKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALg9FfHuvrW9yL7rS02T985JfhuU+bC+iZZRWLzd69+apWp0o/BRlv/eRnelsnBpLz8Pmu+j68Wpqr70iryN3xVyMYSbjb06VHv7pKCcvvbM5gVDD+jZmbxrarlbuNCPwU47P6RmVpq/I1MtqnKZKq953N1UqP5yZYvE7/AIM4LaHxMXyyuO1uKsfPbaUX/wDqfcc3xRXHhw+cfpG/2K5JtfJk8p/Xl91SgA01IAAAA7aFtcV3tQt6tV/sQb/ATOw6iY8HNTR0rryxyNff1WbdCvt4Ql03+T2fyI7VwuXpx5qmLvIxfi6Mv8Dx1KdWk9qlOcH+0miK9aZqTSecS7rNsdotHWFs+lBp143W1POUIR9TylNNOPd2kIxUvquWXzIzwrzFjSu7nTuacXisrFU5uT2UJr7Mt/Dr4/B+BaehZW3FPg9X0tdV4yzmOguyqVPtJpvs57+W3sP5M19vrW4sbyraXVKVKvRm4ThJbOLTM/R/mYrabJ7VOX7TC1n9TJGavS3P94ZniDZ5Sx1PcW2WbnWpxjCFTbZVKcUlGX0SNyuCqlbcLNPUGvs2kX9d3/E1yxdOHEvh68fspajw0E6M5PrWp+Cbfu2XxS82XtwEyKvuGGJhu1WtYO3rRa2cZwk04v5bfUy/TWS1tPETHOs8/lyn3Svej6RXLMx0mOX3hrHx3bfFzUe+/wDxyW3w2WxK9LW6056Pebz0KaV3l60baFTb2oQUtuj9+0jx+lFiKmP4nVr3kapX9CnVi/OSXLL70Z3IpXPoqWTh/wBTWUn8q84/7SNK2aLafBMdLTVTrj2y5N+sRKjCecENV2+ldYqrfVOzsrun2Naf6nXdP4bogZktM4i4z2dtcTa7KrcT5U33Jbbtv5I0s+OmTHal+kxzVMV7UvFq9YbW8UsdprUuiatbMX1vTt4QdW3vFNPklt3xfjv3NI174NYbHZbU11Tv6cK9GlbtxjNdHvJR329ybZDb2VWnUnZu4nUpUpuMVzPl6PvSJFwpzFLD6ytalxt2Ff8AMzbfSO/2X8nszMxaHJpdLfHS8zM77eS7bU0z6ilr12jluynBesrHiRC0q+w6sKtFL9tJuK+sUiMauxv5L1ZkMc/s07mSg/OLe6f0aJVxUxdzpnWtLPY9OjCvVVelJdOStHZyX12fwZ7OK1tR1Fg8drvGqO1amqN7Ti+tOcdkt/h3fDl8yfFli2SuaOl42+LjJjmKWxT1rO/wfePmNssZV05b2NCnSpxxyi+WOzlJNbt+feVgW9xAp1dT8IMFqWPJOrYJ0q/L9pLpTe/wcYv+uVCSaC82w7W6xMxPviUesrFcm9ekxEx8g2c9HrG+q8Me2cdpX1apNvzW/LH+6zWM3G4Z26tNBYS37ows4P6+1/tGb/8AUObg09ax3zC56Hx8WaZ8Iah0redxlY2sFvOpW7NL3uWxIuLePssXry+x9hS7OhRjSil5/m4tv7zjou134pY60qx+zk1GSfun/wChmeLWLvctxiyGOsqPaXNfsuSG+2/5mD/gac5dtRWu/Lhmf1hRjH+TNu/eI+qc8G8rDL6Vp283vcWLVGp47rq4yfn7Kcf6pVGvsLX0zq6tRgnTpufb20k/0W91180918j1cLM+9NawpetNwta8uwuYvw69H8nsy6+OWjfy3o+V/aU1K8xydany9XUg9uePv6JSXwZm7xoddtPs5Pqvf7rS/wDNT6IBrGjHV3D+3ztCKVzaxdblj4LpGpD5NcyXkypCf8Hc96nlnhbmcVb3j/N8/dGpttt18JLeL+Rh+JGm5ac1BOlTi/U7j85bvffZeMH74voX9L+RecE9Ose7w+Cpn/NrGWOvf7/FmeBl3b09T3WOr1Y0XkbOdvTm/CXf/BkJy1hc4zI17G8pSp16M3CcX5o6KNSpRqxq0puE4PeMk9mmWVY6303qGxpWGu8S6lanFRjkLZbVNvft3/8A10JbxbHeclY3ievwR1mt6RSZ22VkC2YaV4TV2p09ZVaUP1Zb7/fFGcxWJ4GWFOMrrLxvJx73VnVafyikQX9J469KWn/2yljRXn+avzhS2IxeRy97CyxlnWu7ib2jTpRbbL24X8D6VGVPJ6y5atSLThYQlvH+vJPr4eyvmzJvi3w501aer6fsJVUunZ2tv2UZfGUtmyE6n48ahvVOlg7Shi6ct12kvztTb4tbL5IpZs3pDVerhpwR4z1WMePSYPWyW4p8I6L81lqzT+jsV6zlbmlQjyLsbeCTq1NuijCK8PolsVTgOP8AZXWTq0s5iXZWkp/ma1CTqSgv20+/4x28ehQeSv73JXk7zIXVa6uKj3lUqzcpP5s8x1g9A6euOa5fWme/9nmX0pmtaJpyiO5vFhMzis3Zq7w+QoX1F98qU+73PfrF/FI6NS6YwWprT1bOY6ldwitoNracPhJe0vrsaZ4TMZTCXsb3FX1ezrx7p0pbfXzLl0dx8rU4wttU45Vum3rNskn8XB9PpsZeo9BZ9Pbj0tt/qv4fSuLNXgzxt9HVq7gDkKEZV9M5KF74+rXO1OXynvyv57FS6h05nNP3HYZjGXFnN9Vzx6P4NdGbg6Z1nprUaj+SMvbXFVrfs29qi93K9pfQzd5b215bTtruhSr0ZracKkVJS+KfQYfTup088Gorv+kvMnovDmjiw2+8NDgbX57g3obJpyo2FTHVH3TtarS398XuvpsQXJ+jxdqbeM1HQnDwVxQcX9YORs4fTmky9bcM+bOy+i9Rj7t/cooFty4Bav7XkpXmLqR/W7WS+5ozGI9G/UNxLe+zmPoQ8qUZTf37L7yxb0ppKxvOSEMaLUT/ACSpC3o1bivChQpyqVJtRjGK3bbLkymDhwu4U3McmqS1RqKKoqi9pu3oJ7y7t1vttv8AHbvTJ7Ws+GnA+y9YmvyrqXkfZKUt6rb9y3jCPX4mvGutVZXWOoa2ZytXmqT6U6a+zSgu6MV5EePNfW2iaRtjjv8A6vDbye3xxp42md7fRgQAaao+xTlJRS3beyRc3MtBcOJRjKMMhVi47rpJ1p9/v2il9Y+8ifB/T/5SzX5UuKalb2clyRaT56rT5ej71H7T+CXieTinqH8t571W2lzWdlvTp8r6Tn+lJfFrZe5Iz889vnjFHSvOftC7i/JxTknrPKPvL1cGcJUyWqY5GcU6GP2qbvxqP7C+u7/qk2445v1DTkMPSltWyEvaS8KMWm9/jLb91mf4f4KnpTRsPXGqVaUHc3c3+i9t2v6sEvm2UTrPOVdRaiuclNOMJtRow/Upx6RX07/fuUcP/G66cn8tOUe9Zyf8NpYp/Nfn8Em4EY20zGtKmNvKMalK4sa8N5Lfkbj0l8URzS9hOeuMdjqkfb9fhSkn586RN/RnoOprytV26UrSW/8AWko/xO/E46lV9Jt20ILsqeWnW5V3JRTn/Au31HDmyVnurv8AVVri3xUt4zt9E29LTHSr6cw+UjD/AIrcTpVJe6pFbffB/U1vNxuPVnSueFGd7WO7pUoVYPykpx2f3tfM05KvoDLx6Th/pmY+6b0rj4M+/jESFpcItN4zUOhNWRvaFPt6Kpyt67XtU5KFSXT5xW/xKtLx0tbz0pwAyWYcuS5ycXyrx9t9nBfRyfwLvpDJamOIrPOZiI+avpKRa8zaOURM/ojno64aV9rSpkpJdlYUZd/jOacF9zb+Qsqdnqj0gZqEI3dlUv5Saa6TpwXe/lEk1lzcNuEFS4coU8vktpRTfVTkvZX9SDb9zZx9F3TvaXV/qa5g+WC9Wtm/0pPrNr4LZf1illz7Rm1PdEcMf571mmLfs8HfvvP+e5DeLWAw2F4pvH0ErTG1nRqVIw6qlGW3Pt7u9r4m5Oga2JxeAsrfD1KEcZQopUeSacOVLffm+9mkfF7NQz3ELKX1KSnRjNUKcktt404qG/z23+Z4tBRlfasxeLr3NzG0ubmNKpGnUa3i3s+h1qdBfVafHx3mJrG8+fJxi1NcOW/DXeJTb0mOINDXeuN7BqWPx8XQoTX6fXdy+pVJIOImB/kxrXKYLmc42lZwjJ+Mdk0/oyPmpgpSmOtadNlLJa1rzNuqytVyqZng5gcnWlzVrGtKg5PrKUW3Hv8AcowPP6OVKVbjTpuMfC65n8FFnvu4dh6P1rKX/XXXsr41J/7hK/Qv05UvtdXOoZw3oY6hJRb/AF5LZGd2kY9Llnwm31/dbvTiy0jxiF0+lJdKHCbOxqbc0qVOK+Lqw/8AU080G8zXylXEYSUYVslSdCrN98aXfN7+C2T3NjPTFz0KenLPT1LmldZC5U1Bfa5Kf+MpL6FVRt3wv0a69bkjqnLR5acekna0vF+5/wAf6LK3o2049Lt/NeZ2j/O6Eur9fN5ViN0a4pZO19cttNYqS/JuJh2Udv06n6Un59fv3LB9D7SjyesLvUteCdDF0+SnuujqTTX3R3ZSePtLnJZCjZ20JVbivUUIxXVttm0uv7624LcEbTS+LqQjnclCUZ1Y/a5pfzk/knyouazemKNPT2rcv3mUOD1sk5rdK/5EKL466o/lZxJyd/Tm5WtGfq9v5ckOm/ze7+ZBT6lKcuicmzujZXklvG0ry+FNsv46VxUikdIVLTN7TMugHOpRq0/5ylOH9KLRwJHIAAAAAs7h/KWQ4SavxTanKlGFWlB96687a/8AwvvK+wN1KxzdjeRezo3EJ7/CSZPvR9rU6mosjiay3p39jOm1+P3NlcXEHSuKlN9HCbj9GUsMRGbLTx2n5xt9lrLMzix28N4+U7/dfXpL491tN47JR5X6rcunNrx54/40/vKBNidcTjnOBk7/AKtq1oVv6ylDf8ZGuxV9C2n8POOetZmE/pSPzov/AFREgANdnAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABsxwWlHE8FK17LaCcbi5cu7u32/uGs5slUTsPRobW0WsZt/+JUS/CZj+mZ3pjx/1WiGl6Nja17+FZa4Uk6leEe9ykl9WWx6TVeENR4XEwW3qGMhCS8m3/gkV9oWy/KGssPZbb9reUote7mRKPSIu/W+LWWa7qUaNL92lEt5OeqpHhEz9IVa8sNp8ZiPqr0AF1XDKaawGU1FkVY4q2dartvJt7RgvOTfRIx9vRqXFenQowc6lSSjGK722WpqLIR4bado6bw84LN3lNVchdRe8qe/dFeXRv8AHx6V8+W1dqU52np+8psWOLb2t0hyq4zh9oKCjl5/yjzKSfY03tTpv3+H13+CPBf8Y88/zeJsLDG0F3QhT3+7u+iK1lKUpOUm231bfifCL8DjvzzevPn+3R3+KvXlj9WPL91g0+L+tIPd3NpJeXq0V+BJsbxvp3VNW+p9M2t9T22cqbT+fLNP7mimAeT6M0s9KRHu5fR7Gtzx/NMtkdMYDReeyFDUXDLN08LnaC53Zz35JbrZxlCT7n17m11Pbx04VX2ocPS1VY2VOjnYUFK8oUZ88a+y26P9ZJbrzXf1XXWeyurmyuadzaV6lCtTalCcJbNM2a4H8fKV26eC11XhCq0o0b9rpU900l0fv+pnavTanTWrmwzxcPj128POFvBnw5YnHkjbf5b+PlLXLTeayOnM1RyePqdncUW01JdJLucZLxT7tjangfmsDnXfZvF1pULq5jB31hvvGFZPZ1O/fqunds/iR70hOC9O77bVOkKEVV2dS5tKa6VfHnh17/NePga96Wz+W0rnaWTxlaVC5ovaUZLpJdzjJeKfkS5K4vSmnm2KdrdP7S4x2vossReN4/znDbXj5ox6y0PV9SpKeTspdtbLucv1o/NfeineDNxDU2hM3w+u5qlW5JVLfm6Pq0/unGL+DZc3DHiPhtbWCdrVVtkYR3r2k5+3HbvcX4r3ru8SB8X+G2Txub/l5oZShd05dtdWtPZdy6zgvFPruvHwMrR5LY4nR6j1ZjnWZ8V3U0raY1GLnHSWuF3Qq2t1Vtq8HCrSm4Ti1s009mT70eeX/KbaLdKboVlDfz5Hv925n9Z4Wy4kYeWr9MUY08xRgvypjlL220tuZLxfR9fH499Z6Uy1fTup7HLU4tVLSupSi+m67mn8tz6K8/itPenS0xMTHhLJrHYZa3nnG+7lrXFXGE1XksZcwcZ0biSXvi3vF/NNGITae66NGzPHrQFPWGn6OudNv1m4p0IurCC39YpbbqS96Xh7jWaScZOMk010afge6HVRqMMW745THhLzVYJw5Jju7vcu/R2QseIGjqmEys272jBRqJNczUfs1I+9ePz8yKYate6Azlzg9Q0O3w18nCpJR5oSWzXPH3rfZrvXuaRBcTkbzFX9O+sK0qNem+kl13Xc014p+ReWltTaZ4gY1YbO29GneyWzo1Jbc72ft059+/u33+Jn58VtHNrRHFjtzmI61nxhdxZK6mIiZ2vHSe6Y8JRzTlWGh89UxWQqQvtK52CjTuU04KMl0fjs1zbP6+RBNeaZu9LZ6rYV/wA5Ql7dtXX2atN9zTXT3MsrIYO+0pa3GGylrVzWkKst+aEd69m/1o/Bvw6P3bs6MTf4bOY6XD3MZKhcQ2UsRlOm8H3qE9+qe3Tv93gibFqI/jY/Wieu3198d8I8mGf4V+Ux03+nunuU6bdcHsjHKcOcRcRlzSp0exn+zKLcWvok/mas6owOS03mKuLylB0q9Pr0e8ZJ9zT8UWZ6N2rqeNzFXTd9VUbe+lzW7k+iq7dY+7mXT47HHpnTfitLvTntz9730Zm7DUbW5b8nh4uWNbR/F+lnKFNKhXrQvqTXc5JrtF+8n9Ts43Ovh+JFhqmwa7O5p0q1Gce5uCS2+aSfzLl4waJpay0zKhQUI5K13qWs5dPa26xb8FJJLr3Pb3lS2cJ604Z1cHcQl+W8N7MKc+k049I9H4SiuV++MfMraPV1yY8eSec19W3unpKfU6aaXvSO/nHw6wj3GHDUld2mrsZHfG5qmq3RdKdXb24/XqXh6NuraOp8BTw11JSyNhBU5xk93Uh3Rl7+nR/BFR8J8hZ6iwN5w4ztRU4XDdXHVZd9Kst3y/N/xIxp/JZrhrxAp3PJKndWNVxq09+lSHivemi1qdLGpxW09varzj7fsrYc04bxljpPVmeOugbnQer5OhzPHXUnVtai/Re+7j8UzO4a8teImkKmLvpQhk6CT7RpcyktlGa8Wn3NL4+RsRqbEYTjNwt7S1lBznT7W2qLq6VRf/w2NLqsMzo3VE6VSNS1vrOo4yi10kvFe+LX4nGlyTrMXDblko9yRGnvvHOlmNyVlc46+q2V5SlSrUpcsov/AOu485bmfx1pr3TlPLY5QjkKUXGmunNLZbulP3rq4y8d9vhUk4yhJxknGSezTXVGlptR21ecbWjrHhKpnw9nPLnE9JfAAWUIAAAAAAAD7GUoyUoycWu5pkuwHEvW2EpwpWecrTpQW0adxCNaKXu509iIA4yYqZI2vETHm6pe1J3rOy2Mbx41bbtu7tcfeb/rRlD+6zKQ9IXLr7Wn7T5V5L+BSYKU+itHP/lwsxr9THS8rtr+kPmNn6vp6xjJrvq1py2+mxE85xk4g5WDpSzbs6T3XJaU40unlzJbv6lfA7x+jtLjneuOHF9XnycrWlyq1KlWbnUnKcn3yk92ziAXVcMhp7EXecytHH2UOapUe8peEIrvk/ckeKhSq160KNGnKpUm1GMYrdtlx4GysuHel69/k5xle19ozjCa5py71Ti/Jd7fdv8ABb1tVqOyrtXnaekJ8GLtJ3nlEdXRrzJWekdL0dP4mXLXnSdOEl0mov8AnKktvGT3S92/kjw8A9CQ1LmamXylPfF49drKMuiqy/Rj8N9vvMPo/Tud4o60qcqb5mpV6kV7NKC7oxXwWyRtDmIYPhdw6o07qn6vQpQ5qqTXNVl15ILzb/i2ZOqyW0mHscfPJb6yvYojPl7S/KlfpCmeP+pPU8f+QqM16xe+1V2f2aSl4++Ul9I+8ifArTbyOflnLuMVYY5OW817M6jjLbv6bR2cn8PeRuMMzr/W05dal3e1eaUtvZpQX4RivwLI4kZK201pu04d6ccql5WjGnW5EudKTTe+36U39FsiWuH8NgrpMc+tPWfDxn9nnadtltqLx6sdPtDI8Abel+UNSZ6lTjRtK9z2du5dI8iblLr5JOJ6/Rsw1bPa4z2u7uL5O2qQoSf6Uqjbk18I9P6xy/JtzZaTxnDzC7Sy+Rg6DlH9CLbdas9n9lbyivMvjR2msfpLStnhMe+W2tabUp1Nk5S73Jvzb3fuMrV6mIpktHXJyj/pjlv8V3Hh2mlJ/l5z757vgrX0oMvTxXDStZKe1XKVYUYx80pKUn9Ir6mo5ZfpCa6p6z1gqdhNyxeOUqNu/CpJv2p/PbZe5IhOlNP5LU2boYjFUO1uKr8XtGMV1cm/BJG36L0/4TSxx8p6yytZlnPmmY590Mpww0pV1fqu3x3M6VpD85dVtulOmu/5vuXxLg1RWsc9m6eWykqdpozBL/NVLoryqlyppd8oLlSXns9u9terUNlpLhZpGjhq1/29evFTu6Nu+W5u5fqye75Kfn17ui8d4Zi9Ka24r31K9uKCxGnqT5aXs7U6cUttoQ6Ob2ilv8OqK+TLXPPb2tw0jpM/rMecrFMc4o7OI3t4fv5QwWSr5vi1riNtYUnRs6e6pqb3jb0vGc34yf3vZLwLP4kajsOHOhaGmcHOMb6dHsqCTTlTi01OpL3tt7e9t+Bz1RmtM8HtPwwuEt6dfK1YqXI5JzlLb+dqyXVLr0j/APxeu2ayd9mMlWyORuJV7mtLec5fgvJe48wYZ1lq222xV6R4+c+RlyfhqzG++S3WfDyeRtttt7tlqei5p2rnOK1jc9nzW2NUrmq2t1uk1BP4y2Kvs7avd3NO2tqU6tapLlhCC3bZuboDTtpwR4HZDUuSgpZavQVarGXR876Qprv8Wi96Rz9ni4K+1blHxVNNTivxT0jnLWfj5kqWV4u6guqDUqauFSTXjyRUN/7JEcLjrrL5a2xllTdS4uaipwivNs6rirWvb6pWnzVK1eo5Pbq3KT3/ABZcelMZQ4U4ejqXNUFc6lyNOVPHY9NOVFNbc0vqvw799pbWjT4opXnO20R47Q4rXtLzaene8vF+15b/AAPDHT1N3E7OEOfl6upVkui+9v3c23gbScKdFU9CaJtsRbL/ADqcU7ie32pvq3/Ahfo78K6+EuKmtNW71s9eN1IKp7Tpb9W+/ve5nOM3GPTmhacrJyeQy0ovltKU/svwc3+ivd3nzuqvfNEaXD623WfGe+WpjrFLdtk5eHl4QrXV9pa6Ov7ziFrm5pZLP1JyhjrSMkoUUt0owXi9n1n4dfF7muOqs7f6kzlxl8jNSr1n3RW0YRXRRS8El0PVrLVGc1nnp5LLXE7ivUltSpxXs01v0jGK7kXPwV4E3FSpQ1Frm17OxUVUoWDl7dbddHPZ7xXc9vE1a9n6Px9rnt623+REKc8WpvwY45f5zllPRq4eLD41a4y1vGV9Ug5Y+lUfL2ceq5m29k33Lf4nk1lhMVXy1bVnEvK0LutNbUbbeVOjSj4Qio+3U26ddl17yQ8cuLFrpVvD4iFC4ycqeygtnTtY7ey5JdHLyj4ePkauZjKZDL3s73J3la6rzfWdSW/yXkitpcOp1dpz3nhienjt4eSxmy4cFYx1jimPluta64n6Zw6dDTWBcoLumoxt4/RJyfzZhLvi9nK096ePsaS8uapL8ZFcA0o9G6brNd58+apOuz91tvdyWrY8Ya04KjlcHQrUWtpKjVaT+MZ8yZ6P5P6F1xFSwF2sXkeVylS5Gt374N7Pr4wfd+iVEcqVSpSqRqUpyhOL3jKL2aZ5OgpTnhngny6fLoRrL25ZfWjz6/NkdR4LJ6fyDssnbulPbeEl1jNecX4oxhdmkstYcS9PVtPZ9U1lqcHKnWUUpSaXSrHbxXRSX6S6963KfzeNusRlrnG3sOSvb1HCa33XTxXuZLp89rzNLxtaP184cZsMViL0nes/5tLxgAtK6a8EbhUOI+P5u6pCrTXxdOW337GF15Zuw1nl7Twhd1Nvg5Nr8Thom7lY6vxN3F7Ond03/aRn+OdBW/EzJJd040qn71OLKfKur99fpP8AdZ66f3T9Y/stDRUI5TgFVt1s5KxuYbecoyk193Ka8GwXo811e6Eu8dPbandTi/hNR/8AUoK6g6VzVpNbOE3F/JlP0bEUz58f/Nv81jW+tixX8tvk6gAbDOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfYLeaXmzZjjHBY/gbTtYvb81a0f7rf901rs4893Rh+tUivvNhfSar9lorH2sXsp3UVt/RjIx/SPrarT185n5Q0tHywZreW3zVbwJo9txTw6f6Ep1P3YSZieJlx61xBz1f9a/q/3miS+jjSVTilZt/o0Kz/ALDX8SC56r22cv62+/Pc1JfWTLdeert5Vj6yrWjbT198/SHiABdVk14LUIVNd21zU6QtKc62/lLbaL+TaZGdQ5Crlc5eZGs/buK0p/BN9F9CZcEoqrlcrRTSqVLLlh85xX8SATTU5J96exUx7Tqb+UR909+WGsec/ZxAL/8AR60Zha+nHqDIWdG8u61Vql2sVJUoxe3RPo235rwPdZq6aTFOS5ptPbUZOCqgAbLcbtF4a60ffZW0sLe1vrKHbKpSgoc0U/ai0tk+j339xrScaHW01mPtKRs61Wltpr8Nl7eixh9B5qpf2morW3usq5J0aVx3OG3Xl9+5bOtuAOh81TlVxlF4e48HRb5H8maa2lzXtLmFza1p0a1N7xnB7NMtPTvH3XmLtoW1zWtslSj0Xb09pfvR2Kes0WqnL2uC/wAO5Pp9RhinBlr8Vp6ZymsOEyjhNZUa2V063y22St1zu3XlLbry/gc+JPDHTfEKyWodO3lvb39aPNG4pdadx3Jc68+neuvmRK39IvJ14ON9pSFVNbNUazSfxUos7dP8ZNP2NWu6Oj8hZK5kpVey9uO/63L0W/vSRnW02spftqU4b9+0xtPvhdrm09q9na29fOJ3j3SpTOYbP6Ozao31GtY3lKXNTqQl0flKMl0a+BdPDjj5T7KnYawpOM0lFX1GHR/0orufvX0JjbZzSOv7KpaShSv4KHaVbatSlGUeve09mn074v5la6x4KwdSVxpi95E+qtbmW6Xwqf4pfEmnXabVx2Osrw28/wB0f4XPp/zNNbir5LK1Fo/D6vnS1lojLU7HMLrC6t2nTrvu5ai+Ca6rfzINq3S1tm6jhrfHQ03nJLaOUoe1a3L26cz7k372n1fV9xVsFrXh/lVWpSvsVX8Jwe9Oovj1jJfUsPTvpBZWnQ9W1NhrbK05fanT2pN/GPK4v6EkaXU4YicNuOsdOe07eG/SY96Pt8N52yRwz3+H9mQ4aa0znCjJx0xrGjUlhaz/AM3uYPmjBPxi13xfl3omnE3hFp/Xtn/KLS1xQtchcR7SM4Pejcrw32+y+j6r5nDD6n4Rasx35Gnb2jhX6+q1qlS3mn7lzcm/wOi10TqXRtepecOtSP1OpLmljMhBun8pLfbx69Clk1ERm495xZPOPVss0wzOPh246eU84a36p01m9MZGVhm7Cra1o/rdU15prozEptNNNpruaNzo63wWTs/yJxI01Ux8Jrlk5x7e2k/2akO5v5Mh+sPR2wWbhLJ6Cz1tSpzXNG0qT5o/BSb3+prYfSkeznjhnx6xPxUMuimOeOd4+Uqu0NxXv8d2VlnoyvbVbRVeP87TS6Lf9ZLp0fkSrK6U0Zr+jLIaevaVveL2qk6EfF/6Sm9tvivvKt1doTVOlq7p5jE16Md+lSK5ov5owFld3VhdQubSvVt68HvGcJOMkd5NDS9u201uG3l0n3w8pqrVjs80cUefWPdK1crO/tbGlguJmNrXNlH2LLL0HzTt/i19pd3R9SH6r0VkcFRp5WwuIZTE1HzUb+16xXlzfqslWmuMF1C3jZaksoXtJ+zKvShFNr9uG20vlt8yZafs9M5J1L7QmbWLu5L87b0/bpVN11VShPvXf1j3EMajNpp/OrtHjHOs/ev0Szhx543x238p6/3ZbgpxKpamsYYbL1owzFGKSbe3rEYr7S/aSXVePf5mU19oSWTvYaj07XjYZ+3XSa/m7iO23JU80103+pB8jwvlm7h3VrCGIzXN7E7GXNbVZrxUXtKn8t0e3T/EnPaPvv5P8ScdcRmn7F8o77rw5kl7XxXX4mbfTbZZzaK0b99frt4wt1y+pGLVRy7pU5xBryera1dYmeGu1s69BPZKqvtSj7m+pPLarj+LWDoWNzWo2WrbGly0akukbyC8H+0XJqTTmkOI+FhUnUoXO8Gre8oTTnTb8mn7vsy+41v1/oTP6EyUa0nOpa829ve0d18N/GLNLTa3Fq9qezkr4/5zU8+mvp/W9qss/wAF+IuV4W6sqWOTo1fUJ1OS7t599N/rIvbjtw4sOKenbfWGlbijO8jSclJd1aGy9l+/vKLo3uO4pY6nY5GpQsNW29Plt7mT5ad6kvsy8FL3mT4J8Sctws1HV09qSjWjjZzSq0p/9Q/1l5p7+A1GG9r9ti5ZI6x4w5xZKxXs786T0nwVpp/L5PSeblLs5RlCXJcW8+ikl4Pya8H4E71Tp6x1pjv5QafnTd84+1T3UfWNl1TX6NRL5S+PfcnHThVjtfYpav0nKmr2VJTSi/Zrx/xNXsDmMrpXMSlTjOnOMuWvb1E0pLya8H5PvRJiy11cdthna8dY+0k1nB+Xkjes/wCbwws4yhJwknGSezT70z4W5l8ThdfYx5PE1KdvkoR9ucls6ktvsVEu59HtJLr+FV5GyusfdztLyjKjWg9nGS+9ea95ewaiubl0tHWO+FXNgnHz6xPSXnABYQgAAAAAAAAAAAAAdlvRq3FeFChTlUq1JKMIRW7bfgevBYi/zWQhY46g6tWXe99oxXnJvol72Wzj8Zg+G+JlkchVjc5GrFwjKO3PJ7dYQT+yvNtd30dbUaquLasc7T0hNiwzfnPKI73RpfA43QuJnns9Wp+tuO0dkpOO6fsU1+k34y7kQuf8oOJGr6VnYW069eq+WhQi91Tj4tv72/FnVdXOoeIOp6NrbW87i4qycba2pL2aa79v8W+rNxuDfDXDcLNN1L69q0p5OpS5ry7k9oxS6tLd9yM/Ll/CR2mTnkn/AD5LVK9v6lOVIdvDnR2n+Duga19fXdONSMFWvbmS+014L67GqvE/WOd4ta7VOzp1JWym4WVsnsoR8Zy8F0W7b7iQ8Yte5vi1rD+Tum4VPyRRqNUoOW0Z7d9Sbf2V8TBZPLY/h3YV8Fp2tC6z1WPJfZJLpS/Yp7//AF8+i80mC2O05L88lv0h5lvW0cNeVI/V7cxlrHhjj54DAVKd1nKsU7y826Unt0SXmt+i8O99ekcfwdhbVc2r+FKvmNSV6soWtpGLfJzLaVWc30S69/evDq014OG/DTUWuLn1ilF22PU9qt5W8fPlXfJmwFlc8MODGOlSjdQlkpU1z8j7S4rv3pfZXXu6L4nOpzY8UThpvfJbrt1+PhDvDS+SYyW9WkdN/smPDzR9HS1vcX17cxusrd+3eXdTokl15Ib90F4L3bv3Uv6QHGmGRp19L6Tr720k6d3ex6dovGMPd5vxMBrLiRrjije1sLpyzuLTE1ekqFJdZRXXepNdy6dy2XxOvBcL7ezUKl5a3WavNuZUYPsLVP31Je1L4RRBp9JXDbt9Xbe3h4Jcua2WvZ4I5ePigWitGZnVVw/U6So2dPrXvKz5aVJebb/AtjTdzLH0aumeEliry8ajG/zdWK5E/HZvp57bfe9mc83TxdG3o0+IGetqFrRS7DD4/enQhttsnGHtzfvly/Eweb40OwsFidFYqlj7amuWnXqwTa98ae3Kvi937yzlvk1fLHXePPlX3zP83ujkjx0pp+d7bT5e18PD6p3iOH+hdA0/5Qa4ytPI3+/PGd1L2ZTXV8sE25P4p/IiPE7j1kcm6mO0lGVhZ7cruZR2qzX7K7oL7ym8tk8jlryV3k72vd15vd1Ks3J/ee3Tml89qGv2OIxta5l4tLZfVkuP0dSLRl1NuK0ePSPdCO+smY4MFeGP1n4sTXrVa9WVavUnVqSe8pTlu2/iZzRmkc7q3IKzw1nKs01zz7ox+ZdWg/R+tLK2jmuIeZtLK1hs/VY1o+18Zb7/AELAsuJulsNb/wAn+Eel62RqwW3b8vZ28H5yqTO8vpCOdcEb7d/dHxRU009b8vq8vDfQ+nODdpLUup6cal7Tj1rVmko9/SKK84k6r1rx3zMcdgMZUo4K2nunJ8tPf9aUn8OiRLb3SGd1pmKGS4jZ93lOnPnjjLSny0I+5y33fh4P4kqy3EPhppSyhhrmtYWkKCSVpaQlWkl4Jxj7HyZkxrKxk3pHaZPKJ2hfnTWiu1/Ur59ZQDh/oGliL9UdI4/8sZePsVszdpK0tHt1dNfpSW/h7uvgWhp/Q2juH1WtrLV+XjfZJ9Z397JJQflCPh39y6lRar9Je8nTnQ0thY20n0VzdyU38VBLZfPcp3MZfWGvMqqt9XvstcPpGKTcYL3JdEizGk1eo55p4Inr4z+yK2fDj5Y44p/RdHGH0kLrKU6uK0XCpaUXvGd7NbTkv2F+j8e8o3T2Cz2r8xKhj6NW8uaj5qtWpLpHd/alJ9xYGj+EfPOFxqW7UY9/qtvNNv8ApVO5fLcsy71BpHQdjSsIRp2MXHnhbUKblKa89lu38ZMTrcGljsdJXit5feXtdLkzfmaieGrI8IeGmD0RFZK8nRvsvH2nc1I7Qo9HvyJ93T9J9fgdWr+IeodVXNTBcNbed3V35LjLSW1Gjv4Qb6OXv+nmQ7M8YNN3+PVtXwGVuI7vnpyjyxqeSltLqvHZpo66PHqzsLaNGz0fXpwitox9YjTil7koMpRpdVe3bZacd+6JmNoWZy6esdnS/DXyid5S7TfAHSlvbKWduLvKXkutSp2jpx38dkur+LZW3pF8OMBoqjjL/BTr0oXk50529WfNtypPmi3126mSu/SOy3ZuNjp61pS26OrXckvlFRKm1lqvN6uyryObvHXqpbU4pKMKcfKMV0SNHQ4Nf2vHnttHgpanJpeDhxRz8WDALl4E8OcVncbU1BnqPrVF1HTtrbmajLbvlLZ7vr0S+JqanU002OcmTpCngwXz3ilOqmgbD8ZeHemrbRN1lsTYULC6sUqnNR5kqi3ipQkm+9b7p/H5a8Eej1mPV4+0o71Omvp78FmQ05lK+FztnlLbbtLeqppNdJLxT9zW6LG9IfH0p5DFalt3vTyNBQk9+9wjBxf7k4/RlUlvcX41KXDHSdKvv2ijT7+9fmY/4oj1E8GoxWjrO8fDbf7O8PrYckT3bT+uyoQAX1R22c+zu6NT9WpF/RlgekJFvX7uP0a9rSnH4bbfwK7j9pfEszj3BSuNO3W3Wri4bv7/AOJUyRtqcc+Vo+iek/lWj3fdI/RjrJ2ebt33qdOS+cZoqfW1H1fWOZobbKF9WS/fZZPoxy3y2Yp+dCEvva/iQTipHk4i51bbJ3s5L4N7/wASpp+XpDNHjELWed9Hj8plGQAazOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAe/TkebUGOj53VNf2kXd6Uj3w2Gf61eb+kY/wCJSml+upcZ/wCLpf30XR6U/wDybgV/31X+5TMbWf8AiGD/AN30aOn/ANpl+CJejf019UqLvhZVGvuK2uXvcVH5zf4lkejp01tcv/3Gp/Arunb17q9dC2ozrVZyajCEd2/kXMX+6yT5V+6C/wDt6R5z9nnBynGUJuE4uMk9mmtmjiXVVntA5iOD1Ra3tSTVFt06zXhGXRv5d/yM7xV0nWxmRnmrGlz4y7lz7wXSlN9dtv1X3p9zTIIWTw54hUMdbxxGoacq1mouFOsoqThH9WUWvaj+BT1FclLRlxxvPfHjCzhtS1ezvO3hPgrYsHhbxKvNIUp4+taTvrCpLmjThPlnCT79m0+j6br3Eur6S4V5les2eat7PxmqV2oRa/o1OqPVa5DhLoml6zZKjk7+K3g4t16nN7m1yR+PeVM+rxamk45x2tv3bTH6p8WC+G/HF4jbv3e/jfqmtDhraQnb1LK7zSipW1Rpzp00+aW+y8fY+rRruSDXWq8lq7NSyGQklGK5KFGP2aUN+5fxfizwaaw91ns5a4myinWuJ8q3eyS8W/cl1LOi01NHg4dtusyh1We2oyb9e5m+Hmgc9rW8lTxtFQtaUkq91UaUKe/3t9H0RZ1zZ8IuHMHb3knqLN017S5eZRl5bb8kfnuzz8UtY2+iMNT4faOl2EqNJRvblbc6bW8kn+s93u/DuK34aaJzGvtTQxGLiubbnr1pv2acfFtleJvqazmy24cfdHSdvGZ+yT1cMxSkcVv86JrkON9zJuOP03ZUKfgqtRy/u8qMJPi9qNz5oWmPgvJQn/vGzeK9GXh5RxatrupdV7ycelbna2fwNZeOfDDIcNtQRt6s+2x9y27Wt5pd6fv6kWnp6PzW4K0jfzdZcuqpG82lkbDjZmbbvxVom1s3Sq1IN/ezMWvHCmvzd9p2vSb75wuVJpfBxX4lIl06Kv8AQmvNMWmm9V1Vi85bQ7G0v9uk14J/+p3qfRujiu84t48t+XmYNbqd9oummN4h6IzNN0pZOjDm6OjdU+zcvjzJxf1OV9w30HnqLuKNnRhKT61rGulHf5Nx+4rbOcBtcWUpTsKNrkbbf2alK4gt18Gzy4nhNxJoVee3oxsGv0nfwh+EjO/BabH6+n1PD8Vz8Xlv6ubDxfBI8nwKoxp9pjtRyUt+kK1umvrGW/3HViNNcWNJzdDT+Zt7ug3v2TqqVP8AdqrZfIyGNxXEDD+3e6+wENl1jeXUKvT4vqcMzxHyOEjDt7nT+X3ezjjq81P700Sb660cPFXJHnDiI0sTvtak+9k/8oGs8ZNfyj0NWqKEeWVewqcyb83tzJ/VGUxXEvh7VrKWRpXWNrTXtOva1Kck/jT3T+LRjcBrnN5mj2tpoDM1qXjUpNTX3pE6wqvsrZ1lcYvIY1QW7pXsFDn+GzaZQzxXDHFkw8Pjw2+3Ndxz2nKuTi99fvyd9lqDT+Zt+xxes7GtH/Q16kJvb5+19xGNRcOsTla8q1bT+Pvpv/rrK8jR3+Ta/A46ox2lLeW2aoYWlP8A947OM/v2kRqlHhlSe9O/xtGX7F1KP91o5x5bx62KL/8Abv8ArEw5vgifVvNfnt+7GZ7gnQpU1VtL++tU/wBG5tun1UiI1+F2qaE5zsKlpccnX83cxjP6Nlz4bUOm6Ffaz1JZRk48q5r3fZe5uXQz1vlcbd+1PKYy836bVa1Or+L3LX+sarHymkzHnCL/AE7DfpaN/e16oaw4gaZmqF7Ur1acFy8l1DtEl5Ka6r5MmWP4y4fJUPVNTYao6TTTXLGvT6/stJr6st2GL09kI7Tx1vNvvlQqP/FoxmT4a6HuH21fGTg33t0/4pnlvSGizTxZccxPjHKSNNqsfKl948+cIBjMfoy+uI3ehNWPBXvK3KnTnLln7nSqtb+Pc38CQVMrr7G0KtlqDT9tqmzl07a1lGE5JrxpSXtfJfM+3nB7hveezbX2Qsp+6Df4s6bPhdncJGS0zxEvKVBvfs61u3B/FbtfceW1GkvHPJv/ANUTvH/ujm9jFqK84pt7p/8A8ygmQ0jozVNZ1NG5R4fKR3bx14pQ9pfquT3T9ycvkc8jc1vVqGnuK+Ir0lT5qdpmqKUqlJpd0nHdTjvy7+JM8tgdb16ats/p3BasoQ7q1Goresvhult8tjjSt69jb9lWrX2OtKi5ZYzNWzuaDXdtCqubZLfpu31LtNXExEcW/wAd5+Exz+dfiqzgnn6u0+7aPjE/aWN4fax1FwivKdrlaizOlLtp0L22nzwgvBxfXb3xfyLF4hcPdHcWcI9R6auqFPITX5u9pJuFXb9Gcen123RCLLG2GNr3FvozJ2F1Rr/8c03e1FOlWT6/m5Pfb4rfu67dxj9OUczpe+r5Xh9K5pVI7TyGmr1fnFFL7VNvpUj37OPXuOclYyX7bFbhv+k/9Ud3v6PaWmtezyRvX6e5VWSx2qeH2oezu6FWwuobpN9adWP4SiyY2WodN61tY2WoKNO0vIx2g3PlTk/GFR/Z/oy3Xfs0XFQ1Pobi1hpY66oqVeC5p2tx7NWi9uri11fd3ry6op3iHwcyeHnUu9PznkbRbt0Xt20F7vCfy69O4nrqsee0UzxwZIczgyYqzbFPHSUa1Xw9zWFVS4t4O+s4Ld1Ka2nBftQ33XxW695Dmmns+hKtKa5zWnmrdy9atY9OxrN7w/oy74/Du9xLat5oLWfW62xuQmtueb7Obfd9r7E/mov3l7ts2H+LHFHjH3hU7PHk9idp8J/dU4Jhqnh/l8NTqXNBxvrWn1lKmtpwX7Ue/wCa3XvIeWsWWmWvFSd4QXx2pO1o2AASOAAAACZaS4e5nOQp3NZeo2k1vGdSO86i/Zj4/F7L3keXLTFXivO0O6Y7ZJ2rG8ock29kt2TPSfDzK5js7i93sLSS5ouUearNfsw3Wy98tkSqFbQeio70nC9yFPpvBqrW5vj9iHy3ZDNV63y+of8ANYL1S0b6UaLblP8ApS75fDu9xV7bNn5Yo4Y8Z+0LHZYsXPJO8+EfeUuyusMDpSwlitKUKVWr3SknzQT2+1OffUl7l7K+4jOjtKas4m6gnGzUrmcWu3uKskoUY+H4dEjOcO+EeUzlzCvnJSxln39m9u2qL4for3v5Jl1ZPX+huEuHeDxFtCd5D/2O36z32XWpN9zfv3fuRRvqKYLTj00ceSes/vKxGK2WIvmnhpHd+yYcP9GaP4PaXr5O8r01VpQ5rvJVobSfhskt2l122XeVPrjU+d4z3lS3s6rwWi7OblWv6zSdVJeTa3+G+y8Wjoz19ldVys8tr2pVrUa353HaWx+8p1l4TqtPdLx3b7vod2Yo45woR4g5ayx2Op7eraax804w2XR1pQ2+nRdXt5EGPFalpyXne89/Xb3R3z+jq1+KOCsbVj4b+/8AzdDpX8q3rGleFGHq9jJqN1lE3zVF3N88vsrv69Pclu9/PiNNaOwF5CjkKlXWmek9ljMepKlTn+3U8f8AFdUSa8yljk7inj8VPJ32KitoYjA2UqUJLp0q1Wk3vt126MzeDp69hSdppXRGK0taS76l1XjKa+K6Nv8Apbk2TN2dNo5b9d52n4zPP5fMx4+K2/Xbwjf5R0+by32E4r6pm7a+u7XSuMceX1a1mpy5fLeL6/ByRjJaK4Z6RjKep8xTyd0ntJV6st/lTg+b67ksyHDfU+Sg56h1tc5CD6uja1Y29N/HbvOnFcKMPQk1SwOPuJN7updXbq/dFsp11NIjhnJtHhSNv1nmsThtNt+Def8Amnf9IRW54zYjD2Sx+lsXWhQS25KEVbQfvbScpfNIimQ1LxK1Y5Qx9ldWtCSceS0puHMvfOT5n9S7J6UtcfV5KtfG2lPbpG3tYqX1lsZOzhibTlUchSqteNe8T3+UWjmNZpcM8WPHvPjO8upwajLytfaPCNoax0eH2p7iandUqNvGT61K9xFfxJtpfg5YXck8lmrl790bW25t/nuXaq2IoqUo18TS3e+8ez3+rZ58rfY66sp0a2bs4wfK9/X1Fpx7tmppr4Hl/TWe/KtZj4Oa+jMdett0et+FGnsU4yt9KQlKP/W5G9W+/nyqRka1vbYui6eT1FaWVKPdRtXG3h+/Mj9zj9PV6jVXPW1WT798xNJ/Ssd2F4eaav7h1LK0xV1Lvbdwqv8AebIL6i1ueSbfL95TU08R7ER82Dy+q+HNtcdpK7jkq8Vyvlp1K8pe/eW8PodNvxNytSk46e0VkLqMO6pW3jCK/opPb94kd3TymJuJ22I0bmq23suVnbctN/B8y3XyIlntd3+Cq8mV0bl7Sb7u15aX+wyxjwRfbbHN/faPpGyO2Wab734fdX7sNm7Pi3qag4X9ZW9rN/zMLmnCL+MYNyfzOnF8Hrma58pmaVNtb8lCm5dfJylsvxMjhdd5jUVzOhi7XC2bj0X5QvHFv4dUn9D3ZDC8Yr2lzWU8S6fevUrmhzfVvm+8uTk1WOOHemOFeK6e88W1ry9uO4b6TsYuU7Od3yx3c685SS9/TaKXxPbe6r0lgLZWsclY0YQ+zQtUpv6QTW/xZWWd0ZxUupRWTx2XvPLer2i+5nLCcGOIeUqqKwU7WD6udzUjTSXwb3ZzOjx5I4tTqOKPfGz2NVbHyw4tp93NJLvi1iqFR+o469uoL9KXLSX+0Ye94w5G6ruvUxdOrUffKtcSlJ/FrZkt1XU0nwu4cXej7era5rUmRivWqnKpQo/4beC7/MoMtaXQ6W9ZtFOXdvvz81fPrNRE7Tb6LH/ys5F9+FsX/wDFq/7x3Li1XntGvg6Dp+MY1m/ukmjHcFuG+S4k6nji7Sore2p+1cV2t1Bf4m0mQ9GPhvSxqoRWRVwo7O4jX2bl58vVfI41FNBp5iLU+T3Fm1eXnFmv1rPhtrSToO3WIyFXfle3ZPfw2a9iXwaiyE650RltLVu0rJXFjOW1O5ht37d0o77xfx+R2cVNDZHQOqKmIvpKrTku0tq8e6rDfv8Ac/Bkt4RaxeRmtH6j5bu0uqbpUZVO99P5uT8V3bPwaRLEXwV7XDbip12nny8p+znema3Bljht49PnCpTYz0fc3VXDW8odh61Vx9Sq6FGlNRlPdc6jJvdJtuW3Tr1RR+ucBV01qe7xM5c8KcualPb7UJdYv6HZoXVWQ0nmI31m+anPaNei+6pHy9z8U/An1mCus0+1efSYR6bLOmzbzy7pSniTxWvtV4qWJoY78nW0pp1t6vPOaT6R32W0d+uxWxe1fTXD/Xj9exN5G2vKvtVIUJqFTmffzU5dG/fHodUOEOm8bLtctl7l0112qyhQj85PcqYdfpNNTs4rNfLaU+XS581uOZi3nvCt+HGlbjU2bhDllGxt2p3NX3eEV5ye233+BI+P2chfZ21w1GpzQx8JOql3RqS23iv6MYxX1M5qviHgtPYl4bRVOi6uzjGtShtSobrq4t9Zy/afd7+m1M1JzqVJVJycpye8m31bJ8FcmfN2+SNojpHfz6zKLLNMOPsqTvM9Z+0OIANJSCzOM0+10/pGp4ux2/sUyuLm3r2tV0rijUo1Et+WcWmWJxc/5q6P/wDBP+5SKmf+Ninzn6SsYv4d/h9Xt9Giptq3IU9/tWTf0nEjfGqPJxNzC229um/rTiZz0bpba8rLzs5/3omH45f9KGX/APhf+VAqU/8AErf9MfVZv/sa/wDVP0QkAGszgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGT0p/wA58X/4yl/fRcnpR9cbg3/31X+5TKY03Lk1DjpeV1Tf9pF2elMv+CMH7q9T+5AxtZ/4hg/930aOn/2mX4Id6O2/8tLl+Csp7/VES0fqbJ6R1PDOYmVON1S54x7SCktpdH0ZK/R3b/l1Vgv0rKovwIfpnCz1Bqy1wkLinbSurjs+1qPaMOvey1EVnUZeLptX7oZ37Gm3jP2ePO5O6zOXucpeyUri4m51Glst37jxEn4naTnorV9zgJXtK9VKMZRrU+6Skt/kRguY7VtWJr0VrRMTMT1AAduQAAC0vR3jTt81lsxOO8rKyk4e7fdv7osq0tT0dqtOrl8viJy5XeWb5flun90mUvSP+2v7v07/ANFnR/x6+9WV9cVbu9r3VaTnUq1JTlJ+Lb3NjfQvuLehZ6i5eX1qVSlv58m0v4muN5QqW13Wt6sXGpTm4ST8GnsZXRmqczpLLxyeFuexq7bTi1vCpHykvFHut086jT2x0nbd5p8vY5YvMb7P0QsspUTSbT2NZ/Tdzltd5DB4inVjKvbxnVqxT35ebZJP6EYyHpHatrWkqVnjMZZ1mtu1SlNr4KT2KezGSvsvka2RyVzUubqtJyqVJvdtmV6L9FZcGTtMs9OkLms1mPJXhxx1eQAH0LLeyhlcnQp9nQyN3Sh+rCtJL8TrrXt5W/nruvU/pVGzznv0/irvN5i2xdjTdSvcTUYpHMxWvOXu8zyZrh7onN62yvqmOpuNGHWvcz+xSXm2bS8MeG2j9GWsb6NKnlbpvZV6tPm5n135Vvsl7zDZe1sdDyxfDLTM9r67ip3taK9qMEuac5fLfZHl4v68paFwNLHY5R/KlanyW1PvVGC6Ocl49d9vNnzOt1Wo1Vq4sPKLdPd4y2NNgxYqzfJ3fXwhJuJXFTBaShKN5NVr2UeajZUdnPbw3fdFfH6FMV9T8U+JDq/k1/kjDvfmnFqnCMfHeo/al3eBiNGaetVj63EHXdWdzaybqUqNWW8riTbSb67vr3L3PwRhtW611DrrK0cXY03aWU5KlbY+22jH3b7bb/gixpNDixWmKRxTHW09InwiHGo1V8kb2naJ6RHXbzl3XuH0Fhq8pZTUt5qG5X26FjS5I83k6km9/kZ3TOErZ+Cq6V4aWdGjH/2vJXM6i+KTaT+SZ2zxek+FlOFTM0qee1JKCnTttvzNB+8hur+JGq9Tc1K7yM7ez6KNrbfm6aS7l07/AJlyO0zx+VO8f1Tvt8IjbdWngx+318I+8ytbJYFY6lL8u690/YUmvbp2uMopv3bdZf2SK1lwUs0+2ucxlK73cp0lKMZP4ezsVJKUpPeTbfvZ8JMehmI9a8/DaPp+7m2pielY+O8rJr6h4WUW1a6Lvq686l7Uh+E2dC1Tw8T3WhLmPwytb/eK9XV7Ik2ndB6rz8FVxuIrSo/6Wo1TivnJo9vpcOOu97zEedp/d5XPktO1ax/2x+yX4ziBpCye9vhM3ay223pZWv8A/vUTTD8btK0qELa4ssnGMX/OygpT+bUluVfU0NjLC8hZ5fVVrC6l329lQnczT8vZ6E3u+D+jcPg7fM53Wlza0a0eZU6tn2U37uXdv7ihqdPobREZOKd+ntT8lvBn1VZmabRt7oWBYcWNA3C3lnI0H5VaNSP+yyRYvW2kb9qFtqTG1N/CVdRf9rY15yS4RKn2OIsNSZC57lyVElv80n9xicfwy1nl5uvjtP3FG2m96frNWEHt/WaKdvQukmvFa00jz2WY9J6iZ2iIt7t21eTwen9QW3+fY6yvqfhNxTfyff8ARmNr6Sx1GNF21a+ozt5KVvU9YdSVFrwTqKXTbptv3FA2nDXiXhJKrbXlPHy84ZJQ/BklxlTjVbv81mcfefs1rijUb+b6ladDOPli1MbeEyljUxefzMMxPk+8beH+Qq3sdUacpRlWjTUrynbU+ynzL9OMVJ7vxez372R/R/F/JWiVlqWE7uj9n1iEUqkf6Ue6X3P3k6oam4nYxbZnRlK/8eayuoqW39FOX4FQcV8os3n438dOXGGqdny1lUi06kt/tPouu3Tfx2NTR47ajH2OpitojpaJiVPU2jBbtMMzWe+JiYWpk8LovXVvK9t5UK1Tl63NvU5asH+0ns31f6UfgyutQ8LMzZylUxVWORopb7NKnU2+Dez/AKrZB8df3uOuoXVhdVravB7xnTm4tfQsTSvFi8tmqOetldQ22VejFRmv6Ufsy+5+8l/C6zSR+Rbjr4T1+aOM+n1H8avDPjCNaf1bqHS9b1VucqMJe1bXEfs/BvrH5ExnjdJ8QKEq2NqLHZfl5pxa6vp+lFbKa/ait+/dMml3a6Z1xiVVcKd5R22jWp9KlJvr3/ai/c9137eZTustJZTSV/G4pValS15/zN1D2ZJ+HMk/Zf3PwOcObFqrzw/l5Y/z4vcmK+CsTPr0/wA+TDaiweSwF+7LJ27pVNt4y74zXnF9zRjS3dM6oxOt8XDTOrowheNctvdpJc09ukt+6MuiT8JeOz6lfaz0zkNLZiePvo7x+1RrR+zVj5r+K70aWDPa09nkja0fr5wp5cMVjjpO9Z/TylgzKaZwGU1Hko2GKtnWqtbybe0YLzk30SO7R+m8lqjLxx2Ogt9uarVk9oUo+Mm/4d7LL1RqHG8OMQ9K6YVOrlZR/wA7u3FN05eb857N7Luj8TzPqJrbs8cb3n9POXmLFExx35Vj9fKHRPFaR4bUVVytSGazrjzUqUV0pv4PdJe+S3fgl3kM1Bq3U2rrv1fmqck5eza20Xs/i++XxbZ6tEaLyWrbqeQv69WjaOTc68/aqVpeKin3+99y+4t2hZaX0ViJTh2NlR22lVqS9ubXhv8Aam/clsZ+XPj01+f5mX/OnguY8N8td/YorHT/AAryl01PMXUMfBrdQilUqP71FfN7+4sTEYjSWhrR3c3Qt6qX/GrmW9SXml03Xwgt+vVkI1TxWq1HKhp+2UItbesXEE3/AFafWMfnu/gVzlMjfZS6ldZC6q3NaXfKpLf5LyR1+G1erj8+3DXwjr83nb6fB/CrxT4ysnWHFi9uozx+mY1LeE/Zd1JfnJJ+EI/o/Hq/gSjg/wACLrOUaOodW3U7K2lJVIW0oN1KvV9ZdVsu4gHB/UemdLZKrlsxibjJX9Nx9UhCKcY9+76vv7tn1Ls/yqa9zlD/AOzegZUack+WvkLlQj8dny/iyLVVy6avZaWsVjvtMxH1dYbVz27TNM2nw5ysu/0zpmFurW2sJUaTW1R0q04Sl029qUWpf2jw2mD03h6Djj8Nj7ZecaS3X9aW7+8qutbcbsvLe6z+OxcPKjGLa+ai395hbrhJqPMVu1zGuqlxUfjKM5/3pIyPw8W/i6iIjwjeWh2kxtwYZn37QtfNanwOOW99m8fbr9WVePMv6u+/3EbueKeg6D3eep1n/wB1SqP/AGSG2/o/Uqu/bat5ZeXqvf8AWRBbnSmjcflqmNzGoMvjasJbc1fG+y/etpPde8m03oz0fl34ck2mPCP7I82t1eOOdIrErF1ZxN0RlFGnDNajt6a71YwjTcn75NKX9oh19qThtV3da31Jkm333FzP/wDeGYqcGMBVwbzGK1fXyttFby9Ts1OSXntzJ/LvIlaaBxWWuJ22D1hZVbtd1teUJW1Rvy9rpua2CmlrXhpado98fPko5b6iZ3tEc/dL1y1Dwr//ALLvpfG9qL/9ozvtMxwbm/8AOdMZej/RuJy/2yI6n0TqjTb3y+HuKFN91WKU4P8ArR3RHS5TTY713reZj/qn91a2a9Z2tWPlC9sYvR4vGlWWQtN/9NOtH8HI7r3h3pG/nOtpDJ6fydFreFCtXq06j92/O/vSKDPsZSi94yafuZzGitWd65LfGd3v4iJ60j4cloZ3D4TAJU9ScOspYxk9vWbXJucfk2nH7zowmmdI5e4jU03rqriLzf8AN0MhTdOW/htUi9jFaV4lahwtN2lzUjlbCUeWVvd+2tvc31X4GayGntOa3squS0TH1PK0abq3GKnLbmS73Tbf4fccTGTHyvMx5xzj4xO+zqOC3OvPy6T8NkvsNf8AE/hxcUqWrrKWZxP2VV5ottbdNqiT93SSZeuhdeaZ1piHXx11CrFravQrRXaU35Si/D39xqpw14n3+nqqxeejPJ4afsTo1UpSpfDfvW/6L6fAm+rtGfyfoUuI/C+9cbaMe1q2tN7wdPbq47veUe/eL6rr5dMvWaPHa8VyRFbT0tHszPhMd0ruDUTFeKs8VY6xPWPd4rY15wb0Nq3etSoU8XkakW4V7TopbeLhuk/lsat8SdB6k4f5b1XJRm7ecn6vd0m+Sov4P3MvHTuqYa7wPreKvZ2WRt2pyhCX5y2qfrL9ZNr4NdH1JZpPK4zirpvJaP1ZQoRy9tvSuacZLdtfZq034eD93wOdHqtTpt4y84jrE9Y848neo0+HLtNOUz0nunylqXjdXanxv/Ec9kKH9Gs/4noyWvNZZK39XvdSZKtS/VdZpfceXW2nL/Smp73BZKHLXtp7b77qUX1TXxRhT6OKY7bWiIY02vHLd9bcnu2234s+AErhtT6DmYsLTGZ6yUoq+7WnUcf0pQ2kt18GbE3+TlU328erPzf05nMrp7K0snh72raXVP7M4P7n5otWh6R2uYWXY1bfGVa22yrOi0/onsfPekfRWbNlm+KY59YlqaTWY8dOG8M36Zt3Qq5nBWycXcQpVZy2fVRbSSfzTKBtqkqNxTrQbUoTUk14NM9uos3k9Q5arlMvd1Lq6qv2pyfcvBJeCXkeOzo1Lm7o29KLlUqzUIpeLb2NfSYPw+CuOZ32hS1GXtcs3jvWh6QPZ3UsHlYpJ16EovbxW0Zr/wAwqotX0g+wtKuDw9KopStrdykl4JqMF91Pf5lVHHo7/bV26d3u35fo61n8af8AO59Tae6bT9x9lOcvtSk/iziC6rAAAHKnOVOpGpHpKLTXxRxM1onBrUmqLHCu8pWauqnI61V7Rh72eWtFYmZexG87OWtNUZXVuXWTy9SnOuqUaScIKK2ivcSzi2nHS2kIv/sb/wDLpGA4o6VoaO1hXwVvkqeRp04Qmq0Ft9pb7Pq+q+JJONsOyxWlKO/2bBP+xT/wKM8E2w9n057fJYji4cnF15fVx9HP/n7P/wAJL+9ExfHP/pQy3/wv/KgZb0cI768qPytJf3omG43f9J+Y90qa/wD0oENP/Erf9EfVYt/sa/8AVP0QsAGqzgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHox0+zyFtU/Vqxf3ov/ANJuj22k7G6S6U7tfSUZf4GvVN7VIvyaNkONm15wejdJ8y3t6yfx2X+2Y3pCNtXp7ecx84aWj54M0eUKv9HyoqfE2zi/06NVf2G/4ELz1N0M7fUl0cLmpH6SZI+C8+z4lYh77c05x+sJI8euacMfxIyka9Lnp0shOUoP9KPNvt80Xa8tXbzrH1lWtO+nrHnP0hHJynOTlOUpS8W3uziSjibmsDntTTv9O4ZYm0lThF0VJveSSTfzIuWqTNqxMxsrzG0gAOngAABkNO5e6weZtspZySq0J8yT7pLxT9zXQx4PJiLRtL2J2neFy6m0tZ8SMetVaQVOORkv89spTSk5efXuff1/S+PQq3LafzeKruhkcXd21ReE6TPNi8jfYu7hd4+7rWteD3jOnLZonFpxk17b0o0/ypRqqP6U7aHM/i0luUa49Rgjhx7Wr3bzMTHx57rFr4svO28T5dEd03o3UuoKyhjMVXqR32lVnHkhH4yfQyWu8fgNPY+30/ZTpX+XhPtL+9hLeEH4UoeD28WcNQ8StZZyjOheZipCjNbSp0IqmmvJ8q3ZEG23u+8nxxltO+TaPKP3R2nHEbV+cgALCILv9D/Gqvrq8y0kn6jbbx3/AFpdCkDYD0Qai59QUFJRnKNJ/L2lv9WjP9KXmmkvMLWirFs9YlW+f1/l/wDKnkdY4+rGFzOvONPnipRVPblS2fuRibapldc61toZC7da7va0YSqS6KMV37LwSSfQwV3Fwuq0X3qck/qZ/hlk7bD64xuQvHFUKcpRm5dy5oSjv95PbHGPHNsdecRtHw6Qii82ttaeW7McZ9QflHUX5FtNoYzEpW9GnHucopKUvf1W3wRj+GmcsNNZC8zlf2763tpRsKbjunVktuZ/BEav6jrX1xVcudzqyk5ee77yScLtD5PXup6WHx+1OH2q9aX2aUPM87LHjwcFvZ25/f5veO18nFHVGry5r3l1UurqrOrWqycpzk922zpNvKPo0aNt7V07i+v7mrt/PKXLt/VW5rvxe0FeaA1M8bWqOva1U521ZrZzj4prwa7iLS+kdPqLzTHPOHeXS5cVeK8IWcqcJVKkacIuU5NKKXe2z36cwt/qDL0cVjKcal1W35Iymop7LfvfQtzgrwwzVlrOlltS471a2sk506c5xcqlTZqLSTfRPr5dCbU6rHp6Ta09I32cYcF8toisdUm0Dw70/oDSdfV+tqELi/oU1VVGfWNHfpGKXjJtpb+BVHEnihqHWV1KNSr6lj4v83bUeiS97XeXB6UOo7O10bDT6nF3d7VjNQi+sYQe7k/i9kvgzWMz/RlLaiv4nNztM8vKPJb1toxT2OLlEdfOfNsDwhngdDcLK+ubtRrX9y5Rin9rpJxVOPx72/Iq24udRcT9cwhVqOrdXU3yR/Qo00t38EkiMVL27qWNOxnc1ZW1KTlCk5ezFvvexavovW9Opq7IXMn7dG09n5zSf3EuTF+Epl1M87c/l3Q5pk/EWx4I5V+/fKxry80XwdwMKNvR7W+qx9nZJ17hrvcm+6O/y+JUmq+MmrsxKdOzuI4u2fdGgvb298n1PHx6uq91xNyKrbqNKNOFJeCjyRa+u+/zMvLhVRuOF9PVePykq92qDr1KPKuRxTfMk0900k+/yZXwafT4aUzajna23OefOUubNmyWtjxcq135R4QrS7vr27qurdXdevN9XKpUcn95IMZ/IunaQlfXWalcfpRoxjGP3si5YfBnhxW1xkale6qTt8XbNKrUS61JPuhH/HwNXPemLHN7ztEKGKtr34axvMvGtYrE1I/yVr5ij+tG5uFUhL+p3EzwHGHOTodhmtMflCk/tToUpR3+MduV/cWXl7jhxwyoKCtrO0quK5adJdpWn7+u8lv72kQe+4+491GqGnbmrFPpKVxCG6+HK/xMK2SdXG9NPNo8ZnaWpFPw87WzbT4RG7lHE8JtaU1RtqMsJkqi2UdnRmpf0JexL4LZkI1Xwd1TiZTq42ksvbRXNvQW1WK99N9fpuiUz404HI1I08lpmrGl3NzqQrpf1XFFj6S4haQzMKFjYZS3p1IQ5adKpB0p7eXtdH8FJkdtRrdHEWilpjwmeLb4xzSdlpdRO02jfxjl+ktWMPlMngsj6xZVp29eG8ZRa6PzUovo17mXHpLWeM1ZaSx2RoUqd3ODhUt5veFaL8U292l38u+6fVPysDiFw609q5OvcU3Z5CS9m8ox9p/0lvtL49/vNctb6OzejMnGF2nKlzb0LulvySa6/GL9z6lrHn0vpWvL1bx84QTj1GgnfrSflLu4haQrabvFcW7lUx9WW1Ob+1Tl38kv4Px+qUs0pk7bXumXpbNVNr+2jzW1dreTSX2l70kk14r3oyWh9Q2essNUw+YjSneqnyVoTfKq8F3Sj5bNJvbqmt/Pau9YYC/0bqCnK3r1Oz5u0tLmPR9PB+Ul4r+DLGO9s35GXlkr0nx84RXrXFtlx86W6x9k7yN++F+jqeIsK9Gpmb7mnOtBPaPeudb+S9mPv5n5Ef4ZaN/LlZ5nMqUrRTbp05Nr1iXi2/1V4+fcvFrw6Yx+R1/qyd5lq0p0qajK5qJKPRdI04+Cb22Xl1fgT7iJqqjpTHU8bio0o31Smo0YKK2t6aWym15tdyfx8iPLx4/ycX8S3OZ8HVIreO1v7FekeL16+1zaaXoKys4Uq+RcEo0UkoUo7ey5pe7uivn5FH5nK5DMXru8jczr1Wtlv0UV4JJdEvcjMaM0hqTXGYdvibWrc1JS5q1eb2hDd98pM2Q0BwB0/gHC91FdrIXMevZwTUV89zqLaX0ZTa072/WXE9vrLco5fo1v0joXVGqqnLhsXVrQX2qktowj8WyYR0PoXTEktaasjc3sft2GNXO4+5z7ty+9dWejMVjezy+SqYzGz+1QV26Uaj+ENpyXwZV17rPg3p2p2uCwMMjX84275f3qnX7iGvpHJqf4dbbeUfeUk6SmL27Rv5z9oRqjxLwmn6UoaM0dC0m1t29eTlJ+/wDW/tbEayvFHW1+9nmJ2sdtuW2gqfT4rr95aVnx605OfJcaauaFN9HKMoTS/q7IlGPsuFnEyjN29pZ1rnl9pQi6Nen79o7N93f1Rx21dPPHn08x5+1KTs5yxw4s0e72Wu+OvMNkLGqs1l8vb3+zlCrzdrTm/eu9Ec7atv8Az1T95k+4wcNL3Q97G4oyqXOKry2p1nHrTf6svf7/ABK9NvBfHkrx0neJZeWt6W4bRtMJLpfXOptO3CqWGTrSp/pUa0nOD+T/AIF26d1Bp3ivgauLy9nCN7SXNKi37cH+vTl37ea+u5XWleFVTL6Knn7jJ+rVp0ZVbejyJx2jv1m9+m/K9uhFeGlS8o6+w6sW1WldRhsuu6b2afu23M/UYcGqi1sU7Xr3x3SuYcuXBMReN627vGGZt7/UfCfW9e2oVnyxknKP6FxSfVP3Pb5pkp49V9OZ/AYfWGIlTpXdy+zqxi0pT9nrzJdzi01v47nH0oqSjncPU6bu1nH5KW6/FlO7vbbd7eR3pqRqa49T0ttz8/KXGe04LXwRzjdY3Dni3qDS9SlZ3lR5LFb7ToVusox/Zb/B9CyeJXBvG6l0bHiLoGW1GtQ7erZcu2+32nHyfR9DW83D9E7VVtV4Y08NzQnVsq04VoPvUZttdPJptfIj9IRGkiNRijad+fnHm90u+eeyvPu8mnrTTaa2aPhdXFHgnqWOrbu70xZUr7G3VZzpqFWMHS36uMoye67+8qDL4+6xWTuMde01TuLebhUimns170aGDU4s9d6WiVXJivjna0bPIevEZC6xWSoZCyqulXoTU4SRLuDPDnJ8SdT/AJKsZqjRpR57is+6Ef8AE2kl6LWgbbGKlcV7+d047dtGo1s/PlItTrcOD1ckusWC+TnVphnr9ZTMXOQVtTtvWJubpU/sxb79i2PRl1fUss7LS13U5rW93lbKT3UKu3WPwkum3nsQ7i/w8ynDrUzxV9NV6FRc9tcRWyqx/gzCaFuYWescTd1LmNtToXdOpKrLuik92z3Pix6rTzWOcTD3Fe+HLFu+Je3UMchorX+St7C4lQr2dzUhCUfGL323XitmctC6vyen9fWep/Wak66uFK4k31qRk/aT+R5OIWXpZ7W2Wy1utqNxcylT3/VXRfcjCUISqV6dOK3lKSS+bJq0i1PXjnMc0c22t6vivz008ZThq3D52k91f2jjJ7d7g1t/ZaKANkPTPl6vaaSxkmu0o0qsn167bQj+KZreVfRluLS0/wA70urjbNYABfV0p0JiMVqCF7h7m5o2WSqRjOwr1ZbQlJd9N/Hfv9xjtQaZzuBuXQymNr0Gn0ly7xl7010ZiE2nuns0TLAcTtY4a2VrQyfb0FHlULiCnsvJN9V9SDJGWs702nyn90leCY2tyRSzsby8rRo2trWrVJPZRhBtstzQ+k7TQdi9Z6xnCnXpRfqdmmnNVNujfXrLu6eHe/Jx6vxi1lKm6dGtZ0E+/lt1L+9uQrM5fJZm7d3k7yrdVmtuab7l5JdyRBfHqM8cN9q179p3mfpslrbFj515z+jt1TmrrUGdusteP85XnuoruhHuUV7ktkYwAu1rFY2hXmd53kAB68AAAPq336d58JPw0yunMNqSN9qfFSydnCnJRop7e210bObTNYmYjd7EbyjUd5VFu222u8sv0gpKGZw1mv8AqMdFP96X+BAaSp32oIK2pdnTr3S7Omv0U5dETb0hpp8R61OP2adtSSXknHm/iVck76nHHlb7J6csNvfH3Zn0YYJ6kytVrrG0SXzmv8CHcYXvxKzfXfa45fpFL+BP/Rfovnzlzt3djTT/AH3/AAKx4hV/WddZytvvzX1br/XZVwc/SGWfCIhZy8tFjjxmWBABrM4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANjcilfejdKT9qTx1OS38HCcP9xmuRspwrhDL8Dp2VX2o+r3Fvt7/ba/vIxvTMbVxZP6bw0/RnO2SvjWVC6GvfyfrHE3m+yp3dNv4cy3JJx9t1Q4n37XRVaVCfz7KKf3pkEpScK0JdzjJMtH0jaVOpncNlaT5o3uOjJvzae6+6SLmTlq6T4xMfSVSnPBaPCYn6ohrPTljgrPE17PN22Sle2yq1YUf+pl+qyNAFusTEbTO6CZ3nkAA6eAAAAAAAAAAAAAATfgtqynpHW1C9uub1OunQuNv0U+6Xyez+RCAR5cdctJpbpLul5paLV6wsz0gdGy07q2rlLKlvicnLtqM4bOMZNbyj0+O69zRWZZ3D7iVQtcL/ACU1hZvJ4Kfsxb6zor3eaT6rqmvDvZ7KvDrRmoa0q2kNcWNKMuvqt/vCUPdzPZv6FLFntp4jHn35fzbcp9+3SU+THXJPHj7+7wVKbHehdf21vWz9uoL1lxpzcv8Au+q/HYgkOD6toTr5jWmn7K3h3yVbnk/gjFx1XZ6LcrbQd5UqXE9lcZKrSSlNL9GEX3RGqmusw2xY55z389vm9w74MkXvHRvBK87Q1P8AS41HY5XVVhibOpCrPHU5KvKL32nJr2d/ckRnL8bdf5Gw9TeSpWyceWdShRjCcl8fD5FcVZzq1JVKk5TnJ7uTe7bKPoz0RfTZO1yzG/dss6zXVzV4KRydlnc3FndU7q1rTo16UlKE4PZxa8UT9cZtcq07BXlrz7bds7eLn8fLf37FdA2cunxZtu0rE7eLPx5smP2JmHpyV9eZK9qXl/c1bm4qvmnUqSbbZ5gCaI2RhI+HWp6uk9TUcpGDq0dnTr009nKD8veu9fAjgOMlK5KzS3SXVLzS0Wr1hshqXBcO+Is1mKWfpUruNNRlVhWjBuKXsqUZ7dUum/uMJrHU2nNHcNqmi9O5JX93VUoympcygpy9qTkum+3TZb95RW7QM/F6N4OGtrzNY6RO3cuX1vFvMViJnrIbacI2sNwTtrvH01Uqqxq3Tilvz1Pbl/spfI1LLs4F8U8bp/FLAahqVKFGjJytbmKclHdtuMkuve9017zn0xgyZsEcEb7TE7eL30flpiyTNp23iY3VHmJ5bIV6uXyUbmrK4qOUq9SL2lJvr1ZjzYvjjxW0jmtC1NPYbkv69ZpRnGk4woJPfmW6XV+410LejzXzY+K9OHyVs+OtL7VtuzOmdMZzUleVLDY+pcuG3PLdRhD4yeyRNrPghrSot6rsbeXk6/N98UzNYi+y+K4DWt1peUo3LuG7mrRjvUgueSe3l3Q6+9eZXGYzusqdSEcplcvTlUjzxVWtOLa8yv2upzWmMVqxETMc+c8vkm4MWOI44mZmN/BbenMVxd0fHsIUaGbx9P8A6n1mLkl+w5bNd/d1XuLKVta6iwKhk8dJUbiLhUtrmntJNd8ZLwkvBo1m0tm9fXFw6GByeWqyXWUYVW4pe/fp9S5dGZ/iZaypx1LgKd9ZyklKrRq0o1oe/lT2f0395jek9FbeLxNYvHfHqzLT0GpiN6zFprPxiFV8R9GZPh5n6F/Y15zsp1Oa1uF3wkurhL39fg18yZUbrGcQNKyp1odnUeyqKK5p29RLvj59za802u9blxat0/Z6hwd1hclB9jWjtul1hJdVKPvT/ivE1cwlzd6C11Wscin2dKo6F1GPXmj4Tj8OkkS6XUT6Rwb9MtEebFGjy7daWWRYxx3DnRkpVpqvW35m0uX1irJPZLxS28fBb+L2Ihw10ZkuJup7vLZOu6VhTq893WilvJvdqnBfBbeSXyPBr3L1tZattMTiW69CM1RtlFNKpUm1zT+vT4JG1midKWukdMWWn7OPNKlH87NdO0qyW8pP4v7kiTUZraLD2k/xb/o5x441OXgj+HRktNYvHYXH0cZhrOjZ20FtGnDpv72+9v3shevLzibl5SstKULPE2zjtK6ua8ZVpfBR3Ufi+vwOjWGa4iXVWvZ6N0tvTp997e1IU1P3whJpte+X0KU17qPjFha8f5Q3uRxsavWLoKNOnL4OHQo6LR5Ml+O01m0+M7z8oWNTqMda7RE7eXKPm9+c4I8Rr2vK6q3dtla0urnO66v5z2K31RpbP6ZuvVs3ja1pN9U5bOLXukt0zMae1fxBvMvb2WJ1Dlat3Wny0qfrDfM38XsXPnLrVOR4Cahhr+0p072hFO3nJxU57Thyyai9k93tv4ps2rajPpZrXLNZiZiOXKec7coZkYsWaJmkTG3PxhrOZHD1svjKtPN431mg7aonG4pppRl4Lcxxe/CXino/FaEhpjUthNQpbqW1uq1OvvLmTa6dU/4F7U5L46b1pxeSvhpW9trW2WXq2rDVHAK5yGVpRp1LjGRuZdOkJpKSkvLqvvNPS5uMvGSnqbDS07p22q22Onsq9WolGVSKfSCiuij0X0KZKnorTXwY7ccbbzM7eCfXZq5bxw89o238V9cNNRYLUXDz+SeVy0MfednK29qSg5xe+0oyfTdLZNNrdI79MaP0Vw+yf8oMlq2jdSpRlGgpRUeVtbNqMXJyez6d3U1+Prbfe9xb0bztFLzFbdYjbv8AMjWcq8VYma9JSbiZqupq/U9XI8kqVtCKpW1OT3cYLz97e7fxIwAaGPHXHWKV6QqXvN7Ta3WQy2ltRZfTOTjkMNdyt6y6SXfGa/Vkn0aMSDq1YtG0vImYneFs5Xj1rC9xs7SjRsbSrOOzr04yc15uPM2kyqatSpVqyq1ZynObblKT3bfmcARYdPiwxtjrEO8ma+Tned2yHoKZyysNY5fFXFRQr31vF0N/0nFttG4GSrRlyH5b469usfeUryyrzoXFKXNCpB7NMtPH+kPxOtMarJ5WhcbdFVrW8ZTS+JlekfRmTUX48c/Nb02qrjrw2WB6c+Stat7p/GwcXcU4VKstu9ReySf3mshedxl9HcY6dKtqfKrT+q6dNUvWZL8xcbdF07kYW54C6wdV/k29wuRo79KtK+gl97LGly49JijFlnaY8ftKLLW2a83rG+6pi1vRs0TT1PrWnksm1Sw+M3r3FSfSLaTaj9x6I8Isfp+HrutdVYy3t4dXQtKyqVZe7oYrW3EO1ng1pbR1m8Zhov257/nK/vbLF8vbV4cXf3+COtOzne/yePjxrSOuOId5lLfdWVLahap/qR8fm92QIAsY8dcdIpXpCO1ptMzIADtyAAAAAAAAAAAAABJtCaZs9R1L5XebtcXG1oOrF1mvbfkt2v8AH3EZBzaJmNonZ7WYieaScNLSN3xBw1vJ7xV3GTa8ovm/gZHjfcRuOJmVcH0punS+cacU/vR6eAVDtuJljJrpSpVpb+T7OSX3tET1TeyyOpMlfze7r3VSf1kyrG1tXM+FfrP9k/TB75+kf3Xn6M1s6Gkr+8qdIV7vl390Yrf+8UHla3rGTuq7/wCsrTn9W2bB8MJfkvgbUvWmt7a6rr4+2l/cRro3u2/Mp+jvX1OoyecR8lrWzw4MNPLf5vgANhmgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABsF6Lt5zafy1pv1oXEaii/wBqLf8AsGvpbnox5BUNVX+Pk+lza88V+1F/4NmX6Zx9por+XP5L3o2/Dqa+fJWOoLKpjs7f2FWLjO3uJ02n7pNFga858hwZ0df783qk6tGo9uqcnslv8KX3mJ46WULHiblI0+savZ1n/SlBc39rczml5rL8Cc/jpxcp42tGtTflvJSX3Kp9T3Jli+LDn84/+6Nvu8rSa3yYvKf05/Zz4JXnC62w2Xjrqip3k1+Yc4SkuXZ9I8vdLfYqqpy9pLk+zu9vgfIpyaSTbfckfZxlCTjOLjJd6a2aL1MXBe1t55/p7lW1t4iNujiACVwAAAAAAAAAAAAAAAABdO4AD7u/NnwAAAAAAAAAAAAAAAAAAAAM3pnVOb066ixV46VOo0505RUoNruez8evejyZ/M5HO37vcnX7atyqK2ioqMV3JJdEjHg4jFSLccRz8XXHaa8O/JbkMzd6W4K4mvhZKnc39efaV4xXNTfNLfr57Ril5dSC0dUaxsZwvI5nK0uf7M5VZcsvr0ZJ+FvEHHYLGzwOpcashipVO1p+wpunLx9l9GvvX1PVxu4jYjV9pY4vB47sLW1m6jrSpqm5NrblUV3JGfjramaaTj3iZmZty/zyW72i2OLcfSOiU8LOMc728p4nVbo05VGo0byMVGO/lNLot+nVfMx3pTYGFtlMZqCkl/ncJUKzT73HZwfzi9v6pSi6PdF5a5v55n0cMLfX01O6hXpwUpP2pOLqQ3/divoQ20WPS6qmbFG3FymO7okrqLZ8FseSd9ucPL6IOnll+JzydRb0sVbyr7ftv2Y/jv8AIuPjtxcsdBVZYzE06V3npwT2k94UE+5y9+3gV96F91TsJ6vv6m3Lb2UKkv6MeeT/AAKH1PlrvO6gvsvfVZVbi6rSqTk/exfSRqtbacnOtYjl59XldROHTxFOs7pfLiJxR1FeV69pmspVlD85OnZx5YwX9GK6IvzhvcXvEHgFmqesqU5StqdWDuK0eV1VFc0Z/FPZb+OxRfo/cRqHDnVdbIXtn61Z3NF0qsPEm/G30hP5V4Cpp3TGNeMsa3SvUWylNeSSS2R3qtNbJauOlIiImJ38NnGHNwRNrW337lD2V3c4+/pXllXnRuKE1OnUg9nFruaJBqzX2qdUWVKyzGRVW3ptNU6dKNNSa7nLlS3fxIuDTtjpa0WmOcKkXtEbRPIAB25AAAAAAAAAAAAAAAADkqlRd05L4M4gD65Sl3tv4s+AAAAAAAAAAAAAAAAAAAAB9W2637iyOJtHhtDSWGlpGo3k+Vete1Nyl7K3c0+ie/dsVuk29kt2fCO+PitFt5jb9fe6rbaJjbqtj0ftrS01Rl5pKNvZJcz8HtOe3/6aKok+aTl5vctrTdOniPR+zOQbca2Rq9lH3+3GK+7tCscHZzyGZsrGC3lXrwppfFpFXTzE5cuTz2+ULOaNseOnlv8AOWwupbb+T/o/VbSb2qrH0ofOcoN/3pGtpsf6S9/G10Pa2NOKh67dxaivCMIttf2omuBV9CRM4JyT/NaZTek52yxT+mIgABsM4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJfwcyUcXxGxVepJRhUqOhJvuSnFx3+8iB2W1WVC4p14PaVOakvinuR5scZMdqT3xs7x3mlotHcuT0pMaqeVxGWhFKNalOhJrxcWpLf5T+4xHo8V4XGdymnay3pZSzlHbwTSab/dlIsPjbRpah4UvL04xbo9jeU3F77QlsmvpUX0KS4WZn8g6+xORk2qardlU2/UmnB/czE0E2zejZx/zV3j4x0aWp2xayL907T8J6sVjL2709qOjfW3KrqwuOaHMt1zRfijnqzO3updQXebyHZ+s3U+afJHlXdt3fIz3GrDxwnEjK2tNJUqs1cQS7kprma+TbXyIYbOG1Mta5Y74Z2SLUmaT3SAAmRgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC6PR20foPVeOykdTteuUKkOzUrh0vYafVdVv1ReVPhPoTWuPxthaXzqYjDqdNW1pW3Sm9uspbtt9PvZpNGUo/ZbXwZsN6E2rI43WF7pi6rRjRycFOlzPb85FPp80Y2v0uavFnx5J5dI7o8V/TZ8fLHase9bVjwq0Nw0yVXKQzFSzx+QtpWle1u6/sVlL9p7de8pL0kNL8M9M4fHUtJumsnVqNzjSuXW/N7LrJ7tL3Ge9OXU8LvU+M0vb1N1YUnWrpPdc8+5fQ1ubb722daHT5b8Oe9593j4budRlpG9K1h8ABrqQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9uCyVxh8xa5S1VOVe1qKpBVIqUW15p95031zVvb2tdVVHtK03OXLHZbt+C8DoMrpLF1M1qbHYql0lc3EIb+S36v6HNtq72l7G88lj8VYVMFwo0lpyc12s069WK+HOt/nWa+RHuA9ir3iXj3LdRt41K2+3c1F8v3tGU9JPIRudfxx9PlVOwtadNKL7nJc7Xy5kvkST0VsVGVXM5ia2lDs7enuvNuT2/dj9TGtknD6Ntk77RM/G0/3aVadrrIpHSNo+Uf2Yf0nMiq+qbDGxb/AM1teea/am/92MSpCXcYsosvxIzFzCanTp1vV6cl3ONNKC/ukRNDQYux01KeEQqarJ2ma1vGQAFtXAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABsjwtdLU3Bz8kzcXNUatnPd9z68rfwUofQ1ynGdvcyhJOM6U9n5pplyejBlIwv8phqjX56MK0Pft7Ml9JL6EH4y4lYfiNlaEIpUq1RXFPbu2muZr5NtfIxND+Trc2Duna0fHq09VPa6bFk8OXyS3jrNZ3S+ldXUoL/OLd0az268y2fX+tz/QqItzR0v5S8Dc7gdua6xU1c0I+LXWX0SVT6oqMvaH1K2xf0zMfDrH1VdV60xk8Y/tIAC6rAAAHbG3rygpxo1HF+Ki9jqJPgNdahw1OjQt7qE7elHkjTnTj9nffZS23XyZxebRHqxu6pFZn1p2RzsK3+hqfus5K2uX3W9V/CDNo7DITu7K3uVOcY1qcaiSl12lFNL5blV8QuI2dstRXWMxjo29O3fZznOmqkpy26veSey37tjN03pDJqLzSKbTHn/Zfz6KmGsWm++/kqoHKpOVSpKpN7yk22/Ns4mqzgAAdkaFeSTjRqNPu2izl6tc/9nq/uMnmg+JOcxl1j8ZcSp18dGUaPJ2ajOMX0TUls21v4+RsDSqOpVjCUtk2kZOt9I5NJaItTeJ8/wCzQ02ipqKzMW228moE6FaEeadGpGPm4tI6yXau1/qHUFKvY3VzTjZTm9qUKa7t+m8vtP5siJp45tNd7xtKjeKxPqzu+pNvZLds5uhXT2dGon/RZys7mtZ3dK6t58lalNThLya7i2uFWt8rl8vPF5ScardN1KdWMVBxUerTS6PdEOpzXw0m9a77eaXBjrkvFbTtv5KjdGsk26VTZd75X0OsnuvOIGZv7+8xtrONtYxcqLgopymt9m233b+SIESYbXtWJvG0/NxkrWttqzu+pNvZLds7XaXSeztq37jONvVqUK8K9KXLUpyUovyaLX4c8Srq4yVPGZ+pBqttClcRShyvwjJLZbPu38DjUZMmOk2pXi+LrBSl7cN7bKq9Vuv+zVv3GcKlOpT27SnKG/dzLY2xlcNfpyNdeI+fzWWzle1yzhFWtWUadKMVtFeHXvl026tlLQekbau0xFdojzWdXoo08RM2338kVO1W9dxUlRqNPuai+p1Fq8GM5lru6qYuulVsaFFPtOVRdPbpGLfin3dfiXtTlnDjm8Rvt8FbBjjJeKzO26r1b3DeyoVX/UZ1tNNppprwZZ2ruKN6712+n+WnSpNp16i53Ufmovol79tyt7+7r317WvLqfPWrSc5y223bGC+S9d712+O7zLWlZ2pbd0HZTo1qi3p0qk0vGMWzrM5p3VebwNN0sddRjRcuaVOdOMot9z710JbTaI9Xq4rtv6zEerXH/Z6v7jHq1z/2er+4zZrT+TllcLZ36/Nu4pRm1vvs2uqXu33K34h69zeI1RXx1i6EaNGMNnOLlKTcVJtvfzZl6b0jkz5JxxTaY81/NoqYqRebcp8lWdhX/wBDU/dY7Cv/AKGp+6yZ/wCVDVX+mt//AML/ANTMaX4q5F5SnSzdOnO2qvllOknFw38Wt9mvcWr5dTWszGOJ+P8AZWrTDM7cU/L+6sqkJ05cs4Sg/KS2ZxJ9x2W2tl3P/NodV49ZEBJ8GTtcdb+KLJTgvNfAO/H3dzYXtG8tKsqVejNThOL2aaOgErh7s7lb7N5a4ymRrSrXVxLmqTfizwgCI2A7vVrnZP1ers+q9hnSWDofiNnbLJWVld1Y3Nm3GilyqM4LpFNSXV7dO/fuIs1r0rM0jf8ARJirS1trTsgat677qFT9xiVtcRi5SoVVFd7cHsbZq8lGLm6k+VJ77S8Et3+BQmqOKWo8q7q1ozoW1jVTp9l2UZScX06ya33fuM/Rekb6uZ4abRHn/Zc1Wipp4jitvM+SBAA1WeAAAAAB3TtbmFpTu50KkaFSTjCo4+zJrvSZ2YmxrZLJW9hbrerXqKEfn4l8ax0nbXXD78k2NOMqljRU7XwblFbv95c7282inqdbTT3pS380rOHTWy1taO5r6AC4rAAA5RhOS3jCTXmkcuwrbb9jU28+Vkm0brzO6XoStbGVCdrOfNOlUpr2vP2l1X1NgtFavttVYKnfW05U6kfzdeg3u6U9u7fxT23Rna3W5NLHFwb18d13S6bHnnh49p9zVMFo8adFqxuKmocZSUbapLe5pRWyhJ/ppfqt9/k/iiri1p9RTUY4yU6Sr5sNsN5pbqHOFKpNbwpzkvctzgSDTWsc9p62nbYu6hTozlzSjKlGW77u9rdfIltNoj1YcV239Zg1RrPupTf9VnGcJwe04Si/JrYvm71/c0eGtLUdOhH1qtNUVScm4xqNzW/m17De3mymdS6gymoryF1la8atSEeWPLTjBJeWySKul1GXNvxU4dp267ps+LHj24bb7+TFHKnTnUly04Sm/KK3OJkMFmMhhL31zG1+xrOLjzcqfR+5lud9uSCPN4+wr77djU3/AKLPvq9f/QVf3GbBcJdYZHU+OupZLl7W2nGDlTXLF7xbT5e5P2X3HTxj1XktOW2NeNdNVLipUjU547pKMYNbLw+0zJ/1LL2/YcHP3+W/g0PwVOx7bj5e5QXYVv8AQ1P3WffV6/8AoKv7jJj/AJTtUf6Wh+4/8T5/lM1L4ytdvJU2v4lztNT/AER/3f2V+DB/VPy/uh8revGLlKhUjFd7cXsdRektRUNTcNcpeU6bp1YW1SFelzbqE+XdfJ7Nr4NeBRY0uovmi3HXhmJ28Xmow1xbcM7xMbgALauAAAWh6NuP9Y15PIzUeyx9rUqOT7ouS5E/lu38iry5NFJ6W4D5vUUGo3eVqer0ZNdVHdw6fFOp9Cprp3wzTvty+axpo/M4p7ufyVdqvJ1MzqXI5Sp9q5uJ1NvJN9F9DY3hAqWlOC35arJRfZVr6fTfd9eVfPkj9TWrEWVbJZW1sKEXKrcVo04pebexsjx9vaGmOFNLT1nHaN26dnT/ANXTUZSf9mP1M/0rHaTi0sfzT+kLWhmaxkzz3R+stZak3UqSqSe8pNt/M4gG2zQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABJuF+Zjgtc4y/qzcKPa9nWa/UkuV/iWj6UOEU7fGaiow35G7atJLpyv2oP686+hRKbTTT2aNnbaMeIHBCNKThO6q2fLv4xrU30+bcF+8YvpH8jUYtT3b8M+6WnovzsOTB8Y98Kg4D5lYvXtvbVdnb5GDtZxk9otv7O/u5kiM63wk9O6qyGHnLnVvVahPbbmg+sX800YujUq2t1CrTbhVpTUk13pplm8cKUMzjsDre2ppQyNsqVfbwnHu/CUf6het+XqYt3Wjb4xzj9N1Wvr4Zj+nn8J6/ZVoALisAAAAANlNMtrT+N2/7LS/8tFE8QltrXK/+IkXnpn/m9jv/AAtL+5AoziD/AM9Mr/4iR8/6J/3GX/O9sekf4OP/ADuYEAH0DHAAB7MJ1zNkv+/h/eRtPbVOlP4R/A1Ywn/LNl/4iH95G0FtPpS/q/gfO+nfax/FteifZu1Vn9uXxOJyqfzkvizifRQxQmHCH/nlT/1FX+6yHku4Sf8APKl/qKv91lXW/wC3v7pT6b+NX3wjma/5Yvf9fP8AvM8h68z/AMsXn+vn/eZ5CxT2YQ26yH1Np7ro0fAdPF78M9Ufl/DKhcSTvrWKjV5n9pbbRqL8H79n4mM4vaW/KFlLOWcG7u2gu2il/OUl3fOK+74FV6dy11hMtRyNo1z03tKL7pxfRxfuaNjcPfWuWxVvkbVqVtcU+ZJ7NrzTXmnumfN6vFbQaiM+P2Z7vq2tPkrqsM4b9Y/zdrVjrO5yF7Ss7Sm6larLljFE91dd2+kdNx0li6yne10p39eK2fVfZ+fd8P6TRI8rY4Th5Svs9bRnWvbybp2dKVNctFtbtJ7veK3T36NpJeLKcvLmveXVW6uakqtarJznOT3cm+9mrjvGrmLx7EfrP7R9VC9Z08TWfan9I/u6gAX1QAAGw/Dt7aMxj/7lfwKi4r/8+7/4U/8Ay4lt8O/+Z2L/ANSvxKk4qqT11f8Asvup+H/dxPnfRf8AvMnx+rZ1/wDtsfw+iKg5csv1X9CXUtL06PDi7z99SrU7qVaKtU3suTmSba97b/dN++StNt+/kyK0m2+zE6sz1TUF1a3FW3hQlb2sLf2W3z8v6T973MKAdVrFY2h5MzM7yAA9eAAAHtwX/LVl/wCIh/eR4j24P/lqy/18P7yOb+zLqvtQ2WuZP8n1f9S/wNXZfafxNnr2S/Jtfb/Qy/A1hl9p/EwPQHsX+DY9M+3V8AB9CxQAAADlCMpzjCK3lJ7JAT/hRbUMbRvNW5CMvV7SLhBLvluva29+zUf6/uLlxd/Rv7Oje2096VeCqU2/J7Pd+9b7MpviBUp4HTNlpa37NzlFTrzi+r2e7+s3L5RiSHgjnfWsVVwlaW9W0fNR3ffSlLu/qye/9Z+R836S086jFOpju/8Ai29FmjDk7Ce/6oDxJwywmrLqhSjtbVn21DbuUZd6+T3XyI0Xbxpw6vtNflGK3r4+fNul1lSk1GW/wly/VlJGv6P1H4jBW09ek+9m6vD2OWa9wAC6rBZnB3NRwWBz+Rq0Z1qVGVGcqcZcrk9ppbNp7d+/d4FZkz0f/wAwdUfCl/tlPX1rbDw26TMfWFjS2muTePCfpK9rO9sc1i4XVvOFxa3MG9mt4yTWzi14Pq00ULxM0hU01lO2toznjbiTdGT76b73B/DwfiuvuOzhjrGenL/1W8lKWMryXaLvdKX6y93mvFfIvTIWmOzuHlaXkKdzY3NPvUk+9bxkpeDXRp/+pixx+is/jjs1Jmuvxf8APDVgGd1rpq80zl5Wdx+coz3lb1kulSP8Gu5rwZgj6Sl63rFqzyliWrNZ2lNclJ/5JMdD/wB73++qQommS/6Kcf5etf7VUhZBpfZt75+qXN1j3QAAsoVu+j7/AMWy3+spfhI++kN/xbCf06/4Uzj6Pv8AxbL/AOspfhI++kLv6vhFs9uev+FM+d//AJX4/wD+W1P/AIf/AJ4qiB92fkzM6P0/X1FmI2MJujT5XKpV5d1BbdPm3sl8T6C94pWbW6Qxq1m07Q5abz/5Ix+WspW/bU8hbOl9rbkl1Sl7+9mDOVWPJVnDfflk1v5nERWImZjvJmegADp4AADstqNS5uKdvSi5VKklGKXi2W76QroYTF6Z0Ra1YzWOtXUrcr/Sl0W/z5pL+kYP0ecGsxxGtbitFO2x8Xc1HJezuukN/dzNEc4kZ+Wp9a5LMtNQrVeWlFvfanFcsV9Eilf8zU1r3Vjf4zyj9N1ivqYZnx5fLr9kp9HLESyHEGnfyinSx1KVVtv9OScYfe9/ke30nM0r/XNHF0pJ08dbqMtn07SftP5pcq+RNfR7xtLA8PbvUV4+SN253E20vZpUlNLZ+98/T3IoDP5KvmM3e5S5k5VrqtKrJv3vcp4P+I9IXyd1I4Y989VrL+Vo6U77Tu8IANlmgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAXb6MWaiquT0/Vl7U0rigm/LpNL+y/kUkZjRebr6d1NY5eg3vQqLnj+tB9JL5psqa/TfidPbF4wsaXN2Oat/BmuMmBjp/X1/b0Y7W1w/WKO3clPq18pbr5Eo4Zy/lZwzzmipSirq2Xrdnu+9p77fXdf12TD0hcNQzei6Go7TadSx5ZqcVvz0am34NxfzZTHDbUEtM6xscp1dKMuzrJeMJdH+O/yKOly21mhi0e3X/5Qs58cabUzE+zP0lHZJptPvXQ+Ez4x6fhgNaV1bRSs7yKuaDj9naX2kn4pS3RDDVxZIy0i9ekqF6TS01nuAASOQAAbG6Z/5vY7/wANS/8ALgUhxB/555T/AF7Lv00t9P45f+60v7kCj9f/APPPK/8AiJHz/on/AHGX/O9sekf4OP8AzuYIAH0DHAfdntvs9vM+AezCf8s2X/iIf3kbL20ntT+MfwNacE0s3YuXcrinv+8jZe1UXKlGT26x5n8z53077WP4tr0T7N2rtT+cl8WcTnWTjWnF96k0cD6KGKEv4Sf87o/+Hq/3WRAmvBujKrrBbJ7Rt57vy3Wy+9oq63/b390p9L/Gr74RXNf8sXv+vn/eZ5D15icamWvJw+zKvNr4czPIWK+zCG3WQAHTwLX4PVq2Lw9e4yV1TtrG5qxjbKrLbeXc2vj3eT29xCdE6eebvpVLifY4+2XPcVW9unV8q972fy3GtM/+Vr2NC0XY4619i2pRWy2XTm283sipqaRqInD81jDacMxk+S79S4qhncLcYy5koxqx3jNrdwqLflkvg+j9zZrvkrO4x99WsrqHJWoycZL/AOvAuXhjqeWbxnqdzJO8tYpT/bj3Kf4J/J+Z4uLum432P/LNpT/zq2j+eS7501svm4/h8DI9H5baTNOmy9J6NHWY66jFGfH8VPgA+iYwAANgeH0uXSGOX/cr+BFdca9u8VqWpZW1lSqwoU6e06tWbk24Jvua6bslOheulcav+4gVLxQ2/ltfbfq0/wDy4nzegxUyavJxxv1+rb1mS9MFOGdun0ZanxOysejsbb5TqJ/3iSavz1tqHhTWvreMlN1YRrQl1dOamm1v4rqmmU+eyhk72hi7jGU621rcSjOpDbvce41r6DFNq3rG0xO7Orq8kRNZneJh4wfUm02k9l3nwvKoAAAAAHtwX/Ldj/4iH95HiPbgv+WrL/xEP7yOb+zLqntQ2NvN/UK3+qf4Gs0vtP4mzl7H/g6v/qZfgaxy+0/iYHoD2L/Br+mfbq+AA+hYwAABN+DuDlldSxuZU+eFs1yJr7VSXSPzXWW37JCCz1fVtDaBtI2qpLKX8+0faQUuVOKb3i909ouKW675S8irq7W7Pgp1tyhPp4jj4rdI5ofqd5fN525yE8ddrnlywh2UnyQS2jH5JI79FSy2D1PZXyx93yqfJUj2T9qEvZku7yZ3/wCUXVW7frlt1/8Ac6X+6clxI1anv67bf/k6X+6RzXPNODgrt06z+zuJw8XFxTv7o/de93QpXFvWtbmmqlKpCVOpB+MXvF/czWXN2FXF5e6x9bZzoVHDdPdNeDXxRfHD7P1NQaco3VeVP1qEpQrckeVc6ffyrok4td3kyC8dsR2GVtMzTXS6h2VXb9eCWz+ceX6MyfRNrafUX092j6QiubDXNVWoAPpGIE00b/zC1T/Rpf7ZCya6M/5hap/o0vwmVdZ/D+Nf/lCzpP4nwn6ShRZHCfXH5LlDCZSrtaSl/m9WT/mm39l/st/R/MrcEmfBTPjnHeOUosOW2G8Xr1hs5q3BWuo8HVxd2lDf2qVRRUpUqnhJP7mvFfBGuWexV5hMrWx19T5K1J+HVSXhJPxTXXctbg9rWV5Clp7J1Y+sU48ttVnLbtYr9Bv9ZLufj3eRKOI2kbfVGM9lwo39CLdvVl0Xns3+q39H8zB0ue/o/L+HzezPSfu19RjrrMfbY/ajrCp8p/0S4x/+9v8AGoQonmoba4s+FmMt7mjOlUhdtSjNbPfmrL+BAzb0s71t75+rLz9Y90fQABZQLZ4Bf8Wyv9On+EjN8WdQzwtDHJWVG67WdT2a0d1DZR6x8m+br8EYPgJ/xfK/06f4SHH7+ZxHnz1vwpnztqRb0ltaP84W1Fprod4n/N0f/wAoVRrZ4a0/+vkS/h1rC1zN28bOz9WueVzgo7OEkusttktml5lMHpxl9dY29heWVZ0a9Pflkvetn9zNPP6Pw5aTXb6qGLWZMdomZcL3/jlb/WS/E6TlOUpzlOT3lJ7t+84l6FSQAHoAGU0piK+e1FZYi3257mqobvuivFv4Lc8tMVjeXsRvO0LR0u1ofgdkM25qGSzz7K3T71D2opr+r2j+cSp8FjbnMZm0xdpBzr3VaNKC97ZYnpC5qhWzlnpiwUY2eGoqnyx7udxitvioqKfvTMh6L+nPX9TXWfrR/NY+n2dPddHUmmvujzP6GXXL+H019TfrPP8AaPouzj7XNXDXpHL90z47XtrpThbbabsVyetxha0kl/1UFGU5fFvl/eZrWWV6RWoYZrX1Szt6inbYyHq6a7nU76j9/Xp8itST0XgnDpq8XtTzn3y51+WMmaeHpHKPdAADRUwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGyPA/K22peHk8FfRjWdrGVrWpy73Tkpcr+jkvdsig9WYa40/qK9xFyvbt6jSl4Si+sZL4ppkh4Laj/AJO63tZVqqhZ3b7C45n7K3+zJ/CSTLB9J/TMezs9UW0NpR2trvZd/jCX4x+SMLF/wevtj/lyc49/e1ck/idJFv5qcvgwd1Ba24KUrmO1TK6clyz/AFpUX0/upfuPzKkJ3wS1LSwGsIUL3kePyUfVblT+yub7LfuT7/duYniZpyWltZ3+J2l2EZ89u3405dY/d0+RpYPyslsXdPOPv+v1Usvr0i/f0n7I0AC2rgBI8BX0lbWtKtk7e/uL2M93BNKltv06dG/qjm9uGN9t3VY3nbddeDfLhbBJ7uNrTTXl7CKQ4hQlDWWS5k1zVedb+KaTT+8nsOJmGS62943v/o1t8PtGLz2q9FZytTq5LEXdSrTjyqrBcs3HwT2n12ML0fjz4c1r3pO0tXWZMWXFWtbRvCtzstqFa5uIULenKpVqSUYxit22TGF/w8i9/wAj38/6Un/vmdweudG4Zf8AB+AqUJuPLKpGKc2vi5Nr5NGpk1OSI9XHMz8P3Z9MNZn1rxDH8RMRHT2i8FipKnKu6tSpWnFLrPaLaT8UuZL4xZXpL+JeqrXU9zZztKFSjChGXNzrbmlJ9+278EiIHWkjJGKO09rvNRNJyTwdH2MnGSlF7NPdM2F0VnaeoMJRuYy5qqjy3Ed/sz5dn9duZP3+415Mnp7OZHA3vrWPrckmtpwa3jNeTXiQ+kNFGqx7RO0x0SaPU/h77zG8MxxM05XwWfq1Y036ldydShNdUt+rg/em/ps/EihbVnxLw2St5W2ex0oQqdKkeTtqcvk2mvvfvMZdf5K6jdRet02/0KMppfSSf4nODU5qViuak7x3xzh7lw47TxY7xt5q4XXuLU0ZbvR+hb/P38VTubyKVvTb2l3NRW3vb5vhH3oxtvqHQuDrOvhsFcXlyl+bqXLXsv4PdfcRfVWpcpqO7VbIVfYhv2dKPSMP8X731JMkX1G1OHavfv3+Wzmk1w+tvvPd+7DSbcm33t7nwAuqoevEY+6ymQpWVnT56tR9FukkvFtvuSQw7x6yNF5WNeVnv+dVFpT2925YOA1lpLARlSxWMuoRm/aqzgnUmvBOXN3e5bFfUZb0rPZ13lLhpW9vWttDw69vLXA4ulpLEvooKV3V8Zt7PZ/F7P4KK8HvASZ6zzels6617TtLylkHFRjKMVGEtui5lu93t4ohg0tZjHHFG09+/i9zzE35Ty7nvwOUusNlaOQtJbVKb6rwlF9HF+5o2Dw1/Qy2Kt8hbpulXhzbTSl37rZruezTXvNesP8Ak311flZ3Hq2z37Dbm38O8szGcRdOY6xo2NrZXsbehDkpQaT2W7e7e/Vttmd6W01s0VnHWZtH0XPR+eMUzF55IXxD07LT2clClF+p3G9S3k+uy8Yv3p9Pf0fiRotfL6+0pl7GVnkcZdXFF9ylFbxf6yalun/9MrbOPFvITeHVzG02XKq7Tnv49xd0mXLekRlrMTCrqKY62mcc7w8IBndO1dM0aLqZmje1riM94QpNdm17+5/ei1a3DG+yCI3nZc2jKUqWmcbCS9pUKb2+ME/4lR8UF/8Aba+ezW8ab/8A04k5p8TsFFJeq3qW223JHu22SXXokYnUOqtEZ6vTr5HFXs6tOPIqsFyycfBPaXXYwtDizYc9r3pO07/XdravJiyYa0raN4VqEm3su8mivOHX/wB2ZP8Ae/8A+zJYzUegMbVjVtcBXdRdVOpHnlF+7eey+hrW1FojlSZ+X7s6uKJnnaHKOGngOE+Rr3tCMbrIypdJxXNTXMnBea3Sm3/VK3J3xH1raajxttZ2VCvSUKrqVedJJ9NopLd927+pBDzSRk4JtljaZl1qJpxRFJ3iIAAWlcAAA9+noylnrCMVu3cU9l/WR4CaaVyejsK7bITp5G4yUI+0pQj2cJNNNxW6e/k9yLNaa0naN5SY4ibRvOy7q0e1tZwT25qbjt7+iNX6icZyi+9NouSPFTB7dbW9/dX+8R7KZ3h3k7yd1c4W7hWqPecqK5FJ+eyntv8ABGL6Lx5tLxRek89ujT9IZMeeazW0cldHtwuNu8tkaNjZUnUq1ZbLwSXi2/BJExVzwxXX1HJP3NS/3yQYTX+jsLQlb4zGXFtTntz8lJJy+Lbbf1NLLqskVns8czKjjwUmfWvEQhvFO0xuO1NHHY23jRhbWtKFRr9OfLu5P39VuRMyWp8jHLagvcjCLjCvVcoRfeo+C+h4rP1f1ql61z9hzLtOT7XL47e8sYYtXHEW67IbzE2mYZfQ2KWX1HbW9SLdvB9rW67eyvD5vZfM9/FTITvNW16EukbOKoKK7lJdZ7e7mciQ6f1XozT9OpRxtrf8tRqU51IKU5Ndyb3XReSRgdZZPS2ZncZG1pZCjkqrTfNy9nN9E5PxTfe/eVaXvfUb2rMViOUrFq0rh2i3OZ5oiAC+qJ7wVy7s9RTxk2lSvYPbfwnBNr6rmXzLQ4h4d5nR97ZU1GVaEVVo79/aQ3e3zjzL6FWaKy2i8DK3ydank7jKQg004x7ODaabit099n0e5M/8q+nn3W18v/hx/wATB12DLOpjNirPL9Wtps2OME48llJPo9mCYatvNFZCFxd423v7a+m91FJKk34trw36vp09xDzbx344322Zdq8M7b7hONEUpVNB6m5U93GL+O0Zbkb07DBzuaizlS7hS5fY9X23cvfuWNhdc6Ow+L/J1jZXUaLTUt4KTlv0e7367roVNda/Bw0rMzvH6TusaWK8W9rbdf1hUoJLqaWj6ttKthI39C5cl+aqbOnt47eK+rI0XKW4o322VrRtOz7CUoSU4ScZJ7pp9UXvwr1t/KC2WMyEkslRh9rfbt4pdZfHb7S8e/zKHO+xurixvKV3aVp0a9KSlCcXs4tFXW6Ouqx8M9e6fCU+m1FtPeLQuHjyn/J62fgrmP4TKXLE19qyz1FoyyUasY3nbRda3Se8HFSTaf6r5k180V2R+jMN8Onil+sTLvXZK5M02r0ADIYJYh3jWaldxt+V7O2S5ub5+BfmdlSFi8CelrlPfOn+DOfHmO9jiJrqlUqpv4wpnTgNbaRwNn6ljLPIKjzOTlUinOcn03k1Jb+5Hdl+IOl8rZytL/G3NxRlt7E4Lpt3NNS3T+BhWxZo1vbRSdv7bNftMU6Xs+KN/wC+6pwTH1rQG+/5Pv8A7/8AfOyne8P003i7t7frOTX981p1E/0Szuxj+qHRwx07LNZlXNeh2llbPeakt1Um0+WHwb7/AHJkczFShVy13UtqUaVCVaTpwXdGO/RFpU+IembPFTtsfa16DjBqjTp0FCMXs9v0vPZ7vfuKjb3e5Hpr5cl7WvXhjuh3nrjpWtaTvPe+AAuKwW7wPsaOAwWX4iZJbULOlKjaxf8A1k30lt83GP8AWfkVXirK4yWSt7C1g51ripGnCK8W3sW1xzvrfTenMRw3xlSMqdrTjXvJpfam+sfvlKXwa8ilrJ7ThwR/N193f+yzp/V3yz3dPf3KivLite3ta5rSlOtXqOcm+rbb3NotOwp8MOCrurynCN5CjKtUg9t53FT7EflvHp7mUxwF0nDVOuqHrdPnx9ivWLheEmvsR+ctvluTD0qtSq4y1npe2qbxtl6zc7Po5yS5Iv4R6/1mUtfH4nUY9LHSPWt7o6Qs6X8nFbPPXpHvUjWqTrVp1aknKc5OUm+9tnAA2maAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAbNcOL+14gcLauIyFTnrQou1um+sk0t4SXyUX8Ys1lJ7wR1WtM6uhC5qKFhfJUa7fdF/oS+T+5szfSumtnwb09qvOPfC7oc8Ysu1vZnlKHZewusTlrnH3UHTuLaq4TXvT7y1s7H/KJwjtszT5amcwC7K5jFe3Upef0XN8pGQ9JTSKiqWrbSK33jQvEvLbanP7uV/BeZX/CLV38ktUwr3HtY+6j2N3Dl5lyvuls+/Z9fqjmmf8Xp658ftR3effD2+P8AD5rYr9J/yJQ0Ev4s6TlpLVVS2p7SsbldvaTUt1yP9Hf3PdfIiBo48lclIvXpKnek0tNZ6wAA7cgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB79PYq6zeatcVZQ569xUUI+7zb+CPJmIjeXsRvyWhwMxVvg8VkeIuYhtb2VKcLNP9Oe2za+bUV75b+BV2dyd3mszdZS8m6lxdVXUm/e33Fm8dcxbYqzsOHmGk1ZY2EZV3+vJreKfv9pyfvlt4GJ4BaQjqnWkK13RVTHY5KtXT7py68kfm119yZm4ckVpfV5O/p7u759VvJSbWrp6d3171y8LMVa8NeFVxnMtT5LmpR9cu1vtLu2p017/aS+Mn5Gseeyd1mc1eZa9nz3F3WlVqP3t7l1elLq/tLmho+yrJwp8txeuL75NexD5J7/F+4oc49FYrTW2pye1fn7o7od67JXijFTpXl8QAGsoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABdHugANneE2ZtNecOK2Fyr7avSp+qXUW+sotexNe/ZL5x95rzrHA3WmtR3mGu+s6E9ozXdOD6xkvc1szK8K9WVNI6ro30uaVnV/NXUF4wfj8U9mvgXB6QelKOf09R1ViVCrXtaSnJ0+vbUHs9158u+/wAG/Iwsf/AayaT7GTp5S1L/APF6eLfzU+iMYLbiTwoqYSUlPP4FdpbOT9qrS222+iUfiolNyi4ycZJqSezT8DNaI1FeaW1JbZize7pS2qU99lUg+kov5Eu40aes41LXWWCcamLy655qC6Uar717t3v800aFPyMvB/LbnHv74+6pb83Hxd8dfd3SrYAF1WAAAAAAAAAAABy7Opyc/JLl89uhxAA+xi5SUYrdt7In91gMHo/GW9xqS2nkcncLmhZKbhCC/aa6vr+DRFkyxTaO+ekO6Um3uV+CW22otNVG6eQ0baOk1spW9ecJx9/f1MdrO3wlDKU3gJ1JWVWjGaVSXNKMn3piuSZnaazHyJrERvEsGCytH0NLXejLrJ5DTlKrcY9S5pRrzXa+ymt+vTr7mV1dVIVbmpVp0o0YSk3GnF7qK8jzHmjJa1Yjo9vjmkRO/V1AJbvZE+jp/B6YwlDI6mo1Ly9uFvSsoz5Uuiezae/c1u/Du69dvcmWuPaJ6z0h5Sk3QEEys89o+tV7G+0jTo0ZdO0o3M3OHv8AedevdJUsLToZPF3Lu8XdbOnPvdNtbpNr7n7n4po5jPHFFbRMTPTfb7OpxTw8VZ3REEp07daYx+nat1lMXDK5CpcclKjKtKmoQST5m4v4r/8AgS6wt9JXOhLrVEtJW0Z27adFXNVqT54xXXm6L2vJ9xzl1PZdaz127u/4useDtOlo6b96qAS/I5bR19gbqFvppYzIqKdGpC5nOMnzLfo+7pue3hXjcFm6lzj8liY1q1OKqxrurNdN0tmoteae/uPb6js8c5LVmNvd+7yuLivFKzHNAwerKyt5ZK4drb+r0edqFPmcuVfFlgaBstM3mkLu+yeBpV61gqkp1HVqJ1Eo80VspJLr07mdZc0YqcUx/kvMeKcluGFag9NvXoU8jGvOzhVoKfM6Dk9mv1d+8sHiXjtOYbC2NXHYKlTqZGMpKbrVG6O0YS2W8nu/aPb5opetJjq8rjm1Zt4K1BI+HlDGXupKGPylirqjcpwX5xxcHs2n0MvxF0ha46lTyuB/O4+a/ORjPtFTfmpeMX196e6ZzbUUrkjHPWXsYbWpN46QgoJdwstMRk9RrF5fHK6p14TlGfaSi6fLCUvBrffYwOfrWFbKVZYyy9TtovlhTdRzey8W34ncZN7zTZzNNq8THgnWmdL4m107/KfVNSp6o1/m9pTfLKs+qXX3tfRP3Hm/lPpZVto6Fs3Q3+y7upz7f0iP8RxTMUiZ2933l32O0RNp23Q4Em1tb6aVDH32nO1pRuYSda3qVOZ0pLbp+P0IyTVtxRujtXhnYALQ0HY6YvdEXeRv9P0Li6sI1HKTrVF2vLHmW+0tl5dzI82aMNeKY3d4sU5LbRKrwWRpKWitU5SOGraZWMr1oy7KtQu5yW6Te3Xu7veQ/WeElp3Ul3iXUdWNGScJtbOUWk02vPZimeLX4JjaepbFMV44neGHBZ2j7XSdzoe4yl7pqNxdWManaN3FRKq4pNPpLZd/kc9G0dC6yvHhpacliLyVOU6dWjdzknst39ry79tuvuIp1cRxerO1evT93caeZ4ecc+irgZHUuLqYTO3mKq1I1JW9Rw5490l3p/QxxaiYmN4QTG07SAtCfD5x4TQy7t/+EZr1mLW/Nydd4bf0U5fJlXkWHUUzcXBPSdneTFbHtxd8bgM5oajYXep7OyyVp6zQuaipNc7jyuXRS6eRneJeiJ4Cs7yxpz9Tb2nTfV0X8fGL8H8hbUUrkjHPWej2uG1qTeOkIMCV8LbPE5PVFLF5fH+t0riE3FqpKLg4wlLwa332RhtSzsJZq4jjbJWltTm4Qp9o5tpNrdt+LO4yRN5o44fV4mNBZ9xbaPsNEY/UFfTMa9a5UY9krqpFb7yTe+/7Hl4ngxV5w3zFxCzvcFc4WVT2Y16V3KcVLwb5t9l8iCuq4omYrO0cu7u+Ka2n4dom0c/f+yvwSbX+kLvSeRhSqVY3NpXTlb3EVspJd6a8Gt10/gRknx5K5Kxas7xKG9JpPDbqAH1ppbtNHbl8AAAAAAAAAAAAAC6OGdpQ0Jw9vdfZCMPX7qDpY+lPv2baW39Jpv4RfmQrhDo6prHVVO2qvs8fbLtryq3slBdy382+h7uN+s6eqdSq1xz5cRjo9jaxj0Utkk5beXRJe5Ioan8+8aeOnW3u8Pj9FrD+VXtZ693v8fgg9zWu8nkZ160p3F1c1N5N9ZTk2bRaZtbPhFwmneZKEPXXDtbiO/WtXknyU0/d3fKTK79GPRX5Vz0tU39Hezx0treMl0qVvP4RXX47GN9I7WsdSaq/JFhVjLHYyTjvHuqVu6T38UtuVfBvxKes/wCN1EaSvs152+0LGD/h8M559qeUfeVZZO8r5HIXF/dTc69xUlUqSb723uzzgG3EbM0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAL69HvWHrtg9KX9VOtbxcrTn6qdPq3Hr38vVr3NlCnox15c4++o31nWlRuKE1OnOL2cWiprdJXVYZxz8PKVjS6i2nyReEs4u6PnpLU0oUYt4+73q2sn12X6UH74t7fDZ+Jm+DWoLG6oXOg9ROMsVk01QlJ7djV8Nn4btLr5peG5Z9SGM4s8Md4KjRvVHeC33dvXiuq89n+EvFo1qyFpd4zI1rO7pToXNvUcJwl0cZJlLSZZ1mG2HNyvXlPv7phZ1GP8NkjJj51t0+8Pbq7BXmm8/c4m9j+cpS9mS7pwfWMl7mjElxdnDiloNShtPVGJglt0TrQ/jv/AHv6RT0k4tprZrvRf02ackTW/tRyn9/dKnmxxWd46T0fD1Wk7GLXrNCtUX7FRR/geUFmY3RJTb32hV/P4HLv+jfR/wBwyVDJcL+VKpprNb+L9dT/AIIggIpwxPfPzlJGWY7o+SyoZPhIttsDko/05Sl+FRHq/KvCNfzeHq/16NX+FUqsFe2hrb+e3/dKaNXaP5a/KFwW+Q4WP7MbCl7p2lV/jFmQhkuF8XvCth35f5rP+NIo8EFvRVZ/8y3zTR6QtH8lfkv7Oai0o9LXcFf2NWhKhKEKNNxfP7LSUYJLbaWz32RQL7wCxo9HXS1mKzM7zvzQanU21ExMxtsyelux/lLjfWNuy9Zp8+/lzIk/G3n/AJYR335PV48v1e/37kGi3GSkns090WTcZPBa6wtrbZO9jjM3bR5YVqv83UXlv4b9/wAd/Pp5nrNc1Mu3KImJ8t+8xzE4rU7+Uq1BL56FuKEue8zGLo0F1dTtt+nu8/gYLUNPE0b2NLD1qtejCCU6tRbc8/FpeRZplpf2Z3Q2pavVKtHb/wCTbUe3u/BEDLQ0VjJrh1lbWpd2lKtfrmoxnWS6dF7XXp3Mj1HQOQcoutk8VSp7rml6xzbL4JdSnp8ta5MvFPf9oWc2O1qY9vD7yjuBhSnm7KFf+bdeCl8N0S7jXWq1dUUIz35I265PnKTf3tkY1LRsbPO17fGVHUoUJKMam+/M0ur+pNbqvjdf4e2hVvqFjm7WLSVee0Kq8dm/N9fi359O8vLLTN3bTHu373FOdLY+9WxafOp8BpRqeDXLv7qy2/GRgLXh5k1V58jf46ytY9Z1p3Cey9y8Tnr/AFFj6uNtdM6flOWNtNlKrLp20l/DdyfzOc8xqLUinPaYnf3PcW+KLTbvjZCCzcB/0G5n/Wf/ALSmVkWxp6ylPhBc45VqKubyMqlODqJLbni+r8H7D6e9eZ7rrRFab/1R9TSRva3ulU5P+CT5c7ev/wB2/wBtECqQlTqShJbSi9n1LB4NUY0Lm8yVxcW9Gg4KjHnqJNy3T7t102Xeda/nprx5PNJ/Hr73kry4bxuqquKGoFNTkpckocu+/hv12JJg3puWhc1HAxv40nCr2nrezk5dm9tuXptsVnqO2naZy8oznTntVk1KnNSi030aaLB4bUKENGXtO6urel692sKalVS23hypvr0W+xBrK7YYneetfql0tvzZjaOk/RV670WPxde+ndNryjU/uUiA07GvLJKwjyOt2nJ9tcu/x7iyeK1l61g8Z6rdW1Z2Cmq6VWP6tOKa69esX3e7zJtRaO3xfH6I8MT2WT4fVDuHEebWVj7ud/SEjMaA1VHDZW5xt807C5qSi+ZbqDb26r9V+P1PJwmtFV1XSuqtehRoW9Oo5yqTSb3pySSTfXq0R/P2VWwy1xQqypyfaSalTmpRa380e3pTLktjt4R9Zc0tbHWLx4/ssbT+nfyHxTtJW0JOyuIVnS3e/I+zblFv3b7p+K2ZV1x/xipv+u/xLV4XasVxZfku8u3RuqMPYnOaSq0kn03/AFkunvXTwKprPetN+cmR6Tte1tGSOcREb+PXmk1MY+zrNO+Z5eHTktTjZGMNMachSilThDl6d23JHl/iVba0o1rmnSnWhRjOSTnPuj72WLp7O4bUWj46Xz9yrW4pbK3uJ9z2+w9/Bru69GvLYxU+HOTjLnWTxXq2/wDPu42jt59UcaO0afHOLJymJn47zvvDrUx214vTnG0fDbkxeptKXWBsaN3cXlrWhWnyw7Jt83RS3Ta6rZru8yPE24i3+LqYvF4rH3sLudknGc4L2fsxj3+P2X3EJLmnte1N79VXLFa22qFq8LPUloHNevdp2HLV7Vw+1y8kd9vf16FVFr8PbVrh3kLad3a0at/2kaUalVJdYpLm69OpB6Q/hR74+qfRfxJ90/Ry4bT4e2+oaE7G5yCv57wou7ilFNpp7bdOZ9y36EK4k2WastW3X5dcZ3NZ9pGpH7Mody28ktttvDbYzWltCXNLMW91mMjj7Ozt5qrVl6zHmaj12Xhu9jp4yams9S6lpTx8u0t7Sj2MaqWyqPmcm0vLd7L4HGLb8TvSd4mOc+HhG72/8Ha0bc+XmzHDmhbV+HeXhdXDoUZOqqs0t3GPJHd7ePd3GS4eaYxGJoS1pY5eeVha0KrhbwoOEuZRakn1332693v69x4tBUKS4a39vO4toV71V+yjOol+hsvq0yNcMtTy03nHb3dRrH3L5Lhd/I1ulNfDf5rcgvTJeM0Unv6eMbc4TReley4vDr4c0e1DlK2ZzV1k7iMYVLifM4x7o+CX0PTozDzz2pbLGRT5atTeo0t9oLq39EZ3iZpq1xt5LK4mvbVMdcT6Qp1E+zk1u0uv2fLy7mZPT2Olp/h1l8vGtQ/Kd7QjGioz9qlRckpNPzab6d5dnPXsYmnLflH0/RU7O3aTFu7qkmJralfFG6rVbCpDG3KdBKTjyRpwj7D93d19zZV+ucR+RNTXVlHfst1UpP8AYl1S+Xd8jFQvLuElKN1WTi90+d9CxtWW1HVej7HN0bm2WRt6PNXpyqJSlHukur7905f1vcQxSdPmraekxtyjw6T9ks2jNjmO+Of7odoFb60xH/iofiTPA6qp4/VOWwubfPaVryqozqe0ottpxl+y9/k+pGeF9jVudXWdzGpSp0rSfbVZzmo7JJ93m/geHXNvUt9W5JVJU5c9xOpGUJqScZSbT3RNlx0zXnHbw+7jHe2KsXr4p7prTE9O8WLDsk6ljXp3EqM315fzM24v4efiupV+S/5Ruf8AWz/FlscI9W+uUqeDva8o3VOLVKcp7KtTS+y3+sl3ea6FTX3/AB6uu/8AOy/Eh0lsvbXrkjpEc/HrzSaiMfZVmnfM/DonGov+iLBpLp2v+1VIAWzk8DdZHhviMVbV7NXVHlnOE6yitt5vo99n9tGHxGgbWxuoXeqs5jbWxp+1OnSrqVSp+ytvPz6nmlz0pS2899vqanHa1q7R3R9GY1/Ql/kawFS6bdeM6ezk95dYS/golTE64ra0oamr29jjaTp46zb7NtbOo9lFPbwSikkiCk2hxWx4trRtMzM/Od0WqvW+T1ee0RHyhl9GvHx1LZPKdn6op+32n2N9ntze7fbcuzJ3WknbKOQr4eVBvopSpz2/orq18jXwHOr0Mai0W4pjbwd6fVzgrNeGJ38V1qrwpf8AOzxX7lT/AGYnGvX4MU17cbOo/wDuqVz/AOhSwIK+ioj/AM2//clt6Qmf/Lr8luVsjwVa2libt++jGqv71RHjqZHgsn0wOen/AEavL+M2VeCzTRVp/Pb/ALpV76mbfyx8li3OT4PuL7DTOo1Lw3v4/wCBh7m+4ftfmMDmU/2r6P8AukSBPGKI75+copv5PTfSspVN7KlWpw8qk1J/cjzAEsOA7bS3rXd1StranKrWqyUIQiusm+5HUW/wvxdrozS1xxEztKMqvI4YyhL7UpPdc3ubae3kk35EGozRipv1mekeMpMWPtLbd3e7dZ3VPhrw/p6JsKsXnclHtcnXpvrCD7op/BuK93M/0itNF6dvtVajtcLj0u1rtuU5d0IJbyk/gkzy5/LX2dzNxlMhVdW6uJ80ntt7kkvBJbI2O4L6VttBaIudU59Rt7q4o9tWc11o0V1jDbzb2bXm4rzM/PlnQaffrkt+tp+0fRaw4/xWXbpWP0h6eJ+dx3DPhtR09h5SjdVqDt7Jb+1FP+cqv39X8307jVptttttt9W2SDiFqm81fqe4y903GEnyW9LwpU19mPx8W/FtkeLPo/STp8Xrc7Tzn3o9XqO2vy9mOUe4ABeVQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAATfhBrOekdRrt5SeNu2oXMV+j5TXvX3rdFicftEflO1/ljh0q04Uou6jB79rT2XLUXm0tt9vDZ+ZQheno+a1dzCOkMpVTkov1Cc2mpLq3Te/f4tfNGP6QwXw5I1mGOcdY8YaWjy1yVnT5J5T08pVBpXO3unM3QythParSe0ovunF9HF+5onfE7AWedw8eIOnY721wl69QSW9KfROWy9/R/FPxPDxo0JU0tmXfWVJvFXUt4bdexn3uD93in4r4M8PCzWC03k52eRj2+GvfYuqTjzKO6a50vdu914osTaM1K6nBzn6x3x7/ug4Zx2nDl5fafFCwTLifo96ayMLqxn2+IvFz21ZNNLdJ8ra8k1s/FENLuPJXJWLV6SrXpNLcMgAO3IAAAAAAAAAAPu78z4AB93fmxu/NnwAAAB93fmz4AAPu782fAAPu78z4AB93fmfAAPu782fAAAABdO4AAD7u/NnwAAAAPu782fAB93fmz4AB93fmfAAPu78xu/NnwAD7u/M+AD6m13HwAD6m0902mfAAPu782G2+9nwAAAAAAAAAAAAAAAAkOgdKZDV+fp4yxjywXtV6zXs0oeLf4JeLOb3rSs2tO0Q9rWbTtDP8AB/RNLUV/Uy2Z/M4Kx9qvOUuVVZJb8ifl4t+C+KPNxe1tV1fnuW2fZ4mz/N2dJR5Vtsk5NLxey+C2RnOLeqMfY4yjoHSs1HGWXs3VWD/np7ptb+PtbtvxfuSIxws0Tfa51PTxlu5Uran+cu7hLdUqe/f72+5LzZQxzvM6rNyiOkeEePvlbvyiMOPnPf5z4e6E29HHQCzmV/lNlKO+Psqm1vTnDeNer5/0Y9G/fsju9JLiAsxkXpXFVlKxtJ73VSE941aq/RTXfGPVe97+4nHG/WGO4faSt9E6YhGheVLfkhyPrbUvGT/al12+LfkawNtttvdsr6PHbV5fxeSOX8seXj8UuovGDH2FOv8ANP2fAAbLOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA5U5ypzjOEnGUXumvBnEAbKcPdS47iPo+vhM2oVL6NPs7mk3t2kem1SPk99m/JrfxKO4gaTvtIZ2dhdJzoT9q3r7bKpH+DXc15mLwGWvsHlqGTx1bsrijLeL23T8Gmn0aa8DZaCwHF7QPNyxo14/aW/NO0rbd/m09vmvejAvE+i8vHX+Faef8Ayz4+5rVn8djik/xK9POFRcMdT2dxjquidSOM8XeJxoVJtLsZvdpb+C32afg/c2RfXelr7SmalY3Sc6M/at66XSrDz+PmvBnh1Hhchp/MVsXkqDo3FF+e6kn1Uk/FNdUyyNB57Ga0wsNE6smlWSfqF7JpSjJLot/Nbbde9dPBbaF/yZ7bHzrPWPvH3VK/mx2V+Vo6fsqUGW1VgMhpvMVcZkafLUh1jNdY1Ivukn4oxJeraLRvHRVmJidpAAevAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGRxFtjK9vfTyF/O1qUqHNbQjT5u2qb/AGW/D4nksbW5vrulaWlGdavVko06cFu5N+B5vD3Z34PF32aylDG42hKvc1pbQivvbfgl5lt6uy1pwz0YtFYK4VXN3kefJXUHt2e67l79m0vJbvvl07+bG8HdLuKdG81hkKfevajbx/wX9pryXWm/8/zOV/668vrur75TqTkzPifxluKf4cdP+afH3R+q1Mfh44f55/Ty97t09h8jn8xQxWLt5XF3XltGK+rbfgkuu5tPBYHgdw1fM43N/W739l3lbbp071FJ/Je9nDh1pbEcIdCXWez9WnHJVKand1k9+Rfo0Yeb38u9+5bmuXEnWeT1vqGpk7+ThRjvG2t0/Zow8l7/ABb8WUrTPpTLwV/hVnn/AM0+HuWIiNHTin25/Rhc5lL3NZa5ymQrSrXNxNzqSfm/4HiAN2IiI2hmTO4AD0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACRaA1ZkdIZ2GRspOdOXs3FBv2asPL4+KfgyOg5vSuSs1tG8S6raaTxV6tntWYXBcVNGW+RxdWnG6jFu3rtJSpz6b05pddt+nu710fXWzKWF7iclWsb2jO3uqE+WcX3pr3/AMTP8NtZ32js0rinzVrGq0rm3325112a8pLfdP8AgXprTSuB4n6XoZnD3FNXqp7291ttzbd9Ool1Wz6e73pmDTJf0XkjFk54p6T/AE+UtW9K6+vHTlkjrHj5wrvTGex2v8ItK6oqRhlIL/Mb1x3lJ7dE359Ntn3/AB7641Pg7/T2Xq43IU+WpDrGS6xnF90k/FM8+TsL7D5KpZX1GpbXVCW0ovo0/Br/ABLN0rmcVr7FU9LaokqWUhFqxv8Apu337P39Euvf8e/RmJ008dOdJ6x4eceXjClv23q29r6+UqnBl9V6dyemsrPH5Oi4SXWnNdY1I/rRfihO3wa0xC5jfV3mHXalb9n+bVPwfN5lyL1tETHOJV5rMTMSxAAO3IAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMrpK9xmO1FZ3mYsPX7GlPerb77c62PXqKdtqTWFV6bxMraldVFG3tILd77bHE22naY5eLrbeGGx9ndZC9pWVlQnXuK0lGnTgt3JvwRcllRxPCHT6vbtUr3V95TapU99428X39V4eb8e5dO9bfkjhBg3VrKje6vuqfspPeNCL/Beb75beXfUGXyN9mcnVv7+tK4uq8t5Sfj5JLy9xRnfWzt/5f8A8v7fVa2jTR/z/T+/0fMlfXuWyVW9va1S5uq895Sl1cmzYzgrw9sdD4d641bKFG+jQdWnTqr2bOm1tzS85NNdPDfbv7ungpwytdMWq1dq5Uqd5TpurRo1WlG0ilu5y36c+3cvD4lecb+J1xrPISxuOnKlhKE94rbZ3El+nL3eS8PiVM2W2uvOm087Uj2rR9ITY8caWsZssb2npH3lj+MXEa+15l4qKlb4u2k1bUN/tfty97+4gIBsYcNMNIpSNohQve2S02tPMABI4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlvDfXOT0ZknUt969lVa9Ytm9lL9qL8JLzIkDjJjplrNLxvEuqXtS3FWebZ7WWndPcUdMUcriLikrtQbt7mMfaTXfTqRXVdfp3rdPrrhmsXkcFlathkKE7e6oy6p/c0/FPzRmeHmtMlo/KdvbN1rOpJesWze0ZpdzXlJeDL9zGI0vxX0nC8tKse2in2Nyortbao0m4Tj3uPufxXjvhVvk9FW4MnPFPSf6fKfJqzWmvrxV5ZPDxVdpjWOM1PiP5Na4lGWy2tb1pJp7dE5eD6Lr49z81DtcaRyGlr5Qr/n7Op1oXMF7M1sns/J9V0PBqbAZTTuTnj8rbSo1Y9YvvjNecX3NEn0Trenb2b0/qmi8jg6seTaXWdDv2cX37JvfY0a4+y/Mwc6z3feFObxk9TLymO/8AdHtL2WDu/XnmsnOxVK3lO3UKfO6tTwj7jCvvJnrjRFTD20cvibmORw1ZKUK0Orpp9yl+G/12ZGsC8aszaPMKs8f2q9YVL7fJ47FrHkrkib1neEF6TWeGYeEHrzHqH5UufyZ2vqXaPsO1+1y+G55CWEYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB32HqzvqCvHNW3aR7Vw7+Xfrt8hI6Cc1cBo6HC2GaWf5tQSqbepJeHNttt8Ou54eKS0mtUzejZb410odFzbKe3Xbm6nzh9oXM6yvJxsYKjZ0WvWLqp0hT93vfR9EVr5azijLaeGOvP6SlrSePgiN5YnTOAymo8pDHYm2datLq3vtGC8XKT6JfEte6u9PcIsbUs8bKlltU14ctWs/s0E15eC693e9uuy6Hi1DrTBaKxM9NcP9qlxJJXeTa3k5rv5X4vv69y8N+8q3H2eQzOUp2lnRrXl7c1OWEI+1KcmVprfV88nLH4d8+/wjy+aaLVwcqc7ePh7i8ub/M5SdxcVKt3eXM9237UpyfgjYbhFwrs9J2X8q9a9hC7pQ7WnQqyXJaJdeaT32cvd4fHuy3DThvheGODqas1dWt3k6MOeU5PmhaJ9No/rSe+268e7zKc4w8UMhre9laWvaWmGpy3p0N/aqv9efn7l3L7yrkzZNfacOmnakcpt9oT0x000dpl527o+8u7jHxQu9Y3Msfju0tcPTl0jvtKu13OXkvKPgVoAa+DBTBSMeONohRy5bZbTe87zIACVGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZzRmqctpTKq/wAVX5d1y1aUusKsfKS/j3owYOb0reJraN4e1tNZ3hs5Z5LS/FfTErWtBRrxSlVoSklVt593PGXl7+59z8CjeIGh8tpC+5LqDrWU3tRuor2Ze5r9GS8mR7GX95jL2ne2FzUt7im94VIPZo2H4ecQsLruwlp7U1rbQv6tPldOfSldfDu5X7t/g/Aw7Ys3oyZvijix98d8ecNSMmPWxw5OV/Hun3qU0Tq++03XnTUY3VhW3Ve1qJOMk1tut09n/wDTJFmdIYnUtm8zoaopS2Tr46T2lTb/AFd35+Hw2b7l6uKPCq7wUquSwUZ3WOW8p0d96lFea/Xj70unjsV3h8nf4i+jeY65nb147rmj4rxTXii9jtj1Ne201uf198f5KteL4Z7LNHL/ADo8lWE6VSVOpCUJxezjJbNMsS3wug5cHquUqZLbUyb5aXaPffn2UeTbu5d3uZOld6U4j2yo5Hs8RqTk5YVoraFaSXT3PfbufVeDfRFfao03ltOXnq2TtnDm606kXzQmvc/4d6O4y9tMUtM1tE77ePu8YcTj7OJtHrVnv/zpLDgm/B6ejYajq/y0hGVo6L7Ln5uTm9/L17t9veRbPfk78tXn5J7T1DtZer8/2uTfpuWYyb3mm3Tv7kE12rvu8IPuz2326HwkcgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB9Sb7luB8B9jtzLfu36locX7fhnR05hXoypGV+4L1jlnKTkuVbue/RS38iK+XgvWu0zv8Ap73UV3iZcNB0+FtTh1k1qNyhqFRm6Em6m66exyJey+vfuVk+/oZDT+FyefyVPHYm0qXNxPfaMe5JLdtvuS97LVo4bSfCu0p3eo1Rzmp5w5qNlTknTt/fLvW/xXwXiV7XrgtMRM2tbnEf50hLWs5IjuiO9hdC8Mnc4v8AlLq+6WJwdNc20ntUqrw2/VT+G78Ezz8QuIiyFjHTelbd4rT9FckYQ6TrLzl5Jvrt9dyPa31nndX3qr5a63pQf5q3h0p0/gvF+99TOcK+FmoNd3UatGm7PFRl+evakei90VunJ/A4tSK/naqY5dI7o/efP5JItxfl4Y6/Of2hHdFaUzesMzDFYO0lXrS6yk+kKa85PuSNodNac0bwO0zUy2Wv6dbK1oOFS4/TqPv7OlHv8uv12O7UWptFcEdKU8PibaFa/nBSjQhJdrXnt/OVJeEf/peZqtrTVOZ1dmqmVzV061WXSEF0hSj4RivBFT830lP9OL9bf2TeppI8b/pDNcU+Iua17k1VvJdhY0pP1e1g/Zj+1J/pSfmyFAGxjx0xVilI2iFC97XnitPMAB25AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD7GUoyUotprqmn1R8AFx8NOLlShOljNVVXOikoU77ZuUF4KaXVrw5u9e8z2vOGOK1Pb/AJb01WoW93Wj2iVNp0LhPx6dIPv6rpv3pGvxKNC65zekbh+o1VWtJvepbVesJPzXjF+9GPn9G2pec2knht3x3T72ji1tbU7LURvXx74YPL4zIYe/nZZG1q2tzT74zWz9zT8V70TDSfECdvZ/kfU1qsvi5LlfaJOpTXhs33pfVeDRbdpf6M4oYlQuKUKlxBNu3k1GtQb75Ra8Pet15oqfiBwxymnO0vLCUsjjo9ZTjHapSX7UfL3rdfA8xa3Fqp7DUV4bx3T9Yl7k0uTBHa4Z4q+P7w9WY4eWuYtJZjQN7HJWvR1LOUkq1JvwSfV/Dv8AiVzXpVKFWVKtCUKkXtKMls0z14XLZLC3sbzGXdW1rxTXNB7brxT80WTb6u0jralG21xZRsMio8tPJW0eVN+HMkvxT92xcm2bB19av6x8O9W2x5enqz+n9nh1VqjR15wrxmCx2M5MrR5eeo6Si4NfbfN+lzFbE11lw5zGBtvyjbTp5PGSXNG4t2pcsfByS7vj3EK8SXTdnwTOOd4mUeWLxba8bSAkGs89ZZypYOyxFDHRtbWNCXZ99Rr9JmNsMTkr+zu7uzs61e3s4KdxUhHdU4vxZNFuW88kcxz2h4QAdPAAAAAAAAAAAAAAAAAAl/CbTMNTaqp0LmDlZ20e2uEv0l3KPzbSI8uSuKk3t0h1Sk3tFY6yiALE42aPhp7MwyOPo8mOvO6MVsqVRLqvcn3r6eBXZ5gzUz44yU6S6y4rYrzS3WAAEqMAAAAAAAAAAAAAAAAB7KGMv6+Mr5OlbTnaW8lGrVS6Rb7j5hrmhZ5W2urq1hd0KVRTnQn3VEn1TPN/B7s8hZnBjV+kNMWeUjqLEet3NeKVGo6KqdNnvDZ927a6+4gup72zyOfvL7H2UbK1rVHKlQj3U15GY0PoHUer6jeMtFG3i/buKz5Kcfm+/wCRBqOznFPaztHv2SYuKLxwRvKMVmp15yhHaMpNxXktye6P4Y5LJWazGfuIYLCxXNK4uNlKa/Zi37n3/LckdK84ecNV/mtOGqdR0m06sulCjL3eD8fP4orvWWsM/qy89YzN9OrFP83Rj0p0/hEi7TLm5Y44Y8Z6/CP3d8NMfO3OfD95TTM8RcZp/HSwfDqz9SovbtchUjvWqNeK36/N/JIrRK8yN9su2urqvP3ynOT/ABJbw44a6j1tWU7GirawT2neVukPhFd8n7kbEYXB8P8Agxhvynd14SvnFxd3V2lWrPxjThv0+XzZVyarT6OezxxxXnujnM++U1MOXUetblWPl8EP4Vej8qUKeY17KMIx9tY2E13bb71Jp/cvfu0ZDirxuxWn7D+TegoW1SpSh2Xb04/maC27opdJSXXr3fEq/ipxhz+s5VLG2lLHYhtrsIS3nVX7cvH4dxWQxaHJnt2urnfwr3Q9vqqYo4MEbeffLvvru5vrqpdXlepXr1JOU6lSTcpN+86ADXUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAdtpc3FpcwubWtUoVqb5oThJqUX7mi5NA8YKclTsNWQ27oxvaUPDu9uK7vD2o/NMpYFbU6PDqq8OSN0+DU5MFt6S2K1Vwu03q20WX05c0LKtW3mq1D26Fbfr1in7L/or5FJ6t0hn9L11Ty9jKnCT2hWg1OnP4SXTx7u8+aS1bntLXLrYe+lSjL7dGS5qc/jF9PmXfpfixpXU1m8bqW3p4+vVXLOFZdpb1e/xafL4d/1Mz/jdB//AGU/+6P3Xf8AhtV/yW/RSek9Y57TNXfG3b7FvedvUXNTl027vB9e9dSYU63D/XD2vIfyYzFTvqw60KkveuiW/wDV+LJfrHgxicjSle6YuoWVWS5o0XJ1KNReGz3bh/aXwKZ1NpjO6buuwzGPq27f2Z9JU5/CS3T+pPg1Gl1s8WK21/lPxjvRZMefTRw3jevzj4eDMau4cam05Td1UtY3thsnG8tJdpTafc3t1XzI5YZbJ4+1urSzvK9vQu48lxThLZVF5NGa0drzUulam2Mv5St39q2re3Tfyfd8UTGpqXhtrPmnqfE1NP5JpL1uxTdOT85RSf4N+8szkzY+WSvFHjH7fsrxWl/ZnafP91TAsjM8Jsq6KvtK39pqGxn1jKhUjGpt4Jxb6v3Jt+4r27tbmzuJ291QqUKsHtKFSLi0/gybFnx5fYndHfFentQ6QATOAGX0dhamodR2eJpy5O2n7c9vsxXVv6Im+UzHD3F5apgaej1d21Co6NW8ncyVWUk9nJfAgyZuC3DFZmfLb7paY+KN5naFYgsrOaS0XprVdxaZvN3crZRjVoUaVFuUoy8HLu6Gdw+k+F2pqbtsPka9G6afJF1mqn7sl7XwRDfX461i+07T37SlrpL2ma7xv4bqYBNNfcO8xpVO6TV9jublVzTj9nyU14fHu95FMZaTv8lbWVP7dxVjSj8ZNIsY82PLTjpO8IL4r0tw2jaXmBs7Q0xwyx1Gpp64o41XcKKlUVeaVaUWvtczfR9d+jNa8pToUclc0bWp2tCFaUaU/wBaKb2f0K+k1tdVvw1mNvHvTajSzg23mJ38HmJZpLQ2Rz1hLJVbu0xmOi+VXN3PljJ+SImWZxNpXf8AILSvqak8ZG39rke67RpPd/2vnuS58s1tWleXFP23R4qRMTae54bfQFLHarsLbPZO0/ItzCVWN/RqfmqqiusVLwlv0+8t7QVHQGIvq+O0tfUKl3Xip1Uqs5ylFd2zkttlv4FP4/t6fCDK0sqmqErqlPGxn0anv7bXjttv7ujMtG8q4fROlNYWlCl6zZTnb1P0e1pyc48r29yf1MzW4baivBN58PKZ23jdf0t4w244r5+cRvtK19dZHSOQs7nSmaylClc3EY/mnupxk9nCS6Nb93yfvKXvOHltUzNW0xWcpVLK1TV5e3CUKdGe/wBno3u9tvctzL2WZhf2epOIjsqcb+PJQs6cmpqilGMObqu/2ovf3GLxsLrOcI7mwx0XWvrXIuvc04v26lNx332731Tfy9xzotNbS04a28InfbbfbnL3VZoz23mvjt7t2P1Hw8yONxUsvj76zy+PprepVtZ7uHxX+HcQstTghGvb2WoquQTpYtWbU+1W0efr3b+PLzL5lWPv6GpgyXm1qWnfbv8Aeo5aVitbRy3fD7s9t9uh9htzx5vs79TavCLhfkcVZ6ctPyPczq0E4W/JHtJbR3bctubfvffuR6zWfhYieGbe7ue6fT9tMxxRHvapAyeq8YsNqXI4pT51a3E6Sl5pPoSDh9w9y+rZesRfqeOjLaVzOO+78or9L49y8yxkz48dO0vO0I6Yr3twVjeUMBdeQ0twq0rtbZzI1bu7X2odpJy+cYL2fg2RPNYPRGWcJaTzE6FzOrGmrO6jJc+723i33fDqVsWvpknlW23jtOya+ltSOcxv4b80ABZeWutDaTzksJU0q8wrdRhc3Ne4lCTk0nLliui23MXxU03isRUxuY0/UnLEZaj2tCE/tU2tuaPX4ompqItMRtMb9PNHfDNYnnvt1QgAFhCA+pNvZJt+4m2leF+qs9QV27anjbLbmdxeS7Ncv6yj9pr37bEeTLTFG952h1SlrztWN0Ro5C9o2FawpXVaFrXkpVaMZNRm13NrxM5o3Q2ptWVuTD42pOkntKvUfJSj/WfTfp3LqTanT4U6JpOpUr1NYZiC3jCK5LaE/e+qe39bf3Ef1rxT1NqSl6nTqU8VjlHljaWS5I7eTfe/h3FftsmT+FXaPGf26z+iXs6U9ufhH7pO8Hwz4fxl/KG+WqM1FJq0tm1Rpy8m09n4d/ziRjXXE/UGpqbsqLhisWlyxtLX2U15Sa6vu7u73EOxmPv8pe07PH2le7uar2jTpQcpNl38POAFe45LvWV27WO6asbaUZTkv2pptLw6Lf5FbPbTaT83UX3t3b/aE2OM2f1MVdo8vvKmdOYDMaiyCscLj697cNN8tNdEl1bb7kviX/w/4DYnGWqyut7mNzVjFylaQny0aW3jKaa5unwXvZnc9xH4ecMsZPC6bs6Fzdw77WzfsqfnUqPfr185Pw6FA8QOI+ptZ15LIXboWXNvCzoNxpr4+Mn722QzfWa7lT8unjPtT+ybg02m9v17eHcuDiBxwxGFtvyRom3o3VWnHkjccnLQopdyjHZc7XyXTxNfc7mcpnchO/y17WvLmffOpLfb3JdyXuR4AX9JocOlj8uOffPfKpn1WTPPrTy8O4ABcVwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASLSOs9QaYrKWMvZdjvvK3q+3Sl8n3P3rqXRpXi3pjO0JWuoaUMdXqw5asa0e0oVV8dnt4dGn8TXUFDVejsGp52jafGOUrWDWZcHKs8vCejYzUnBjTGatle6bvPyfOouaHZy7a3qfDq2l8G/gVDq3h1qrTanVu8e69rH/wBotn2kF8dusfmkY3SurdQaYuO2w2Sq0E2nKlLadOe3nB7plu6T47WtSEKGpcbOjU22dzae1F/GD6r5P5FLh9IaT2Z7SvnystRbR6j2vUn5wpLFZTI4m6jc429r2laPdKnNxZP8fxWrXturHWOGtM3a7bb8qhOK92y2Xy2fvLQudN8NOINOpd4/1WpcyW861nJ0qsXt+lB7b/Fx+ZXmqeCOdsqrlgrujlKO2/LUcaFRdPe+V/JiPSGi1FuHPHBaP6uU/CXk6XU4Y3xTxVnw5xPwcamnuF+pkngc/VwV24/8Xu47wcvLdvov6z+BgM5wu1Zjo9rbWkMpbPdxrWU1UTXnt3r6EVy2JyeJuXb5KwuLSrF/Zq03E7sNqDNYabni8ndWra2ahUez+XcaNcWSkb477x58/wBY/uqTelvbrtPl+zt05kr3TGo7fIKlOFa3m1OnNNNrulF/Im9zHhre5yeobjMXEVUn21TH9jLdz72t0u5vwX1PPT4p1shZq01Zp/H52C2XayiqVXZeHMkdtJcI85RcWsjpu6k+jcpVqUPxb+4gyzeZ3vWY867T/f8ARJThiNqzEx4TvH9v1Q/XGoK2ptR18rVh2cZbQpQ/VhFbL5mETaaabTXc0WVU4T1b637fTGpcVmU30pqapTS96baX1I5muH+sMPSda9wVz2UXs6lLarFfODZYxajBtFKWjl3dJ+UosmLLvNrQnfC7ipCnShhNW1e0t3Hs6V3OPNypppxqLZ7rbpvs+nfujt15wsr0LinqPQzVai5KtG2pzTceu6dN7+0n+r3/ABKaqUqtN7VKc4P9qLRLND8QtQaU2oW1b1mw33la1nvH+q++PyK2TRWx3nLpp2mesd0p8epresY8/OI6T3wmnEDDU+ItpS1PpZdtfUKapXtg1y1ote597XVe9JNeKVP1qVSjVlSrQlTqRe0oyWzTL2o6l0Jqe4/KlrfVdNZ5x/nOZxk35SltyVI7frbPqZLMYyvmFFX9lprU8tutxFuhWfxlTcl95Vwa78NHZ3rMRHj3fHpMfFPl0vbTx0neZ8O/4dY+TXQk2mtc6i0/aKzsbuLt02406kebl379n3r5Esz/AA0yN7WjPEYSjiqa+2ql7Oqn9Y9Dw/5PsNjI9pqPWmNtdlu6Vsu2nv5d+6+hdnV6XPTa3Py6/TdVjBnxW3jl59Pqjl/kdQa2zdChUcrm4m+WlRgtox83t8urZJOKFWhhMBitFUKqq1rSPa3UovpzPdpfWUn8GhPWmC0za1bTRGNlG4qR5J5G6W9R9OvKn3eP+BX91cV7q5qXNzVlVrVJOU5ye7k34klMc3tE8O1a9I8/Fza8ViY33mespvwrvLK6oZPSeRqQo0spT2o1Jd0aqXRfN7P4pEcqrOaQ1BUpRnVsr2g3FuL6SX4NMw8W4yUotprqmifY3W2Ly1hSxeuMW8hTpR5KV9RfLcUl8f0vmdXpNLTaI3iesOK24oiJnaY6Sj2oNYaiztF0clkZ1KLe7pwhGEW/NqKW5gSxKegtO5eKlprW9jXqNbu3vKboyi/Ld9/0Mnpzhze42VR5zSEs0++m6WWhQj819pkX4zTYa7Ry8vZ+uyT8Pmy23nn59fpuq21t691XhQtqNStVm9owhHdt/At7QGnKXD5PVusKkbSvGEqdraJqVTeUdnuv1mntt4b7vbpvJcZZ6lsKco4XE6c0fbbPnr83rFXZ9Nueb5fqzHVsjw601cSyWbzFXV2ci/ZlL84ov3R37OK+bKmfWTqI4Kc4nujnPz6R81nFpuxnjt3ePKPl1li9I8PMhqbM3Oq9aU521C4qu59XfsSrbvfeX6sNvm/d3nZxM4nW1vaPT+kXCEIR7Od1CKUacUtuWnt093N9PMh3EDiRnNWVZ0XL1HHN+zbUpfaX7cu+Xw7vcQuMJze0Yyl8FuTY9FbLeMmp7ule6P3lHfU1pWaYe/rPfL5JuTcpNtvq2zvx1zOyyFvdw+1RqRqL5Pcy+H0ZqnLQ7Sxwl5Up/wCklDkj9ZbIldhwd1A49pmb/F4in51riMv7r2+8uZNThpytaFWmHJbnWJevOYjRmqsl+X1qqljY14RdxQlCLlFqKT6OSe728mjAcTs9i8o8XhNP9rUx2KoulSqST3qSe3M0u/b2V9/d3GYhhuFWBqN5PUN3n6ii/wA1a0nCPN5Np9V71I7KPFLD4OnKnpDRGOx89vZuLibq1E/NN9V8N2UcUWi0cEWtEdN9oiO7v5z8pWbzWYnimI367bzP7I3pzhtrTPcs7HB3EaUu6rX2pQfzltuSp8NtKadjz611nbU6yW/qlkueb9zfVp/1fmRTUnEjWmoIOlkM5XVF99KglSh9I7b/ADItSp17moo06dStNvuinJstTj1F/atwx5fvP7IeLFX2a7+/9o/dak+JGmNM0nS0BpenbXD6O+vPaqNeaW7af9bb3EE1Vq7UOpq3aZnJVa8U940o7Qpx+EV0JXpXgxrTNOnUuLSni7aa37S5l7aW2/8ANr2vuRbWD4RcPtJWLvNTXVLIzj17e8q9jSjt12UFLZv4uXwKOTWaHS25etfy9afms10+pz15xtX5Q140tpPUWp7h0cHiri75ftzS5acP6Unsl82XNoj0fFywutW5F83f6nZvw/aqP+CfxM3qvjxpbC27sdK478pThHlpyUewtqfwWybXuSj8Sk9Z8SdXar5qeSycqdq3ura3XZ0/ml1l82xxekNX7MdnXz52OHSYOs8c/KF4ZbX/AA64dWFTH6ZtravWbfNbWT5k5LxnUe+/1kymdccVNWapc6NS8dhYyW3q1q3FSX7UvtS+bIKCzpvRmDBPHPrW8Z5yiza7LljhjlXwjlAADRUwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB2W9etb1VVt6tSlUj1UoSaa+aJ7p3i5qzFqNO6rUsnRXT/OF+c2/praX13K+BDm0+LNHDkrEx5pMea+Kd6Ts2AxvFXR+bo+r5u2lZKpsp07mn21J+/dRb/snofD3h9qu3dxh6lOnOSbVSxrp7e+UN3t9Ea7nOjVq0ZqdGpOnJd0oy2Zmz6IjHO+nyTTy6x8l3/UZvG2akW/SVs5vgVnaEe0w+TtMgm+kKi7GX1e8fvINqDQ2rMFu8lhLmEE9u0ppVYfvQbRkMFxP1riNo0sxUuae23JdJVdl5JvqvkywMFx7XZqnm8G3Pxq2tX/Zl/ieTb0ng6xXJHyn9iK6LL3zSfnCj4Tq0ZexOdOS8m0ySYrX+rsbCNOhmq9SnHuhXSqpfDmT2Lvq6w4Varko5B2Tqz6731vyT3/pbdP3jru+FOg8zSlXxcJUYPqqljd88F8pOf4kd/S2Lbh1OK1ffG8O66DJ1w5In3TtKt6XF7LVafZ5XDYu/i+/mg1v8t2vuOMdYaCvo75TQ0KdVvrO3qbL6R5CR3/Aep2bljtR05vwjcW/KvrBy/Ait7wf1tbzcaVna3MfCULmEd/lJp/cdY8vo28fl3ivuma/s9tTXVn167++In93qu6fCG8g1Qr5Owm+6XLNJfFe3v8AU6IaS0VWW9nxEpwb/RqWzj98pR/AjOQ0bqrHw57vAZCEP11Rco/VdDD1LW5pPapb1oP9qDRcjBvHqZp/SfrEqlsnP1scfrCf1uG1aUHKz1fh7nyj273f03PLLhVqyS56FK2uI/rRq7L70iCtNPqmjnCtWh9irOPwk0dzi1Mezkj41/aYcxfF31n5/wBkyXCzWj7sdbv/AOcpL8ZH3/JVrfwxts//AJ+h/vkUhlcnD7GRu4/CtL/E7I5zNR7stfr4XEv8Tzg1f9Vf+2f/AMnvFp/6Z+cfsk/+SnXP/wB1W/8A+fof75y/yT64264y2X/z1D/fIx+X85/985D/APMz/wAThUzOXqfzmVvpfGvJ/wARw6z+qvyn/wDI4tP/AEz84/ZLKfCfWsuvqFGPv9Yi/wANz2w4ZZehT3vtTYuyfjGdxJNfVJFezurmp9u4rS+M2zqbb73ue9lqZ63j4V/eZJyYI6Un5/2WJU0jpOimshxGotrvVK37RfVTf4H23seE1mnC6y+VyM0/t0YShF/JxT+8r2FGrP7FKcvhFs9tng81eS5bXE31Z/sUJP8Agefh7R7WWf8A7Y+zyMsT7NI/WfunMtS8MbKXNY6Mr3cl9l16rivvlP8AA7J8X7y1oqhhdN4fHU1+rT3f9nlX3GKx3CbXd61thvV15168IbfJvcluJ4AZutFTyWbsbVeMaUZVJL67L7ypkv6Pxx+Zff32mfus1rq7T6ldvdGyEZXiVrPIpqpmalCL71bwjS++KT+8ite4uLibnXr1asn3uc2395sbi+BGlbPerksnf30Yrr3UYL47b/ieuT4OaSqLaOFhXpLp33NRv+3s/oQ09LaWnq6bHNv+mru2hz2nfNeI98tdsJp7OZut2WJxV3eS23fZU20vi+5Fg4TgTrG8knkp2OLg4p/nKyqy+G0N0n8WTrL8f8DbxcMXir+9aW0e0kqMF/ee30IHn+OesshGVOwVni6clt+ap88/3p77P4JEnb+ks3sY4pHnO8/o57LRYvavNp8uSwcLwR0dhacrvUGSqX1ODW8q81b0l7ntLf8AtHrrcROFuh7aVtp+jRrVkmnCwob7vylUe2/1ka3ZbL5TLV3XymRur2o/0q9Vzf3nhPY9FXy89Tlm3l0g/H1x/wAGkV8+srf1Rx51FfRlRwllb4um29qkvz1Xb4tcq+SKuzGXymZupXWVyFze1pd861Ryf3nhBo4NJh08bYqxCllz5Ms73tuAAsIgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADso161F70q1Sm/OMmjrAEqxXETWeNUI2+euakIfZhcbVor5TTJLjONmqbdv1y2sL1PzhKm/wCy0vuKwBVy6LT5fbpE/BPj1WbH7N5j4rxtOO9ty/53puvzecLyMl9JU/4mTsuNmma0Nry0yVt+yqcZr7pI17BTt6E0c9K7e6ZWY9KamP5t/hDZGHEbhtf/APGZ2y3/AO14/mf92R4bq94O3c+arPDyf7NCUP8AZRr4DifQuOPZyWj4u49J3/mpWfg2EpY/gxW68uI2/wDETj/to9NPB8GJd9PCv/56ov8A9qa5A8/0i3dnv83n+oV/9KvybHfkHgrHvhhv/wDYVP8A96eaeP4KUe9Yn/8AM1Jf7bNege/6Rfvz3+Z/qFf/AEq/JsJRr8EbaXMpYndedKrP/ZZ7/wCX/Ciwjtb0rB7f9nxnX6uCNbAex6GpPtZLz8T/AFK0ezSsfBsbdccdJ2sNrCxyVb3KjGmv7xiqvHyxW7hpq6qS8HK7hD8IMocHseg9H31398y5/wBU1Pdbb4QtnI8dtS1VtY43H2q8JS56kvvaX3EeyPFjXt6kpZ2dul3erUYUn9YpP7yDgt4/R+lx+zjj5IL6zPf2rz83svspk7+bne5C7uZPvdWtKX4s8YBbiIjorTO4AD0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf/9k=";

  return (
    <div style={{
      background: "#080808",
      color: "#fff",
      minHeight: "100vh",
      fontFamily: "'Cormorant Garamond', serif",
      overflowX: "hidden",
    }}>

      {/* ── LOADING SCREEN ── */}
      {loading && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 9999,
          background: "#050505",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          gap: 32,
          transition: "opacity 0.6s ease",
          opacity: loadProgress === 100 ? 0 : 1,
          pointerEvents: loadProgress === 100 ? "none" : "all",
        }}>
          {/* Spinning ring */}
          <div style={{ position: "relative", width: 140, height: 140 }}>
            <div style={{
              position: "absolute", inset: 0,
              borderRadius: "50%",
              border: "1.5px solid rgba(200,168,75,0.15)",
            }} />
            <div style={{
              position: "absolute", inset: 0,
              borderRadius: "50%",
              border: "2px solid transparent",
              borderTopColor: "#c8a84b",
              borderRightColor: "#f5e07a",
              animation: "spin-slow 1.2s linear infinite",
            }} />
            <div style={{
              position: "absolute", inset: 10,
              borderRadius: "50%",
              border: "1px solid transparent",
              borderBottomColor: "rgba(200,168,75,0.4)",
              animation: "spin-slow 2s linear infinite reverse",
            }} />
            {/* Logo in centre */}
            <img src={logoUrl} alt="Luxe Lane" style={{
              position: "absolute",
              top: "50%", left: "50%",
              transform: "translate(-50%,-50%)",
              width: 90, height: 90,
              borderRadius: "50%",
              objectFit: "cover",
            }} />
          </div>

          {/* Brand name */}
          <div style={{ textAlign: "center" }}>
            <p style={{
              fontFamily: "'Josefin Sans', sans-serif",
              fontSize: 11, letterSpacing: 6,
              color: "rgba(200,168,75,0.6)",
              textTransform: "uppercase",
              marginBottom: 6,
            }}>Welcome to</p>
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(28px,6vw,42px)",
              fontWeight: 700,
              background: goldGradient,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              margin: 0,
            }}>Luxe Lane</h1>
          </div>

          {/* Progress bar */}
          <div style={{ width: 180, textAlign: "center" }}>
            <div style={{
              width: "100%", height: 2,
              background: "rgba(200,168,75,0.12)",
              borderRadius: 2, overflow: "hidden",
              marginBottom: 10,
            }}>
              <div style={{
                height: "100%",
                width: `${loadProgress}%`,
                background: goldGradient,
                borderRadius: 2,
                transition: "width 0.15s ease",
              }} />
            </div>
            <p style={{
              fontFamily: "'Josefin Sans', sans-serif",
              fontSize: 10, letterSpacing: 3,
              color: "rgba(200,168,75,0.45)",
            }}>{loadProgress}%</p>
          </div>
        </div>
      )}

      {/* ── WHATSAPP FLOATING BUTTON ── */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi Luxe Lane! 👋\n\nI'd love to know more about your collections. Could you help me?")}`}
        target="_blank"
        rel="noopener noreferrer"
        title="Order on WhatsApp"
        style={{
          position: "fixed", bottom: 90, right: 24, zIndex: 900,
          width: 52, height: 52, borderRadius: "50%",
          background: "linear-gradient(135deg,#25d366,#128c7e)",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 4px 20px rgba(37,211,102,0.35)",
          textDecoration: "none",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          animation: "glow-whatsapp 3s ease-in-out infinite",
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = "scale(1.12)";
          e.currentTarget.style.boxShadow = "0 6px 28px rgba(37,211,102,0.55)";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 4px 20px rgba(37,211,102,0.35)";
        }}
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="#fff">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

      {/* ── BACK TO TOP BUTTON ── */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        title="Back to top"
        style={{
          position: "fixed", bottom: 24, right: 24, zIndex: 900,
          width: 52, height: 52, borderRadius: "50%",
          background: "rgba(10,10,10,0.9)",
          border: "1px solid rgba(200,168,75,0.4)",
          cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
          opacity: showBackTop ? 1 : 0,
          transform: showBackTop ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.3s ease, transform 0.3s ease",
          pointerEvents: showBackTop ? "all" : "none",
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = "rgba(200,168,75,0.15)";
          e.currentTarget.style.borderColor = "#c8a84b";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = "rgba(10,10,10,0.9)";
          e.currentTarget.style.borderColor = "rgba(200,168,75,0.4)";
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c8a84b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="18 15 12 9 6 15"/>
        </svg>
      </button>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Cormorant+Garamond:wght@300;400;500;600&family=Josefin+Sans:wght@200;300;400;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0a0a0a; }
        ::-webkit-scrollbar-thumb { background: #c8a84b; border-radius: 2px; }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(200,168,75,0.3); }
          50% { box-shadow: 0 0 40px rgba(200,168,75,0.6); }
        }
        @keyframes glow-whatsapp {
          0%, 100% { box-shadow: 0 4px 20px rgba(37,211,102,0.35); }
          50% { box-shadow: 0 4px 32px rgba(37,211,102,0.65); }
        }
        @keyframes glow-breathe {
          0%, 100% { transform: translate(-50%,-50%) scale(1); opacity: 1; }
          50% { transform: translate(-50%,-50%) scale(1.12); opacity: 0.7; }
        }
        @keyframes spin-ccw {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        @keyframes particle-float {
          0%   { transform: translateY(0px) translateX(0px); opacity: var(--op, 0.3); }
          33%  { transform: translateY(-14px) translateX(6px); }
          66%  { transform: translateY(-6px) translateX(-8px); }
          100% { transform: translateY(-18px) translateX(4px); opacity: calc(var(--op, 0.3) * 0.4); }
        }
        .desktop-nav { display: flex; }
        .hamburger-btn { display: none; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
      `}</style>

      {/* Navbar */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrollY > 50 ? "rgba(8,8,8,0.97)" : "rgba(8,8,8,0.6)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(200,168,75,0.15)",
        transition: "all 0.4s ease",
      }}>
        {/* Main nav row */}
        <div style={{
          maxWidth: 1200, margin: "0 auto",
          padding: "0 24px",
          height: 70,
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          {/* Logo */}
          <img src={logoUrl} alt="Luxe Lane" style={{
            height: 52, width: 52,
            borderRadius: "50%",
            objectFit: "cover",
            filter: "drop-shadow(0 0 8px rgba(200,168,75,0.35))",
          }} />

          {/* Desktop Nav Links */}
          <div style={{
            display: "flex", alignItems: "center", gap: 36,
          }} className="desktop-nav">
            {[
              { label: "Home", href: "#home" },
              { label: "Women", href: "#collections" },
              { label: "Kids", href: "#collections" },
              { label: "Fabrics", href: "#fabrics" },
            ].map(link => (
              <a key={link.label} href={link.href} style={{
                fontFamily: "'Josefin Sans', sans-serif",
                fontSize: 12,
                letterSpacing: 2.5,
                textTransform: "uppercase",
                color: "#bbb",
                textDecoration: "none",
                position: "relative",
                paddingBottom: 4,
                transition: "color 0.3s",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = "#c8a84b";
                e.currentTarget.querySelector(".underline").style.width = "100%";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = "#bbb";
                e.currentTarget.querySelector(".underline").style.width = "0%";
              }}
              >
                {link.label}
                <span className="underline" style={{
                  position: "absolute", bottom: 0, left: 0,
                  width: "0%", height: 1,
                  background: goldGradient,
                  transition: "width 0.3s ease",
                  display: "block",
                }} />
              </a>
            ))}
          </div>

          {/* Right side: Instagram + Hamburger */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: goldGradient,
                color: "#000",
                fontFamily: "'Josefin Sans', sans-serif",
                fontWeight: 700,
                fontSize: 11,
                letterSpacing: 2,
                textTransform: "uppercase",
                padding: "9px 20px",
                borderRadius: 30,
                textDecoration: "none",
                display: "flex", alignItems: "center", gap: 7,
                whiteSpace: "nowrap",
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              Follow Us
            </a>

            {/* Hamburger (mobile) */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                padding: 8, display: "flex", flexDirection: "column",
                gap: 5, alignItems: "center",
              }}
              className="hamburger-btn"
            >
              {[0,1,2].map(i => (
                <span key={i} style={{
                  display: "block", width: 22, height: 1.5,
                  background: "#c8a84b",
                  borderRadius: 2,
                  transition: "all 0.3s ease",
                  transform: menuOpen
                    ? i === 0 ? "translateY(6.5px) rotate(45deg)"
                    : i === 2 ? "translateY(-6.5px) rotate(-45deg)"
                    : "scaleX(0)"
                    : "none",
                }} />
              ))}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <div style={{
          maxHeight: menuOpen ? 300 : 0,
          overflow: "hidden",
          transition: "max-height 0.4s ease",
          background: "rgba(8,8,8,0.98)",
          borderTop: menuOpen ? "1px solid rgba(200,168,75,0.1)" : "none",
        }}>
          <div style={{ padding: "12px 24px 20px", display: "flex", flexDirection: "column", gap: 4 }}>
            {[
              { label: "Home", href: "#home" },
              { label: "Women", href: "#collections" },
              { label: "Kids", href: "#collections" },
              { label: "Fabrics", href: "#fabrics" },
            ].map((link, i) => (
              <a key={link.label} href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: "'Josefin Sans', sans-serif",
                  fontSize: 13, letterSpacing: 3,
                  textTransform: "uppercase",
                  color: "#c8a84b",
                  textDecoration: "none",
                  padding: "12px 0",
                  borderBottom: i < 3 ? "1px solid rgba(200,168,75,0.08)" : "none",
                  display: "flex", alignItems: "center", gap: 10,
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen ? "translateX(0)" : "translateX(-10px)",
                  transition: `all 0.3s ease ${i * 60}ms`,
                }}
              >
                <span style={{ width: 20, height: 1, background: goldGradient, display: "inline-block" }} />
                {link.label}
              </a>
            ))}
            <a
              href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer"
              style={{
                marginTop: 12,
                background: goldGradient,
                color: "#000",
                fontFamily: "'Josefin Sans', sans-serif",
                fontWeight: 700, fontSize: 11, letterSpacing: 2,
                textTransform: "uppercase",
                padding: "12px 20px", borderRadius: 30,
                textDecoration: "none",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              @luxe._.lane
            </a>
          </div>
        </div>
      </nav>

      {/* ── HERO — DARK STARFIELD ── */}
      <section id="home" style={{
        minHeight: "100vh",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        position: "relative", textAlign: "center", padding: "120px 24px 80px",
        overflow: "hidden",
        background: "radial-gradient(ellipse at 50% 40%, #0d0900 0%, #050505 70%)",
      }}>

        {/* ── Gold floating particles ── */}
        {particles.map(p => (
          <div key={p.id} style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: `radial-gradient(circle, #f5e07a, #c8a84b)`,
            opacity: p.opacity,
            animation: `particle-float ${p.duration}s ease-in-out ${p.delay}s infinite alternate`,
            pointerEvents: "none",
            boxShadow: p.size > 2 ? `0 0 ${p.size * 3}px rgba(200,168,75,0.5)` : "none",
          }} />
        ))}

        {/* ── Deep glow behind logo ── */}
        <div style={{
          position: "absolute",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: 520, height: 520,
          background: "radial-gradient(circle, rgba(200,168,75,0.08) 0%, rgba(200,168,75,0.03) 40%, transparent 70%)",
          borderRadius: "50%",
          pointerEvents: "none",
          animation: "glow-breathe 4s ease-in-out infinite",
        }} />

        {/* ── Logo inside rings ── */}
        <div style={{
          position: "relative",
          width: "clamp(220px, 38vw, 320px)",
          height: "clamp(220px, 38vw, 320px)",
          marginBottom: 52,
          opacity: heroVisible ? 1 : 0,
          transform: heroVisible ? "scale(1)" : "scale(0.85)",
          transition: "all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s",
        }}>
          {/* Outer slow-spin dashed ring */}
          <div style={{
            position: "absolute", inset: -22,
            borderRadius: "50%",
            border: "1px dashed rgba(200,168,75,0.25)",
            animation: "spin-ccw 18s linear infinite",
          }} />
          {/* Diamond dots on outer ring */}
          {[0,60,120,180,240,300].map(deg => (
            <div key={deg} style={{
              position: "absolute",
              top: "50%", left: "50%",
              width: 5, height: 5,
              marginTop: -2.5, marginLeft: -2.5,
              background: "#c8a84b",
              borderRadius: "1px",
              transform: `rotate(${deg}deg) translateY(-${(parseInt("clamp(220px, 38vw, 320px)") / 2) + 22 + 2}px) rotate(45deg)`,
              transformOrigin: "center center",
              opacity: 0.7,
              boxShadow: "0 0 6px rgba(200,168,75,0.6)",
            }} />
          ))}

          {/* Middle ring — spins opposite */}
          <div style={{
            position: "absolute", inset: -10,
            borderRadius: "50%",
            border: "1.5px solid rgba(200,168,75,0.18)",
            animation: "spin-slow 10s linear infinite",
          }} />

          {/* Inner glowing ring */}
          <div style={{
            position: "absolute", inset: 0,
            borderRadius: "50%",
            border: "2px solid transparent",
            borderTopColor: "#c8a84b",
            borderRightColor: "#f5e07a",
            borderBottomColor: "rgba(200,168,75,0.3)",
            animation: "spin-slow 4s linear infinite",
            boxShadow: "inset 0 0 20px rgba(200,168,75,0.06)",
          }} />

          {/* Logo circle */}
          <img src={logoUrl} alt="Luxe Lane" style={{
            position: "absolute", inset: 10,
            width: "calc(100% - 20px)",
            height: "calc(100% - 20px)",
            borderRadius: "50%",
            objectFit: "cover",
            filter: "drop-shadow(0 0 18px rgba(200,168,75,0.5))",
          }} />
        </div>

        {/* ── Text block ── */}
        <div style={{
          opacity: heroVisible ? 1 : 0,
          transform: heroVisible ? "translateY(0)" : "translateY(28px)",
          transition: "all 0.9s ease 0.8s",
          zIndex: 2,
        }}>
          <p style={{
            fontFamily: "'Josefin Sans', sans-serif",
            fontSize: "clamp(9px, 1.8vw, 11px)",
            letterSpacing: 7,
            color: "rgba(200,168,75,0.7)",
            textTransform: "uppercase",
            marginBottom: 14,
          }}>✦ &nbsp; Where Elegance Meets Comfort &nbsp; ✦</p>

          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(38px, 8vw, 82px)",
            fontWeight: 700,
            lineHeight: 1.05,
            marginBottom: 12,
            background: "linear-gradient(135deg, #c8a84b 0%, #f5e07a 35%, #fff8dc 50%, #f5e07a 65%, #a67c2a 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            textShadow: "none",
          }}>Luxe Lane</h1>

          <p style={{
            fontFamily: "'Josefin Sans', sans-serif",
            fontSize: "clamp(9px, 1.8vw, 11px)",
            letterSpacing: 5,
            color: "#3a3020",
            textTransform: "uppercase",
            marginBottom: 28,
          }}>— Clothing Brand —</p>

          <p style={{
            color: "#666",
            fontSize: "clamp(13px, 2vw, 16px)",
            maxWidth: 480, margin: "0 auto 44px",
            lineHeight: 1.9, fontWeight: 300,
            fontFamily: "'Cormorant Garamond', serif",
          }}>
            Premium dresses for women &amp; children, crafted from the finest
            cotton, linen &amp; polyester. Timeless style, elevated comfort.
          </p>

          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              background: goldGradient,
              color: "#000",
              padding: "15px 36px",
              borderRadius: 50,
              textDecoration: "none",
              fontFamily: "'Josefin Sans', sans-serif",
              fontSize: 11, fontWeight: 700,
              letterSpacing: 2.5, textTransform: "uppercase",
              animation: "glow-pulse 3s ease-in-out infinite",
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              Shop on Instagram
            </a>
            <a href="#collections" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              border: "1px solid rgba(200,168,75,0.35)",
              color: "#c8a84b",
              padding: "15px 32px",
              borderRadius: 50,
              textDecoration: "none",
              fontFamily: "'Josefin Sans', sans-serif",
              fontSize: 11, letterSpacing: 2.5, textTransform: "uppercase",
            }}>
              Explore Collections ↓
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
          opacity: 0.35,
        }}>
          <div style={{ width: 1, height: 44, background: goldGradient, animation: "float 2s ease-in-out infinite" }} />
          <span style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: 9, letterSpacing: 3, color: "#c8a84b" }}>SCROLL</span>
        </div>
      </section>

      {/* Fabrics Section */}
      <section style={{ padding: "80px 24px", maxWidth: 1100, margin: "0 auto" }}>
        <div ref={fabricRef} style={{
          textAlign: "center", marginBottom: 60,
          opacity: fabricInView ? 1 : 0,
          transform: fabricInView ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.7s ease",
        }}>
          <p style={{
            fontFamily: "'Josefin Sans', sans-serif",
            fontSize: 11, letterSpacing: 5, color: "#c8a84b",
            textTransform: "uppercase", marginBottom: 12,
          }}>Our Materials</p>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(28px, 5vw, 46px)",
            ...goldText, marginBottom: 16,
          }}>The Fabric of Luxury</h2>
          <p style={{ color: "#666", fontSize: 15, maxWidth: 500, margin: "0 auto" }}>
            Every piece we craft begins with a conscious choice of fabric — because quality starts from within.
          </p>
        </div>
        <GoldDivider />
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 24,
        }}>
          {fabrics.map((f, i) => <FabricCard key={f.name} fabric={f} delay={i * 150} />)}
        </div>
      </section>

      {/* ── WOMEN'S COLLECTION ── */}
      <section id="collections" style={{ padding: "80px 24px", maxWidth: 1100, margin: "0 auto" }}>
        <div ref={collectionsRef} style={{
          textAlign: "center", marginBottom: 50,
          opacity: collectionsInView ? 1 : 0,
          transform: collectionsInView ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.7s ease",
        }}>
          {/* Section label */}
          <p style={{
            fontFamily: "'Josefin Sans', sans-serif",
            fontSize: 11, letterSpacing: 5, color: "#c8a84b",
            textTransform: "uppercase", marginBottom: 12,
          }}>Our Collections</p>

          {/* Women heading */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 8 }}>
            <div style={{ flex: 1, maxWidth: 120, height: 1, background: goldGradient, opacity: 0.4 }} />
            <span style={{ fontSize: 28 }}>👗</span>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(26px, 5vw, 44px)",
              margin: 0,
              ...goldText,
            }}>Women</h2>
            <span style={{ fontSize: 28 }}>👗</span>
            <div style={{ flex: 1, maxWidth: 120, height: 1, background: goldGradient, opacity: 0.4 }} />
          </div>
          <p style={{ color: "#555", fontSize: 14, fontFamily: "'Josefin Sans', sans-serif", letterSpacing: 2, textTransform: "uppercase", marginTop: 8 }}>
            Crafted for the Modern Woman
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
          gap: 28,
          marginBottom: 24,
        }}>
          {womenProducts.map((p, i) => (
            <ProductCard key={p.name} product={p} delay={i * 120} category="women" />
          ))}
        </div>

        {/* View all women CTA */}
        <div style={{ textAlign: "center", marginTop: 36 }}>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            border: "1px solid rgba(200,168,75,0.4)",
            color: "#c8a84b",
            fontFamily: "'Josefin Sans', sans-serif",
            fontSize: 11, letterSpacing: 2.5,
            textTransform: "uppercase",
            padding: "12px 32px", borderRadius: 50,
            textDecoration: "none",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(200,168,75,0.1)"; e.currentTarget.style.borderColor = "#c8a84b"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(200,168,75,0.4)"; }}
          >
            View All Women's Styles ↗
          </a>
        </div>
      </section>

      {/* Gold divider between sections */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, transparent, rgba(200,168,75,0.3))" }} />
          <span style={{ color: "#c8a84b", fontSize: 20, opacity: 0.5 }}>✦ ✦ ✦</span>
          <div style={{ flex: 1, height: 1, background: "linear-gradient(to left, transparent, rgba(200,168,75,0.3))" }} />
        </div>
      </div>

      {/* ── KIDS' COLLECTION ── */}
      <section style={{ padding: "80px 24px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{
          textAlign: "center", marginBottom: 50,
        }}>
          <p style={{
            fontFamily: "'Josefin Sans', sans-serif",
            fontSize: 11, letterSpacing: 5, color: "#c8a84b",
            textTransform: "uppercase", marginBottom: 12,
          }}>Mini Luxe</p>

          {/* Kids heading */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 8 }}>
            <div style={{ flex: 1, maxWidth: 120, height: 1, background: goldGradient, opacity: 0.4 }} />
            <span style={{ fontSize: 28 }}>🧒</span>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(26px, 5vw, 44px)",
              margin: 0,
              ...goldText,
            }}>Kids</h2>
            <span style={{ fontSize: 28 }}>🧒</span>
            <div style={{ flex: 1, maxWidth: 120, height: 1, background: goldGradient, opacity: 0.4 }} />
          </div>
          <p style={{ color: "#555", fontSize: 14, fontFamily: "'Josefin Sans', sans-serif", letterSpacing: 2, textTransform: "uppercase", marginTop: 8 }}>
            Dressed to Delight
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
          gap: 28,
          marginBottom: 24,
        }}>
          {kidsProducts.map((p, i) => (
            <ProductCard key={p.name} product={p} delay={i * 120} category="kids" />
          ))}
        </div>

        {/* View all kids CTA */}
        <div style={{ textAlign: "center", marginTop: 36 }}>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            border: "1px solid rgba(200,168,75,0.4)",
            color: "#c8a84b",
            fontFamily: "'Josefin Sans', sans-serif",
            fontSize: 11, letterSpacing: 2.5,
            textTransform: "uppercase",
            padding: "12px 32px", borderRadius: 50,
            textDecoration: "none",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(200,168,75,0.1)"; e.currentTarget.style.borderColor = "#c8a84b"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(200,168,75,0.4)"; }}
          >
            View All Kids' Styles ↗
          </a>
        </div>
      </section>

      {/* Instagram CTA */}
      <section style={{ padding: "80px 24px" }}>
        <div
          ref={ctaRef}
          style={{
            maxWidth: 900, margin: "0 auto",
            borderRadius: 28,
            overflow: "hidden",
            position: "relative",
            opacity: ctaInView ? 1 : 0,
            transform: ctaInView ? "translateY(0)" : "translateY(40px)",
            transition: "all 0.8s ease",
            border: "1px solid rgba(200,168,75,0.25)",
          }}
        >
          {/* Background photo */}
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "url(https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1200&q=80)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.18) saturate(0.4)",
          }} />

          {/* Gold overlay tint */}
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse at 50% 0%, rgba(200,168,75,0.1) 0%, rgba(5,4,0,0.6) 70%)",
          }} />

          {/* 4-photo strip at top */}
          <div style={{
            position: "relative", zIndex: 2,
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 3,
            height: 140,
            overflow: "hidden",
          }}>
            {[
              "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400&q=70",
              "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&q=70",
              "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400&q=70",
              "https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=400&q=70",
            ].map((src, i) => (
              <div key={i} style={{ position: "relative", overflow: "hidden" }}>
                <img src={src} alt="" style={{
                  width: "100%", height: "100%",
                  objectFit: "cover",
                  filter: "brightness(0.6) saturate(0.7)",
                }} />
                <div style={{
                  position: "absolute", inset: 0,
                  background: "rgba(8,6,0,0.35)",
                }} />
              </div>
            ))}
            {/* Gold shimmer bar over photos */}
            <div style={{
              position: "absolute", inset: 0, zIndex: 3,
              background: "linear-gradient(to bottom, transparent 60%, rgba(8,6,0,0.95) 100%)",
            }} />
            {/* Instagram grid icon */}
            <div style={{
              position: "absolute", top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 4,
              width: 52, height: 52,
              background: "rgba(8,6,0,0.75)",
              backdropFilter: "blur(8px)",
              border: "1.5px solid rgba(200,168,75,0.5)",
              borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="#c8a84b">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </div>
          </div>

          {/* Text content */}
          <div style={{
            position: "relative", zIndex: 2,
            padding: "36px clamp(24px, 6vw, 64px) 48px",
            textAlign: "center",
          }}>
            <p style={{
              fontFamily: "'Josefin Sans', sans-serif",
              fontSize: 10, letterSpacing: 5,
              color: "rgba(200,168,75,0.6)",
              textTransform: "uppercase",
              marginBottom: 12,
            }}>✦ &nbsp; Find Us On &nbsp; ✦</p>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(26px, 4vw, 40px)",
              ...goldText, marginBottom: 14,
            }}>Follow Our Journey</h2>
            <p style={{
              color: "#666", fontSize: "clamp(13px, 2vw, 15px)",
              lineHeight: 1.85, maxWidth: 460, margin: "0 auto 36px",
              fontFamily: "'Cormorant Garamond', serif",
            }}>
              Discover our latest collections, behind-the-scenes moments &amp;
              exclusive drops on Instagram. DM us to place your order!
            </p>

            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                background: goldGradient,
                color: "#000",
                padding: "15px 40px",
                borderRadius: 50,
                textDecoration: "none",
                fontFamily: "'Josefin Sans', sans-serif",
                fontSize: 11, fontWeight: 700,
                letterSpacing: 2.5, textTransform: "uppercase",
                animation: "glow-pulse 3s ease-in-out infinite",
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              @luxe._.lane
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: "1px solid #1a1500",
        padding: "40px 24px",
        textAlign: "center",
      }}>
        <img src={logoUrl} alt="Luxe Lane" style={{ height: 60, width: 60, borderRadius: "50%", objectFit: "cover", marginBottom: 16, opacity: 0.8 }} />
        <p style={{
          fontFamily: "'Josefin Sans', sans-serif",
          fontSize: 11, letterSpacing: 4,
          color: "#444", textTransform: "uppercase",
        }}>© 2025 Luxe Lane Clothing Brand · All Rights Reserved</p>
        <p style={{ color: "#333", fontSize: 12, marginTop: 8 }}>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer"
            style={{ color: "#c8a84b", textDecoration: "none" }}>@luxe._.lane</a>
        </p>
      </footer>
    </div>
  );
}
