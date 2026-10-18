/**
 * MediFácil INFRAMEN - Lógica Farmacéutica Profesional
 * Especialidad: Desarrollo de Software 1-2
 * Instituto Nacional General Francisco Menéndez (INFRAMEN)
 *
 * Enfoque: Interfaz seria, clínica y accesible sin emojis ni elementos informales.
 */

let medicamentoActual = null;
let modoLetraGrande = false;

// Biblioteca de Iconos SVG Vectoriales Clínicos
const ICONOS_SVG = {
  capsula: `
    <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#0284c7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/>
      <path d="m8.5 8.5 7 7"/>
    </svg>
  `,
  tableta: `
    <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#0284c7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="9"/>
      <path d="m5.5 5.5 13 13"/>
    </svg>
  `,
  jarabe: `
    <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#0284c7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M10 2h4"/>
      <path d="M10 5h4"/>
      <path d="M8 8h8v12a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2Z"/>
      <path d="M10 12h4"/>
      <path d="M10 16h4"/>
    </svg>
  `,
  inhalador: `
    <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#0284c7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M7 3h6a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-2v4H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h4V5a2 2 0 0 1-2-2Z"/>
      <circle cx="17" cy="19" r="2"/>
    </svg>
  `,
  crema: `
    <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#0284c7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 14l8-8 6 6-8 8H4v-6z"/>
      <path d="M14 4l4-2 4 4-2 4"/>
    </svg>
  `,
  gotas: `
    <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#0284c7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
    </svg>
  `,
  efervescente: `
    <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#0284c7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="14" r="7"/>
      <circle cx="8" cy="4" r="1.5"/>
      <circle cx="15" cy="5" r="2"/>
      <circle cx="12" cy="2" r="1"/>
    </svg>
  `,
  solucion: `
    <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#0284c7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M6 2h12v3H6z"/>
      <path d="M6 5v14a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V5"/>
      <path d="M6 13h12"/>
    </svg>
  `,
  alertaPeligro: `
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#dc2626" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>
    </svg>
  `,
  alertaAtencion: `
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#d97706" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
      <line x1="12" y1="9" x2="12" y2="13"/>
      <line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  `,
  alertaPositiva: `
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#16a34a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
      <polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
  `,
  audioSpeaker: `
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
    </svg>
  `,
  audioStop: `
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="6" y="6" width="12" height="12" rx="2"/>
    </svg>
  `
};

document.addEventListener("DOMContentLoaded", () => {
  inicializarAccesibilidad();
  inicializarBuscador();
  inicializarSintomas();
  inicializarColapsables();
  inicializarComparador();
  inicializarHorarios();
  cargarListaMedicamentos();
  
  // Mostrar Paracetamol por defecto
  const inicial = MEDICAMENTOS_INICIALES.find(m => m.id === "paracetamol") || MEDICAMENTOS_INICIALES[0];
  if (inicial) {
    mostrarFichaMedicamento(inicial);
  }
});

/**
 * Control de Accesibilidad (Modo Letra Aumentada)
 */
function inicializarAccesibilidad() {
  const btnToggle = document.getElementById("btnToggleFont");
  const guardado = localStorage.getItem("medifacil_font_large");
  
  if (guardado === "true") {
    modoLetraGrande = true;
    document.body.classList.add("font-large");
    btnToggle.textContent = "Tamaño Normal";
  }
  
  btnToggle.addEventListener("click", () => {
    modoLetraGrande = !modoLetraGrande;
    if (modoLetraGrande) {
      document.body.classList.add("font-large");
      btnToggle.textContent = "Tamaño Normal";
      localStorage.setItem("medifacil_font_large", "true");
    } else {
      document.body.classList.remove("font-large");
      btnToggle.textContent = "Letra Grande";
      localStorage.setItem("medifacil_font_large", "false");
    }
  });
}

/**
 * Búsqueda Inteligente en Tiempo Real
 */
