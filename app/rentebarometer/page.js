"use client";
import { useState } from "react";
import { banker } from "../../lib/bankerData";
function formaterKr(tall) {
  return tall.toLocaleString("nb-NO", {
    style: "currency",
    currency: "NOK",
    maximumFractionDigits: 0,
  });
}
export default function RentebarometerPage() {
  const [belop, setBelop] = useState(20000);
  const [sortering, setSortering] = useState("hoeyest");

  const sorterteBanker = [...banker].sort((a, b) =>
    sortering === "hoeyest" ? b.rente - a.rente : a.rente - b.rente
  );

  const besteBank = sorterteBanker[0];
  const besteAvkastning = belop * (besteBank.rente / 100);

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
        Rentebarometer
      </h1>
      <p
        style={{
          color: "#6B7280",
          marginBottom: "1.5rem",
          fontSize: "clamp(0.9rem, 2vw, 1rem)",
        }}>
        Sammenlign sparerenter fra bank liste som er nevnt under.
      </p>

      {/* Beløp og sortering */}
      <div
        style={{
          background: "white",
          borderRadius: 16,
          padding: "clamp(1rem, 3vw, 1.5rem)",
          marginBottom: "1.5rem",
          boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}>
        <div>
          <label
            style={{
              display: "block",
              fontWeight: 600,
              marginBottom: "0.4rem",
              fontSize: "0.9rem",
            }}>
            Sparebeløp (kr)
          </label>
          <input
            type="number"
            value={belop}
            onChange={(e) => setBelop(Number(e.target.value))}
            min={0}
            step={1000}
            style={{
              border: "2px solid #E5E7EB",
              borderRadius: 10,
              padding: "0.6rem 0.8rem",
              fontSize: "1rem",
              outline: "none",
              width: "100%",
              maxWidth: 320,
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
            Sorter etter rente
          </label>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <button
              onClick={() => setSortering("hoeyest")}
              style={{
                border: "2px solid #2D6A4F",
                borderRadius: 100,
                padding: "0.4rem 1.1rem",
                fontWeight: 600,
                fontSize: "0.85rem",
                cursor: "pointer",
                background: sortering === "hoeyest" ? "#2D6A4F" : "white",
                color: sortering === "hoeyest" ? "white" : "#2D6A4F",
              }}>
              Høyest
            </button>
            <button
              onClick={() => setSortering("lavest")}
              style={{
                border: "2px solid #2D6A4F",
                borderRadius: 100,
                padding: "0.4rem 1.1rem",
                fontWeight: 600,
                fontSize: "0.85rem",
                cursor: "pointer",
                background: sortering === "lavest" ? "#2D6A4F" : "white",
                color: sortering === "lavest" ? "white" : "#2D6A4F",
              }}>
              Lavest
            </button>
          </div>
        </div>
      </div>

      {/* Beste tilbud */}
      {belop > 0 && (
        <div
          style={{
            background: "#2D6A4F",
            color: "white",
            borderRadius: 16,
            padding: "clamp(1rem, 3vw, 1.2rem) clamp(1rem, 3vw, 1.5rem)",
            marginBottom: "1.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "0.8rem",
          }}>
          <div>
            <p style={{ opacity: 0.8, fontSize: "0.85rem" }}>Beste tilbud </p>
            <p
              style={{
                fontWeight: 700,
                fontSize: "clamp(1rem, 2.5vw, 1.1rem)",
              }}>
              {besteBank.navn}
            </p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ opacity: 0.8, fontSize: "0.85rem" }}>
              Avkastning etter 1 år
            </p>
            <p
              style={{
                fontWeight: 800,
                fontSize: "clamp(1.2rem, 3vw, 1.5rem)",
              }}>
              {formaterKr(besteAvkastning)}
            </p>
          </div>
        </div>
      )}

      {/* Tabell */}
      <div
        style={{
          background: "white",
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
        }}>
        <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
          <table
            style={{ width: "100%", borderCollapse: "collapse", minWidth: 320 }}>
            <thead>
              <tr
                style={{
                  background: "#F9FAF8",
                  borderBottom: "2px solid #E5E7EB",
                }}>
                <th
                  style={{
                    padding:
                      "clamp(0.6rem, 2vw, 1rem) clamp(0.8rem, 2vw, 1.2rem)",
                    textAlign: "left",
                    fontWeight: 700,
                    fontSize: "clamp(0.75rem, 1.5vw, 0.85rem)",
                    color: "#6B7280",
                  }}>
                  BANK
                </th>
                <th
                  style={{
                    padding:
                      "clamp(0.6rem, 2vw, 1rem) clamp(0.8rem, 2vw, 1.2rem)",
                    textAlign: "right",
                    fontWeight: 700,
                    fontSize: "clamp(0.75rem, 1.5vw, 0.85rem)",
                    color: "#6B7280",
                  }}>
                  RENTE
                </th>
                <th
                  style={{
                    padding:
                      "clamp(0.6rem, 2vw, 1rem) clamp(0.8rem, 2vw, 1.2rem)",
                    textAlign: "right",
                    fontWeight: 700,
                    fontSize: "clamp(0.75rem, 1.5vw, 0.85rem)",
                    color: "#6B7280",
                  }}>
                  AVKASTNING (1 ÅR)
                </th>
              </tr>
            </thead>
            <tbody>
              {sorterteBanker.map((bank, idx) => {
                const avkastning = belop * (bank.rente / 100);
                const erBest = idx === 0;
                return (
                  <tr
                    key={bank.navn}
                    style={{
                      borderBottom: "1px solid #F3F4F6",
                      background: erBest ? "#F0FBF4" : "white",
                    }}>
                    <td
                      style={{
                        padding:
                          "clamp(0.6rem, 2vw, 0.9rem) clamp(0.8rem, 2vw, 1.2rem)",
                        fontSize: "clamp(0.85rem, 1.8vw, 1rem)",
                      }}>
                      {erBest && (
                        <span style={{ marginRight: "0.3rem" }}></span>
                      )}
                      <span style={{ fontWeight: erBest ? 700 : 400 }}>
                        {bank.navn}
                      </span>
                    </td>
                    <td
                      style={{
                        padding:
                          "clamp(0.6rem, 2vw, 0.9rem) clamp(0.8rem, 2vw, 1.2rem)",
                        textAlign: "right",
                      }}>
                      <span
                        style={{
                          background: erBest ? "#2D6A4F" : "#D8F3DC",
                          color: erBest ? "white" : "#2D6A4F",
                          padding: "0.2rem 0.6rem",
                          borderRadius: 100,
                          fontWeight: 700,
                          fontSize: "clamp(0.8rem, 1.5vw, 0.9rem)",
                          whiteSpace: "nowrap",
                        }}>
                        {bank.rente.toFixed(2)}%
                      </span>
                    </td>
                    <td
                      style={{
                        padding:
                          "clamp(0.6rem, 2vw, 0.9rem) clamp(0.8rem, 2vw, 1.2rem)",
                        textAlign: "right",
                        fontWeight: erBest ? 700 : 400,
                        color: erBest ? "#2D6A4F" : "#1B2D23",
                        fontSize: "clamp(0.85rem, 1.8vw, 1rem)",
                        whiteSpace: "nowrap",
                      }}>
                      {belop > 0 ? formaterKr(avkastning) : "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
