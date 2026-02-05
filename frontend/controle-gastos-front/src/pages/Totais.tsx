import api from '../services/api';
import { Categoria } from '../models/Categoria';
import React, { useEffect, useState } from 'react';

const Categorias: React.FC = () => {
    const [pessoas, setPessoas] = useState<Categoria[]>([]);
    const [nome, setNome] = useState('');
    const [idade, setIdade] = useState<number>(0);

    useEffect(() => {
        carregarPessoas();
    }, []);

    const carregarPessoas = async () => {
        const response = await api.get<Categoria[]>('/pessoas');
        setPessoas(response.data);
    };

    const criarPessoa = async () => {
        if (!nome || idade <= 0) {
            alert('Informe nome e idade válidos.');
            return;
        }

        await api.post('/pessoas', { nome, idade });
        setNome('');
        setIdade(0);
        carregarPessoas();
    };

    const deletarPessoa = async (id: number) => {
        if (!window.confirm('Deseja realmente excluir?')) return;
        await api.delete(`/pessoas/${id}`);
        carregarPessoas();
    };

    return (
        <div style={{ padding: 20 }}>
            <h2>Cadastro de Pessoas</h2>

            <div>
                <input
                    placeholder="Nome"
                    value={nome}
                    onChange={e => setNome(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Idade"
                    value={idade}
                    onChange={e => setIdade(Number(e.target.value))}
                />
                <button onClick={criarPessoa}>Adicionar</button>
            </div>

            <table border={1} cellPadding={8} style={{ marginTop: 20 }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Idade</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {pessoas.map(p => (
                        <tr key={p.id}>
                            <td>{p.id}</td>
                            {/*<td>{p.nome}</td>*/}
                            {/*<td>{p.idade}</td>*/}
                            <td>
                                <button onClick={() => deletarPessoa(p.id)}>Excluir</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Categorias;