document.addEventListener('DOMContentLoaded', function() {
    const btnVoltar = document.getElementById('btn-voltar');
    const btnFullscreen = document.getElementById('btn-fullscreen');
    
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