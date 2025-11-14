import { View, StyleSheet, Text } from "react-native";
import FontAwesome from '@react-native-vector-icons/fontawesome';
import { useNavigation } from "@react-navigation/native";

export default function Structura({Headername, content, Footer}){
    const navigation = useNavigation()
    return(
    <View style={style.Container}>
      <View style={style.header}>
        <FontAwesome
          name="close"
          size={23}
          color={'black'}
          onPress={() => navigation.goBack()}
        />
        <View style={style.HeaderText}>
          <Text style={{ fontSize: 20 }}>{Headername}</Text>
        </View>
      </View>
      {content}
      {Footer}
      </View>
    )
}

const style = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    width: '100%',
    height: '7%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  HeaderText: {
    width: '90%',
    alignItems: 'center',
  },
})