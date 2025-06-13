import React from 'react';
import { Zap, Target, Shield, Crosshair, Flame } from 'lucide-react';
import { Character } from '../types/character';

interface AttributesProps {
  character: Character;
  updateCharacter: (updates: Partial<Character>) => void;
}

export const Attributes: React.FC<AttributesProps> = ({ character, updateCharacter }) => {
  const updateAttribute = (attribute: keyof Character['attributes'], value: number) => {
    updateCharacter({
      attributes: {
        ...character.attributes,
        [attribute]: Math.max(0, Math.min(5, value))
      }
    });
  };

  const attributes = [
    { key: 'force', name: 'Força', icon: Zap, color: 'red', description: 'Força física e resistência' },
    { key: 'skill', name: 'Habilidade', icon: Target, color: 'blue', description: 'Destreza e precisão' },
    { key: 'resistance', name: 'Resistência', icon: Shield, color: 'green', description: 'Vitalidade e defesa' },
    { key: 'armor', name: 'Armadura', icon: Shield, color: 'gray', description: 'Proteção física' },
    { key: 'firepower', name: 'Poder de Fogo', icon: Flame, color: 'orange', description: 'Capacidade de ataque' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="flex items-center mb-4">
        <Zap className="text-red-600 mr-2" size={24} />
        <h2 className="text-2xl font-bold text-gray-800">Atributos</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {attributes.map(({ key, name, icon: Icon, color, description }) => (
          <div key={key} className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Icon className={`text-${color}-600 mr-2`} size={20} />
              <h3 className="font-semibold text-gray-800">{name}</h3>
            </div>
            
            <p className="text-sm text-gray-600 mb-3">{description}</p>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => updateAttribute(key as keyof Character['attributes'], character.attributes[key as keyof Character['attributes']] - 1)}
                className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                disabled={character.attributes[key as keyof Character['attributes']] <= 0}
              >
                -
              </button>
              
              <div className="flex-1 text-center">
                <div className={`text-2xl font-bold text-${color}-600`}>
                  {character.attributes[key as keyof Character['attributes']]}
                </div>
                <div className="flex justify-center space-x-1 mt-1">
                  {[1, 2, 3, 4, 5].map(i => (
                    <div
                      key={i}
                      className={`w-3 h-3 rounded-full ${
                        i <= character.attributes[key as keyof Character['attributes']]
                          ? `bg-${color}-600`
                          : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
              
              <button
                onClick={() => updateAttribute(key as keyof Character['attributes'], character.attributes[key as keyof Character['attributes']] + 1)}
                className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                disabled={character.attributes[key as keyof Character['attributes']] >= 5}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};