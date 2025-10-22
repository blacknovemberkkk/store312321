// JavaScript para funcionalidade do checkout

// Variáveis globais
let currentStep = 0;
let checkoutData = {
  customer: {},
  address: {},
  delivery: {},
  payment: {},
};

// Inicializar checkout quando a página carregar
document.addEventListener("DOMContentLoaded", function () {
  loadCartItems();
  updateTotals();
  startTimer();
  setupEventListeners();
});

// Carregar itens do carrinho
function loadCartItems() {
  const cartItems = JSON.parse(localStorage.getItem("melissaCart")) || [];
  const container = document.getElementById("checkoutCartItems");

  if (cartItems.length === 0) {
    container.innerHTML =
      '<p style="text-align: center; color: #666; padding: 20px;">Seu carrinho está vazio</p>';
    return;
  }

  container.innerHTML = "";

  cartItems.forEach((item) => {
    const itemElement = document.createElement("div");
    itemElement.className = "checkout-cart-item";
    itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="checkout-item-info">
                <div class="checkout-item-name">${item.name}</div>
                <div class="checkout-item-price">${item.price}</div>
            </div>
            <div class="checkout-quantity-controls">
                <button class="quantity-btn" onclick="updateQuantity('${
                  item.cartItemId
                }', ${item.quantity - 1})">-</button>
                <input type="number" class="quantity-input" value="${
                  item.quantity
                }" min="1" 
                       onchange="updateQuantity('${
                         item.cartItemId
                       }', parseInt(this.value))">
                <button class="quantity-btn" onclick="updateQuantity('${
                  item.cartItemId
                }', ${item.quantity + 1})">+</button>
            </div>
        `;
    container.appendChild(itemElement);
  });
}

// Atualizar quantidade de item
function updateQuantity(cartItemId, newQuantity) {
  if (newQuantity <= 0) {
    removeFromCart(cartItemId);
    return;
  }

  const cartItems = JSON.parse(localStorage.getItem("melissaCart")) || [];
  const item = cartItems.find((item) => item.cartItemId == cartItemId);

  if (item) {
    item.quantity = newQuantity;
    localStorage.setItem("melissaCart", JSON.stringify(cartItems));
    loadCartItems();
    updateTotals();
  }
}

// Remover item do carrinho
function removeFromCart(cartItemId) {
  const cartItems = JSON.parse(localStorage.getItem("melissaCart")) || [];
  const updatedItems = cartItems.filter(
    (item) => item.cartItemId != cartItemId
  );
  localStorage.setItem("melissaCart", JSON.stringify(updatedItems));
  loadCartItems();
  updateTotals();
}

// Atualizar totais
function updateTotals() {
  const cartItems = JSON.parse(localStorage.getItem("melissaCart")) || [];

  let productsTotal = 0;
  cartItems.forEach((item) => {
    const price = parseFloat(item.price.replace("R$ ", "").replace(",", "."));
    productsTotal += price * item.quantity;
  });

  // Calcular frete (por enquanto grátis)
  const shippingTotal = 0;
  const finalTotal = productsTotal + shippingTotal;

  document.getElementById("productsTotal").textContent =
    formatPrice(productsTotal);
  document.getElementById("shippingTotal").textContent = "+ R$ 0,00";
  document.getElementById("finalTotal").textContent = formatPrice(finalTotal);
  document.getElementById("pixValue").textContent = formatPrice(finalTotal);
}

// Formatar preço
function formatPrice(price) {
  return `R$ ${price.toFixed(2).replace(".", ",")}`;
}

// Timer da oferta
function startTimer() {
  let timeLeft = 14 * 60 + 11; // 14 minutos e 11 segundos

  const timer = setInterval(() => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    const timeString = `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}:11`;
    document.getElementById("timer").textContent = timeString;

    timeLeft--;

    if (timeLeft < 0) {
      clearInterval(timer);
      document.getElementById("timer").textContent = "00:00:00";
    }
  }, 1000);
}

// Configurar event listeners
function setupEventListeners() {
  // Validação de CPF
  document.getElementById("cpf").addEventListener("input", function (e) {
    let value = e.target.value.replace(/\D/g, "");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    e.target.value = value;
  });

  // Validação de telefone
  document.getElementById("phone").addEventListener("input", function (e) {
    let value = e.target.value.replace(/\D/g, "");
    value = value.replace(/(\d{2})(\d)/, "($1) $2");
    value = value.replace(/(\d{4})(\d)/, "$1-$2");
    value = value.replace(/(\d{4})-(\d)(\d{4})/, "$1$2-$3");
    e.target.value = value;
  });

  // Validação de CEP
  document.getElementById("cep").addEventListener("input", function (e) {
    let value = e.target.value.replace(/\D/g, "");
    value = value.replace(/(\d{5})(\d)/, "$1-$2");
    e.target.value = value;
  });

  // Cupom
  document
    .querySelector(".add-coupon-btn")
    .addEventListener("click", function () {
      const couponCode = document.getElementById("couponCode").value;
      if (couponCode) {
        // Aqui você pode implementar a lógica de validação do cupom
        alert("Cupom aplicado com sucesso!");
        document.getElementById("couponCode").value = "";
      }
    });

  // Endereços
  document.querySelectorAll('input[name="address"]').forEach((radio) => {
    radio.addEventListener("change", function () {
      document.querySelectorAll(".address-card").forEach((card) => {
        card.classList.remove("selected");
      });
      this.closest(".address-card").classList.add("selected");
    });
  });

  // Métodos de entrega
  document.querySelectorAll('input[name="delivery"]').forEach((radio) => {
    radio.addEventListener("change", function () {
      const price = this.value === "jadlog" ? 0 : 9.65;
      document.getElementById("shippingTotal").textContent = `+ ${formatPrice(
        price
      )}`;

      // Atualizar total final
      const cartItems = JSON.parse(localStorage.getItem("melissaCart")) || [];
      let productsTotal = 0;
      cartItems.forEach((item) => {
        const itemPrice = parseFloat(
          item.price.replace("R$ ", "").replace(",", ".")
        );
        productsTotal += itemPrice * item.quantity;
      });

      const finalTotal = productsTotal + price;
      document.getElementById("finalTotal").textContent =
        formatPrice(finalTotal);
      document.getElementById("pixValue").textContent = formatPrice(finalTotal);
    });
  });

  // Métodos de pagamento
  document.querySelectorAll('input[name="payment"]').forEach((radio) => {
    radio.addEventListener("change", function () {
      document.querySelectorAll(".payment-option").forEach((option) => {
        option.classList.remove("selected");
      });
      this.closest(".payment-option").classList.add("selected");
    });
  });
}

// Navegação entre etapas
function goToStep1() {
  // Ir para a etapa de identificação
  document.getElementById("step0").style.display = "none";
  document.getElementById("step1").style.display = "block";
  currentStep = 1;
}

function goToStep2() {
  // Validar dados da etapa 1
  const fullName = document.getElementById("fullName").value;
  const email = document.getElementById("email").value;
  const cpf = document.getElementById("cpf").value;
  const phone = document.getElementById("phone").value;

  if (!fullName || !email || !cpf || !phone) {
    alert("Por favor, preencha todos os campos obrigatórios.");
    return;
  }

  // Salvar dados do cliente
  checkoutData.customer = {
    nomeCompleto: fullName,
    fullName,
    email,
    cpf,
    telefone: phone,
    phone,
  };

  // Ir para próxima etapa
  document.getElementById("step1").style.display = "none";
  document.getElementById("step2").style.display = "block";
  currentStep = 2;
}

function goToStep3() {
  // Validar se endereço foi preenchido
  if (!checkoutData.address || !checkoutData.address.cep) {
    alert("Por favor, preencha e salve o endereço de entrega.");
    return;
  }

  // Validar seleção de entrega
  const selectedDelivery = document.querySelector(
    'input[name="delivery"]:checked'
  );
  if (!selectedDelivery) {
    alert("Por favor, selecione um método de entrega.");
    return;
  }

  // Salvar dados de entrega
  checkoutData.delivery = {
    method: selectedDelivery.value,
    price: selectedDelivery.value === "jadlog" ? 0 : 9.65,
  };

  // Ir para próxima etapa
  document.getElementById("step2").style.display = "none";
  document.getElementById("step3").style.display = "block";
  currentStep = 3;
}

async function finalizePayment() {
  // Validar seleção de pagamento
  const selectedPayment = document.querySelector(
    'input[name="payment"]:checked'
  );
  if (!selectedPayment) {
    alert("Por favor, selecione uma forma de pagamento.");
    return;
  }

  // Debug: verificar dados salvos
  console.log("Dados do cliente:", checkoutData.customer);
  console.log("Dados do endereço:", checkoutData.address);

  // Validar se todos os dados estão preenchidos
  if (
    !checkoutData.customer ||
    !checkoutData.customer.fullName ||
    !checkoutData.customer.cpf
  ) {
    alert("Por favor, preencha todos os dados de identificação.");
    return;
  }

  if (!checkoutData.address || !checkoutData.address.cep) {
    alert("Por favor, preencha o endereço de entrega.");
    return;
  }

  // Salvar dados de pagamento
  checkoutData.payment = {
    method: selectedPayment.value,
  };

  // Mostrar loading
  const finalizeBtn = document.querySelector(".finalize-payment-btn");
  const originalText = finalizeBtn.innerHTML;
  finalizeBtn.innerHTML = "<span>⏳</span> Processando...";
  finalizeBtn.disabled = true;

  try {
    // Calcular valor total e nome do produto
    const cartItems = JSON.parse(localStorage.getItem("melissaCart")) || [];
    if (cartItems.length === 0) {
      alert("Seu carrinho está vazio.");
      finalizeBtn.innerHTML = originalText;
      finalizeBtn.disabled = false;
      return;
    }

    let productsTotal = 0;
    cartItems.forEach((item) => {
      const price = parseFloat(item.price.replace("R$ ", "").replace(",", "."));
      productsTotal += price * item.quantity;
    });

    const shippingPrice = checkoutData.delivery.price || 0;
    const totalValue = productsTotal + shippingPrice;

    const productNames = cartItems
      .map((item) => `${item.name} (x${item.quantity})`)
      .join(", ");

    // Preparar dados para a API /api/user/direct-checkout
    const [city, uf] = checkoutData.address.cityState.split(" - ");

    const payload = {
      productName: productNames,
      productAmount: totalValue,
      customerName: checkoutData.customer.fullName,
      customerEmail: checkoutData.customer.email,
      customerCpf: checkoutData.customer.cpf,
      customerPhone: checkoutData.customer.phone,
      paymentMethod: checkoutData.payment.method.toUpperCase(),
      address: {
        cep: checkoutData.address.cep,
        street: checkoutData.address.street,
        number: checkoutData.address.number,
        complement: checkoutData.address.complement,
        neighborhood: checkoutData.address.neighborhood,
        city: city,
        uf: uf,
      },
      // cardData is not collected in this form
    };

    // Chamar API de direct checkout
    const response = await fetch(
      "http://localhost:3001/api/user/direct-checkout",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const result = await response.json();

    if (response.ok && result.success) {
      // Sucesso - mostrar QR Code
      const pixDisplayData = {
        valor: totalValue,
        cliente: { nome: checkoutData.customer.fullName },
        qrcode: result.data.pix.image, // base64 image for src
        pix: result.data.pix.qr_code, // code to copy
        id: result.data.orderId, // for checkPaymentStatus
      };
      showPixPayment(pixDisplayData);
    } else {
      throw new Error(
        result.error || result.message || "Erro ao processar pagamento"
      );
    }
  } catch (error) {
    console.error("Erro no pagamento:", error);
    alert(`Erro ao processar pagamento: ${error.message}`);
  } finally {
    // Restaurar botão
    finalizeBtn.innerHTML = originalText;
    finalizeBtn.disabled = false;
  }
}

// Função para mostrar o PIX
function showPixPayment(pixData) {
  // Criar modal para mostrar PIX
  const modal = document.createElement("div");
  modal.className = "pix-modal";
  modal.innerHTML = `
    <div class="pix-modal-content">
      <div class="pix-header">
        <h3>Pagamento PIX</h3>
        <button class="close-pix" onclick="closePixModal()">×</button>
      </div>
      <div class="pix-body">
        <div class="pix-info">
          <p><strong>Valor:</strong> R$ ${pixData.valor
            .toFixed(2)
            .replace(".", ",")}</p>
          <p><strong>Cliente:</strong> ${pixData.cliente.nome}</p>
        </div>
        <div class="pix-qr">
          <img src="${
            pixData.qrcode || pixData.qr_code
          }" alt="QR Code PIX" class="qr-image">
        </div>
        <div class="pix-copy">
          <p>Código PIX (Copie e cole no seu app):</p>
          <div class="pix-code">
            <input type="text" value="${
              pixData.pix || pixData.pix_code
            }" readonly id="pixCode">
            <button onclick="copyPixCode()">Copiar</button>
          </div>
        </div>
        <div class="pix-instructions">
          <p><strong>Como pagar:</strong></p>
          <ol>
            <li>Abra o app do seu banco</li>
            <li>Escaneie o QR Code ou cole o código PIX</li>
            <li>Confirme o pagamento</li>
          </ol>
        </div>
      </div>
      <div class="pix-footer">
        <button class="check-payment-btn" onclick="checkPaymentStatus('${
          pixData.id || pixData.transaction_id
        }')">
          Verificar Pagamento
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
}

