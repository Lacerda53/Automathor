# AutomaThor

## Gerador de apk do React Native

<img width="1440" alt="image" src="https://user-images.githubusercontent.com/33927459/152577993-c9d48615-2316-4428-b367-61eeb2e49d75.png">

#

## 🛠 Instalação

1• Instalando yarn globalmente:

```sh
npm install yarn -g
```

2• Abra o projeto `server` e dentro do arquivo `nodemon.json` coloque o token do Github:

```json
{
  "watch": ["src"],
  "ext": ".ts,.js",
  "ignore": [],
  "exec": "ts-node ./src/index.ts",
  "env": {
    "GITHUB_TOKEN": "SEU_TOKEN_AQUI"
  }
}
```

3• Com docker inicializado execute o seguinte comando dentro da pasta `server` no projeto:

```sh
docker build -t docker-automathor .
```

4• Após a build da imagem execute o comando do docker-compose para upar o servidor:

```sh
docker-compose up
```

5• Após inicializar o servidor, abra uma nova guia do terminal e entre na pasta `automathor`:

```sh
cd automathor
```

6• Agora instale os pacotes do frontend rodando um:

```sh
yarn
```

7• Por último, inicialize o frontend executando:

```sh
yarn start
```

OBS: O projeto foi configurado para rodar o servidor na porta `3000` e rodar o frontend na porta `3001`
