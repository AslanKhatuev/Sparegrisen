"use client";
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,} from "recharts";

function formaterKr(tall) {
  return tall.toLocaleString("nb-NO", {
    style: "currency",
    currency: "NOK",
    maximumFractionDigits: 0,
  });
}
export function beregnSparedata(maanedligBelop, renteProsentAar, antallAar) {
  const data = [];
  const maanedligRente = renteProsentAar / 100 / 12;
  let saldo = 0;
  let innbetalt = 0;

  for (let aar = 0; aar <= antallAar; aar++) {
    if (aar === 0) {
      data.push({ aar: `År 0`, saldo: 0, innbetalt: 0, renter: 0 });
      continue;
    }
    for (let m = 0; m < 12; m++) {
      saldo = (saldo + maanedligBelop) * (1 + maanedligRente);
      innbetalt += maanedligBelop;
    }
    data.push({
      aar: `År ${aar}`,
      saldo: Math.round(saldo),
      innbetalt: Math.round(innbetalt),
      renter: Math.round(saldo - innbetalt),
    });
  }
  return data;
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: "white",
          border: "2px solid #D8F3DC",
          borderRadius: 12,
          padding: "0.8rem 1rem",
          boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
          fontSize: "clamp(0.8rem, 1.5vw, 0.9rem)",
        }}>
        <p style={{ fontWeight: 700, marginBottom: "0.4rem" }}>{label}</p>
        {payload.map((entry) => (
          <p
            key={entry.name}
            style={{ color: entry.color, marginBottom: "0.2rem" }}>
            {entry.name === "saldo"
              ? "Total saldo"
              : entry.name === "innbetalt"
              ? "Innbetalt"
              : "Renteinntekt"}
            : {formaterKr(entry.value)}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function SpareGraf({ data }) {
  return (
    <div style={{ width: "100%", height: "clamp(200px, 40vw, 300px)" }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="gradSaldo" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2D6A4F" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#2D6A4F" stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="gradInnbetalt" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#F4A261" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#F4A261" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis dataKey="aar" tick={{ fontSize: 11, fill: "#6B7280" }} />
          <YAxis
            tickFormatter={(v) =>
              v >= 1000000
                ? `${(v / 1000000).toFixed(1)}M`
                : v >= 1000
                ? `${(v / 1000).toFixed(0)}k`
                : v
            }
            tick={{ fontSize: 11, fill: "#6B7280" }}
            width={50}/>
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="innbetalt"
            stroke="#F4A261"
            strokeWidth={2}
            fill="url(#gradInnbetalt)"
            name="innbetalt"/>
          <Area
            type="monotone"
            dataKey="saldo"
            stroke="#2D6A4F"
            strokeWidth={2.5}
            fill="url(#gradSaldo)"
            name="saldo"/>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
