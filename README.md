# AutomaThor

## Gerador de apk do React Native

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

3• Com docker inicializado execute o seguinte comando no projeto:

```sh
docker build -t docker-automathor .
```

4• Após a build da imagem execute o comando `yarn dev` da imagem `docker-automathor` apontando a porta `3000` da sua máquina para a porta `3000` do container:

```sh
docker run -it -p 3000:3000 docker-automathor yarn dev
```

5• Após inicializar o servidor, abra uma nova guia do terminal e entre na pasta `automathor`:

```sh
cd automathor
```

6• Agora instale os pacotes do frontend rodando um:

```sh
yarn
```

7• Por último inicialize o frontend executando:

```sh
yarn start
```

OBS: Ao inicalizar o frontend ele alegará que a porta `3000` está sendo usada e perguntará se deseja executar em uma outra porta. Você deve precisona `y` para aceitar.
