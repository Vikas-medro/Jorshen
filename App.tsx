import React from 'react';
import { enableScreens } from 'react-native-screens';
enableScreens();
import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import create_account from './screens/create_account';
import login1 from './screens/login1';
import login2 from './screens/login2';
import Signup from './screens/Signup';
import forgot_password from './screens/forgot_password';
import create_new_password from './screens/create_new_password';
import home_screen from './screens/home_screen';
import setting from './screens/setting';
import profile from './screens/profile';
import bookmarks from './screens/bookmarks';
import search from './screens/search';
import unread from './screens/unread';
import news from './screens/news';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="create_account" component={create_account} />
        <Stack.Screen name="login1" component={login1} />
        <Stack.Screen name="login2" component={login2} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="forgot_password" component={forgot_password} />
        <Stack.Screen name="create_new_password" component={create_new_password} />
        <Stack.Screen name="home_screen" component={home_screen} />
        <Stack.Screen name="setting" component={setting} />
        <Stack.Screen name="profile" component={profile} />
        <Stack.Screen name="bookmarks" component={bookmarks} />
        <Stack.Screen name="search" component={search} />
        <Stack.Screen name="unread" component={unread} />
        <Stack.Screen name="news" component={news} />
            
      </Stack.Navigator>
    </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
