document.addEventListener('DOMContentLoaded', () => {

    // Inicializar sección de contacto
    initializeContactSection();
});

// JavaScript para la sección de contacto
function initializeContactSection() {
    // Datos de las tecnologías - CORREGIR RUTAS
    const technologies = [
        { name: 'Angular', logo: './assets/angular-logo.png' },
        { name: 'TypeScript', logo: './assets/typescript-logo.png' }, // Ruta corregida
        { name: 'Bootstrap', logo: './assets/bootstrap-logo.png' }, // Ruta corregida
        { name: 'HTML5', logo: './assets/html-logo.png' }, // Ruta corregida
        { name: 'CSS3', logo: './assets/css-logo.png' }, // Ruta corregida
        { name: 'Node.js', logo: './assets/nodejs-logo.png' }, // Ruta corregida
        { name: 'Git', logo: './assets/git-logo.png' }, // Ruta corregida
        { name: 'Docker', logo: './assets/docker-logo.png' } // Ruta corregida
    ];
    
    // Crear la noria de tecnologías
    createTechWheel(technologies);
    
    // Manejar el formulario de contacto
    setupContactForm();
    
    // Función para crear la noria de tecnologías
    function createTechWheel(techs) {
        const wheel = document.getElementById('techWheel');
        
        // VERIFICACIÓN DE SEGURIDAD
        if (!wheel) {
            console.warn('Elemento techWheel no encontrado');
            return;
        }
        
        const total = techs.length;
        const angle = 360 / total;
        
        // Crear elementos de tecnología
        techs.forEach((tech, i) => {
            const techElement = document.createElement('div');
            techElement.className = 'tech';
            
            const techItem = document.createElement('div');
            techItem.className = 'tech-item';
            
            const img = document.createElement('img');
            img.src = tech.logo;
            img.alt = tech.name;
            img.className = 'tech-logo';
            
            techItem.appendChild(img);
            techElement.appendChild(techItem);
            wheel.appendChild(techElement);
            
            // Aplicar transformación
            const transformValue = `translate(-50%, -50%) rotate(${i * angle}deg) translateY(-120px) rotate(${-i * angle}deg)`;
            techElement.style.transform = transformValue;
        });
        
        // Crear el centro de la noria
        const wheelCenter = document.createElement('div');
        wheelCenter.className = 'wheel-center';
        
        const centerDot = document.createElement('div');
        centerDot.className = 'center-dot';
        
        wheelCenter.appendChild(centerDot);
        wheel.appendChild(wheelCenter);
    }
    
    // Configurar el formulario de contacto
    function setupContactForm() {
        const form = document.getElementById('contactForm');
        
        // VERIFICACIÓN DE SEGURIDAD
        if (!form) {
            console.warn('Formulario de contacto no encontrado');
            return;
        }
        
        // Campos del formulario
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');
        
        // Mensajes de error
        const nameError = document.getElementById('nameError');
        const emailError = document.getElementById('emailError');
        const subjectError = document.getElementById('subjectError');
        const messageError = document.getElementById('messageError');
        
        // VERIFICACIÓN DE CAMPOS
        if (!nameInput || !emailInput || !subjectInput || !messageInput) {
            console.warn('Campos del formulario no encontrados');
            return;
        }
        
        // Validación en tiempo real
        nameInput.addEventListener('input', () => validateField(nameInput, nameError, validateName));
        emailInput.addEventListener('input', () => validateField(emailInput, emailError, validateEmail));
        subjectInput.addEventListener('input', () => validateField(subjectInput, subjectError, validateSubject));
        messageInput.addEventListener('input', () => validateField(messageInput, messageError, validateMessage));
        
        // Envío del formulario
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validar todos los campos
            const isNameValid = validateField(nameInput, nameError, validateName);
            const isEmailValid = validateField(emailInput, emailError, validateEmail);
            const isSubjectValid = validateField(subjectInput, subjectError, validateSubject);
            const isMessageValid = validateField(messageInput, messageError, validateMessage);
            
            if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
                // Simular envío
                console.log('Datos del formulario:', {
                    name: nameInput.value,
                    email: emailInput.value,
                    subject: subjectInput.value,
                    message: messageInput.value
                });
                
                alert('¡Mensaje enviado! (Esta es una simulación)');
                form.reset();
                
                // Quitar clases de validación
                removeValidationClasses();
            } else {
                // Marcar todos los campos como tocados para mostrar errores
                validateField(nameInput, nameError, validateName);
                validateField(emailInput, emailError, validateEmail);
                validateField(subjectInput, subjectError, validateSubject);
                validateField(messageInput, messageError, validateMessage);
            }
        });
        
        // Funciones de validación
        function validateName(value) {
            if (!value) return 'El nombre es obligatorio';
            if (value.length < 2) return 'Mínimo 2 caracteres';
            return null;
        }
        
        function validateEmail(value) {
            if (!value) return 'El email es obligatorio';
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) return 'Email inválido';
            return null;
        }
        
        function validateSubject(value) {
            if (!value) return 'El asunto es obligatorio';
            return null;
        }
        
        function validateMessage(value) {
            if (!value) return 'El mensaje es obligatorio';
            if (value.length < 10) return 'Mínimo 10 caracteres';
            return null;
        }
        
        // Función genérica para validar un campo
        function validateField(input, errorElement, validationFn) {
            if (!input || !errorElement) return false;
            
            const value = input.value.trim();
            const error = validationFn(value);
            
            if (error) {
                input.classList.add('is-invalid');
                errorElement.textContent = error;
                errorElement.classList.add('show');
                return false;
            } else {
                input.classList.remove('is-invalid');
                errorElement.classList.remove('show');
                return true;
            }
        }
        
        // Quitar clases de validación al resetear
        function removeValidationClasses() {
            const inputs = [nameInput, emailInput, subjectInput, messageInput];
            const errors = [nameError, emailError, subjectError, messageError];
            
            inputs.forEach(input => {
                if (input) input.classList.remove('is-invalid');
            });
            
            errors.forEach(error => {
                if (error) error.classList.remove('show');
            });
        }
    }
}