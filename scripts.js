// Main Application Controller
class GForceWebsite {
    constructor() {
        this.init();
    }

    init() {
        this.setupMobileNavigation();
        this.setupModalControllers();
        this.setupSmoothScrolling();
        this.setupEventListeners();
    }

    setupMobileNavigation() {
        const hamburger = document.getElementById('hamburger');
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileProjectsToggle = document.getElementById('mobile-projects-toggle');
        const mobileProjects = document.getElementById('mobile-projects');
        const mobileResourcesToggle = document.getElementById('mobile-resources-toggle');
        const mobileResources = document.getElementById('mobile-resources');
        
        hamburger.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            hamburger.innerHTML = mobileMenu.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
        
        mobileProjectsToggle.addEventListener('click', (e) => {
            e.preventDefault();
            mobileProjects.classList.toggle('active');
        });
        
        mobileResourcesToggle.addEventListener('click', (e) => {
            e.preventDefault();
            mobileResources.classList.toggle('active');
        });
    }

    setupModalControllers() {
        // Initialize modal controllers
        this.modalController = new ModalController();
        this.gameController = new GameController();
        this.calculatorController = new CalculatorController();
    }

    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                if (e.target.classList.contains('mobile-dropdown') || 
                    e.target.id === 'mobile-projects-toggle' || 
                    e.target.id === 'mobile-resources-toggle') {
                    return;
                }
                
                e.preventDefault();
                
                const targetId = e.target.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const mobileMenu = document.getElementById('mobile-menu');
                    const hamburger = document.getElementById('hamburger');
                    
                    if (mobileMenu.classList.contains('active')) {
                        mobileMenu.classList.remove('active');
                        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
                    }
                    
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    setupEventListeners() {
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.mobile-menu a').forEach(link => {
            link.addEventListener('click', (e) => {
                if (e.target.id === 'mobile-projects-toggle' || e.target.id === 'mobile-resources-toggle') {
                    return;
                }
                
                const mobileMenu = document.getElementById('mobile-menu');
                const hamburger = document.getElementById('hamburger');
                
                mobileMenu.classList.remove('active');
                hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });

        // Escape key to close modals
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.modalController.closeAllModals();
            }
        });
    }
}

// Modal Controller
class ModalController {
    constructor() {
        this.gameModal = document.getElementById('game-modal');
        this.calculatorModal = document.getElementById('calculator-modal');
        this.closeGame = document.getElementById('close-game');
        this.closeCalculator = document.getElementById('close-calculator');
        this.gameFrame = document.getElementById('game-frame');
        this.calculatorFrame = document.getElementById('calculator-frame');
        
        this.setupModalEvents();
    }

    setupModalEvents() {
        // Open game modal
        document.querySelectorAll('.open-game, #ftc-game-link, .mobile-game-link').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.openGameModal();
            });
        });
        
        // Open calculator modal
        document.querySelectorAll('.open-calculator, #score-calculator-link, .mobile-calculator-link').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.openCalculatorModal();
            });
        });
        
        // Close modal buttons
        this.closeGame.addEventListener('click', () => this.closeGameModal());
        this.closeCalculator.addEventListener('click', () => this.closeCalculatorModal());
        
        // Close modals when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === this.gameModal) this.closeGameModal();
            if (e.target === this.calculatorModal) this.closeCalculatorModal();
        });
    }

    openGameModal() {
        this.gameModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Load game HTML
        const blob = new Blob([gameHTML], { type: 'text/html' });
        this.gameFrame.src = URL.createObjectURL(blob);
    }

    openCalculatorModal() {
        this.calculatorModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Load the official FTC scoring calculator
        this.calculatorFrame.src = 'https://ftc-scoring.firstinspires.org/scoreCalculator';
    }

    closeGameModal() {
        this.gameModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        this.gameFrame.src = 'about:blank';
    }

    closeCalculatorModal() {
        this.calculatorModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        this.calculatorFrame.src = 'about:blank';
    }

    closeAllModals() {
        this.closeGameModal();
        this.closeCalculatorModal();
    }
}

// Game Controller
class GameController {
    restartGame() {
        const gameFrame = document.getElementById('game-frame');
        if (gameFrame.contentWindow) {
            try {
                gameFrame.contentWindow.restartGame();
            } catch(e) {
                console.log("Could not restart game:", e);
            }
        }
    }
    
    fullscreenGame() {
        const elem = document.getElementById('game-frame');
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }
    }
    
    changeAllianceInGame() {
        const gameFrame = document.getElementById('game-frame');
        if (gameFrame.contentWindow) {
            try {
                gameFrame.contentWindow.changeAlliance();
            } catch(e) {
                console.log("Could not change alliance:", e);
            }
        }
    }
}

// Calculator Controller
class CalculatorController {
    refreshCalculator() {
        const calculatorFrame = document.getElementById('calculator-frame');
        calculatorFrame.src = calculatorFrame.src;
    }
    
    openOfficialSite() {
        window.open('https://ftc-scoring.firstinspires.org/scoreCalculator', '_blank');
    }
}

// Listen for messages from the game iframe
window.addEventListener('message', function(event) {
    if (event.data === 'closeGameModal') {
        const modalController = new ModalController();
        modalController.closeGameModal();
    }
});

// Initialize the website when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const gForceWebsite = new GForceWebsite();
    window.gForceWebsite = gForceWebsite; // Make available globally
});
