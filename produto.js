// JavaScript para página de produto

// Variáveis globais
let currentImageIndex = 0;
let productImages = [];

let selectedColor = "vermelho";
let selectedSize = null;

// Função para trocar imagem principal
function setMainImage(imageSrc) {
  const mainImage = document.getElementById("mainImage");
  mainImage.src = imageSrc;

  // Atualizar thumbnail ativo
  document.querySelectorAll(".thumbnail").forEach((thumb) => {
    thumb.classList.remove("active");
    if (thumb.src.includes(imageSrc)) {
      thumb.classList.add("active");
    }
  });

  // Atualizar índice atual
  currentImageIndex = productImages.indexOf(imageSrc);
}

// Função para navegar entre imagens
function changeImage(direction) {
  // Verificar se há imagens disponíveis
  if (productImages.length === 0) {
    console.log("Nenhuma imagem disponível");
    return;
  }

  currentImageIndex += direction;

  // Verificar limites
  if (currentImageIndex >= productImages.length) {
    currentImageIndex = 0;
  } else if (currentImageIndex < 0) {
    currentImageIndex = productImages.length - 1;
  }

  setMainImage(productImages[currentImageIndex]);
}

// Função para selecionar cor
function selectColor(color) {
  selectedColor = color;

  // Remover classe active de todos os botões de cor
  document.querySelectorAll(".color-btn").forEach((btn) => {
    btn.classList.remove("active");
  });

  // Adicionar classe active ao botão selecionado
  document.querySelector(`[data-color="${color}"]`).classList.add("active");

  // Aqui você pode adicionar lógica para trocar as imagens baseado na cor
  console.log(`Cor selecionada: ${color}`);
}

// Função para selecionar tamanho
function selectSize(size) {
  selectedSize = size;

  // Remover classe active de todos os botões de tamanho
  document.querySelectorAll(".size-btn").forEach((btn) => {
    btn.classList.remove("active");
  });

  // Adicionar classe active ao botão selecionado
  document.querySelector(`[data-size="${size}"]`).classList.add("active");
}

// Flag para evitar múltiplas chamadas
let isAddingToCart = false;

// Função para adicionar ao carrinho
function addProductToCart() {
  // Evitar múltiplas chamadas
  if (isAddingToCart) return;
  isAddingToCart = true;

  // Extrair dados diretamente da página
  const productName = document.querySelector(".product-title")?.textContent;
  const productPrice = document.querySelector(".product-price")?.textContent;
  const productImage = document.getElementById("mainImage")?.src;

  // Verificar se os dados essenciais existem
  if (!productName || !productPrice) {
    alert("Erro ao adicionar produto ao carrinho. Dados não encontrados.");
    isAddingToCart = false; // Reset do flag em caso de erro
    return;
  }

  const product = {
    id: getProductIdFromPage() || "unknown",
    name: productName,
    price: productPrice,
    originalPrice:
      document.querySelector(".original-price")?.textContent || null,
    color: selectedColor || "Padrão",
    size: selectedSize || "Não especificado",
    image: productImage || "img/1.webp",
    category: "Produto",
    description:
      document.querySelector(".product-description p")?.textContent ||
      "Descrição do produto",
  };

  // Adicionar ao carrinho diretamente
  if (typeof addToCart === "function") {
    addToCart(product);
    // Abrir carrinho após um pequeno delay
    setTimeout(() => {
      if (typeof openCart === "function") {
        openCart();
      }
    }, 100);
  }

  // Mostrar feedback visual
  const cartBtn = document.querySelector(".cart-btn");
  const originalText = cartBtn.textContent;
  cartBtn.textContent = "Adicionado!";
  cartBtn.style.backgroundColor = "#4CAF50";

  setTimeout(() => {
    cartBtn.textContent = originalText;
    cartBtn.style.backgroundColor = "#333";
    isAddingToCart = false; // Reset do flag
  }, 2000);
}

// Função para comprar agora
function buyNow() {
  // Evitar múltiplas chamadas
  if (isAddingToCart) return;
  isAddingToCart = true;

  // Extrair dados diretamente da página
  const productName = document.querySelector(".product-title")?.textContent;
  const productPrice = document.querySelector(".product-price")?.textContent;
  const productImage = document.getElementById("mainImage")?.src;

  // Verificar se os dados essenciais existem
  if (!productName || !productPrice) {
    alert("Erro ao adicionar produto ao carrinho. Dados não encontrados.");
    isAddingToCart = false; // Reset do flag em caso de erro
    return;
  }

  const product = {
    id: getProductIdFromPage() || "unknown",
    name: productName,
    price: productPrice,
    originalPrice:
      document.querySelector(".original-price")?.textContent || null,
    color: selectedColor || "Padrão",
    size: selectedSize || "Não especificado",
    image: productImage || "img/1.webp",
    category: "Produto",
    description:
      document.querySelector(".product-description p")?.textContent ||
      "Descrição do produto",
  };

  // Adicionar ao carrinho diretamente
  if (typeof addToCart === "function") {
    addToCart(product);
    // Abrir carrinho após um pequeno delay
    setTimeout(() => {
      if (typeof openCart === "function") {
        openCart();
      }
    }, 100);
  }

  // Mostrar feedback visual
  const buyBtn = document.querySelector(".buy-btn");
  const originalText = buyBtn.textContent;
  buyBtn.textContent = "Adicionado!";
  buyBtn.style.backgroundColor = "#4CAF50";

  setTimeout(() => {
    buyBtn.textContent = originalText;
    buyBtn.style.backgroundColor = "#333";
    isAddingToCart = false; // Reset do flag
  }, 2000);
}

