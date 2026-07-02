import { useState, useEffect } from "react";
import { Link } from "wouter";
import MobileNav from "@/components/MobileNav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { SecurityWarning } from "@/components/SecurityWarning";
import {
  Search,
  Shield,
  Zap,
  Wifi,
  Lock,
  Globe,
  Radar,
  Loader2,
  ChevronRight,
  Users,
  Database,
  Terminal,
  Activity,
  Code2,
  AlertCircle
} from "lucide-react";
import { useAttacksData } from "@/hooks/useAttacksData";

interface Attack {
  id: string;
  name: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  description: string;
}

interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  attacks: Attack[];
}

const iconMap: Record<string, React.ReactNode> = {
  Search: <Search className="w-6 h-6" />,
  Radar: <Radar className="w-6 h-6" />,
  Zap: <Zap className="w-6 h-6" />,
  Wifi: <Wifi className="w-6 h-6" />,
  Lock: <Lock className="w-6 h-6" />,
  Globe: <Globe className="w-6 h-6" />,
  Users: <Users className="w-6 h-6" />,
  Database: <Database className="w-6 h-6" />,
};

const difficultyLabels = {
  beginner: "BEGINNER",
  intermediate: "INTERMEDIATE",
  advanced: "ADVANCED",
};

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<"all" | "beginner" | "intermediate" | "advanced">("all");
  const { data, loading, error } = useAttacksData();
  const [stats, setStats] = useState({ attacks: 0, categories: 0, tools: 20 });

  useEffect(() => {
    if (data) {
      setStats({
        attacks: data.categories.reduce((sum: number, cat: Category) => sum + cat.attacks.length, 0),
        categories: data.categories.length,
        tools: 20
      });
    }
  }, [data]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0A0A0F] via-[#16161D] to-[#0A0A0F] flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-orange-500" />
            <div className="absolute inset-0 w-12 h-12 border-2 border-orange-500/20 rounded-full mx-auto animate-ping" />
          </div>
          <p className="text-gray-300 font-mono">LOADING THREAT INTELLIGENCE...</p>
          <div className="w-48 h-1 bg-gray-800 rounded-full mx-auto mt-4 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-orange-500 to-orange-400 animate-pulse w-3/4" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0A0A0F] via-[#16161D] to-[#0A0A0F] flex items-center justify-center">
        <Card className="p-8 max-w-md bg-gray-900/50 border-red-500/30 backdrop-blur">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <p className="text-red-300 mb-2 font-semibold">Connection Error</p>
            <p className="text-gray-400 text-sm">{error}</p>
          </div>
        </Card>
      </div>
    );
  }

  const categories = data.categories as Category[];

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedCategoryData = selectedCategory
    ? categories.find((c) => c.id === selectedCategory)
    : null;

  const filteredAttacks = selectedCategoryData
    ? selectedCategoryData.attacks.filter((attack) =>
        attack.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (difficultyFilter === "all" || attack.difficulty === difficultyFilter)
      )
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A0F] via-[#16161D] to-[#0A0A0F] cyber-grid">
      <div className="hidden md:block absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,107,53,0.1)_0%,transparent_50%)]" />
      
      <header className="sticky top-0 z-50 bg-[#0A0A0F]/80 backdrop-blur-md border-b border-orange-500/20">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-lg shadow-orange-500/30">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent font-mono">
                KALI-GUIDE-HUB
              </h1>
              <p className="text-xs text-gray-500">v1.0.0-beta</p>
            </div>
          </div>
            <div className="flex items-center gap-2">
              <nav className="flex md:flex items-center gap-2 overflow-x-auto touch-pan-x">
            {[
              { href: "/", label: "HOME", active: true },
              { href: "/guides", label: "GUIDES" },
              { href: "/tools", label: "TOOLS" },
              { href: "/community", label: "COMMUNITY" }
            ].map((item) => (
              <Link key={item.href} href={item.href}>
                <span className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                  item.active
                    ? "bg-orange-500/20 text-orange-300 border border-orange-500/40"
                    : "text-gray-400 hover:text-orange-300 hover:bg-orange-500/10 border border-transparent"
                }`}>
                  {item.label}
                </span>
              </Link>
            ))}
            </nav>
            {/* Mobile toggle */}
            <div className="ml-2">
              <MobileNav />
            </div>
          </div>
        </div>
      </header>

      <section className="relative py-12 md:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500 rounded-full filter blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl" />
        </div>
        <div className="container relative z-10">
          <div className="max-w-4xl">
            <SecurityWarning />
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/30">
                <Activity className="w-4 h-4 text-orange-400" />
                <span className="text-orange-300 text-xs font-mono">PENETRATION TESTING FRAMEWORK</span>
              </div>
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white font-mono">
                CYBER SECURITY COMMAND CENTER
                <span className="block bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">
                  FOR KALI LINUX
                </span>
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl">
                Comprehensive penetration testing guides, exploits, and security tools.
                Master ethical hacking techniques in controlled lab environments.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-2 text-gray-400 font-mono text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span>SYSTEM STATUS: ONLINE</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400 font-mono text-sm">
                  <Terminal className="w-4 h-4" />
                  <span>METHOD: EDUCATIONAL PURPOSE ONLY</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-12">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-3 w-5 h-5 text-gray-500" />
            <Input
              placeholder="Search attacks, tools, techniques..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-3 bg-gray-900/50 border-orange-500/30 text-white placeholder-gray-500 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-500/50 font-mono"
            />
          </div>
          <div className="flex gap-2">
            {["all", "beginner", "intermediate", "advanced"].map((level) => (
              <Badge
                key={level}
                variant={difficultyFilter === level ? "default" : "secondary"}
                className={`cursor-pointer px-4 py-2 font-mono text-xs ${
                  difficultyFilter === level
                    ? "bg-orange-500 text-white"
                    : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                }`}
                onClick={() => setDifficultyFilter(level as any)}
              >
                {level === "all" ? "ALL LEVELS" : level.toUpperCase()}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-12">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-2 font-mono">ATTACK VECTOR LIBRARY</h2>
          <p className="text-gray-400">Select a category to view available penetration techniques</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category, index) => (
            <div
              key={category.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <button
                onClick={() => setSelectedCategory(category.id)}
                className={`w-full text-left transition-all duration-300 group relative overflow-hidden rounded-xl p-6 border ${
                  selectedCategory === category.id
                    ? "bg-gradient-to-br from-orange-500/20 to-orange-600/10 shadow-lg shadow-orange-500/20 border-orange-500/50"
                    : "bg-gray-900/50 hover:bg-gray-800/50 border-gray-700 hover:border-orange-500/30 card-glow"
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center text-white shadow-lg" style={{ backgroundColor: category.color }}>
                      {iconMap[category.icon] || <Shield className="w-6 h-6" />}
                    </div>
                    <ChevronRight
                      className={`w-5 h-5 transition-transform duration-300 ${
                        selectedCategory === category.id ? "text-orange-400 translate-x-1" : "text-gray-500 group-hover:translate-x-1"
                      }`}
                    />
                  </div>
                  
                  <h3 className={`text-xl font-bold mb-2 font-mono ${
                    selectedCategory === category.id ? "text-white" : "text-gray-100 group-hover:text-orange-300"
                  }`}>
                    {category.name}
                  </h3>
                  <p className={`text-sm mb-4 ${
                    selectedCategory === category.id ? "text-gray-200" : "text-gray-400"
                  }`}>
                    {category.description}
                  </p>
                  
                  <Badge
                    className={`${
                      selectedCategory === category.id
                        ? "bg-orange-500/30 text-orange-300 border border-orange-500/40"
                        : "bg-gray-800 text-gray-400 border border-gray-700"
                    }`}
                  >
                    {category.attacks.length} TECHNIQUES
                  </Badge>
                </div>
              </button>
            </div>
          ))}
        </div>
      </section>

      {selectedCategoryData && (
        <section className="container py-12">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-8 rounded" style={{ backgroundColor: selectedCategoryData.color }} />
              <h2 className="text-3xl font-bold text-white font-mono">
                {selectedCategoryData.name} TECHNIQUES
              </h2>
            </div>
            <p className="text-gray-400">{filteredAttacks.length} techniques available</p>
          </div>

          <div className="space-y-4">
            {filteredAttacks.map((attack, index) => (
              <Link key={attack.id} href={`/attack/${selectedCategory}/${attack.id}`}>
                <a className="block">
                  <Card
                    className="p-6 bg-gray-900/50 border-gray-700 hover:border-orange-500/50 card-hover cursor-pointer group border-l-4"
                    style={{ borderLeftColor: selectedCategoryData.color }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-white group-hover:text-orange-400 transition-colors font-mono">
                            {attack.name}
                          </h3>
                          {attack.difficulty && (
                            <Badge
                              className={`text-xs font-mono ${
                                attack.difficulty === "beginner" ? "bg-green-500/20 text-green-400 border border-green-500/30" :
                                attack.difficulty === "intermediate" ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30" :
                                "bg-red-500/20 text-red-400 border border-red-500/30"
                              }`}
                            >
                              {difficultyLabels[attack.difficulty]}
                            </Badge>
                          )}
                        </div>
                        <p className="text-gray-400 text-sm mb-3">
                          {attack.description}
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-orange-500 transition-colors mt-1" />
                    </div>
                  </Card>
                </a>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="container py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { value: stats.attacks, label: "ATTACK TECHNIQUES", color: "from-orange-500 to-orange-400", suffix: "+" },
            { value: stats.categories, label: "CATEGORY MODULES", color: "from-blue-500 to-cyan-400" },
            { value: "100%", label: "EDUCATIONAL PURPOSE", color: "from-green-500 to-emerald-400" }
          ].map((stat, i) => (
            <div key={i} className="text-center p-8 bg-gray-900/30 rounded-xl border border-gray-700">
              <div className="text-5xl font-bold bg-gradient-to-r bg-clip-text text-transparent mb-3 font-mono" style={{
                backgroundImage: `linear-gradient(to right, ${stat.color.replace('from-', '').replace(' to-', ', ')})`
              }}>
                {stat.value}{stat.suffix}
              </div>
              <p className="text-gray-400 font-mono text-xs">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-[#0A0A0F] border-t border-orange-500/20 mt-16">
        <div className="container py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-white font-bold font-mono">KALI-GUIDE-HUB</h3>
              </div>
              <p className="text-gray-400 text-sm">
                The definitive educational platform for penetration testing techniques on Kali Linux. Practice ethically and legally.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4 font-mono">MODULES</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                {categories.slice(0, 4).map((cat) => (
                  <li key={cat.id}>
                    <a href="#" className="hover:text-orange-400 transition-colors font-mono text-xs">
                      /{cat.name.toLowerCase()}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4 font-mono">RESOURCES</h4>
              <ul className="space-y-2 text-gray-400 text-sm font-mono text-xs">
                <li><a href="#" className="hover:text-orange-400 transition-colors">DOCUMENTATION</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">COMMAND CHEAT SHEET</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">LAB SETUP GUIDE</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">DISCLAIMER</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4 font-mono">LEGAL</h4>
              <ul className="space-y-2 text-gray-400 text-sm font-mono text-xs">
                <li><a href="#" className="hover:text-orange-400 transition-colors">TERMS OF USE</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">PRIVACY POLICY</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">ETHICAL GUIDELINES</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-orange-500/20 pt-8 text-center text-gray-500 text-sm font-mono">
            <p>© 2026 KALI-GUIDE-HUB. EDUCATIONAL USE ONLY. UNAUTHORIZED ACCESS IS ILLEGAL.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
