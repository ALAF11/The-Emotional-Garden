document.addEventListener('DOMContentLoaded', function() {
    const resultCanvas = document.getElementById('result-canvas');
    const displayName = document.getElementById('display-name');
    const plantButton = document.getElementById('plant-button');
    
    // Carregar dados da flor pintada do localStorage
    loadFlowerData();
    
    // Botão plantar
    plantButton.addEventListener('click', function() {
        // Adicionar animação de clique
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
        
        // Tocar som de sucesso (se disponível)
        playSuccessSound();
        
        // Aguardar um pouco e redirecionar para página de plantar
        setTimeout(() => {
            window.location.href = 'plantar.html';
        }, 300);
    });
    
    // Carregar dados da flor do localStorage
    function loadFlowerData() {
        try {
            const flowerData = localStorage.getItem('currentFlower');
            
            if (flowerData) {
                const flower = JSON.parse(flowerData);
                
                // Exibir nome da flor
                if (flower.name) {
                    displayName.textContent = flower.name;
                }
                
                // Desenhar a flor pintada no canvas
                if (flower.image) {
                    const img = new Image();
                    img.onload = function() {
                        // Ajustar tamanho do canvas - bem maior para destacar a flor
                        resultCanvas.width = 480;
                        resultCanvas.height = 576;
                        
                        const ctx = resultCanvas.getContext('2d');
                        ctx.clearRect(0, 0, resultCanvas.width, resultCanvas.height);
                        
                        // Centralizar e desenhar a imagem
                        const scale = Math.min(
                            resultCanvas.width / img.width,
                            resultCanvas.height / img.height
                        ) * 0.9;
                        
                        const x = (resultCanvas.width - img.width * scale) / 2;
                        const y = (resultCanvas.height - img.height * scale) / 2;
                        
                        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
                        
                        // Adicionar brilho sutil ao redor
                        addGlowEffect(ctx);
                    };
                    
                    img.onerror = function() {
                        console.error('Erro ao carregar imagem da flor');
                        showPlaceholder();
                    };
                    
                    img.src = flower.image;
                } else {
                    showPlaceholder();
                }
            } else {
                console.warn('Nenhuma flor encontrada no localStorage');
                showPlaceholder();
            }
        } catch (error) {
            console.error('Erro ao carregar dados da flor:', error);
            showPlaceholder();
        }
    }
    
    // Adicionar efeito de brilho ao redor da flor
    function addGlowEffect(ctx) {
        const gradient = ctx.createRadialGradient(
            resultCanvas.width / 2, resultCanvas.height / 2, 50,
            resultCanvas.width / 2, resultCanvas.height / 2, 200
        );
        
        gradient.addColorStop(0, 'rgba(130, 201, 30, 0.1)');
        gradient.addColorStop(1, 'rgba(130, 201, 30, 0)');
        
        ctx.globalCompositeOperation = 'destination-over';
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, resultCanvas.width, resultCanvas.height);
        ctx.globalCompositeOperation = 'source-over';
    }
    
    // Mostrar placeholder se não houver imagem
    function showPlaceholder() {
        resultCanvas.width = 480;
        resultCanvas.height = 576;
        const ctx = resultCanvas.getContext('2d');
        
        ctx.fillStyle = '#f0f0f0';
        ctx.fillRect(0, 0, resultCanvas.width, resultCanvas.height);
        
        ctx.fillStyle = '#999';
        ctx.font = '20px Quicksand';
        ctx.textAlign = 'center';
        ctx.fillText('🌸', resultCanvas.width / 2, resultCanvas.height / 2 - 20);
        ctx.fillText('Flor Emocional', resultCanvas.width / 2, resultCanvas.height / 2 + 20);
    }
    
    // Tocar som de sucesso (Web Audio API)
    function playSuccessSound() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // Nota de sucesso - acorde agradável
            const frequencies = [523.25, 659.25, 783.99]; // C, E, G
            const duration = 0.3;
            
            frequencies.forEach((freq, index) => {
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.frequency.value = freq;
                oscillator.type = 'sine';
                
                gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(
                    0.01,
                    audioContext.currentTime + duration
                );
                
                oscillator.start(audioContext.currentTime + index * 0.1);
                oscillator.stop(audioContext.currentTime + duration + index * 0.1);
            });
        } catch (error) {
            console.log('Áudio não disponível');
        }
    }
    
    // Animação de entrada
    function animateEntrance() {
        const card = document.querySelector('.flower-result-card');
        const buttons = document.querySelector('.action-buttons');
        
        // Card já tem animação CSS, apenas garantir visibilidade
        setTimeout(() => {
            card.style.opacity = '1';
        }, 100);
        
        setTimeout(() => {
            buttons.style.opacity = '1';
        }, 500);
    }
    
    animateEntrance();
});