// Função para atualizar informações do produto baseado na cor
function updateProductByColor(color) {
  // Esta função pode ser expandida para atualizar preços, etc.
  // baseado na cor selecionada

  console.log(`Cor selecionada: ${color}`);

  // Re-inicializar as imagens para garantir que estamos usando as corretas
  initializeProductImages();
}

// Função para verificar disponibilidade de tamanho
function checkSizeAvailability(size) {
  // Esta função pode ser expandida para verificar disponibilidade real
  const unavailableSizes = ["33/34", "41/42"]; // Exemplo de tamanhos indisponíveis

  return !unavailableSizes.includes(size);
}

// Função para atualizar botões de tamanho
function updateSizeButtons() {
  document.querySelectorAll(".size-btn").forEach((btn) => {
    const size = btn.getAttribute("data-size");
    if (!checkSizeAvailability(size)) {
      btn.disabled = true;
      btn.style.opacity = "0.5";
      btn.style.cursor = "not-allowed";
    } else {
      btn.disabled = false;
      btn.style.opacity = "1";
      btn.style.cursor = "pointer";
    }
  });
}

// Função para atualizar contador de estoque
function updateStockInfo() {
  const stockElement = document.querySelector(".stock-number");
  if (stockElement) {
    // Simular atualização de estoque
    const currentStock = parseInt(stockElement.textContent);
    if (currentStock > 0) {
      stockElement.textContent = currentStock - 1;
    }
  }
}

// Função para inicializar as imagens do produto
function initializeProductImages() {
  const thumbnails = document.querySelectorAll(".thumbnail");
  productImages = [];

  thumbnails.forEach((thumb) => {
    productImages.push(thumb.src);
  });

  // Se não há thumbnails, usar a imagem principal
  if (productImages.length === 0) {
    const mainImage = document.getElementById("mainImage");
    if (mainImage) {
      productImages.push(mainImage.src);
    }
  }

  console.log("Imagens do produto inicializadas:", productImages);
}

// Event listeners
document.addEventListener("DOMContentLoaded", function () {
  // Inicializar imagens do produto
  initializeProductImages();

  // Adicionar event listeners aos botões
  const cartBtn = document.querySelector(".cart-btn");
  const buyBtn = document.querySelector(".buy-btn");

  if (cartBtn) {
    cartBtn.addEventListener("click", addToCart);
  }

  if (buyBtn) {
    buyBtn.addEventListener("click", buyNow);
  }

  // Atualizar botões de tamanho
  updateSizeButtons();

  // Adicionar suporte para teclado na galeria
  document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
      changeImage(-1);
    } else if (event.key === "ArrowRight") {
      changeImage(1);
    }
  });

  // Adicionar suporte para touch/swipe na galeria
  let startX = 0;
  let endX = 0;

  const mainImageContainer = document.querySelector(".main-image-container");

  if (mainImageContainer) {
    mainImageContainer.addEventListener("touchstart", function (event) {
      startX = event.touches[0].clientX;
    });

    mainImageContainer.addEventListener("touchend", function (event) {
      endX = event.changedTouches[0].clientX;
      handleSwipe();
    });
  }

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = startX - endX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swipe para esquerda - próxima imagem
        changeImage(1);
      } else {
        // Swipe para direita - imagem anterior
        changeImage(-1);
      }
    }
  }

  // Adicionar zoom na imagem principal (opcional)
  const mainImage = document.getElementById("mainImage");
  if (mainImage) {
    mainImage.addEventListener("click", function () {
      // Implementar modal de zoom se necessário
      console.log("Zoom na imagem");
    });
  }
});

// Função para compartilhar produto
function shareProduct() {
  if (navigator.share) {
    navigator.share({
      title: document.querySelector(".product-title").textContent,
      text: "Confira este produto da Melissa!",
      url: window.location.href,
    });
  } else {
    // Fallback para navegadores que não suportam Web Share API
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      alert("Link copiado para a área de transferência!");
    });
  }
}

// Função para favoritar produto
function toggleFavorite() {
  const isFavorited = localStorage.getItem("favorited") === "true";
  localStorage.setItem("favorited", !isFavorited);

  // Atualizar UI do botão de favorito se existir
  const favoriteBtn = document.querySelector(".favorite-btn");
  if (favoriteBtn) {
    favoriteBtn.textContent = !isFavorited ? "❤️" : "🤍";
  }

  console.log("Produto favoritado:", !isFavorited);
}
