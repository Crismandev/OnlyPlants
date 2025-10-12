document.addEventListener('DOMContentLoaded', () => {
  // --- VARIABLES GLOBALES Y ESTADO ---
  let allProducts = [];
  let cart = JSON.parse(localStorage.getItem('onlyPlantsCart')) || [];
  const WHATSAPP_NUMBER = '51904032964';

  // --- SELECTORES DEL DOM ---
  const plantsGrid = document.getElementById('plantsGrid');
  const searchInput = document.getElementById('searchInput');
  const filterButtons = document.querySelectorAll('.filter-buttons .btn');
  const plantModalElement = document.getElementById('plantModal');
  const plantModal = new bootstrap.Modal(plantModalElement);
  const cartCountBadge = document.getElementById('cart-count');
  const cartBody = document.getElementById('cartBody');
  const cartTotalElement = document.getElementById('cartTotal');
  const checkoutButton = document.getElementById('checkoutButton');
  const aiModalElement = document.getElementById('aiModal');
  const aiButton = document.getElementById('aiButton');
  
  // --- FUNCIÓN PRINCIPAL DE INICIO ---
  async function initializeStore() {
    try {
      const response = await fetch('datos.json');
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      allProducts = await response.json();
      renderProducts(allProducts);
      setupEventListeners();
      setupAIRecommender(); // Activar el asesor IA
      updateCartUI();
    } catch (error)
    {
      console.error("No se pudieron cargar los productos:", error);
      if (plantsGrid) plantsGrid.innerHTML = `<p class="text-center text-danger col-12">Error al cargar productos.</p>`;
    }
  }

  // --- RENDERIZADO DE PRODUCTOS ---
  function renderProducts(productsToRender) {
    if (!plantsGrid) return;
    plantsGrid.innerHTML = '';
    if (productsToRender.length === 0) {
      plantsGrid.innerHTML = `<p class="text-center col-12">No se encontraron plantas.</p>`;
      return;
    }
    const fragment = document.createDocumentFragment();
    productsToRender.forEach(product => {
      const col = document.createElement('div');
      col.className = 'col';

      const plantCard = document.createElement('div');
      plantCard.className = 'plant-card h-100';
      plantCard.innerHTML = `
        <div class="plant-image" data-id="${product.id}"><img src="${product.image}" alt="${product.name}" loading="lazy"></div>
        <div class="plant-info">
          <div>
            <h3>${product.name}</h3>
            <p class="text-muted text-uppercase small">${product.category}</p>
            <p class="plant-price">$${product.price.toLocaleString('es-CO')}</p>
          </div>
          <button class="add-to-cart-btn mt-3" data-id="${product.id}">
            <i class="fas fa-cart-plus me-2"></i>Agregar
          </button>
        </div>`;
      col.appendChild(plantCard);
      fragment.appendChild(col);
    });
    plantsGrid.appendChild(fragment);
    setupAnimations();
  }

  // --- FILTRADO Y BÚSQUEDA ---
  function filterAndRender() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const activeFilter = document.querySelector('.filter-buttons .btn.active')?.dataset.category || 'all';

    const filteredProducts = allProducts.filter(product => {
      const matchesCategory = activeFilter === 'all' || product.category === activeFilter;
      const matchesSearch = product.name.toLowerCase().includes(searchTerm);
      return matchesCategory && matchesSearch;
    });

    renderProducts(filteredProducts);
  }

  // --- LÓGICA DEL CARRITO DE COMPRAS ---
  function addToCart(productId) {
    const productInCart = cart.find(item => item.id === productId);
    if (productInCart) {
      productInCart.quantity++;
    } else {
      cart.push({ id: productId, quantity: 1 });
    }
    updateCartUI();
  }

  function updateQuantity(productId, newQuantity) {
    const productInCart = cart.find(item => item.id === productId);
    if (productInCart) {
      if (newQuantity > 0) {
        productInCart.quantity = newQuantity;
      } else {
        cart = cart.filter(item => item.id !== productId);
      }
      updateCartUI();
    }
  }

  function updateCartUI() {
    renderCartItems();
    updateCartBadge();
    updateCartTotal();
    localStorage.setItem('onlyPlantsCart', JSON.stringify(cart));
  }
  
  function updateCartBadge() {
      const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
      cartCountBadge.textContent = totalItems;
      cartCountBadge.style.display = totalItems > 0 ? 'block' : 'none';
  }

  function updateCartTotal() {
      const total = cart.reduce((sum, item) => {
          const product = allProducts.find(p => p.id === item.id);
          return sum + (product.price * item.quantity);
      }, 0);
      cartTotalElement.textContent = `$${total.toLocaleString('es-CO')}`;
  }

  function renderCartItems() {
    if (cart.length === 0) {
        cartBody.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-leaf"></i>
                <p class="mt-3">Tu carrito está vacío.</p>
                <small class="text-muted">Añade algunas plantas para verlas aquí.</small>
            </div>
        `;
        return;
    }

    cartBody.innerHTML = cart.map(item => {
        const product = allProducts.find(p => p.id === item.id);
        return `
            <div class="cart-item">
                <img src="${product.image}" alt="${product.name}" class="cart-item-img">
                <div class="cart-item-details">
                    <h6>${product.name}</h6>
                    <p class="text-muted mb-1">$${product.price.toLocaleString('es-CO')}</p>
                    <div class="quantity-controls">
                        <button class="btn btn-sm" onclick="updateQuantity('${item.id}', ${item.quantity - 1})">-</button>
                        <span class="mx-2">${item.quantity}</span>
                        <button class="btn btn-sm" onclick="updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
                    </div>
                </div>
                <button class="btn btn-danger btn-sm" onclick="updateQuantity('${item.id}', 0)"><i class="fas fa-trash"></i></button>
            </div>
        `;
    }).join('');
  }

  window.updateQuantity = updateQuantity;

  // --- LÓGICA DE MODAL ---
  function openModal(plantId) {
    const plant = allProducts.find(p => p.id === plantId);
    if (!plant) return;

    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
      <div class="modal-header">
        <h5 class="modal-title">${plant.name}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-md-6 mb-3 mb-md-0">
            <img src="${plant.image}" alt="${plant.name}" class="img-fluid rounded">
          </div>
          <div class="col-md-6">
            <p class="h4 text-success mb-3">$${plant.price.toLocaleString('es-CO')}</p>
            <p class="mb-4">${plant.description}</p>
            <div class="care-info">
              <h6 class="fw-bold">Cuidados:</h6>
              <ul class="list-unstyled">
                <li><i class="fas fa-sun text-warning me-2"></i><strong>Luz:</strong> ${plant.details.light}</li>
                <li><i class="fas fa-tint text-primary me-2"></i><strong>Riego:</strong> ${plant.details.water}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
        <button type="button" class="btn btn-success add-to-cart-btn-modal" data-id="${plant.id}"><i class="fas fa-shopping-cart me-2"></i>Agregar al Carrito</button>
      </div>`;
    
    plantModal.show();
  }
  
    // --- LÓGICA DEL ASESOR IA ---
    function setupAIRecommender() {
        if (!aiButton || !aiModalElement) return;

        const questions = [
          { q: "¿Cuánta luz natural tiene tu espacio?", options: [{ text: "Poca luz", value: "poca-luz" }, { text: "Buena luz indirecta", value: "principiantes" }] },
          { q: "¿Cuánto tiempo puedes dedicarle?", options: [{ text: "Poco tiempo (soy principiante)", value: "principiantes" }, { text: "Me encanta cuidarlas", value: "grandes" }] },
          { q: "¿Qué estilo buscas?", options: [{ text: "Algo grande y dramático", value: "grandes" }, { text: "Que tenga flores", value: "flores" }] }
        ];
        let userAnswers = [];
        let currentQuestionIndex = 0;

        const aiQuestionsContainer = document.getElementById('aiQuestions');
        const aiResultContainer = document.getElementById('aiResult');

        function showAiResult() {
            aiQuestionsContainer.classList.add('d-none');
            aiResultContainer.classList.remove('d-none');
            
            const recommended = allProducts.find(plant => plant.tags?.some(tag => userAnswers.includes(tag))) || allProducts.find(p => p.tags.includes("principiantes"));
            
            if (recommended) {
                document.getElementById('resultImage').src = recommended.image;
                document.getElementById('resultName').textContent = recommended.name;
                document.getElementById('resultDescription').textContent = recommended.description;
            }
        }

        function loadAiQuestion() {
          if (currentQuestionIndex >= questions.length) {
            showAiResult();
            return;
          }
          const question = questions[currentQuestionIndex];
          const questionHTML = `
            <h6 class="mb-4 text-center">${question.q}</h6>
            <div class="d-grid gap-2">
              ${question.options.map(opt => `<button class="btn btn-outline-success ai-answer-btn" data-value="${opt.value}">${opt.text}</button>`).join('')}
            </div>`;
          aiQuestionsContainer.innerHTML = questionHTML;
        }
        
        aiModalElement.addEventListener('show.bs.modal', () => {
          userAnswers = [];
          currentQuestionIndex = 0;
          aiResultContainer.classList.add('d-none');
          aiQuestionsContainer.classList.remove('d-none');
          loadAiQuestion();
        });

        aiQuestionsContainer.addEventListener('click', (e) => {
          if (e.target.classList.contains('ai-answer-btn')) {
            userAnswers.push(e.target.dataset.value);
            currentQuestionIndex++;
            loadAiQuestion();
          }
        });
      }


  // --- ANIMACIONES ---
  function setupAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.plant-card').forEach(card => {
        observer.observe(card);
    });
  }

  // --- CONFIGURACIÓN DE EVENT LISTENERS ---
  function setupEventListeners() {
    filterButtons.forEach(button => button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      filterAndRender();
    }));

    if (searchInput) searchInput.addEventListener('input', filterAndRender);

    plantsGrid.addEventListener('click', (e) => {
      if (e.target.closest('.add-to-cart-btn')) {
        const button = e.target.closest('.add-to-cart-btn');
        addToCart(button.dataset.id);
      } else if (e.target.closest('.plant-image')) {
        const imageContainer = e.target.closest('.plant-image');
        openModal(imageContainer.dataset.id);
      }
    });

    document.getElementById('plantModal').addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart-btn-modal')) {
            addToCart(e.target.dataset.id);
            plantModal.hide();
        }
    });
    
    checkoutButton.addEventListener('click', () => {
        if (cart.length === 0) {
            alert("Tu carrito está vacío.");
            return;
        }
        let message = '¡Hola! Quisiera hacer un pedido de los siguientes productos:\n\n';
        let total = 0;
        cart.forEach(item => {
            const product = allProducts.find(p => p.id === item.id);
            message += `- ${item.quantity}x ${product.name}\n`;
            total += product.price * item.quantity;
        });
        message += `\n*Total: $${total.toLocaleString('es-CO')}*`;

        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    });
  }

  // --- INICIAR LA APLICACIÓN ---
  initializeStore();
});

