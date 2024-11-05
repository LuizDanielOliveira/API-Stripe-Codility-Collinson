Este projeto foi desenvolvido como parte de uma avaliação técnica da Codility. O objetivo foi criar uma integração com a API do Stripe para gerenciar produtos, criar sessões de checkout e lidar com transações de forma segura e eficiente.

Estrutura do Projeto:

app.js: Arquivo principal que inicia o servidor e configura as rotas.
services/ProductService.js: Lida com a comunicação com a API do Stripe para gerenciamento de produtos e criação de sessões de checkout.
services/StockService.js: Simula a gestão de estoque para verificar a disponibilidade de produtos.
settings.js: Contém a chave de API do Stripe e outras configurações.
Requisitos:

Node.js (versão 14 ou superior)
npm ou yarn
Conta no Stripe com chaves de API de teste
Configuração e Execução:

Clone o repositório e entre no diretório do projeto.
Instale as dependências com npm install.
Configure a chave de API do Stripe em settings.js com sua chave de teste.
Inicie o servidor com npm start e acesse http://localhost:3000.
Teste de Checkout: Use um cliente de API como Postman para enviar uma solicitação POST para http://localhost:3000/api/create-checkout-session com o seguinte corpo JSON:

////////////////////////////////
{
  "productData": {
    "id": "prod_XXXXXXXX",
    "name": "test product",
    "price": 12300,
    "quantity": 1
  }
}

////////////////////////////////////


A resposta incluirá uma URL de checkout que pode ser aberta no navegador para simular uma compra. Use o cartão de teste do Stripe 4242 4242 4242 4242 com qualquer data de validade futura e CVC.

Tratamento de Erros: O projeto inclui tratamento de erros para problemas de conexão e timeouts. O tempo limite pode ser ajustado no arquivo ProductService.js:

////////////////////////////////

this.stripe = new Stripe(STRIPE_API_KEY, {
  apiVersion: '2022-11-15',
  timeout: 10000 // Timeout ajustável
});


///////////////////////
 Este projeto demonstra como criar uma integração funcional com a API do Stripe, destacando o processo de verificação de comunicação, tratamento de respostas e erros, e garantindo que o fluxo funcione em um ambiente de desenvolvimento real.
