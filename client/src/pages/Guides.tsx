import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SecurityWarning } from "@/components/SecurityWarning";
import { ChevronLeft, Check, Copy, Loader2, Lightbulb, Code2, BookOpen, Terminal, Clock, Shield, Zap, Wifi, Lock, Globe, Radar, Target, Users, FileText } from "lucide-react";
import { toast } from "sonner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const modules = [
  {
    id: "module-1",
    title: "Reconnaissance Fundamentals",
    description: "Information gathering and target enumeration",
    difficulty: "beginner",
    time: "2 hours",
    lessons: 8,
    icon: Search
  },
  {
    id: "module-2",
    title: "Network Scanning & Enumeration",
    description: "Port scanning, service detection, OS fingerprinting",
    difficulty: "beginner",
    time: "3 hours",
    lessons: 12,
    icon: Radar
  },
  {
    id: "module-3",
    title: "Web Application Attacks",
    description: "SQL injection, XSS, CSRF, SSRF exploitation",
    difficulty: "intermediate",
    time: "4 hours",
    lessons: 15,
    icon: Globe
  },
  {
    id: "module-4",
    title: "Password Attacks",
    description: "Hash cracking, brute force, wordlist generation",
    difficulty: "intermediate",
    time: "3 hours",
    lessons: 10,
    icon: Lock
  },
  {
    id: "module-5",
    title: "Wireless Security",
    description: "WPA/WPA2 cracking, Evil Twin, deauthentication attacks",
    difficulty: "advanced",
    time: "4 hours",
    lessons: 12,
    icon: Wifi
  },
  {
    id: "module-6",
    title: "Exploitation Framework",
    description: "Metasploit, Meterpreter, payload generation",
    difficulty: "advanced",
    time: "5 hours",
    lessons: 16,
    icon: Zap
  },
  {
    id: "module-7",
    title: "Post-Exploitation",
    description: "Persistence, privilege escalation, lateral movement",
    difficulty: "advanced",
    time: "4 hours",
    lessons: 14,
    icon: Shield
  },
  {
    id: "module-8",
    title: "Social Engineering",
    description: "Phishing, pretexting, physical security testing",
    difficulty: "intermediate",
    time: "2 hours",
    lessons: 8,
    icon: Users
  }
];

const certificationPaths = [
  { name: "OSCP", description: "Offensive Security Certified Professional", modules: 7 },
  { name: "OSCE", description: "Offensive Security Certified Expert", modules: 8 },
  { name: "GPEN", description: "GIAC Penetration Tester", modules: 8 },
  { name: "eJPT", description: "eLearnSecurity Junior Penetration Tester", modules: 5 }
];

