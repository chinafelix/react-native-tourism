import React, {Component} from 'react'
import {Text, TouchableOpacity, View, StyleSheet,Dimensions,Image,Alert} from 'react-native';


class BottomNavBar extends Component{
  constructor(props){
    super(props);
  }

  _navigator2Other(to){
    const {navigation, active} = this.props;
    if(active !== to){
      navigation.push(to);
    }
  };

  render(){
    const {active} = this.props;
    return (
      <View style={style.nav}>
        <TouchableOpacity onPress={()=>this._navigator2Other('Home')}>
          <View style={style.btn}>
            <Image source={active==='Home'?require('../images/shouye.png'):require('../images/shouye-1.png')}
            style={{height: 30}} resizeMode='contain' />
            <Text style={active==='Home'?style.active: style.text}>首页</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>this._navigator2Other('Buy')}>
          <View style={style.btn}>
            <Image source={active==='Buy'?require('../images/goupiao.png'):require('../images/goupiao-1.png')} />
            <Text style={active==='Buy'?style.active: style.text}>购票</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>this._navigator2Other('Personal')}>
          <View style={style.btn}>
            <Image source={active==='Personal'?require('../images/gerenzhongxin.png'):require('../images/gerenzhongxin-1.png')} />
            <Text style={active==='Personal'?style.active: style.text}>个人中心</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const {width} = Dimensions.get('window');

const style = StyleSheet.create({
  nav:{
    height: 50,
    flexDirection: 'row',
    borderTopColor: '#ccc',
    borderTopWidth: 1,
    backgroundColor: '#fff'
  },
  btn: {
    width: width/3,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },
  text: {
    color: '#343434'
  },
  active: {
    color: '#01A3FE'
  }
});

export default BottomNavBar;