// Função para fechar modal PIX
function closePixModal() {
  const modal = document.querySelector(".pix-modal");
  if (modal) {
    modal.remove();
  }
}

// Função para copiar código PIX
function copyPixCode() {
  const pixCode = document.getElementById("pixCode");
  pixCode.select();
  document.execCommand("copy");
  alert("Código PIX copiado!");
}

// Função para verificar status do pagamento
async function checkPaymentStatus(pixId) {
  try {
    const response = await fetch(`http://localhost:3001/status-pix/${pixId}`);
    const result = await response.json();

    if (result.status === "paid" || result.pago === true) {
      alert("Pagamento confirmado! Redirecionando...");
      // Limpar carrinho
      localStorage.removeItem("melissaCart");
      // Redirecionar para página de sucesso
      window.location.href = "sucesso.html";
    } else {
      alert(
        "Pagamento ainda não foi confirmado. Tente novamente em alguns segundos."
      );
    }
  } catch (error) {
    console.error("Erro ao verificar pagamento:", error);
    alert("Erro ao verificar status do pagamento.");
  }
}

// Função para voltar para a etapa anterior
function goToPreviousStep() {
  if (currentStep > 0) {
    document.getElementById(`step${currentStep}`).style.display = "none";
    currentStep--;
    document.getElementById(`step${currentStep}`).style.display = "block";
  }
}

