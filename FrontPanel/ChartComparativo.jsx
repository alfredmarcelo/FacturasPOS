import { LineChart } from 'react-native-gifted-charts';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Comparacion() {
  const lineData = [
    { value: 0, label: '10 Ene' },
    { value: 10, label: '10 Feb' },
    { value: 8, label: '10 Mar' },
    { value: 58, label: '10 Abr' },
    { value: 56, label: '10 May' },
    { value: 78, label: '10 Jun' },
    { value: 74, label: '10 Jul' },
    { value: 98, label: '10 Ago' },
    { value: 78, label: '10 Sep' },
    { value: 74, label: '10 Oct' },
    { value: 98, label: '10 Nov' },
    { value: 98, label: '10 Dic' },
  ];

  const lineData2 = [
    { value: 0 },
    { value: 20 },
    { value: 18 },
    { value: 40 },
    { value: 36 },
    { value: 60 },
    { value: 54 },
    { value: 85 },
    { value: 80 },
    { value: 69 },
    { value: 90 },
    { value: 80 },
  ];

  return (
    <View style={styles.ChartContent}>
      <View style={styles.Header}>
        <View style={styles.TextHeader}>
          <Text style={styles.HeaderTitle}>Ventas y Compras</Text>
        </View>
        <View style={styles.SeleccionarDatos}>
          <TouchableOpacity style={styles.Dato}>
            <Text style={{ fontWeight: 'bold' }}>Ver</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.ChartStyle}>
        <LineChart
          rotateLabel
          data={lineData}
          data2={lineData2}
          height={220}
          spacing={50}
          initialSpacing={0}
          verticalLinesColor="transparent"
          color1="#1E90FF"
          color2="#FFA500"
          textColor1="#444"
          dataPointsHeight={6}
          dataPointsWidth={0}
          dataPointsColor1="#1E90FF"
          dataPointsColor2="#FFA500"
          textShiftY={-6}
          textFontSize={11}
          thickness={2}
          xAxisThickness={0}
          yAxisThickness={0}
          formatYLabel={label => `${label}$`}
        />
      </View>
      <View style={styles.Footer}>
        <View style={styles.Contenedor}>
          <View
            style={[styles.ContenedorColor, { backgroundColor: '#1E90FF' }]}
          ></View>
          <Text>Ventas</Text>
        </View>
        <View style={styles.Contenedor}>
          <View
            style={[styles.ContenedorColor, { backgroundColor: '#FFA500' }]}
          ></View>
          <Text>Compras</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ChartContent: {
    width: '95%',
    height: 350,
    marginTop: 20,
    borderWidth: 0,
    borderRadius: 11,
    backgroundColor: '#e4d4d471',
    alignItems: 'center',
  },
  ChartStyle: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
  },
  Header: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  TextHeader: {
    width: '70%',
    height: '100%',
    backgroundColor: '#30f000ff',
    borderBottomRightRadius: 100,
    borderTopLeftRadius: 10,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  HeaderTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  SeleccionarDatos: {
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Dato: {
    width: '70%',
    height: 35,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7fa89fff',
  },
  Footer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 50,
    height: 40,
    marginTop: 10
  },
  Contenedor: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  ContenedorColor: {
    width: 20,
    height: 10,
    marginRight: 5,
  },
});