function inicializarBuscador() {
  const searchInput = document.getElementById("searchInput");
  const clearBtn = document.getElementById("clearSearchBtn");
  
  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.trim().toLowerCase();
    if (query.length > 0) {
      clearBtn.classList.remove("hidden");
    } else {
      clearBtn.classList.add("hidden");
    }
    buscarMedicamento(query);
  });
  
  clearBtn.addEventListener("click", () => {
    searchInput.value = "";
    clearBtn.classList.add("hidden");
    searchInput.focus();
    const inicial = MEDICAMENTOS_INICIALES.find(m => m.id === "paracetamol") || MEDICAMENTOS_INICIALES[0];
    mostrarFichaMedicamento(inicial);
  });
  
  document.getElementById("btnVoice").addEventListener("click", reproducirAudio);
  document.getElementById("btnCopySummary").addEventListener("click", copiarResumen);
}

/**
 * Filtros de Síntomas / Malestares Clínicos
 */
function inicializarSintomas() {
  document.querySelectorAll(".symptom-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const termino = btn.getAttribute("data-query");
      const searchInput = document.getElementById("searchInput");
      searchInput.value = termino;
      document.getElementById("clearSearchBtn").classList.remove("hidden");
      buscarMedicamento(termino.toLowerCase());
      document.getElementById("mainCard").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

/**
 * Búsqueda en el Catálogo
 */
function buscarMedicamento(query) {
  if (!query) return;
  
  const encontrada = MEDICAMENTOS_INICIALES.find(med => {
    const enGenerico = med.nombreGenerico.toLowerCase().includes(query);
    const enComerciales = med.nombresComerciales.some(nc => nc.toLowerCase().includes(query));
    const enSintomas = med.indicacionesComunes.some(s => s.toLowerCase().includes(query));
    const enCategoria = med.categoria.toLowerCase().includes(query);
    const enResumen = med.resumenFacil.toLowerCase().includes(query);
    
    return enGenerico || enComerciales || enSintomas || enCategoria || enResumen;
  });
  
  if (encontrada) {
    mostrarFichaMedicamento(encontrada);
    document.getElementById("noResultsBox").classList.add("hidden");
    document.getElementById("mainCard").classList.remove("hidden");
  } else {
    document.getElementById("mainCard").classList.add("hidden");
    document.getElementById("noResultsBox").classList.remove("hidden");
    document.getElementById("searchedTermText").textContent = query;
  }
}

/**
 * Renderiza la Ficha Farmacológica Limpia y Profesional
 */
function mostrarFichaMedicamento(med) {
  medicamentoActual = med;
  
  // Icono SVG según la forma farmacéutica
  const iconContainer = document.getElementById("medIcon");
  const forma = med.tipoForma || "tableta";
  iconContainer.innerHTML = ICONOS_SVG[forma] || ICONOS_SVG.tableta;
  
  document.getElementById("medTitle").textContent = med.nombreGenerico;
  document.getElementById("medBadge").textContent = med.categoria;
  document.getElementById("medPurpose").textContent = med.resumenFacil;
  
  // Nombres comerciales
  const brandsBox = document.getElementById("medBrands");
  brandsBox.innerHTML = "";
  if (med.nombresComerciales && med.nombresComerciales.length > 0) {
    med.nombresComerciales.forEach(b => {
      const chip = document.createElement("span");
      chip.className = "brand-chip";
      chip.textContent = b;
      brandsBox.appendChild(chip);
    });
  }
  
  // Modo de uso
  document.getElementById("medHowTo").textContent = med.formaUso;
  
  // Semáforo de advertencias con iconos vectoriales limpios
  document.getElementById("iconRed").innerHTML = ICONOS_SVG.alertaPeligro;
  document.getElementById("iconYellow").innerHTML = ICONOS_SVG.alertaAtencion;
  document.getElementById("iconGreen").innerHTML = ICONOS_SVG.alertaPositiva;
  
  document.getElementById("alertRed").textContent = med.alertaRojo;
  document.getElementById("alertYellow").textContent = med.alertaAmarillo;
  document.getElementById("alertGreen").textContent = med.alertaVerde;
  
  // Interacciones / Precauciones
  const avoidList = document.getElementById("medAvoid");
  avoidList.innerHTML = "";
  if (med.evitarCon && med.evitarCon.length > 0) {
    med.evitarCon.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      avoidList.appendChild(li);
    });
  }
  
  // Detener audio previo si estuviese activo
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    restaurarBotonAudio();
  }
}

