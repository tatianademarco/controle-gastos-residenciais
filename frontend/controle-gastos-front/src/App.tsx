import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Pessoas from "./pages/Pessoas/Pessoas";
import Categorias from "./pages/Categorias/Categorias";
import Transacoes from "./pages/Transacoes/Transacoes";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/pessoas" element={<Pessoas />} />
                <Route path="/categorias" element={<Categorias />} />
                <Route path="/transacoes" element={<Transacoes />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
