// Script para página de plantar - The Sentimental Garden
// Sistema de escolha entre Jardim Coletivo e Holograma Individual

document.addEventListener('DOMContentLoaded', function() {
    const btnMesa = document.getElementById('btn-mesa');
    const btnIpad = document.getElementById('btn-ipad');
    const seedContainer = document.getElementById('seed-container');
    const choiceButtons = document.querySelector('.choice-buttons');
    const choiceIntro = document.querySelector('.choice-intro');
    
    // Botão Jardim Coletivo (Mesa Interativa)
    btnMesa.addEventListener('click', function() {
        // Desabilitar botões para evitar cliques múltiplos
        btnMesa.disabled = true;
        btnIpad.disabled = true;
        
        // Feedback visual no botão clicado
        this.style.transform = 'scale(0.95)';
        this.style.background = 'linear-gradient(135deg, #82C91E 0%, #4CAF50 100%)';
        this.style.color = 'white';
        
        // Tocar som de plantio
        playPlantSound();
        
        // Esconder elementos com animação
        setTimeout(() => {
            choiceButtons.classList.add('hidden');
            choiceIntro.classList.add('hidden');
        }, 300);
        
        // Aguardar e começar animação da semente
        setTimeout(() => {
            // Adicionar classe de animação de voo
            seedContainer.classList.add('flying');
            
            // Após animação, redirecionar para jardim coletivo
            setTimeout(() => {
                window.location.href = 'jardim.html';
            }, 2000);
        }, 500);
    });
    
    // Botão Holograma Individual (iPad)
    btnIpad.addEventListener('click', function() {
        // Desabilitar botões para evitar cliques múltiplos
        btnMesa.disabled = true;
        btnIpad.disabled = true;
        
        // Feedback visual no botão clicado
        this.style.transform = 'scale(0.95)';
        this.style.background = 'linear-gradient(135deg, #82C91E 0%, #4CAF50 100%)';
        this.style.color = 'white';
        
        // Tocar som de plantio
        playPlantSound();
        
        // Esconder elementos com animação
        setTimeout(() => {
            choiceButtons.classList.add('hidden');
            choiceIntro.classList.add('hidden');
        }, 300);
        
        // Aguardar e começar animação da semente
        setTimeout(() => {
            // Adicionar classe de animação de voo
            seedContainer.classList.add('flying');
            
            // Após animação, redirecionar para holograma individual
            setTimeout(() => {
                window.location.href = 'holograma.html';
            }, 2000);
        }, 500);
    });
    
    // Tocar som de plantio (Web Audio API)
    function playPlantSound() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // Som de plantio - sequência ascendente
            const frequencies = [
                261.63, // C4
                329.63, // E4
                392.00, // G4
                523.25  // C5
            ];
            
            const duration = 0.15;
            
            frequencies.forEach((freq, index) => {
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.frequency.value = freq;
                oscillator.type = 'sine';
                
                const startTime = audioContext.currentTime + index * 0.15;
                
                gainNode.gain.setValueAtTime(0.15, startTime);
                gainNode.gain.exponentialRampToValueAtTime(
                    0.01,
                    startTime + duration
                );
                
                oscillator.start(startTime);
                oscillator.stop(startTime + duration);
            });
        } catch (error) {
            console.log('Áudio não disponível');
        }
    }
    
    // Animação de entrada dos elementos
    function animateEntrance() {
        // Elementos já têm animação CSS, apenas garantir visibilidade
        setTimeout(() => {
            if (seedContainer) seedContainer.style.opacity = '1';
        }, 100);
        
        setTimeout(() => {
            if (choiceIntro) choiceIntro.style.opacity = '1';
        }, 300);
        
        setTimeout(() => {
            if (choiceButtons) choiceButtons.style.opacity = '1';
        }, 500);
    }
    
    animateEntrance();
});