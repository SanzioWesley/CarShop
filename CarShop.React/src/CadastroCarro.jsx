import { useState } from 'react';
import axios from 'axios';

const CadastroCarro = ({ onCarroCadastrado }) => {
  const [carro, setCarro] = useState({
    marca: '',
    modelo: '',
    ano: 2024,
    preco: 0,
    quilometragem: 0,
    cor: '',
    urlImagem: ''
  });

  const API_URL = 'https://localhost:7201/api/Carros';

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(API_URL, carro);

      alert('Carro cadastrado com sucesso! 🚀');

      setCarro({
        marca: '',
        modelo: '',
        ano: 2024,
        preco: 0,
        quilometragem: 0,
        cor: '',
        urlImagem: ''
      });

      onCarroCadastrado();
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      alert('Erro ao cadastrar carro.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCarro({
      ...carro,
      [name]: value
    });
  };

  return (
    <div
      style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '12px',
        marginBottom: '30px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}
    >
      <h2>📢 Anunciar Novo Veículo</h2>

      <form
        onSubmit={handleSubmit}
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '10px'
        }}
      >
        <input
          name="marca"
          placeholder="Marca (ex: Honda)"
          value={carro.marca}
          onChange={handleChange}
          required
        />

        <input
          name="modelo"
          placeholder="Modelo (ex: Civic)"
          value={carro.modelo}
          onChange={handleChange}
          required
        />

        <input
          name="ano"
          type="number"
          placeholder="Ano"
          value={carro.ano}
          onChange={handleChange}
        />

        <input
          name="preco"
          type="number"
          placeholder="Preço"
          value={carro.preco}
          onChange={handleChange}
        />

        <input
          name="cor"
          placeholder="Cor"
          value={carro.cor}
          onChange={handleChange}
        />

        <input
          name="urlImagem"
          placeholder="URL da Foto"
          value={carro.urlImagem}
          onChange={handleChange}
        />

        <button
          type="submit"
          style={{
            gridColumn: 'span 2',
            padding: '10px',
            backgroundColor: '#2ecc71',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          SALVAR ANÚNCIO
        </button>
      </form>
    </div>
  );
};

export default CadastroCarro;