"use client";
import { useSparekalkStore } from "../../store/store";
import SpareGraf, { beregnSparedata } from "../../components/Sparegraf";

function formaterKr(tall) {
  return tall.toLocaleString("nb-NO", {
    style: "currency",
    currency: "NOK",
    maximumFractionDigits: 0,
  });
}

export default function SparekalkPage() {
  const {
    maanedligBelop,
    rente,
    antallAar,
    setMaanedligBelop,
    setRente,
    setAntallAar,
  } = useSparekalkStore();

  const data = beregnSparedata(maanedligBelop, rente, antallAar);
  const sluttverdi = data[data.length - 1];
  const totalSaldo = sluttverdi?.saldo || 0;
  const totalInnbetalt = sluttverdi?.innbetalt || 0;
  const totalRenter = sluttverdi?.renter || 0;

  return (
    <div
      style={{
        maxWidth: 900,
        margin: "0 auto",
        padding: "clamp(1rem, 4vw, 2.5rem) clamp(1rem, 3vw, 1.5rem)",
      }}>
      <h1
        style={{
          fontSize: "clamp(1.5rem, 4vw, 2rem)",
          fontWeight: 800,
          color: "#2D6A4F",
          marginBottom: "0.5rem",
        }}>
        Sparekalkulator
      </h1>
      <p
        style={{
          color: "#6B7280",
          marginBottom: "2rem",
          fontSize: "clamp(0.9rem, 2vw, 1rem)",
        }}>
        Beregn hva sparingen din vokser til over tid. Verdiene lagres
        automatisk.
      </p>

      {/* Inputs */}
      <div
        style={{
          background: "white",
          borderRadius: 16,
          padding: "clamp(1rem, 3vw, 1.5rem)",
          marginBottom: "1.5rem",
          boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
        }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1.2rem",
          }}>
          <div>
            <label
              style={{
                display: "block",
                fontWeight: 600,
                marginBottom: "0.4rem",
                fontSize: "0.9rem",
              }}>
              Månedlig beløp (kr)
            </label>
            <input
              type="number"
              value={maanedligBelop}
              onChange={(e) =>
                setMaanedligBelop(Math.max(0, Number(e.target.value)))
              }
              min={0}
              step={100}
              style={{
                border: "2px solid #E5E7EB",
                borderRadius: 10,
                padding: "0.6rem 0.8rem",
                fontSize: "1rem",
                outline: "none",
                width: "100%",
              }}/>
          </div>
          <div>
            <label
              style={{
                display: "block",
                fontWeight: 600,
                marginBottom: "0.4rem",
                fontSize: "0.9rem",
              }}>
              Årsrente (%)
            </label>
            <input
              type="number"
              value={rente}
              onChange={(e) =>
                setRente(Math.max(0, Math.min(20, Number(e.target.value))))
              }
              min={0}
              max={20}
              step={0.1}
              style={{
                border: "2px solid #E5E7EB",
                borderRadius: 10,
                padding: "0.6rem 0.8rem",
                fontSize: "1rem",
                outline: "none",
                width: "100%",
              }}/>
          </div>
          <div>
            <label
              style={{
                display: "block",
                fontWeight: 600,
                marginBottom: "0.4rem",
                fontSize: "0.9rem",
              }}>
              Antall år
            </label>
            <input
              type="number"
              value={antallAar}
              onChange={(e) =>
                setAntallAar(Math.max(1, Math.min(50, Number(e.target.value))))
              }
              min={1}
              max={50}
              step={1}
              style={{
                border: "2px solid #E5E7EB",
                borderRadius: 10,
                padding: "0.6rem 0.8rem",
                fontSize: "1rem",
                outline: "none",
                width: "100%",
              }}/>
          </div>
        </div>
      </div>

      {/* Resultatkort */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: "1rem",
          marginBottom: "1.5rem",
        }}>
        <div
          style={{
            background: "#D8F3DC",
            borderRadius: 14,
            padding: "clamp(0.8rem, 2vw, 1.2rem)",
          }}>
          <p
            style={{
              fontSize: "0.8rem",
              color: "#2D6A4F",
              fontWeight: 600,
              marginBottom: "0.3rem",
            }}>
            Total saldo
          </p>
          <p
            style={{
              fontWeight: 800,
              fontSize: "clamp(1.1rem, 3vw, 1.5rem)",
              color: "#2D6A4F",
            }}>
            {formaterKr(totalSaldo)}
          </p>
        </div>
        <div
          style={{
            background: "#FFF3E0",
            borderRadius: 14,
            padding: "clamp(0.8rem, 2vw, 1.2rem)",
          }}>
          <p
            style={{
              fontSize: "0.8rem",
              color: "#B45309",
              fontWeight: 600,
              marginBottom: "0.3rem",
            }}>
            Totalt innbetalt
          </p>
          <p
            style={{
              fontWeight: 800,
              fontSize: "clamp(1.1rem, 3vw, 1.5rem)",
              color: "#B45309",
            }}>
            {formaterKr(totalInnbetalt)}
          </p>
        </div>
        <div
          style={{
            background: "#F3EEF9",
            borderRadius: 14,
            padding: "clamp(0.8rem, 2vw, 1.2rem)",
          }}>
          <p
            style={{
              fontSize: "0.8rem",
              color: "#7B5EA7",
              fontWeight: 600,
              marginBottom: "0.3rem",
            }}>
            Renteinntekter 🎉
          </p>
          <p
            style={{
              fontWeight: 800,
              fontSize: "clamp(1.1rem, 3vw, 1.5rem)",
              color: "#7B5EA7",
            }}>
            {formaterKr(totalRenter)}
          </p>
        </div>
      </div>

      {/* Graf */}
      <div
        style={{
          background: "white",
          borderRadius: 16,
          padding: "clamp(1rem, 3vw, 1.5rem)",
          boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
          marginBottom: "1.5rem",
        }}>
        <h2
          style={{
            fontWeight: 700,
            fontSize: "clamp(1rem, 2vw, 1.1rem)",
            marginBottom: "1.2rem",
          }}>
          Utvikling over {antallAar} år
        </h2>
        <SpareGraf data={data} />
      </div>

      {/* Slider */}
      <div
        style={{
          background: "white",
          borderRadius: 16,
          padding: "clamp(1rem, 3vw, 1.5rem)",
          boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
        }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontWeight: 600,
            fontSize: "0.9rem",
            marginBottom: "0.6rem",
          }}>
          <span>Antall år: {antallAar}</span>
          <span style={{ color: "#2D6A4F" }}>{formaterKr(totalSaldo)}</span>
        </div>
        <input
          type="range"
          min={1}
          max={40}
          value={antallAar}
          onChange={(e) => setAntallAar(Number(e.target.value))}
          style={{ width: "100%", accentColor: "#2D6A4F" }}/>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "0.8rem",
            color: "#6B7280",
            marginTop: "0.2rem",
          }}>
          <span>1 år</span>
          <span>40 år</span>
        </div>
      </div>
    </div>
  );
}
