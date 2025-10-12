// Galería de Plantas - JavaScript Interactivo

// Efectos Sutiles del Banner Hero
class SubtleHeroBannerEffects {
    constructor() {
        this.heroSection = document.querySelector('.gallery-hero');
        this.heroContent = document.querySelector('.hero-content');
        this.particles = [];
        this.mouseX = 0;
        this.mouseY = 0;
        this.init();
    }

    init() {
        this.createMinimalParticles();
        this.setupSubtleMouseEffects();
        this.setupParallaxEffect();
        this.startAnimationLoop();
        this.addSubtleInteractiveEffects();
    }

    createMinimalParticles() {
        const particleContainer = document.createElement('div');
        particleContainer.className = 'minimal-particles';
        particleContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 2;
            opacity: 0.3;
        `;
        this.heroSection.appendChild(particleContainer);

        // Crear solo 3 partículas muy sutiles
        for (let i = 0; i < 3; i++) {
            const particle = document.createElement('div');
            particle.className = 'minimal-particle';
            const size = Math.random() * 3 + 1;
            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 50%;
                opacity: ${Math.random() * 0.2 + 0.05};
                will-change: transform;
            `;
            
            const particleData = {
                element: particle,
                x: Math.random() * window.innerWidth,
                y: Math.random() * this.heroSection.offsetHeight,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                size: size,
                opacity: Math.random() * 0.2 + 0.05
            };
            
            this.particles.push(particleData);
            particleContainer.appendChild(particle);
        }
    }

    setupSubtleMouseEffects() {
        this.heroSection.addEventListener('mousemove', (e) => {
            const rect = this.heroSection.getBoundingClientRect();
            this.mouseX = (e.clientX - rect.left) / rect.width;
            this.mouseY = (e.clientY - rect.top) / rect.height;
            
            // Efecto muy sutil de seguimiento del mouse
            const moveX = (this.mouseX - 0.5) * 5;
            const moveY = (this.mouseY - 0.5) * 5;
            
            this.heroContent.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });

        this.heroSection.addEventListener('mouseleave', () => {
            this.heroContent.style.transform = 'translate(0, 0)';
        });
    }

    setupParallaxEffect() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            
            if (this.heroSection) {
                this.heroSection.style.transform = `translateY(${parallax}px)`;
            }
        });
    }

    animateParticles() {
        this.particles.forEach(particle => {
            // Movimiento muy lento y sutil
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Rebote suave en los bordes
            if (particle.x <= 0 || particle.x >= window.innerWidth) {
                particle.vx *= -0.8;
            }
            if (particle.y <= 0 || particle.y >= this.heroSection.offsetHeight) {
                particle.vy *= -0.8;
            }
            
            // Aplicar transformaciones minimalistas
            particle.element.style.transform = `translate(${particle.x}px, ${particle.y}px)`;
            particle.element.style.opacity = particle.opacity;
        });
        

    }

    startAnimationLoop() {
        const animate = () => {
            this.animateParticles();
            requestAnimationFrame(animate);
        };
        animate();
    }

    addSubtleInteractiveEffects() {
        // Efecto muy sutil al hacer hover
        this.heroSection.addEventListener('mouseenter', () => {
            this.heroSection.style.transition = 'opacity 0.3s ease';
            this.heroSection.style.opacity = '0.98';
        });
        
        this.heroSection.addEventListener('mouseleave', () => {
            this.heroSection.style.opacity = '1';
        });
    }
}

// Inicializar efectos del banner cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new SubtleHeroBannerEffects();
});

