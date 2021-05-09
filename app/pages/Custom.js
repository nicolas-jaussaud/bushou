import React, { Component } from 'react';
import {  
  StyleSheet, 
  Text, 
  View,
  TextInput,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage'

import FieldContainer from '../components/FieldContainer';
import SectionTitle from '../components/SectionTitle';

import Settings from '../classes/Settings';
import SettingLine from '../components/SettingLine';

import { getUniqID } from '../helpers/random';

// Static data
import { __ } from '../data/text'

export default class Custom extends Component {

  /**
   * Navigation options (hide the top bar)
   */
  static navigationOptions = {
    headerShown: false,
  }

  constructor(props) {
    super(props)
    this.state = {
      name: '',
      newItems: '10',
      maxItems: '10',
      data: 'radicals',
      lives: 3,
      isAcceleration: 'yes',
      isUnlimited: 'yes',
      timeByCharacters: '1',
      targetItem: 'characters',
      answerItems: 'translation',
      roundNumber: '100'
    }

    // Need a function for support settings
    this.styles = getStyles()
    
    this.reloadStyle  = this.reloadStyle.bind(this)
    this.saveData     = this.saveData.bind(this)
    this.isValid      = this.isValid.bind(this)

    this.types = [
      {value: 'audio', label: __('audio')},
      {value: 'characters', label: __('characters')},
      {value: 'pinyin', label: __('pinyin')},
      {value: 'translation', label: __('translation')}
    ]

    this.answerTypes = [
      {value: 'characters', label: __('characters')},
      {value: 'pinyin', label: __('pinyin')},
      {value: 'translation', label: __('translation')}
    ]
  }

  componentDidMount() { 
    this.props.navigation.addListener('didFocus', () => this.reloadStyle())
  }

  /**
   * Change theme when reload
   */
  reloadStyle = () => {
    this.styles = getStyles()
    this.setState({'refresh':0})
  }

  /**
   * Add data as new custom progress if valid
   */
  saveData = () => {

    if( !this.isValid() ) return;
    
    /**
     * We generate a unique ID for this custom progress, and add it to the 
     * settings with the others unique IDs
     * 
     * This unique ID will then be used as the key for saving the custom progress 
     * data as JSON
     */
    const levelID = getUniqID()
    const levels = [...Settings.data.customLevels]
    levels.push(levelID)
    const levelData = JSON.stringify(this.state)

    const { navigate } = this.props.navigation

    Settings.set('custom-levels', levels.join(','), () => {
      AsyncStorage.setItem(levelID, levelData).then(async() => navigate('Home'))
    })
  }
  
  /**
   * Validate data
   */
  isValid = () => {

    if( this.state.name === '') return false
    if( !['radicals', 'hsk1'].includes(this.state.data) ) return false

    if( parseInt(this.state.newItems) === 0 ) return false

    if( this.state.isUnlimited !== 'yes' ) {
      if( parseInt(this.state.maxItems) === 0 ) return false
    }

    return true
  }

  /**
   * Renders the page
   */
  render() {

    return (
      <View style={this.styles.container}>
        <Text style={this.styles.welcome}>
          部首
        </Text>
        <Text style={this.styles.welcome}>
          { __('create_custom') }
        </Text>
        <View style={[this.styles.settingsContainer]}>
          <ScrollView style={[this.styles.settingsScrollView]}>

            <SectionTitle noPadding={ true } text={ __('name') } primary={ Settings.data.colors.primary }/>
            
            <FieldContainer label={ __('name') } primary={ Settings.data.colors.primary }>
              <TextInput
                style={[this.styles.text, this.styles.number]}
                onChangeText={ text => this.setState({name: text}) }
                value={ this.state.name }
              />
            </FieldContainer>

            <SectionTitle text={ __('game') } primary={ Settings.data.colors.primary }/>
            
            <FieldContainer label={ __('lives') } primary={ Settings.data.colors.primary }>
              <Picker
                selectedValue={ this.state.lives }
                name={ 'lives' }
                style={[this.styles.text, this.styles.select]}
                itemStyle={[this.styles.text, {width: '75%'}]}
                onValueChange={(value) => this.setState({lives: value})}>
                  { [...Array(11).keys()].map((index) => {
                    return(
                      <Picker.Item 
                        key={ getUniqID() } 
                        value={ index } 
                        label={ index.toString() } 
                      />
                    )
                  })}
              </Picker>
            </FieldContainer>

            <FieldContainer label={ __('enable_acceleration') } primary={ Settings.data.colors.primary }>
              <SettingLine
                name={ 'isAcceleration' }
                enableValue={ 'yes' }
                disableValue={ 'no' }
                default={ 'yes' }
                callback={ (value) => this.setState({isAcceleration: value})}
              />
            </FieldContainer>
                
            { this.state.isAcceleration !== 'yes' ?   
              <FieldContainer label={ __('time_by_characters') } primary={ Settings.data.colors.primary }>
                <Picker
                  selectedValue={ this.state.timeByCharacters }
                  name={ 'timeByCharacters' }
                  style={[this.styles.text, this.styles.select]}
                  itemStyle={[this.styles.text, {width: '75%'}]}
                  onValueChange={(value) => this.setState({timeByCharacters: value})}>
                    { [...Array(11).keys()].map((index) => {
                      if(index === 0) return;
                      return(
                        <Picker.Item 
                          key={ getUniqID() } 
                          value={ index } 
                          label={ index + ' ' + (index === 1 ? __('second') : __('seconds')) } 
                        />
                      )
                    })}
                </Picker>
              </FieldContainer> : null }

            <FieldContainer label={ __('target_item') } primary={ Settings.data.colors.primary }>
              <Picker
                selectedValue={ this.state.targetItem }
                name={ 'targetItem' }
                style={[this.styles.text, this.styles.select]}
                itemStyle={[this.styles.text, {width: '75%'}]}
                onValueChange={(value) => this.setState({targetItem: value})}>
                  { this.types.map((index) => {
                    return(
                      <Picker.Item 
                        key={ getUniqID() } 
                        value={ index.value } 
                        label={ index.label } 
                      />
                    )
                  }) }
              </Picker>
            </FieldContainer>

            <FieldContainer label={ __('answer_items') } primary={ Settings.data.colors.primary }>
              <Picker
                selectedValue={ this.state.answerItems }
                name={ 'answerItems' }
                style={[this.styles.text, this.styles.select]}
                itemStyle={[this.styles.text, {width: '75%'}]}
                onValueChange={(value) => this.setState({answerItems: value})}>
                  { this.answerTypes.map((index) => {
                    return(
                      <Picker.Item 
                        key={ getUniqID() } 
                        value={ index.value } 
                        label={ index.label } 
                      />
                    )
                  }) }
              </Picker>
            </FieldContainer>
            
            <FieldContainer label={ __('round_number') } primary={ Settings.data.colors.primary }>
              <TextInput
                keyboardType='phone-pad'
                style={[this.styles.text, this.styles.number]}
                onChangeText={ text => {
                  const number = parseInt(text)
                  this.setState({roundNumber: Number.isNaN(number) ? 0 : number}
                )}}
                value={ this.state.roundNumber }
              />
            </FieldContainer>

            <SectionTitle text={ __('data') } primary={ Settings.data.colors.primary }/>

            <FieldContainer label={ __('data_type') } primary={ Settings.data.colors.primary }>
              <Picker
                selectedValue={ this.state.data }
                style={[this.styles.text, this.styles.select]}
                itemStyle={[this.styles.text, {width: '75%'}]}
                onValueChange={(value) => this.setState({data: value})}>
                  <Picker.Item label='Radicals' value='radicals' />
                  <Picker.Item label='HSK 1' value='hsk1' />
              </Picker>
            </FieldContainer>
            
            <FieldContainer label={ __('new_items_by_level') } primary={ Settings.data.colors.primary }>
              <TextInput
                keyboardType='phone-pad'
                style={[this.styles.text, this.styles.number]}
                onChangeText={ text => {
                  const number = parseInt(text)
                  this.setState({newItems: Number.isNaN(number) ? 0 : number}
                )}}
                value={ this.state.newItems }
              />
            </FieldContainer>

            <FieldContainer label={ __('is_unlimited') } primary={ Settings.data.colors.primary }>
              <SettingLine
                name={ 'isUnlimited' }
                enableValue={ 'yes' }
                disableValue={ 'no' }
                default={ 'yes' }
                callback={ (value) => this.setState({isUnlimited: value})}
              />
            </FieldContainer>
            
            { this.state.isUnlimited !== 'yes' ?
              <FieldContainer label={ __('max_items_by_level') } primary={ Settings.data.colors.primary }>
                <TextInput
                  keyboardType='phone-pad'
                  style={[this.styles.text, this.styles.number]}
                  onChangeText={ text => {
                    const number = parseInt(text)
                    this.setState({maxItems: Number.isNaN(number) ? 0 : number}
                  )}}
                  value={ this.state.maxItems }
                />
              </FieldContainer> : null }
          
          </ScrollView>

          <View style={ this.styles.buttonContainer }>
            { this.isValid() ? 
              <TouchableOpacity style={this.styles.button} onPress={() => this.saveData()}>
                <Text style={this.styles.text}>
                  { __('create') }
                </Text>
              </TouchableOpacity> 
            :
              <View style={[this.styles.button, {opacity: 0.3}]}>
                <Text style={[this.styles.text, {opacity: 0.7}]}>
                  { __('create') }
                </Text>
              </View>
            }
          </View>        
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
  settingsContainer: {
    justifyContent: 'flex-start',
    width: '80%',
    height: '55%',
    alignItems: 'flex-start',
    flexDirection: 'column',
    margin: 50
  },
  settingsScrollView: {
    width: '100%',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: Settings.data.colors.primary,
  },
  text: {
    color: Settings.data.colors.primary,
  },
  select: {
    transform: [
      {scale: 0.9}, 
      {translate: [23,0]
    }], 
    height: 30, 
    width: 130
  },
  number: {
    height: 30, 
    width: 100, 
    borderColor: Settings.data.colors.primary, 
    borderWidth: 0.5,
    textAlign: 'center'
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    color: Settings.data.colors.primary,
    marginTop: 20,
    padding: 10,
    borderColor: Settings.data.colors.primary,
    color: Settings.data.colors.primary,
    borderWidth: 1,
    width: '33%',
    flexDirection: 'row',
    justifyContent: 'center'
  }

}))
