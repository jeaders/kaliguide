import { useEffect } from "react";
import { Link, useParams } from "wouter";
import { ShieldCheck, FileText, Scroll, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import MobileNav from "@/components/MobileNav";

const legalMap: Record<string, { title: string; description: string; sections: Array<{ heading: string; body: string; items?: string[] }> }> = {
  "terms-of-use": {
    title: "Terms of Use",
    description: "Condizioni generali per l’utilizzo di Kali Guide Hub e delle informazioni fornite.",
    sections: [
      {
        heading: "Accettazione dei termini",
        body: "Usando questa piattaforma accetti di rispettare queste condizioni. Le informazioni sono fornite solo a scopo educativo e non devono essere usate per attività illegali.",
      },
      {
        heading: "Accesso e responsabilità",
        body: "Sei responsabile dell’uso che fai del sito e delle azioni intraprese. L’accesso è consentito solo a utenti autorizzati e per scopi legittimi.",
      },
      {
        heading: "Modifiche ai termini",
        body: "Ci riserviamo il diritto di aggiornare questi termini in qualsiasi momento. Controlla regolarmente questa pagina per eventuali modifiche.",
      }
    ]
  },
  "privacy-policy": {
    title: "Privacy Policy",
    description: "Standard privacy policy che descrive il trattamento dei dati e l’utilizzo delle informazioni dell’utente.",
    sections: [
      {
        heading: "Dati raccolti",
        body: "Raccogliamo solo i dati strettamente necessari per migliorare l’esperienza utente. Non archiviamo dati sensibili né condividiamo informazioni con terze parti senza consenso.",
      },
      {
        heading: "Uso dei cookie",
        body: "Il sito può utilizzare cookie tecnici per mantenere lo stato della sessione e migliorare le prestazioni. Non usiamo cookie di profilazione invasivi.",
      },
      {
        heading: "Diritti dell’utente",
        body: "Hai il diritto di richiedere l’accesso ai tuoi dati, la correzione o la cancellazione. Contattaci se desideri esercitare questi diritti.",
      }
    ]
  },
  "ethical-guidelines": {
    title: "Ethical Guidelines",
    description: "Linee guida etiche per l’uso corretto degli strumenti di penetration testing e delle tecniche presentate.",
    sections: [
      {
        heading: "Agisci con autorizzazione",
        body: "Esegui test solo su sistemi che possiedi o per i quali hai esplicita autorizzazione. La mancanza di permesso rende l’attività illegale.",
      },
      {
        heading: "Rispetta la privacy",
        body: "Non divulgare informazioni sensibili o risultati di sicurezza senza il consenso del proprietario del sistema. Mantieni riservatezza e professionalità.",
      },
      {
        heading: "Apprendimento responsabile",
        body: "Usa le conoscenze acquisite per migliorare la sicurezza, non per sfruttare vulnerabilità. Il valore dell’hacking etico è nella protezione e nella difesa.",
      }
    ]
  }
};

export default function LegalPage() {
  const { legal } = useParams<Record<string, string>>();
  const selected = legal ? legal.toLowerCase() : "terms-of-use";
  const page = legalMap[selected] || legalMap["terms-of-use"];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selected]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A0F] via-[#16161D] to-[#0A0A0F]">
      <header className="sticky top-0 z-50 bg-[#0A0A0F]/80 backdrop-blur-md border-b border-orange-500/20">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-lg shadow-orange-500/30">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent font-mono">
                LEGAL
              </h1>
              <p className="text-xs text-gray-500">Terms, Privacy, Ethical guidelines</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <nav className="hidden md:flex items-center gap-2">
              <Link href="/">
                <span className="px-4 py-3 rounded-lg text-sm font-mono text-gray-400 hover:text-orange-300 hover:bg-orange-500/10 transition-all">HOME</span>
              </Link>
              <Link href="/guides">
                <span className="px-4 py-3 rounded-lg text-sm font-mono text-gray-400 hover:text-orange-300 hover:bg-orange-500/10 transition-all">GUIDES</span>
              </Link>
              <Link href="/tools">
                <span className="px-4 py-3 rounded-lg text-sm font-mono text-gray-400 hover:text-orange-300 hover:bg-orange-500/10 transition-all">TOOLS</span>
              </Link>
            </nav>
            <MobileNav />
          </div>
        </div>
      </header>

      <main className="container py-12">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          <aside className="w-full lg:w-72 space-y-4">
            {Object.entries(legalMap).map(([key, item]) => (
              <Link key={key} href={`/legal/${key}`}>
                <Card className={`p-4 rounded-xl transition-all ${selected === key ? "bg-orange-500/10 border border-orange-500/40" : "bg-gray-900/50 border border-gray-700 hover:border-orange-500/30"}`}>
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-[0.2em] font-mono">{key.replace(/-/g, " ")}</p>
                      <h2 className="text-lg font-semibold text-white font-mono">{item.title}</h2>
                    </div>
                    <Badge className="bg-orange-500/20 text-orange-300 border border-orange-500/30 font-mono text-xs">VIEW</Badge>
                  </div>
                </Card>
              </Link>
            ))}
          </aside>

          <section className="flex-1 space-y-8">
            <div className="flex flex-col gap-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/30">
                <Scroll className="w-4 h-4 text-orange-400" />
                <span className="text-orange-300 text-xs font-mono">LEGAL CENTER</span>
              </div>
              <h1 className="text-4xl font-bold text-white font-mono">{page.title}</h1>
              <p className="text-gray-400 max-w-3xl">{page.description}</p>
            </div>

            {page.sections.map((section) => (
              <Card key={section.heading} className="p-8 bg-gray-900/50 border border-gray-700 rounded-3xl">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-white font-bold text-xl font-mono">
                    <AlertTriangle className="w-5 h-5 text-orange-400" />
                    <span>{section.heading}</span>
                  </div>
                  <p className="text-gray-300 leading-7">{section.body}</p>
                  {section.items && (
                    <ul className="list-disc list-inside space-y-2 text-gray-400 text-sm font-mono">
                      {section.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </Card>
            ))}
          </section>
        </div>
      </main>

      <footer className="border-t border-orange-500/20 py-8 text-center text-gray-500 text-sm font-mono">
        <p>© 2026 KALI-GUIDE-HUB. EDUCATIONAL USE ONLY. UNAUTHORIZED ACCESS IS ILLEGAL. Developed by <a href="https://alexmirici.netlify.app" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300">Alex Mirici</a>, Web Developer.</p>
      </footer>
    </div>
  );
}
