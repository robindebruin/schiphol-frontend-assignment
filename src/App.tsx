import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { Overview } from "./components/Overview";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Overview />
    </QueryClientProvider>
  );
}

export default App;
