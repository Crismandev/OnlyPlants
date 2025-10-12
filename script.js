document.addEventListener("DOMContentLoaded", function() {

  // --- LÓGICA DEL VIDEO DE BIENVENIDA ---
  const videoOverlay = document.getElementById('video-intro-overlay');
  const introVideo = document.getElementById('introVideo');
  const skipButton = document.getElementById('skip-intro-btn');
  const firstSection = document.getElementById('inicio'); // La primera sección a la que scrollear

  // Función para ocultar el video y mostrar la página
  function enterSite() {
    if (videoOverlay) {
      videoOverlay.classList.add('hidden');
    }
    document.body.classList.remove('no-scroll');
    if (firstSection) {
      firstSection.scrollIntoView({
        behavior: 'smooth'
      });
    }
    if (introVideo) {
      introVideo.pause();
    }
  }

  // Asegurarnos que los elementos existen antes de añadir listeners
  if (videoOverlay && introVideo && skipButton && firstSection) {
    introVideo.play().catch(error => {
      console.log("El autoplay fue bloqueado por el navegador. El usuario debe interactuar.");
      skipButton.style.opacity = '1';
      skipButton.style.animation = 'none';
    });

    introVideo.addEventListener('ended', enterSite);
    skipButton.addEventListener('click', enterSite);
  } else {
    // Si no hay video de intro, simplemente permite el scroll
    document.body.classList.remove('no-scroll');
  }

  // --- EL RESTO DE TUS SCRIPTS ---

  // Script para animación de scroll en las demás secciones
  const fadeInSections = document.querySelectorAll('.fade-in-section');
  if (fadeInSections.length > 0) {
    const sectionObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    fadeInSections.forEach(section => {
      sectionObserver.observe(section);
    });
  }
  
  // Script para scroll suave de la navegación
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetElement = document.querySelector(this.getAttribute('href'));
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // Script del recomendador de IA
  const aiButton = document.getElementById('aiButton');
  const aiModalElement = document.getElementById('aiModal');

  if (aiButton && aiModalElement) {
    const plants = [
      { name: "Sansevieria Zeylanica", image: "https://images.unsplash.com/photo-1579546929662-711aa811986b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", description: "Ideal para principiantes. No necesita luz ni riego frecuente. Perfecta para oficinas o dormitorios.", answers: ["poco_luz", "poco_tiempo", "sin_mascotas", "resistente"] },
      { name: "Monstera Deliciosa", image: "https://images.unsplash.com/photo-1581595219342-31969049507a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", description: "Una obra de arte vegetal. Necesita luz indirecta brillante y un poco de cariño. Ideal para salones modernos.", answers: ["buena_luz", "mucho_tiempo", "sin_mascotas", "decorativa"] },
      { name: "Pothos Aureus", image: "https://images.unsplash.com/photo-1578298958965-91097974333a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", description: "Colgante irresistible, crece rápido y sobrevive hasta en la oscuridad. Perfecta para maceteros colgantes.", answers: ["poco_luz", "poco_tiempo", "sin_mascotas", "colgante"] },
      { name: "Calathea Orbifolia", image: "https://images.unsplash.com/photo-1593116217442-63843514175e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", description: "Patrones únicos como pintura. Requiere humedad y cuidado delicado. Para quienes aman lo exótico.", answers: ["buena_luz", "mucho_tiempo", "sin_mascotas", "decorativa"] },
      { name: "Zamioculcas Zamiifolia (ZZ Plant)", image: "https://images.unsplash.com/photo-1549351263-f788b5802489?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", description: "La superviviente absoluta. No le importa si olvidas regarla por semanas. Ideal para viajeros o distraídos.", answers: ["poco_luz", "poco_tiempo", "sin_mascotas", "resistente"] },
      { name: "Ficus Lyrata", image: "https://images.unsplash.com/photo-1596826224133-3529825687e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", description: "Elegancia tropical. Necesita luz abundante y espacio. Convertirá tu sala en un jardín de lujo.", answers: ["buena_luz", "mucho_tiempo", "sin_mascotas", "decorativa"] }
    ];

    const questions = [
      { q: "¿Cuánta luz natural tiene tu espacio?", options: [ { text: "Poca luz (sin ventana o poca exposición)", value: "poco_luz" }, { text: "Buena luz indirecta (cerca de una ventana)", value: "buena_luz" } ] },
      { q: "¿Cuánto tiempo puedes dedicarle a tus plantas cada semana?", options: [ { text: "Poco tiempo (menos de 1 hora/semana)", value: "poco_tiempo" }, { text: "Mucho tiempo (me encanta cuidarlas)", value: "mucho_tiempo" } ] },
      { q: "¿Tienes mascotas que podrían morder o jugar con las plantas?", options: [ { text: "Sí, tengo mascotas", value: "con_mascotas" }, { text: "No, no tengo mascotas", value: "sin_mascotas" } ] },
      { q: "¿Qué tipo de planta buscas?", options: [ { text: "Decorativa (para impresionar)", value: "decorativa" }, { text: "Colgante (ahorra espacio)", value: "colgante" }, { text: "Resistente (no quiero preocuparme)", value: "resistente" } ] }
    ];

    let currentQuestion = 0;
    let userAnswers = [];
    const aiModal = new bootstrap.Modal(aiModalElement);
    const aiQuestions = document.getElementById('aiQuestions');
    const aiNextBtn = document.getElementById('aiNextBtn');
    const aiResult = document.getElementById('aiResult');
    const resultImage = document.getElementById('resultImage');
    const resultName = document.getElementById('resultName');
    const resultDescription = document.getElementById('resultDescription');

    function loadQuestion(index) {
      if (index >= questions.length) {
        showResult();
        return;
      }
      const question = questions[index];
      aiQuestions.innerHTML = `
        <h6 class="mb-4">${question.q}</h6>
        <div class="d-grid gap-2">
          ${question.options.map(opt => `<button type="button" class="btn btn-outline-primary text-start p-3" data-value="${opt.value}">${opt.text}</button>`).join('')}
        </div>`;
      document.querySelectorAll('#aiQuestions .btn').forEach(btn => {
        btn.addEventListener('click', () => {
          userAnswers.push(btn.getAttribute('data-value'));
          currentQuestion++;
          loadQuestion(currentQuestion);
        });
      });
    }

    function showResult() {
      const matches = plants.filter(plant => plant.answers.some(answer => userAnswers.includes(answer)));
      const recommended = matches.length > 0 ? matches[0] : plants[Math.floor(Math.random() * plants.length)];

      resultImage.src = recommended.image;
      resultImage.alt = `Planta recomendada: ${recommended.name}`;
      resultName.textContent = recommended.name;
      resultDescription.textContent = recommended.description;

      aiQuestions.classList.add('d-none');
      aiResult.classList.remove('d-none');
      aiNextBtn.textContent = '¡Quiero esta planta!';
      aiNextBtn.className = 'btn btn-success';
      aiNextBtn.onclick = () => {
        window.open('https://wa.me/525512345678?text=Hola%21%20Quiero%20la%20planta%20' + encodeURIComponent(recommended.name), '_blank');
      };
    }
    
    function resetAIModal() {
        userAnswers = [];
        currentQuestion = 0;
        aiQuestions.classList.remove('d-none');
        aiResult.classList.add('d-none');
        aiNextBtn.textContent = 'Siguiente';
        aiNextBtn.className = 'btn btn-success';
        aiNextBtn.onclick = null;
        aiNextBtn.style.display = 'block';
    }

    aiButton.addEventListener('click', () => {
      resetAIModal();
      loadQuestion(0);
      aiModal.show();
    });

    aiModalElement.addEventListener('hidden.bs.modal', resetAIModal);
  }
});