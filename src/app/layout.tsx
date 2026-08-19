// @/app/layout.tsx

import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es"suppressHydrationWarning >
      <title>ISHA</title>
      <body>
        {children}
      </body>
    </html>
  );
}
