import Settings from '../classes/Settings'
import Module from '../classes/models/Module'

/**
 * HSK and Radical base modules has parameters stored in
 * a static JSON file instead of in AsyncStorage
 */
const staticModules = {
  radicals: [
    'radicals'
  ],
  hsk1: [
    'hsk1',
    'hsk1-pinyin',
    'hsk1-audio',
  ]
}

/**
 * Get levels created by the user
 */
export const getModules = async () => {
  
  const moduleKeys = Settings.data.customLevels
  const staticCategory = Object.keys(staticModules)
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
