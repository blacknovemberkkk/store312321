// Base de dados dos produtos com IDs únicos

const PRODUCTS = {
  // Melissa x Diesel
  "quantum-platform": {
    id: "quantum-platform",
    name: "Melissa Quantum Platform + Diesel",
    price: "R$ 499,90",
    originalPrice: null,
    image: "img/1.webp",
    category: "Melissa x Diesel",
    description:
      "Melissa Quantum Platform + Diesel, um calçado exclusivo em colaboração com a marca Diesel.",
  },

  "quantum-sneaker": {
    id: "quantum-sneaker",
    name: "Melissa Quantum Sneaker + Diesel",
    price: "R$ 399,90",
    originalPrice: null,
    image: "img/2.webp",
    category: "Melissa x Diesel",
    description:
      "Melissa Quantum Sneaker + Diesel, um tênis exclusivo em colaboração com a marca Diesel.",
  },

  // EM ALTA
  "melissa-possession": {
    id: "melissa-possession",
    name: "Melissa Possession",
    price: "R$ 169,90",
    originalPrice: null,
    image: "img/3.webp",
    category: "EM ALTA",
    description: "Melissa Possession, um calçado icônico da marca Melissa.",
  },

  "free-platform-slide": {
    id: "free-platform-slide",
    name: "Melissa Free Platform Slide",
    price: "R$ 9,99",
    originalPrice: "R$ 219,90",
    image: "img/4.webp",
    category: "EM ALTA",
    description:
      "Melissa Free Platform Slide, um slide confortável e estiloso.",
  },

  "melissa-texas-mule": {
    id: "melissa-texas-mule",
    name: "Melissa Texas Mule",
    price: "R$ 19,99",
    originalPrice: "R$ 199,90",
    image: "img/5.webp",
    category: "EM ALTA",
    description: "Melissa Texas Mule, um mule confortável e versátil.",
  },

  "melissa-lina": {
    id: "melissa-lina",
    name: "Melissa Lina",
    price: "R$ 29,99",
    originalPrice: "R$ 179,90",
    image: "img/6.webp",
    category: "EM ALTA",
    description: "Melissa Lina, um calçado elegante e confortável.",
  },

  "melissa-kirk-alexandre-pavao": {
    id: "melissa-kirk-alexandre-pavao",
    name: "Melissa Kirk Alexandre Pavão",
    price: "R$ 39,99",
    originalPrice: "R$ 189,90",
    image: "img/7.webp",
    category: "EM ALTA",
    description:
      "Melissa Kirk Alexandre Pavão, um calçado exclusivo com design único.",
  },

  // Moda Infantil
  "melissa-towny": {
    id: "melissa-towny",
    name: "Melissa Towny",
    price: "R$ 9,99",
    originalPrice: "R$ 149,90",
    image: "img/8.webp",
    category: "Moda Infantil",
    description: "Melissa Towny, um calçado infantil confortável e divertido.",
  },

  "mini-melissa-backpack-slide": {
    id: "mini-melissa-backpack-slide",
    name: "Mini Melissa Backpack + Melissa Flowing Slide Infantil",
    price: "R$ 19,99",
    originalPrice: "R$ 159,90",
    image: "img/9.webp",
    category: "Moda Infantil",
    description:
      "Mini Melissa Backpack + Melissa Flowing Slide Infantil, um conjunto completo para crianças.",
  },

  "mini-melissa-m-lover-slide": {
    id: "mini-melissa-m-lover-slide",
    name: "Mini Melissa M Lover Slide",
    price: "R$ 14,99",
    originalPrice: "R$ 129,90",
    image: "img/10.webp",
    category: "Moda Infantil",
    description: "Mini Melissa M Lover Slide, um slide infantil adorável.",
  },

  "mini-melissa-hip-bloomy": {
    id: "mini-melissa-hip-bloomy",
    name: "Mini Melissa Hip Bloomy",
    price: "R$ 24,99",
    originalPrice: "R$ 139,90",
    image: "img/11.webp",
    category: "Moda Infantil",
    description:
      "Mini Melissa Hip Bloomy, um calçado infantil com design floral.",
  },

  "mini-melissa-welly-wonderland": {
    id: "mini-melissa-welly-wonderland",
    name: "Mini Melissa Welly Wonderland",
    price: "R$ 29,99",
    originalPrice: "R$ 149,90",
    image: "img/12.webp",
    category: "Moda Infantil",
    description: "Mini Melissa Welly Wonderland, um calçado infantil mágico.",
  },

  "mini-melissa-flowing-slide-stitch": {
    id: "mini-melissa-flowing-slide-stitch",
    name: "Mini Melissa Flowing Slide Stitch",
    price: "R$ 19,99",
    originalPrice: "R$ 119,90",
    image: "img/13.webp",
    category: "Moda Infantil",
    description:
      "Mini Melissa Flowing Slide Stitch, um slide infantil com detalhes especiais.",
  },

  // Bolsas
  "melissa-bubble-bag": {
    id: "melissa-bubble-bag",
    name: "Melissa Bubble Bag",
    price: "R$ 49,90",
    originalPrice: null,
    image: "img/14.webp",
    category: "Bolsas",
    description: "Melissa Bubble Bag, uma bolsa com design único e moderno.",
  },

  "melissa-hoop-bag": {
    id: "melissa-hoop-bag",
    name: "Melissa Hoop Bag",
    price: "R$ 39,90",
    originalPrice: null,
    image: "img/15.webp",
    category: "Bolsas",
    description:
      "Melissa Hoop Bag, uma bolsa elegante com alças características.",
  },

  "melissa-x-heat-bag": {
    id: "melissa-x-heat-bag",
    name: "Melissa x Heat Bag",
    price: "R$ 59,90",
    originalPrice: null,
    image: "img/16.webp",
    category: "Bolsas",
    description: "Melissa x Heat Bag, uma bolsa exclusiva em colaboração.",
  },

  "melissa-mini-dulce-bag": {
    id: "melissa-mini-dulce-bag",
    name: "Melissa Mini Dulce Bag",
    price: "R$ 29,90",
    originalPrice: null,
    image: "img/17.webp",
    category: "Bolsas",
    description: "Melissa Mini Dulce Bag, uma bolsa pequena e fofa.",
  },

  "melissa-glass-bag": {
    id: "melissa-glass-bag",
    name: "Melissa Glass Bag",
    price: "R$ 44,90",
    originalPrice: null,
    image: "img/18.webp",
    category: "Bolsas",
    description: "Melissa Glass Bag, uma bolsa transparente e moderna.",
  },

  // Acessórios
  "melissa-station-tag": {
    id: "melissa-station-tag",
    name: "Melissa Station Tag",
    price: "R$ 29,90",
    originalPrice: null,
    image: "img/19.webp",
    category: "Acessórios",
    description:
      "Melissa Station Tag, é um acessório todo em Melflex que carrega a identificação da marca. Feito para levar a Melissa sempre com você!",
  },

  "melissa-x-icon-keyring": {
    id: "melissa-x-icon-keyring",
    name: "Melissa x Icon Keyring",
    price: "R$ 19,90",
    originalPrice: null,
    image: "img/20.webp",
    category: "Acessórios",
    description:
      "Melissa x Icon Keyring, um chaveiro exclusivo com o ícone da marca.",
  },

  "melissa-keyring-cat": {
    id: "melissa-keyring-cat",
    name: "Melissa Keyring Cat",
    price: "R$ 24,90",
    originalPrice: null,
    image: "img/21.webp",
    category: "Acessórios",
    description: "Melissa Keyring Cat, um chaveiro fofo em formato de gato.",
  },

  "melissa-coturno-steal-look": {
    id: "melissa-coturno-steal-look",
    name: "Melissa Coturno Steal Look",
    price: "R$ 199,90",
    originalPrice: null,
    image: "img/22.webp",
    category: "Acessórios",
    description: "Melissa Coturno Steal Look, um coturno com visual roubado.",
  },

  // Novidades
  "free-platform-slide-velvet": {
    id: "free-platform-slide-velvet",
    name: "Melissa Free Platform Slide Velvet",
    price: "R$ 79,90",
    originalPrice: null,
    image: "img/23.webp",
    category: "Novidades",
    description:
      "Melissa Free Platform Slide Velvet, um slide com acabamento aveludado.",
  },

  "free-platform-thong": {
    id: "free-platform-thong",
    name: "Melissa Free Platform Thong",
    price: "R$ 69,90",
    originalPrice: null,
    image: "img/24.webp",
    category: "Novidades",
    description: "Melissa Free Platform Thong, um chinelo com plataforma.",
  },

  "free-low": {
    id: "free-low",
    name: "Melissa Free Low",
    price: "R$ 59,90",
    originalPrice: null,
    image: "img/25.webp",
    category: "Novidades",
    description: "Melissa Free Low, um calçado baixo e confortável.",
  },

  "quantum-thong": {
    id: "quantum-thong",
    name: "Melissa Quantum Thong",
    price: "R$ 89,90",
    originalPrice: null,
    image: "img/26.webp",
    category: "Novidades",
    description: "Melissa Quantum Thong, um chinelo com design quantum.",
  },
};

