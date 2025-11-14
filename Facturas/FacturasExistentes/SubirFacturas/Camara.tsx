import AntDesign from '@react-native-vector-icons/ant-design';
import FontAwesome from '@react-native-vector-icons/fontawesome';
import Ionicons from '@react-native-vector-icons/ionicons';
import * as React from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Camera,
  useCameraDevices,
  CameraDevice,
  PhotoFile,
  useCodeScanner,
} from 'react-native-vision-camera';
import GoBack from './GoBack';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import ShowPhoto from './ShowPhotoContainer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { height } = Dimensions.get('window');

// Move indicator components outside App
const LoadIndicator = ({
  status,
}: {
  status: 'idle' | 'loading' | 'success' | 'error';
}) => {
  if (status === 'loading')
    return (
      <>
        <Text style={styles.loadText}>Procesando</Text>
        <ActivityIndicator size={20} color="#fff" style={styles.loadSpinner} />
      </>
    );
  if (status === 'success')
    return <FontAwesome name="check-circle" style={styles.iconSuccess} />;
  if (status === 'error')
    return <AntDesign name="close-circle" style={styles.iconError} />;
  return null;
};

const LoadIndicator2 = ({
  status,
}: {
  status: 'idle' | 'loading' | 'success' | 'error';
}) => {
  if (status === 'loading')
    return (
      <ActivityIndicator size={20} color="#fff" style={styles.loadSpinner} />
    );
  if (status === 'success')
    return <FontAwesome name="check-circle" style={styles.iconSuccess} />;
  if (status === 'error')
    return <AntDesign name="close-circle" style={styles.iconError} />;
  return null;
};

