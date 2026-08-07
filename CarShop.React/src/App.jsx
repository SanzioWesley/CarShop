import { useEffect, useState } from 'react';
import axios from 'axios';
import CadastroCarro from './components/CadastroCarro';

function App() {
  const [carros, setCarros] = useState([]);
  const [carroEmEdicao, setCarroEmEdicao] = useState(null);
  const [pesquisa, setPesquisa] = useState('');
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
  const [categorias, setCategorias] = useState([]);

  const API_URL = 'https://localhost:7201/api/Carros';
  const CATEGORIAS_URL = 'https://localhost:7201/api/Categorias';

  const carregarCarros = () => {
    axios
      .get(API_URL)
      .then(res => setCarros(res.data))
      .catch(err => console.error('Erro ao carregar carros:', err));
  };

  const carregarCategorias = () => {
    axios
      .get(CATEGORIAS_URL)
      .then(res => setCategorias(res.data))
      .catch(err => console.error('Erro ao carregar categorias:', err));
  };

  const excluirCarro = async (id) => {
    const confirmou = window.confirm(
      'Tem certeza que deseja excluir este carro?'
    );

    if (!confirmou) {
      return;
    }

    try {
      await axios.delete(`${API_URL}/${id}`);
      carregarCarros();
    } catch (error) {
      console.error('Erro ao excluir carro:', error);
    }
  };

  const editarCarro = (id) => {
    const carroSelecionado = carros.find(carro => carro.id === id);
    setCarroEmEdicao(carroSelecionado);
  };

  useEffect(() => {
    carregarCarros();
    carregarCategorias();
  }, []);

  const carrosFiltrados = carros.filter(carro => {
    const correspondePesquisa =
      carro.marca.toLowerCase().includes(pesquisa.toLowerCase()) ||
      carro.modelo.toLowerCase().includes(pesquisa.toLowerCase());

    const correspondeCategoria =
      categoriaSelecionada === '' ||
      carro.categoriaId === Number(categoriaSelecionada);

    return correspondePesquisa && correspondeCategoria;
  });

  return (
    <div
      style={{
        padding: '40px',
        backgroundColor: '#f4f4f4',
        minHeight: '100vh',
        fontFamily: 'sans-serif'
      }}
    >
      <header
        style={{
          textAlign: 'center',
          marginBottom: '40px'
        }}
      >
        <h1>🚗 CarShop Admin</h1>
      </header>

      <CadastroCarro
        onCarroCadastrado={carregarCarros}
        carroEmEdicao={carroEmEdicao}
      />

      <div
        style={{
          display: 'flex',
          gap: '10px',
          marginBottom: '20px'
        }}
      >
        <input
          value={pesquisa}
          onChange={(e) => setPesquisa(e.target.value)}
          placeholder="Pesquisar por marca ou modelo"
          style={{
            padding: '10px',
            width: '210px'
          }}
        />

        <select
          value={categoriaSelecionada}
          onChange={(e) => setCategoriaSelecionada(e.target.value)}
          style={{
            padding: '10px'
          }}
        >
          <option value="">Todas as categorias</option>

          {categorias.map(categoria => (
            <option
              key={categoria.id}
              value={categoria.id}
            >
              {categoria.nome}
            </option>
          ))}
        </select>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '20px'
        }}
      >
        {carrosFiltrados.length === 0 ? (
          <p>Nenhum carro cadastrado</p>
        ) : (
          carrosFiltrados.map(carro => (
            <div
              key={carro.id}
              style={{
                backgroundColor: 'white',
                borderRadius: '10px',
                padding: '15px',
                textAlign: 'center'
              }}
            >
              <img
                src={carro.urlImagem || 'https://via.placeholder.com/150'}
                alt={carro.modelo}
                style={{
                  width: '100%',
                  height: '150px',
                  objectFit: 'cover'
                }}
              />

              <h3>
                {carro.marca} {carro.modelo}
              </h3>

              <p
                style={{
                  color: '#27ae60',
                  fontWeight: 'bold'
                }}
              >
                R$ {carro.preco.toLocaleString('pt-BR')}
              </p>

              <button
                onClick={() => editarCarro(carro.id)}
                style={{
                  backgroundColor: '#3498db',
                  color: 'white',
                  border: 'none',
                  padding: '8px 12px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  marginRight: '8px'
                }}
              >
                Editar
              </button>

              <button
                onClick={() => excluirCarro(carro.id)}
                style={{
                  backgroundColor: '#e74c3c',
                  color: 'white',
                  border: 'none',
                  padding: '8px 12px',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                Excluir
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;