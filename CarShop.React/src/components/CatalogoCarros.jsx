
function CatalogoCarros({
    carros,
    editarCarro,
    excluirCarro
}) {
    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)'

            }}
        >
            {carros.length === 0 ? (
                <p>Nenhum carro cadastrado</p>
            ) : (
                carros.map(carro => (
                    <div
                        key={carro.id}
                        style={{
                            backgroundColor: 'white',
                            borderRadius: '10px',
                            padding: '15px',
                            textAlign: 'center',

                        }}
                    >
                        <img
                            src={carro.urlImagem}
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
    );
}

export default CatalogoCarros;