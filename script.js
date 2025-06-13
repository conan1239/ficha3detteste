// Estado global do personagem
let character = {
    name: '',
    player: '',
    concept: '',
    origin: '',
    attributes: {
        force: 0,
        skill: 0,
        resistance: 0,
        armor: 0,
        firepower: 0
    },
    characteristics: {
        healthPoints: 0,
        currentHealthPoints: 0,
        magicPoints: 0,
        currentMagicPoints: 0,
        focusPoints: 0,
        currentFocusPoints: 0
    },
    advantages: [],
    disadvantages: [],
    powers: [],
    equipment: [],
    points: {
        characterPoints: 0,
        experiencePoints: 0,
        usedPoints: 0
    },
    notes: ''
};

// Configuração dos atributos
const attributes = [
    { key: 'force', name: 'Força', icon: 'fas fa-fist-raised', color: 'red', description: 'Força física e resistência' },
    { key: 'skill', name: 'Habilidade', icon: 'fas fa-crosshairs', color: 'blue', description: 'Destreza e precisão' },
    { key: 'resistance', name: 'Resistência', icon: 'fas fa-shield-alt', color: 'green', description: 'Vitalidade e defesa' },
    { key: 'armor', name: 'Armadura', icon: 'fas fa-shield-alt', color: 'gray', description: 'Proteção física' },
    { key: 'firepower', name: 'Poder de Fogo', icon: 'fas fa-fire', color: 'orange', description: 'Capacidade de ataque' }
];

// Configuração das características
const characteristics = [
    { key: 'health', name: 'Pontos de Vida', icon: 'fas fa-heart', color: 'red' },
    { key: 'magic', name: 'Pontos de Magia', icon: 'fas fa-bolt', color: 'blue' },
    { key: 'focus', name: 'Pontos de Foco', icon: 'fas fa-eye', color: 'purple' }
];

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        loadCharacter();
        renderAttributes();
        renderCharacteristics();
        updateUI();
        document.getElementById('loading').classList.add('hidden');
        document.getElementById('app').classList.remove('hidden');
    }, 500);
});

// Carregar personagem do localStorage
function loadCharacter() {
    const saved = localStorage.getItem('3det-character');
    if (saved) {
        try {
            character = { ...character, ...JSON.parse(saved) };
        } catch (error) {
            console.error('Erro ao carregar personagem:', error);
        }
    }
}

// Salvar personagem no localStorage
function saveCharacter() {
    localStorage.setItem('3det-character', JSON.stringify(character));
    updateLastSaved();
}

// Atualizar timestamp do último salvamento
function updateLastSaved() {
    const now = new Date();
    document.getElementById('lastSaved').textContent = `Última atualização: ${now.toLocaleTimeString()}`;
}

// Renderizar atributos
function renderAttributes() {
    const container = document.getElementById('attributesContainer');
    container.innerHTML = '';
    
    attributes.forEach(attr => {
        const value = character.attributes[attr.key];
        const div = document.createElement('div');
        div.className = 'bg-gray-50 rounded-lg p-4';
        div.innerHTML = `
            <div class="flex items-center mb-2">
                <i class="${attr.icon} text-${attr.color}-600 mr-2"></i>
                <h3 class="font-semibold text-gray-800">${attr.name}</h3>
            </div>
            <p class="text-sm text-gray-600 mb-3">${attr.description}</p>
            <div class="flex items-center space-x-2">
                <button onclick="updateAttribute('${attr.key}', -1)" 
                        class="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                        ${value <= 0 ? 'disabled' : ''}>-</button>
                <div class="flex-1 text-center">
                    <div class="text-2xl font-bold text-${attr.color}-600">${value}</div>
                    <div class="attribute-dots">
                        ${[1,2,3,4,5].map(i => `<div class="dot ${i <= value ? 'filled' : ''}" style="color: var(--${attr.color}-600)"></div>`).join('')}
                    </div>
                </div>
                <button onclick="updateAttribute('${attr.key}', 1)" 
                        class="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                        ${value >= 5 ? 'disabled' : ''}>+</button>
            </div>
        `;
        container.appendChild(div);
    });
}

