export default function Hero() {
  return (
    <div
      style={{ textAlign: "center", marginBottom: "clamp(2rem, 6vw, 4rem)" }}>
      <h1
        style={{
          fontSize: "clamp(2rem, 6vw, 3.5rem)",
          fontWeight: 800,
          color: "#2D6A4F",
          marginBottom: "1rem",
          lineHeight: 1.1,
        }}>
        Sparegrisen
      </h1>
      <p
        style={{
          fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
          color: "#6B7280",
          maxWidth: 560,
          margin: "0 auto 2rem",
          lineHeight: 1.6,
        }}>
        Her sjekker du din privatokonomi. Se renter, beregn sparing og finn ut
        hva du sparer ved a kutte vaner.
      </p>
      <a
        href="/sparekalkulator"
        style={{
          background: "#2D6A4F",
          color: "white",
          padding: "clamp(0.6rem, 2vw, 0.8rem) clamp(1.2rem, 3vw, 2rem)",
          borderRadius: 100,
          fontWeight: 700,
          fontSize: "clamp(0.9rem, 2vw, 1rem)",
          textDecoration: "none",
          display: "inline-block",
        }}>
        Kom i gang
      </a>
    </div>
  );
}
