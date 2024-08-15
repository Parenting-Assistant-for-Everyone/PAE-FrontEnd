import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
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

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator<RootStackParamList>();

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
        <Tab.Screen name="Board" component={DumpScreen} />
        <Tab.Screen name="MyPage" component={DumpScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
