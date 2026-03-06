"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { href: "/", label: "Hjem" },
    { href: "/rentebarometer", label: "Rentebarometer" },
    { href: "/sparekalkulator", label: "Sparekalkulator" },
    { href: "/kutt-en-vane", label: "Kutt en vane" },
  ];

  return (
    <header
      style={{
        background: "white",
        borderBottom: "2px solid #E5E7EB",
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxShadow: "0 2px 12px rgba(27,45,35,0.06)",
      }}
    >
      <div
        style={{
          width: "100%",
          padding: "0 2rem",
          height: 70,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxSizing: "border-box",
        }}
      >
        {/* Logo - Header */}
        <Link
          href="/"
          style={{
            textDecoration: "none",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            src="/sparegrisen.png"
            alt="Sparegrisen logo"
            style={{
              height: 65,
              width: "auto",
              objectFit: "contain",
            }}
          />
        </Link>

        {/* Desktop nav - høyre */}
        <nav
          className="desktop-nav"
          style={{
            display: "flex",
            gap: "0.3rem",
            marginLeft: "auto",
          }}
        >
          {links.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                style={{
                  fontWeight: 600,
                  fontSize: "0.88rem",
                  color: active ? "#2D6A4F" : "#1B2D23",
                  textDecoration: "none",
                  padding: "0.4rem 0.9rem",
                  borderRadius: 100,
                  background: active ? "#D8F3DC" : "transparent",
                }}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Hamburger knapp - høyre på mobil */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="hamburger-btn"
          style={{
            display: "none",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 5,
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "0.4rem",
            borderRadius: 8,
            marginLeft: "auto",
          }}
        >
          <span
            style={{
              display: "block",
              width: 24,
              height: 2.5,
              background: "#2D6A4F",
              borderRadius: 2,
              transition: "all 0.3s",
              transform: menuOpen
                ? "rotate(45deg) translate(5px, 5px)"
                : "none",
            }}
          />
          <span
            style={{
              display: "block",
              width: 24,
              height: 2.5,
              background: "#2D6A4F",
              borderRadius: 2,
              transition: "all 0.3s",
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            style={{
              display: "block",
              width: 24,
              height: 2.5,
              background: "#2D6A4F",
              borderRadius: 2,
              transition: "all 0.3s",
              transform: menuOpen
                ? "rotate(-45deg) translate(5px, -5px)"
                : "none",
            }}
          />
        </button>
      </div>

      {/* Mobil meny */}
      {menuOpen && (
        <div
          className="mobile-menu"
          style={{
            background: "white",
            borderTop: "1px solid #E5E7EB",
            padding: "1rem 2rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.4rem",
          }}
        >
          {links.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontWeight: 600,
                  fontSize: "1rem",
                  color: active ? "#2D6A4F" : "#1B2D23",
                  textDecoration: "none",
                  padding: "0.7rem 1rem",
                  borderRadius: 12,
                  background: active ? "#D8F3DC" : "#F9FAF8",
                }}
              >
                {label}
              </Link>
            );
          })}
        </div>
      )}

      <style>{`
        @media (max-width: 1024px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
        @media (min-width: 1025px) {
          .mobile-menu { display: none !important; }
        }
      `}</style>
    </header>
  );
}
