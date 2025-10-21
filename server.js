const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Credenciais da API (do arquivo .env)
const APPCNPAY_PUBLIC_KEY =
  process.env.APPCNPAY_PUBLIC_KEY || "lukasgomesdemelofalchet_g89jyyd9qyuivlux";
const APPCNPAY_SECRET_KEY =
  process.env.APPCNPAY_SECRET_KEY ||
  "z00tcfellkeui05dbtxuz8yumd8onqvaj1rneno1cv0bdbfp33z5dhjjyf5ke2tl";

// Função para gerar cobrança PIX
async function gerarCobrancaPix(valor, nome, cpf) {
  try {
    // Limpar CPF (remover pontos e traços)
    const cpfApenasNumeros = cpf.replace(/[^\d]/g, "");

    console.log("=== DEBUG PIX REQUEST ===");
    console.log("Public Key:", APPCNPAY_PUBLIC_KEY ? "Presente" : "Ausente");
    console.log("Secret Key:", APPCNPAY_SECRET_KEY ? "Presente" : "Ausente");
    console.log("Valor:", valor);
    console.log("Nome:", nome);
    console.log("CPF limpo:", cpfApenasNumeros);
    console.log(
      "URL:",
      "https://painel.appcnpay.com/api/v1/gateway/pix/receive"
    );

    const requestBody = {
      val: valor.toFixed(2),
      name: nome,
      cpf: cpfApenasNumeros,
    };

    console.log("Request Body:", requestBody);
    console.log("========================");

    const response = await axios.post(
      "https://painel.appcnpay.com/api/v1/gateway/pix/receive",
      requestBody,
      {
        headers: {
          Authorization: `Bearer ${APPCNPAY_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Response Status:", response.status);
    console.log("Response Data:", response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("=== ERRO PIX ===");
    console.error("Status:", error.response?.status);
    console.error("Status Text:", error.response?.statusText);
    console.error("Response Data:", error.response?.data);
    console.error("Error Message:", error.message);
    console.error("=================");

    return {
      success: false,
      error:
        error.response?.data ||
        error.message ||
        "Erro desconhecido ao gerar PIX",
    };
  }
}

// Rota para gerar PIX
app.post("/gerar-pix", async (req, res) => {
  try {
    const { nomeCompleto, cpf, valorTotal, email, telefone } = req.body;

    // Validação dos dados obrigatórios
    if (!nomeCompleto || !cpf) {
      return res.status(400).json({
        error: "Nome completo e CPF são obrigatórios.",
      });
    }

    // Usar o valor total do carrinho ou valor padrão para teste
    const valorDaCompra = valorTotal || 0.01;

    // Gerar cobrança PIX
    const resultado = await gerarCobrancaPix(valorDaCompra, nomeCompleto, cpf);

    if (resultado.success) {
      // Adicionar dados adicionais do cliente na resposta
      const responseData = {
        ...resultado.data,
        cliente: {
          nome: nomeCompleto,
          cpf: cpf,
          email: email,
          telefone: telefone,
        },
        valor: valorDaCompra,
      };

      res.status(200).json(responseData);
    } else {
      res.status(500).json({
        error: "Falha ao gerar a cobrança PIX",
        details: resultado.error,
      });
    }
  } catch (error) {
    console.error("Erro na rota /gerar-pix:", error);
    res.status(500).json({
      error: "Erro interno do servidor",
      details: error.message,
    });
  }
});

// Rota para verificar status do PIX
app.get("/status-pix/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const response = await axios.get(
      `https://painel.appcnpay.com/api/v1/gateway/pix/receive/${id}`,
      {
        headers: {
          Authorization: `Bearer ${APPCNPAY_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error(
      "Erro ao verificar status PIX:",
      error.response ? error.response.data : error
    );
    res.status(500).json({
      error: "Erro ao verificar status do PIX",
      details: error.response ? error.response.data : error.message,
    });
  }
});

// Rota de teste
app.get("/test", (req, res) => {
  res.json({ message: "API PIX funcionando!" });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Teste: http://localhost:${PORT}/test`);
});