// Renderizar características
function renderCharacteristics() {
    const container = document.getElementById('characteristicsContainer');
    container.innerHTML = '';
    
    characteristics.forEach(char => {
        let maxValue, currentValue, key;
        
        switch(char.key) {
            case 'health':
                maxValue = character.characteristics.healthPoints;
                currentValue = character.characteristics.currentHealthPoints;
                key = 'currentHealthPoints';
                break;
            case 'magic':
                maxValue = character.characteristics.magicPoints;
                currentValue = character.characteristics.currentMagicPoints;
                key = 'currentMagicPoints';
                break;
            case 'focus':
                maxValue = character.characteristics.focusPoints;
                currentValue = character.characteristics.currentFocusPoints;
                key = 'currentFocusPoints';
                break;
        }
        
        const percentage = maxValue > 0 ? (currentValue / maxValue) * 100 : 0;
        const div = document.createElement('div');
        div.className = `bg-${char.color}-50 rounded-lg p-4`;
        div.innerHTML = `
            <div class="flex items-center mb-3">
                <i class="${char.icon} text-${char.color}-600 mr-2"></i>
                <h3 class="font-semibold text-${char.color}-800">${char.name}</h3>
            </div>
            <div class="space-y-2">
                <div class="flex justify-between text-sm text-gray-600">
                    <span>Máximo:</span>
                    <span class="font-semibold">${maxValue}</span>
                </div>
                <div class="flex items-center space-x-2">
                    <label class="text-sm font-medium text-gray-700">Atual:</label>
                    <input type="number" value="${currentValue}" 
                           onchange="updateCurrentValue('${key}', this.value)"
                           class="flex-1 px-2 py-1 border border-gray-300 rounded text-center focus:outline-none focus:ring-2 focus:ring-${char.color}-500"
                           min="0" max="${maxValue}">
                </div>
                <div class="progress-bar">
                    <div class="progress-fill bg-${char.color}-600" style="width: ${percentage}%"></div>
                </div>
            </div>
        `;
        container.appendChild(div);
    });
}

// Atualizar atributo
function updateAttribute(attr, change) {
    const newValue = character.attributes[attr] + change;
    if (newValue >= 0 && newValue <= 5) {
        character.attributes[attr] = newValue;
        calculateDerivedCharacteristics();
        renderAttributes();
        renderCharacteristics();
        saveCharacter();
    }
}

// Calcular características derivadas
function calculateDerivedCharacteristics() {
    character.characteristics.healthPoints = (character.attributes.resistance + 1) * 5;
    character.characteristics.magicPoints = (character.attributes.resistance + 1) * 3;
    character.characteristics.focusPoints = (character.attributes.skill + 1) * 2;
    
    // Ajustar valores atuais se excederem o máximo
    character.characteristics.currentHealthPoints = Math.min(
        character.characteristics.currentHealthPoints, 
        character.characteristics.healthPoints
    );
    character.characteristics.currentMagicPoints = Math.min(
        character.characteristics.currentMagicPoints, 
        character.characteristics.magicPoints
    );
    character.characteristics.currentFocusPoints = Math.min(
        character.characteristics.currentFocusPoints, 
        character.characteristics.focusPoints
    );
}

// Atualizar valor atual das características
function updateCurrentValue(key, value) {
    const numValue = parseInt(value) || 0;
    let maxValue;
    
    switch(key) {
        case 'currentHealthPoints':
            maxValue = character.characteristics.healthPoints;
            break;
        case 'currentMagicPoints':
            maxValue = character.characteristics.magicPoints;
            break;
        case 'currentFocusPoints':
            maxValue = character.characteristics.focusPoints;
            break;
    }
    
    character.characteristics[key] = Math.max(0, Math.min(maxValue, numValue));
    renderCharacteristics();
    saveCharacter();
}

// Atualizar interface
function updateUI() {
    document.getElementById('characterName').value = character.name;
    document.getElementById('playerName').value = character.player;
    document.getElementById('concept').value = character.concept;
    document.getElementById('origin').value = character.origin;
    document.getElementById('notes').value = character.notes;
    document.getElementById('totalPoints').value = character.points.characterPoints;
    document.getElementById('usedPoints').value = character.points.usedPoints;
    document.getElementById('experiencePoints').value = character.points.experiencePoints;
    
    renderAdvantages();
    renderDisadvantages();
    renderPowers();
    renderEquipment();
}

// Event listeners para campos básicos
document.getElementById('characterName').addEventListener('input', (e) => {
    character.name = e.target.value;
    saveCharacter();
});

document.getElementById('playerName').addEventListener('input', (e) => {
    character.player = e.target.value;
    saveCharacter();
});

document.getElementById('concept').addEventListener('input', (e) => {
    character.concept = e.target.value;
    saveCharacter();
});

document.getElementById('origin').addEventListener('input', (e) => {
    character.origin = e.target.value;
    saveCharacter();
});

document.getElementById('notes').addEventListener('input', (e) => {
    character.notes = e.target.value;
    saveCharacter();
});

document.getElementById('totalPoints').addEventListener('input', (e) => {
    character.points.characterPoints = parseInt(e.target.value) || 0;
    saveCharacter();
});

document.getElementById('usedPoints').addEventListener('input', (e) => {
    character.points.usedPoints = parseInt(e.target.value) || 0;
    saveCharacter();
});

document.getElementById('experiencePoints').addEventListener('input', (e) => {
    character.points.experiencePoints = parseInt(e.target.value) || 0;
    saveCharacter();
});

