// Variáveis do carrossel
let currentSlideIndex = 0;
const slides = document.querySelectorAll(".carousel-slide");
const indicators = document.querySelectorAll(".indicator");
const totalSlides = slides.length;

// Função para mudar slide
function changeSlide(direction) {
  // Remove classe active do slide atual
  slides[currentSlideIndex].classList.remove("active");
  indicators[currentSlideIndex].classList.remove("active");

  // Calcula novo índice
  currentSlideIndex += direction;

  // Verifica limites
  if (currentSlideIndex >= totalSlides) {
    currentSlideIndex = 0;
  } else if (currentSlideIndex < 0) {
    currentSlideIndex = totalSlides - 1;
  }

  // Adiciona classe active ao novo slide
  slides[currentSlideIndex].classList.add("active");
  indicators[currentSlideIndex].classList.add("active");

  // Move o carrossel
  const carousel = document.querySelector(".carousel");
  carousel.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
}

// Função para ir para slide específico
function currentSlide(slideNumber) {
  // Remove classe active do slide atual
  slides[currentSlideIndex].classList.remove("active");
  indicators[currentSlideIndex].classList.remove("active");

  // Define novo índice
  currentSlideIndex = slideNumber - 1;

  // Adiciona classe active ao novo slide
  slides[currentSlideIndex].classList.add("active");
  indicators[currentSlideIndex].classList.add("active");

  // Move o carrossel
  const carousel = document.querySelector(".carousel");
  carousel.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
}

// Auto-play do carrossel
function autoPlay() {
  setInterval(() => {
    changeSlide(1);
  }, 3000); // Muda slide a cada 3 segundos
}

// Função para adicionar produto ao carrinho (para página principal)
function addProductToCart(productName, productPrice, productImage) {
  const product = {
    name: productName,
    price: productPrice,
    color: "Padrão",
    size: "Não especificado",
    image: productImage,
  };

  // Usar a função global do carrinho
  if (typeof addToCartGlobal === "function") {
    addToCartGlobal(product);
  } else {
    console.log("Produto adicionado ao carrinho:", product);
  }
}

// Inicialização quando a página carrega
document.addEventListener("DOMContentLoaded", function () {
  // Inicia o auto-play
  autoPlay();

  // Adiciona efeito hover nos produtos
  const productItems = document.querySelectorAll(".product-item");

  productItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px) scale(1.02)";
    });

    item.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  // Adiciona funcionalidade de clique nos produtos
  productItems.forEach((item, index) => {
    item.addEventListener("click", function () {
      // Aqui você pode adicionar funcionalidade para abrir modal ou redirecionar
      console.log(`Produto ${index + 1} clicado`);
      // Exemplo: window.open(`produto-${index + 1}.html`, '_blank');
    });
  });
});

// Pausa o auto-play quando o mouse está sobre o carrossel
const carouselContainer = document.querySelector(".carousel-container");
let autoPlayInterval;

function startAutoPlay() {
  autoPlayInterval = setInterval(() => {
    changeSlide(1);
  }, 3000);
}

function stopAutoPlay() {
  clearInterval(autoPlayInterval);
}

carouselContainer.addEventListener("mouseenter", stopAutoPlay);
carouselContainer.addEventListener("mouseleave", startAutoPlay);

// Inicia o auto-play
startAutoPlay();

// Adiciona suporte para navegação por teclado
document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowLeft") {
    changeSlide(-1);
  } else if (event.key === "ArrowRight") {
    changeSlide(1);
  }
});

// Adiciona suporte para touch/swipe em dispositivos móveis
let startX = 0;
let endX = 0;

carouselContainer.addEventListener("touchstart", function (event) {
  startX = event.touches[0].clientX;
});

carouselContainer.addEventListener("touchend", function (event) {
  endX = event.changedTouches[0].clientX;
  handleSwipe();
});

function handleSwipe() {
  const swipeThreshold = 50;
  const diff = startX - endX;

  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      // Swipe para esquerda - próximo slide
      changeSlide(1);
    } else {
      // Swipe para direita - slide anterior
      changeSlide(-1);
    }
  }
}

// Função para inicializar o ícone do carrinho
function initCartIcon() {
  const cartIcon = document.querySelector(".cart-icon");
  if (cartIcon) {
    cartIcon.addEventListener("click", function () {
      // Verificar se há itens no carrinho
      const cartItems = JSON.parse(localStorage.getItem("melissaCart")) || [];
      if (cartItems.length > 0) {
        // Redirecionar para checkout se houver itens
        window.location.href = "checkout.html";
      } else {
        // Mostrar mensagem se carrinho estiver vazio
        alert("Seu carrinho está vazio!");
      }
    });
  }
}

// Inicializar quando a página carregar
document.addEventListener("DOMContentLoaded", function () {
  initCarousel();
  initProductHover();
  initCartIcon();
});
