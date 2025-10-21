# Melissa - Loja Online com PIX

Sistema completo de e-commerce com integração PIX via CN Pay.

## 🚀 Funcionalidades

- ✅ **Catálogo de produtos** com 26 itens
- ✅ **Carrinho de compras** com sidebar
- ✅ **Checkout em 3 etapas** (Identificação, Entrega, Pagamento)
- ✅ **Integração PIX** via CN Pay
- ✅ **Design responsivo** para mobile e desktop
- ✅ **Persistência** de dados no localStorage

## 📦 Instalação

### 1. Instalar dependências do backend

```bash
npm install
```

### 2. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Token da API CN Pay
APPCNPAY_API_TOKEN=z00tcfellkeui05dbtxuz8yumd8onqvaj1rneno1cv0bdbfp33z5dhjjyf5ke2tl

# Porta do servidor
PORT=3001
```

### 3. Iniciar o servidor

```bash
# Desenvolvimento
npm run dev

# Produção
npm start
```

O servidor estará rodando em `http://localhost:3001`

### 4. Abrir o frontend

Abra o arquivo `index.html` no navegador ou use um servidor local.

## 🛠️ Estrutura do Projeto

```
pagemelissa/
├── index.html              # Página principal
├── checkout.html           # Página de checkout
├── sucesso.html            # Página de sucesso
├── produto-*.html          # Páginas de produtos (26 arquivos)
├── styles.css              # Estilos principais
├── checkout.css            # Estilos do checkout
├── produto.css             # Estilos das páginas de produto
├── script.js               # JavaScript principal
├── checkout.js             # JavaScript do checkout
├── produto.js              # JavaScript das páginas de produto
├── cart.js                 # JavaScript do carrinho
├── products.js             # Base de dados dos produtos
├── server.js               # Servidor backend
├── package.json            # Dependências Node.js
└── img/                    # Imagens dos produtos
```

## 🔧 API Endpoints

### POST /gerar-pix

Gera uma cobrança PIX via CN Pay.

**Body:**

```json
{
  "nomeCompleto": "João Silva",
  "cpf": "123.456.789-00",
  "email": "joao@email.com",
  "telefone": "(11) 99999-9999",
  "valorTotal": 100.0
}
```

**Response:**

```json
{
  "success": true,
  "qrcode": "data:image/png;base64,...",
  "pix": "00020126580014br.gov.bcb.pix...",
  "id": "transaction_id"
}
```

### GET /status-pix/:id

Verifica o status de um pagamento PIX.

**Response:**

```json
{
  "status": "paid",
  "pago": true
}
```

## 🎯 Como Usar

1. **Adicione produtos** ao carrinho
2. **Clique no ícone do carrinho** para ir ao checkout
3. **Preencha seus dados** na etapa 1
4. **Digite seu endereço** na etapa 2
5. **Selecione método de entrega**
6. **Finalize o pagamento** com PIX
7. **Escaneie o QR Code** ou copie o código PIX
8. **Verifique o pagamento** no app do banco

## 🔐 Segurança

- ✅ Token da API armazenado em variável de ambiente
- ✅ Validação de dados no frontend e backend
- ✅ Limpeza de CPF (remove formatação)
- ✅ CORS configurado para desenvolvimento

## 📱 Responsivo

- ✅ **Desktop:** Layout em duas colunas
- ✅ **Mobile:** Layout em uma coluna
- ✅ **Tablet:** Adaptação automática

## 🐛 Troubleshooting

### Erro de CORS

Se houver problemas de CORS, verifique se o servidor está rodando na porta 3001.

### Token inválido

Verifique se o token da CN Pay está correto no arquivo `.env`.

### PIX não gera

Verifique se todos os dados obrigatórios estão sendo enviados (nome, CPF, valor).

## 📞 Suporte

Para dúvidas ou problemas, entre em contato:

- **E-mail:** contato@usamelissa.com
- **WhatsApp:** (disponível no site)

## 📄 Licença

© 2025 Melissa - Loja Oficial. Todos os direitos reservados.
