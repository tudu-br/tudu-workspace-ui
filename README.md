## nvs ou nvm
Se o nvs não funcionar, use o nvm (nvm add, nvm use)

### Fluxo para desenvolver atualizando em tempo real essa lib dentro do mfe ###
# Na pasta da biblioteca
Na pasta da Lib:

cd tudu-workspace

(build limpo antes do watch).
ng build tudu-components 

cd dist/tudu-components

# 1. Fazer o link da biblioteca (execute uma vez)
(sempre faça o link a partir da pasta dist, não da raiz da lib).
Volte para a raiz e rode: ng build tudu-components --watch.
npm link 

# 2. iniciar build em watch mode
ng build tudu-components --watch


# No projeto consumidor
cd meu-projeto-consumidor (raiz ex: mfe-tudu-professional)

# 3. Linkar a biblioteca no projeto (execute uma vez)
npm link tudu-components --force

# 4. Iniciar o projeto
npm run start



### PUBLICAR A LIB NO NPM DPS DE DESENVOLVER ###
cd tudu-workspace\dist\tudu-components

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
