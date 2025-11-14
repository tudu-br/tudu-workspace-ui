### Fluxo de BUILD para gerar o pacote .tgz usando npm pack (gera o .tgz): ###
cd C:\Users\user\Documents\Frontend\tudü\tudu-workspace
ng build tudu-components
cd dist/tudu-components
npm pack

### Fluxo para desenvolver atualizando em tempo real essa lib dentro do mfe ###
# Para desenvolvimento com atualização em tempo real, é necessario o arquivo .tgz
inserir no packege.json do MFE o caminho do arquivo .tgz no lugar da lib tudu-component: "x.x.x"

- cd C:\Users\user\Documents\Frontend\tudü\tudu-workspace
- ng build tudu-components --watch

# Em outro terminal, na pasta dist
cd dist/tudu-components
npm link

# No MFE :
cd C:\Users\user\Documents\Frontend\tudü\mfe-tudu-professional (pasta-raiz-do-projeto)
npm link tudu-components
npm run start


### PUBLICAR A LIB NO NPM DPS DE DESENVOLVER ###

cd projects/tudu-components

# Atualiza a versão
npm version patch  # 0.0.1 → 0.0.2
# ou
npm version minor  # 0.0.1 → 0.1.0

# Builda a nova versão
ng build tudu-components

# Publica no npm
npm publish

# No MFE, atualizar a versão:
{
  "tudu-components": "^0.0.2"
}
npm update tudu-components
