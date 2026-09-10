import { ListPage } from "./pages/list-page/ui/ListPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ListPage />
    </QueryClientProvider>
  );
}

export default App;
