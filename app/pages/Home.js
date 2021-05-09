import React, { Component } from 'react';
import {
  StyleSheet, 
  Text, 
  View,
  TouchableOpacity,
  ScrollView
} from 'react-native';

import Settings from '../classes/Settings'

import DarkMode from '../components/DarkMode'
import Language from '../components/Language'
import Popup from '../components/Popup'
import SettingsButton from '../components/SettingsButton'
import Accordion from '../components/Accordion'

import { getUniqID } from '../helpers/random'

// Static data
import { __ } from '../data/text'
import { getModules } from '../helpers/modules'

export default class Home extends Component {

  /**
   * Navigation options (hide the top bar)
   */
  static navigationOptions = {
    headerShown: false,
  }

  constructor(props) {
    super(props)

    this.state = {
      'popup': false,
      'modules': []
    }

    // Need a function for support settings
    this.styles = getStyles()
    
    this.reloadStyle      = this.reloadStyle.bind(this)
    this.getData          = this.getData.bind(this)
    this.isCustomModules  = this.isCustomModules.bind(this)
  }

  componentDidMount() { 
    this.getData()
    this.props.navigation.addListener('didFocus', () => {
      this.getData()
      this.reloadStyle()
    })
  }

  getData = async () => this.setState({modules: await getModules()})

  isCustomModules = () => (
    Object.keys(this.state.modules).length !== 0 && Object.keys(this.state.modules.custom).length !== 0
  )

  isModules = () => (
    Object.keys(this.state.modules).length !== 0 && Object.keys(this.state.modules.static).length !== 0
  )

  /**
   * Change theme when reload
   */
  reloadStyle = () => {
    this.styles = getStyles()
    this.setState({refresh: 0})
  }

