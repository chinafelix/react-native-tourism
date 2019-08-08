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
} from 'react-native'
import {WToast} from 'react-native-smart-tip';

import Header from '../common/header'
import {getDataWithNoToken,postDataWithNoToken} from '../common/http'


class Login extends PureComponent{
  constructor(props){
    super(props);
    this.login = this.login.bind(this);
    this.sendmessage = this.sendmessage.bind(this);
    this.state = {
      phone: '',
      password: '',
      code: '',
      isLogin: true,
      btn_text: '获取验证码',
      isClick: true
    }
  }

  render(){
    const {isLogin,btn_text} = this.state;
    return (
      <View style={styles.box}>
        <Header title={'注册'} back={true} navigation={this.props.navigation} />
        <ScrollView style={styles.content}>
          <View style={styles.input_box}>
            <TextInput dataDetectorTypes={'phoneNumber'} style={styles.input}
                       placeholder={'请输入手机号码'} maxLength={11}
                       blurOnSubmit={true} keyboardType={'phone-pad'}
                       onChangeText={(text) => this.changePhone(text)} value={this.state.phone} />
          </View>
          <View style={styles.input_box}>
            <TextInput dataDetectorTypes={'phoneNumber'} style={styles.input}
                       placeholder={'请输入短信验证码'} maxLength={15}
                       blurOnSubmit={true} value={this.state.code} secureTextEntry={isLogin}
                       onChangeText={(text) => this.changePassword(text)} />
            <TouchableOpacity onPress={this.sendmessage} style={styles.eyes}>
              <View style={[styles.image_box,{width: 80, paddingRight: 10}]}>
                <Text style={{color:'#FF8500'}}>{btn_text}</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.input_box}>
            <TextInput style={styles.input}
                       placeholder={'请输入6~15为的数字/字母组成的密码'} maxLength={6}
                       blurOnSubmit={true} value={this.state.password} secureTextEntry={isLogin}
                       onChangeText={(text) => this.changePassword(text)} />
            <TouchableOpacity onPress={()=>this.changeType()} style={styles.eyes}>
              <View style={styles.image_box}>
                <Image source={isLogin?require('../images/icon-test-2.png'):require('../images/xianshi.png')}
                       style={{height: 60}} resizeMode={'contain'} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.btn}>
            <Button title={'注册'} style={{borderRadius: 4}} onPress={this.login} />
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
  sendmessage(){
    if(!this.state.isClick){
      return false;
    }
    getDataWithNoToken('/api/sms/register.json',{mobile: this.state.phone}).then(res=>{
      if(res.success){
        WToast.show({
          data: res.msg,
          backgroundColor: 'rgba(0,0,0,0.4)'
        });
        let time = 60;
        this.setState({
          btn_text: `${time}s`,
          isClick: false
        });
        this.timer = setInterval(()=>{
          if(time>0){
            time --;
            this.setState({
              btn_text: `${time}s`,
            })
          }else {
            this.setState({
              btn_text: `获取验证码`,
              isClick: true
            })
          }
        },1000)
      }else{
        this.timer && clearTimeout(this.timer);
        this.setState({
          btn_text: `获取验证码`,
          isClick: true
        })
      }
    })
  }

  login(){
    let params = {
      mobile: this.state.phone,
      password: this.state.password,
      smsCode: this.state.code
    };
    postDataWithNoToken('/api/user/register.json',params).then(res=>{
      if(res.success){
        this.props.navigation.goBack();
      }
    })
  }

  changeType(){
    this.setState({
      isLogin: !this.state.isLogin
    })
  }

  componentWillUnmount(): void {
    this.timer && clearTimeout(this.timer);
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
     position: 'relative'
   },
   input:{
     backgroundColor: '#fff',
     paddingLeft: 10,
     borderRadius: 4
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