// Função para salvar endereço
function saveAddress() {
  const cep = document.getElementById("cep").value;
  const street = document.getElementById("street").value;
  const number = document.getElementById("number").value;
  const neighborhood = document.getElementById("neighborhood").value;
  const complement = document.getElementById("complement").value;
  const recipient = document.getElementById("recipient").value;

  // Validar campos obrigatórios
  if (!cep || !street || !number || !neighborhood || !recipient) {
    alert("Por favor, preencha todos os campos obrigatórios.");
    return;
  }

  // Simular busca de cidade/estado pelo CEP (normalmente seria uma API)
  const cityState = getCityStateByCep(cep);

  // Atualizar prévia do endereço
  document.getElementById("previewStreet").textContent = `${street}, ${number}`;
  document.getElementById(
    "previewLocation"
  ).textContent = `${neighborhood}, ${cityState}`;
  document.getElementById("previewCep").textContent = `CEP: ${cep}`;

  // Salvar dados do endereço
  checkoutData.address = {
    cep,
    street,
    number,
    neighborhood,
    complement,
    recipient,
    cityState,
  };

  // Mostrar prévia e esconder formulário
  document.getElementById("addressForm").style.display = "none";
  document.getElementById("addressPreview").style.display = "block";

  // Mostrar métodos de entrega
  document.querySelector(".delivery-methods").style.display = "block";
}