// Funções para vantagens
function renderAdvantages() {
    const container = document.getElementById('advantagesList');
    container.innerHTML = '';
    
    character.advantages.forEach(advantage => {
        const div = document.createElement('div');
        div.className = 'advantage-card item-card';
        div.innerHTML = `
            <div class="flex justify-between items-start">
                <div class="flex-1">
                    <h4 class="font-semibold text-green-800">${advantage.name}</h4>
                    <p class="text-sm text-green-600 mt-1">${advantage.description}</p>
                </div>
                <div class="flex items-center space-x-2">
                    <span class="text-sm font-medium text-green-700 bg-green-100 px-2 py-1 rounded">
                        ${advantage.cost} pts
                    </span>
                    <button onclick="removeAdvantage('${advantage.id}')" 
                            class="text-red-500 hover:text-red-700 transition-colors">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
        container.appendChild(div);
    });
}

function addAdvantage() {
    const name = document.getElementById('newAdvantageName').value.trim();
    const cost = parseInt(document.getElementById('newAdvantageCost').value) || 0;
    const description = document.getElementById('newAdvantageDesc').value.trim();
    
    if (name) {
        const advantage = {
            id: Date.now().toString(),
            name,
            cost,
            description
        };
        
        character.advantages.push(advantage);
        renderAdvantages();
        saveCharacter();
        
        // Limpar campos
        document.getElementById('newAdvantageName').value = '';
        document.getElementById('newAdvantageCost').value = '';
        document.getElementById('newAdvantageDesc').value = '';
    }
}

function removeAdvantage(id) {
    character.advantages = character.advantages.filter(adv => adv.id !== id);
    renderAdvantages();
    saveCharacter();
}

// Funções para desvantagens
function renderDisadvantages() {
    const container = document.getElementById('disadvantagesList');
    container.innerHTML = '';
    
    character.disadvantages.forEach(disadvantage => {
        const div = document.createElement('div');
        div.className = 'disadvantage-card item-card';
        div.innerHTML = `
            <div class="flex justify-between items-start">
                <div class="flex-1">
                    <h4 class="font-semibold text-red-800">${disadvantage.name}</h4>
                    <p class="text-sm text-red-600 mt-1">${disadvantage.description}</p>
                </div>
                <div class="flex items-center space-x-2">
                    <span class="text-sm font-medium text-red-700 bg-red-100 px-2 py-1 rounded">
                        -${disadvantage.cost} pts
                    </span>
                    <button onclick="removeDisadvantage('${disadvantage.id}')" 
                            class="text-red-500 hover:text-red-700 transition-colors">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
        container.appendChild(div);
    });
}

function addDisadvantage() {
    const name = document.getElementById('newDisadvantageName').value.trim();
    const cost = parseInt(document.getElementById('newDisadvantageCost').value) || 0;
    const description = document.getElementById('newDisadvantageDesc').value.trim();
    
    if (name) {
        const disadvantage = {
            id: Date.now().toString(),
            name,
            cost,
            description
        };
        
        character.disadvantages.push(disadvantage);
        renderDisadvantages();
        saveCharacter();
        
        // Limpar campos
        document.getElementById('newDisadvantageName').value = '';
        document.getElementById('newDisadvantageCost').value = '';
        document.getElementById('newDisadvantageDesc').value = '';
    }
}

function removeDisadvantage(id) {
    character.disadvantages = character.disadvantages.filter(dis => dis.id !== id);
    renderDisadvantages();
    saveCharacter();
}

// Funções para poderes
function renderPowers() {
    const container = document.getElementById('powersList');
    container.innerHTML = '';
    
    character.powers.forEach(power => {
        const div = document.createElement('div');
        div.className = 'power-card item-card';
        div.innerHTML = `
            <div class="flex justify-between items-start mb-2">
                <h4 class="font-semibold text-purple-800">${power.name}</h4>
                <div class="flex items-center space-x-2">
                    <span class="text-sm font-medium text-purple-700 bg-purple-100 px-2 py-1 rounded">
                        ${power.cost} pts
                    </span>
                    <button onclick="removePower('${power.id}')" 
                            class="text-red-500 hover:text-red-700 transition-colors">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            <p class="text-sm text-purple-600 mb-2">${power.description}</p>
            <div class="grid grid-cols-3 gap-2 text-xs">
                <div>
                    <span class="font-medium">Dano:</span>
                    <div class="text-purple-700">${power.damage || 'N/A'}</div>
                </div>
                <div>
                    <span class="font-medium">Alcance:</span>
                    <div class="text-purple-700">${power.range || 'N/A'}</div>
                </div>
                <div>
                    <span class="font-medium">Duração:</span>
                    <div class="text-purple-700">${power.duration || 'N/A'}</div>
                </div>
            </div>
        `;
        container.appendChild(div);
    });
}

