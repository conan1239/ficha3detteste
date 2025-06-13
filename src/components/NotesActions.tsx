import React, { useRef } from 'react';
import { FileText, Save, Download, Upload, RefreshCw, Clock } from 'lucide-react';
import { Character } from '../types/character';

interface NotesActionsProps {
  character: Character;
  updateCharacter: (updates: Partial<Character>) => void;
  exportCharacter: () => void;
  importCharacter: (file: File) => void;
  resetCharacter: () => void;
  lastSaved: Date | null;
}

export const NotesActions: React.FC<NotesActionsProps> = ({
  character,
  updateCharacter,
  exportCharacter,
  importCharacter,
  resetCharacter,
  lastSaved
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      importCharacter(file);
    }
  };

  const handleReset = () => {
    if (confirm('Tem certeza que deseja resetar toda a ficha? Esta ação não pode ser desfeita.')) {
      resetCharacter();
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Notas */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center mb-4">
          <FileText className="text-gray-600 mr-2" size={24} />
          <h2 className="text-2xl font-bold text-gray-800">Notas</h2>
        </div>
        
        <textarea
          value={character.notes}
          onChange={(e) => updateCharacter({ notes: e.target.value })}
          placeholder="Anotações sobre o personagem, história, objetivos, etc..."
          className="w-full h-48 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>

      {/* Ações */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center mb-4">
          <Save className="text-gray-600 mr-2" size={24} />
          <h2 className="text-2xl font-bold text-gray-800">Ações</h2>
        </div>
        
        <div className="space-y-4">
          {/* Status de Salvamento */}
          {lastSaved && (
            <div className="flex items-center text-sm text-green-600 bg-green-50 px-3 py-2 rounded-md">
              <Clock size={16} className="mr-2" />
              Último salvamento: {lastSaved.toLocaleString()}
            </div>
          )}
          
          {/* Pontos de Personagem */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-2">Pontos de Personagem</h3>
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div>
                <label className="block text-gray-600">Total:</label>
                <input
                  type="number"
                  value={character.points.characterPoints}
                  onChange={(e) => updateCharacter({
                    points: {
                      ...character.points,
                      characterPoints: parseInt(e.target.value) || 0
                    }
                  })}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-600">Usados:</label>
                <input
                  type="number"
                  value={character.points.usedPoints}
                  onChange={(e) => updateCharacter({
                    points: {
                      ...character.points,
                      usedPoints: parseInt(e.target.value) || 0
                    }
                  })}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-600">XP:</label>
                <input
                  type="number"
                  value={character.points.experiencePoints}
                  onChange={(e) => updateCharacter({
                    points: {
                      ...character.points,
                      experiencePoints: parseInt(e.target.value) || 0
                    }
                  })}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="space-y-2">
            <button
              onClick={exportCharacter}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              <Download size={16} className="mr-2" />
              Exportar Ficha
            </button>
            
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors flex items-center justify-center"
            >
              <Upload size={16} className="mr-2" />
              Importar Ficha
            </button>
            
            <button
              onClick={handleReset}
              className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors flex items-center justify-center"
            >
              <RefreshCw size={16} className="mr-2" />
              Resetar Ficha
            </button>
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleImport}
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
};