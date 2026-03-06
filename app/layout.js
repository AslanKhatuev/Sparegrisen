import "./globals.css";
import Header from "../components/Header";

export const metadata = {
  title: "Sparegrisen",
  description: "Din guide til bedre privatøkonomi",
};
export default function RootLayout({ children }) {
  return (
    <html lang="no">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
          />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          margin: 0,
          padding: 0,
        }}>
        <Header />
        <main style={{ flex: 1 }}>{children}</main>
      </body>
    </html>
  );
}
