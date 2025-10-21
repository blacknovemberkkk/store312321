// JavaScript para funcionalidade do carrinho

// Array para armazenar os itens do carrinho
let cartItems = [];

// Função para adicionar item ao carrinho
function addToCart(product) {
  // Validar se o produto tem dados válidos
  if (
    !product ||
    !product.name ||
    product.name === "undefined" ||
    !product.price ||
    product.price === "undefined"
  ) {
    return;
  }

  // Verificar se o produto já existe no carrinho (usando ID do produto + cor + tamanho)
  const existingItem = cartItems.find(
    (item) =>
      item.id === product.id &&
      item.color === product.color &&
      item.size === product.size
  );

  if (existingItem) {
    // Se já existe, aumentar a quantidade
    existingItem.quantity += 1;
  } else {
    // Se não existe, adicionar novo item
    const newItem = {
      ...product,
      quantity: 1,
      cartItemId: Date.now() + Math.random(), // ID único para o item no carrinho
    };
    cartItems.push(newItem);
  }

  // Atualizar a interface do carrinho
  updateCartUI();

  // Mostrar feedback visual
  showCartNotification();

  // Salvar no localStorage
  saveCartToStorage();
}

// Função para remover item do carrinho
function removeFromCart(cartItemId) {
  cartItems = cartItems.filter((item) => item.cartItemId !== cartItemId);
  updateCartUI();
  saveCartToStorage();
}

// Função para atualizar quantidade de um item
function updateQuantity(cartItemId, newQuantity) {
  if (newQuantity <= 0) {
    removeFromCart(cartItemId);
    return;
  }

  const item = cartItems.find((item) => item.cartItemId === cartItemId);
  if (item) {
    item.quantity = newQuantity;
    updateCartUI();
    saveCartToStorage();
  }
}

// Função para abrir o carrinho
function openCart() {
  const sidebar = document.getElementById("cartSidebar");
  const overlay = document.getElementById("cartOverlay");

  if (sidebar && overlay) {
    sidebar.classList.add("open");
    overlay.classList.add("show");
    document.body.style.overflow = "hidden"; // Prevenir scroll da página
  }
}

// Função para fechar o carrinho
function closeCart() {
  const sidebar = document.getElementById("cartSidebar");
  const overlay = document.getElementById("cartOverlay");

  if (sidebar && overlay) {
    sidebar.classList.remove("open");
    overlay.classList.remove("show");
    document.body.style.overflow = ""; // Restaurar scroll da página
  }
}

// Função para atualizar a interface do carrinho
function updateCartUI() {
  const cartItemsContainer = document.getElementById("cartItems");
  const cartTitle = document.getElementById("cartTitle");
  const cartSubtotal = document.getElementById("cartSubtotal");
  const cartTotal = document.getElementById("cartTotal");

  if (!cartItemsContainer) return;

  // Atualizar título
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  if (cartTitle) {
    cartTitle.textContent = `Carrinho (${totalItems} itens)`;
  }

  // Limpar container
  cartItemsContainer.innerHTML = "";

  if (cartItems.length === 0) {
    cartItemsContainer.innerHTML =
      '<p style="text-align: center; color: #666; padding: 40px 20px;">Seu carrinho está vazio</p>';
    if (cartSubtotal) cartSubtotal.textContent = "R$ 0,00";
    if (cartTotal) cartTotal.textContent = "R$ 0,00";
    return;
  }

  // Adicionar itens
  cartItems.forEach((item) => {
    const itemElement = createCartItemElement(item);
    cartItemsContainer.appendChild(itemElement);
  });

  // Calcular totais
  const subtotal = calculateSubtotal();
  if (cartSubtotal) cartSubtotal.textContent = formatPrice(subtotal);
  if (cartTotal) cartTotal.textContent = formatPrice(subtotal);
}

// Função para criar elemento de item do carrinho
function createCartItemElement(item) {
  const div = document.createElement("div");
  div.className = "cart-item";
  div.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-item-info">
            <h4 class="cart-item-name">${item.name}</h4>
            <p class="cart-item-price">${item.price}</p>
            <div class="cart-item-controls">
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateQuantity(${
                      item.cartItemId
                    }, ${item.quantity - 1})">-</button>
                    <input type="number" class="quantity-input" value="${
                      item.quantity
                    }" min="1" 
                           onchange="updateQuantity(${
                             item.cartItemId
                           }, parseInt(this.value))">
                    <button class="quantity-btn" onclick="updateQuantity(${
                      item.cartItemId
                    }, ${item.quantity + 1})">+</button>
                </div>
                 <button class="remove-item" onclick="removeFromCart(${
                   item.cartItemId
                 })" title="Remover item">×</button>
            </div>
        </div>
    `;
  return div;
}

// Função para calcular subtotal
function calculateSubtotal() {
  return cartItems.reduce((total, item) => {
    const price = parseFloat(item.price.replace("R$ ", "").replace(",", "."));
    return total + price * item.quantity;
  }, 0);
}

// Função para formatar preço
function formatPrice(price) {
  return `R$ ${price.toFixed(2).replace(".", ",")}`;
}

// Função para mostrar notificação
function showCartNotification() {
  // Criar notificação temporária
  const notification = document.createElement("div");
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 1001;
        font-weight: 500;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
  notification.textContent = "Item adicionado ao carrinho!";

  document.body.appendChild(notification);

  // Animar entrada
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Remover após 3 segundos
  setTimeout(() => {
    notification.style.transform = "translateX(100%)";
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Função para finalizar compra
function checkout() {
  if (cartItems.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }

  // Redirecionar para a página de checkout
  window.location.href = "checkout.html";
}

// Função para salvar carrinho no localStorage
function saveCartToStorage() {
  localStorage.setItem("melissaCart", JSON.stringify(cartItems));
}

// Função para carregar carrinho do localStorage
function loadCartFromStorage() {
  const savedCart = localStorage.getItem("melissaCart");
  if (savedCart) {
    try {
      cartItems = JSON.parse(savedCart);
      // Filtrar itens com dados inválidos
      cartItems = cartItems.filter(
        (item) =>
          item &&
          item.name &&
          item.name !== "undefined" &&
          item.price &&
          item.price !== "undefined"
      );
      updateCartUI();
    } catch (error) {
      console.error("Erro ao carregar carrinho:", error);
      cartItems = [];
      updateCartUI();
    }
  }
}

// Função para obter contador do carrinho
function getCartCount() {
  return cartItems.reduce((sum, item) => sum + item.quantity, 0);
}

// Função para atualizar contador no ícone do carrinho
function updateCartIcon() {
  const cartIcon = document.querySelector(".cart-icon");
  if (cartIcon) {
    const count = getCartCount();
    // Aqui você pode adicionar um badge com o número de itens
    // Por enquanto, vamos apenas mostrar no console
    console.log(`Carrinho: ${count} itens`);
  }
}

// Inicializar carrinho quando a página carregar
document.addEventListener("DOMContentLoaded", function () {
  loadCartFromStorage();
  updateCartIcon();

  // Adicionar event listener para o ícone do carrinho
  const cartIcon = document.querySelector(".cart-icon");
  if (cartIcon) {
    cartIcon.addEventListener("click", openCart);
  }
});

// Função global para ser chamada pelos botões "Adicionar ao carrinho"
window.addToCartGlobal = function (product) {
  addToCart(product);
  // Abrir carrinho automaticamente após um pequeno delay
  setTimeout(() => {
    openCart();
  }, 100);
};
