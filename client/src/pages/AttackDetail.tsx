import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SecurityWarning } from "@/components/SecurityWarning";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Copy, Check, ChevronLeft, Loader2, Lightbulb, Code2, Terminal, Target } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useAttacksData } from "@/hooks/useAttacksData";

interface Step {
  phase: number;
  title: string;
  description: string;
  command: string;
  explanation: string;
}

interface Attack {
  id: string;
  name: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  description: string;
  steps: Step[];
}

interface Category {
  id: string;
  name: string;
  color: string;
  attacks: Attack[];
}

const difficultyLabels = {
  beginner: "BEGINNER",
  intermediate: "INTERMEDIATE",
  advanced: "ADVANCED",
};

export default function AttackDetail() {
  const { category: categoryId, attack: attackId } = useParams();
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);
  const { data, loading, error } = useAttacksData();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0A0A0F] via-[#16161D] to-[#0A0A0F] flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-orange-500" />
            <div className="absolute inset-0 w-12 h-12 border-2 border-orange-500/20 rounded-full mx-auto animate-ping" />
          </div>
          <p className="text-gray-300 font-mono">LOADING ATTACK VECTOR...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0A0A0F] via-[#16161D] to-[#0A0A0F] flex items-center justify-center">
        <Card className="p-8 max-w-md bg-gray-900/50 border-red-500/30 backdrop-blur">
          <div className="text-center">
            <Target className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <p className="text-red-300 mb-2 font-semibold font-mono">ERROR</p>
            <p className="text-gray-400 text-sm">{error}</p>
          </div>
        </Card>
      </div>
    );
  }

  const categories = data.categories as Category[];
  const categoryData = categories.find((c) => c.id === categoryId);
  const attackData = categoryData?.attacks.find((a) => a.id === attackId);

  if (!categoryData || !attackData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0A0A0F] via-[#16161D] to-[#0A0A0F] flex items-center justify-center">
        <Card className="p-8 text-center bg-gray-900/50 border-gray-700">
          <p className="text-gray-300 mb-4 font-mono">Attack vector not found.</p>
          <Link href="/">
            <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700 font-mono">
              cd ..
            </Button>
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
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-lg shadow-orange-500/30">
              <Terminal className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent font-mono">
                KALI-GUIDE-HUB
              </h1>
              <p className="text-xs text-gray-500">Attack Vector</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container py-6">
        <div className="flex items-center gap-2 text-xs font-mono">
          <Link href="/">
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 text-gray-400 hover:text-orange-500 font-mono"
            >
              <ChevronLeft className="w-4 h-4" />
              /home
            </Button>
          </Link>
          <span className="text-gray-600">/</span>
          <span className="text-gray-400">{categoryData.name.toLowerCase()}</span>
          <span className="text-gray-600">/</span>
          <span className="text-orange-500 font-medium">{attackData.name.toLowerCase().replace(/\s+/g, '-')}</span>
        </div>
      </div>

      <div className="container py-12">
        <div className="max-w-4xl">
          <SecurityWarning />
          
          <div className="mb-12 animate-fade-in-up">
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Target className="w-8 h-8 text-orange-500" />
                  <h1 className="text-5xl font-bold text-white font-mono">
                    {attackData.name}
                  </h1>
                </div>
                <p className="text-xl text-gray-300 mb-6 max-w-3xl">
                  {attackData.description}
                </p>
              </div>
              <Badge
                className={`whitespace-nowrap text-base px-4 py-2 font-mono border ${
                  attackData.difficulty === "beginner" ? "bg-green-500/20 text-green-400 border-green-500/30" :
                  attackData.difficulty === "intermediate" ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" :
                  "bg-red-500/20 text-red-400 border-red-500/30"
                }`}
              >
                {difficultyLabels[attackData.difficulty]}
              </Badge>
            </div>

            <div className="flex items-center gap-3 p-4 bg-gray-900/50 border border-gray-700 rounded-lg w-fit">
              <div
                className="w-4 h-4 rounded"
                style={{ backgroundColor: categoryData.color }}
              />
              <span className="text-sm font-medium text-gray-300 font-mono">
                {categoryData.name}
              </span>
            </div>
          </div>

          <div className="space-y-8 mb-12">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2 font-mono">Attack Phases</h2>
              <p className="text-gray-400 font-mono text-sm">{attackData.steps.length} phases to execute this attack</p>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {attackData.steps.map((step) => (
                <AccordionItem
                  key={step.phase}
                  value={`step-${step.phase}`}
                  className="border border-gray-700 rounded-lg px-6 bg-gray-900/50 hover:bg-gray-800/50 transition-colors data-[state=open]:bg-gray-800/70"
                >
                  <AccordionTrigger className="hover:no-underline py-4">
                    <div className="flex items-center gap-4 text-left">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 text-white font-bold text-lg shadow-lg">
                        {step.phase.toString().padStart(2, '0')}
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-lg font-mono">{step.title}</h3>
                        <p className="text-sm text-gray-400">{step.description}</p>
                      </div>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent className="pt-6 pb-4">
                    <div className="space-y-6">
                      <div className="bg-[#0A0A0F] rounded-lg p-6 border border-gray-700">
                        <div className="flex items-center justify-between gap-4 mb-4">
                          <div className="flex items-center gap-2">
                            <Code2 className="w-4 h-4 text-orange-500" />
                            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider font-mono">
                              Command
                            </span>
                          </div>
                          <button
                            onClick={() => copyToClipboard(step.command)}
                            className="flex items-center gap-2 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded transition-colors text-sm font-mono"
                            title="Copy command"
                          >
                            {copiedCommand === step.command ? (
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
                          </button>
                        </div>
                        <div className="overflow-x-auto">
                          <code className="text-green-400 font-mono text-sm whitespace-pre-wrap break-words terminal-glow">
                            {step.command}
                          </code>
                        </div>
                      </div>

                      <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-6">
                        <div className="flex items-start gap-3">
                          <Lightbulb className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-blue-300 mb-2 font-mono">Tactical Explanation</h4>
                            <p className="text-blue-200/80 text-sm leading-relaxed">{step.explanation}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <Card className="p-8 bg-gradient-to-br from-orange-900/20 to-red-900/10 border-orange-700/50 mb-12">
            <div className="flex items-start gap-4">
              <Lightbulb className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-orange-300 mb-4 text-lg font-mono">Operational Security Notes</h3>
                <ul className="text-orange-200/80 text-sm space-y-3 font-mono">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">▸</span>
                    <span>Always obtain written authorization before testing any system</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">▸</span>
                    <span>Use isolated lab environments for practice and testing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">▸</span>
                    <span>Review official documentation for advanced tool options</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">▸</span>
                    <span>Keep all tools updated to latest versions</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>

          <div className="flex gap-4 justify-between">
            <Link href="/">
              <Button
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white font-mono"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                cd ..
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <footer className="bg-[#0A0A0F] border-t border-orange-500/20 mt-16">
        <div className="container py-8 text-center text-gray-400 text-sm font-mono">
          <p>© 2026 KALI-GUIDE-HUB. EDUCATIONAL PURPOSE ONLY. UNAUTHORIZED ACCESS IS ILLEGAL.</p>
        </div>
      </footer>
    </div>
  );
}