import { useNavigate } from "react-router-dom";
import "./Home.css";
import React, { useEffect, useState } from 'react';
import { TotaisPorPessoaResponse, TotaisPorCategoriaResponse } from "../../models/Totais";
import { totaisService } from "../../services/totaisService";

export default function Home() {

    // Hook responsável por controlar a navegação entre rotas da aplicação
    const navigate = useNavigate();

    const [aba, setAba] = useState<'pessoas' | 'categorias'>('pessoas');
    const [totaisPorPessoa, setTotaisPorPessoa] = useState<TotaisPorPessoaResponse>();
    const [totaisPorCategoria, setTotaisPorCategoria] = useState<TotaisPorCategoriaResponse>();

    //Executa ao montar o componente, carrega as listas de totais
    useEffect(() => {
        carregarTotaisPorPessoa();
        carregarTotaisPorCategoria();
    }, []);

    const carregarTotaisPorPessoa = async () => {
        try {
            const response = await totaisService.totaisPorPessoa();
            setTotaisPorPessoa(response.data);
        }
        catch (err: any) {
            alert(err);
        }
    };

    const carregarTotaisPorCategoria = async () => {
        try {
            const response = await totaisService.totaisPorCategoria();
            setTotaisPorCategoria(response.data);
        }
        catch (err: any) {
            alert(err);
        }
    };

    return (
        <div className="home-container">
            <h1>Controle de Gastos</h1>

            <div className="card-grid">
                <div className="card" onClick={() => navigate("/pessoas")}>
                    <i className="fa-solid fa-user-plus icon"></i>
                    <p>Pessoas</p>
                </div>

                <div className="card" onClick={() => navigate("/categorias")}>
                    <i className="fa-solid fa-layer-group icon"></i>
                    <p>Categorias</p>
                </div>

                <div className="card" onClick={() => navigate("/transacoes")}>
                    <i className="fa-solid fa-money-bill-wave icon"></i>
                    <p>Transações</p>
                </div>
            </div>

            <div className="tabs">
                <button
                    className={aba === 'pessoas' ? 'tab active' : 'tab'}
                    onClick={() => setAba('pessoas')}
                >
                    Pessoas
                </button>

                <button
                    className={aba === 'categorias' ? 'tab active' : 'tab'}
                    onClick={() => setAba('categorias')}
                >
                    Categorias
                </button>
            </div>

            {aba === 'pessoas' && (
                <>

                    <h3>Resumo por Pessoa</h3>
                    {totaisPorPessoa ? (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Pessoa</th>
                                    <th>Receitas</th>
                                    <th>Despesas</th>
                                    <th>Saldo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {totaisPorPessoa?.itens?.map(p => (
                                    <tr key={p.nome}>
                                        <td>{p.nome}</td>
                                        <td className="verde">R$ {p.totalReceitas.toFixed(2)}</td>
                                        <td className="vermelho">R$ {p.totalDespesas.toFixed(2)}</td>
                                        <td className={p.saldo >= 0 ? 'verde' : 'vermelho'}>
                                            R$ {p.saldo.toFixed(2)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            {totaisPorPessoa && (
                                <tfoot>
                                    <tr>
                                        <th>Total Geral</th>
                                        <th>R$ {totaisPorPessoa.totalReceitas.toFixed(2)}</th>
                                        <th>R$ {totaisPorPessoa.totalDespesas.toFixed(2)}</th>
                                        <th>R$ {totaisPorPessoa.saldoGeral.toFixed(2)}</th>
                                    </tr>
                                </tfoot>
                            )}

                        </table>
                    ) : (
                        <p>Carregando resumo...</p>
                    )}
                </>
            )}

            {aba === 'categorias' && (
                <>
                    <h3>Resumo por Categoria</h3>
                    {totaisPorCategoria ? (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Categoria</th>
                                    <th>Receitas</th>
                                    <th>Despesas</th>
                                    <th>Saldo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {totaisPorCategoria?.itens?.map(p => (
                                    <tr key={p.descricao}>
                                        <td>{p.descricao}</td>
                                        <td className="verde">R$ {p.totalReceitas.toFixed(2)}</td>
                                        <td className="vermelho">R$ {p.totalDespesas.toFixed(2)}</td>
                                        <td className={p.saldo >= 0 ? 'verde' : 'vermelho'}>
                                            R$ {p.saldo.toFixed(2)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            {totaisPorPessoa && (
                                <tfoot>
                                    <tr>
                                        <th>Total Geral</th>
                                        <th>R$ {totaisPorCategoria.totalReceitas.toFixed(2)}</th>
                                        <th>R$ {totaisPorCategoria.totalDespesas.toFixed(2)}</th>
                                        <th>R$ {totaisPorCategoria.saldoGeral.toFixed(2)}</th>
                                    </tr>
                                </tfoot>
                            )}

                        </table>
                    ) : (
                        <p>Carregando resumo...</p>
                    )}
                </>
            )}

        </div>
    );
}
