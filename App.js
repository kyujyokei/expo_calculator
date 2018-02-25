import React, { Component } from 'react';
import { StyleSheet, AppRegistry, Text, View } from 'react-native';
import Style from './src/Style';
import InputButton from './src/InputButton';

const inputButtons = [
  [, , , ],
  [4, 5, 6, '*'],
  [7, 8, 9, '-'],
  [0, 'C', '=', '+']
];

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
        previousInputValue:0,
        inputValue: 0,
        selectedSymbol: null
    }
  }

  render() {
      return (
          <View style = {Style.rootContainer}>
              <View style={Style.displayContainer}>
                  <Text style={Style.displayText}>{this.state.inputValue}</Text>
              </View>
              <View style={Style.inputContainer}>
                <View style={Style.inputButtonRow}>
                    <InputButton value={1} onPress={this._onInputButtonPressed.bind(this, 1)}/>
                    <InputButton value={2} onPress={this._onInputButtonPressed.bind(this, 2)}/>
                    <InputButton value={3} onPress={this._onInputButtonPressed.bind(this, 3)}/>
                    <InputButton value={'/'} onPress={this._onInputButtonPressed.bind(this, '/')}/>
                </View>
                <View style={Style.inputButtonRow}>
                    <InputButton value={4} onPress={this._onInputButtonPressed.bind(this, 4)}/>
                    <InputButton value={5} onPress={this._onInputButtonPressed.bind(this, 5)}/>
                    <InputButton value={6} onPress={this._onInputButtonPressed.bind(this, 6)}/>
                    <InputButton value={'*'} onPress={this._onInputButtonPressed.bind(this, '*')}/>
                </View>
                <View style={Style.inputButtonRow}>
                    <InputButton value={7} onPress={this._onInputButtonPressed.bind(this, 7)}/>
                    <InputButton value={8} onPress={this._onInputButtonPressed.bind(this, 8)}/>
                    <InputButton value={9} onPress={this._onInputButtonPressed.bind(this, 9)}/>
                    <InputButton value={'-'} onPress={this._onInputButtonPressed.bind(this, '-')}/>
                </View>
                <View style={Style.inputButtonRow}>
                    <InputButton value={0} onPress={this._onInputButtonPressed.bind(this, 0)}/>
                    <InputButton value={'='} onPress={this._onInputButtonPressed.bind(this, '=')}/>
                    <InputButton value={'C'} onPress={this._onInputButtonPressed.bind(this, 'C')}/>
                    <InputButton value={'+'} onPress={this._onInputButtonPressed.bind(this, '+')}/>
                </View>
              </View>
          </View>
      )
  }

  _onInputButtonPressed(value) {
      switch (typeof value) {
        case 'number':
            return this._handleNumberInput(value)
        case 'string':
            return this._handleStringInput(value)
      }
  }

  _handleNumberInput(num) {
      let inputValue = (this.state.inputValue * 10) + num;

      this.setState({
          inputValue: inputValue
      })
  }

  _handleStringInput(str) {
      switch (str) {
        case '/':
        case '*':
        case '+':
        case '-':
            this.setState({
                selectedSymbol: str,
                previousInputValue: this.state.inputValue,
                inputValue: 0
            });
            break;
        case '=':
            let symbol = this.state.selectedSymbol,
                inputValue = this.state.inputValue,
                previousInputValue = this.state.previousInputValue;
            
            if (!symbol) {
                return;
            }

            this.setState({
                previousInputValue: 0,
                inputValue: eval(previousInputValue + symbol + inputValue),
                selectedSymbol: null
            });
            break;
        case 'C':
            this.setState({
                previousInputValue: 0,
                inputValue: 0,
                selectedSymbol: null
        });
      }
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
