# Banckend

API REST desenvolvido no curso de NODE JS da Rocketseat.

GymPass style App

## RFs (Requisitos Funcionais)

- [x] Dese ser possível se cadastrar;
- [x] Dese ser possível se autenticar;
- [x] Dese ser possível se obter o perfil de um usuário logado;
- [x] Dese ser possível se obter o número de check-ins pelo usuário logado;
- [x] Dese ser possível o usuário obter seu histórico de check-ins;
- [x] Dese ser possível o usuário buscar academia próximas (até 10km);
- [x] Dese ser possível o usuário buscar academia pelo nome;
- [x] Dese ser possível o usuário realizar check-in em uma academia;
- [x] Dese ser possível validar o check-in de um usuário;
- [x] Dese ser possível cadastrar uma academia;

## RNs (Regras de Negócio)

- [x] O usuário não pode poder se cadastrar com o mesmo e-mail;
- [x] O usuário não pode poder realizar 2 check-ins no mesmo dia;
- [x] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [x] O check-in só pode ser validade até 20 minuto apos criado;
- [ ] O check-in só pode ser validado pelo administradores;
- [ ] A academia só pode ser cadastrada por administradores;

## RNFs (Requisitos Não Funcionais)

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisa estar em um banco de dados PostgreSQL;
- [ ] Todo lista de dados precisam estar paginadas com 20 items em cada pagina;
- [ ] O usuário deve ser identificado por um JWT (Json Web Token);
