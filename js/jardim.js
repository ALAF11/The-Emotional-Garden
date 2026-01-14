document.addEventListener('DOMContentLoaded', function() {
    const flowersGarden = document.getElementById('flowers-garden');
    
    // Flores emocionais pré-definidas (5 flores ao redor)
    const emotionalFlowers = [
        { image: 'assets/img/alegria.png', emotion: 'Alegria' },
        { image: 'assets/img/medo.png', emotion: 'Medo' },
        { image: 'assets/img/raiva.png', emotion: 'Raiva' },
        { image: 'assets/img/tristeza.png', emotion: 'Tristeza' },
        { image: 'assets/img/amor.png', emotion: 'Amor' }
    ];
    
    // Adicionar flores decorativas ao redor
    addEmotionalFlowers();
    
    function addEmotionalFlowers() {
        // Adicionar as 5 flores emocionais
        emotionalFlowers.forEach((flowerData, index) => {
            const flower = document.createElement('img');
            flower.src = flowerData.image;
            flower.alt = `Flor ${flowerData.emotion}`;
            flower.className = 'flower-item';
            flower.setAttribute('data-emotion', flowerData.emotion);
            
            // Delays progressivos para animação
            flower.style.animationDelay = `${0.2 + index * 0.2}s`;
            
            flowersGarden.appendChild(flower);
        });
    }
    
    // Tocar som de celebração quando página carregar
    setTimeout(() => {
        playCelebrationSound();
    }, 1500);
    
    function playCelebrationSound() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // Acorde de celebração
            const frequencies = [
                523.25, // C5
                659.25, // E5
                783.99, // G5
                1046.50 // C6
            ];
            
            const duration = 0.4;
            
            frequencies.forEach((freq, index) => {
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.frequency.value = freq;
                oscillator.type = 'sine';
                
                const startTime = audioContext.currentTime + index * 0.1;
                
                gainNode.gain.setValueAtTime(0.12, startTime);
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