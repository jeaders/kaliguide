import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Home, Terminal } from "lucide-react";
import { useLocation } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();

  const handleGoHome = () => {
    setLocation("/");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#0A0A0F] via-[#16161D] to-[#0A0A0F] cyber-grid">
      <Card className="w-full max-w-lg mx-4 bg-gray-900/50 border-gray-700 backdrop-blur">
        <CardContent className="pt-12 pb-12 text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-red-500/20 rounded-full animate-ping" />
              <AlertCircle className="relative h-16 w-16 text-red-400" />
            </div>
          </div>

          <h1 className="text-6xl font-bold text-white mb-2 font-mono">404</h1>

          <h2 className="text-2xl font-semibold text-gray-300 mb-4 font-mono">
            REQUEST NOT FOUND
          </h2>

          <p className="text-gray-400 mb-8 leading-relaxed font-mono">
            The requested resource does not exist on this server.
            <br />
            It may have been moved or deleted.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={handleGoHome}
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-orange-500/50 font-mono"
            >
              <Home className="w-5 h-5 mr-2" />
              RETURN TO BASE
            </Button>
          </div>

          <div className="mt-8 p-4 bg-gray-800/30 rounded-lg border border-gray-700">
            <p className="text-gray-500 text-xs font-mono">
              &gt; ERROR: Connection refused - target unreachable
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}