// Datos de las plantas para el modal
const plantData = {
    monstera: {
        name: "Monstera Deliciosa",
        description: "La Monstera Deliciosa es una planta tropical conocida por sus hojas grandes y perforadas. Es perfecta para interiores y muy fácil de cuidar, ideal para principiantes.",
        category: "Planta de Interior",
        care: "Fácil",
        light: "Luz indirecta brillante",
        water: "Riego moderado, 1-2 veces por semana",
        price: "$45.000",
        image: "https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Beautiful%20monstera%20deliciosa%20plant%20in%20modern%20white%20pot%2C%20large%20green%20leaves%2C%20indoor%20plant%2C%20natural%20lighting%2C%20minimalist%20style&image_size=square"
    },
    ficus: {
        name: "Ficus Lyrata",
        description: "El Ficus Lyrata, también conocido como higuera de hoja de violín, es una planta elegante con hojas grandes y brillantes que añade un toque sofisticado a cualquier espacio.",
        category: "Planta de Interior",
        care: "Medio",
        light: "Luz brillante indirecta",
        water: "Riego cuando la tierra esté seca",
        price: "$65.000",
        image: "https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Elegant%20fiddle%20leaf%20fig%20tree%20in%20terracotta%20pot%2C%20large%20glossy%20leaves%2C%20indoor%20plant%2C%20bright%20natural%20light%2C%20modern%20home%20decor&image_size=square"
    },
    sansevieria: {
        name: "Sansevieria",
        description: "La Sansevieria, conocida como lengua de suegra, es una planta extremadamente resistente que purifica el aire y requiere muy poco mantenimiento.",
        category: "Planta de Interior",
        care: "Fácil",
        light: "Luz baja a brillante",
        water: "Riego escaso, cada 2-3 semanas",
        price: "$25.000",
        image: "https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Beautiful%20snake%20plant%20sansevieria%20in%20modern%20ceramic%20pot%2C%20tall%20green%20leaves%20with%20yellow%20edges%2C%20indoor%20plant%2C%20minimalist%20decor&image_size=square"
    },
    echeveria: {
        name: "Echeveria",
        description: "La Echeveria es una suculenta hermosa con forma de roseta que viene en varios colores. Es perfecta para jardines de suculentas y muy fácil de propagar.",
        category: "Suculenta",
        care: "Fácil",
        light: "Sol directo o luz brillante",
        water: "Riego escaso, solo cuando esté seca",
        price: "$15.000",
        image: "https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Beautiful%20echeveria%20succulent%20arrangement%20in%20decorative%20pot%2C%20rosette%20shaped%20leaves%2C%20purple%20and%20green%20colors%2C%20desert%20plant%2C%20natural%20lighting&image_size=square"
    },
    jade: {
        name: "Planta de Jade",
        description: "La planta de jade es una suculenta robusta con hojas carnosas que simboliza la prosperidad. Es muy longeva y puede crecer durante décadas con el cuidado adecuado.",
        category: "Suculenta",
        care: "Fácil",
        light: "Luz brillante directa",
        water: "Riego moderado en verano, escaso en invierno",
        price: "$20.000",
        image: "https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Jade%20plant%20crassula%20ovata%20in%20ceramic%20pot%2C%20thick%20green%20leaves%2C%20succulent%20plant%2C%20indoor%20gardening%2C%20natural%20light&image_size=square"
    },
    pothos: {
        name: "Pothos",
        description: "El Pothos es una planta colgante muy popular por su facilidad de cuidado y su capacidad de purificar el aire. Sus vides pueden crecer varios metros de largo.",
        category: "Planta Colgante",
        care: "Fácil",
        light: "Luz indirecta media a brillante",
        water: "Riego cuando la tierra esté seca",
        price: "$30.000",
        image: "https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Beautiful%20pothos%20hanging%20plant%20in%20macrame%20hanger%2C%20trailing%20green%20vines%2C%20heart%20shaped%20leaves%2C%20indoor%20hanging%20garden%2C%20natural%20light&image_size=square"
    },
    hearts: {
        name: "Cadena de Corazones",
        description: "La Cadena de Corazones es una suculenta colgante con hojas en forma de corazón. Es una planta romántica y única que añade un toque especial a cualquier espacio.",
        category: "Planta Colgante",
        care: "Medio",
        light: "Luz brillante indirecta",
        water: "Riego escaso, dejar secar entre riegos",
        price: "$35.000",
        image: "https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=String%20of%20hearts%20trailing%20succulent%20in%20hanging%20pot%2C%20heart%20shaped%20leaves%2C%20cascading%20vines%2C%20romantic%20plant%2C%20indoor%20decor&image_size=square"
    },
    paradise: {
        name: "Ave del Paraíso",
        description: "El Ave del Paraíso es una planta tropical impresionante que puede producir flores espectaculares. Es perfecta como planta focal en espacios amplios.",
        category: "Planta Grande",
        care: "Difícil",
        light: "Luz brillante directa",
        water: "Riego regular, mantener húmeda",
        price: "$120.000",
        image: "https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Large%20bird%20of%20paradise%20plant%20in%20floor%20pot%2C%20tropical%20leaves%2C%20tall%20indoor%20plant%2C%20modern%20living%20room%2C%20natural%20lighting&image_size=square"
    },
    orchid: {
        name: "Orquídea",
        description: "Las orquídeas son plantas elegantes y sofisticadas conocidas por sus flores exóticas. Requieren cuidados específicos pero recompensan con floraciones espectaculares.",
        category: "Planta con Flores",
        care: "Difícil",
        light: "Luz indirecta brillante",
        water: "Riego con agua destilada, evitar encharcamiento",
        price: "$80.000",
        image: "https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Beautiful%20orchid%20plant%20with%20purple%20flowers%20in%20elegant%20pot%2C%20blooming%20orchid%2C%20indoor%20flowering%20plant%2C%20luxury%20home%20decor&image_size=square"
    },
    // NUEVAS PLANTAS AGREGADAS
    "philodendron-brasil": {
        name: "Philodendron Brasil",
        description: "El Philodendron Brasil es una variedad hermosa con hojas en forma de corazón y variegación amarilla. Es una planta trepadora perfecta para principiantes que añade color y vida a cualquier espacio.",
        category: "Planta de Interior",
        care: "Fácil",
        light: "Luz indirecta media a brillante",
        water: "Riego cuando la tierra esté seca al tacto",
        price: "$38.000",
        image: "https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Beautiful%20philodendron%20brasil%20plant%20in%20white%20ceramic%20pot%2C%20heart%20shaped%20leaves%20with%20yellow%20variegation%2C%20trailing%20vines%2C%20indoor%20plant%2C%20natural%20lighting&image_size=square"
    },
    "alocasia-polly": {
        name: "Alocasia Polly",
        description: "La Alocasia Polly es una planta tropical impresionante con hojas en forma de flecha y venas blancas distintivas. Es perfecta para crear un ambiente tropical en interiores.",
        category: "Planta de Interior",
        care: "Medio",
        light: "Luz brillante indirecta",
        water: "Mantener húmeda pero no encharcada",
        price: "$55.000",
        image: "https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Elegant%20alocasia%20polly%20plant%20in%20modern%20pot%2C%20dark%20green%20leaves%20with%20white%20veins%2C%20arrow%20shaped%20foliage%2C%20tropical%20indoor%20plant%2C%20bright%20light&image_size=square"
    },
    "pilea": {
        name: "Pilea Peperomioides",
        description: "Conocida como la planta del dinero chino, la Pilea es adorable con sus hojas redondas como monedas. Es muy fácil de propagar y perfecta para regalar a amigos.",
        category: "Planta de Interior",
        care: "Fácil",
        light: "Luz indirecta brillante",
        water: "Riego moderado, dejar secar entre riegos",
        price: "$28.000",
        image: "https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Cute%20pilea%20peperomioides%20chinese%20money%20plant%20in%20terracotta%20pot%2C%20round%20coin%20shaped%20leaves%2C%20small%20indoor%20plant%2C%20minimalist%20decor&image_size=square"
    },
    "haworthia": {
        name: "Haworthia Zebra",
        description: "La Haworthia Zebra es una suculenta pequeña y encantadora con rayas blancas distintivas. Es perfecta para escritorios y espacios pequeños, requiriendo muy poco mantenimiento.",
        category: "Suculenta",
        care: "Fácil",
        light: "Luz brillante indirecta",
        water: "Riego escaso, solo cuando esté completamente seca",
        price: "$18.000",
        image: "https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Beautiful%20haworthia%20zebra%20succulent%20in%20small%20ceramic%20pot%2C%20striped%20pointed%20leaves%2C%20white%20and%20green%20pattern%2C%20desert%20plant%2C%20natural%20light&image_size=square"
    },
    "sedum": {
        name: "Sedum Rubrotinctum",
        description: "El Sedum Rubrotinctum, conocido como 'jelly beans', es una suculenta adorable con hojas carnosas que se vuelven rojizas con el sol. Es muy fácil de cuidar y propagar.",
        category: "Suculenta",
        care: "Fácil",
        light: "Sol directo o luz muy brillante",
        water: "Riego escaso, especialmente en invierno",
        price: "$22.000",
        image: "https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Colorful%20sedum%20rubrotinctum%20jelly%20bean%20succulent%20in%20decorative%20pot%2C%20red%20and%20green%20bean%20shaped%20leaves%2C%20cute%20succulent%2C%20bright%20sunlight&image_size=square"
    },
    "aloe-vera": {
        name: "Aloe Vera",
        description: "El Aloe Vera es una suculenta medicinal famosa por sus propiedades curativas. Sus hojas carnosas contienen gel que puede usarse para tratar quemaduras y heridas menores.",
        category: "Suculenta",
        care: "Fácil",
        light: "Luz brillante directa",
        water: "Riego profundo pero poco frecuente",
        price: "$25.000",
        image: "https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Beautiful%20aloe%20vera%20plant%20in%20terracotta%20pot%2C%20thick%20green%20spiky%20leaves%2C%20medicinal%20succulent%20plant%2C%20natural%20healing%2C%20bright%20light&image_size=square"
    },
    "spider-plant": {
        name: "Planta Araña",
        description: "La Planta Araña es una de las plantas colgantes más populares y fáciles de cuidar. Produce pequeñas plantas bebé que cuelgan como arañitas, perfectas para propagar.",
        category: "Planta Colgante",
        care: "Fácil",
        light: "Luz indirecta media a brillante",
        water: "Riego regular, mantener ligeramente húmeda",
        price: "$32.000",
        image: "https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Beautiful%20spider%20plant%20chlorophytum%20in%20hanging%20basket%2C%20long%20green%20and%20white%20striped%20leaves%2C%20baby%20plantlets%2C%20cascading%20foliage%2C%20indoor%20hanging%20garden&image_size=square"
    },
    "string-pearls": {
        name: "Collar de Perlas",
        description: "El Collar de Perlas es una suculenta colgante única con hojas esféricas que parecen perlas ensartadas. Es una planta conversacional perfecta para macetas colgantes.",
        category: "Planta Colgante",
        care: "Medio",
        light: "Luz brillante indirecta",
        water: "Riego escaso, dejar secar completamente",
        price: "$40.000",
        image: "https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Elegant%20string%20of%20pearls%20succulent%20in%20hanging%20pot%2C%20cascading%20pearl%20like%20leaves%2C%20unique%20trailing%20succulent%2C%20bohemian%20decor%2C%20natural%20light&image_size=square"
    },
    "rubber-tree": {
        name: "Árbol del Caucho",
        description: "El Árbol del Caucho es una planta grande y elegante con hojas brillantes y coriáceas. Es perfecta como planta focal en salas de estar y oficinas, creciendo hasta convertirse en un árbol interior impresionante.",
        category: "Planta Grande",
        care: "Medio",
        light: "Luz brillante indirecta",
        water: "Riego cuando la tierra esté seca en la superficie",
        price: "$95.000",
        image: "https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Large%20rubber%20tree%20ficus%20elastica%20in%20floor%20pot%2C%20glossy%20dark%20green%20leaves%2C%20tall%20indoor%20tree%2C%20modern%20living%20space%2C%20natural%20lighting&image_size=square"
    },
    "dracaena": {
        name: "Dracaena Marginata",
        description: "La Dracaena Marginata es una planta arquitectónica con hojas largas y delgadas bordeadas de rojo. Es muy resistente y perfecta para principiantes que buscan una planta grande y llamativa.",
        category: "Planta Grande",
        care: "Fácil",
        light: "Luz indirecta media a brillante",
        water: "Riego moderado, tolera sequía",
        price: "$85.000",
        image: "https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Majestic%20dracaena%20marginata%20dragon%20tree%20in%20large%20pot%2C%20spiky%20red%20edged%20leaves%2C%20tall%20indoor%20plant%2C%20architectural%20plant%2C%20modern%20interior&image_size=square"
    },
    "anthurium": {
        name: "Anturio",
        description: "El Anturio es una planta tropical elegante con flores en forma de corazón de color rojo brillante. Sus flores duran meses y añaden un toque de color tropical a cualquier espacio.",
        category: "Planta con Flores",
        care: "Medio",
        light: "Luz brillante indirecta",
        water: "Mantener húmeda, alta humedad",
        price: "$65.000",
        image: "https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Beautiful%20anthurium%20plant%20with%20red%20heart%20shaped%20flowers%2C%20glossy%20green%20leaves%2C%20tropical%20flowering%20plant%2C%20elegant%20pot%2C%20indoor%20garden&image_size=square"
    },
    "african-violet": {
        name: "Violeta Africana",
        description: "La Violeta Africana es una planta compacta y florífera con hojas aterciopeladas y flores delicadas en tonos púrpura. Es perfecta para ventanas y florece durante todo el año con el cuidado adecuado.",
        category: "Planta con Flores",
        care: "Medio",
        light: "Luz brillante indirecta",
        water: "Riego por debajo, evitar mojar las hojas",
        price: "$35.000",
        image: "https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Colorful%20african%20violet%20saintpaulia%20with%20purple%20flowers%2C%20fuzzy%20green%20leaves%2C%20small%20flowering%20houseplant%2C%20decorative%20pot%2C%20bright%20indirect%20light&image_size=square"
    },
    "lavender": {
        name: "Lavanda",
        description: "La Lavanda es una planta aromática mediterránea famosa por su fragancia relajante y sus hermosas flores púrpura. Es perfecta para ventanas soleadas y puede usarse para hacer aceites esenciales caseros.",
        category: "Planta Aromática",
        care: "Medio",
        light: "Sol directo, al menos 6 horas",
        water: "Riego moderado, tolera sequía",
        price: "$42.000",
        image: "https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Fresh%20lavender%20plant%20in%20ceramic%20pot%2C%20purple%20flower%20spikes%2C%20aromatic%20herb%2C%20mediterranean%20plant%2C%20natural%20fragrance%2C%20sunny%20windowsill&image_size=square"
    },
    "peace-lily": {
        name: "Lirio de la Paz",
        description: "El Lirio de la Paz es una planta elegante con hojas verdes brillantes y flores blancas en forma de espata. Es excelente para purificar el aire y tolera condiciones de poca luz.",
        category: "Planta con Flores",
        care: "Fácil",
        light: "Luz indirecta media a baja",
        water: "Mantener húmeda, indica sed con hojas caídas",
        price: "$48.000",
        image: "https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Beautiful%20peace%20lily%20spathiphyllum%20with%20white%20flowers%2C%20dark%20green%20leaves%2C%20elegant%20flowering%20houseplant%2C%20air%20purifying%20plant%2C%20indoor%20garden&image_size=square"
    },
    "rosemary": {
        name: "Romero",
        description: "El Romero es una hierba aromática mediterránea con hojas en forma de aguja y un aroma intenso. Es perfecta para cocinar y como planta ornamental, además de ser muy resistente.",
        category: "Planta Aromática",
        care: "Fácil",
        light: "Sol directo, al menos 6 horas",
        water: "Riego moderado, tolera sequía",
        price: "$28.000",
        image: "https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Fresh%20rosemary%20herb%20plant%20in%20terracotta%20pot%2C%20needle%20like%20green%20leaves%2C%20aromatic%20culinary%20herb%2C%20mediterranean%20plant%2C%20kitchen%20garden&image_size=square"
    },
    "mint": {
        name: "Menta",
        description: "La Menta es una hierba aromática refrescante con hojas dentadas y un aroma inconfundible. Es perfecta para tés, cócteles y como repelente natural de insectos.",
        category: "Planta Aromática",
        care: "Fácil",
        light: "Luz indirecta brillante a sol parcial",
        water: "Riego regular, mantener húmeda",
        price: "$22.000",
        image: "https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Fresh%20mint%20plant%20in%20decorative%20pot%2C%20serrated%20green%20leaves%2C%20aromatic%20herb%2C%20culinary%20plant%2C%20refreshing%20fragrance%2C%20kitchen%20windowsill&image_size=square"
    },
    "basil": {
        name: "Albahaca",
        description: "La Albahaca es una hierba aromática esencial en la cocina italiana con hojas ovaladas y un aroma dulce y picante. Es perfecta para hacer pesto y condimentar platos.",
        category: "Planta Aromática",
        care: "Fácil",
        light: "Sol directo a luz brillante",
        water: "Riego regular, evitar encharcamiento",
        price: "$25.000",
        image: "https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Beautiful%20basil%20plant%20in%20ceramic%20pot%2C%20bright%20green%20oval%20leaves%2C%20aromatic%20culinary%20herb%2C%20italian%20cooking%2C%20fresh%20herbs%2C%20sunny%20kitchen&image_size=square"
    }
};

