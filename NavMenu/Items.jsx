import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
export default function Items({
  Icon,
  Nombre,
  NombreItem1,
  IconItem1,
  NombreItem2,
  IconItem2,
  NombreItem3,
  IconItem3,
  NombreItem4,
  IconItem4,
  NombreItem5,
  IconItem5,
  NombreItem6,
  IconItem6,
  NombreItem7,
  IconItem7,
  NombreItem8,
  IconItem8,
  onPress1,
  onPress2,
  onPress3,
  onPress4,
  onPress5,
  onPress6,
  onPress7,
  onPress8,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>{Icon}</View>
        <Text style={styles.title}>{Nombre}</Text>
      </View>

      <View style={styles.content}>
        {NombreItem1 && (
          <TouchableOpacity
            style={styles.itemButton}
            activeOpacity={0.7}
            onPress={onPress1}
          >
            {IconItem1}
            <Text style={styles.itemText}>{NombreItem1}</Text>
          </TouchableOpacity>
        )}
        {NombreItem2 && (
          <TouchableOpacity
            style={styles.itemButton}
            activeOpacity={0.7}
            onPress={onPress2}
          >
            {IconItem2}
            <Text style={styles.itemText}>{NombreItem2}</Text>
          </TouchableOpacity>
        )}
        {NombreItem3 && (
          <TouchableOpacity
            style={styles.itemButton}
            activeOpacity={0.7}
            onPress={onPress3}
          >
            {IconItem3}
            <Text style={styles.itemText}>{NombreItem3}</Text>
          </TouchableOpacity>
        )}
        {NombreItem4 && (
          <TouchableOpacity style={styles.itemButton} activeOpacity={0.7}>
            {IconItem4}
            <Text style={styles.itemText}>{NombreItem4}</Text>
          </TouchableOpacity>
        )}
        {NombreItem5 && (
          <TouchableOpacity style={styles.itemButton} activeOpacity={0.7}>
            {IconItem5}
            <Text style={styles.itemText}>{NombreItem5}</Text>
          </TouchableOpacity>
        )}
        {NombreItem6 && (
          <TouchableOpacity style={styles.itemButton} activeOpacity={0.7}>
            {IconItem6}
            <Text style={styles.itemText}>{NombreItem6}</Text>
          </TouchableOpacity>
        )}
        {NombreItem7 && (
          <TouchableOpacity style={styles.itemButton} activeOpacity={0.7}>
            {IconItem7}
            <Text style={styles.itemText}>{NombreItem7}</Text>
          </TouchableOpacity>
        )}
        {NombreItem8 && (
          <TouchableOpacity style={styles.itemButton} activeOpacity={0.7}>
            {IconItem8}
            <Text style={styles.itemText}>{NombreItem8}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '95%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 10,
    shadowRadius: 6,
    marginVertical: 1,
    alignSelf: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#e5e5e5',
    borderBottomWidth: 1,
    paddingBottom: 8,
    marginBottom: 10,
  },
  iconContainer: {
    backgroundColor: '#30f00033',
    padding: 8,
    borderRadius: 8,
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#222',
  },
  content: {
    gap: 8,
  },
  itemButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  itemText: {
    fontSize: 17,
    color: '#444',
  },
});
