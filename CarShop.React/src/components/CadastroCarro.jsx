import axios from 'axios';
import { useEffect, useState } from 'react';

const CadastroCarro = ({
  onCarroCadastrado,
  carroEmEdicao
}) => {
  const [categorias, setCategorias] = useState([]);

  const [carro, setCarro] = useState({
    marca: '',
    modelo: '',
    ano: '',
    preco: '',
    urlImagem: '',
    categoriaId: ''
  });

  useEffect(() => {
    if (carroEmEdicao) {
      setCarro({
        marca: carroEmEdicao.marca,
        modelo: carroEmEdicao.modelo,
        ano: carroEmEdicao.ano,
        preco: carroEmEdicao.preco,
        urlImagem: carroEmEdicao.urlImagem,
        categoriaId: carroEmEdicao.categoriaId
      });
    }
  }, [carroEmEdicao]);



  useEffect(() => {
    axios
      .get('https://localhost:7201/api/Categorias')
      .then(response => {
        setCategorias(response.data);
      })
      .catch(error => {
        console.error('Erro ao carregar categorias:', error);
      });
  }, []);


  const handleChange = event => {
      const { name, value } = event.target;

      setCarro({
        ...carro,
        [name]: value
      });
    };

    const handleSubmit = async event => {
      event.preventDefault();

      try {
        if (carroEmEdicao) {
          await axios.put(
            `https://localhost:7201/api/Carros/${carroEmEdicao.id}`,
            {
              id: carroEmEdicao.id,
              ...carro
            }
          );

          alert('Carro atualizado com sucesso!');
        } else {
          await axios.post(
            'https://localhost:7201/api/Carros',
            carro
          );

          alert('Carro anunciado com sucesso!');
        }

        setCarro({
          marca: '',
          modelo: '',
          ano: '',
          preco: '',
          urlImagem: '',
          categoriaId: ''
        });

        onCarroCadastrado();
      } catch (error) {
        console.error('Erro ao salvar carro:', error);
        alert('Não foi possível salvar o carro.');
      }
    };

    return (
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '400px',
          margin: '0 auto 30px',
          gap: '10px'
        }}
      >
        <h3>
          {carroEmEdicao
            ? 'Editar Carro'
            : 'Anunciar novo carro'}
        </h3>

        <input
          name="marca"
          placeholder="Marca"
          value={carro.marca}
          onChange={handleChange}
          required
        />

        <input
          name="modelo"
          placeholder="Modelo"
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
          required
        />

        <input
          name="preco"
          type="number"
          placeholder="Preço"
          value={carro.preco}
          onChange={handleChange}
          required
        />

        <input
          name="urlImagem"
          placeholder="URL da Foto"
          value={carro.urlImagem}
          onChange={handleChange}
          required
        />

        <select
          name="categoriaId"
          value={carro.categoriaId}
          onChange={handleChange}
          required
          style={{ padding: '8px' }}
        >
          <option value="">Selecione a Categoria</option>

          {categorias.map(categoria => (
            <option
              key={categoria.id}
              value={categoria.id}
            >
              {categoria.nome}
            </option>
          ))}
        </select>



        <button
          type="submit"
          style={{
            backgroundColor: carroEmEdicao ? 'orange': 'green',
            color: 'white',
            padding: '10px',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          {carroEmEdicao
            ? 'Salvar alteraçoes'
            : 'Anunciar carro'}
        </button>
      </form>
    );
  };

  export default CadastroCarro;