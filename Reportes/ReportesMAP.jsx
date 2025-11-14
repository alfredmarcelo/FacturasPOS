import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function ReportesMAP({
  NombreReportes,
  Reportesitems,
  Reportesitems2,
  Reportesitems3,
}) {
  return (
    <View style={style.Container}>
      <View style={style.Text}>
        <Text style={{ fontSize: 20 }}>{NombreReportes}</Text>
      </View>
      <ScrollView horizontal={true} style={{width: '100%', paddingRight: '100%'}}>
        <View style={style.BoxContainer}>
          {Reportesitems}
          {Reportesitems2}
          {Reportesitems3}
        </View>
      </ScrollView>
    </View>
  );
}

const style = StyleSheet.create({
  BoxContainer: {
    width: '100%',
    flexDirection: 'row',
    paddingRight: 20,
    gap: 15,
  },
  Text: {
    marginTop: 10,
  },
  Container: {
    width: '100%',
    margin: 10,
    borderTopWidth: 0.2,
    borderColor: 'grey',
  },
});
