import React, { useState } from 'react';
import { Plus, Minus, TrendingUp, TrendingDown, Edit2, Trash2 } from 'lucide-react';
import { Character, Advantage, Disadvantage } from '../types/character';

interface AdvantagesDisadvantagesProps {
  character: Character;
  updateCharacter: (updates: Partial<Character>) => void;
}

export const AdvantagesDisadvantages: React.FC<AdvantagesDisadvantagesProps> = ({ 
  character, 
  updateCharacter 
}) => {
  const [newAdvantage, setNewAdvantage] = useState<Omit<Advantage, 'id'>>({
    name: '',
    cost: 0,
    description: ''
  });
  const [newDisadvantage, setNewDisadvantage] = useState<Omit<Disadvantage, 'id'>>({
    name: '',
    cost: 0,
    description: ''
  });

  const addAdvantage = () => {
    if (newAdvantage.name.trim()) {
      const advantage: Advantage = {
        ...newAdvantage,
        id: Date.now().toString()
      };
      updateCharacter({
        advantages: [...character.advantages, advantage]
      });
      setNewAdvantage({ name: '', cost: 0, description: '' });
    }
  };

  const addDisadvantage = () => {
    if (newDisadvantage.name.trim()) {
      const disadvantage: Disadvantage = {
        ...newDisadvantage,
        id: Date.now().toString()
      };
      updateCharacter({
        disadvantages: [...character.disadvantages, disadvantage]
      });
      setNewDisadvantage({ name: '', cost: 0, description: '' });
    }
  };

  const removeAdvantage = (id: string) => {
    updateCharacter({
      advantages: character.advantages.filter(adv => adv.id !== id)
    });
  };

  const removeDisadvantage = (id: string) => {
    updateCharacter({
      disadvantages: character.disadvantages.filter(dis => dis.id !== id)
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      {/* Vantagens */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center mb-4">
          <TrendingUp className="text-green-600 mr-2" size={24} />
          <h2 className="text-2xl font-bold text-gray-800">Vantagens</h2>
        </div>

        {/* Lista de Vantagens */}
        <div className="space-y-3 mb-4">
          {character.advantages.map((advantage) => (
            <div key={advantage.id} className="bg-green-50 rounded-lg p-3 border border-green-200">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-semibold text-green-800">{advantage.name}</h4>
                  <p className="text-sm text-green-600 mt-1">{advantage.description}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-green-700 bg-green-100 px-2 py-1 rounded">
                    {advantage.cost} pts
                  </span>
                  <button
                    onClick={() => removeAdvantage(advantage.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Adicionar Nova Vantagem */}
        <div className="border-t pt-4">
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Nome da vantagem"
              value={newAdvantage.name}
              onChange={(e) => setNewAdvantage({...newAdvantage, name: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="number"
              placeholder="Custo em pontos"
              value={newAdvantage.cost}
              onChange={(e) => setNewAdvantage({...newAdvantage, cost: parseInt(e.target.value) || 0})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <textarea
              placeholder="Descrição da vantagem"
              value={newAdvantage.description}
              onChange={(e) => setNewAdvantage({...newAdvantage, description: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 h-20 resize-none"
            />
            <button
              onClick={addAdvantage}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors flex items-center justify-center"
            >
              <Plus size={16} className="mr-2" />
              Adicionar Vantagem
            </button>
          </div>
        </div>
      </div>

      {/* Desvantagens */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center mb-4">
          <TrendingDown className="text-red-600 mr-2" size={24} />
          <h2 className="text-2xl font-bold text-gray-800">Desvantagens</h2>
        </div>

        {/* Lista de Desvantagens */}
        <div className="space-y-3 mb-4">
          {character.disadvantages.map((disadvantage) => (
            <div key={disadvantage.id} className="bg-red-50 rounded-lg p-3 border border-red-200">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-semibold text-red-800">{disadvantage.name}</h4>
                  <p className="text-sm text-red-600 mt-1">{disadvantage.description}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-red-700 bg-red-100 px-2 py-1 rounded">
                    -{disadvantage.cost} pts
                  </span>
                  <button
                    onClick={() => removeDisadvantage(disadvantage.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Adicionar Nova Desvantagem */}
        <div className="border-t pt-4">
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Nome da desvantagem"
              value={newDisadvantage.name}
              onChange={(e) => setNewDisadvantage({...newDisadvantage, name: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <input
              type="number"
              placeholder="Custo em pontos"
              value={newDisadvantage.cost}
              onChange={(e) => setNewDisadvantage({...newDisadvantage, cost: parseInt(e.target.value) || 0})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <textarea
              placeholder="Descrição da desvantagem"
              value={newDisadvantage.description}
              onChange={(e) => setNewDisadvantage({...newDisadvantage, description: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 h-20 resize-none"
            />
            <button
              onClick={addDisadvantage}
              className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors flex items-center justify-center"
            >
              <Plus size={16} className="mr-2" />
              Adicionar Desvantagem
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};