// Variables globales
let currentFilter = 'all';
let searchTerm = '';

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initializeGallery();
    setupEventListeners();
    animateOnScroll();
});

// Configurar event listeners
function setupEventListeners() {
    // Filtros de categoría
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            setActiveFilter(this);
            filterPlants(category);
        });
    });

    // Búsqueda
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.querySelector('.search-btn');
    
    searchInput.addEventListener('input', function() {
        searchTerm = this.value.toLowerCase();
        filterPlants(currentFilter);
    });
    
    searchBtn.addEventListener('click', function() {
        searchInput.focus();
    });

    // Modal
    const modal = document.getElementById('plantModal');
    const closeBtn = document.querySelector('.close');
    
    // Configurar eventos de modal iniciales
    setupViewDetailsEvents();
    
    closeBtn.addEventListener('click', closeModal);
    
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Botones de agregar al carrito
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            addToCart(this);
        });
    });

    // Event listeners para botones del carrito
    const modalCartButton = document.getElementById('modalAddToCart');
    if (modalCartButton) {
        modalCartButton.addEventListener('click', function() {
            addToCart(this);
        });
    }

    // Navegación suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Inicializar galería
function initializeGallery() {
    // Mostrar todas las plantas inicialmente
    filterPlants('all');
    
    // Agregar animación de entrada escalonada
    const plantCards = document.querySelectorAll('.plant-card');
    plantCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

// Establecer filtro activo
function setActiveFilter(activeButton) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    activeButton.classList.add('active');
}

