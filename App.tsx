import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SplashScreen from './component/SplashScreen';
import MatchingBoard from './component/MatchingBoard';
import Board from './component/Board';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { WebView } from 'react-native-webview';
import MatchingBoardDetail from './component/Board/MatchingBoardDetail';
import CreateMatchingBoard from './component/Board/CreateMatchingBoard';
import LocationAssistant from './component/Board/LocationAssistant';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './screens/HomeScreen';
import WhendayPage from './screens/Login/WhendayPage';
import RegularPageScreen from './screens/Login/RegularpageScreen';
import SpecificScreen from './screens/Login/SpecificScreen';
import EndScreen from './screens/Login/EndScreen';
import ItemListScreen from './screens/Market/ItemListScreen';
import SearchScreen from './screens/Market/SearchScreen';
import ItemDetailScreen from './screens/Market/ItemDetailScreen';
import ItemEditScreen from './screens/Market/ItemEditScreen';
import ItemRegisterScreen from './screens/Market/ItemRegisterScreen';
import MyItemsScreen from './screens/Market/MyItemsScreen';
import FavoriteItemsScreen from './screens/Market/FavoriteItemsScreen';
import DumpScreen from './screens/DumpScreen';
import InfoBoardScreen from './screens/InfoBoard/InfoBoardScreen';
import EducationPost1 from './screens/InfoBoard/EducationPost1';
import EducationPost2 from './screens/InfoBoard/EducationPost2';
import HealthPost1 from './screens/InfoBoard/HealthPost1';
import HealthPost2 from './screens/InfoBoard/HealthPost2';
import LifePost1 from './screens/InfoBoard/LifePost1';
import LifePost2 from './screens/InfoBoard/LifePost2';
import QuestionBoardScreen from './screens/QuestionBoard/QuestionBoardScreen';
import ConcernBoardScreen from './screens/ConcernBoard/ConcernBoardScreen';
import QuestionPostDetailScreen from './screens/QuestionBoard/QuestionPostDetailScreen';
import ConcernPostDetailScreen from './screens/ConcernBoard/ConcernPostDetailScreen';
import PostRegisterScreen from './screens/ConcernBoard/PostRegisterScreen'
import QuestionRegister from './screens/QuestionBoard/QuestionRegister'
import ChatListScreen from './screens/chat/ChatListScreen';
import Profile from './component/Board/Profile';
import Home from './component/Home/Home';
import ChatDetailScreen from './screens/chat/ChatDetailScreen';
import MyPageScreen from './screens/MyPage/MyPageScreen';
import AddChildScreen from './screens/MyPage/AddChildScreen';
import NannyPageScreen from './screens/MyPage/NannyPageScreen';
import ProfileEditScreen from './screens/MyPage/ProfileEditScreen';
import EditChildScreen from './screens/MyPage/EditChildScreen';
import NannyRecordScreen from './screens/MyPage/NannyRecordScreen';
import ProfileScreen from './screens/MyPage/ProfileScreen';
import NannyProfileEditScreen from './screens/MyPage/NannyProfileEditScreen';
import SignupForm from './screens/Join/SignupForm';
import ParentSignup from './screens/Join/ParentSignup';
import MemberType from './screens/Join/MemberType';
import LocationSignup from './screens/Join/LocationSignup';
import ChildSignup from './screens/Join/ChildSignup';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator<RootStackParamList>();
const ChatStack = createStackNavigator<RootStackParamList>();
const MyPageStack = createStackNavigator<RootStackParamList>();
const LoginStack = createStackNavigator<RootStackParamList>();
function BoardStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="BoardHome" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="MatchingBoard" component={MatchingBoard} options={{ headerShown: false }} />
      <Stack.Screen name="MatchingBoardDetail" component={MatchingBoardDetail} options={{ headerShown: false }} />
      <Stack.Screen name="CreateMatchingBoard" component={CreateMatchingBoard} options={{ headerShown: false }} />
      <Stack.Screen name="LocationAssistant" component={LocationAssistant} options={{ headerShown: false }} />
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
  ConcernPostDetailScreen: { post: any };
  PostRegisterScreen: undefined;
  QuestionRegister: undefined;
  ChatListScreen: undefined;
  EducationPost1: undefined;
  EducationPost2: undefined;
  HealthPost1: undefined;
  HealthPost2: undefined;
  LifePost1: undefined;
  LifePost2: undefined;
  ChatDetailScreen: { chat: any };
  MyPageScreen: undefined;
  MyItemsScreen: undefined;
  FavoriteItemsScreen: undefined;
  NannyPageScreen: undefined;
  ProfileScreen: undefined;
  WhendayPage: undefined;
  RegularpageScreen: undefined;
  SpecificScreen: undefined;
  EndScreen: undefined;
  AddChildScreen: { addChild: (newChild: any) => void };
  ProfileEditScreen: { name: string; updateProfile: (updatedProfile: any) => void };
};


