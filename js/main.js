// Script principal do The Sentimental Garden
document.addEventListener('DOMContentLoaded', function() {
    // Selecionar todos os botões de emoção
    const emotionButtons = document.querySelectorAll('.emotion-button');
    
    // Adicionar som de clique (opcional)
    emotionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Adicionar efeito de feedback visual
            this.style.transform = 'scale(0.95) translateY(-2px)';
            
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Log da emoção selecionada
            const emotion = this.querySelector('.emotion-text').textContent;
            console.log(`Emoção selecionada: ${emotion}`);
        });
        
        // Efeito hover suave
        button.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
    
    // Animação de entrada dos botões
    animateButtons();
});

// Função para animar a entrada dos botões
function animateButtons() {
    const buttons = document.querySelectorAll('.emotion-button');
    
    buttons.forEach((button, index) => {
        button.style.opacity = '0';
        button.style.transform = 'translateX(50px)';
        
        setTimeout(() => {
            button.style.transition = 'all 0.5s ease';
            button.style.opacity = '1';
            button.style.transform = 'translateX(0)';
        }, index * 100);
    });
}

// Animação do título - CORRIGIDO!
const title = document.querySelector('.main-title');
if (title) {
    title.style.opacity = '0';
    title.style.transform = 'translateY(20px)'; // ← REMOVIDO translateX(-50%)
    
    setTimeout(() => {
        title.style.transition = 'all 0.8s ease';
        title.style.opacity = '1';
        title.style.transform = 'translateY(0)'; // ← REMOVIDO translateX(-50%)
    }, 200);
}

// Animação do logo
const logo = document.querySelector('.logo-container');
if (logo) {
    logo.style.opacity = '0';
    logo.style.transform = 'scale(0.8)';
    
    setTimeout(() => {
        logo.style.transition = 'all 0.8s ease';
        logo.style.opacity = '1';
        logo.style.transform = 'scale(1)';
    }, 100);
}

// Função para adicionar efeitos de partículas (opcional)
function createParticles(x, y, color) {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.width = '10px';
    particle.style.height = '10px';
    particle.style.borderRadius = '50%';
    particle.style.backgroundColor = color;
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '1000';
    particle.style.transition = 'all 1s ease';
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
        particle.style.opacity = '0';
        particle.style.transform = 'translateY(-100px) scale(0)';
    }, 10);
    
    setTimeout(() => {
        particle.remove();
    }, 1000);
}

// Adicionar partículas ao clicar nos botões (opcional)
document.querySelectorAll('.emotion-button').forEach(button => {
    button.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        
        // Cores das partículas baseadas na emoção
        const colors = {
            'alegria': '#ffe592',
            'tristeza': '#abd5f8',
            'medo': '#d2b2d7',
            'raiva': '#edb2b1',
            'amor': '#e5abbe',
            'calma': '#a1cca3'
        };
        
        const emotionClass = Array.from(this.classList).find(c => c !== 'emotion-button');
        const color = colors[emotionClass] || '#ffffff';
        
        // Criar múltiplas partículas
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const offsetX = (Math.random() - 0.5) * 50;
                const offsetY = (Math.random() - 0.5) * 50;
                createParticles(x + offsetX, y + offsetY, color);
            }, i * 50);
        }
    });
});