// Função para obter dados do produto por ID
function getProductById(productId) {
  return PRODUCTS[productId] || null;
}

// Função para obter dados do produto pela URL da página
function getProductByUrl() {
  const currentPage = window.location.pathname;
  const productId = currentPage.replace("/produto-", "").replace(".html", "");
  return getProductById(productId);
}

// Função para obter dados do produto pelos elementos da página
function getProductFromPage() {
  const productId = getProductIdFromPage();
  console.log("ID do produto da URL:", productId);

  // Tentar buscar pelos dados da base
  if (productId && PRODUCTS[productId]) {
    console.log("Produto encontrado na base:", PRODUCTS[productId]);
    return PRODUCTS[productId];
  }

  // Fallback: extrair dados diretamente da página
  console.log("Usando fallback - extraindo da página");
  const pageData = {
    id: productId || "unknown",
    name: document.querySelector(".product-title")?.textContent || "Produto",
    price: document.querySelector(".product-price")?.textContent || "R$ 0,00",
    originalPrice:
      document.querySelector(".original-price")?.textContent || null,
    image: document.getElementById("mainImage")?.src || "img/1.webp",
    category: "Produto",
    description:
      document.querySelector(".product-description p")?.textContent ||
      "Descrição do produto.",
  };

  console.log("Dados extraídos da página:", pageData);
  return pageData;
}

// Função para obter ID do produto da página atual
function getProductIdFromPage() {
  const currentPage = window.location.pathname;
  const productId = currentPage.replace("/produto-", "").replace(".html", "");
  return productId;
}

// Exportar para uso global
window.PRODUCTS = PRODUCTS;
window.getProductById = getProductById;
window.getProductByUrl = getProductByUrl;
window.getProductFromPage = getProductFromPage;
window.getProductIdFromPage = getProductIdFromPage;
