import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import ProductsList from "./components/ProductsList";

function App() {
  const queryClient = new QueryClient();
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <ProductsList/>
      </QueryClientProvider>
    </div>
  )
}

export default App