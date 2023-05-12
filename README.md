# Banckend

GymPass style App

## RFs (Requisitos Funcionais)

- [ ] Dese ser possível se cadastrar;
- [ ] Dese ser possível se autenticar;
- [ ] Dese ser possível se obter o perfil de um usuário logado;
- [ ] Dese ser possível se obter o número de check-ins pelo usuário logado;
- [ ] Dese ser possível o usuário obter seu histórico de check-ins;
- [ ] Dese ser possível o usuário buscar academia próximas;
- [ ] Dese ser possível o usuário buscar academia pelo nome;
- [ ] Dese ser possível o usuário realizar check-in em uma academia;
- [ ] Dese ser possível validar o check-in de um usuário;
- [ ] Dese ser possível cadastrar uma academia;

## RNs (Regras de Negócio)

- [ ] O usuário não pode poder se cadastrar com o mesmo e-mail;
- [ ] O usuário não pode poder realizar 2 check-ins no mesmo dia;
- [ ] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [ ] O check-in só pode ser validade até 20 minuto apos criado;
- [ ] O check-in só pode ser validado pelo administradores;
- [ ] A academia só pode ser cadastrada por administradores;

## RNFs (Requisitos Não Funcionais)

- [ ] A senha do usuário precisa estar criptografada;
- [ ] Os dados da aplicação precisa estar em um banco de dados PostgreSQL;
- [ ] Todo lista de dados precisam estar paginadas com 20 items em cada pagina;
- [ ] O usuário deve ser identificado por um JWT (Json Web Token);
