import { type Metadata } from 'next'
import {
  ClerkProvider,
} from '@clerk/nextjs'
import { esES } from "@clerk/localizations";
import { dark } from "@clerk/themes";
import { Lato, Playfair_Display } from 'next/font/google'
import './globals.css'

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-sans",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
})

export const metadata: Metadata = {
  title: "Freedom Lifestyle Key | Tailwind v4.0 Premium Parity",
  description: "Casas con Pasaporte Global.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider
      localization={esES}
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: "#D4AF37", // brand-gold
          colorBackground: "#050505", // brand-black
          colorText: "#ffffff",
          colorInputBackground: "#ffffff08",
          colorInputText: "#ffffff",
          fontFamily: "var(--font-sans)",
          borderRadius: "0.75rem",
        },
        elements: {
          card: "bg-[#050505] border border-white/10 shadow-glow",
          headerTitle: "font-serif italic text-brand-gold",
          headerSubtitle: "text-white/60",
          socialButtonsBlockButton: "bg-white/5 border border-white/10 hover:bg-white/10 text-white",
          socialButtonsBlockButtonText: "text-white font-sans",
          formButtonPrimary: "bg-brand-gold hover:bg-[#b08d28] text-brand-black font-bold uppercase tracking-widest",
          footerActionLink: "text-brand-gold hover:text-[#b08d28]",
          footer: "hidden", // Hide "Secured by Clerk" if allowed or style it discreetly
        }
      }}
    >
      <html lang="es" suppressHydrationWarning>
        <head>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        </head>
        <body className={`${lato.variable} ${playfair.variable} antialiased bg-[#050505] text-[#E2E8F0]`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
