"use client";
import { useState } from "react";
import { useVaneStore } from "../../store/store";
import SpareGraf, { beregnSparedata } from "../../components/Sparegraf";
function formaterKr(tall) {
  return tall.toLocaleString("nb-NO", {
    style: "currency",
    currency: "NOK",
    maximumFractionDigits: 0,
  });
}

let nextId = 100;

export default function KuttEnVanePage() {
  const {
    vaner,
    rente,
    antallAar,
    leggTilVane,
    fjernVane,
    oppdaterVane,
    setRente,
    setAntallAar,
  } = useVaneStore();
  const [nyNavn, setNyNavn] = useState("");
  const [nyKostnad, setNyKostnad] = useState(50);

  const totalPerDag = vaner.reduce(
    (sum, v) => sum + Number(v.kostnadPerDag),
    0
  );
  const maanedligSpart = Math.round(totalPerDag * 30.4);

  const data = beregnSparedata(maanedligSpart, rente, antallAar);
  const sluttverdi = data[data.length - 1];

  function handleLeggTil() {
    if (!nyNavn.trim()) return;
    leggTilVane({ id: nextId++, navn: nyNavn, kostnadPerDag: nyKostnad });
    setNyNavn("");
    setNyKostnad(50);
  }

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
        Kutt en vane
      </h1>
      <p
        style={{
          color: "#6B7280",
          marginBottom: "2rem",
          fontSize: "clamp(0.9rem, 2vw, 1rem)",
        }}>
        Legg inn vaner som koster penger og se hva du kan spare.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1.5rem",
        }}>
       
       {/* Vaner */}
        <div>
          <div
            style={{
              background: "white",
              borderRadius: 16,
              padding: "clamp(1rem, 3vw, 1.5rem)",
              boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
              marginBottom: "1rem",
            }}>
            <h2
              style={{
                fontWeight: 700,
                fontSize: "1rem",
                marginBottom: "1rem",
              }}>
              Mine vaner
            </h2>

            {vaner.length === 0 && (
              <p
                style={{
                  color: "#6B7280",
                  fontSize: "0.9rem",
                  textAlign: "center",
                  padding: "1rem",
                }}
              >
                Ingen vaner lagt til ennå.
              </p>
            )}

            {vaner.map((vane) => (
              <div
                key={vane.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.7rem",
                  background: "#F9FAF8",
                  borderRadius: 12,
                  marginBottom: "0.6rem",
                  flexWrap: "wrap",
                }}>
                <input
                  type="text"
                  value={vane.navn}
                  onChange={(e) =>
                    oppdaterVane(vane.id, "navn", e.target.value)
                  }
                  style={{
                    flex: 1,
                    minWidth: 100,
                    border: "none",
                    background: "transparent",
                    fontWeight: 500,
                    fontSize: "0.95rem",
                    outline: "none",
                  }}/>
                <input
                  type="number"
                  value={vane.kostnadPerDag}
                  onChange={(e) =>
                    oppdaterVane(
                      vane.id,
                      "kostnadPerDag",
                      Number(e.target.value)
                    )
                  }
                  min={0}
                  style={{
                    width: 70,
                    border: "2px solid #E5E7EB",
                    borderRadius: 8,
                    padding: "0.3rem 0.5rem",
                    fontSize: "0.9rem",
                    outline: "none",
                    textAlign: "right",
                  }}/>
                <span style={{ fontSize: "0.8rem", color: "#6B7280" }}>
                  kr/dag
                </span>
                <button
                  onClick={() => fjernVane(vane.id)}
                  style={{
                    background: "#FEE2E2",
                    border: "none",
                    color: "#EF4444",
                    borderRadius: 8,
                    width: 30,
                    height: 30,
                    cursor: "pointer",
                    fontSize: "1rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                  <svg
                    width="16"
                    height="16"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="#EF4444"
                    strokeWidth={2}>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            ))}

            {/* Legg til ny vane */}
            <div
              style={{
                borderTop: "2px dashed #E5E7EB",
                paddingTop: "1rem",
                marginTop: "0.5rem",
              }}>
              <p
                style={{
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  color: "#6B7280",
                  marginBottom: "0.6rem",
                }}>
                Legg til vane
              </p>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                <input
                  type="text"
                  placeholder="Navn på vane"
                  value={nyNavn}
                  onChange={(e) => setNyNavn(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleLeggTil()}
                  style={{
                    flex: 1,
                    minWidth: 120,
                    border: "2px solid #E5E7EB",
                    borderRadius: 10,
                    padding: "0.5rem 0.8rem",
                    fontSize: "0.95rem",
                    outline: "none",
                  }}/>
                <input
                  type="number"
                  value={nyKostnad}
                  onChange={(e) => setNyKostnad(Number(e.target.value))}
                  min={0}
                  style={{
                    width: 80,
                    border: "2px solid #E5E7EB",
                    borderRadius: 10,
                    padding: "0.5rem 0.8rem",
                    fontSize: "0.95rem",
                    outline: "none",
                  }}/>
                <span
                  style={{
                    alignSelf: "center",
                    fontSize: "0.8rem",
                    color: "#6B7280",
                  }}>
                  kr/dag
                </span>
                <button
                  onClick={handleLeggTil}
                  style={{
                    background: "#2D6A4F",
                    color: "white",
                    border: "none",
                    borderRadius: 100,
                    padding: "0.5rem 1.2rem",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    cursor: "pointer",
                  }}>
                  + Legg til
                </button>
              </div>
            </div>
          </div>

          {/* Total spart per måned */}
          <div
            style={{
              background: "#2D6A4F",
              borderRadius: 16,
              padding: "1.2rem 1.5rem",
              color: "white",
            }}>
            <p
              style={{
                opacity: 0.8,
                fontSize: "0.85rem",
                marginBottom: "0.3rem",
              }}>
              Totalt spart per måned
            </p>
            <p
              style={{ fontWeight: 800, fontSize: "clamp(1.5rem, 4vw, 2rem)" }}>
              {formaterKr(maanedligSpart)}
            </p>
            <p
              style={{ opacity: 0.7, fontSize: "0.8rem", marginTop: "0.2rem" }}>
              {vaner.length} vane(r) • {formaterKr(totalPerDag)} per dag
            </p>
          </div>
        </div>

        {/* Spareinnstillinger */}
        <div>
          <div
            style={{
              background: "white",
              borderRadius: 16,
              padding: "clamp(1rem, 3vw, 1.5rem)",
              boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
              marginBottom: "1rem",
            }}>
            <h2
              style={{
                fontWeight: 700,
                fontSize: "1rem",
                marginBottom: "1rem",
              }}>
              Spareinnstillinger
            </h2>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label
                  style={{
                    display: "block",
                    fontWeight: 600,
                    fontSize: "0.85rem",
                    marginBottom: "0.4rem",
                  }}>
                  Rente (%)
                </label>
                <input
                  type="number"
                  value={rente}
                  onChange={(e) => setRente(Number(e.target.value))}
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
                    display: "flex",
                    justifyContent: "space-between",
                    fontWeight: 600,
                    fontSize: "0.85rem",
                    marginBottom: "0.4rem",
                  }}>
                  <span>Antall år: {antallAar}</span>
                </label>
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
                  }}>
                  <span>1 år</span>
                  <span>40 år</span>
                </div>
              </div>
            </div>
          </div>

          {/* Resultatkort */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "0.8rem",
            }}>
            <div
              style={{
                background: "#D8F3DC",
                borderRadius: 14,
                padding: "1rem",
              }}>
              <p
                style={{
                  fontSize: "0.75rem",
                  color: "#2D6A4F",
                  fontWeight: 600,
                  marginBottom: "0.3rem",
                }}>
                Etter {antallAar} år
              </p>
              <p
                style={{
                  fontWeight: 800,
                  fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
                  color: "#2D6A4F",
                }}>
                {formaterKr(sluttverdi?.saldo || 0)}
              </p>
            </div>
            <div
              style={{
                background: "#F3EEF9",
                borderRadius: 14,
                padding: "1rem",
              }}>
              <p
                style={{
                  fontSize: "0.75rem",
                  color: "#7B5EA7",
                  fontWeight: 600,
                  marginBottom: "0.3rem",
                }}>
                Rentebonus
              </p>
              <p
                style={{
                  fontWeight: 800,
                  fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
                  color: "#7B5EA7",
                }}>
                {formaterKr(sluttverdi?.renter || 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Graf */}
      {maanedligSpart > 0 && (
        <div
          style={{
            background: "white",
            borderRadius: 16,
            padding: "clamp(1rem, 3vw, 1.5rem)",
            boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
            marginTop: "1.5rem",
          }}>
          <h2
            style={{
              fontWeight: 700,
              fontSize: "clamp(1rem, 2vw, 1.1rem)",
              marginBottom: "1.2rem",
            }}>
            Slik vokser sparingen din over {antallAar} år
          </h2>
          <SpareGraf data={data} />
        </div>
      )}

      {maanedligSpart === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "3rem",
            color: "#6B7280",
            marginTop: "1.5rem",
          }}>
          <p style={{ fontSize: "3rem" }}></p>
          <p>Legg til vaner for å se sparingspotensialet ditt</p>
        </div>
      )}
    </div>
  );
}
