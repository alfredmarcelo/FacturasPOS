import { useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
import Lucide from '@react-native-vector-icons/lucide';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import Items from './Items';
import FontAwesome from '@react-native-vector-icons/fontawesome';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import Feather from '@react-native-vector-icons/feather';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import { useNavigation } from '@react-navigation/native';
import AntDesign from '@react-native-vector-icons/ant-design';

export default function Slice({ abrir, setAbrir }) {
  const navigation = useNavigation();
  const left = useSharedValue(-500);

  useEffect(() => {
    left.value = withSpring(abrir ? -0 : -500);
  });

  return (
    <Animated.View style={[Style.Container, { left: left }]}>
      <TouchableOpacity onPress={setAbrir} style={Style.Header}>
        <View style={Style.UserImage}></View>
        <View style={Style.HeaderText}>
          <Text style={{ fontSize: 18 }}>Alfred Varela</Text>
          <Text>Administrador</Text>
        </View>
      </TouchableOpacity>
      <ScrollView stickyHeaderHiddenOnScroll={false} style={Style.body}>
        <Items
          Icon={<AntDesign name="home" size={20} />}
          Nombre={'Inicio'}
          NombreItem1={'Dashboard Principal'}
          IconItem1={<AntDesign name='dashboard' size={20}/>}
          onPress1={() => navigation.navigate('home')}
        />
        <Items
          Icon={<FontAwesome name={'calculator'} size={20} />}
          Nombre={'Contabilidad'}
          NombreItem1={'Facturas'}
          IconItem1={<MaterialDesignIcons name="invoice-outline" size={20} />}
          NombreItem2={'Cotizaciones'}
          IconItem2={
            <MaterialDesignIcons
              name={'invoice-text-multiple-outline'}
              size={20}
            />
          }
          NombreItem3={'Reportes'}
          IconItem3={<Lucide name={'newspaper'} size={19} />}
          NombreItem5={'Ventas'}
          IconItem5={<Feather name="arrow-up-circle" size={20} />}
          NombreItem6={'Compras'}
          IconItem6={<Feather name="arrow-down-circle" size={20} />}
          NombreItem7={'Cuentas por pagar'}
          IconItem7={<Ionicons name="documents-outline" size={20} />}
          NombreItem8={'Cuentas por cobrar'}
          IconItem8={<MaterialIcons name="request-quote" size={20} />}
          onPress1={() => navigation.navigate('Facturas')}
          onPress2={() => navigation.navigate('Cotizaciones')}
          onPress3={() => navigation.navigate('Reportes')}
        />
        <Items
          Icon={<MaterialIcons name={'sell'} size={20} />}
          Nombre={'POS'}
          NombreItem1={'Productos'}
          NombreItem2={'Clientes'}
          r
          NombreItem3={'Provedores'}
        />
      </ScrollView>
    </Animated.View>
  );
}

const Style = StyleSheet.create({
  Container: {
    width: '65%',
    height: '100%',
    position: 'absolute',
    backgroundColor: 'white',
    zIndex: 1,
    display: 'flex',
    borderStartStartRadius: 10,
    elevation: 50,
  },
  Header: {
    width: '100%',
    height: '15%',
    justifyContent: 'flex-start',
    paddingLeft: 10,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    gap: 7,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
  UserImage: {
    width: '25%',
    height: '55%',
    borderRadius: 100,
    backgroundColor: 'black',
  },
  body: {
    width: '100%',
    height: '100%',
  },
});
