import Settings from '../classes/Settings';

export const languages = [
  {
    code: 'en', 
    label: 'English'
  },{
    code: 'es', 
    label: 'Español'
  },{
    code: 'fr', 
    label: 'Français'
  }
]

export const TEXT = {
  'characters_number': {
    'en': 'Number of characters',
    'es': 'Número de caracteres',
    'fr': 'Nombre de caractères'
  },
  'start': {
    'en': 'Start the game',
    'es': 'Iniciar el juego',
    'fr': 'Commencer le jeu'
  },
  'locked': {
    'en': 'Locked',
    'es': 'Bloqueado',
    'fr': 'Verrouillé'
  },
  'round': {
    'en': 'Round',
    'es': 'Ronda',
    'fr': 'Manche'
  },
  'level': {
    'en': 'Level',
    'es': 'Nivel',
    'fr': 'Niveau'
  },
  'close': {
    'en': 'Close',
    'es': 'Cerrar',
    'fr': 'Fermer'
  },
  'radicals': {
    'en': 'Radicals',
    'es': 'Radicales',
    'fr': 'Radicaux'
  },
  'hsk': {
    'en': 'HSK',
    'es': 'HSK',
    'fr': 'HSK'
  },
  'words_number': {
    'en': 'Number of words',
    'es': 'Número de palabras',
    'fr': 'Nombre de mots'
  },
  'keys': {
    'en': 'Radicals',
    'es': 'Radicales',
    'fr': 'Clés'
  },
  'characters': {
    'en': 'Characters',
    'es': 'Caracteres',
    'fr': 'Caractères'
  },
  'pinyin': {
    'en': 'Pinyin',
    'es': 'Pinyin',
    'fr': 'Pinyin'
  },
  'audio': {
    'en': 'Audio',
    'es': 'Audio',
    'fr': 'Audio'
  },
  'dark_mode': {
    'en': 'Dark Mode',
    'es': 'Modo oscuro',
    'fr': 'Mode Sombre'
  },
  'display': {
    'en': 'Display',
    'es': 'Presentación',
    'fr': 'Affichage'
  },
  'language': {
    'en': 'Language',
    'es': 'Idioma',
    'fr': 'Langue'
  },
  'game': {
    'en': 'Game',
    'es': 'Juego',
    'fr': 'Jeu'
  },
  'progression': {
    'en': 'Progression',
    'es': 'Progreso',
    'fr': 'Progression'
  },
  'vibrations': {
    'en': 'Vibrations',
    'es': 'Vibración',
    'fr': 'Vibrations'
  },
  'sound': {
    'en': 'Sound',
    'es': 'Sonido',
    'fr': 'Son'
  },
  'settings': {
    'en': 'Settings',
    'es': 'Ajustes',
    'fr': 'Paramètres'
  },
  'no_sound': {
    'en': 'Sound is muted',
    'es': 'Sonido desactivado',
    'fr': 'Son désactivé'
  },
  'traditional': {
    'en': 'Traditional',
    'es': 'Tradicional',
    'fr': 'Traditionnel'
  },
  'simplified': {
    'en': 'Simplified',
    'es': 'Simplificado',
    'fr': 'Simplifié'
  },
  'custom': {
    'en': 'Custom',
    'es': 'Personalizado',
    'fr': 'Personnalisé'
  },
  'add': {
    'en': 'Add',
    'es': 'Agregar',
    'fr': 'Ajouter'
  },
  'delete': {
    'en': 'Delete',
    'es': 'Borrar',
    'fr': 'Supprimer'
  },
  'delete_levels': {
    'en': 'Delete Levels',
    'es': 'Borrar los niveles',
    'fr': 'Supprimer les Niveaux'
  },
  'no_level': {
    'en': 'No custom level yet',
    'es': 'Aún no hay un nivel personalizado',
    'fr': 'Pas encore de niveau'
  },
  'create_custom': {
    'en': 'Custom creation',
    'es': 'Creación personalizada',
    'fr': 'Création personnalisée'
  },
  'data': {
    'en': 'Data',
    'es': 'Datos',
    'fr': 'Données'
  },
  'data_type': {
    'en': 'Data to learn',
    'es': 'Qué aprender',
    'fr': 'Données à apprendre'
  },
  'new_items_by_level': {
    'en': 'New items by level',
    'es': 'Nuevos ítems por nivel',
    'fr': 'Nouveaux items par niveau'
  },
  'enable_acceleration': {
    'en': 'Enable acceleration',
    'es': 'Activar aceleración',
    'fr': 'Activer l\'accélération'
  },
  'time_by_characters': {
    'en': 'Time by character',
    'es': 'Tiempo por caracter',
    'fr': 'Temps par caractère'
  },
  'seconds': {
    'en': 'seconds',
    'es': 'segundos',
    'fr': 'secondes'
  },
  'second': {
    'en': 'second',
    'es': 'segundo',
    'fr': 'seconde'
  },
  'lives': {
    'en': 'Lives',
    'es': 'Vidas',
    'fr': 'Vies'
  },
  'is_unlimited': {
    'en': 'Unlimited caracters number',
    'es': 'Cantidad ilimitada de caracteres',
    'fr': 'Nombre illimité de caractères',
  },
  'max_items_by_level': {
    'en': 'Max items by level',
    'es': 'Máximo de ítems por nivel',
    'fr': 'Items max par niveau'
  },
  'create': {
    'en': 'Create',
    'es': 'Crear',
    'fr': 'Créer'
  },
  'name': {
    'en': 'Name',
    'es': 'Nombre',
    'fr': 'Nom'
  },
  'target_item': {
    'en': 'Target item',
    'es': 'Ítem visible',
    'fr': 'Item cible'
  },
  'answer_items': {
    'en': 'Answer items',
    'es': 'Ítem de respuesta',
    'fr': 'Items réponses'
  },
  'translation': {
    'en': 'Translation',
    'es': 'Traducción',
    'fr': 'Traduction'
  },
  'round_number': {
    'en': 'Number of rounds',
    'es': 'Cantidad de rondas',
    'fr': 'Nombre de manche'
  },
  'custom_progress_beta': {
    'en': 'Gives the possibility to create a personalized progression (currently in beta).',
    'es': 'Tienes la posibilidad de crear una progresión personalizada (actualmente en beta).',
    'fr': 'Donne la possibilité de créer une progression personnalisée (actuellement en beta).'
  }
}

export const __ = index => (TEXT[index][Settings.data.language])
