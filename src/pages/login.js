import React, {PureComponent} from 'react'
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  Button,
  Image,
  TouchableOpacity,
  DeviceEventEmitter,
  KeyBoard
} from 'react-native'


import CommonStyle from '../common/commonStyle'
import Header from '../common/header'
import {postDataWithNoToken} from '../common/http'

import {NavigationActions} from 'react-navigation';

class Login extends PureComponent{
  constructor(props){
    super(props);
    this.login = this.login.bind(this);
    this.navigationActions = this.navigationActions.bind(this);
    // this.changeType = this.changeType.bind(this);
    this.state = {
      phone: '',
      password: '',
      isLogin: true
    }
  }

  navigationActions(){
    const navigationAction = NavigationActions.navigate({
      routeName: 'Register',
      params: {source: 'test'},
    });
    this.props.navigation.dispatch(navigationAction);
  }

  render(){
    const {isLogin} = this.state;
    return (
      <View style={styles.box}>
        <Header title={'登录'} back={true} actions={'注册'} navigation={this.props.navigation} />
        <ScrollView style={styles.content} keyboardShouldPersistTaps="handled">
          <View style={styles.input_box}>
            <TextInput dataDetectorTypes={'phoneNumber'} style={styles.input}
                       placeholder={'请输入手机号码'} maxLength={11}
                       blurOnSubmit={true} keyboardType={'phone-pad'}
                       onChangeText={(text) => this.changePhone(text)} value={this.state.phone} />
          </View>
          <View style={styles.input_box}>
            <TextInput style={styles.input}
                       placeholder={'请输入6~15为的数字/字母组成的密码'} maxLength={15}
                       blurOnSubmit={true} value={this.state.password} secureTextEntry={isLogin}
                       onChangeText={(text) => this.changePassword(text)}/>
            <TouchableOpacity onPress={()=>this.changeType()} style={styles.eyes}>
              <View style={styles.image_box}>
                <Image source={isLogin?require('../images/icon-test-2.png'):require('../images/xianshi.png')}
                       style={{height: 60}} resizeMode={'contain'} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.btn}>
            <Button title={'登录'} style={{borderRadius: 4}} onPress={this.login} />
            {/*<Button title={'测试'} style={{borderRadius: 4}} onPress={this.navigationActions} />*/}
          </View>
          <View style={{alignItems: 'flex-end'}}>
            <Text style={{color: '#FF8500',fontSize: 14}}>忘记密码?</Text>
          </View>
        </ScrollView>
      </View>
    );
  }


  changePhone(text){
    this.setState({
      phone: text
    })
  }
  changePassword(text){
    this.setState({
      password: text
    })
  }

  login(){
    let params = {
      mobile: this.state.phone,
      password: this.state.password
    };
    postDataWithNoToken('/api/user/login.json',params).then(res=>{
      if(res.success){
        this.props.navigation.goBack();
        DeviceEventEmitter.emit('logined', {token: res.data.token});
      }
    })
  }

  changeType(){
    this.setState({
      isLogin: !this.state.isLogin
    })
  }
}

 const styles = StyleSheet.create({
   box:{
     flex: 1
   },
   content:{
     flex: 1,
     backgroundColor: '#F5F8F9',
     paddingTop: 30,
     paddingLeft: 15,
     paddingRight: 15,
   },
   input_box:{
     marginBottom: 15,
     position: 'relative',
     backgroundColor: '#fff',
     borderRadius: 4
   },
   input:{
     paddingLeft: 10,
   },
   btn:{
     marginTop:25,
     height: 54,
   },
   eyes:{
     position: 'absolute',
     top: '50%',
     marginTop: -20,
     right: 0,
     zIndex: 9999
   },
   image_box:{
     justifyContent: 'center',
     alignItems: 'center',
     width: 60,
     height: 40
   },
 });

export default Login;
