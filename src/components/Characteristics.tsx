import React from 'react';
import { Heart, Zap, Focus } from 'lucide-react';
import { Character } from '../types/character';

interface CharacteristicsProps {
  character: Character;
  updateCharacter: (updates: Partial<Character>) => void;
}

export const Characteristics: React.FC<CharacteristicsProps> = ({ character, updateCharacter }) => {
  const updateCurrentValue = (type: 'health' | 'magic' | 'focus', value: number) => {
    const characteristics = { ...character.characteristics };
    
    switch (type) {
      case 'health':
        characteristics.currentHealthPoints = Math.max(0, Math.min(characteristics.healthPoints, value));
        break;
      case 'magic':
        characteristics.currentMagicPoints = Math.max(0, Math.min(characteristics.magicPoints, value));
        break;
      case 'focus':
        characteristics.currentFocusPoints = Math.max(0, Math.min(characteristics.focusPoints, value));
        break;
    }
    
    updateCharacter({ characteristics });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="flex items-center mb-4">
        <Heart className="text-green-600 mr-2" size={24} />
        <h2 className="text-2xl font-bold text-gray-800">Características</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Pontos de Vida */}
        <div className="bg-red-50 rounded-lg p-4">
          <div className="flex items-center mb-3">
            <Heart className="text-red-600 mr-2" size={20} />
            <h3 className="font-semibold text-red-800">Pontos de Vida</h3>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Máximo:</span>
              <span className="font-semibold">{character.characteristics.healthPoints}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">Atual:</label>
              <input
                type="number"
                value={character.characteristics.currentHealthPoints}
                onChange={(e) => updateCurrentValue('health', parseInt(e.target.value) || 0)}
                className="flex-1 px-2 py-1 border border-gray-300 rounded text-center focus:outline-none focus:ring-2 focus:ring-red-500"
                min="0"
                max={character.characteristics.healthPoints}
              />
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-red-600 h-2 rounded-full transition-all"
                style={{
                  width: `${(character.characteristics.currentHealthPoints / character.characteristics.healthPoints) * 100}%`
                }}
              />
            </div>
          </div>
        </div>

        {/* Pontos de Magia */}
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center mb-3">
            <Zap className="text-blue-600 mr-2" size={20} />
            <h3 className="font-semibold text-blue-800">Pontos de Magia</h3>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Máximo:</span>
              <span className="font-semibold">{character.characteristics.magicPoints}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">Atual:</label>
              <input
                type="number"
                value={character.characteristics.currentMagicPoints}
                onChange={(e) => updateCurrentValue('magic', parseInt(e.target.value) || 0)}
                className="flex-1 px-2 py-1 border border-gray-300 rounded text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
                max={character.characteristics.magicPoints}
              />
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all"
                style={{
                  width: `${(character.characteristics.currentMagicPoints / character.characteristics.magicPoints) * 100}%`
                }}
              />
            </div>
          </div>
        </div>

        {/* Pontos de Foco */}
        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center mb-3">
            <Focus className="text-purple-600 mr-2" size={20} />
            <h3 className="font-semibold text-purple-800">Pontos de Foco</h3>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Máximo:</span>
              <span className="font-semibold">{character.characteristics.focusPoints}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">Atual:</label>
              <input
                type="number"
                value={character.characteristics.currentFocusPoints}
                onChange={(e) => updateCurrentValue('focus', parseInt(e.target.value) || 0)}
                className="flex-1 px-2 py-1 border border-gray-300 rounded text-center focus:outline-none focus:ring-2 focus:ring-purple-500"
                min="0"
                max={character.characteristics.focusPoints}
              />
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-purple-600 h-2 rounded-full transition-all"
                style={{
                  width: `${(character.characteristics.currentFocusPoints / character.characteristics.focusPoints) * 100}%`
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};