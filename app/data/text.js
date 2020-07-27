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
  },
  'keys': {
    'en': 'Keys',
    'fr': 'Clés'
  },
  'characters': {
    'en': 'Characters',
    'fr': 'Charactères'
  },
  'pinyin': {
    'en': 'Pinyin',
    'fr': 'Pinyin'
  },
  'audio': {
    'en': 'Audio',
    'fr': 'Audio'
  },
  'dark_mode': {
    'en': 'Dark Mode',
    'fr': 'Mode Sombre'
  },
  'display': {
    'en': 'Display',
    'fr': 'Affichage'
  },
  'language': {
    'en': 'Language',
    'fr': 'Langue'
  },
  'game': {
    'en': 'Game',
    'fr': 'Jeu'
  },
  'progression': {
    'en': 'Progression',
    'fr': 'Progression'
  },
  'vibrations': {
    'en': 'Vibrations',
    'fr': 'Vibrations'
  },
  'sound': {
    'en': 'Sound',
    'fr': 'Son'
  },
  'settings': {
    'en': 'Settings',
    'fr': 'Paramètres'
  },
  'no_sound': {
    'en': 'Sound is muted',
    'fr': 'Son désactivé'
  }
}

export const __ = (index) => {
  return TEXT[index][Settings.data.language] 
}
