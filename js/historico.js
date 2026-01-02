document.addEventListener('DOMContentLoaded', function() {
    const flowersHistoryGrid = document.getElementById('flowers-history-grid');
    const currentMonthDisplay = document.getElementById('current-month');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    
    // Meses em português
    const monthNames = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    
    // Mapeamento de cores para emoções
    const colorToEmotion = {
        '#FEF0CB': { name: 'Alegria', icon: 'assets/icons/alegria.png' },
        '#DDF0FF': { name: 'Calma', icon: 'assets/icons/medo.png' },
        '#EBE2FF': { name: 'Medo', icon: 'assets/icons/medo.png' },
        '#FFE2DF': { name: 'Raiva', icon: 'assets/icons/raiva.png' },
        '#FFE4F7': { name: 'Amor', icon: 'assets/icons/amor.png' },
        '#D6F2DA': { name: 'Tristeza', icon: 'assets/icons/tristeza.png' }
    };
    
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();
    
    // Atualizar display do mês
    function updateMonthDisplay() {
        currentMonthDisplay.textContent = monthNames[currentMonth];
    }
    
    // Navegação de mês
    prevMonthBtn.addEventListener('click', function() {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        updateMonthDisplay();
        loadFlowersHistory();
    });
    
    nextMonthBtn.addEventListener('click', function() {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        updateMonthDisplay();
        loadFlowersHistory();
    });
    
    // Carregar histórico de flores do localStorage
    function loadFlowersHistory() {
        try {
            const history = JSON.parse(localStorage.getItem('flowersHistory')) || [];
            
            // Filtrar flores do mês atual
            const monthFlowers = history.filter(entry => {
                const entryDate = new Date(entry.date);
                return entryDate.getMonth() === currentMonth && 
                       entryDate.getFullYear() === currentYear;
            });
            
            // Limpar grid
            flowersHistoryGrid.innerHTML = '';
            
            if (monthFlowers.length === 0) {
                flowersHistoryGrid.innerHTML = `
                    <div class="no-flowers-message">
                        Ainda não pintaste nenhuma flor este mês! 🌸
                    </div>
                `;
                return;
            }
            
            // Ordenar por data (mais recente primeiro)
            monthFlowers.sort((a, b) => new Date(b.date) - new Date(a.date));
            
            // Adicionar cards de flores
            monthFlowers.forEach((entry, index) => {
                const card = createFlowerHistoryCard(entry, index);
                flowersHistoryGrid.appendChild(card);
            });
            
        } catch (error) {
            console.error('Erro ao carregar histórico:', error);
            flowersHistoryGrid.innerHTML = `
                <div class="no-flowers-message">
                    Erro ao carregar histórico 😢
                </div>
            `;
        }
    }
    
    // Criar card de histórico
    function createFlowerHistoryCard(entry, index) {
        const card = document.createElement('div');
        card.className = 'flower-history-card';
        card.style.animationDelay = `${index * 0.1}s`;
        
        // Data
        const date = new Date(entry.date);
        const day = date.getDate();
        
        // Determinar emoção principal (cor com maior percentagem)
        const dominantEmotion = getDominantEmotion(entry.colorUsage);
        
        card.innerHTML = `
            <button class="delete-flower-btn" title="Apagar esta flor" data-date="${entry.date}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14z"/>
                </svg>
            </button>
            <img src="${entry.image}" alt="Flor ${entry.name}" class="flower-history-image">
            <div class="flower-history-info">
                <div class="flower-date">${day}</div>
                <div class="emotion-label">Emoção Principal</div>
                <div class="emotion-display">
                    <img src="${dominantEmotion.icon}" alt="${dominantEmotion.name}" class="emotion-icon">
                </div>
            </div>
        `;
        
        // Adicionar evento de clique no botão apagar
        const deleteBtn = card.querySelector('.delete-flower-btn');
        deleteBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            deleteFlower(entry.date, card);
        });
        
        return card;
    }
    
    // Apagar flor do histórico
    function deleteFlower(dateToDelete, cardElement) {
        // Confirmar com o usuário
        if (!confirm('Tens a certeza que queres apagar esta flor do histórico?')) {
            return;
        }
        
        try {
            // Obter histórico
            let history = JSON.parse(localStorage.getItem('flowersHistory')) || [];
            
            // Filtrar removendo a entrada com a data correspondente
            history = history.filter(entry => entry.date !== dateToDelete);
            
            // Salvar histórico atualizado
            localStorage.setItem('flowersHistory', JSON.stringify(history));
            
            // Animar remoção do card
            cardElement.style.transition = 'all 0.3s ease';
            cardElement.style.opacity = '0';
            cardElement.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                cardElement.remove();
                
                // Se não houver mais flores, mostrar mensagem
                const remainingCards = flowersHistoryGrid.querySelectorAll('.flower-history-card');
                if (remainingCards.length === 0) {
                    flowersHistoryGrid.innerHTML = `
                        <div class="no-flowers-message">
                            Ainda não pintaste nenhuma flor este mês! 🌸
                        </div>
                    `;
                }
            }, 300);
            
            console.log('✓ Flor apagada do histórico');
            
        } catch (error) {
            console.error('Erro ao apagar flor:', error);
            alert('Erro ao apagar flor do histórico.');
        }
    }
    
    // Determinar emoção dominante com base nas cores usadas
    function getDominantEmotion(colorUsage) {
        if (!colorUsage || Object.keys(colorUsage).length === 0) {
            return { name: 'Alegria', icon: 'assets/icons/alegria.png' };
        }
        
        // Encontrar cor com maior percentagem
        let maxColor = null;
        let maxPercentage = 0;
        
        for (const [color, percentage] of Object.entries(colorUsage)) {
            if (percentage > maxPercentage) {
                maxPercentage = percentage;
                maxColor = color;
            }
        }
        
        return colorToEmotion[maxColor] || { name: 'Alegria', icon: 'assets/icons/alegria.png' };
    }
    
    // Inicializar
    updateMonthDisplay();
    loadFlowersHistory();
});