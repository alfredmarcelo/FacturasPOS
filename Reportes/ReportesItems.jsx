import { Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Reportesitems({
  CodigoReporte,
  TextoReporte,
  onPress,
  setreporte,
}) {
  const handlePress = () => {
    if (setreporte) setreporte(CodigoReporte); 
    if (onPress) onPress();
  };

  return (
    <TouchableOpacity
      style={style.Box}
      activeOpacity={0.8}
      onPress={handlePress}
    >
      <Text style={style.Codigo}>{CodigoReporte}</Text>
      <Text style={style.Texto}>{TextoReporte}</Text>
    </TouchableOpacity>
  );
}


const style = StyleSheet.create({
  Box: {
    width: 185,
    height: 150,
    marginTop: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#d1d1d1',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    padding: 10,
  },
  Codigo: {
    fontSize: 28,
    fontWeight: '600',
    color: '#2e7d32',
  },
  Texto: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
    marginTop: 8,
  },
});
