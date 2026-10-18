# MediFácil INFRAMEN 

### Proyecto Técnico Institucional - Sección 1-2 Desarrollo de Software
**Instituto Nacional General Francisco Menéndez (INFRAMEN)**

🌐 **Sitio Web Público en Vivo:** [https://sansk-d.github.io/consulta-1-2/](https://sansk-d.github.io/consulta-1-2/)  
📁 **Repositorio GitHub:** [https://github.com/sansk-D/consulta-1-2](https://github.com/sansk-D/consulta-1-2)

Plataforma de orientación farmacológica accesible con estándar clínico profesional, diseñada para que cualquier persona o adulto mayor pueda consultar indicaciones, pautas de administración y advertencias de medicamentos de forma directa, visual y sin lenguaje agobiante.

---

## Características Principales

1. **Estándar Clínico Profesional:**
   - Interfaz sobria y seria, libre de elementos informales.
   - Iconografía vectorial SVG que identifica formas farmacéuticas reales (comprimidos, cápsulas, jarabes, inhaladores, cremas, gotas oftálmicas y soluciones).

2. **Accesibilidad Universal y Tercera Edad:**
   - **Modo Letra Grande:** Conmutador superior para adaptar la tipografía a personas con fatiga visual o adultos mayores.
   - **Lectura por Voz Médica (Web Speech API):** Síntesis de voz en español a ritmo pausado (0.90x) para accesibilidad auditiva.
   - **Diseño Mobile-First:** Botones táctiles amplios (mínimo 48px) para navegación cómoda con el pulgar.

3. **Parámetros de Seguridad Clínica:**
   - **Contraindicaciones Críticas (Rojo):** Dosis máximas y advertencias de toxicidad hepática o hemorragias.
   - **Precauciones y Efectos Adversos (Amarillo):** Advertencias sobre somnolencia, hipertensión o gastritis.
   - **Recomendación Terapéutica (Verde):** Pautas seguras con alimentos o líquidos.

4. **Herramientas de Apoyo No Invasivas:**
   - **Comparador Farmacológico Directo:** Contraste clínico entre pares de medicamentos habituales (ej. Paracetamol vs. Ibuprofeno).
   - **Planificador de Horarios de Dosis:** Cálculo de intervalos horarios en 24 horas a partir de la primera dosis.
   - **Catálogo General Plegable:** Más de 30 medicamentos organizados sin sobrecargar la pantalla principal.
   - **Directorio de Urgencias El Salvador:** Enlaces directos a SEM 132, Cruz Roja Salvadoreña 2222-5155 y PNC 911.

---

## Tecnologías Utilizadas

* **HTML5:** Semántica accesible y estructuras de contenido clínico.
* **CSS3:** Variables dinámicas, CSS Grid, Flexbox y modo impresión técnica.
* **JavaScript (ES6+):** Programación reactiva, motor de búsqueda multi-criterio y manipulación del DOM.
* **Web Speech API (`window.speechSynthesis`):** Lector asistencial por voz nativo del navegador.
* **100% Offline:** Sin dependencias externas ni conexión a internet obligatoria.

---

## Estructura del Repositorio

```text
├── index.html              # Interfaz principal de la aplicación
├── css/
│   └── styles.css          # Estilos clínicos y adaptabilidad móvil
├── js/
│   ├── database.js         # Base de datos farmacológica estructurada
│   └── app.js              # Lógica de búsqueda, síntesis de voz y renderizado SVG
├── README.md               # Descripción técnica general
└── GUIA_FERIA_INFRAMEN.md  # Guion de exposición de 2 minutos para jurados
```

---

## Ejecución

1. Clone o descargue este repositorio.
2. Abra el archivo `index.html` en cualquier navegador web moderno (Google Chrome, Microsoft Edge, Safari o Mozilla Firefox).
