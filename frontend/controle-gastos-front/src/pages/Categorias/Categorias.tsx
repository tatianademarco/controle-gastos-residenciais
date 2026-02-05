import { categoriasService } from '../../services/categoriasService';
import './Categorias.css';
import { Categoria, FinalidadeCategoria } from '../../models/Categoria';
import React, { useEffect, useState } from 'react';

export default function Categorias() {
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [descricao, setDescricao] = useState('');
    const [finalidade, setFinalidade] = useState<FinalidadeCategoria | ''>('');

    useEffect(() => {
        carregar();
    }, []);

    const carregar = async () => {
        try {
            const res = await categoriasService.listar();
            setCategorias(res.data);
        }
        catch (err: any) {
            alert(err);
        }
    };

    const criar = async () => {
        if (!descricao.trim()) {
            alert('Informe um nome válido.');
            return;
        }

        if (finalidade === '') {
            alert('Selecione a finalidade.');
            return;
        }

        try {
            await categoriasService.criar({ descricao, finalidade });
            setFinalidade('');
            setDescricao('');
            carregar();
        }
        catch (err: any) {
            alert(err);
        }
    };

    const salvar = async (e: React.FormEvent) => {
        e.preventDefault();
        await criar();
    };


    const deletar = async (id: number) => {
        if (!window.confirm('Deseja realmente excluir?')) return;
        await categoriasService.deletar(id);
        carregar();
    };


    return (
        <div className="container">
            <h2>Categorias</h2>

            <form className="form-card" onSubmit={salvar}>
                <input
                    value={descricao}
                    onChange={e => setDescricao(e.target.value)}
                    placeholder="Descrição da categoria"
                    required
                />
                <select
                    value={finalidade}
                    onChange={e => setFinalidade(Number(e.target.value) as FinalidadeCategoria)}
                    required
                >
                    <option value="">Selecione a finalidade</option>
                    <option value={FinalidadeCategoria.Despesa}>Despesa</option>
                    <option value={FinalidadeCategoria.Receita}>Receita</option>
                    <option value={FinalidadeCategoria.Ambas}>Ambas</option>
                </select>

                <button type="submit">Adicionar</button>
            </form>

            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Descrição</th>
                        <th>Finalidade</th>
                    </tr>
                </thead>
                <tbody>
                    {categorias.map(c => (
                        <tr key={c.id}>
                            <td>{c.id}</td>
                            <td>{c.descricao}</td>
                            <td>{FinalidadeCategoria[c.finalidade]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};