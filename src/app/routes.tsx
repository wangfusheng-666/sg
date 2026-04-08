import { createBrowserRouter } from "react-router";
import { RootLayout } from "./layout";
import { Home } from "./pages/Home";
import { Emergency } from "./pages/Emergency";
import { ActiveEmergency } from "./pages/ActiveEmergency";
import { HealthClass } from "./pages/HealthClass";
import { CategoryDetail } from "./pages/CategoryDetail";
import { CourseDetail } from "./pages/CourseDetail";
import { AIHealth } from "./pages/AIHealth";
import { ExercisePlan } from "./pages/ExercisePlan";
import { DietPlan } from "./pages/DietPlan";
import { SimulationList } from "./pages/SimulationList";
import { SimulationDetail } from "./pages/SimulationDetail";
import { AIProtection } from "./pages/AIProtection";
import { ProtectionMonitor } from "./pages/ProtectionMonitor";
import { GuardianSettings } from "./pages/GuardianSettings";
import { AIVisual } from "./pages/AIVisual";
import { VisualReportList } from "./pages/VisualReportList";
import { ReportDetail } from "./pages/ReportDetail";
import { MessageCenter } from "./pages/MessageCenter";
import { PersonalCenter } from "./pages/PersonalCenter";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: "emergency", Component: Emergency },
      { path: "emergency/active", Component: ActiveEmergency },
      { path: "emergency/simulations", Component: SimulationList },
      { path: "emergency/simulations/:id", Component: SimulationDetail },
      { path: "health-class", Component: HealthClass },
      { path: "health-class/:category", Component: CategoryDetail },
      { path: "health-class/:category/:courseId", Component: CourseDetail },
      { path: "ai-protection", Component: AIProtection },
      { path: "ai-protection/monitor", Component: ProtectionMonitor },
      { path: "ai-protection/settings", Component: GuardianSettings },
      { path: "ai-health", Component: AIHealth },
      { path: "ai-health/exercise", Component: ExercisePlan },
      { path: "ai-health/diet", Component: DietPlan },
      { path: "ai-visual", Component: AIVisual },
      { path: "ai-visual/reports", Component: VisualReportList },
      { path: "ai-visual/reports/:id", Component: ReportDetail },
      { path: "messages", Component: MessageCenter },
      { path: "profile", Component: PersonalCenter },
      { path: "*", Component: Home },
    ],
  },
]);
