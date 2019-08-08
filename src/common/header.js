import React, {Component} from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableNativeFeedback
}from 'react-native'

import {CommonStyle} from './commonStyle';

export default class Header extends Component{

  // props:{
  //   title: '十三陵门票'，
  //   back: true/false , 是否显示返回按钮
  //   actions: '删除'     右侧的点击按钮
  // }

  constructor(props){
    super(props);
    this._ondelete = this._ondelete.bind(this);
    this._onBack = this._onBack.bind(this);
  }

  render(){
    let back = this.props.back, actions = this.props.actions;
    return (
      <View style={style.box}>
        <View style={style.right}>
          {back && <TouchableNativeFeedback onPress={this._onBack}>
            <Image source={require('../images/back.png')} resizeMode="center" width={20}></Image>
          </TouchableNativeFeedback>}
        </View>
        <Text style={style.text}>{this.props.title}</Text>
        <View style={style.right}>
          {actions && <TouchableNativeFeedback onPress={this._ondelete}>
            <Text style={style.text}>{this.props.actions}</Text>
          </TouchableNativeFeedback>}
        </View>
      </View>
    );
  };

  _ondelete(){
    if(this.props.actions){
      this.props.navigation.navigate('Register');
    }
  }

  _onBack(){
    this.props.navigation.goBack();
  }
}

const style = StyleSheet.create({
  box: {
    height: 44,
    backgroundColor: CommonStyle.blue,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  text: {
    color: '#fff',
  },
  right: {
    width: 40,
  },
  iconfont: {
    color: '#fff',
    fontSize: 22
  }
});

