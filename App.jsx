import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Navigation from './Navigation/StackNavigation';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.Container}>
        <View style={styles.Contenedor}>
          <TouchableOpacity>
            <Text style={{ fontSize: 15, color: 'white' }}>Cliente</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialDesignIcons name="robot" size={25} color={'white'} />
          </TouchableOpacity>
        </View>
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'black',
  },
  Contenedor: {
    justifyContent: 'space-between',
    width: '100%',
    height: '5%',
    alignItems: 'center',
    backgroundColor: 'green',
    flexDirection: 'row',
    padding: 10,
  },
});
