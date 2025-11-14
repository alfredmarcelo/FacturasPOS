import { ScrollView, StyleSheet, Text, View, Dimensions } from 'react-native';
import Linea from './LineaResumen';
import IA from './PanelIA';
import Compras from './ChartsCompras';
import Comparacion from './ChartComparativo';
import Profile from './Profile';
import Slice from '../NavMenu/SliceMenu';
import { useState } from 'react';

const { height } = Dimensions.get('window');

export default function FrontPanel() {
  const [abrir, setAbrir] = useState(false);

  const toggleMenu = () => {
    setAbrir(prev => !prev);
  };

  return (
    <View style={styles.Container}>
      <Slice abrir={abrir} setAbrir={toggleMenu} />
      <Profile Abrirboton={toggleMenu} />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.headerText}>Resumen General</Text>
        </View>
        <Linea />
        <IA />
        <Compras />
        <Comparacion />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    width: '100%',
    height: height,
    flex: 1,
    bottom: 0,
    backgroundColor: '#f6f6f6',
    borderBottomEndRadius: 0,
    borderBottomStartRadius: 0,
    maxHeight: '100%',
  },
  scrollContent: {
    alignItems: 'center',
    paddingBottom: '100%',
    gap: 15,
  },
  header: {
    width: '100%',
    height: '5%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 15
  },
  headerText: {
    fontSize: 40,
    fontFamily: 'ui-sans-serif',
  },
});
