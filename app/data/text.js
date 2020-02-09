import Settings from '../classes/Settings';

export const TEXT = {
  'characters_number': {
    'en': 'Number of characters',
    'fr': 'Nombre de charactères'
  },
  'start': {
    'en': 'Start the game',
    'fr': 'Commencer le jeu'
  },
  'locked': {
    'en': 'Locked',
    'fr': 'Verrouillé'
  },
  'round': {
    'en': 'Round',
    'fr': 'Manche'
  },
  'level': {
    'en': 'Level',
    'fr': 'Niveau'
  },
  'close': {
    'en': 'Close',
    'fr': 'Fermer'
  }
}

export const __ = (index) => {
  return TEXT[index][Settings.data.language] 
}
