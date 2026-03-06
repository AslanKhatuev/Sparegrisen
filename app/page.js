"use client";
import Hero from "../components/Hero";

export default function HomePage() {
  return (
    <div
      style={{
        maxWidth: 1100,
        margin: "0 auto",
        padding: "clamp(2rem, 6vw, 4rem) clamp(1rem, 3vw, 1.5rem)",
      }}>
      <Hero />

      {/* Kort */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "clamp(1rem, 3vw, 1.5rem)",
          marginBottom: "clamp(2rem, 6vw, 4rem)",
        }}>
        <FeatureCard
          href="/rentebarometer"
          icon={
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#2D6A4F" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M3 10h18M3 7l9-4 9 4M4 10v11M20 10v11M8 10v11M16 10v11M12 10v11"/>
            </svg>
          }
          title="Rentebarometer"
          description="Sammenlign renter fra ulike banker og se hva du kan tjene på sparepengene dine."
          color="#2D6A4F"
          bg="#D8F3DC"/>
        <FeatureCard
          href="/sparekalkulator"
          icon={
            <svg
              width="28"
              height="28"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#B45309"
              strokeWidth={2}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
            </svg>
          }
          title="Sparekalkulator"
          description="Legg inn månedlig sparing, rente og antall år - og se nøyaktig hva du ender opp med."
          color="#B45309"
          bg="#FFF3E0"/>
        <FeatureCard
          href="/kutt-en-vane"
          icon={
            <svg
              width="28"
              height="28"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#7B5EA7"
              strokeWidth={2}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"/>
              <circle cx="6" cy="6" r="3" stroke="#7B5EA7" strokeWidth={2} />
              <circle cx="6" cy="18" r="3" stroke="#7B5EA7" strokeWidth={2} />
            </svg>
          }
          title="Kutt en vane"
          description="Se hva du sparer hvis du bytter ut kostbare vaner med månedlig sparing på konto."
          color="#7B5EA7"
          bg="#F3EEF9"/>
      </div>

      {/* En liten beskjed fra meg:) */}
      <div
        style={{
          background: "#2D6A4F",
          borderRadius: 20,
          padding: "clamp(1.5rem, 4vw, 2.5rem)",
          color: "white",
          textAlign: "center",
        }}>
        <p
          style={{
            fontWeight: 600,
            marginBottom: "0.5rem",
            opacity: 0.8,
            fontSize: "clamp(0.9rem, 2vw, 1rem)",
          }}>
          Fra Aslan
        </p>
        <p
          style={{
            fontSize: "clamp(1rem, 2.5vw, 1.3rem)",
            fontWeight: 300,
            maxWidth: 600,
            margin: "0 auto",
            lineHeight: 1.7,
          }}>
          Jeg lagde Sparegrisen fordi jeg tror alle fortjener en enkel oversikt
          over pengene sine. Småsparing er undervurdert.
        </p>
      </div>
    </div>
  );
}

function FeatureCard({ href, icon, title, description, color, bg }) {
  return (
    <a
      href={href}
      style={{
        background: "white",
        borderRadius: 20,
        padding: "clamp(1.2rem, 3vw, 2rem)",
        textDecoration: "none",
        color: "#1B2D23",
        boxShadow: "0 2px 12px rgba(27,45,35,0.07)",
        display: "block",
        transition: "transform 0.2s, box-shadow 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(27,45,35,0.12)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 12px rgba(27,45,35,0.07)";
      }}>
      <div
        style={{
          width: 52,
          height: 52,
          background: bg,
          borderRadius: 14,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "1rem",
        }}>
        {icon}
      </div>
      <h3
        style={{
          fontWeight: 700,
          fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
          marginBottom: "0.5rem",
          color,
        }}>
        {title}
      </h3>
      <p
        style={{
          color: "#6B7280",
          lineHeight: 1.6,
          fontSize: "clamp(0.85rem, 2vw, 0.95rem)",
        }}>
        {description}
      </p>
    </a>
  );
}
