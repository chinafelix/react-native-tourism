import React, {Component} from 'react'

import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Linking,
  FlatList,
  ScrollView
} from 'react-native'
import axios from 'axios'
import Swiper from 'react-native-swiper'

import Header from '../common/header'
import BottomNavBar from '../common/bottomNavBar'

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {data: [
        {
          avatar: require('../images/avatar.jpg'),
          title: '十三陵特区部署“五一”黄金周旅...',
          content: '世界文化遗产、国家5A景区—明十三陵是明朝迁都13位皇帝...',
          time: '2019-04-30',
          id: '1'
        },
        {
          avatar: require('../images/avatar.jpg'),
          title: '十三陵特区部署“五一”黄金周旅...',
          content: '世界文化遗产、国家5A景区—明十三陵是明朝迁都13位皇帝...',
          time: '2019-04-30',
          id: '2'
        },
        {
          avatar: require('../images/avatar.jpg'),
          title: '十三陵特区部署“五一”黄金周旅...',
          content: '世界文化遗产、国家5A景区—明十三陵是明朝迁都13位皇帝...',
          time: '2019-04-30',
          id: '3'
        },
        {
          avatar: require('../images/avatar.jpg'),
          title: '十三陵特区部署“五一”黄金周旅...',
          content: '世界文化遗产、国家5A景区—明十三陵是明朝迁都13位皇帝...',
          time: '2019-04-30',
          id: '4'
        },
        {
          avatar: require('../images/avatar.jpg'),
          title: '十三陵特区部署“五一”黄金周旅...',
          content: '世界文化遗产、国家5A景区—明十三陵是明朝迁都13位皇帝...',
          time: '2019-04-30',
          id: '5'
        },
      ]};

    this.call = this.call.bind(this);
  }

  render(){
    return (
      <View style={style.box}>
        <Header title={'十三陵门票'}></Header>
        <ScrollView style={style.content}>
          <Swiper style={style.wrapper} autoplay={true}>
            <View style={style.slide1}>
              <Image source={require('../images/avatar.jpg')} style={{height: 150}} resizeMode={'cover'} />
            </View>
            <View style={style.slide2}>
              <Image source={require('../images/avatar.jpg')} style={{height: 150}} resizeMode={'cover'} />
            </View>
            <View style={style.slide3}>
              <Image source={require('../images/avatar.jpg')} style={{height: 150}} resizeMode={'cover'} />
            </View>
          </Swiper>
          <View style={style.infos}>
            {/*上*/}
            <View style={style.tianqi}>
              {/*左*/}
              <View>
                <View style={style.tianqi_left}>
                  <Text style={style.title}>明十三陵</Text>
                  <Text style={style.title_text}>5A景区</Text>
                  <Text style={style.title_text}>晴</Text>
                  <Text style={style.title_text}>14~32℃</Text>
                  <Text>优</Text>
                </View>
                <View style={style.flex}>
                  <Image source={require('../images/dizhi.png')} resizeMode={'contain'} style={{height: 16}} />
                  <Text style={style.location}>杭州市滨江区</Text>
                </View>
              </View>
              {/*右*/}
              <View>
                <TouchableOpacity onPress={this.call}>
                  <Image source={require('../images/dianhua-2.png')} />
                </TouchableOpacity>
              </View>
            </View>
            {/*下*/}
            <View style={style.tianqi}>
              <View style={style.pannel}>
                <View>
                  <Text>景区须知</Text>
                  <Text style={style.small}>开放时间，入园须知</Text>
                </View>
                <Image source={require('../images/xiayibu.png')} resizeMode={'contain'} style={{height: 20}} />
              </View>
              <View style={style.pannel}>
                <View>
                  <Text>景区介绍</Text>
                  <Text style={style.small}>景区介绍，开放景点介绍</Text>
                </View>
                <Image source={require('../images/xiayibu.png')} resizeMode={'contain'} style={{height: 20}} />
              </View>
            </View>
          </View>
          {/*news*/}
          <View>
            <View style={style.news_title}>
              <Text style={style.bold}>景区资讯</Text>
              <View style={style.tianqis}>
                <Text style={style.small}>更多</Text>
                <Image source={require('../images/xiayibu.png')} resizeMode={'contain'} />
              </View>
            </View>
            <FlatList data={this.state.data}
              renderItem={this.renderItem}
              keyExtractor={this._keyExtractor}
            />
          </View>
        </ScrollView>
        <BottomNavBar active={'Home'} navigation={this.props.navigation} />
      </View>
    );
  };

  _keyExtractor = (item, index) => item.id;

  renderItem(item){
    return (
      <View style={style.partamer}>
        <Image source={item.item.avatar} style={{width: 118, height: 88, borderRadius: 5}} />
        <View style={style.description}>
          <Text style={{paddingBottom: 5, fontWeight: 'bold'}}>{item.item.title}</Text>
          <Text>{item.item.content}</Text>
          <Text style={{fontSize: 12, paddingTop: 5}}>{item.item.time}</Text>
        </View>
      </View>
    );
  }

  componentDidMount(): void {
    this.getData();
  }

  call(){
    const url = `tel:17817885564`;
    Linking.canOpenURL(url).then(res =>{
      return Linking.openURL(url);
    })
  }

  getData(){
    axios.get('http://test.ming.32ui.cn/ming/api/settings.json').then(res=>{
      // WToast.show({
      //   data: '111111111111',
      //   backgroundColor: 'rgba(0,0,0,0.4)'
      // });
    })
  }

}

const width = Dimensions.get('window').width;

const style = StyleSheet.create({
  wrapper:{
    height: 150
  },
  description: {
    flex: 1,
    paddingLeft: 10,
    justifyContent: 'space-between',
    overflow: 'scroll'
  },
  partamer:{
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  line:{
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000'
  },
  bold:{
    fontSize: 14,
    fontWeight: 'bold'
  },
  news_title:{
    backgroundColor: '#fff',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  small:{
    fontSize: 12,
    color: '#ccc',
  },
  pannel:{
    width: 160,
    height: 60,
    padding: 10,
    backgroundColor: '#F7FBFD',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 5
  },
  box: {
    flexDirection: "column",
    flex: 1,
    backgroundColor: '#eee'
  },
  content: {
    flex: 1,
  },
  infos:{
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10
  },
  tianqis:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tianqi:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15
  },
  tianqi_left:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1
  },
  title_text:{
    marginRight: 5
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 5,
  },
  location:{
    color: '#ccc',
    marginLeft: 5
  },
  flex:{
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10
  }
});

export default Home;
