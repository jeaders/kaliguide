import { useEffect } from "react";
import { Link, useParams } from "wouter";
import { ArrowLeft, BookOpen, Cpu, Terminal, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SecurityWarning } from "@/components/SecurityWarning";
import MobileNav from "@/components/MobileNav";

const resourceMap: Record<string, { title: string; description: string; sections: Array<{ heading: string; body: string; items?: string[] }> }> = {
  documentation: {
    title: "Documentazione",
    description: "Il centro di riferimento per utilizzare Kali Guide Hub, comprendere le categorie, e muoversi in sicurezza.",
    sections: [
      {
        heading: "Introduzione",
        body: "Questa documentazione spiega come navigare tra attacchi, moduli, guide e strumenti. Ogni sezione è progettata per un apprendimento etico e strutturato.",
      },
      {
        heading: "Categorie e moduli",
        body: "Ogni modulo contiene tecniche raggruppate per fase di pentest: ricognizione, scanning, exploitation e post-exploitation. Usa i filtri per livello di difficoltà e seleziona la categoria adatta al tuo percorso.",
      },
      {
        heading: "Best practice",
        body: "Annota i comandi, testali solo in ambienti di laboratorio autorizzati, e segui sempre l’approccio ‘test, analizza, migliora’.",
        items: [
          "Preferisci ambienti isolati e VM aggiornate.",
          "Leggi le descrizioni prima di eseguire qualsiasi comando.",
          "Usa l’app solo per scopi educativi e legali."
        ]
      }
    ]
  },
  "command-cheat-sheet": {
    title: "Command Cheat Sheet",
    description: "Raccolta rapida di comandi Kali Linux utili per ricognizione, scansione e exploitation.",
    sections: [
      {
        heading: "Ricognizione",
        body: "Comandi utili per individuare host attivi, servizi e dispositivi esposti.",
        items: [
          "nmap -sn 192.168.1.0/24",
          "nmap -sV -p- 192.168.1.100",
          "shodan search 'apache' --limit 20"
        ]
      },
      {
        heading: "Scansione di rete",
        body: "Parametri per eseguire scansioni veloci e scansioni più dettagliate.",
        items: [
          "nmap -F 192.168.1.100",
          "nmap -A -T4 10.0.0.10",
          "sudo nikto -h http://10.0.0.10"
        ]
      },
      {
        heading: "Configurazione laboratorio",
        body: "Comandi di base per preparare una VM Kali e gestire interfacce wireless.",
        items: [
          "sudo apt update && sudo apt upgrade",
          "sudo airmon-ng start wlan0",
          "ifconfig && iwconfig"
        ]
      }
    ]
  },
  "lab-setup-guide": {
    title: "Lab Setup Guide",
    description: "Guida passo-passo per creare un ambiente sicuro di laboratorio Kali Linux.",
    sections: [
      {
        heading: "Preparazione dell’ambiente",
        body: "Usa una macchina virtuale o un container isolato. Mantieni la rete separata dalla tua infrastruttura principale.",
      },
      {
        heading: "Installazione di Kali Linux",
        body: "Scarica l’immagine ufficiale dal sito Kali, installa il sistema su VMware o VirtualBox e abilita snapshot per ripristini rapidi.",
        items: [
          "Scarica l’ISO ufficiale da kali.org.",
          "Configura risorse hardware minime 4GB RAM e 40GB disco.",
          "Attiva snapshot prima di eseguire test rischiosi."
        ]
      },
      {
        heading: "Isolamento e sicurezza",
        body: "Mantieni il laboratorio isolato con una rete NAT separata o una VLAN dedicata. Evita di eseguire test su reti di produzione.",
      }
    ]
  },
  disclaimer: {
    title: "Disclaimer",
    description: "Informazioni legali e di responsabilità sull’uso di Kali Guide Hub.",
    sections: [
      {
        heading: "Uso educativo",
        body: "Tutte le tecniche presentate sono fornite esclusivamente a scopo didattico. Non incoraggiamo né supportiamo l’uso non autorizzato di strumenti di penetration testing.",
      },
      {
        heading: "Responsabilità",
        body: "L’utente è unico responsabile delle proprie azioni. Kali Guide Hub non è responsabile per danni, perdite o violazioni causate dall’uso improprio delle informazioni fornite.",
      },
      {
        heading: "Consenso richiesto",
        body: "Esegui test solo su sistemi che possiedi o per i quali hai permesso esplicito scritto. La violazione delle leggi locali o internazionali è proibita.",
      }
    ]
  }
};

export default function ResourcePage() {
  const { resource } = useParams<Record<string, string>>();
  const selected = resource ? resource.toLowerCase() : "documentation";
  const page = resourceMap[selected] || resourceMap.documentation;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selected]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A0F] via-[#16161D] to-[#0A0A0F]">
      <header className="sticky top-0 z-50 bg-[#0A0A0F]/80 backdrop-blur-md border-b border-orange-500/20">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-lg shadow-orange-500/30">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent font-mono">
                RESOURCES
              </h1>
              <p className="text-xs text-gray-500">Documentation & learning center</p>
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
            {Object.entries(resourceMap).map(([key, item]) => (
              <Link key={key} href={`/resources/${key}`}>
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
                <Terminal className="w-4 h-4 text-orange-400" />
                <span className="text-orange-300 text-xs font-mono">RESOURCE CENTER</span>
              </div>
              <h1 className="text-4xl font-bold text-white font-mono">{page.title}</h1>
              <p className="text-gray-400 max-w-3xl">{page.description}</p>
            </div>

            {page.sections.map((section) => (
              <Card key={section.heading} className="p-8 bg-gray-900/50 border border-gray-700 rounded-3xl">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-white font-bold text-xl font-mono">
                    <ArrowLeft className="w-5 h-5 text-orange-400" />
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
