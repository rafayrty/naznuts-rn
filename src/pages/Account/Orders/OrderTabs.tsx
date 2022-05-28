import {useWindowDimensions, Platform, useColorScheme} from 'react-native';
import React from 'react';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';
import {Text} from 'native-base';

import AllOrders from './AllOrders';
import CurrentOrders from './CurrentOrders';
import DeliveredOrders from './DeliveredOrders';

// const SecondRoute = () => (
//   <View style={{flex: 1, backgroundColor: '#673ab7'}} />
// );

// const ThirdRoute = () => <View style={{flex: 1, backgroundColor: '#673ab7'}} />;

const renderScene = SceneMap({
  first: AllOrders,
  second: CurrentOrders,
  third: DeliveredOrders,
});
const renderTabBar: React.FC<any> = props => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <TabBar
      {...props}
      activeColor={'#FFF'}
      tabStyle={{justifyContent: 'center', alignItems: 'center'}}
      labelStyle={{justifyContent: 'center', alignItems: 'center'}}
      renderLabel={({route, focused}: any) => (
        <Text
          fontFamily={'Cairo'}
          fontSize={12}
          fontWeight={800}
          textAlign={'center'}
          style={{color: focused ? '#79C143' : '#BDBDBD'}}>
          {route.title}
        </Text>
      )}
      indicatorStyle={{backgroundColor: '#79C143'}}
      style={{backgroundColor: isDarkMode ? '#333' : '#FFF'}}
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
