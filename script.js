// ============================================
// NAVEGACIÓN Y MENÚ MÓVIL
// ============================================

/**
 * Alterna la visibilidad del menú móvil
 */
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const menuIcon = document.querySelector('.menu-icon');
    const closeIcon = document.querySelector('.close-icon');
    
    if (mobileMenu.classList.contains('active')) {
        // Cerrar menú
        mobileMenu.classList.remove('active');
        menuIcon.style.display = 'block';
        closeIcon.style.display = 'none';
    } else {
        // Abrir menú
        mobileMenu.classList.add('active');
        menuIcon.style.display = 'none';
        closeIcon.style.display = 'block';
    }
}

/**
 * Desplazamiento suave a una sección específica
 * @param {string} sectionId - El ID de la sección a la que desplazarse
 */
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    
    if (element) {
        // Cerrar menú móvil si está abierto
        const mobileMenu = document.getElementById('mobileMenu');
        const menuIcon = document.querySelector('.menu-icon');
        const closeIcon = document.querySelector('.close-icon');
        
        if (mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            menuIcon.style.display = 'block';
            closeIcon.style.display = 'none';
        }
        
        // Desplazamiento suave
        element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// ============================================
// FORMULARIO DE RESERVACIÓN
// ============================================

/**
 * Maneja el envío del formulario de reservación
 * @param {Event} event - El evento de envío del formulario
 */
function handleFormSubmit(event) {
    event.preventDefault();
    
    // Obtener los datos del formulario
    const formData = {
        nombre: document.getElementById('nombre').value,
        entrada: document.getElementById('entrada').value,
        salida: document.getElementById('salida').value,
        tipoHabitacion: document.getElementById('tipoHabitacion').value,
        huespedes: document.getElementById('huespedes').value
    };
    
    // Validar fechas
    const fechaEntrada = parseLocalDate(formData.entrada);
    const fechaSalida = parseLocalDate(formData.salida);
    const fechaHoy = new Date();
    fechaHoy.setHours(0, 0, 0, 0);
    
    if (fechaEntrada < fechaHoy) {
        alert('La fecha de entrada no puede ser anterior a hoy.');
        return;
    }
    
    if (fechaSalida <= fechaEntrada) {
        alert('La fecha de salida debe ser posterior a la fecha de entrada.');
        return;
    }
    
    // Calcular noches
    const noches = Math.ceil((fechaSalida - fechaEntrada) / (1000 * 60 * 60 * 24));
    
    // Obtener el tipo de habitación seleccionado
    const selectElement = document.getElementById('tipoHabitacion');
    const habitacionTexto = selectElement.options[selectElement.selectedIndex].text;
    
    // Mensaje de confirmación
    const mensaje = `¡Gracias por tu reservación, ${formData.nombre}!\n\n` +
                   `Detalles de tu reserva:\n` +
                   `• Habitación: ${habitacionTexto}\n` +
                   `• Entrada: ${formatearFecha(formData.entrada)}\n` +
                   `• Salida: ${formatearFecha(formData.salida)}\n` +
                   `• Noches: ${noches}\n` +
                   `• Huéspedes: ${formData.huespedes}\n\n` +
                   `Nos pondremos en contacto contigo pronto para confirmar tu reservación.`;
    
    alert(mensaje);
    
    // Limpiar el formulario
    document.getElementById('reservationForm').reset();
    
    // Log para desarrollo (puedes eliminarlo en producción)
    console.log('Reservación enviada:', formData);
}

/**
 * Formatea una fecha en formato legible
 * @param {string} fechaStr - Fecha en formato YYYY-MM-DD
 * @returns {string} Fecha formateada
 */
function formatearFecha(fechaStr) {
    const fecha = parseLocalDate(fechaStr);
    const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
    return fecha.toLocaleDateString('es-MX', opciones);
}

/**
 * Convierte una fecha YYYY-MM-DD a un objeto Date en horario local
 * @param {string} fechaStr - Fecha en formato YYYY-MM-DD
 * @returns {Date} Fecha local
 */
function parseLocalDate(fechaStr) {
    const [year, month, day] = fechaStr.split('-').map(Number);
    return new Date(year, month - 1, day);
}

/**
 * Devuelve una fecha local en formato YYYY-MM-DD para inputs date
 * @param {Date} fecha - Fecha a formatear
 * @returns {string} Fecha formateada para input
 */
function formatDateForInput(fecha) {
    const year = fecha.getFullYear();
    const month = String(fecha.getMonth() + 1).padStart(2, '0');
    const day = String(fecha.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// CAMBIA AQUI EL NUMERO DE WHATSAPP SI NECESITAS ACTUALIZARLO DESPUES.
const WHATSAPP_RESERVAS_NUMERO = '524981046381';

// CAMBIA AQUI EL MENSAJE BASE DE WHATSAPP SI QUIERES EDITAR EL TEXTO DESPUES.
const WHATSAPP_RESERVAS_MENSAJE_BASE = 'Hola, quiero confirmar una reserva en Hotel Real con los siguientes datos:';

function handleWhatsAppReservation(event) {
    event.preventDefault();

    const formData = {
        nombre: document.getElementById('nombre').value,
        entrada: document.getElementById('entrada').value,
        salida: document.getElementById('salida').value,
        tipoHabitacion: document.getElementById('tipoHabitacion').value,
        huespedes: document.getElementById('huespedes').value
    };

    const fechaEntrada = parseLocalDate(formData.entrada);
    const fechaSalida = parseLocalDate(formData.salida);
    const fechaHoy = new Date();
    fechaHoy.setHours(0, 0, 0, 0);

    if (fechaEntrada < fechaHoy) {
        alert('La fecha de entrada no puede ser anterior a hoy.');
        return;
    }

    if (fechaSalida <= fechaEntrada) {
        alert('La fecha de salida debe ser posterior a la fecha de entrada.');
        return;
    }

    const noches = Math.ceil((fechaSalida - fechaEntrada) / (1000 * 60 * 60 * 24));
    const selectElement = document.getElementById('tipoHabitacion');
    const habitacionTexto = selectElement.options[selectElement.selectedIndex].text;

    const mensajeWhatsapp = `${WHATSAPP_RESERVAS_MENSAJE_BASE}\n\n` +
        `Nombre: ${formData.nombre}\n` +
        `Habitacion: ${habitacionTexto}\n` +
        `Entrada: ${formatearFecha(formData.entrada)}\n` +
        `Salida: ${formatearFecha(formData.salida)}\n` +
        `Noches: ${noches}\n` +
        `Huespedes: ${formData.huespedes}`;
    const whatsappUrl = `https://wa.me/${WHATSAPP_RESERVAS_NUMERO}?text=${encodeURIComponent(mensajeWhatsapp)}`;

    window.open(whatsappUrl, '_blank');
    document.getElementById('reservationForm').reset();
}

// ============================================
// HEADER SCROLL EFFECT
// ============================================

/**
 * Agrega efecto de sombra al header al hacer scroll
 */
function handleHeaderScroll() {
    const header = document.getElementById('header');
    
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = 'none';
    }
}

// ============================================
// ANIMACIONES AL HACER SCROLL
// ============================================

/**
 * Observa elementos para animarlos cuando entran en el viewport
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar tarjetas de habitaciones
    const roomCards = document.querySelectorAll('.room-card');
    roomCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Observar tarjetas de amenidades
    const amenityCards = document.querySelectorAll('.amenity-card');
    amenityCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
}

// ============================================
// VALIDACIÓN DE FECHAS EN TIEMPO REAL
// ============================================

/**
 * Configura las fechas mínimas en los campos de fecha
 */
function setupDateValidation() {
    const entradaInput = document.getElementById('entrada');
    const salidaInput = document.getElementById('salida');
    
    // Establecer fecha mínima como hoy
    const hoy = formatDateForInput(new Date());
    entradaInput.setAttribute('min', hoy);
    salidaInput.setAttribute('min', hoy);
    
    // Actualizar fecha mínima de salida cuando cambia la entrada
    entradaInput.addEventListener('change', function() {
        const fechaEntrada = parseLocalDate(this.value);
        fechaEntrada.setDate(fechaEntrada.getDate() + 1);
        const fechaMinSalida = formatDateForInput(fechaEntrada);
        salidaInput.setAttribute('min', fechaMinSalida);
        
        // Si la fecha de salida es anterior, resetearla
        if (salidaInput.value && salidaInput.value <= this.value) {
            salidaInput.value = '';
        }
    });
}

// ============================================
// INICIALIZACIÓN
// ============================================

/**
 * Inicializa todos los eventos y configuraciones cuando el DOM está listo
 */
document.addEventListener('DOMContentLoaded', function() {
    // Configurar validación de fechas
    setupDateValidation();
    
    // Inicializar animaciones
    initScrollAnimations();
    
    // Event listener para el scroll del header
    window.addEventListener('scroll', handleHeaderScroll);
    
    // Prevenir comportamiento por defecto de enlaces con #
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
        });
    });
    
    console.log('Hotel Real - Sitio web cargado correctamente');
});

// ============================================
// FUNCIONES ADICIONALES ÚTILES
// ============================================

/**
 * Detecta si el dispositivo es móvil
 * @returns {boolean}
 */
function isMobile() {
    return window.innerWidth < 1024;
}

/**
 * Cierra el menú móvil al cambiar el tamaño de la ventana
 */
window.addEventListener('resize', function() {
    if (!isMobile()) {
        const mobileMenu = document.getElementById('mobileMenu');
        const menuIcon = document.querySelector('.menu-icon');
        const closeIcon = document.querySelector('.close-icon');
        
        if (mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            menuIcon.style.display = 'block';
            closeIcon.style.display = 'none';
        }
    }
});
