document.addEventListener('DOMContentLoaded', function() {
    // Elementos
    const colorButtons = document.querySelectorAll('.color-btn');
    const flowerTypeButtons = document.querySelectorAll('.flower-type-btn');
    const modeButtons = document.querySelectorAll('.mode-btn');
    const eraserButton = document.querySelector('.eraser-btn');
    const sendButton = document.querySelector('.send-button');
    const flowerNameInput = document.getElementById('flower-name');
    const canvas = document.getElementById('flower-canvas');
    const ctx = canvas.getContext('2d');
    
    let selectedColor = '#FEF0CB'; // Cor inicial
    let currentFlowerType = 1;
    let currentFlowerImage = 'assets/img/flor1.png';
    let paintMode = 'fill'; // 'fill', 'brush' ou 'erase'
    let isPainting = false;
    let lastX = 0;
    let lastY = 0;
    let brushSize = 25;
    let eraserSize = 30;
    let baseImage = null;
    
    // Definir primeira cor como ativa
    colorButtons[0].classList.add('active');
    
    // Configurar canvas
    setupCanvas();
    
    // Animação de entrada
    animateEntrance();
    
    // Carregar imagem inicial
    loadFlowerImage('assets/img/flor1.png');
    
    // Seleção de cor
    colorButtons.forEach(button => {
        button.addEventListener('click', function() {
            colorButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            selectedColor = this.getAttribute('data-color');
            
            // Feedback visual
            this.style.transform = 'scale(1.2)';
            setTimeout(() => { this.style.transform = ''; }, 200);
            
            playSound('select');
        });
    });
    
    // Trocar modo de pintura
    modeButtons.forEach(button => {
        button.addEventListener('click', function() {
            modeButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            paintMode = this.getAttribute('data-mode');
            
            // Atualizar cursor
            canvas.className = paintMode + '-mode';
            
            playSound('switch');
        });
    });
    
    // Trocar tipo de flor
    flowerTypeButtons.forEach(button => {
        button.addEventListener('click', function() {
            flowerTypeButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            currentFlowerType = parseInt(this.getAttribute('data-type'));
            currentFlowerImage = this.getAttribute('data-image');
            
            console.log('Trocando para flor:', currentFlowerImage);
            loadFlowerImage(currentFlowerImage);
            playSound('switch');
        });
    });
    
    // Botão borracha - ativa modo apagar
    eraserButton.addEventListener('click', function() {
        if (paintMode === 'erase') {
            // Se já está em modo apagar, volta ao modo preencher
            paintMode = 'fill';
            modeButtons[0].classList.add('active');
            modeButtons[1].classList.remove('active');
            canvas.className = 'fill-mode';
            this.classList.remove('active');
        } else {
            // Ativa modo apagar
            paintMode = 'erase';
            modeButtons.forEach(btn => btn.classList.remove('active'));
            canvas.className = 'erase-mode';
            this.classList.add('active');
        }
    });
    
    // Eventos de pintura
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mouseout', handleMouseUp);
    
    // Eventos de toque
    canvas.addEventListener('touchstart', handleTouchStart);
    canvas.addEventListener('touchmove', handleTouchMove);
    canvas.addEventListener('touchend', handleMouseUp);
    
    // Botão Enviar
    sendButton.addEventListener('click', function() {
        const flowerName = flowerNameInput.value.trim();
        
        if (flowerName === '') {
            flowerNameInput.style.borderColor = '#ff6b6b';
            flowerNameInput.placeholder = 'Por favor, dá um nome à tua flor!';
            setTimeout(() => { flowerNameInput.style.borderColor = '#80BB9D'; }, 2000);
            return;
        }
        
        saveFlowerData(flowerName, currentFlowerType);
        animateExit();
        
        setTimeout(() => {
            window.location.href = 'plantar.html';
        }, 1000);
    });
    
    flowerNameInput.addEventListener('input', function() {
        if (this.value.length > 30) {
            this.value = this.value.substring(0, 30);
        }
    });
    
    
    function setupCanvas() {
        canvas.width = 500;
        canvas.height = 600;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        canvas.className = 'fill-mode';
    }
    
    function loadFlowerImage(imagePath) {
        const img = new Image();
        
        img.onerror = function() {
            console.error('Erro ao carregar imagem:', imagePath);
            // Desenhar placeholder
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#f0f0f0';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#666';
            ctx.font = '20px Quicksand';
            ctx.textAlign = 'center';
            ctx.fillText('❌ Imagem não encontrada', canvas.width / 2, canvas.height / 2);
            ctx.fillText('Verifica o caminho: ' + imagePath, canvas.width / 2, canvas.height / 2 + 30);
        };
        
        img.onload = function() {
            baseImage = img;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Aumentar escala de 0.85 para 0.95 para flores maiores
            const scale = Math.min(canvas.width / img.width, canvas.height / img.height) * 0.95;
            const x = (canvas.width - img.width * scale) / 2;
            const y = (canvas.height - img.height * scale) / 2;
            
            ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
            console.log('✓ Imagem carregada:', imagePath);
        };
        
        img.src = imagePath;
    }
    
    function getMousePos(e) {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        
        return {
            x: Math.floor((e.clientX - rect.left) * scaleX),
            y: Math.floor((e.clientY - rect.top) * scaleY)
        };
    }
    
    function getTouchPos(e) {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        const touch = e.touches[0];
        
        return {
            x: Math.floor((touch.clientX - rect.left) * scaleX),
            y: Math.floor((touch.clientY - rect.top) * scaleY)
        };
    }
    
    function handleMouseDown(e) {
        const pos = getMousePos(e);
        
        if (paintMode === 'fill') {
            floodFill(pos.x, pos.y, selectedColor);
            playSound('paint');
        } else if (paintMode === 'erase') {
            // Modo apagar
            isPainting = true;
            lastX = pos.x;
            lastY = pos.y;
            erase(pos.x, pos.y);
            playSound('paint');
        } else {
            // Modo brush
            isPainting = true;
            lastX = pos.x;
            lastY = pos.y;
            
            ctx.beginPath();
            ctx.arc(pos.x, pos.y, brushSize / 2, 0, Math.PI * 2);
            ctx.fillStyle = selectedColor;
            ctx.fill();
            
            playSound('paint');
        }
    }
    
    function handleMouseMove(e) {
        if (!isPainting || paintMode === 'fill') return;
        
        e.preventDefault();
        const pos = getMousePos(e);
        
        if (paintMode === 'erase') {
            // Apagar ao arrastar
            erase(pos.x, pos.y);
            eraseLine(lastX, lastY, pos.x, pos.y);
        } else {
            // Pintar ao arrastar
            ctx.beginPath();
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(pos.x, pos.y);
            ctx.strokeStyle = selectedColor;
            ctx.lineWidth = brushSize;
            ctx.stroke();
        }
        
        lastX = pos.x;
        lastY = pos.y;
    }
    
    function handleMouseUp() {
        isPainting = false;
    }
    
    function handleTouchStart(e) {
        e.preventDefault();
        const pos = getTouchPos(e);
        
        if (paintMode === 'fill') {
            floodFill(pos.x, pos.y, selectedColor);
            playSound('paint');
        } else if (paintMode === 'erase') {
            isPainting = true;
            lastX = pos.x;
            lastY = pos.y;
            erase(pos.x, pos.y);
            playSound('paint');
        } else {
            isPainting = true;
            lastX = pos.x;
            lastY = pos.y;
            
            ctx.beginPath();
            ctx.arc(pos.x, pos.y, brushSize / 2, 0, Math.PI * 2);
            ctx.fillStyle = selectedColor;
            ctx.fill();
            
            playSound('paint');
        }
    }
    
    function handleTouchMove(e) {
        if (!isPainting || paintMode === 'fill') return;
        
        e.preventDefault();
        const pos = getTouchPos(e);
        
        if (paintMode === 'erase') {
            erase(pos.x, pos.y);
            eraseLine(lastX, lastY, pos.x, pos.y);
        } else {
            ctx.beginPath();
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(pos.x, pos.y);
            ctx.strokeStyle = selectedColor;
            ctx.lineWidth = brushSize;
            ctx.stroke();
        }
        
        lastX = pos.x;
        lastY = pos.y;
    }
    
    
    function erase(x, y) {
        if (!baseImage) return;
        
        const size = eraserSize;
        
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        
        ctx.save();
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(x, y, size / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        
        
        ctx.save();
        ctx.globalCompositeOperation = 'destination-over';
        
        const scale = Math.min(canvas.width / baseImage.width, canvas.height / baseImage.height) * 0.95;
        const imgX = (canvas.width - baseImage.width * scale) / 2;
        const imgY = (canvas.height - baseImage.height * scale) / 2;
        
        // Clipar para área circular
        ctx.beginPath();
        ctx.arc(x, y, size / 2, 0, Math.PI * 2);
        ctx.clip();
        
        ctx.drawImage(baseImage, imgX, imgY, baseImage.width * scale, baseImage.height * scale);
        ctx.restore();
    }
    
    function eraseLine(x1, y1, x2, y2) {
        const dist = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
        const steps = Math.ceil(dist / 5);
        
        for (let i = 0; i <= steps; i++) {
            const t = i / steps;
            const x = x1 + (x2 - x1) * t;
            const y = y1 + (y2 - y1) * t;
            erase(x, y);
        }
    }
    
    
    
    function floodFill(startX, startY, fillColor) {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixelData = imageData.data;
        const targetColor = getPixelColor(pixelData, startX, startY);
        const fillColorRGB = hexToRgb(fillColor);
        
        // Se a cor já é a mesma, não fazer nada
        if (colorsMatch(targetColor, fillColorRGB)) {
            return;
        }
        
        const pixelsToCheck = [startX, startY];
        const width = canvas.width;
        const height = canvas.height;
        const visited = new Uint8Array(width * height);
        
        while (pixelsToCheck.length > 0) {
            const y = pixelsToCheck.pop();
            const x = pixelsToCheck.pop();
            
            if (x < 0 || x >= width || y < 0 || y >= height) continue;
            
            const index = (y * width + x);
            if (visited[index]) continue;
            visited[index] = 1;
            
            const currentColor = getPixelColor(pixelData, x, y);
            
            if (colorsSimilar(currentColor, targetColor, 30)) {
                setPixelColor(pixelData, x, y, fillColorRGB);
                
                pixelsToCheck.push(x + 1, y);
                pixelsToCheck.push(x - 1, y);
                pixelsToCheck.push(x, y + 1);
                pixelsToCheck.push(x, y - 1);
            }
        }
        
        ctx.putImageData(imageData, 0, 0);
    }
    
    function getPixelColor(pixelData, x, y) {
        const index = (y * canvas.width + x) * 4;
        return {
            r: pixelData[index],
            g: pixelData[index + 1],
            b: pixelData[index + 2],
            a: pixelData[index + 3]
        };
    }
    
    function setPixelColor(pixelData, x, y, color) {
        const index = (y * canvas.width + x) * 4;
        pixelData[index] = color.r;
        pixelData[index + 1] = color.g;
        pixelData[index + 2] = color.b;
        pixelData[index + 3] = 255;
    }
    
    function hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : {r: 255, g: 255, b: 255};
    }
    
    function colorsMatch(c1, c2) {
        return c1.r === c2.r && c1.g === c2.g && c1.b === c2.b;
    }
    
    function colorsSimilar(c1, c2, threshold) {
        return Math.abs(c1.r - c2.r) <= threshold &&
               Math.abs(c1.g - c2.g) <= threshold &&
               Math.abs(c1.b - c2.b) <= threshold;
    }
});



