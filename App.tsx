import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './component/Home';
import MatchingBoard from './component/MatchingBoard';
import Board from './component/Board';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { WebView } from 'react-native-webview';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
function BoardStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Board" component={Board} options={{ headerShown: false }} />
      <Stack.Screen name="MatchingBoard" component={MatchingBoard} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

// 탭 네비게이션 컴포넌트
function TabNavigator({ navigation }: any) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: string;
          if (route.name === 'Home') {
            iconName = 'home';
          }
          else if (route.name === 'Chat') {
            iconName = 'wechat';
          }
          else if (route.name === 'Board') {
            iconName = 'forum';
          }
          else if (route.name === 'MyPage') {
            iconName = 'person';
          }
          return <Icon name={iconName} size={size} color={color} />;

        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Chat" component={Home} />
      <Tab.Screen name="Board" component={BoardStack} options={{ headerShown: false }} />
      <Tab.Screen name="MyPage" component={Home} />
    </Tab.Navigator>
  );
}
function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName='TabNavigator'>
      <Stack.Screen name="TabNavigator" component={TabNavigator} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

// 전체 네비게이션 구조
export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>

  );
}