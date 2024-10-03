import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Flights } from "./components/Flights";
import { Header } from "./components/Header";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <Flights />
    </QueryClientProvider>
  );
}

export default App;
