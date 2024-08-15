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
import MatchingBoardDetail from './component/Board/MatchingBoardDetail';
import CreateMatchingBoard from './component/Board/CreateMatchingBoard';
import LocationAssistant from './component/Board/LocationAssistant';
import HomeScreen from './screens/HomeScreen';
import ItemListScreen from './screens/Market/ItemListScreen';
import SearchScreen from './screens/Market/SearchScreen';
import ItemDetailScreen from './screens/Market/ItemDetailScreen';
import ItemEditScreen from './screens/Market/ItemEditScreen';
import DumpScreen from './screens/DumpScreen';
import ItemRegisterScreen from './screens/Market/ItemRegisterScreen';
import InfoBoardScreen from './screens/InfoBoard/InfoBoardScreen';
import QuestionBoardScreen from './screens/QuestionBoard/QuestionBoardScreen';
import ConcernBoardScreen from './screens/ConcernBoard/ConcernBoardScreen';
import QuestionPostDetailScreen from './screens/QuestionBoard/QuestionPostDetailScreen';
import InfoPostDetailScreen from './screens/InfoBoard/InfoPostDetailScreen';
import ConcernPostDetailScreen from './screens/ConcernBoard/ConcernPostDetailScreen';
import PostRegisterScreen from './screens/ConcernBoard/PostRegisterScreen'
import InfoPostRegisterScreen from './screens/InfoBoard/InfoRegister'
import QuestionRegister from './screens/QuestionBoard/QuestionRegister'
import ChatListScreen from './screens/chat/ChatListScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator<RootStackParamList>();
function BoardStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Board" component={Board} options={{ headerShown: false }} />
      <Stack.Screen name="MatchingBoard" component={MatchingBoard} options={{ headerShown: false }} />
      <Stack.Screen name="MatchingBoardDetail" component={MatchingBoardDetail} options={{ headerShown: false }}/>
      <Stack.Screen name="CreateMatchingBoard" component={CreateMatchingBoard} options={{ headerShown: false }}/>
      <Stack.Screen name="LocationAssistant" component={LocationAssistant} options={{ headerShown: false }}/>
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
export type RootStackParamList = {
  Home: undefined;
  ItemListScreen: undefined;
  SearchScreen: undefined;
  ItemDetailScreen: { item: any };
  ItemEditScreen: { item: any };
  ItemRegisterScreen: undefined;
  ConcernBoardScreen: undefined;
  QuestionBoardScreen: undefined;
  InfoBoardScreen: undefined;
  QuestionPostDetailScreen: { post: any };
  InfoPostDetailScreen: { post: any };
  ConcernPostDetailScreen: { post: any };
  PostRegisterScreen: undefined;
  InfoRegister: undefined;
  QuestionRegister: undefined;
};


function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name="ItemListScreen" component={ItemListScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name="SearchScreen" component={SearchScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name="ItemDetailScreen" component={ItemDetailScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name="ItemEditScreen" component={ItemEditScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name="ItemRegisterScreen" component={ItemRegisterScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name="QuestionBoardScreen" component={QuestionBoardScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name="ConcernBoardScreen" component={ConcernBoardScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name="InfoBoardScreen" component={InfoBoardScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name="QuestionPostDetailScreen" component={QuestionPostDetailScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name="InfoPostDetailScreen" component={InfoPostDetailScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name="ConcernPostDetailScreen" component={ConcernPostDetailScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name="PostRegisterScreen" component={PostRegisterScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name="InfoRegister" component={InfoPostRegisterScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name="QuestionRegister" component={QuestionRegister} options={{ headerShown: false }} />
      <Stack.Screen name="Board" component={Board} options={{ headerShown: false }} />
      <Stack.Screen name="MatchingBoard" component={MatchingBoard} options={{ headerShown: false }} />
      <Stack.Screen name="MatchingBoardDetail" component={MatchingBoardDetail} options={{ headerShown: false }}/>
      <Stack.Screen name="CreateMatchingBoard" component={CreateMatchingBoard} options={{ headerShown: false }}/>
      <Stack.Screen name="LocationAssistant" component={LocationAssistant} options={{ headerShown: false }}/>
    </HomeStack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = '';

            switch (route.name) {
              case 'Home':
                iconName = focused ? 'home' : 'home-outline';
                break;
              case 'Chat':
                iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
                break;
              case 'Board':
                iconName = focused ? 'clipboard' : 'clipboard-outline';
                break;
              case 'MyPage':
                iconName = focused ? 'person' : 'person-outline';
                break;
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        })}
      >
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="Chat" component={ChatListScreen} />
        <Tab.Screen name="Board" component={HomeStackScreen} />
        <Tab.Screen name="MyPage" component={DumpScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
} 