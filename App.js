import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Home from './screens/Home';

import CreateEmployee from './screens/CreateEmployee';
import Codage from './screens/Codage';
import Decodage from './screens/Decodage';


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Provider as PaperProvider } from 'react-native-paper';
import HashPage from './screens/HashPage';
import CraquagePage from './screens/CraquagePage';
import CrypSym from './screens/CrypSym';
import DeCrypSym from './screens/DeCrypSym'
import CrypASym from './screens/CrypASym';
import DeCrypASym from './screens/DeCrypASym';
// store = data center 3andha reducer ybaadel fih

import { LogBox } from 'react-native';
console.disableYellowBox = true;

const Stack = createStackNavigator();

function App() {
  return (
    <View style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Codage" component={Codage} />
        <Stack.Screen name="Decodage" component={Decodage} />
        <Stack.Screen name="Hachage" component={HashPage} />
        <Stack.Screen name="Craquer mot de passe" component={CraquagePage} />
        <Stack.Screen name="Crypt Symetrique" component={CrypSym} />
        <Stack.Screen name="DeCrypt Symetrique" component={DeCrypSym} />
        <Stack.Screen name="Crypt/sign ASymetrique" component={CrypASym} />
        <Stack.Screen name="DeCrypt/verify ASymetrique" component={DeCrypASym} />
      </Stack.Navigator>

    </View>
  );
}

export default () => {
  

  return (

    <NavigationContainer>
      <PaperProvider>
        <App />
      </PaperProvider>
    </NavigationContainer>

  );

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0e0e0',



  },
});
