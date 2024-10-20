import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import ProductsList from "./components/ProductsList";
import {Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./components/Home";

function App() {
  const queryClient = new QueryClient();
  return (
    <div>
      <QueryClientProvider client={queryClient}>
       <Router>
       <Routes>
          <Route path="/" element={<Home/>}/>        
          <Route path="/products" element={<ProductsList/>}/>
        </Routes>
       </Router>
      </QueryClientProvider>
    </div>
  )
}

export default App