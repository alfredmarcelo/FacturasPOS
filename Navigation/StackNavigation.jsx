import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FrontPanel from '../FrontPanel/FrontPanel';
import Facturas from '../Facturas/Facturas';
import Agregar from '../Facturas/AgregarFacturas';
import AgregarProducto from '../Facturas/AgregarProducto';
import MetododePagos from '../Facturas/EnviarFactura';
import FacturasExistentesPanel from '../Facturas/FacturasExistentes/FacturasExistentesPanel';
import Camara from '../Facturas/FacturasExistentes/SubirFacturas/Camara';
import LlenadoManual from '../Facturas/FacturasExistentes/SubirFacturas/LlenadoManual';
import Cotizaciones from '../Cotizaciones/Cotizaciones';
import CrearCotizacion from '../Cotizaciones/CrearCotizacion';
import EnviarCotizacion from '../Cotizaciones/EnviarCotizacion';
import Reportes from '../Reportes/Reportes';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={FrontPanel}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Facturas"
        component={Facturas}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AgregarFactura"
        component={Agregar}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BuscarProducto"
        component={AgregarProducto}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MetodosdePago"
        component={MetododePagos}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FacturasExistentesPanel"
        component={FacturasExistentesPanel}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Camara"
        component={Camara}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LlenadoManual"
        component={LlenadoManual}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Cotizaciones"
        component={Cotizaciones}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CrearCotizacion"
        component={CrearCotizacion}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EnviarCotizacion"
        component={EnviarCotizacion}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Reportes"
        component={Reportes}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