/**
 * Reproducción de voz médica accesible
 */
function reproducirAudio() {
  if (!medicamentoActual) return;
  
  if (!('speechSynthesis' in window)) {
    alert("El navegador no dispone del sintetizador de voz nativo.");
    return;
  }
  
  const btnVoice = document.getElementById("btnVoice");
  
  if (window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
    restaurarBotonAudio();
    return;
  }
  
  const textoParaHablar = `${medicamentoActual.nombreGenerico}. ${medicamentoActual.resumenFacil}. Indicación de uso: ${medicamentoActual.formaUso}. Advertencia principal: ${medicamentoActual.alertaRojo}`;
  
  const locucion = new SpeechSynthesisUtterance(textoParaHablar);
  locucion.lang = "es-ES";
  locucion.rate = 0.90;
  locucion.pitch = 1.0;
  
  btnVoice.classList.add("speaking");
  btnVoice.innerHTML = `${ICONOS_SVG.audioStop} <span>Detener Audio</span>`;
  
  locucion.onend = restaurarBotonAudio;
  locucion.onerror = restaurarBotonAudio;
  
  window.speechSynthesis.speak(locucion);
}

function restaurarBotonAudio() {
  const btnVoice = document.getElementById("btnVoice");
  btnVoice.classList.remove("speaking");
  btnVoice.innerHTML = `${ICONOS_SVG.audioSpeaker} <span>Escuchar Explicación en Voz Alta</span>`;
}

/**
 * Copiar ficha resumida
 */
function copiarResumen() {
  if (!medicamentoActual) return;
  
  const texto = `FICHA TÉCNICA RESUMIDA: ${medicamentoActual.nombreGenerico}
- Indicación Principal: ${medicamentoActual.resumenFacil}
- Marcas de Referencia: ${medicamentoActual.nombresComerciales.join(", ")}
- Pauta Posológica: ${medicamentoActual.formaUso}
- Advertencia Crítica: ${medicamentoActual.alertaRojo}
Sistema MediFácil - Instituto Nacional General Francisco Menéndez (INFRAMEN)`;

  navigator.clipboard.writeText(texto).then(() => {
    const btn = document.getElementById("btnCopySummary");
    const originalText = btn.innerHTML;
    btn.innerHTML = "<span>Copiado al portapapeles</span>";
    btn.style.color = "#16a34a";
    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.style.color = "";
    }, 2000);
  });
}

/**
 * Secciones Colapsables
 */
function inicializarColapsables() {
  document.querySelectorAll(".collapsible-trigger").forEach(btn => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-target");
      const content = document.getElementById(targetId);
      const icon = btn.querySelector(".toggle-chevron");
      
      if (content.classList.contains("hidden")) {
        content.classList.remove("hidden");
        if (icon) icon.classList.add("rotate");
      } else {
        content.classList.add("hidden");
        if (icon) icon.classList.remove("rotate");
      }
    });
  });
}

/**
 * Comparador Farmacológico Simplificado
 */
function inicializarComparador() {
  const select1 = document.getElementById("compSelect1");
  const select2 = document.getElementById("compSelect2");
  
  select1.innerHTML = "";
  select2.innerHTML = "";
  
  MEDICAMENTOS_INICIALES.forEach(med => {
    const o1 = document.createElement("option");
    o1.value = med.id;
    o1.textContent = med.nombreGenerico;
    if (med.id === "paracetamol") o1.selected = true;
    select1.appendChild(o1);
    
    const o2 = document.createElement("option");
    o2.value = med.id;
    o2.textContent = med.nombreGenerico;
    if (med.id === "ibuprofeno") o2.selected = true;
    select2.appendChild(o2);
  });
  
  select1.addEventListener("change", () => actualizarComparadorSimple());
  select2.addEventListener("change", () => actualizarComparadorSimple());
  
  const presetsContainer = document.getElementById("quickCompareChips");
  presetsContainer.innerHTML = "";
  COMPARACIONES_RAPIDAS.forEach(p => {
    const chip = document.createElement("button");
    chip.className = "symptom-btn";
    chip.style.minHeight = "36px";
    chip.style.fontSize = "0.84rem";
    chip.textContent = p.titulo;
    chip.addEventListener("click", () => {
      select1.value = p.med1Id;
      select2.value = p.med2Id;
      actualizarComparadorSimple(p.veredicto);
    });
    presetsContainer.appendChild(chip);
  });
  
  actualizarComparadorSimple();
}

