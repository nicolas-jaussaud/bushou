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
  },
  'radicals': {
    'en': 'Radicals',
    'fr': 'Radicaux'
  },
  'hsk': {
    'en': 'HSK',
    'fr': 'HSK'
  },
  'words_number': {
    'en': 'Number of words',
    'fr': 'Nombre de mots'
  }
}

export const __ = (index) => {
  return TEXT[index][Settings.data.language] 
}
