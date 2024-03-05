import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Users from "./components/Users";
import StarWars from "./components/StarWars";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <h1>React Query</h1>
      <Users />
    </QueryClientProvider>
  );
}

export default App;
