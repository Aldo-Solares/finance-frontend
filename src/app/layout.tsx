// @/app/auth/layout.tsx

import "./globals.css";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
