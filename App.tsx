import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  PermissionsAndroid,
  Platform,
} from "react-native";
import { BleManager, Device } from "react-native-ble-plx";
import styles from './styles';

const manager = new BleManager();

export default function App() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);

  useEffect(() => {
    return () => {
      manager.destroy();
    };
  }, []);

  async function requestPermissions() {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        ]);
        
        const allPermissionsGranted = Object.values(granted).every(
          permission => permission === PermissionsAndroid.RESULTS.GRANTED
        );
        
        if (!allPermissionsGranted) {
          Alert.alert("Permissions required", "Please grant all permissions to use Bluetooth");
          return false;
        }
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  }

  async function startScan() {
    const hasPermissions = await requestPermissions();
    if (!hasPermissions) return;

    setDevices([]);
    setIsScanning(true);

    manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.log("Scan error:", error);
        setIsScanning(false);
        Alert.alert("Scan Error", error.message);
        return;
      }

      if (device) {
        setDevices((prevDevices) => {
          // Check if device already exists to prevent duplicates
          const deviceExists = prevDevices.some((d) => d.id === device.id);
          if (!deviceExists) {
            return [...prevDevices, device];
          }
          // Update existing device with new RSSI data
          return prevDevices.map((d) => (d.id === device.id ? device : d));
        });
      }
    });

    // Auto-stop scan after 10 seconds
    setTimeout(() => {
      stopScan();
    }, 10000);
  }

  function stopScan() {
    manager.stopDeviceScan();
    setIsScanning(false);
  }

  async function connectToDevice(device: Device) {
    try {
      stopScan(); // Stop scanning before connecting
      
      Alert.alert(
        "Connecting...",
        `Attempting to connect to ${device.name || "Unknown Device"}`
      );

      const connectedDev = await device.connect();
      setConnectedDevice(connectedDev);
      
      Alert.alert(
        "Connected!",
        `Successfully connected to ${device.name || "Unknown Device"}`
      );

 
      await connectedDev.discoverAllServicesAndCharacteristics();
      
    } catch (error) {
      console.log("Connection error:", error);
      Alert.alert("Connection Failed", `Could not connect to device: ${error}`);
    }
  }

  async function disconnectDevice() {
    if (connectedDevice) {
      try {
        await connectedDevice.cancelConnection();
        setConnectedDevice(null);
        Alert.alert("Disconnected", "Device disconnected successfully");
      } catch (error) {
        console.log("Disconnect error:", error);
        Alert.alert("Disconnect Failed", `Error disconnecting: ${error}`);
      }
    }
  }

  const renderDevice = ({ item }: { item: Device }) => (
    <TouchableOpacity
      style={[
        styles.deviceCard,
        connectedDevice?.id === item.id && styles.connectedCard
      ]}
      onPress={() => connectToDevice(item)}
      disabled={!!connectedDevice}
    >
      <View style={styles.deviceHeader}>
        <Text style={styles.deviceName}>
          {item.name || "Unknown Device"}
        </Text>
        <Text style={styles.rssi}>
          {item.rssi} dBm
        </Text>
      </View>
      <Text style={styles.deviceId}>ID: {item.id}</Text>
      {connectedDevice?.id === item.id && (
        <View style={styles.connectedBadge}>
          <Text style={styles.connectedText}>CONNECTED</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>BLE Device Scanner</Text>
        {connectedDevice && (
          <Text style={styles.connectedStatus}>
            Connected to: {connectedDevice.name || "Unknown"}
          </Text>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.primaryButton]}
          onPress={startScan}
          disabled={isScanning}
        >
          <Text style={styles.buttonText}>
            {isScanning ? "Scanning..." : "Start Scan"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={stopScan}
          disabled={!isScanning}
        >
          <Text style={[styles.buttonText, styles.secondaryButtonText]}>
            Stop Scan
          </Text>
        </TouchableOpacity>

        {connectedDevice && (
          <TouchableOpacity
            style={[styles.button, styles.dangerButton]}
            onPress={disconnectDevice}
          >
            <Text style={styles.buttonText}>
              Disconnect
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.deviceCount}>
        <Text style={styles.countText}>
          Found {devices.length} device{devices.length !== 1 ? 's' : ''}
          {isScanning && (
            <Text style={styles.scanningText}> (scanning...)</Text>
          )}
        </Text>
      </View>

      <FlatList
        data={devices}
        keyExtractor={(item) => item.id}
        renderItem={renderDevice}
        style={styles.deviceList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {isScanning 
                ? "Searching for devices..." 
                : "No devices found. Press 'Start Scan' to begin."
              }
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

