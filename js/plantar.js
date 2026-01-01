document.addEventListener('DOMContentLoaded', function() {
    const plantButton = document.getElementById('plant-seed-button');
    const seedContainer = document.getElementById('seed-container');
    
    // Botão plantar semente
    plantButton.addEventListener('click', function() {
        // Desabilitar botão para evitar cliques múltiplos
        plantButton.disabled = true;
        
        // Esconder botão com animação
        plantButton.classList.add('hidden');
        
        // Tocar som de plantio
        playPlantSound();
        
        // Aguardar 500ms e começar animação da semente
        setTimeout(() => {
            // Adicionar classe de animação de voo
            seedContainer.classList.add('flying');
            
            // Após 2 segundos de animação, aguardar 3 segundos e redirecionar
            setTimeout(() => {
                // Total: 2s de animação + 3s de espera = 5s
                setTimeout(() => {
                    window.location.href = 'jardim.html';
                }, 3000);
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
});