function animateEntrance() {
    const elements = [
        document.querySelector('.pintar-title'),
        document.querySelector('.color-palette'),
        document.querySelector('.canvas-wrapper'),
        document.querySelector('.right-section')
    ];
    
    elements.forEach((element, index) => {
        if (element) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.8s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, 200 + (index * 150));
        }
    });
}

function animateExit() {
    const container = document.querySelector('.pintar-content');
    if (container) {
        container.style.transition = 'all 0.5s ease';
        container.style.opacity = '0';
        container.style.transform = 'scale(0.95)';
    }
}

function saveFlowerData(name, type) {
    const canvas = document.getElementById('flower-canvas');
    
    const flowerData = {
        name: name,
        type: type,
        image: canvas.toDataURL('image/png'),
        timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('currentFlower', JSON.stringify(flowerData));
    console.log('Flor guardada:', flowerData);
}

function playSound(type) {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        switch(type) {
            case 'select':
                oscillator.frequency.value = 523.25;
                gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
                break;
            case 'paint':
                oscillator.frequency.value = 659.25;
                gainNode.gain.setValueAtTime(0.08, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
                break;
            case 'switch':
                oscillator.frequency.value = 783.99;
                gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
                break;
        }
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.2);
    } catch(e) {
        
    }
}

document.addEventListener('keydown', function(e) {
    if (e.key >= '1' && e.key <= '6') {
        const index = parseInt(e.key) - 1;
        const colorButtons = document.querySelectorAll('.color-btn');
        if (colorButtons[index]) {
            colorButtons[index].click();
        }
    }
    
    if (e.key === 'c' || e.key === 'C') {
        const eraserBtn = document.querySelector('.eraser-btn');
        if (eraserBtn) eraserBtn.click();
    }
    
    if (e.key === 'f' || e.key === 'F') {
        const fillBtn = document.querySelector('[data-mode="fill"]');
        if (fillBtn) fillBtn.click();
    }
    
    if (e.key === 'b' || e.key === 'B') {
        const brushBtn = document.querySelector('[data-mode="brush"]');
        if (brushBtn) brushBtn.click();
    }
    
    if (e.key === 'Enter') {
        const sendButton = document.querySelector('.send-button');
        if (sendButton && document.activeElement === document.getElementById('flower-name')) {
            sendButton.click();
        }
    }
});