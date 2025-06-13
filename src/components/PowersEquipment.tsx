import React, { useState } from 'react';
import { Zap, Package, Plus, Trash2 } from 'lucide-react';
import { Character, Power, Equipment } from '../types/character';

interface PowersEquipmentProps {
  character: Character;
  updateCharacter: (updates: Partial<Character>) => void;
}

export const PowersEquipment: React.FC<PowersEquipmentProps> = ({ 
  character, 
  updateCharacter 
}) => {
  const [newPower, setNewPower] = useState<Omit<Power, 'id'>>({
    name: '',
    cost: 0,
    description: '',
    damage: '',
    range: '',
    duration: ''
  });

  const [newEquipment, setNewEquipment] = useState<Omit<Equipment, 'id'>>({
    name: '',
    type: '',
    description: '',
    bonus: ''
  });

  const addPower = () => {
    if (newPower.name.trim()) {
      const power: Power = {
        ...newPower,
        id: Date.now().toString()
      };
      updateCharacter({
        powers: [...character.powers, power]
      });
      setNewPower({ name: '', cost: 0, description: '', damage: '', range: '', duration: '' });
    }
  };

  const addEquipment = () => {
    if (newEquipment.name.trim()) {
      const equipment: Equipment = {
        ...newEquipment,
        id: Date.now().toString()
      };
      updateCharacter({
        equipment: [...character.equipment, equipment]
      });
      setNewEquipment({ name: '', type: '', description: '', bonus: '' });
    }
  };

  const removePower = (id: string) => {
    updateCharacter({
      powers: character.powers.filter(power => power.id !== id)
    });
  };

  const removeEquipment = (id: string) => {
    updateCharacter({
      equipment: character.equipment.filter(eq => eq.id !== id)
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      {/* Poderes */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center mb-4">
          <Zap className="text-purple-600 mr-2" size={24} />
          <h2 className="text-2xl font-bold text-gray-800">Poderes & Magias</h2>
        </div>

        {/* Lista de Poderes */}
        <div className="space-y-3 mb-4 max-h-80 overflow-y-auto">
          {character.powers.map((power) => (
            <div key={power.id} className="bg-purple-50 rounded-lg p-3 border border-purple-200">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-purple-800">{power.name}</h4>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-purple-700 bg-purple-100 px-2 py-1 rounded">
                    {power.cost} pts
                  </span>
                  <button
                    onClick={() => removePower(power.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              
              <p className="text-sm text-purple-600 mb-2">{power.description}</p>
              
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div>
                  <span className="font-medium">Dano:</span>
                  <div className="text-purple-700">{power.damage || 'N/A'}</div>
                </div>
                <div>
                  <span className="font-medium">Alcance:</span>
                  <div className="text-purple-700">{power.range || 'N/A'}</div>
                </div>
                <div>
                  <span className="font-medium">Duração:</span>
                  <div className="text-purple-700">{power.duration || 'N/A'}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Adicionar Novo Poder */}
        <div className="border-t pt-4">
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Nome do poder"
              value={newPower.name}
              onChange={(e) => setNewPower({...newPower, name: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                placeholder="Custo"
                value={newPower.cost}
                onChange={(e) => setNewPower({...newPower, cost: parseInt(e.target.value) || 0})}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="text"
                placeholder="Dano"
                value={newPower.damage}
                onChange={(e) => setNewPower({...newPower, damage: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Alcance"
                value={newPower.range}
                onChange={(e) => setNewPower({...newPower, range: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="text"
                placeholder="Duração"
                value={newPower.duration}
                onChange={(e) => setNewPower({...newPower, duration: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <textarea
              placeholder="Descrição do poder"
              value={newPower.description}
              onChange={(e) => setNewPower({...newPower, description: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 h-16 resize-none"
            />
            <button
              onClick={addPower}
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors flex items-center justify-center"
            >
              <Plus size={16} className="mr-2" />
              Adicionar Poder
            </button>
          </div>
        </div>
      </div>

      {/* Equipamentos */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center mb-4">
          <Package className="text-orange-600 mr-2" size={24} />
          <h2 className="text-2xl font-bold text-gray-800">Equipamentos</h2>
        </div>

        {/* Lista de Equipamentos */}
        <div className="space-y-3 mb-4 max-h-80 overflow-y-auto">
          {character.equipment.map((equipment) => (
            <div key={equipment.id} className="bg-orange-50 rounded-lg p-3 border border-orange-200">
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <h4 className="font-semibold text-orange-800">{equipment.name}</h4>
                  <span className="text-sm text-orange-600 bg-orange-100 px-2 py-1 rounded">
                    {equipment.type}
                  </span>
                </div>
                <button
                  onClick={() => removeEquipment(equipment.id)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              
              <p className="text-sm text-orange-600 mb-2">{equipment.description}</p>
              
              {equipment.bonus && (
                <div className="text-sm">
                  <span className="font-medium text-orange-700">Bônus:</span>
                  <span className="text-orange-600 ml-1">{equipment.bonus}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Adicionar Novo Equipamento */}
        <div className="border-t pt-4">
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Nome do equipamento"
              value={newEquipment.name}
              onChange={(e) => setNewEquipment({...newEquipment, name: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="text"
              placeholder="Tipo (Arma, Armadura, Item, etc.)"
              value={newEquipment.type}
              onChange={(e) => setNewEquipment({...newEquipment, type: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="text"
              placeholder="Bônus (ex: +1 Força, +2 Armadura)"
              value={newEquipment.bonus}
              onChange={(e) => setNewEquipment({...newEquipment, bonus: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <textarea
              placeholder="Descrição do equipamento"
              value={newEquipment.description}
              onChange={(e) => setNewEquipment({...newEquipment, description: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 h-16 resize-none"
            />
            <button
              onClick={addEquipment}
              className="w-full bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 transition-colors flex items-center justify-center"
            >
              <Plus size={16} className="mr-2" />
              Adicionar Equipamento
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};