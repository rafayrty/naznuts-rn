import {View, useWindowDimensions, Platform} from 'react-native';
import React from 'react';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';
import {Text} from 'native-base';

import AllOrders from './AllOrders';

const SecondRoute = () => (
  <View style={{flex: 1, backgroundColor: '#673ab7'}} />
);

const ThirdRoute = () => <View style={{flex: 1, backgroundColor: '#673ab7'}} />;

const renderScene = SceneMap({
  first: AllOrders,
  second: SecondRoute,
  third: ThirdRoute,
});
const renderTabBar: React.FC<any> = props => {
  return (
    <TabBar
      {...props}
      tabStyle={{justifyContent: 'center', alignItems: 'center'}}
      labelStyle={{justifyContent: 'center', alignItems: 'center'}}
      renderLabel={({route, focused}: any) => (
        <Text
          fontFamily={'Cairo'}
          fontSize={10}
          textAlign={'center'}
          style={{color: focused ? 'blue' : '#000'}}>
          {route.title} ({route.number})
        </Text>
      )}
      indicatorStyle={{backgroundColor: 'blue'}}
      style={{backgroundColor: '#fff'}}
    />
  );
};
const OrderTabs = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'كل الطلبات', number: 5},
    {key: 'second', title: 'الطلبات الحالية', number: 0},
    {key: 'third', title: 'الطلبات السابقة', number: 0},
  ]);

  return (
    <TabView
      swipeEnabled={Platform.OS === 'ios' ? true : false}
      renderTabBar={renderTabBar}
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
    />
  );
};

export default OrderTabs;
