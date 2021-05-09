import React, { Component } from 'react';
import {  
  StyleSheet, 
  Text, 
  View,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'

import { getUniqID } from '../helpers/random'

import Settings  from '../classes/Settings'
import { getModules } from '../helpers/modules'

// Static data
import { __ } from '../data/text'

export default class Edit extends Component {

  /**
   * Navigation options (hide the top bar)
   */
  static navigationOptions = {
    headerShown: false,
  }

  constructor(props) {
    super(props)
    this.state = {
      modules: {}
    }

    // Need a function for support settings
    this.styles = getStyles()

    this.deleteLevel = this.deleteLevel.bind(this)
  }

  async componentDidMount() {
    this.props.navigation.addListener('didFocus', async () => {
      const module = await getModules()
      this.setState({modules: module.custom})
      this.styles = getStyles()
    })
  }

  /**
   * Delete everything related to the custom level
   */
  async deleteLevel(key) {
    
    // Hide results while deleting
    this.setState({modules: false})

    const modules = [...Settings.data.customLevels].filter(e => e !== key)  

    Settings.set('custom-levels', modules.join(','), async () => {
      
      await AsyncStorage.removeItem('progress-' + key)
      await AsyncStorage.removeItem('progress-' + key)
      
      const module = await getModules()
      this.setState({modules: module.custom})
    })
  }

  /**
   * Renders the page
   */
  render() {

    const { navigate } = this.props.navigation;

    return (
      <View style={this.styles.container}>

        <Text style={this.styles.welcome}>
          部首
        </Text>
        <Text style={this.styles.welcome}>
          { __('delete_levels') }
        </Text>
        <View style={this.styles.levelContainer}>
          <ScrollView style={this.styles.ScrollView}>

          { this.state.modules && Object.keys(this.state.modules).length !== 0 ?
            <>                   
              { Object.keys(this.state.modules).map((key) => {
                
                const module = this.state.modules[key]

                return(
                  <View style={this.styles.item} key={ getUniqID() }>
                    <View style={this.styles.level}>
                      <Text style={this.styles.text}>
                        { module.getTitle() }
                      </Text>
                    </View>
                    <TouchableOpacity style={this.styles.button} onPress={() => this.deleteLevel(key)}>
                      <Text style={[this.styles.text, {fontWeight: 'bold', fontSize: 20}]}>- </Text>
                      <Text style={this.styles.text}>
                        { __('delete') }
                      </Text>
                    </TouchableOpacity>
                  </View>
                )
              })} 
            </>
            : 
              <View style={[this.styles.level, this.styles.borderDashed]}>
                <Text style={[this.styles.text]}>{ __('no_level') }</Text>
              </View>
            }

          </ScrollView>
        </View>
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
  scrollView: {
    width: '100%',
  },
  levelContainer: {
    justifyContent: 'flex-start',
    width: '80%',
    height: '55%',
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginTop: 50,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: Settings.data.colors.primary,
  },
  level: {
    textAlign: 'center',
    color: Settings.data.colors.primary,
    padding: 10,
    color: Settings.data.colors.primary,
    width: '65%',
    paddingLeft: '10%'
  },
  item: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderColor: Settings.data.colors.primary,
    borderWidth: 1,
    marginBottom: 5,
  },
  borderDashed: {
    borderColor: Settings.data.colors.primary,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 1,
    opacity: 0.5,
    width: '100%'
  },
  text: {
    color: Settings.data.colors.primary,
  },
  button: {
    paddingLeft: '5%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
}))
