/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import moment from 'moment';

function RoundButton({ title, color, background, onPress, disabled}){
    return (
        <TouchableOpacity
            onPress={() => !disabled && onPress()}
            style={[styles.button,{backgroundColor: background}]}>
            <Text style={[styles.buttonTitle, {color}]}>{title}</Text>
        </TouchableOpacity>

    )
}
function ButtonsRow({children}){
    return (
        <View style={styles.buttonsRow}>{children}</View>
    )
}
export default class ClockScreens extends React.Component{
  constructor(props){
  super(props)
  this.state = {
    totalTime: (60*parseFloat(this.props.challengeClockH)) + parseFloat(this.props.challengeClockM),
    currentTime: moment.duration(totalTime, 'minutes'),
    pauseTime: moment.duration(0, 'seconds'),
    currentState: 0,
    decrease: 1,
    timer: null,
    timer2: null,
  }
  this.reduce= this.reduce.bind(this);
  this.pause = this.pause.bind(this);
  this.increase = this.increase.bind(this);
}

   leftPad = (val) => {
      if (val < 10) return '0'+val;

      return val;
    }

  start = () => {
    this.setState({

        decrease:1,
        currentState: 1,
        timer: setInterval(this.reduce, 1000),
    })
  }

  reduce() {
    if(this.state.currentTime.get('hours') == 0 && this.state.currentTime.get('minutes') == 0 && this.state.currentTime.get('seconds') == 0){
        this.done();
        return;
    }

    const newTime = moment.duration(this.state.currentTime);
    newTime.subtract(this.state.decrease, 'seconds');

    this.setState({
        currentTime: newTime,
    })
  }

  pause = () => {
    this.setState({
        currentState: 2,
        decrease:0,
        timer2: setInterval(this.increase, 1000),
    })
  }

  increase(){
    const addTime = moment.duration(this.state.pauseTime);
    addTime.add(1, 'seconds');
    this.setState({
            pauseTime: addTime,
        })

    if(this.state.pauseTime.get('seconds') == 3){
        Alert.alert(
        'Are you here?',
        'Make sure not to get distracted!'
        )
    }
    if(this.state.pauseTime.get('seconds') == 5){
        Alert.alert(
        'Hey,',
        'Comeback!',


        )
    }

    }

  end = () => {
    Alert.alert(
        'Warning',
        'Are you sure you want to quit?',
        [
            {text: 'Yes', onPress: () => this.done()},
            {text: 'No'},
        ],
        {cancelable: false}
    )



  }

  resume = () => {
     this.setState({
             currentState: 1,
             decrease:1,
             pauseTime: moment.duration(0, 'seconds'),
         })
  }

  done(){
    if(this.state.timer){
        clearInterval(this.state.timer)
    }

    this.setState({
        currentState: 3,
        currentTime: moment.duration(0, 'seconds'),
    })
  }


  render() {

    return (
      <View style={styles.container}>
          <View style={styles.timerContainer}>
                <Text style={styles.timer}>{this.leftPad(this.state.currentTime.get('hours'))}: </Text>
                <Text style={styles.timer}>{this.leftPad(this.state.currentTime.get('minutes'))}: </Text>
                <Text style={styles.timer}>{this.leftPad(this.state.currentTime.get('seconds'))} </Text>
          </View>

        {this.state.currentState == 0 && (
         <ButtonsRow>
         <RoundButton
            title='Pause'
            color='#50D167'
            background='#1B361F'
            />
        <RoundButton
            title='Start'
            color='#50D167'
            background='#1B361F'
            onPress={this.start}
            />
           </ButtonsRow>
        )}
        {this.state.currentState == 1 && (
        <ButtonsRow>
        <RoundButton
           title='Pause'
           color='#50D167'
           background='#1B361F'
           onPress={this.pause}
            />
        <RoundButton
            title='End'
            color='#D15050'
            background='#361B1B'
            onPress={this.end}
            />
        </ButtonsRow>
        )}
        {this.state.currentState == 2 && (

        <ButtonsRow>
        <RoundButton
            title='Resume'
            color='#506ED1'
            background='#1B1F36'
            onPress={this.resume}
            />
         <RoundButton
            title='End'
            color='#D15050'
            background='#361B1B'
            onPress={this.end}
            />
         </ButtonsRow>
         )}
          {this.state.currentState == 2 && (
         <View>
         <View style={styles.row2}>

         <Text style={styles.words}>{"You have paused the timer for: "}</Text>
            </View>

         <View style={styles.row}>
         <Text style={styles.words}>{this.leftPad(this.state.pauseTime.get('hours'))}: </Text>
         <Text style={styles.words}>{this.leftPad(this.state.pauseTime.get('minutes'))}: </Text>
         <Text style={styles.words}>{this.leftPad(this.state.pauseTime.get('seconds'))} </Text>
         </View>
         </View>
          )}

        {this.state.currentState == 3 && (
        <Text>{'Done!'}</Text>
        )}
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFF8E1',
    paddingTop: 130,
    paddingHorizontal: 20,
  },
  timer: {
    color: '#0D0D0D',
    fontSize: 76,
    fontWeight: '200',
    width: 110,
  },
  button: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTitle: {
    fontSize: 18,
  },

  buttonsRow: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    marginTop: 80,
  },
  timerContainer: {
    flexDirection: 'row',
  },
  words: {
    fontSize: 20,
  },
  row: {
    flexDirection: 'row',
    marginTop: 30,
    alignSelf: 'center',
  },

  row2: {
    marginTop: 20,
  },

});