function actualizarComparadorSimple(veredictoFijo = null) {
  const id1 = document.getElementById("compSelect1").value;
  const id2 = document.getElementById("compSelect2").value;
  
  const m1 = MEDICAMENTOS_INICIALES.find(m => m.id === id1);
  const m2 = MEDICAMENTOS_INICIALES.find(m => m.id === id2);
  
  if (!m1 || !m2) return;
  
  document.getElementById("compTitle1").textContent = m1.nombreGenerico;
  document.getElementById("compDesc1").textContent = m1.resumenFacil;
  document.getElementById("compTip1").textContent = m1.alertaVerde;
  
  document.getElementById("compTitle2").textContent = m2.nombreGenerico;
  document.getElementById("compDesc2").textContent = m2.resumenFacil;
  document.getElementById("compTip2").textContent = m2.alertaVerde;
  
  const verdictEl = document.getElementById("compVerdict");
  if (veredictoFijo) {
    verdictEl.textContent = veredictoFijo;
  } else {
    verdictEl.textContent = `Dictamen comparativo: '${m1.nombreGenerico}' está clasificado como ${m1.categoria.toLowerCase()}, en tanto que '${m2.nombreGenerico}' actúa como ${m2.categoria.toLowerCase()}. Verifique la necesidad de ingesta con alimentos.`;
  }
}

/**
 * Calculadora de Horarios de Tomas
 */
function inicializarHorarios() {
  document.getElementById("btnCalcHours").addEventListener("click", () => {
    const horaInicio = document.getElementById("timeStart").value;
    const cadaHoras = parseInt(document.getElementById("selectEveryHours").value, 10);
    const container = document.getElementById("timelineOutput");
    
    if (!horaInicio) {
      alert("Seleccione una hora inicial de administración.");
      return;
    }
    
    container.innerHTML = "";
    const [hh, mm] = horaInicio.split(":").map(Number);
    let fecha = new Date();
    fecha.setHours(hh, mm, 0, 0);
    
    const totalTomas = Math.floor(24 / cadaHoras);
    for (let i = 0; i < totalTomas; i++) {
      const tomaTime = new Date(fecha.getTime() + (i * cadaHoras * 60 * 60 * 1000));
      const horaStr = tomaTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
      
      const chip = document.createElement("div");
      chip.className = "time-chip";
      chip.innerHTML = `Toma #${i + 1}: <strong>${horaStr}</strong>`;
      container.appendChild(chip);
    }
  });
}

/**
 * Catálogo Oculto de Medicamentos
 */
function cargarListaMedicamentos() {
  const container = document.getElementById("allMedsList");
  const counter = document.getElementById("allMedsCount");
  
  counter.textContent = `(${MEDICAMENTOS_INICIALES.length} fármacos)`;
  container.innerHTML = "";
  
  MEDICAMENTOS_INICIALES.forEach(med => {
    const item = document.createElement("div");
    item.className = "med-list-item";
    const forma = med.tipoForma || "tableta";
    
    item.innerHTML = `
      <div style="width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
        ${ICONOS_SVG[forma] || ICONOS_SVG.tableta}
      </div>
      <div>
        <strong>${med.nombreGenerico}</strong>
        <div style="font-size: 0.78rem; color: #64748b;">${med.categoria}</div>
      </div>
    `;
    
    item.addEventListener("click", () => {
      mostrarFichaMedicamento(med);
      document.getElementById("searchInput").value = med.nombreGenerico;
      document.getElementById("clearSearchBtn").classList.remove("hidden");
      document.getElementById("mainCard").scrollIntoView({ behavior: "smooth", block: "start" });
    });
    
    container.appendChild(item);
  });
}
