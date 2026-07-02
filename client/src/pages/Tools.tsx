import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { SecurityWarning } from "@/components/SecurityWarning";
import { ChevronLeft, Search, Wrench, Globe, Shield, Lock, Wifi, FileText, Code2, Terminal, ExternalLink, Cpu, Hammer } from "lucide-react";

interface Tool {
  id: string;
  name: string;
  category: string;
  description: string;
  command: string;
  link: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  difficulty: "beginner" | "intermediate" | "advanced";
}

const tools: Tool[] = [
  {
    id: "nmap",
    name: "Nmap",
    category: "Network Scanning",
    description: "The industry standard network discovery and security auditing tool. Supports dozens of scanning techniques and NSE scripts for vulnerability detection.",
    command: "nmap -sV -sC target.com",
    link: "https://nmap.org",
    icon: Globe,
    color: "#4CAF50",
    difficulty: "beginner"
  },
  {
    id: "wireshark",
    name: "Wireshark",
    category: "Traffic Analysis",
    description: "The world's foremost network protocol analyzer. Captures and inspects packets in real-time with deep protocol inspection capabilities.",
    command: "wireshark -i eth0 -k",
    link: "https://www.wireshark.org",
    icon: Wifi,
    color: "#2196F3",
    difficulty: "intermediate"
  },
  {
    id: "metasploit",
    name: "Metasploit Framework",
    category: "Exploitation",
    description: "Advanced exploitation platform with thousands of modules for known vulnerabilities and payload generation. The Swiss Army knife of pentesting.",
    command: "msfconsole -q -x 'use exploit/multi/handler; set LHOST 192.168.1.100; run'",
    link: "https://www.metasploit.com",
    icon: Terminal,
    color: "#FF5722",
    difficulty: "advanced"
  },
  {
    id: "burp-suite",
    name: "Burp Suite",
    category: "Web Application Testing",
    description: "Integrated platform for web security testing. Features proxy interception, vulnerability scanning, and automated reconnaissance.",
    command: "burpsuite",
    link: "https://portswigger.net/burp",
    icon: Shield,
    color: "#FF9800",
    difficulty: "intermediate"
  },
  {
    id: "sqlmap",
    name: "SQLMap",
    category: "Web Application Testing",
    description: "Automated tool for SQL injection detection and exploitation. Supports MySQL, PostgreSQL, Oracle, MSSQL, and more database systems.",
    command: "sqlmap -u 'http://target.com/page?id=1' --batch --dbs",
    link: "http://sqlmap.org",
    icon: Code2,
    color: "#9C27B0",
    difficulty: "beginner"
  },
  {
    id: "nikto",
    name: "Nikto",
    category: "Web Application Testing",
    description: "Web server vulnerability scanner checking for over 6,700 dangerous files, outdated versions, and security misconfigurations.",
    command: "nikto -h https://target.com",
    link: "https://cirt.net/Nikto2",
    icon: FileText,
    color: "#F44336",
    difficulty: "beginner"
  },
  {
    id: "john",
    name: "John the Ripper",
    category: "Password Auditing",
    description: "Fast password cracker supporting dozens of hash formats. Utilizes CPU and GPU for maximum performance cracking.",
    command: "john --wordlist=/usr/share/wordlists/rockyou.txt hashes.txt",
    link: "https://www.openwall.com/john/",
    icon: Lock,
    color: "#607D8B",
    difficulty: "intermediate"
  },
  {
    id: "hydra",
    name: "Hydra",
    category: "Password Attacks",
    description: "Fast parallel online password cracker supporting 50+ protocols including SSH, FTP, HTTP, RDP, and MySQL.",
    command: "hydra -l admin -P /usr/share/wordlists/rockyou.txt ssh://192.168.1.100",
    link: "https://github.com/vanhauser-thc/thc-hydra",
    icon: Wrench,
    color: "#009688",
    difficulty: "intermediate"
  },
  {
    id: "aircrack-ng",
    name: "Aircrack-ng",
    category: "Wireless Attacks",
    description: "Complete suite for WiFi security testing. Captures packets, attacks WEP/WPA/WPA2, and generates encryption keys.",
    command: "airodump-ng wlan0mon",
    link: "https://www.aircrack-ng.org",
    icon: Wifi,
    color: "#00BCD4",
    difficulty: "intermediate"
  },
  {
    id: "gobuster",
    name: "Gobuster",
    category: "Web Application Testing",
    description: "High-performance directory, file, and DNS enumeration tool written in Go. Extremely fast brute-forcing capabilities.",
    command: "gobuster dir -u https://target.com -w /usr/share/wordlists/dirb/common.txt",
    link: "https://github.com/OJ/gobuster",
    icon: Globe,
    color: "#8BC34A",
    difficulty: "beginner"
  },
  {
    id: "maltego",
    name: "Maltego",
    category: "OSINT Recon",
    description: "Open-source intelligence platform for mapping relationships between people, domains, infrastructure, and more.",
    command: "maltego",
    link: "https://www.maltego.com",
    icon: Globe,
    color: "#3F51B5",
    difficulty: "intermediate"
  },
  {
    id: "hashcat",
    name: "Hashcat",
    category: "Password Auditing",
    description: "World's fastest password cracker supporting 300+ hashing algorithms. Maximizes GPU acceleration for performance.",
    command: "hashcat -m 0 -a 0 hashes.txt /usr/share/wordlists/rockyou.txt",
    link: "https://hashcat.net/hashcat/",
    icon: Lock,
    color: "#E91E63",
    difficulty: "advanced"
  }
];

