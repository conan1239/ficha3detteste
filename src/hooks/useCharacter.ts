import { useState, useEffect } from 'react';
import { Character } from '../types/character';

const defaultCharacter: Character = {
  name: '',
  player: '',
  concept: '',
  origin: '',
  attributes: {
    force: 0,
    skill: 0,
    resistance: 0,
    armor: 0,
    firepower: 0,
  },
  characteristics: {
    healthPoints: 0,
    currentHealthPoints: 0,
    magicPoints: 0,
    currentMagicPoints: 0,
    focusPoints: 0,
    currentFocusPoints: 0,
  },
  advantages: [],
  disadvantages: [],
  skills: [],
  powers: [],
  equipment: [],
  points: {
    characterPoints: 0,
    experiencePoints: 0,
    usedPoints: 0,
  },
  notes: '',
};

export const useCharacter = () => {
  const [character, setCharacter] = useState<Character>(defaultCharacter);
  const [isLoading, setIsLoading] = useState(true);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Carregar dados do localStorage ao inicializar
  useEffect(() => {
    const savedCharacter = localStorage.getItem('3det-character');
    if (savedCharacter) {
      try {
        setCharacter(JSON.parse(savedCharacter));
      } catch (error) {
        console.error('Erro ao carregar personagem:', error);
      }
    }
    setIsLoading(false);
  }, []);

  // Salvar automaticamente quando o personagem mudar
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('3det-character', JSON.stringify(character));
      setLastSaved(new Date());
    }
  }, [character, isLoading]);

  // Calcular características derivadas
  useEffect(() => {
    const newHealthPoints = (character.attributes.resistance + 1) * 5;
    const newMagicPoints = (character.attributes.resistance + 1) * 3;
    const newFocusPoints = (character.attributes.skill + 1) * 2;

    setCharacter(prev => ({
      ...prev,
      characteristics: {
        ...prev.characteristics,
        healthPoints: newHealthPoints,
        magicPoints: newMagicPoints,
        focusPoints: newFocusPoints,
      }
    }));
  }, [character.attributes.resistance, character.attributes.skill]);

  const updateCharacter = (updates: Partial<Character>) => {
    setCharacter(prev => ({ ...prev, ...updates }));
  };

  const resetCharacter = () => {
    setCharacter(defaultCharacter);
    localStorage.removeItem('3det-character');
  };

  const exportCharacter = () => {
    const dataStr = JSON.stringify(character, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `${character.name || 'personagem'}_3det.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const importCharacter = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedCharacter = JSON.parse(e.target?.result as string);
        setCharacter(importedCharacter);
      } catch (error) {
        console.error('Erro ao importar personagem:', error);
        alert('Erro ao importar arquivo. Verifique se o formato está correto.');
      }
    };
    reader.readAsText(file);
  };

  return {
    character,
    updateCharacter,
    resetCharacter,
    exportCharacter,
    importCharacter,
    isLoading,
    lastSaved,
  };
};