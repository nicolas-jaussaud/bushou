import Settings from '../classes/Settings'
import Module from '../classes/models/Module'

/**
 * HSK and Radical base modules has parameters stored in
 * a static JSON file instead of in AsyncStorage
 */
const staticModules = {
  'radicals': [
    'radicals',
    'radicals-pinyin',
    'radicals-audio',
  ],
  'hsk1': [
    'hsk1',
    'hsk1-pinyin',
    'hsk1-audio',
  ],
  'hsk1-2026': [
    'hsk1-2026',
    'hsk1-2026-pinyin',
    'hsk1-2026-audio',
  ],
  'hsk2': [
    'hsk2',
    'hsk2-pinyin',
    'hsk2-audio',
  ],
  'hsk2-2026': [
    'hsk2-2026',
    'hsk2-2026-pinyin',
    'hsk2-2026-audio',
  ]
}

// Legacy modules are the pre-2026 HSK lists, hidden unless the setting is enabled
const legacyModules = ['hsk1', 'hsk2']

/**
 * Get levels created by the user
 */
export const getModules = async () => {

  const moduleKeys = Settings.data.customLevels
  const staticCategory = Object.keys(staticModules).filter(
    category => (
          Settings.data.isLegacyHsk === 'yes'
      || ! legacyModules.includes(category)
    )
  )

  const modules = {
    static: {},
    custom: {}
  }

  // Static modules
  for (let i = 0; i < staticCategory.length; i++) {

    modules.static[ staticCategory[i] ] = {}

    for (let k = 0; k < staticModules[ staticCategory[i] ].length; k++) {
      const key = staticModules[ staticCategory[i] ][k]
      modules.static[ staticCategory[i] ][ key ] = await getModule(key)
    } 
  } 

  // Custom modules
  for (let i = 0; i < moduleKeys.length; i++) {
    modules.custom[ moduleKeys[i] ] = await getModule(moduleKeys[i])
  } 

  return modules
}

export const getModule = async key => (await new Module(key))
