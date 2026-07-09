import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [carros, setCarros] = useState([])

  // COLOQUE AQUI A PORTA QUE O SEU VISUAL STUDIO ABRIU
  const API_URL = "https://localhost:7201/api/Carros"

  useEffect(() => {
    // Busca os carros da API C#
    axios.get(API_URL)
      .then(res => setCarros(res.data))
      .catch(err => console.error("Erro ao carregar carros", err))
  }, [])

  return (
    <div style={{ padding: '40px', backgroundColor: '#f4f4f4', minHeight: '100vh' }}>
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ color: '#333' }}>🚗 CarShop - E-commerce</h1>
        <p>Encontre aqui o seu próximo veículo</p>
      </header>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '20px'
      }}>
        {carros.length === 0 ? (
          <p>Nenhum carro cadastrado ou a API está desligada...</p>
        ) : (
          carros.map(carro => (
            <div key={carro.id} style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '20px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}>
              <img
                src={carro.urlImagem || "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=400"}
                alt={carro.modelo}
                style={{ width: '100%', borderRadius: '8px', height: '180px', objectFit: 'cover' }}
              />
              <h2 style={{ fontSize: '1.2rem', margin: '15px 0 5px' }}>{carro.marca} {carro.modelo}</h2>
              <p style={{ color: '#666', fontSize: '0.9rem' }}>Ano: {carro.ano} | Cor: {carro.cor}</p>
              <h3 style={{ color: '#2ecc71', margin: '10px 0' }}>
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(carro.preco)}
              </h3>
              <button style={{
                width: '100%',
                padding: '10px',
                backgroundColor: '#3498db',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}>
                Ver Detalhes
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default App