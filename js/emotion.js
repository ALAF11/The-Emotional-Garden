// Script para páginas de emoção - The Sentimental Garden

document.addEventListener('DOMContentLoaded', function() {
    // Animação de entrada do conteúdo
    animateContent();
    
    // Detectar qual emoção está sendo mostrada
    const currentEmotion = detectCurrentEmotion();
    console.log('Emoção atual:', currentEmotion);
    
    // Adicionar efeitos interativos
    addFlowerHoverEffect();
    addNavigationHoverEffect();
});

// Detecta a emoção atual baseada no URL
function detectCurrentEmotion() {
    const path = window.location.pathname;
    
    if (path.includes('alegria')) return 'alegria';
    if (path.includes('tristeza')) return 'tristeza';
    if (path.includes('medo')) return 'medo';
    if (path.includes('raiva')) return 'raiva';
    if (path.includes('amor')) return 'amor';
    if (path.includes('calma')) return 'calma';
    
    return 'desconhecida';
}

// Animação de entrada do conteúdo
function animateContent() {
    // Elementos para animar
    const titleCard = document.querySelector('.emotion-title-card');
    const flower = document.querySelector('.emotion-flower-container');
    const logo = document.querySelector('.brain-flower-icon');
    const textSections = document.querySelectorAll('.text-section');
    const navButtons = document.querySelectorAll('.nav-button');
    
    // Animar card do título (fade in + slide from left)
    if (titleCard) {
        titleCard.style.opacity = '0';
        titleCard.style.transform = 'translateY(-30px)';
        
        setTimeout(() => {
            titleCard.style.transition = 'all 0.8s ease-out';
            titleCard.style.opacity = '1';
            titleCard.style.transform = 'translateY(0)';
        }, 200);
    }
    
    // Animar flor (fade in + scale up)
    if (flower) {
        flower.style.opacity = '0';
        flower.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            flower.style.transition = 'all 1s ease-out';
            flower.style.opacity = '1';
            flower.style.transform = 'scale(1)';
        }, 400);
    }
    
    // Animar logo (fade in + rotate)
    if (logo) {
        logo.style.opacity = '0';
        logo.style.transform = 'translateX(-50%) scale(0.5) rotate(-180deg)';
        
        setTimeout(() => {
            logo.style.transition = 'all 0.9s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            logo.style.opacity = '1';
            logo.style.transform = 'translateX(-50%) scale(1) rotate(0deg)';
        }, 300);
    }
    
    // Animar seções de texto (fade in sequencial)
    textSections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateX(30px)';
        
        setTimeout(() => {
            section.style.transition = 'all 0.8s ease-out';
            section.style.opacity = '1';
            section.style.transform = 'translateX(0)';
        }, 600 + (index * 200));
    });
    
    // Animar botões de navegação (fade in)
    navButtons.forEach((button, index) => {
        button.style.opacity = '0';
        button.style.transform = 'translateY(-15px)';
        
        setTimeout(() => {
            button.style.transition = 'all 0.6s ease-out';
            button.style.opacity = '1';
            button.style.transform = 'translateY(0)';
        }, 100 + (index * 150));
    });
}

// Efeito hover na flor
function addFlowerHoverEffect() {
    const flowerImg = document.querySelector('.emotion-flower-img');
    
    if (flowerImg) {
        flowerImg.style.transition = 'transform 0.3s ease';
        
        flowerImg.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotate(2deg)';
        });
        
        flowerImg.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
        
        // Efeito de clique - criar partículas
        flowerImg.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX;
            const y = e.clientY;
            
            // Criar 6 partículas ao redor do clique
            for (let i = 0; i < 6; i++) {
                setTimeout(() => {
                    const angle = (Math.PI * 2 * i) / 6;
                    const distance = 50;
                    const offsetX = Math.cos(angle) * distance;
                    const offsetY = Math.sin(angle) * distance;
                    createParticle(x + offsetX, y + offsetY);
                }, i * 50);
            }
            
            // Efeito de bounce no clique
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            }, 100);
        });
    }
}

// Efeito hover nos botões de navegação
function addNavigationHoverEffect() {
    const navButtons = document.querySelectorAll('.nav-button');
    
    navButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.nav-icon');
            if (icon) {
                icon.style.transition = 'transform 0.3s ease';
                icon.style.transform = 'scale(1.15)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.nav-icon');
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
    });
}

// Criar partícula colorida
function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.width = '10px';
    particle.style.height = '10px';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '1000';
    
    // Cores baseadas na emoção
    const emotionColors = {
        'alegria': '#FFD700',
        'tristeza': '#5DADE2',
        'medo': '#9B59B6',
        'raiva': '#E74C3C',
        'amor': '#EC7063',
        'calma': '#52BE80'
    };
    
    const currentEmotion = detectCurrentEmotion();
    const color = emotionColors[currentEmotion] || '#FFD700';
    
    particle.style.backgroundColor = color;
    particle.style.boxShadow = `0 0 15px ${color}`;
    particle.style.transition = 'all 1s ease-out';
    
    document.body.appendChild(particle);
    
    // Animar partícula para cima e desvanecer
    setTimeout(() => {
        particle.style.opacity = '0';
        particle.style.transform = `translateY(-100px) scale(0)`;
    }, 10);
    
    // Remover após animação
    setTimeout(() => {
        particle.remove();
    }, 1000);
}

// Smooth scroll para âncoras
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});