# 🌿 OnlyPlants - Galería de Plantas

**OnlyPlants** es una elegante galería web de plantas decorativas que transforma espacios con vida. Una experiencia interactiva completa para descubrir, explorar y adquirir plantas de interior de alta calidad.

## ✨ Características Principales

### 🎬 Experiencia Inmersiva
- **Video de introducción** con animación de entrada
- **Partículas animadas** en el hero section
- **Transiciones suaves** y efectos visuales
- **Diseño responsive** para todos los dispositivos

### 🏠 Página Principal (index.html)
- Hero section con call-to-action
- Planta destacada del mes (Monstera Thai Constellation)
- Carrusel de plantas populares
- Sección de contacto integrada
- Asistente AI para recomendaciones personalizadas

### 🖼️ Galería Interactiva (galeria.html)
- **30+ plantas** con imágenes generadas por IA
- **Sistema de filtros funcional** por categorías:
  - Todas las plantas
  - Plantas de Interior
  - Suculentas
  - Plantas Colgantes
  - Plantas Grandes
  - Plantas con Flores
  - Plantas Aromáticas
- **Búsqueda en tiempo real** por nombre
- **Modal responsive** con detalles completos de cada planta
- **Información detallada**: cuidados, precio, descripción

### 🎨 Diseño y UX
- **Paleta de colores moderna** con tonos verdes naturales
- **Tipografía elegante** (Montserrat + Playfair Display)
- **Iconografía consistente** con Font Awesome
- **Animaciones CSS** y efectos hover
- **Navegación intuitiva** con menú fijo

## 🛠️ Tecnologías Utilizadas

- **HTML5** - Estructura semántica
- **CSS3** - Estilos avanzados y animaciones
- **JavaScript ES6** - Interactividad y funcionalidad
- **Bootstrap 5.3.3** - Framework responsive
- **Font Awesome 6.5.0** - Iconografía
- **Google Fonts** - Tipografía personalizada
- **API de Imágenes IA** - Generación de imágenes de plantas

## 📁 Estructura del Proyecto

```
proyecto02/
├── assets/
│   ├── images/
│   │   ├── oplogo.ico
│   │   ├── oplogo.jpg
│   │   └── oplogo_edit.png
│   └── video/
│       └── op_bannerx8.mp4
├── index.html          # Página principal
├── galeria.html        # Galería de plantas
├── style.css           # Estilos principales
├── galeria.css         # Estilos específicos de galería
├── script.js           # JavaScript principal
├── galeria.js          # JavaScript de galería
├── .gitignore          # Archivos ignorados por Git
├── LICENSE.md          # Licencia del proyecto
└── README.md           # Este archivo
```

## 🚀 Instalación y Uso

### Requisitos Previos
- Navegador web moderno
- Servidor web local (opcional para desarrollo)

### Instalación

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/Crismandev/OnlyPlants
   cd onlyplants
   ```

2. **Abrir con servidor local (recomendado):**
   ```bash
   # Con Python
   python -m http.server 8000
   
   # Con Node.js
   npx serve .
   
   # Con PHP
   php -S localhost:8000
   ```

3. **Acceder a la aplicación:**
   - Página principal: `http://localhost:8000/index.html`
   - Galería: `http://localhost:8000/galeria.html`

### Uso Directo
También puedes abrir directamente `index.html` en tu navegador, aunque algunas funcionalidades pueden requerir un servidor web.

## 🎯 Funcionalidades Detalladas

### Sistema de Filtros
- **Filtrado por categoría** con botones interactivos
- **Búsqueda por texto** en tiempo real
- **Combinación de filtros** (búsqueda + categoría)
- **Animaciones suaves** al mostrar/ocultar plantas

### Modal de Detalles
- **Diseño responsive** adaptable a móviles
- **Información completa** de cada planta
- **Imágenes de alta calidad** generadas por IA
- **Botón de compra** siempre visible
- **Navegación fluida** entre plantas

### Asistente IA
- **Recomendaciones personalizadas** basadas en preferencias
- **Interfaz conversacional** intuitiva
- **Resultados visuales** con imágenes

## 🌱 Catálogo de Plantas

El proyecto incluye más de 30 especies diferentes organizadas en categorías:

- **Interior**: Monstera, Ficus, Sansevieria, ZZ Plant, etc.
- **Suculentas**: Echeveria, Jade, Aloe Vera, Cactus, etc.
- **Colgantes**: Pothos, Cadena de Corazones, Hiedra, etc.
- **Grandes**: Ave del Paraíso, Kentia, Dracaena, etc.
- **Con Flores**: Anthurium, Orquídeas, Begonias, etc.
- **Aromáticas**: Lavanda, Romero, Albahaca, Menta, etc.

## 🎨 Personalización

### Colores
Las variables CSS principales están definidas en `style.css`:
```css
:root {
  --primary-green: #2d5a27;
  --accent-green: #4a7c59;
  --light-green: #a8d5ba;
  --background: #f8f9fa;
}
```

### Añadir Nuevas Plantas
1. Agregar HTML en `galeria.html`
2. Incluir datos en el array de JavaScript
3. Asignar categoría apropiada
4. Generar imagen con la API integrada

## 📱 Responsive Design

- **Mobile First**: Optimizado para dispositivos móviles
- **Breakpoints**: 576px, 768px, 992px, 1200px
- **Navegación adaptable**: Menú hamburguesa en móviles
- **Grids flexibles**: Adaptación automática de columnas
- **Imágenes responsive**: Carga optimizada según dispositivo

## 🔧 Desarrollo

### Scripts Disponibles
- Servidor de desarrollo con Python: `python -m http.server 8000`
- No requiere build process (vanilla JavaScript)

### Contribuir
1. Fork del proyecto
2. Crear rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -am 'Añadir nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE.md` para más detalles.

## 👨‍💻 Autor

**@Crisman.dev**
- Email: contacto@onlyplants.com
- Teléfono: +51 97 558 214
- Ubicación: TRX, Perú

## 🙏 Agradecimientos

- **Bootstrap** por el framework CSS
- **Font Awesome** por los iconos
- **Google Fonts** por las tipografías
- **Trae AI** por la generación de imágenes y codigo

---

⭐ **¡Si te gusta este proyecto, no olvides darle una estrella!** ⭐

🌿 *Transformamos espacios con vida* 🌿