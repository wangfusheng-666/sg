import { RouterProvider } from "react-router";
import { router } from "./routes";
import { HealthModeProvider } from "./context/HealthModeContext";

export default function App() {
  return (
    <HealthModeProvider>
      <RouterProvider router={router} />
    </HealthModeProvider>
  );
}
