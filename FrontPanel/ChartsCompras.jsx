import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';

export default function Compras() {
  const barData = [
    { value: 250, label: 'Ene' },
    { value: 500, label: 'Feb', frontColor: '#177AD5' },
    { value: 745, label: 'Mar', frontColor: '#177AD5' },
    { value: 320, label: 'May' },
    { value: 600, label: 'Jun', frontColor: '#177AD5' },
    { value: 256, label: 'Ago' },
    { value: 300, label: 'Sep' },
    { value: 600, label: 'Oct', frontColor: '#177AD5' },
    { value: 256, label: 'Nov' },
    { value: 300, label: 'Dic' },
  ];

  return (
    <View style={styles.ChartContent}>
      <View style={styles.Header}>
        <View style={styles.TextHeader}>
          <Text style={styles.HeaderTitle}>Vol. Compras en los últimos meses</Text>
        </View>
        <View style={styles.SeleccionarDatos}>
          <TouchableOpacity style={styles.Dato}>
            <Text style={{ fontWeight: 'bold' }}>Ver</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.ChartStyle}>
        <BarChart
          barWidth={26}
          noOfSections={4}
          barBorderRadius={4}
          data={barData}
          yAxisThickness={0}
          xAxisThickness={0}
          hideRules
          showReferenceLine1
          referenceLine1Position={400}
          referenceLine1Config={{
            color: 'gray',
            dashWidth: 2,
            dashGap: 3,
          }}
          formatYLabel={(label) => `${label}$`}
          height={180}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ChartContent: {
    width: '95%',
    marginTop: 20,
    borderWidth: 0,
    borderRadius: 11,
    backgroundColor: '#e4d4d471',
    alignItems: 'center',
    overflow: 'hidden',
    paddingBottom: 10,
  },
  ChartStyle: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
});
