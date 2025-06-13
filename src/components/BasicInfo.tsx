import React from 'react';
import { User, Gamepad2, MapPin, FileText } from 'lucide-react';
import { Character } from '../types/character';

interface BasicInfoProps {
  character: Character;
  updateCharacter: (updates: Partial<Character>) => void;
}

export const BasicInfo: React.FC<BasicInfoProps> = ({ character, updateCharacter }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="flex items-center mb-4">
        <User className="text-blue-600 mr-2" size={24} />
        <h2 className="text-2xl font-bold text-gray-800">Dados Básicos</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <User size={16} className="inline mr-1" />
            Nome do Personagem
          </label>
          <input
            type="text"
            value={character.name}
            onChange={(e) => updateCharacter({ name: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            placeholder="Digite o nome do personagem"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <Gamepad2 size={16} className="inline mr-1" />
            Jogador
          </label>
          <input
            type="text"
            value={character.player}
            onChange={(e) => updateCharacter({ player: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            placeholder="Nome do jogador"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <FileText size={16} className="inline mr-1" />
            Conceito
          </label>
          <input
            type="text"
            value={character.concept}
            onChange={(e) => updateCharacter({ concept: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            placeholder="Ex: Ninja Cyberpunk, Mago Espacial"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <MapPin size={16} className="inline mr-1" />
            Origem
          </label>
          <input
            type="text"
            value={character.origin}
            onChange={(e) => updateCharacter({ origin: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            placeholder="Ex: Tóquio, Marte, Dimensão Alternativa"
          />
        </div>
      </div>
    </div>
  );
};