function addPower() {
    const name = document.getElementById('newPowerName').value.trim();
    const cost = parseInt(document.getElementById('newPowerCost').value) || 0;
    const damage = document.getElementById('newPowerDamage').value.trim();
    const range = document.getElementById('newPowerRange').value.trim();
    const duration = document.getElementById('newPowerDuration').value.trim();
    const description = document.getElementById('newPowerDesc').value.trim();
    
    if (name) {
        const power = {
            id: Date.now().toString(),
            name,
            cost,
            damage,
            range,
            duration,
            description
        };
        
        character.powers.push(power);
        renderPowers();
        saveCharacter();
        
        // Limpar campos
        document.getElementById('newPowerName').value = '';
        document.getElementById('newPowerCost').value = '';
        document.getElementById('newPowerDamage').value = '';
        document.getElementById('newPowerRange').value = '';
        document.getElementById('newPowerDuration').value = '';
        document.getElementById('newPowerDesc').value = '';
    }
}

function removePower(id) {
    character.powers = character.powers.filter(power => power.id !== id);
    renderPowers();
    saveCharacter();
}

// Funções para equipamentos
function renderEquipment() {
    const container = document.getElementById('equipmentsList');
    container.innerHTML = '';
    
    character.equipment.forEach(equipment => {
        const div = document.createElement('div');
        div.className = 'equipment-card item-card';
        div.innerHTML = `
            <div class="flex justify-between items-start mb-2">
                <div class="flex-1">
                    <h4 class="font-semibold text-orange-800">${equipment.name}</h4>
                    <span class="text-sm text-orange-600 bg-orange-100 px-2 py-1 rounded">
                        ${equipment.type}
                    </span>
                </div>
                <button onclick="removeEquipment('${equipment.id}')" 
                        class="text-red-500 hover:text-red-700 transition-colors">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
            <p class="text-sm text-orange-600 mb-2">${equipment.description}</p>
            ${equipment.bonus ? `
                <div class="text-sm">
                    <span class="font-medium text-orange-700">Bônus:</span>
                    <span class="text-orange-600 ml-1">${equipment.bonus}</span>
                </div>
            ` : ''}
        `;
        container.appendChild(div);
    });
}

function addEquipment() {
    const name = document.getElementById('newEquipmentName').value.trim();
    const type = document.getElementById('newEquipmentType').value.trim();
    const bonus = document.getElementById('newEquipmentBonus').value.trim();
    const description = document.getElementById('newEquipmentDesc').value.trim();
    
    if (name) {
        const equipment = {
            id: Date.now().toString(),
            name,
            type,
            bonus,
            description
        };
        
        character.equipment.push(equipment);
        renderEquipment();
        saveCharacter();
        
        // Limpar campos
        document.getElementById('newEquipmentName').value = '';
        document.getElementById('newEquipmentType').value = '';
        document.getElementById('newEquipmentBonus').value = '';
        document.getElementById('newEquipmentDesc').value = '';
    }
}

function removeEquipment(id) {
    character.equipment = character.equipment.filter(eq => eq.id !== id);
    renderEquipment();
    saveCharacter();
}

// Funções de exportação/importação
function exportCharacter() {
    const dataStr = JSON.stringify(character, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `${character.name || 'personagem'}_3det.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}

function importCharacter(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const importedCharacter = JSON.parse(e.target.result);
                character = { ...character, ...importedCharacter };
                calculateDerivedCharacteristics();
                updateUI();
                renderAttributes();
                renderCharacteristics();
                saveCharacter();
                alert('Personagem importado com sucesso!');
            } catch (error) {
                console.error('Erro ao importar personagem:', error);
                alert('Erro ao importar arquivo. Verifique se o formato está correto.');
            }
        };
        reader.readAsText(file);
    }
}

function resetCharacter() {
    if (confirm('Tem certeza que deseja resetar toda a ficha? Esta ação não pode ser desfeita.')) {
        character = {
            name: '',
            player: '',
            concept: '',
            origin: '',
            attributes: {
                force: 0,
                skill: 0,
                resistance: 0,
                armor: 0,
                firepower: 0
            },
            characteristics: {
                healthPoints: 0,
                currentHealthPoints: 0,
                magicPoints: 0,
                currentMagicPoints: 0,
                focusPoints: 0,
                currentFocusPoints: 0
            },
            advantages: [],
            disadvantages: [],
            powers: [],
            equipment: [],
            points: {
                characterPoints: 0,
                experiencePoints: 0,
                usedPoints: 0
            },
            notes: ''
        };
        
        localStorage.removeItem('3det-character');
        updateUI();
        renderAttributes();
        renderCharacteristics();
        alert('Ficha resetada com sucesso!');
    }
}