import { useEffect, useState } from 'react'
import axios from 'axios'
import CadastroCarro from './components/CadastroCarro'

function App() {
  const [carros, setCarros] = useState([])
  const API_URL = "https://localhost:7201/api/Carros"

  const carregarCarros = () => {
    axios.get(API_URL)
      .then(res => setCarros(res.data))
      .catch(err => console.error(err))
  }

  useEffect(() => {
    carregarCarros()
  }, [])

  return (
    <div style={{ padding: '40px', backgroundColor: '#f4f4f4', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1>🚗 CarShop Admin</h1>
      </header>

      {/* Formulário de Cadastro */}
      <CadastroCarro onCarroCadastrado={carregarCarros} />
      {/* Listagem */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {carros.map(carro => (
          <div key={carro.id} style={{ backgroundColor: 'white', borderRadius: '10px', padding: '15px', textAlign: 'center' }}>
            <img src={carro.urlImagem || "https://via.placeholder.com/150"} alt={carro.modelo} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
            <h3>{carro.marca} {carro.modelo}</h3>
            <p style={{ color: '#27ae60', fontWeight: 'bold' }}>R$ {carro.preco.toLocaleString('pt-BR')}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App