  /**
   * Renders the page
   */
  render() {

    const { navigate } = this.props.navigation
    const popup = this.state.popup !== false ? 
      <Popup change={ () => this.reloadStyle() } close={ () => this.setState({'popup': false}) }/> : 
      false 

    return (
      <View style={this.styles.container}>
        { popup }
        <View style={this.styles.header}>
          <DarkMode handler={() => {
            this.setState({refresh: 0})
            this.reloadStyle()
          }}/>
          <Language handler={() => {
            this.setState({popup: true})
            this.reloadStyle()
          }}/>
        </View>

        <View style={this.styles.titleContainer}>
          <Text style={this.styles.welcome}>
            部首
          </Text>
          <Text style={this.styles.welcome}>
            BùShŏu
          </Text>
        </View>
        
        <ScrollView style={this.styles.scrollView}>
          <View style={this.styles.buttonContainer}>

          { this.isModules() ?
            Object.keys(this.state.modules.static).map((category) => {
              
              const modules = this.state.modules.static[category]
              const moduleKeys = Object.keys(this.state.modules.static[category])

              return(
                <Accordion 
                  key={ getUniqID() }
                  label={ category === 'radicals' ? __('radicals') : __('hsk') + ' 1' } 
                  isOpen={ this.state.accordionOpen === category } 
                  handler={ (part) => this.setState({accordionOpen: part}) }
                  part={ category }
                  navigation={ this.props.navigation }
                  primary={ Settings.data.colors.primary }
                >
                 { moduleKeys.map((key) => {

                    const module = modules[key]

                    // If need audio and audio no aivailable we don't give access
                    if( Settings.data.isAudio === 'no' && module.useAudio() ) return(
                      <View key={ getUniqID() } style={[this.styles.button, {opacity: 0.5}]}>
                        <View style={[this.styles.textDisableContainer]}>
                          <Text style={[this.styles.text]}>{ module.getTitle() }</Text>
                          <Text style={[this.styles.text, this.styles.textDisable]}>
                            ({ __('no_sound') })
                          </Text>
                        </View>
                        <Text style={[this.styles.progress]}>
                          { module.getProgressText() }
                        </Text>
                      </View>
                    )

                    return( 
                      <TouchableOpacity key={ getUniqID() } style={[this.styles.button]} onPress={() => navigate('Levels', {key: module.key}) }>
                        <Text style={[this.styles.text]}>{ module.getTitle() }</Text>
                        <Text style={[this.styles.progress]}>
                          { module.getProgressText() }
                        </Text>
                      </TouchableOpacity> 
                    )
                  })}
                </Accordion>
              )
            }) : null }

            <Accordion 
              label={__('custom')} 
              isOpen={this.state.accordionOpen === 'custom'} 
              handler={(part) => this.setState({accordionOpen: part})}
              part={'custom'}
              navigation={this.props.navigation}
              primary={Settings.data.colors.primary}
            >
              <Text style={[this.styles.text, this.styles.betaText]}>
                { Settings.data.language !== 'fr'
                  ? 'Gives the possibility to create a personalized progression (currently in beta).'
                  : 'Donne la possibilité de créer une progression personnalisée (actuellement en beta).' }
                </Text>
              { this.isCustomModules() ?
                <>           
                  { Object.keys(this.state.modules.custom).map((key) => {
                    
                    const module = this.state.modules.custom[key]

                    // If need audio and audio no aivailable we don't give access
                    if( Settings.data.isAudio === 'no' && module.useAudio() ) return(
                      <View key={ getUniqID() } style={[this.styles.button, {opacity: 0.5}]}>
                        <View style={[this.styles.textDisableContainer]}>
                          <Text style={[this.styles.text]}>{ module.getTitle() }</Text>
                          <Text style={[this.styles.text, this.styles.textDisable]}>
                            ({ __('no_sound') })
                          </Text>
                        </View>
                        <Text style={[this.styles.progress]}>
                          { module.getProgressText() }
                        </Text>
                      </View>
                    )
                    
                    return(
                      <TouchableOpacity key={ getUniqID() } style={[this.styles.button]} onPress={() => navigate('Levels', {key: key})}>
                        <Text style={[this.styles.text]}>{ module.get('name') }</Text>
                        <Text style={[this.styles.progress]}>
                          { module.getProgressText() }
                        </Text>
                      </TouchableOpacity>)
                  })}
                </>
                : 
                  <View style={[this.styles.button, this.styles.borderDashed]}>
                    <Text style={[this.styles.text]}>{ __('no_level') }</Text>
                  </View>
                }

                <View style={this.styles.containerCustom}>
                  <TouchableOpacity style={this.styles.customButton} onPress={() => navigate('Custom')}>
                    <Text style={[this.styles.text, {fontWeight: 'bold', fontSize: 20}]}>+ </Text>
                    <Text style={this.styles.text}>
                      { __('add') }
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={this.styles.customButton} onPress={() => navigate('Edit')}>
                    <Text style={[this.styles.text, {fontWeight: 'bold', fontSize: 20}]}>- </Text>
                    <Text style={this.styles.text}>
                      { __('delete') }
                    </Text>
                  </TouchableOpacity>
                </View>
            </Accordion>

          </View>
        </ScrollView>
        
        <TouchableOpacity style={this.styles.containerSettings} onPress={() => navigate('Options')}>
          <SettingsButton/>
          <Text style={this.styles.text}>
            { __('settings') }
          </Text>
        </TouchableOpacity>

      </View>
    );
  }
}

const getStyles = () => (StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Settings.data.colors.background,
    color: Settings.data.colors.primary,
  },
  titleContainer: {
    height: '20%',
    width: '100%',
    marginTop: '30%',
    alignItems: 'center'
  },
  scrollView: {
    width: '100%',
    height: '25%',
  },
  containerSettings: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 30
  },
  containerCustom: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingTop: '5%'
  },
  customButton: {
    marginLeft: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    flexDirection: 'column',
  },
  header: {
    flex: 1,
    width: '100%',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 999,
    position: 'absolute',
    top: 10,
    left: 0,
    height: 80,
    paddingLeft: 10,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: Settings.data.colors.primary,
  },
  button: {
    textAlign: 'center',
    color: Settings.data.colors.primary,
    marginBottom: 5,
    padding: 10,
    borderColor: Settings.data.colors.primary,
    color: Settings.data.colors.primary,
    borderWidth: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  text: {
    color: Settings.data.colors.primary,
  },
  textDisableContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  textDisable: {
    fontStyle: 'italic',
    marginLeft: 5
  },
  progress: {
    color: Settings.data.colors.primary,
  },
  textButton: {
    textAlign: 'center',
    color: Settings.data.colors.primary,
    marginBottom: 5,
    padding: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  borderDashed: {
    borderColor: Settings.data.colors.primary,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 1,
    opacity: 0.5
  },
  betaText: {
    fontStyle: 'italic',
    paddingBottom: 15
  }
}))
