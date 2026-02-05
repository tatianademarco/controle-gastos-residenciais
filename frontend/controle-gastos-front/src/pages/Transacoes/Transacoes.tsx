import { TipoTransacao, CriarTransacao, TransacaoResponse } from '../../models/Transacao';
import { Pessoa } from '../../models/Pessoa';
import { Categoria, FinalidadeCategoria } from '../../models/Categoria';
import React, { useEffect, useState } from 'react';
import { transacoesService } from '../../services/transacoesService';
import { pessoasService } from "../../services/pessoasService";
import { categoriasService } from '../../services/categoriasService';
import './Transacoes.css';

export default function Transacoes() {
    const [transacoes, setTransacoes] = useState<TransacaoResponse[]>([]);
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');
    const [pessoas, setPessoas] = useState<Pessoa[]>([]);
    const [pessoaId, setPessoaId] = useState<number | ''>('');
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [categoriaId, setCategoriaId] = useState<number | ''>('');
    const [tipo, setTipo] = useState<TipoTransacao | ''>('');


    useEffect(() => {
        carregarTransacoes();
        carregarPessoas();
        carregarCategorias();
    }, []);

    const carregarTransacoes = async () => {
        try {
            const res = await transacoesService.listar();
            setTransacoes(res.data);
        }
        catch (err: any) {
            alert(err);
        }
    };

    const criar = async () => {
        if (!descricao || !valor || !tipo || !pessoaId || !categoriaId) {
            alert('Preencha todos os campos.');
            return;
        }
        try {
            await transacoesService.criar({
                descricao,
                valor: Number(valor),
                tipo,
                pessoaId: Number(pessoaId),
                categoriaId: Number(categoriaId),

            });

            setDescricao('');
            setValor('');
            setTipo('');
            setPessoaId('');
            setCategoriaId('');
            carregarTransacoes();
        }
        catch (err: any) {
            alert(err);
        }
    };

    const deletar = async (id: number) => {
        if (!window.confirm('Deseja realmente excluir?')) return;
        await transacoesService.deletar(id);
        carregarTransacoes();
    };

    const carregarPessoas = async () => {
        const response = await pessoasService.listar();
        setPessoas(response.data);
    };

    const carregarCategorias = async () => {
        const res = await categoriasService.listar();
        setCategorias(res.data);
    };

    // filtrar categoria baseado no tipo de transação
    const categoriasFiltradas = categorias.filter(c => {
        if (tipo === '') return false;

        if (tipo === TipoTransacao.Despesa) {
            return c.finalidade === FinalidadeCategoria.Despesa || c.finalidade === FinalidadeCategoria.Ambas;
        }

        if (tipo === TipoTransacao.Receita) {
            return c.finalidade === FinalidadeCategoria.Receita || c.finalidade === FinalidadeCategoria.Ambas;
        }

        return false;
    });


    return (
        <div className="transacoes-container">
            <h2>Transações</h2>

            <div className="form-card">
                <input placeholder="Descrição" value={descricao} onChange={e => setDescricao(e.target.value)} />
                <input type="number" placeholder="Valor" value={valor} onChange={e => setValor(e.target.value)} />
                {/* <input type="date" value={data} onChange={e => setData(e.target.value)} /> */}

                <select
                    value={tipo}
                    onChange={e => setTipo(Number(e.target.value) as TipoTransacao)}
                >
                    <option value="">Tipo de transação</option>
                    <option value={TipoTransacao.Despesa}>Despesa</option>
                    <option value={TipoTransacao.Receita}>Receita</option>
                </select>

                <select
                    value={categoriaId}
                    onChange={e => setCategoriaId(Number(e.target.value))}
                    disabled={tipo === ''}
                >
                    <option value="">
                        Selecione a categoria
                    </option>

                    {categoriasFiltradas.map(c => (
                        <option key={c.id} value={c.id}>
                            {c.descricao} (ID: {c.id})
                        </option>
                    ))}
                </select>


                <select
                    value={pessoaId}
                    onChange={e => setPessoaId(Number(e.target.value))}
                >
                    <option value="">Pessoa</option>
                    {pessoas.map(p => (
                        <option key={p.id} value={p.id}>
                            {p.nome} (ID: {p.id})
                        </option>
                    ))}
                </select>

                <button onClick={criar}>Salvar</button>
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th>Descrição</th>
                        <th>Pessoa</th>
                        <th>Categoria</th>
                        <th>Tipo</th>
                        <th>Valor</th>
                    </tr>
                </thead>
                <tbody>
                    {transacoes.map(t => (
                        <tr key={t.id}>
                            <td>{t.descricao}</td>
                            <td>{t.pessoaNome}</td>
                            <td>{t.categoriaDescricao}</td>
                            <td>
                                {t.tipo === 1 ? 'Despesa' : 'Receita'}
                            </td>
                            <td className={t.tipo === 1 ? 'valor-despesa' : 'valor-receita'}>
                                {t.tipo === 1 ? '-' : '+'} R$ {t.valor.toFixed(2)}
                                <i
                                    className={`fa-solid ${t.tipo === 1 ? 'fa-arrow-down' : 'fa-arrow-up'}`}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
};
