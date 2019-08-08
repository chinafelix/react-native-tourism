import React, {Component} from 'react'

import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity
} from 'react-native'

import Header from '../common/header'
import BottomNavBar from '../common/bottomNavBar'
import {CommonStyle} from '../common/commonStyle'

class Buyer extends Component {

  constructor(props){
    super(props);
    this.state = {
      hots: [
        {id: '1',title: '明十三陵-定陵',price: 42,isHot: true},
        {id: '2',title: '明十三陵-长陵',price: 57,isHot: true},
        {id: '3',title: '明十三陵-骏陵',price: 38,isHot: true},
        {id: '4',title: '明十三陵-安陵',price: 40,isHot: true},
      ],
      adults: [
        {id: '1',title: '明十三陵-定陵',price: 42,isHot: false},
        {id: '2',title: '明十三陵-长陵',price: 57,isHot: false},
        {id: '3',title: '明十三陵-骏陵',price: 38,isHot: false},
        {id: '4',title: '明十三陵-安陵',price: 40,isHot: false},
      ],
      children: [
        {id: '1',title: '明十三陵-定陵',price: 42,isHot: false},
        {id: '2',title: '明十三陵-长陵',price: 57,isHot: false},
        {id: '3',title: '明十三陵-骏陵',price: 38,isHot: false},
        {id: '4',title: '明十三陵-安陵',price: 40,isHot: false},
      ],
    };
  }

  navigator2Other(to){
    this.props.navigation.navigate(to);
  }

  render(){
    return (
      <View style={style.box}>
        <Header title={'购票'} />
        <ScrollView style={style.content}>
          <View style={style.introduce}>
            <Text>景区介绍</Text>
            <Image source={require('../images/xiayibu.png')} style={{height: 16}} resizeMode={'contain'} />
          </View>
          <View style={{marginTop: 5}}>
            <Text style={style.title}>热销门票</Text>
            <FlatList keyExtractor={this._keyExtractor}
                      data={this.state.hots}
                      renderItem={this.renderItem}
            />
          </View>
          <View style={{marginTop: 5}}>
            <Text style={style.title}>成人门票</Text>
            <FlatList keyExtractor={this._keyExtractor}
                      data={this.state.adults}
                      renderItem={this.renderItem}
            />
          </View>
          <View style={{marginTop: 5}}>
            <Text style={style.title}>学生门票</Text>
            <FlatList keyExtractor={this._keyExtractor}
                      data={this.state.children}
                      renderItem={this.renderItem}
            />
          </View>

        </ScrollView>
        <BottomNavBar active={'Buy'} navigation={this.props.navigation} />
      </View>
    );
  };

  _keyExtractor = (item, index) => item.id;

  renderItem(item){
    return (
      <View style={style.pannel}>
        <View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={style.bold}>{item.item.title}</Text>
            {item.item.isHot && <Text style={style.hots}>热销</Text>}
          </View>
          <Text style={style.grey}>16:00点之前可以预定今日门票</Text>
          <Text style={style.grey}>预定成功后1小时可入园</Text>
          <Text>订票须知</Text>
        </View>
        {/*价格*/}
        <View>
          <View style={style.price}>
            <Text style={style.yellow}>￥{item.item.price}</Text>
            <Text style={style.grey}>起</Text>
          </View>
          <TouchableOpacity>
            <Text style={style.btn}>预定</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const style = StyleSheet.create({
  hots:{
    backgroundColor: CommonStyle.yellow,
    color: CommonStyle.white,
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 2,
    paddingBottom: 2

  },
  btn:{
    width: 67,
    height: 30,
    backgroundColor: CommonStyle.yellow,
    borderRadius: 15,
    color: '#fff',
    lineHeight: 30,
    fontSize: 15,
    textAlign: 'center'
  },

  lightgrey:{
    color: CommonStyle.lightgray,
    fontSize: 12
  },
  yellow:{
    color: CommonStyle.yellow,
    fontSize: 20,
    marginRight: 3
  },
  price:{
    flexDirection: 'row',
    alignItems: 'baseline'
  },
  grey:{
    fontSize: 12,
    color: CommonStyle.lightgray,
    paddingBottom: 5
  },
  bold:{
    fontWeight: 'bold',
    fontSize: 18,
    paddingBottom: 5,
    paddingRight: 5
  },
  pannel:{
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: CommonStyle.background,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    backgroundColor: CommonStyle.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderBottomWidth: 1,
    borderBottomColor: CommonStyle.background
  },
  introduce:{
    backgroundColor: CommonStyle.white,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  box: {
    flex:1,
    backgroundColor: CommonStyle.background
  },
  content: {
    flex: 1
  }
});


export default Buyer;
