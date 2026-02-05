import React, { useEffect, useState } from 'react';
import { Pessoa } from '../../models/Pessoa';
import { pessoasService } from "../../services/pessoasService";
import "./Pessoas.css";

export default function Pessoas() {

    // Estado que armazena a lista de pessoas vinda da API
    const [pessoas, setPessoas] = useState<Pessoa[]>([]);

    // Estados para os campos do formulário
    const [nome, setNome] = useState('');
    const [idade, setIdade] = useState<number | ''>('');

    // Armazena o ID da pessoa que está sendo editada (null = criação)
    const [editandoId, setEditandoId] = useState<number | null>(null);

    //Executa ao montar o componente, carrega a lista de pessoas da API.
    useEffect(() => {
        carregar();
    }, []);

    //Busca todas as pessoas cadastradas na API e atualiza o estado local
    const carregar = async () => {
        try {
            const response = await pessoasService.listar();
            setPessoas(response.data);
        }
        catch (err: any) {
            alert(err);
        }
    };

    // Se existir um ID em edição, faz UPDATE, senão faz CREATE
    const salvar = async () => {
        if (!nome || idade === '' || Number(idade) <= 0) return alert('Informe nome e idade válidos.');

        if (editandoId) {
            try {
                await pessoasService.editar(editandoId, { nome, idade });
            }
            catch (err: any) {
                alert(err);
            }
        } else {
            try {
                await pessoasService.criar({ nome, idade });
            }
            catch (err: any) {
                alert(err);
            }
        }

         // Limpa formulário após salvar
        setEditandoId(null);
        setNome('');
        setIdade('');
        carregar();
    };


    const deletar = async (id: number) => {
        if (!window.confirm('Deseja realmente excluir?')) return;
        try {
            await pessoasService.deletar(id);
            carregar();
        }
        catch (err: any) {
            alert(err);
        }
    };

    //Preenche o formulário com os dados da pessoa selecionada para permitir edição
    const editar = (pessoa: Pessoa) => {
        setEditandoId(pessoa.id);
        setNome(pessoa.nome);
        setIdade(pessoa.idade);
    };


    return (
        <div className="container">
            <h2>Cadastro de Pessoas</h2>

            <div className="form-card">
                <input placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} />
                <input className="idade" type="number" placeholder="Idade" value={idade} onChange={e => setIdade(Number(e.target.value))} />
                <button onClick={salvar}>
                    {editandoId ? 'Atualizar' : 'Cadastrar'}
                </button>

            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Idade</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {pessoas.map(p => (
                        <tr key={p.id}>
                            <td>{p.id}</td>
                            <td>{p.nome}</td>
                            <td>{p.idade}</td>
                            <td style={{ width: "1px" }}>
                                <button onClick={() => deletar(p.id)}><i className="fa-solid fa-trash"></i></button>
                            </td>
                            <td style={{ width: "1px" }}>
                                <button onClick={() => editar(p)}><i className="fa-solid fa-pencil"></i></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
};