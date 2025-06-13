export interface Character {
  // Dados Básicos
  name: string;
  player: string;
  concept: string;
  origin: string;
  
  // Atributos
  attributes: {
    force: number;
    skill: number;
    resistance: number;
    armor: number;
    firepower: number;
  };
  
  // Características Derivadas
  characteristics: {
    healthPoints: number;
    currentHealthPoints: number;
    magicPoints: number;
    currentMagicPoints: number;
    focusPoints: number;
    currentFocusPoints: number;
  };
  
  // Vantagens e Desvantagens
  advantages: Advantage[];
  disadvantages: Disadvantage[];
  
  // Perícias
  skills: Skill[];
  
  // Magias/Poderes
  powers: Power[];
  
  // Equipamentos
  equipment: Equipment[];
  
  // Pontos
  points: {
    characterPoints: number;
    experiencePoints: number;
    usedPoints: number;
  };
  
  // Notas
  notes: string;
}

export interface Advantage {
  id: string;
  name: string;
  cost: number;
  description: string;
}

export interface Disadvantage {
  id: string;
  name: string;
  cost: number;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
  attribute: string;
  modifier: number;
  description: string;
}

export interface Power {
  id: string;
  name: string;
  cost: number;
  description: string;
  damage: string;
  range: string;
  duration: string;
}

export interface Equipment {
  id: string;
  name: string;
  type: string;
  description: string;
  bonus: string;
}