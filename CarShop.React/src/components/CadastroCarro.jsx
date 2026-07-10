import axios from "axios";
import { useEffect, useState } from "react";

const CadastroCarro = ({ onCarroAdicionado }) => {
    // ESTADOS: Gavetas para guardar as informações
    const [categorias, setCategorias] = useState([]); // Gaveta de categorias do banco
    const [carro, setCarro] = useState({
        marca: "", modelo: "", ano: "", preco: "", fotoUrl: "", categoriaId: ""
    });

    // BUSCA: Quando o componente nasce, ele vai no C# buscar as categorias
    useEffect(() => {
        axios.get("https://localhost:7201/api/Categorias")
            .then(res => setCategorias(res.data))
            .catch(err => console.error("Erro ao carregar categorias", err));
    }, []);

    // AÇÃO: Atualiza os dados do carro conforme você digita
    const handleChange = (e) => {
        setCarro({ ...carro, [e.target.name]: e.target.value });
    };

    // ENVIO: Manda o carro novo para a API de Carros
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("https://localhost:7201/api/Carros", carro);
            alert("Carro anunciado com sucesso!");
            setCarro({ marca: "", modelo: "", ano: "", preco: "", fotoUrl: "", categoriaId: "" });
            onCarroAdicionado(); // Atualiza a lista automaticamente
        } catch (error) {
            console.error("Erro ao cadastrar carro", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px', margin: 'auto', gap: '10px' }}>
            <h3>Anunciar Novo Carro</h3>

            {/* Campos de texto */}
            <input name="marca" placeholder="Marca" value={carro.marca} onChange={handleChange} required />
            <input name="modelo" placeholder="Modelo" value={carro.modelo} onChange={handleChange} required />
            <input name="ano" type="number" placeholder="Ano" value={carro.ano} onChange={handleChange} required />
            <input name="preco" type="number" placeholder="Preço" value={carro.preco} onChange={handleChange} required />
            <input name="fotoUrl" placeholder="URL da Foto" value={carro.fotoUrl} onChange={handleChange} required />

            {/* O PULO DO GATO: O Select que você criou entra aqui! */}
            <select name="categoriaId" value={carro.categoriaId} onChange={handleChange} required style={{ padding: '8px' }}>
                <option value="">Selecione a Categoria</option>
                {categorias.map(cat => (
                    <option key={cat.id} value={cat.id}>
                        {cat.nome}
                    </option>
                ))}
            </select>

            <button type="submit" style={{ backgroundColor: 'green', color: 'white', padding: '10px', cursor: 'pointer' }}>
                Anunciar Carro
            </button>
        </form>
    );
};

export default CadastroCarro;