// Função para editar endereço
function editAddress() {
  // Mostrar formulário e esconder prévia
  document.getElementById("addressForm").style.display = "block";
  document.getElementById("addressPreview").style.display = "none";

  // Esconder métodos de entrega
  document.querySelector(".delivery-methods").style.display = "none";
}

// Função para simular busca de cidade/estado pelo CEP
function getCityStateByCep(cep) {
  // Simulação - normalmente seria uma chamada para API dos Correios
  const cepData = {
    "23970-000": "Barbalha - CE",
    "63180-000": "Barbalha - CE",
    "20000-000": "Rio de Janeiro - RJ",
    "40000-000": "Salvador - BA",
    "80000-000": "Curitiba - PR",
  };

  return cepData[cep] || "Cidade - Estado";
}

// Função de teste para debug (pode ser chamada no console)
window.testCheckoutData = function () {
  console.log("=== DEBUG CHECKOUT DATA ===");
  console.log("currentStep:", currentStep);
  console.log("checkoutData:", checkoutData);
  console.log("checkoutData.customer:", checkoutData.customer);
  console.log("checkoutData.address:", checkoutData.address);
  console.log("checkoutData.delivery:", checkoutData.delivery);
  console.log("checkoutData.payment:", checkoutData.payment);
  console.log("==========================");
};

// Event listener para o botão de novo endereço
document.addEventListener("DOMContentLoaded", function () {
  const newAddressBtn = document.querySelector(".new-address-btn");
  if (newAddressBtn) {
    newAddressBtn.addEventListener("click", addNewAddress);
  }
});
