import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Guides from "./pages/Guides";
import Home from "./pages/Home";
import AttackDetail from "./pages/AttackDetail";
import Tools from "./pages/Tools";
import Community from "./pages/Community";
import ToolDetail from "./pages/ToolDetail";
import AttackVectors from "./pages/AttackVectors";
import ResourcePage from "./pages/ResourcePage";
import LegalPage from "./pages/LegalPage";


function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/attack-vectors" component={AttackVectors} />
      <Route path="/attack-vectors/:category" component={AttackVectors} />
      <Route path="/guides" component={Guides} />
      <Route path="/tools" component={Tools} />
      <Route path="/tool/:toolId" component={ToolDetail} />
      <Route path="/community" component={Community} />
      <Route path="/resources/:resource" component={ResourcePage} />
      <Route path="/legal/:legal" component={LegalPage} />
      <Route path="/attack/:category/:attack" component={AttackDetail} />
      <Route path="/404" component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="dark"
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;