export default function Guides() {
  const [selectedFilter, setSelectedFilter] = useState<"all" | "beginner" | "intermediate" | "advanced">("all");

  const filteredModules = modules.filter(module => 
    selectedFilter === "all" || module.difficulty === selectedFilter
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A0F] via-[#16161D] to-[#0A0A0F] cyber-grid">
      <header className="sticky top-0 z-50 bg-[#0A0A0F]/80 backdrop-blur-md border-b border-orange-500/20">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-lg shadow-orange-500/30">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent font-mono">
                KALI-GUIDE-HUB
              </h1>
              <p className="text-xs text-gray-500">Training Academy</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-2">
            <Link href="/">
              <span className="px-4 py-2 rounded-lg text-sm font-mono text-gray-400 hover:text-orange-300 hover:bg-orange-500/10 transition-all">
                /home
              </span>
            </Link>
            <Link href="/tools">
              <span className="px-4 py-2 rounded-lg text-sm font-mono text-gray-400 hover:text-orange-300 hover:bg-orange-500/10 transition-all">
                /tools
              </span>
            </Link>
            <Link href="/community">
              <span className="px-4 py-2 rounded-lg text-sm font-mono text-gray-400 hover:text-orange-300 hover:bg-orange-500/10 transition-all">
                /community
              </span>
            </Link>
          </nav>
        </div>
      </header>

      <div className="container py-12">
        <div className="max-w-6xl">
          <SecurityWarning />
          
          <div className="mb-12">
            <Link href="/">
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 text-gray-400 hover:text-orange-500 mb-6 font-mono"
              >
                <ChevronLeft className="w-4 h-4" />
                cd ..
              </Button>
            </Link>
            <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 mb-4 font-mono">
              PENTESTING TRAINING ACADEMY
            </Badge>
            <h1 className="text-5xl font-bold text-white mb-4 font-mono">
              Professional Cybersecurity Training
            </h1>
            <p className="text-xl text-gray-300 mb-6">
              Structured learning paths from beginner to expert. Practice in isolated lab environments.
            </p>
            
            <div className="flex flex-wrap gap-2 mb-8">
              {["all", "beginner", "intermediate", "advanced"].map((level) => (
                <Badge
                  key={level}
                  variant={selectedFilter === level ? "default" : "secondary"}
                  className={`cursor-pointer font-mono text-xs px-4 py-2 ${
                    selectedFilter === level
                      ? "bg-orange-500 text-white"
                      : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                  }`}
                  onClick={() => setSelectedFilter(level as any)}
                >
                  {level === "all" ? "ALL LEVELS" : level.toUpperCase()}
                </Badge>
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <div className="p-6 bg-gray-900/50 border border-gray-700 rounded-xl text-center">
                <div className="text-3xl font-bold text-orange-400 font-mono">8</div>
                <p className="text-gray-400 text-xs font-mono">MODULES</p>
              </div>
              <div className="p-6 bg-gray-900/50 border border-gray-700 rounded-xl text-center">
                <div className="text-3xl font-bold text-blue-400 font-mono">77</div>
                <p className="text-gray-400 text-xs font-mono">LESSONS</p>
              </div>
              <div className="p-6 bg-gray-900/50 border border-gray-700 rounded-xl text-center">
                <div className="text-3xl font-bold text-green-400 font-mono">2h</div>
                <p className="text-gray-400 text-xs font-mono">MIN TIME</p>
              </div>
              <div className="p-6 bg-gray-900/50 border border-gray-700 rounded-xl text-center">
                <div className="text-3xl font-bold text-yellow-400 font-mono">20h</div>
                <p className="text-gray-400 text-xs font-mono">MAX TIME</p>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-2 font-mono">Training Modules</h2>
            <p className="text-gray-400 font-mono text-sm">Complete curriculum for ethical hacking mastery</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredModules.map((module) => {
              const IconComponent = module.icon;
              return (
                <Card key={module.id} className="p-6 bg-gray-900/50 border-gray-700 hover:border-orange-500/50 card-glow">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white shadow-lg flex-shrink-0">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-bold text-white font-mono">{module.title}</h3>
                        <Badge className={`text-xs font-mono ${
                          module.difficulty === "beginner" ? "bg-green-500/20 text-green-400 border border-green-500/30" :
                          module.difficulty === "intermediate" ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30" :
                          "bg-red-500/20 text-red-400 border border-red-500/30"
                        }`}>
                          {module.difficulty.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-gray-400 text-sm mb-4">{module.description}</p>
                      <div className="flex items-center gap-4 text-xs font-mono">
                        <span className="text-gray-500">{module.lessons} lessons</span>
                        <span className="text-gray-500">{module.time} est.</span>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          <div className="mt-16 mb-12">
            <h2 className="text-3xl font-bold text-white mb-2 font-mono">Certification Paths</h2>
            <p className="text-gray-400 font-mono text-sm">Align training with industry certifications</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {certificationPaths.map((cert) => (
              <Card key={cert.name} className="p-6 bg-gray-900/50 border-gray-700 text-center">
                <div className="text-2xl font-bold text-orange-400 mb-2 font-mono">{cert.name}</div>
                <p className="text-gray-400 text-xs mb-3">{cert.description}</p>
                <Badge className="bg-gray-800 text-gray-300 font-mono text-xs">{cert.modules} modules</Badge>
              </Card>
            ))}
          </div>

          <div className="flex gap-4 justify-between mt-12">
            <Link href="/">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700 font-mono">
                <ChevronLeft className="w-4 h-4 mr-2" />
                cd ..
              </Button>
            </Link>
            <Link href="/attack-vectors">
              <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg font-mono">
                /attack-vectors
                <ChevronLeft className="w-4 h-4 ml-2 rotate-180" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <footer className="bg-[#0A0A0F] border-t border-orange-500/20 mt-16">
        <div className="container py-8 text-center text-gray-400 text-sm font-mono">
          <p>© 2026 KALI-GUIDE-HUB. EDUCATIONAL USE ONLY.</p>
        </div>
      </footer>
    </div>
  );
}

function Search() {
  return <Terminal className="w-6 h-6" />;
}