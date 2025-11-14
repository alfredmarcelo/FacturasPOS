import { View, Dimensions, StyleSheet } from 'react-native';

const {height} = Dimensions.get('window')


export default function ShowPhoto({LoadIndicator, content} : any) {
  return (
    <View style={styles.photoContainer}>
      <View style={styles.images}>
        {content}
      </View>
      <View style={styles.overlay}>
        {LoadIndicator}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  photoContainer: {
    position: 'absolute',
    top: 100,
    left: 10,
    width: '95%',
    height: height * 0.6,
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: 'transparent',
  },
  images: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '8%',
    backgroundColor: '#252525e0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
