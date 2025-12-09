### Fluxo para desenvolver atualizando em tempo real essa lib dentro do mfe ###
# Na pasta da biblioteca
cd tudu-workspace

# 1. Fazer o link da biblioteca (execute uma vez)
npm link

# 2. Em outro terminal da lib, iniciar build em watch mode
ng build tudu-components --watch

# No projeto consumidor
cd meu-projeto-consumidor (raiz ex: mfe-tudu-professional)

# 3. Linkar a biblioteca no projeto (execute uma vez)
npm link tudu-components

# 4. Iniciar o projeto
npm start



### PUBLICAR A LIB NO NPM DPS DE DESENVOLVER ###
cd projects/tudu-components

# Atualiza a versão
npm version patch  # 0.0.1 → 0.0.2
# ou
npm version minor  # 0.0.1 → 0.1.0

# Builda a nova versão
ng build tudu-components

# Login no npm registry
npm login

# Publica no npm
npm publish

# No MFE, atualizar a versão:
{
  "tudu-components": "^0.1.0"
}
npm update tudu-components
ou
npm i  tudu-components@0.2.1 --force
