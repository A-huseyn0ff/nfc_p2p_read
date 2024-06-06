// NFCService.js
import { NativeModules, Platform } from 'react-native';

const { RNHCEService } = NativeModules;

const NFCService = {
  start: () => {
    if (Platform.OS === 'android') {
      RNHCEService.start();
    }
  },
  stop: () => {
    if (Platform.OS === 'android') {
      RNHCEService.stop();
    }
  },
  sendData: (data) => {
    if (Platform.OS === 'android') {
      RNHCEService.sendData(data);
    }
  },
  onDataReceived: (callback) => {
    if (Platform.OS === 'android') {
      RNHCEService.onDataReceived(callback);
    }
  }
};

export default NFCService;
