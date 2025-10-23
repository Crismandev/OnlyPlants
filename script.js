/* ========================================================================
   ONLYPLANTS: SCRIPT.JS REFACTORIZADO (TAILWIND + ES6+)
   Versión Final Integrada
========================================================================
*/

document.addEventListener("DOMContentLoaded", () => {

    /**
     * Lógica del Menú Móvil (Hamburguesa)
     */
    const menuButton = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', () => {
            // Alterna la clase 'hidden' de Tailwind para mostrar/ocultar
            mobileMenu.classList.toggle('hidden');
        });

        // Opcional: Cierra el menú al hacer clic en un enlace
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    /**
     * Lógica del Carrusel de Fondo del Hero (Elegante)
     */
    const heroSlidesContainer = document.getElementById('hero-slides');
    if (heroSlidesContainer) {
        const slides = heroSlidesContainer.querySelectorAll('img');
        let currentSlide = 0;

        // Mostrar la primera slide inmediatamente si existe
        if (slides.length > 0) {
            slides[currentSlide].classList.add('opacity-100');
        }

        const showNextSlide = () => {
            if (slides.length === 0) return;

            // Ocultar slide actual (quitando la opacidad)
            slides[currentSlide].classList.remove('opacity-100');

            // Calcular el índice de la siguiente slide (vuelve a 0 al final)
            currentSlide = (currentSlide + 1) % slides.length;

            // Mostrar la siguiente slide
            slides[currentSlide].classList.add('opacity-100');
        };

        // Configura el "autopasar" cada 5 segundos (5000 milisegundos)
        setInterval(showNextSlide, 5000);
    }

    /**
     * Lógica de Animación de "Fade-in" al Scrollear
     * (Rescatado de tu script original, usa IntersectionObserver)
     */
    const fadeInElements = document.querySelectorAll('.fade-in');

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1 // Se activa cuando el 10% del elemento es visible
        });

        fadeInElements.forEach(el => {
            observer.observe(el);
        });
    } else {
        // Fallback para navegadores antiguos: simplemente muestra todo
        fadeInElements.forEach(el => {
            el.classList.add('is-visible');
        });
    }


    /* ========================================================================
       LÓGICA DEL RECOMENDADOR DE IA (RESCATADO Y REFACTORIZADO)
    ========================================================================
    */

    // Arrays de datos (Estos se mantienen de tu script original)
    const plants = [
        { name: "Sansevieria Zeylanica", image: "https://images.unsplash.com/photo-1579546929662-711aa811986b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", description: "Ideal para principiantes. No necesita luz ni riego frecuente. Perfecta para oficinas o dormitorios.", answers: ["poco_luz", "poco_tiempo", "sin_mascotas", "resistente"] },
        { name: "Monstera Deliciosa", image: "https://images.unsplash.com/photo-1581595219342-31969049507a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", description: "Una obra de arte vegetal. Necesita luz indirecta brillante y un poco de cariño. Ideal para salones modernos.", answers: ["buena_luz", "mucho_tiempo", "sin_mascotas", "decorativa"] },
        { name: "Pothos Aureus", image: "https://images.unsplash.com/photo-1578298958965-91097974333a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", description: "Colgante irresistible, crece rápido y sobrevive hasta en la oscuridad. Perfecta para maceteros colgantes.", answers: ["poco_luz", "poco_tiempo", "sin_mascotas", "colgante"] },
        { name: "Calathea Orbifolia", image: "https://images.unsplash.com/photo-1593116217442-63843514175e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", description: "Patrones únicos como pintura. Requiere humedad y cuidado delicado. Para quienes aman lo exótico.", answers: ["buena_luz", "mucho_tiempo", "sin_mascotas", "decorativa"] },
        { name: "Zamioculcas Zamiifolia (ZZ Plant)", image: "https://images.unsplash.com/photo-1549351263-f788b5802489?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", description: "La superviviente absoluta. No le importa si olvidas regarla por semanas. Ideal para viajeros o distraídos.", answers: ["poco_luz", "poco_tiempo", "sin_mascotas", "resistente"] },
        { name: "Ficus Lyrata", image: "https://images.unsplash.com/photo-1596826224133-3529825687e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", description: "Elegancia tropical. Necesita luz abundante y espacio. Convertirá tu sala en un jardín de lujo.", answers: ["buena_luz", "mucho_tiempo", "sin_mascotas", "decorativa"] }
    ];

    const questions = [
        { q: "¿Cuánta luz natural tiene tu espacio?", options: [{ text: "Poca luz (sin ventana o poca exposición)", value: "poco_luz" }, { text: "Buena luz indirecta (cerca de una ventana)", value: "buena_luz" }] },
        { q: "¿Cuánto tiempo puedes dedicarle a tus plantas cada semana?", options: [{ text: "Poco tiempo (menos de 1 hora/semana)", value: "poco_tiempo" }, { text: "Mucho tiempo (me encanta cuidarlas)", value: "mucho_tiempo" }] },
        { q: "¿Tienes mascotas que podrían morder o jugar con las plantas?", options: [{ text: "Sí, tengo mascotas", value: "con_mascotas" }, { text: "No, no tengo mascotas", value: "sin_mascotas" }] },
        { q: "¿Qué tipo de planta buscas?", options: [{ text: "Decorativa (para impresionar)", value: "decorativa" }, { text: "Colgante (ahorra espacio)", value: "colgante" }, { text: "Resistente (no quiero preocuparme)", value: "resistente" }] }
    ];

    let currentQuestion = 0;
    let userAnswers = [];

    // --- Elementos del DOM (Ya no usamos Bootstrap) ---
    const aiButton = document.getElementById('aiButton');
    const aiModal = document.getElementById('aiModal');
    const aiCloseBtn = document.getElementById('aiCloseBtn');
    const aiCloseBtnSecondary = document.getElementById('aiCloseBtnSecondary');
    const aiBackdrop = document.getElementById('aiBackdrop');
    const aiQuestions = document.getElementById('aiQuestions');
    const aiNextBtn = document.getElementById('aiNextBtn');
    const aiResult = document.getElementById('aiResult');
    const resultImage = document.getElementById('resultImage');
    const resultName = document.getElementById('resultName');
    const resultDescription = document.getElementById('resultDescription');

    // --- Funciones para controlar el Modal (Lógica de Tailwind) ---
    function openAiModal() {
        resetAIModal(); // Resetea el estado
        loadQuestion(0); // Carga la primera pregunta
        aiModal.classList.remove('hidden'); // Muestra el modal
        aiModal.classList.add('flex'); // Lo convierte en flex para centrar
    }

    function closeAiModal() {
        aiModal.classList.add('hidden'); // Oculta el modal
        aiModal.classList.remove('flex');
    }

    // --- Lógica del Recomendador (Refactorizada) ---
    function loadQuestion(index) {
        if (index >= questions.length) {
            showResult(); // Si no hay más preguntas, muestra el resultado
            return;
        }
        const question = questions[index];

        // HTML refactorizado con clases de Tailwind
        aiQuestions.innerHTML = `
            <h6 class="text-lg font-semibold text-gray-800 mb-5">${question.q}</h6>
            <div class="space-y-3">
                ${question.options.map(opt => `
                    <button type="button" 
                            class="w-full text-left p-4 border border-gray-300 rounded-lg hover:bg-brand-light focus:outline-none focus:ring-2 focus:ring-brand-green transition-colors duration-200" 
                            data-value="${opt.value}">
                        ${opt.text}
                    </button>
                `).join('')}
            </div>`;

        // Añade listeners a los nuevos botones
        document.querySelectorAll('#aiQuestions button').forEach(btn => {
            btn.addEventListener('click', () => {
                userAnswers.push(btn.getAttribute('data-value'));
                currentQuestion++;
                loadQuestion(currentQuestion);
            });
        });

        // Oculta el botón "Siguiente" mientras se responde
        aiNextBtn.style.display = 'none';
    }

    function showResult() {
        // Lógica de recomendación (se mantiene igual)
        const matches = plants.filter(plant => plant.answers.some(answer => userAnswers.includes(answer)));
        const recommended = matches.length > 0 ? matches[0] : plants[Math.floor(Math.random() * plants.length)];

        // Carga los datos en el modal
        resultImage.src = recommended.image;
        resultImage.alt = `Planta recomendada: ${recommended.name}`;
        resultName.textContent = recommended.name;
        resultDescription.textContent = recommended.description;

        // Muestra el resultado y oculta las preguntas
        aiQuestions.classList.add('hidden');
        aiResult.classList.remove('hidden');

        // Configura el botón final (CTA A WHATSAPP)
        aiNextBtn.textContent = '¡Quiero esta planta!';
        aiNextBtn.style.display = 'block'; // Muestra el botón

        // ¡AQUÍ ESTÁ EL CTA A WHATSAPP!
        // Usamos el número +51 97558214 de tu footer original.
        aiNextBtn.onclick = () => {
            const whatsappMessage = `¡Hola OnlyPlants! El recomendador me sugirió la planta: ${recommended.name}. ¿Podrían darme más información?`;
            window.open('https://wa.me/5197558214?text=' + encodeURIComponent(whatsappMessage), '_blank');
        };
    }

    function resetAIModal() {
        userAnswers = [];
        currentQuestion = 0;

        // Muestra preguntas, oculta resultados
        aiQuestions.classList.remove('hidden');
        aiResult.classList.add('hidden');

        // Resetea el botón "Siguiente"
        aiNextBtn.textContent = 'Siguiente';
        aiNextBtn.onclick = null; // Quita el evento de WhatsApp
        aiNextBtn.style.display = 'none'; // Lo ocultamos hasta que se responda
    }

    // --- Event Listeners (Sin Bootstrap) ---
    if (aiButton && aiModal) {
        // Abrir modal
        aiButton.addEventListener('click', openAiModal);

        // Cerrar modal
        aiCloseBtn.addEventListener('click', closeAiModal);
        aiCloseBtnSecondary.addEventListener('click', closeAiModal);
        aiBackdrop.addEventListener('click', closeAiModal);
    }
});

// CTA Button functionality
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for "Unirse al Club" button
    const joinClubBtn = document.querySelector('a[href="#cta"]');
    if (joinClubBtn) {
        joinClubBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const ctaSection = document.querySelector('#cta');
            if (ctaSection) {
                ctaSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // Form submission for "Suscribirme" button
    const subscriptionForm = document.querySelector('#cta form');
    if (subscriptionForm) {
        subscriptionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = document.querySelector('#email-cta');
            const submitBtn = subscriptionForm.querySelector('button[type="submit"]');
            
            if (emailInput && emailInput.value) {
                // Show loading state
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Suscribiendo...';
                submitBtn.disabled = true;
                
                // Simulate form submission (replace with actual API call)
                setTimeout(() => {
                    alert('¡Gracias por suscribirte! Te enviaremos noticias sobre nuestras plantas.');
                    emailInput.value = '';
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 1500);
            }
        });
    }
});