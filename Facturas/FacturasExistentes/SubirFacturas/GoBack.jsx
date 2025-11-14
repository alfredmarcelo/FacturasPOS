import { View } from 'react-native';
import Feather from '@react-native-vector-icons/feather';

export default function GoBack({ navigation, colorIcon }) {
  return (
    <View
      style={{
        left: 10,
        width: '100%',
        height: 55,
        position: 'absolute',
        alignContent: 'center',
        justifyContent: 'center',
        marginTop: 3
      }}
    >
      <Feather
        name="arrow-left"
        size={40}
        color={colorIcon}
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}