export default function Camara({ navigation }: any) {
  const [hasPermission, setHasPermission] = React.useState(false);
  const [flash, setFlash] = React.useState<'off' | 'on'>('off');
  const [photoUri, setPhotoUri] = React.useState<string | null>(null);
  const [showPhoto, setShowPhoto] = React.useState(false);
  const [load, setLoad] = React.useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  const cameraRef = React.useRef<Camera>(null);
  const devices = useCameraDevices();
  const device: CameraDevice | undefined = devices.find(
    d => d.position === 'back',
  );
  const [scanned, setScanned] = React.useState(false);
  const [imgdata, setimgdata] = React.useState<string | null>(null);

  React.useEffect(() => {
    const obtenerFacturas = async () => {
      try {
        const token = await AsyncStorage.getItem('Token');

        if (!token) {
          console.log('⚠️ No hay token disponible');
          return;
        }

        const res = await fetch('http://192.168.8.106:8000/facturas', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`, // 👈 así se envía el JWT
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) {
          console.log('Error al obtener facturas:', res.status);
          return;
        }

        const data = await res.json();
        setimgdata(String(data[0].url_archivo));
        console.log(data[1].url_archivo)
      } catch (error) {
        console.log('❌ Error en la solicitud:', error);
      }
    };

    obtenerFacturas();
  }, []);

  React.useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePhoto = async () => {
    if (!cameraRef.current) return;
    const photo: PhotoFile = await cameraRef.current.takePhoto({
      flash,
      photoCodec: 'jpeg',
      enableAutoStabilization: true,
      skipMetadataRotation: true,
    });
    setPhotoUri('file://' + photo.path);
    setLoad('loading');
    sendPhotoToBackend('file://' + photo.path);
  };

  const toggleFlash = () => setFlash(prev => (prev === 'off' ? 'on' : 'off'));
  const toggleShowPhoto = () => setShowPhoto(prev => !prev);

  const sendPhotoToBackend = async (uri: string) => {
    const formdata = new FormData();
    formdata.append('file', {
      uri,
      name: 'photo.jpg',
      type: 'image/jpeg',
    } as any);

    try {
      const token = AsyncStorage.getItem("Token");
      const response = await fetch('http://192.168.8.106:8000/Photos', {
        method: 'POST',
        headers: {
          Authorization:
            'Bearer ' + token
        },
        body: formdata,
      });
      const data = await response.json();
      console.log(data);
      setLoad('success');
    } catch (error) {
      console.log(error);
      setLoad('error');
    }
  };

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      if (codes.length === 0) return;
      const scannedCode = codes[0].value;

      if (!scanned) {
        setScanned(true);
        Alert.alert(`Código Escaneado`);

        const sendQRtoBackend = async () => {
          try {
            const response = await fetch('http://192.168.8.106:8000/QR', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ qr: scannedCode }),
            });
            const data = await response.json();
            console.log(data);
            if (data) {
              setLoad('success');
            }
          } catch (error) {
            console.log(error);
            setLoad('error');
          } finally {
            setTimeout(() => {
              setScanned(false);
            }, 3000);
          }
        };

        sendQRtoBackend();
      }
    },
  });

  if (!device) return <View style={styles.noDevice} />;

  if (!hasPermission)
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={styles.camera}
        device={device}
        isActive={true}
        photo={true}
        enableZoomGesture={true}
        torch={flash}
        photoQualityBalance="speed"
        outputOrientation="portrait"
        orientation="portrait"
        enableAutoStabilization={false}
        codeScanner={codeScanner}
      />

      {showPhoto && !imgdata && (
        <ShowPhoto
          LoadIndicator={<LoadIndicator status={load} />}
          content={
            <Text style={{ color: 'white' }}>No hay imagen para mostrar</Text>
          }
        />
      )}

      {showPhoto && imgdata && (
        <ShowPhoto
          LoadIndicator={<LoadIndicator status={load} />}
          content={<Image source={{ uri: imgdata }} style={styles.images} />}
        />
      )}

      <View style={styles.header}>
        <GoBack navigation={navigation} colorIcon={'white'}></GoBack>
        <TouchableOpacity style={styles.button} onPress={toggleFlash}>
          <Text style={styles.text}>
            {flash === 'on' ? (
              <Ionicons name="flash" color={'white'} size={24} />
            ) : (
              <Ionicons name="flash-off" color={'white'} size={24} />
            )}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.SearchImageFile} onPress={toggleShowPhoto}>
          {imgdata && (
            <Image source={{ uri: imgdata }} style={styles.images} />
          )}
          <View style={styles.LoadOverlay}>
            <LoadIndicator2 status={load} />
          </View>
        </Pressable>
        <TouchableOpacity style={styles.TakePhotoButton} onPress={takePhoto} />
        <TouchableOpacity style={styles.SearchFile}>
          <MaterialIcons name="add-to-photos" size={50} color={'white'} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center' },
  header: {
    top: 0,
    width: '100%',
    height: 60,
    backgroundColor: 'rgba(0,0,0,0.6)',
    position: 'absolute',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
  },
  message: { textAlign: 'center', paddingBottom: 10 },
  camera: { flex: 1 },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: '100%',
    height: height * 0.15,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  button: {
    alignItems: 'center',
    padding: 10,
    width: '30%',
    height: '100%',
    margin: 10,
  },
  text: { fontSize: 18, fontWeight: 'bold', color: 'white' },
  TakePhotoButton: {
    width: 80,
    height: 80,
    borderRadius: 35,
    borderWidth: 6,
    borderColor: 'white',
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  SearchImageFile: {
    backgroundColor: 'white',
    width: '20%',
    height: '60%',
    margin: 15,
    borderRadius: 6,
  },
  SearchFile: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  images: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
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
  LoadOverlay: {
    position: 'absolute',
    top: 55,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadText: { color: 'white', marginLeft: 10 },
  loadSpinner: { marginLeft: 5 },
  iconSuccess: { color: 'green', fontSize: 22 },
  iconError: { color: 'red', fontSize: 22 },
  noDevice: { flex: 1, backgroundColor: 'black' },
});
