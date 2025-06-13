import React from 'react';
import { Scroll } from 'lucide-react';
import { useCharacter } from './hooks/useCharacter';
import { BasicInfo } from './components/BasicInfo';
import { Attributes } from './components/Attributes';
import { Characteristics } from './components/Characteristics';
import { AdvantagesDisadvantages } from './components/AdvantagesDisadvantages';
import { PowersEquipment } from './components/PowersEquipment';
import { NotesActions } from './components/NotesActions';

function App() {
  const {
    character,
    updateCharacter,
    exportCharacter,
    importCharacter,
    resetCharacter,
    isLoading,
    lastSaved,
  } = useCharacter();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando ficha...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Scroll className="text-blue-600 mr-3" size={32} />
            <h1 className="text-4xl font-bold text-gray-800">Ficha de Personagem</h1>
          </div>
          <p className="text-xl text-gray-600">3D&T - Defensores de Tóquio</p>
          <div className="mt-2 text-sm text-gray-500">
            Salvamento automático ativo • Última atualização: {lastSaved ? lastSaved.toLocaleTimeString() : 'Nunca'}
          </div>
        </div>

        {/* Componentes da Ficha */}
        <div className="max-w-7xl mx-auto space-y-6">
          <BasicInfo character={character} updateCharacter={updateCharacter} />
          
          <Attributes character={character} updateCharacter={updateCharacter} />
          
          <Characteristics character={character} updateCharacter={updateCharacter} />
          
          <AdvantagesDisadvantages character={character} updateCharacter={updateCharacter} />
          
          <PowersEquipment character={character} updateCharacter={updateCharacter} />
          
          <NotesActions
            character={character}
            updateCharacter={updateCharacter}
            exportCharacter={exportCharacter}
            importCharacter={importCharacter}
            resetCharacter={resetCharacter}
            lastSaved={lastSaved}
          />
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500">
          <p>Ficha para RPG 3D&T • Desenvolvida com ❤️ para a comunidade RPG</p>
        </div>
      </div>
    </div>
  );
}

export default App;