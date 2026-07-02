import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function SecurityWarning() {
  return (
    <Alert className="mb-6 bg-gradient-to-r from-orange-900/30 to-red-900/20 border-orange-500/40 backdrop-blur-sm">
      <AlertTriangle className="h-5 w-5 text-orange-400" />
      <AlertTitle className="text-orange-300 font-semibold font-mono">
        [!] LEGAL WARNING - AUTHORIZED USE ONLY
      </AlertTitle>
      <AlertDescription className="text-orange-200/80 text-sm font-mono">
        All techniques are for educational purposes only. Unauthorized use against systems without explicit written permission is illegal.
        Use isolated lab environments exclusively.
      </AlertDescription>
    </Alert>
  );
}