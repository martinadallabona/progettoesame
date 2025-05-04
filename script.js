document.addEventListener('DOMContentLoaded', () => {
    // Funzionalità scroll to top
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Gestione dei cookie
    const cookieBanner = document.getElementById('cookieBanner');
    const acceptCookiesBtn = document.getElementById('acceptCookies');
    const rejectCookiesBtn = document.getElementById('rejectCookies');
    const closeCookiesBtn = document.getElementById('closeCookies');

    // Funzione per impostare un cookie
    function setCookie(name, value, days) {
        let expires = '';
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = '; expires=' + date.toUTCString();
        }
        document.cookie = name + '=' + (value || '') + expires + '; path=/';
    }

    // Funzione per ottenere un cookie
    function getCookie(name) {
        const nameEQ = name + '=';
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    // Funzione per mostrare il banner con animazione
    function showCookieBanner() {
        // Aggiungiamo un piccolo ritardo per un effetto migliore
        setTimeout(() => {
            cookieBanner.classList.add('show');
            // Applica l'animazione di entrata
            cookieBanner.style.transition = 'transform 0.5s ease-in-out';
        }, 1000);
    }

    // Funzione per nascondere il banner con animazione
    function hideCookieBanner() {
        cookieBanner.style.transform = 'translateY(150%)';
        setTimeout(() => {
            cookieBanner.classList.remove('show');
        }, 500); // Tempo corrispondente alla durata dell'animazione
    }

    // Controlla se il cookie esiste già
    if (!getCookie('cookieAccepted') && !getCookie('cookieRejected')) {
        showCookieBanner();
    }

    // Gestione del click su "Accetta"
    acceptCookiesBtn.addEventListener('click', () => {
        setCookie('cookieAccepted', 'true', 365); // Cookie valido per un anno
        hideCookieBanner();
        
        // Qui potresti aggiungere codice per attivare script di tracciamento o analytics
        console.log('Cookie accettati');
    });

    // Gestione del click su "Rifiuta"
    rejectCookiesBtn.addEventListener('click', () => {
        setCookie('cookieRejected', 'true', 7); // Cookie di rifiuto valido per una settimana
        hideCookieBanner();
        console.log('Cookie rifiutati');
    });

    // Gestione del click su "X" (chiudi)
    closeCookiesBtn.addEventListener('click', () => {
        setCookie('cookieSeen', 'true', 1); // Cookie temporaneo valido per un giorno
        hideCookieBanner();
        console.log('Banner cookie chiuso');
    });

    // Stile e animazione aggiuntivi per il banner cookie
    function applyDynamicStyles() {
        const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
        
        // Stile responsivo per il banner cookie
        if (viewportWidth <= 768) {
            cookieBanner.style.maxWidth = '95%';
            cookieBanner.style.left = '2.5%';
            cookieBanner.style.right = '2.5%';
        } else {
            cookieBanner.style.maxWidth = '1200px';
            cookieBanner.style.left = '50%';
            cookieBanner.style.right = 'auto';
            cookieBanner.style.transform = cookieBanner.classList.contains('show') ? 
                'translateX(-50%)' : 'translateX(-50%) translateY(150%)';
        }
    }

    // Effetto hover sui pulsanti del cookie banner
    const cookieButtons = document.querySelectorAll('.cookie-btn');
    cookieButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            if (button.classList.contains('accept')) {
                button.style.backgroundColor = '#001a3a';
            } else if (button.classList.contains('reject')) {
                button.style.backgroundColor = '#94d3ff';
            } else if (button.classList.contains('close')) {
                button.style.backgroundColor = '#ddd';
            }
        });
        
        button.addEventListener('mouseleave', () => {
            if (button.classList.contains('accept')) {
                button.style.backgroundColor = '#002D62';
            } else if (button.classList.contains('reject')) {
                button.style.backgroundColor = '#c5e8ff';
            } else if (button.classList.contains('close')) {
                button.style.backgroundColor = '#f0f0f0';
            }
        });
    });

    // Responsive menu per dispositivi mobili
    function checkViewportSize() {
        // Adattamento elementi in base alla dimensione dello schermo
        const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
        
        // Adattamento altezza hero section su mobile
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            if (viewportWidth <= 480) {
                heroSection.style.height = 'calc(100vh - 120px)';
            } else {
                heroSection.style.height = '100vh';
            }
        }
        
        // Applicazione stili dinamici al banner cookie
        applyDynamicStyles();
    }

    // Controlla dimensioni all'avvio
    checkViewportSize();

    // Controlla dimensioni al ridimensionamento della finestra
    window.addEventListener('resize', checkViewportSize);

    // Implementazione menu mobile toggle
    const createMobileMenu = () => {
        const header = document.querySelector('header');
        const mainNav = document.querySelector('.main-nav');
        
        // Crea il pulsante toggle per il menu mobile
        const mobileToggle = document.createElement('button');
        mobileToggle.className = 'mobile-menu-toggle';
        mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
        
        // Aggiungi stili al pulsante toggle
        mobileToggle.style.display = 'none';
        mobileToggle.style.position = 'absolute';
        mobileToggle.style.top = '20px';
        mobileToggle.style.right = '20px';
        mobileToggle.style.background = 'none';
        mobileToggle.style.border = 'none';
        mobileToggle.style.fontSize = '24px';
        mobileToggle.style.color = '#002D62';
        mobileToggle.style.cursor = 'pointer';
        mobileToggle.style.zIndex = '1001';
        
        header.appendChild(mobileToggle);
        
        // Funzione per controllare e applicare stili al menu mobile
        const checkMobileMenu = () => {
            const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
            
            if (viewportWidth <= 768) {
                mobileToggle.style.display = 'block';
                mainNav.style.display = 'none';
                mainNav.style.position = 'absolute';
                mainNav.style.top = '80px';
                mainNav.style.left = '0';
                mainNav.style.width = '100%';
                mainNav.style.backgroundColor = 'white';
                mainNav.style.boxShadow = '0 5px 10px rgba(0,0,0,0.1)';
                mainNav.style.zIndex = '1000';
                
                const navUl = mainNav.querySelector('ul');
                if (navUl) {
                    navUl.style.flexDirection = 'column';
                    navUl.style.padding = '20px';
                }
            } else {
                mobileToggle.style.display = 'none';
                mainNav.style.display = 'flex';
                mainNav.style.position = 'static';
                mainNav.style.boxShadow = 'none';
                
                const navUl = mainNav.querySelector('ul');
                if (navUl) {
                    navUl.style.flexDirection = 'row';
                    navUl.style.padding = '0';
                }
            }
        };
        
        // Controlla menu all'avvio
        checkMobileMenu();
        
        // Controlla menu al ridimensionamento
        window.addEventListener('resize', checkMobileMenu);
        
        // Toggle del menu mobile
        mobileToggle.addEventListener('click', () => {
            if (mainNav.style.display === 'none') {
                mainNav.style.display = 'block';
                mobileToggle.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                mainNav.style.display = 'none';
                mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    };
    
    // Inizializza menu mobile
    createMobileMenu();
});