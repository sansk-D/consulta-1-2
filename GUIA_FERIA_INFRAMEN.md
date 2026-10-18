# 📋 GUÍA DE EXPOSICIÓN - FERIA DE SOFTWARE INFRAMEN (SECCIÓN 1-2)
## Proyecto: MediFácil (Plataforma Farmacológica con Estándar Clínico y Accesibilidad)

---

### 🏛️ 1. Identidad Institucional y Propósito

* **Institución:** Instituto Nacional General Francisco Menéndez (INFRAMEN).
* **Especialidad:** Bachillerato Técnico Vocacional en Desarrollo de Software.
* **Sección:** 1-2.
* **Proyecto:** **MediFácil** — Orientación Farmacológica Clínica, Limpia y Accesible.

---

### 🩺 2. El Salto de Calidad: "Diseño Clínico Profesional vs. Aplicaciones Informales"

Cuando el jurado evalúa proyectos de software en el INFRAMEN, un error muy común de los estudiantes es saturar las interfaces con stickers, emoticonos o animaciones infantiles que le restan seriedad a un tema tan delicado como la salud y los medicamentos.

**En MediFácil se implementó una interfaz con estándar médico real (similares a Mayo Clinic, WebMD o Medscape):**

1. **Iconografía Vectorial SVG Limpia:** En lugar de emojis informales, se integraron iconos vectoriales nítidos para cada forma farmacéutica:
   * Cápsulas
   * Comprimidos / Tabletas
   * Jarabes y Suspensiones
   * Inhaladores presurizados
   * Cremas dermatológicas
   * Gotas oftálmicas
2. **Reducción de Fatiga Visual para Adultos Mayores:**
   * Sin colores chillones ni distractores visuales.
   * **Modo "Letra Grande":** Permite aumentar la tipografía a un tamaño cómodo con un solo toque.
   * **Módulo de Síntesis de Voz (Web Speech API):** Lee en voz alta con entonación médica pausada y clara.
3. **Semáforo Clínico de Precaución:**
   * **Rojo:** Contraindicaciones críticas y dosis máximas (evitar toxicidad hepática o hemorragias).
   * **Amarillo:** Efectos adversos habituales y precauciones en hipertensión o gastritis.
   * **Verde:** Prácticas de administración segura (con alimentos, horarios).
4. **Arquitectura Limpia y Desplegable (Cero Agobio):**
   * El comparador, la calculadora de horarios y el catálogo general están plegados de forma no invasiva para no sobrecargar la pantalla del celular.

---

### 📱 3. Guion de Exposición para el Jurado en la Feria (2 Minutos)

> **Consejo de postura:** Muestra el proyecto directamente en un teléfono celular o laptop. Habla con tono seguro, formal y pausado.

#### Inicio (Problema):
> *"Buenos días profesores y miembros del jurado evaluador. Pertenecemos a la sección 1-2 de Desarrollo de Software del INFRAMEN. Hoy queremos presentarles **MediFácil**.*
>
> *Todos sabemos que los prospectos médicos impresos que vienen en las cajas de pastillas son prácticamente ilegibles para un adulto mayor o una persona con dolor: letra minúscula y términos farmacológicos incomprensibles que provocan automedicación peligrosa o confusión de dosis."*

#### Demostración práctica (Solución en vivo):
> 1. *"Diseñamos MediFácil con un **enfoque clínico profesional**, eliminando cualquier elemento informal y priorizando la accesibilidad universal.*
> 2. *Si una persona mayor necesita consultar qué es **'Panadol'** o toca directamente **'Cefalea y Dolor'**, la aplicación le responde en una sola frase concisa: 'Indicado para aliviar dolores leves o moderados de cabeza, piezas dentales y reducir la fiebre'.*
> 3. *Si el paciente tiene dificultades visuales, la interfaz ofrece dos soluciones de accesibilidad reales:*
>    * *Tocamos el botón de **'Letra Grande'** y toda la pantalla escala su tamaño.*
>    * *O activamos el lector clínico asistencial con el botón **'Escuchar Explicación en Voz Alta'** (presionas el botón y dejas que reproduzca el audio).*
> 4. *Incluimos parámetros de seguridad clínica con un semáforo de advertencias, indicando en rojo que nunca debe sobrepasar los 4 gramos al día para proteger la función hepática.*
> 5. *Y si necesitan comparar dos medicamentos (como **Paracetamol vs. Ibuprofeno**) o planificar sus horarios de tomas cada 8 horas, las herramientas están organizadas de forma no invasiva mediante componentes colapsables para no saturar la pantalla del dispositivo móvil."*

#### Conclusión:
> *"Demostramos que el desarrollo de software en nuestra sección 1-2 está enfocado en crear soluciones tecnológicas serias, funcionales, accesibles y con impacto real en las familias salvadoreñas. ¡Muchas gracias!"*

---

### 💻 4. Respuestas a Preguntas Técnicas del Jurado

* **¿Por qué utilizaron SVG en vez de imágenes PNG o emojis?**
  * *"Los vectores SVG no pierden resolución en ninguna pantalla (desde un teléfono modesto hasta un monitor 4K), pesan solo unos cuantos bytes y no requieren cargar archivos externos por internet, garantizando que el sistema opere 100% offline el día de la feria."*

* **¿Cómo garantizan que la información sea accesible en teléfonos móviles?**
  * *"La interfaz se maquetó bajo metodología **Mobile-First**, respetando el estándar internacional de accesibilidad que exige áreas táctiles mínimas de 48 píxeles para ser cómodamente pulsables con el pulgar."*

---

### 🚀 5. Modo de Ejecución Rápida

1. Ubica la carpeta `c:\Users\sansk\Downloads\daniel\`.
2. Haz **doble clic en [index.html](file:///c:/Users/sansk/Downloads/daniel/index.html)**.
3. ¡Listo para exponer con total seriedad y profesionalismo! 🎓
