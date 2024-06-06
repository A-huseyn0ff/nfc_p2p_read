import React, { useEffect, useState } from 'react';
import { View, Text, Alert } from 'react-native';
import NfcManager, { NfcTech, Ndef } from 'react-native-nfc-manager';

const TerminalDevice = () => {
  const [receivedId, setReceivedId] = useState('');

  useEffect(() => {
    const initNfc = async () => {
      await NfcManager.start();
    };

    initNfc();

    return () => {
      NfcManager.stop();
    };
  }, []);

  useEffect(() => {
    const readNfcData = async () => {
      console.log('Starting NFC data read process');
      try {
        await NfcManager.requestTechnology([NfcTech.Ndef]);
        console.log('NFC technology requested');

        const tag = await NfcManager.getTag();
        console.log('NFC tag received:', tag);

        if (tag && tag.ndefMessage && tag.ndefMessage.length > 0) {
          const ndefMessage = tag.ndefMessage;
          console.log('NDEF message:', ndefMessage);

          const decoded = Ndef.text.decodePayload(ndefMessage[0].payload);
          console.log('Decoded payload:', decoded);
          setReceivedId(decoded);
          Alert.alert('Success', 'ID received via NFC');
        } else {
          console.log('No NDEF message found');
          Alert.alert('Error', 'No NDEF message found on the tag');
        }
      } catch (ex) {
        console.warn('Error in NFC read process:', ex);
        Alert.alert('Error', `Error in NFC read process: ${ex.toString()}`);
      } finally {
        NfcManager.cancelTechnologyRequest();
        console.log('NFC technology request canceled');
      }
    };

    readNfcData();
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text>Received ID: {receivedId}</Text>
    </View>
  );
};

export default TerminalDevice;


// App.js
// import React, {useEffect} from 'react';
// import {View, Text} from 'react-native';
// import NFCService from './Services/NfcService.js';

// const App = () => {
//   useEffect(() => {
//     NFCService.onDataReceived(data => {
//       // Handle received data
//       console.log('Received data:', data);
//     });

//     // Start NFC when component mounts
//     NFCService.start();

//     return () => {
//       // Stop NFC when component unmounts
//       NFCService.stop();
//     };
//   }, []);

//   const sendData = () => {
//     NFCService.sendData('Hello from PeerToPeerApp!');
//   };

//   return (
//     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//       <Text onPress={sendData}>Send Data</Text>
//     </View>
//   );
// };

// export default App;