// Configurar eventos de ver detalles (función separada para reutilizar)
function setupViewDetailsEvents() {
    const viewDetailsButtons = document.querySelectorAll('.view-details');
    viewDetailsButtons.forEach(button => {
        // Remover event listeners existentes para evitar duplicados
        button.removeEventListener('click', handleViewDetails);
        // Agregar nuevo event listener
        button.addEventListener('click', handleViewDetails);
    });
}

// Manejador de eventos para ver detalles
function handleViewDetails(event) {
    const plantId = this.getAttribute('data-plant');
    openModal(plantId);
}

// Filtrar plantas
function filterPlants(category) {
    currentFilter = category;
    const plantCards = document.querySelectorAll('.plant-card');
    
    plantCards.forEach(card => {
        const plantCategory = card.getAttribute('data-category');
        const plantName = card.querySelector('h3').textContent.toLowerCase();
        const plantInfo = card.querySelector('.plant-category').textContent.toLowerCase();
        
        const matchesCategory = category === 'all' || plantCategory === category;
        const matchesSearch = searchTerm === '' || 
                            plantName.includes(searchTerm) || 
                            plantInfo.includes(searchTerm);
        
        if (matchesCategory && matchesSearch) {
            card.classList.remove('hidden');
            card.classList.add('show');
        } else {
            card.classList.add('hidden');
            card.classList.remove('show');
        }
    });
    
    // Reasignar eventos de clic después del filtrado
    setupViewDetailsEvents();
    
    // Reanimar las tarjetas visibles
    setTimeout(() => {
        const visibleCards = document.querySelectorAll('.plant-card.show');
        visibleCards.forEach((card, index) => {
            card.style.animation = 'none';
            card.offsetHeight; // Trigger reflow
            card.style.animation = `fadeInUp 0.6s ease-out ${index * 0.1}s forwards`;
        });
    }, 100);
}

