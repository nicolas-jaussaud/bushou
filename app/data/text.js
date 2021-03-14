import Settings from '../classes/Settings';

export const TEXT = {
  'characters_number': {
    'en': 'Number of characters',
    'fr': 'Nombre de caractères'
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
    'fr': 'Caractères'
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
  },
  'traditional': {
    'en': 'Traditional',
    'fr': 'Traditionnel'
  },
  'simplified': {
    'en': 'Simplified',
    'fr': 'Simplifié'
  },
  'custom': {
    'en': 'Custom',
    'fr': 'Personalisé'
  },
  'add': {
    'en': 'Add',
    'fr': 'Ajouter'
  },
  'delete': {
    'en': 'Delete',
    'fr': 'Supprimer'
  },
  'no_level': {
    'en': 'No custom level yet',
    'fr': 'Pas encore de niveau'
  },
  'create_custom': {
    'en': 'Custom creation',
    'fr': 'Création personalisé'
  },
  'data': {
    'en': 'Data',
    'fr': 'Data'
  },
  'data_type': {
    'en': 'Data to learn',
    'fr': 'Données à apprendre'
  },
  'new_items_by_level': {
    'en': 'New items by level',
    'fr': 'Nouveaux items par niveau'
  },
  'enable_acceleration': {
    'en': 'Enable acceleration',
    'fr': 'Activer l\'accélération'
  },
  'time_by_characters': {
    'en': 'Time by character',
    'fr': 'Temps par caractère'
  },
  'seconds': {
    'en': 'seconds',
    'fr': 'secondes'
  },
  'second': {
    'en': 'second',
    'fr': 'seconde'
  },
  'lives': {
    'en': 'Lives',
    'fr': 'Vies'
  },
  'is_unlimited': {
    'en': 'Unlimited caracters number',
    'fr': 'Nombre ilimité de caractères',
  },
  'max_items_by_level': {
    'en': 'Max items by level',
    'fr': 'Items max par niveau'
  },
  'create': {
    'en': 'Create',
    'fr': 'Créer'
  },
  'name': {
    'en': 'Name',
    'fr': 'Nom'
  },
}

export const __ = index => (TEXT[index][Settings.data.language])
