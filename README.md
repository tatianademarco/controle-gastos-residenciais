# Controle de Gastos Residenciais

Aplicação web para gerenciamento de receitas e despesas por pessoa e categoria.  

Projeto desenvolvido com API com ASP.NET Core e frontend em React.

---

## Funcionalidades

- Cadastro de pessoas  
- Cadastro de categorias (Receita, Despesa ou Ambas)  
- Lançamento de transações (receitas e despesas)  
- Regras de negócio:
  - Menores de idade só podem registrar **despesas**
  - Categorias devem ser compatíveis com o tipo da transação
- Totais por pessoa
- Totais por categoria
- Saldo geral

---

## Tecnologias Utilizadas

### Backend
- C# / ASP.NET Core
- Entity Framework Core
- SQLite

### Frontend
- React + TypeScript
- Axios
- React Router DOM

---

## Como Rodar o Projeto

### Backend
Entre na pasta do back-end:
```
cd ControleGastos.Api
```
Restaure as dependências e rode a API:
```
dotnet restore
dotnet ef database update
dotnet run
```
### Frontend
Volte para a raiz do projeto e entre na pasta do front:
```
cd ..
cd controle-gastos-front
```
Instale as dependências:
```
npm install
```
Rode o projeto:
```
npm start
```

### Importante
No front-end, configure corretamente a URL da API no arquivo:
```
src/services/api.ts
```
Substitua pela URL onde o seu back-end estiver rodando.
