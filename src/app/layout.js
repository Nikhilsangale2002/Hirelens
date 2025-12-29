import "./globals.css";

export const metadata = {
  title: "HireLens AI - AI-Powered Recruitment Platform",
  description: "Transform your recruitment process with AI that understands resumes like a human, ranks candidates objectively, and delivers insights instantly.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
