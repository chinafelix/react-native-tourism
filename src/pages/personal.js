import React, {Component} from 'react'

import {
  Text,
  View,
  Button,
  StyleSheet,
  Image,
  ScrollView,
  ImageBackground,
  Dimensions,
  DeviceEventEmitter,
  Alert
} from 'react-native'


import BottomNavBar from '../common/bottomNavBar'
import {CommonStyle} from '../common/commonStyle';
import {getData} from '../common/http';

const dimesions = Dimensions.get('window');

class Personal extends Component {

  constructor(props){
    super(props);
    this.login = this.login.bind(this);
    this.state = {
      isLogin: false,
      userInfo:{}
    }
  }

  render(){
    const {isLogin,userInfo} = this.state;
    return (
      <View style={style.box}>
        <ScrollView style={style.content}>
          <View style={style.content_top}>
            <Image source={require('../images/beijing.png')} style={{height: 168,width: dimesions.width}} />
            <ImageBackground source={require('../images/Bitmap.png')} style={style.person_info} resizeMode={'contain'}>
              <View style={style.person_info_box}>
                <Image source={require('../images/touxiang-1.png')} style={[style.avatar]} resizeMode={'contain'} />
                {isLogin?<Text>{userInfo.mobile}</Text>:<Button title={'登录/注册'} onPress={this.login} />}
                <Text style={{color: CommonStyle.lightgray,marginTop: 10}}>"畅游明十三陵，梦回明朝感悟古人智慧~"</Text>
              </View>
            </ImageBackground>
          </View>

          <View style={style.tabs}>
            <View style={style.tab}>
              <Image source={require('../images/zhifu.png')} style={{width: 32}} resizeMode={'contain'} />
              <Text style={style.tab_text}>待支付</Text>
            </View>
            <View style={style.tab}>
              <Image source={require('../images/daishiyong.png')} style={{width: 32}} resizeMode={'contain'} />
              <Text style={style.tab_text}>待使用</Text>
            </View>
            <View style={style.tab}>
              <Image source={require('../images/yishiyong.png')} style={{width: 32}} resizeMode={'contain'} />
              <Text style={style.tab_text}>已取票</Text>
            </View>
            <View style={style.tab}>
              <Image source={require('../images/yiquxiao.png')} style={{width: 32}} resizeMode={'contain'} />
              <Text style={style.tab_text}>已取消</Text>
            </View>
          </View>

          <View style={style.turn}>
            <View style={style.wenzi}>
              <Image source={require('../images/renyuan-2.png')} style={{height: 16, marginRight: 3}} resizeMode={'contain'} />
              <Text>取票人管理</Text>
            </View>
            <Image source={require('../images/xiayibu.png')} style={{height: 16}} resizeMode={'contain'} />
          </View>
          <View style={style.turn}>
            <View style={style.wenzi}>
              <Image source={require('../images/guanyuwomen-.png')} style={{height: 16, marginRight: 3}} resizeMode={'contain'} />
              <Text>关于我们</Text>
            </View>
            <Image source={require('../images/xiayibu.png')} style={{height: 16}} resizeMode={'contain'} />
          </View>
          <View style={style.turn}>
            <View style={style.wenzi}>
              <Image source={require('../images/shezhi.png')} style={{height: 16, marginRight: 3}} resizeMode={'contain'} />
              <Text>账户设置</Text>
            </View>
            <Image source={require('../images/xiayibu.png')} style={{height: 16}} resizeMode={'contain'} />
          </View>

        </ScrollView>
        <BottomNavBar active={'Personal'} navigation={this.props.navigation} />
      </View>
    );
  };

  login(){
    this.props.navigation.navigate('Login');
  }

  componentDidMount(): void {
    this.listen = DeviceEventEmitter.addListener('logined',(opts)=>{
      getData('/api/user/info.json',{}, opts.token).then(res =>{
        if(res.success) {
          this.setState({
            isLogin: true,
            userInfo: res.data
          })
        }
      }).catch(err =>{
        console.log(err);
      });
    })
  }

  componentWillUnmount(): void {
    this.listen.remove();
  }
}

const style = StyleSheet.create({
  wenzi:{
    flexDirection: 'row',
    alignItems: 'center'
  },
  turn: {
    marginTop: 5,
    height: 58,
    justifyContent: 'space-between',
    padding: 15,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  tab_text:{
    fontSize: 12,
    marginTop: 3
  },
  tab:{
    alignItems: 'center'
  },
  tabs:{
    marginTop: 10,
    backgroundColor: '#fff',
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  person_info_box:{
    width: '100%',
    height: '100%',
    paddingTop: 53,
    alignItems: 'center'
  },
  avatar:{
    position: 'absolute',
    top: -25,
    left: '50%',
    marginLeft: -25,
    width: 50
  },
  person_info:{
    width: 345, height: 131,
    position: 'absolute',
    left: '50%',
    marginLeft: -172,
    top: 83
  },
  content_top:{
    height: 214,
    position: 'relative'
  },
  box:{
    flex: 1,
    backgroundColor: CommonStyle.background
  },
  content:{
    flex: 1,
  }
});


export default Personal;
