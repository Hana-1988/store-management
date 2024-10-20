import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import ProductsList from "./components/ProductsList";
import {Route, Router, Routes } from "react-router-dom";

function App() {
  const queryClient = new QueryClient();
  return (
    <div>
      <QueryClientProvider client={queryClient}>
       <Router>
       <Routes>
          <Route path="/products" element={<ProductsList/>}/>
        </Routes>
       </Router>
      </QueryClientProvider>
    </div>
  )
}

export default App