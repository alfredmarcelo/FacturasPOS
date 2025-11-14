import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useState } from 'react';
import Slice from '../NavMenu/SliceMenu';
import Profile from '../FrontPanel/Profile';
import ReportesMAP from './ReportesMAP';
import Reportesitems from './ReportesItems';
import { useNavigation } from '@react-navigation/native';
import { TouchableNativeFeedback } from 'react-native';
import DatePicker from 'react-native-date-picker';

export default function Reportes() {
  const navigation = useNavigation();
  const [descargarPlanilla, setdescargarPlanilla] = useState(true);
  const [abrir, setAbrir] = useState(false);
  const [date, setDate] = useState(new Date());
  const [reporte, setreporte] = useState();
  const [open, setOpen] = useState(false);

  const abrircerrar = () => {
    setdescargarPlanilla(prev => !prev);
  };

  const toggleMenu = () => setAbrir(prev => !prev);

  return (
    <View style={style.Container}>
      <Slice abrir={abrir} setAbrir={toggleMenu} />
      <Profile Abrirboton={toggleMenu} />

      {/* CONTENIDO */}
      <ScrollView contentContainerStyle={style.ScrollContent}>
        <View style={style.Body}>
          <ReportesMAP
            NombreReportes="Reportes de Comprobantes Fiscales"
            Reportesitems={
              <Reportesitems
                CodigoReporte={'606'}
                TextoReporte={'Compras'}
                onPress={abrircerrar}
                setreporte={setreporte}
              />
            }
            Reportesitems2={
              <Reportesitems
                CodigoReporte={'607'}
                TextoReporte={'Ventas'}
                onPress={abrircerrar}
                setreporte={setreporte}
              />
            }
            Reportesitems3={
              <Reportesitems
                CodigoReporte={'609'}
                TextoReporte={'Gastos'}
                onPress={abrircerrar}
                setreporte={setreporte}
              />
            }
          />

          <ReportesMAP NombreReportes="Reportes de Retenciones y Contribuciones" />
          <ReportesMAP NombreReportes="Reportes Informativos y Especiales" />
          <ReportesMAP NombreReportes="Declaraciones Complementarias" />
          <ReportesMAP NombreReportes="Reportes Específicos por Sector" />
          <ReportesMAP NombreReportes="Resumen de Ventas y Compras" />
          <ReportesMAP NombreReportes="Reportes de Gastos y Proveedores" />
        </View>
      </ScrollView>

      {/* PANEL DE FECHA */}
      {!descargarPlanilla && (
        <>
          {/* FONDO OSCURO */}
          <TouchableNativeFeedback onPress={abrircerrar}>
            <View style={style.ReporteContainer} />
          </TouchableNativeFeedback>

          {/* PANEL */}
          <View style={style.ReporteBody}>
            <View style={style.Header}>
              <Text style={style.TituloReporte}>
                {reporte ? `Reporte ${reporte}` : 'Selecciona un reporte'}
              </Text>
            </View>

            <View style={style.FechaContent}>
              <Text style={style.Label}>Seleccionar fecha</Text>

              <TouchableOpacity
                onPress={() => setOpen(true)}
                style={style.FechaBtn}
              >
                <Text style={style.FechaTexto}>
                  {date.toLocaleDateString()}
                </Text>
              </TouchableOpacity>

              {/* DATE PICKER */}
              <DatePicker
                modal
                open={open}
                date={date}
                mode="date"
                onConfirm={d => {
                  setOpen(false);
                  setDate(d);
                }}
                onCancel={() => setOpen(false)}
              />

              {/* BOTÓN DESCARGA */}
              <TouchableOpacity style={style.BtnDescargar}>
                <Text style={style.BtnDescargarTexto}>Descargar Archivo</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </View>
  );
}

const style = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  ScrollContent: {
    paddingBottom: 50,
  },

  Body: {
    width: '100%',
    flexGrow: 1,
  },

  ReporteContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#00000055',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 10,
  },

  ReporteBody: {
    width: '90%',
    height: '38%',
    backgroundColor: '#fff',
    position: 'absolute',
    top: '28%',
    left: '5%',
    borderRadius: 15,
    padding: 22,
    elevation: 6,
    shadowColor: '#000',
    zIndex: 11,
  },

  Header: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
  },

  TituloReporte: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
  },

  FechaContent: {
    width: '100%',
    marginTop: 10,
    gap: 15,
  },

  Label: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },

  FechaBtn: {
    width: '60%',
    height: 45,
    backgroundColor: '#f3f3f3',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#dcdcdc',
  },

  FechaTexto: {
    fontSize: 16,
    color: '#444',
  },

  BtnDescargar: {
    marginTop: 20,
    width: '80%',
    height: 50,
    backgroundColor: '#2e7d32',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },

  BtnDescargarTexto: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
});
