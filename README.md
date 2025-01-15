# TiagoRepository

Repositório para estudo seguindo o https://curso.dev

Espaço pra anotação e outras coisas relacionadas ao estudo minhas msm:

---

## Passo se eu iria querer refazer isso aqui apartir do 0

1 - criar o readme
2 - criar o package.json e o .nvmrc
3 - criar as pastas pages, infra e tests
4 - criar a primeira pagina sem absolutamente nada
5 - configurar o prettier no .editorconfig, juntamente com os ignore do git e do próprio git, juntamente com o .editor config
6 - Escolher a API dos testes automatizados e configurar o jest, juntamente com o primeiro teste de teste
7 - configurar o docker e escolher o bando de dados
8 - configurar o compose.yaml e o postgresql juntamente com o .env.development
9 - configurar o database.js, juntamento com o pg e criar uma ferramenta simples como o database.query direto para o banco de dados local
10 - configurar o endpoint status junto com o jsconfig.json
11 - configurar o ambiente de produção para se conectar ao banco de dados criando uma instancia do
postgres em um provedor e configurando suas credencias nas variaveis de ambientes na vercel
12 - configurar o tratamento de ssl para conexões em produção e conexões diretas para ambientes locais
alem de adicionar um possivel certificado autoassinado nas variaves da vercel
13 - configurar as migrations atraves de um endpoint / migrations e fazer ele se conectar no banco de dados tanto no jest, fazendo as devidas alterações as variaves de ambientes em todos os modos do node
14 criar um client para se conectar ao banco de dados no database.js e refatorar o código de maneira que um método seja respoonsavel por iniciar uma conexão ao banco de dados