const Categories = ["All", "Network Scanning", "Web Application Testing", "Password Attacks", "Wireless Attacks", "Exploitation", "Traffic Analysis", "OSINT Recon", "Password Auditing"];

export default function Tools() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredTools = tools.filter((tool) => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A0F] via-[#16161D] to-[#0A0A0F] cyber-grid">
      <header className="sticky top-0 z-50 bg-[#0A0A0F]/80 backdrop-blur-md border-b border-orange-500/20">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-lg shadow-orange-500/30">
              <Hammer className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent font-mono">
                KALI-GUIDE-HUB
              </h1>
              <p className="text-xs text-gray-500">Tool Arsenal</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-2">
            <Link href="/">
              <span className="px-4 py-2 rounded-lg text-sm font-mono text-gray-400 hover:text-orange-300 hover:bg-orange-500/10 transition-all">
                /home
              </span>
            </Link>
            <Link href="/guides">
              <span className="px-4 py-2 rounded-lg text-sm font-mono text-gray-400 hover:text-orange-300 hover:bg-orange-500/10 transition-all">
                /guides
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
          
          <div className="mb-12 animate-fade-in-up">
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
            <h1 className="text-5xl font-bold text-white mb-4 font-mono">
              Penetration Testing Arsenal
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Professional tools every ethical hacker should master on Kali Linux.
            </p>

            <div className="relative mb-6">
              <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-500" />
              <Input
                placeholder="Search tools, categories, commands..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-6 bg-gray-900/50 border-orange-500/30 text-white placeholder-gray-500 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-500/50 font-mono"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {Categories.map((cat) => (
                <Badge
                  key={cat}
                  variant={selectedCategory === cat ? "default" : "secondary"}
                  className={`cursor-pointer font-mono text-xs px-3 py-1 transition-all ${
                    selectedCategory === cat
                      ? "bg-orange-500 text-white"
                      : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                  }`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool, index) => {
              const IconComponent = tool.icon;
              return (
                <Card
                  key={tool.id}
                  className="p-6 bg-gray-900/50 border-gray-700 hover:border-orange-500/50 transition-all duration-300 group animate-fade-in-up card-glow"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center text-white flex-shrink-0 shadow-lg"
                      style={{ backgroundColor: tool.color }}
                    >
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors font-mono">
                        {tool.name}
                      </h3>
                      <Badge variant="secondary" className="bg-gray-800 text-gray-400 text-xs mt-1 font-mono border border-gray-700">
                        {tool.category}
                      </Badge>
                    </div>
                  </div>

                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                    {tool.description}
                  </p>

                  <div className="bg-[#0A0A0F] rounded-lg p-3 border border-gray-700 mb-4 overflow-x-auto">
                    <code className="text-green-400 font-mono text-xs terminal-glow">
                      {tool.command}
                    </code>
                  </div>

                  <div className="flex items-center justify-between">
                    <Badge className={`text-xs font-mono ${
                      tool.difficulty === "beginner" ? "bg-green-500/20 text-green-400 border border-green-500/30" :
                      tool.difficulty === "intermediate" ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30" :
                      "bg-red-500/20 text-red-400 border border-red-500/30"
                    }`}>
                      {tool.difficulty === "beginner" ? "BEGINNER" :
                       tool.difficulty === "intermediate" ? "INTERMEDIATE" : "ADVANCED"}
                    </Badge>
                    <a
                      href={tool.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-orange-500 hover:text-orange-400 text-sm transition-colors font-mono"
                    >
                      <ExternalLink className="w-4 h-4" />
                      official
                    </a>
                  </div>
                </Card>
              );
            })}
          </div>

          {filteredTools.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 font-mono">No tools match your search criteria.</p>
            </div>
          )}

          <div className="flex gap-4 justify-between mt-12">
            <Link href="/guides">
              <Button
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white font-mono"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                cd guides
              </Button>
            </Link>
            <Link href="/community">
              <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-orange-500/50 transition-all duration-300 font-mono">
                /community
                <ChevronLeft className="w-4 h-4 ml-2 rotate-180" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <footer className="bg-[#0A0A0F] border-t border-orange-500/20 mt-16">
        <div className="container py-8 text-center text-gray-400 text-sm font-mono">
          <p>© 2026 KALI-GUIDE-HUB. EDUCATIONAL USE ONLY. UNAUTHORIZED ACCESS IS ILLEGAL.</p>
        </div>
      </footer>
    </div>
  );
}