// 홈 스택 네비게이터
function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <HomeStack.Screen name="ItemListScreen" component={ItemListScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name="SearchScreen" component={SearchScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name="ItemDetailScreen" component={ItemDetailScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name="ItemEditScreen" component={ItemEditScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name="ItemRegisterScreen" component={ItemRegisterScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name="QuestionBoardScreen" component={QuestionBoardScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name="ConcernBoardScreen" component={ConcernBoardScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name="InfoBoardScreen" component={InfoBoardScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name="QuestionPostDetailScreen" component={QuestionPostDetailScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name="ConcernPostDetailScreen" component={ConcernPostDetailScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name="PostRegisterScreen" component={PostRegisterScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name="QuestionRegister" component={QuestionRegister} options={{ headerShown: false }} />
      <Stack.Screen name="Board" component={Board} options={{ headerShown: false }} />
      <Stack.Screen name="MatchingBoard" component={MatchingBoard} options={{ headerShown: false }} />
      <Stack.Screen name="MatchingBoardDetail" component={MatchingBoardDetail} options={{ headerShown: false }} />
      <Stack.Screen name="CreateMatchingBoard" component={CreateMatchingBoard} options={{ headerShown: false }} />
      <Stack.Screen name="LocationAssistant" component={LocationAssistant} options={{ headerShown: false }} />
      <Stack.Screen name="ProfileDetail" component={Profile} options={{ headerShown: false }} />
      <HomeStack.Screen name="EducationPost1" component={EducationPost1} options={{ headerShown: false }} />
      <HomeStack.Screen name="EducationPost2" component={EducationPost2} options={{ headerShown: false }} />
      <HomeStack.Screen name="HealthPost1" component={HealthPost1} options={{ headerShown: false }} />
      <HomeStack.Screen name="HealthPost2" component={HealthPost2} options={{ headerShown: false }} />
      <HomeStack.Screen name="LifePost1" component={LifePost1} options={{ headerShown: false }} />
      <HomeStack.Screen name="LifePost2" component={LifePost2} options={{ headerShown: false }} />
      <HomeStack.Screen name="MyItemsScreen" component={MyItemsScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name="FavoriteItemsScreen" component={FavoriteItemsScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name="MyItemDetailScreen" component={ItemDetailScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ChildSignup" component={ChildSignup} options={{ headerShown: false }} />
      <Stack.Screen name="LocationSignup" component={LocationSignup} options={{ headerShown: false }} />
      <Stack.Screen name="MemberType" component={MemberType} options={{ headerShown: false }} />
      <Stack.Screen name="ParentSignup" component={ParentSignup} options={{ headerShown: false }} />
      <Stack.Screen name="SignupForm" component={SignupForm} options={{ headerShown: false }} />
      <LoginStack.Screen name="WhendayPage" component={WhendayPage} options={{ headerShown: false }} />
      <LoginStack.Screen name="RegularPageScreen" component={RegularPageScreen} options={{ headerShown: false }} />
      <LoginStack.Screen name="SpecificScreen" component={SpecificScreen} options={{ headerShown: false }} />
      <LoginStack.Screen name="EndScreen" component={EndScreen} options={{ headerShown: false }} />

    </HomeStack.Navigator>
  );
}

// 채팅 스택 네비게이터
function ChatStackScreen() {
  return (
    <ChatStack.Navigator>
      <ChatStack.Screen name="ChatListScreen" component={ChatListScreen} options={{ headerShown: false }} />
      <ChatStack.Screen name="ChatDetailScreen" component={ChatDetailScreen} options={{ headerShown: false }} />
    </ChatStack.Navigator>
  );
}

// 마이페이지 스택 네비게이터
function MyPageStackScreen() {
  return (
    <MyPageStack.Navigator>
      <MyPageStack.Screen name="MyPageScreen" component={MyPageScreen} options={{ headerShown: false }} />
      <MyPageStack.Screen name="NannyPageScreen" component={NannyPageScreen} options={{ headerShown: false }} />
      <MyPageStack.Screen name="AddChildScreen" component={AddChildScreen} options={{ headerShown: false }} />
      <MyPageStack.Screen name="ProfileEditScreen" component={ProfileEditScreen} options={{ headerShown: false }} />
      <MyPageStack.Screen name="NannyProfileEditScreen" component={NannyProfileEditScreen} options={{ headerShown: false }} />
      <MyPageStack.Screen name="EditChildScreen" component={EditChildScreen} options={{ headerShown: false }} />
      <MyPageStack.Screen name="NannyRecordScreen" component={NannyRecordScreen} options={{ headerShown: false }} />
      <MyPageStack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }} />
    </MyPageStack.Navigator>
  );
}

// 로그인 플로우 네비게이터
function LoginStackScreen() {
  return (
    <LoginStack.Navigator>
      <LoginStack.Screen name="WhendayPage" component={WhendayPage} options={{ headerShown: false }} />
      <LoginStack.Screen name="RegularPageScreen" component={RegularPageScreen} options={{ headerShown: false }} />
      <LoginStack.Screen name="SpecificScreen" component={SpecificScreen} options={{ headerShown: false }} />
      <LoginStack.Screen name="EndScreen" component={EndScreen} options={{ headerShown: false }} />
    </LoginStack.Navigator>
  );
}

// 메인 네비게이터 (로그인 플로우 -> 메인 앱)
export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1800); // 2초 후에 로딩 종료

    return () => clearTimeout(timeout);
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }
  return (
      <NavigationContainer>
        <LoginStack.Navigator>
          <LoginStack.Screen name="MainApp" component={MainAppTabs} options={{ headerShown: false }} />
          <LoginStack.Screen name="LoginFlow" component={LoginStackScreen} options={{ headerShown: false }} />
        </LoginStack.Navigator>
      </NavigationContainer>
  );
}

// 메인 앱 탭 네비게이터
function MainAppTabs() {
  return (
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
      <Tab.Screen name="Chat" component={ChatStackScreen} />
      <Tab.Screen name="Board" component={BoardStack} />
      <Tab.Screen name="MyPage" component={MyPageStackScreen} />
    </Tab.Navigator>
  );
}
