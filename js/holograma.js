document.addEventListener('DOMContentLoaded', function() {
    const flowerNameText = document.getElementById('flower-name-text');
    const btnNovaFlor = document.getElementById('btn-nova-flor');
    const btnFullscreen = document.getElementById('btn-fullscreen');
    const canvasIds = ['flower-top', 'flower-right', 'flower-bottom', 'flower-left'];
    const rotations = [180, 270, 0, 90]; // Rotações para cada posição do Pepper's Ghost
    
    // Carregar dados da flor do localStorage
    loadFlowerData();
    
    // Botão Criar Nova Flor
    btnNovaFlor.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            window.location.href = 'pintar.html';
        }, 150);
    });
    
    // Botão Ecrã Completo
    btnFullscreen.addEventListener('click', function() {
        toggleFullscreen();
    });
    
    function loadFlowerData() {
        try {
            const flowerData = localStorage.getItem('currentFlower');
            
            if (flowerData) {
                const flower = JSON.parse(flowerData);
                
                // Exibir nome da flor
                if (flower.name && flowerNameText) {
                    flowerNameText.textContent = flower.name;
                }
                
                // Desenhar a flor nos 4 canvas para o efeito Pepper's Ghost
                if (flower.image) {
                    drawFlowerProjections(flower.image);
                } else {
                    console.warn('Imagem da flor não encontrada');
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
    
    function drawFlowerProjections(imageData) {
        const img = new Image();
        
        img.onload = function() {
            canvasIds.forEach((id, index) => {
                const canvas = document.getElementById(id);
                if (canvas) {
                    const ctx = canvas.getContext('2d');
                    
                    // Configurar tamanho do canvas
                    canvas.width = 200;
                    canvas.height = 200;
                    
                    // Limpar canvas
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    
                    // Aplicar rotação para cada posição
                    ctx.save();
                    ctx.translate(canvas.width / 2, canvas.height / 2);
                    ctx.rotate(rotations[index] * Math.PI / 180);
                    ctx.translate(-canvas.width / 2, -canvas.height / 2);
                    
                    // Calcular escala para ajustar imagem
                    const scale = Math.min(
                        canvas.width / img.width,
                        canvas.height / img.height
                    ) * 0.9;
                    
                    const x = (canvas.width - img.width * scale) / 2;
                    const y = (canvas.height - img.height * scale) / 2;
                    
                    // Desenhar imagem
                    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
                    ctx.restore();
                    
                    console.log(`✓ Canvas ${id} desenhado com rotação ${rotations[index]}°`);
                }
            });
            
            // Tocar som de sucesso
            playSuccessSound();
        };
        
        img.onerror = function() {
            console.error('Erro ao carregar imagem da flor');
            showPlaceholder();
        };
        
        img.src = imageData;
    }
    
    function showPlaceholder() {
        canvasIds.forEach((id) => {
            const canvas = document.getElementById(id);
            if (canvas) {
                const ctx = canvas.getContext('2d');
                canvas.width = 200;
                canvas.height = 200;
                
                // Fundo escuro
                ctx.fillStyle = '#1a1a1a';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                
                // Emoji de flor
                ctx.fillStyle = '#82C91E';
                ctx.font = '40px Arial';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText('🌸', canvas.width / 2, canvas.height / 2);
            }
        });
    }
    
    // Tocar som de sucesso (Web Audio API)
    function playSuccessSound() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // Acorde agradável de sucesso
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
    
    // Animação de entrada dos elementos
    function animateEntrance() {
        const display = document.querySelector('.holograma-display');
        const instructions = document.querySelector('.instructions-panel');
        const nameDisplay = document.querySelector('.flower-name-display');
        const buttons = document.querySelector('.action-buttons');
        
        // Elementos já têm animação CSS, apenas garantir visibilidade
        setTimeout(() => {
            if (display) display.style.opacity = '1';
        }, 100);
        
        setTimeout(() => {
            if (instructions) instructions.style.opacity = '1';
        }, 300);
        
        setTimeout(() => {
            if (nameDisplay) nameDisplay.style.opacity = '1';
        }, 500);
        
        setTimeout(() => {
            if (buttons) buttons.style.opacity = '1';
        }, 700);
    }
    
    animateEntrance();
    
    // Função para alternar fullscreen
    function toggleFullscreen() {
        const elem = document.documentElement;
        
        if (!document.fullscreenElement && !document.webkitFullscreenElement) {
            // Entrar em fullscreen
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem.webkitRequestFullscreen) { // Safari/iOS
                elem.webkitRequestFullscreen();
            }
            document.body.classList.add('fullscreen');
            updateFullscreenButton(true);
        } else {
            // Sair de fullscreen
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) { // Safari/iOS
                document.webkitExitFullscreen();
            }
            document.body.classList.remove('fullscreen');
            updateFullscreenButton(false);
        }
    }
    
    // Atualizar ícone e texto do botão fullscreen
    function updateFullscreenButton(isFullscreen) {
        const btnText = btnFullscreen.querySelector('span');
        const btnSvg = btnFullscreen.querySelector('svg');
        
        if (isFullscreen) {
            btnText.textContent = 'Sair';
            btnSvg.innerHTML = '<path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/>';
        } else {
            btnText.textContent = 'Ecrã Completo';
            btnSvg.innerHTML = '<path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>';
        }
    }
    
    // Detectar saída de fullscreen 
    document.addEventListener('fullscreenchange', function() {
        if (!document.fullscreenElement) {
            document.body.classList.remove('fullscreen');
            updateFullscreenButton(false);
        }
    });
    
    document.addEventListener('webkitfullscreenchange', function() {
        if (!document.webkitFullscreenElement) {
            document.body.classList.remove('fullscreen');
            updateFullscreenButton(false);
        }
    });
    
    // Toggle fullscreen com teclado (para PC)
    document.addEventListener('keydown', function(e) {
        // Pressionar 'F' para fullscreen
        if (e.key === 'f' || e.key === 'F') {
            toggleFullscreen();
        }
        
        // Pressionar 'Escape' para sair do fullscreen
        if (e.key === 'Escape') {
            if (document.fullscreenElement || document.webkitFullscreenElement) {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                }
            }
            document.body.classList.remove('fullscreen');
            updateFullscreenButton(false);
        }
    });
});