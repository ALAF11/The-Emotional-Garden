document.addEventListener('DOMContentLoaded', function() {
    const btnVoltar = document.getElementById('btn-voltar');
    const btnFullscreen = document.getElementById('btn-fullscreen');
    
    // Configuração dos GIFs
    const INTRO_GIF = 'assets/gif/flower1.gif';  // GIF de introdução (toca 1 vez)
    const IDLE_GIF = 'assets/gif/idle1.gif';     // GIF idle (loop infinito)
    const INTRO_DURATION = 5000;                 // Duração do GIF de intro em ms (ajustar conforme necessário)
    
    // Inicializar sistema de GIFs
    initGifSequence();
    
    // Botão Voltar à Pintura
    btnVoltar.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            window.location.href = 'pintar.html';
        }, 150);
    });
    
    // Botão Ecrã Completo
    btnFullscreen.addEventListener('click', function() {
        toggleFullscreen();
    });
    
    // Sistema de sequência de GIFs
    function initGifSequence() {
        const flowerGifs = document.querySelectorAll('.flower-gif');
        
        if (flowerGifs.length === 0) {
            console.warn('Nenhum elemento .flower-gif encontrado');
            return;
        }
        
        console.log('🌸 Iniciando sequência de GIFs...');
        console.log(`📍 GIF Intro: ${INTRO_GIF}`);
        console.log(`📍 GIF Idle: ${IDLE_GIF}`);
        
        // Definir o GIF de intro inicialmente (com timestamp para forçar reload)
        const timestamp = new Date().getTime();
        flowerGifs.forEach((gif, index) => {
            gif.src = `${INTRO_GIF}?t=${timestamp}`;
            gif.classList.add('intro-playing');
            console.log(`✓ GIF ${index + 1} definido para intro`);
        });
        
        // Pré-carregar o GIF idle
        const idlePreload = new Image();
        idlePreload.src = IDLE_GIF;
        idlePreload.onload = function() {
            console.log('✓ GIF idle pré-carregado com sucesso');
        };
        idlePreload.onerror = function() {
            console.error('✗ Erro ao pré-carregar GIF idle');
        };
        
        // Após a duração do intro, mudar para idle
        setTimeout(() => {
            switchToIdleGif(flowerGifs);
        }, INTRO_DURATION);
    }
    
    // Função para mudar para o GIF idle
    function switchToIdleGif(flowerGifs) {
        console.log('🔄 Mudando para GIF idle...');
        
        flowerGifs.forEach((gif, index) => {
            // Adicionar classe de transição
            gif.classList.add('transitioning');
            
            // Pequeno delay para a transição visual
            setTimeout(() => {
                gif.src = IDLE_GIF;
                gif.classList.remove('intro-playing');
                gif.classList.remove('transitioning');
                gif.classList.add('idle-playing');
                console.log(`✓ GIF ${index + 1} mudou para idle`);
            }, 100);
        });
        
        // Tocar som de transição (opcional)
        playTransitionSound();
    }
    
    // Som de transição suave
    function playTransitionSound() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // Som suave de "whoosh" para a transição
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.3);
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
        } catch (error) {
            console.log('Áudio não disponível');
        }
    }
    
    // Função para alternar fullscreen
    function toggleFullscreen() {
        const elem = document.documentElement;
        
        if (!document.fullscreenElement && !document.webkitFullscreenElement) {
            // Entrar em fullscreen
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem.webkitRequestFullscreen) { 
                elem.webkitRequestFullscreen();
            }
            document.body.classList.add('fullscreen');
            updateFullscreenButton(true);
        } else {
            // Sair de fullscreen
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) { 
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
        
        // Pressionar 'R' para reiniciar a sequência de GIFs (útil para testes)
        if (e.key === 'r' || e.key === 'R') {
            console.log('🔄 Reiniciando sequência de GIFs...');
            initGifSequence();
        }
    });
    
    // Animação de entrada
    function animateEntrance() {
        const display = document.querySelector('.holograma-display');
        const instructions = document.querySelector('.instructions-panel');
        const nameDisplay = document.querySelector('.flower-name-display');
        const buttons = document.querySelector('.action-buttons');
        
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
});