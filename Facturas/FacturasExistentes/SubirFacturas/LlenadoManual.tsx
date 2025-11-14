import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import GoBack from './GoBack';
import DropDownPicker from 'react-native-dropdown-picker';
import { Alert } from 'react-native';

export default function LlenadoManual({ navigation }: { navigation: any }) {
  // Estados de los dropdowns
  const [tipoOpen, setTipoOpen] = useState(false);
  const [tipoValue, setTipoValue] = useState(null);
  const [tipoItems, setTipoItems] = useState([
    { label: '606', value: '606' },
    { label: '607', value: '607' },
  ]);

  const [paraOpen, setParaOpen] = useState(false);
  const [paraValue, setParaValue] = useState(null);
  const [paraItems, setParaItems] = useState([
    { label: 'Alfred', value: 'cliente-Alfred' },
    { label: 'Miguel', value: 'cliente-Miguel' },
  ]);

  // Estados de los campos de texto
  const [rnc, setRnc] = useState('');
  const [ncf, setNcf] = useState('');
  const [fecha, setFecha] = useState('');
  const [subtotal, setSubtotal] = useState('');
  const [itbis, setItbis] = useState('');
  const [total, setTotal] = useState('');
  const [verificar, setVerificar] = useState(false);

  // Función para borrar los campos
  const borrarCampos = () => {
    setRnc('');
    setNcf('');
    setFecha('');
    setSubtotal('');
    setItbis('');
    setTotal('');
    setTipoValue(null);
    setParaValue(null);
  };

  const completar = async () => {
    if (!rnc || !ncf || !fecha || !subtotal || !itbis || !total) {
      Alert.alert('Por favor, completa todos los campos.');
      return;
    } else {
      const res = await fetch('http://192.168.8.106:8000/Buscar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          RNC: rnc,
          NCF: ncf,
          FECHA: fecha,
          SUBTOTAL: subtotal,
          TOTAL: total,
          Para: paraValue,
          tipoValue: tipoValue
        }),
      });
      const data = await res.json();
      if (data.resultado === 'Encontrado') {
        Alert.alert('RNC verificado con éxito.');
        setVerificar(true);
      } else {
        Alert.alert('RNC no encontrado. Por favor, verifique.');
      }
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.Container}>
        <View style={styles.Header}>
          <View style={{ width: '100%' }}>
            <GoBack navigation={navigation} />
          </View>
        </View>

        <View style={styles.FillContainer}>
          <Text style={styles.Textfont}>Llenado Manual</Text>

          <View style={styles.DropdownContainer}>
            <View style={styles.Dropdown}>
              <Text>Tipo: </Text>
              <DropDownPicker
                open={tipoOpen}
                value={tipoValue}
                items={tipoItems}
                setOpen={setTipoOpen}
                setValue={setTipoValue}
                setItems={setTipoItems}
                placeholder=""
                style={{ borderColor: '#ccc' }}
                dropDownContainerStyle={{ width: 138 }}
              />
            </View>

            <View style={styles.Dropdown}>
              <Text>Para: </Text>
              <DropDownPicker
                open={paraOpen}
                value={paraValue}
                items={paraItems}
                setOpen={setParaOpen}
                setValue={setParaValue}
                setItems={setParaItems}
                placeholder=""
                style={{ borderColor: '#ccc' }}
                dropDownContainerStyle={{ width: 138 }}
              />
            </View>
          </View>

          <TextInput
            style={styles.TextInputfont}
            placeholder="RNC"
            placeholderTextColor={'grey'}
            value={rnc}
            keyboardType="numeric"
            onChangeText={setRnc}
          />
          <TextInput
            style={styles.TextInputfont}
            placeholder="NCF"
            placeholderTextColor={'grey'}
            value={ncf}
            onChangeText={setNcf}
          />
          <TextInput
            style={styles.TextInputfont}
            placeholder="FECHA"
            placeholderTextColor={'grey'}
            value={fecha}
            onChangeText={setFecha}
          />
          <TextInput
            style={styles.TextInputfont}
            placeholder="SUBTOTAL"
            placeholderTextColor={'grey'}
            keyboardType="numeric"
            value={subtotal}
            onChangeText={setSubtotal}
          />
          <TextInput
            style={styles.TextInputfont}
            placeholder="ITBIS"
            placeholderTextColor={'grey'}
            keyboardType="numeric"
            value={itbis}
            onChangeText={setItbis}
          />
          <TextInput
            style={styles.TextInputfont}
            placeholder="TOTAL"
            placeholderTextColor={'grey'}
            keyboardType="numeric"
            value={total}
            onChangeText={setTotal}
          />

          <View style={styles.ButtonsContainer}>
            <TouchableOpacity
              style={[styles.buttons, { backgroundColor: '#c91212ff' }]}
              onPress={borrarCampos}
            >
              <Text style={{ color: 'white' }}>Borrar Campos</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttons} onPress={completar}>
              <Text style={{ color: 'white' }}>Completar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#ebe8e8ff',
  },
  Header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 10,
  },
  FillContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  Textfont: {
    fontSize: 30,
  },
  TextInputfont: {
    backgroundColor: 'white',
    width: '70%',
    height: '6%',
    borderRadius: 10,
    marginTop: 20,
    color: 'black',
    paddingHorizontal: 10,
  },
  ButtonsContainer: {
    flexDirection: 'row',
    marginTop: 30,
    width: '60%',
    height: 'auto',
    justifyContent: 'space-between',
  },
  buttons: {
    backgroundColor: '#5ee659',
    width: '45%',
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  DropdownContainer: {
    width: '100%',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    alignItems: 'center',
  },
  Dropdown: {
    width: '32%',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
});