// Abrir modal
function openModal(plantId) {
    const plant = plantData[plantId];
    if (!plant) return;
    
    const modal = document.getElementById('plantModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalCategory = document.getElementById('modalCategory');
    const modalCare = document.getElementById('modalCare');
    const modalLight = document.getElementById('modalLight');
    const modalWater = document.getElementById('modalWater');
    const modalPrice = document.getElementById('modalPrice');
    
    modalImage.style.backgroundImage = `url('${plant.image}')`;
    modalImage.alt = plant.name;
    modalTitle.textContent = plant.name;
    modalDescription.textContent = plant.description;
    modalCategory.textContent = plant.category;
    modalCare.textContent = plant.care;
    modalLight.textContent = plant.light;
    modalWater.textContent = plant.water;
    modalPrice.textContent = plant.price;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Cerrar modal
function closeModal() {
    const modal = document.getElementById('plantModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Agregar al carrito
function addToCart(button) {
    // Validar que el botón existe
    if (!button || !button.style) {
        console.error('Error: Elemento de botón no válido');
        return;
    }
    
    // Efecto visual
    const originalText = button.textContent;
    button.textContent = '¡Agregado!';
    button.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
    
    // Animación de éxito
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 150);
    
    // Restaurar texto después de 2 segundos
    setTimeout(() => {
        button.textContent = originalText;
    }, 2000);
    
    // Aquí se podría agregar lógica real del carrito
    console.log('Producto agregado al carrito');
}

// Animaciones al hacer scroll
function animateOnScroll() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observar elementos que necesitan animación
    const elementsToAnimate = document.querySelectorAll('.plant-card, .filter-btn, .search-bar');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
}

// Efectos de partículas adicionales
function createFloatingParticles() {
    const heroSection = document.querySelector('.gallery-hero');
    if (!heroSection) return;
    
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(255, 255, 255, 0.6);
            border-radius: 50%;
            pointer-events: none;
            animation: float ${6 + Math.random() * 4}s ease-in-out infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 6}s;
        `;
        heroSection.appendChild(particle);
    }
}

// Inicializar partículas flotantes
setTimeout(createFloatingParticles, 1000);

// Efecto de escritura para el título
function typeWriterEffect() {
    const title = document.querySelector('.gallery-hero h1');
    if (!title) return;
    
    const text = title.textContent;
    title.textContent = '';
    title.style.opacity = '1';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            title.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    setTimeout(typeWriter, 1000);
}

// Navegación del menú hamburguesa (si existe)
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
}