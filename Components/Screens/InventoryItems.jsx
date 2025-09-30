import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  Alert,
  Platform,
  PermissionsAndroid
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RNFS from 'react-native-fs';
import styles from '../../styles';

const InventoryScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');

  const inventoryData = [
    { id: 1, name: 'HD Webcam Pro', qty: 150, price: '₹49.99', value: '₹7,498.50' },
    { id: 2, name: 'Wireless Mouse', qty: 150, price: '₹49.72', value: '₹7,458.00' },
    { id: 3, name: 'USB Cable', qty: 32, price: '₹20.00', value: '₹640.00' },
    { id: 4, name: '1TB SSD Drive', qty: 85, price: '₹30.11', value: '₹2,559.35' },
    { id: 5, name: 'Laptop Stand', qty: 42, price: '₹58.33', value: '₹2,449.86' },
    { id: 6, name: 'Monitor 27"', qty: 18, price: '₹500.00', value: '₹9,000.00' },
  ];

  const handleBack = () => {
    // Navigate back to previous screen
    if (navigation) {
      navigation.goBack();
    } else {
      Alert.alert('Back', 'Navigation to previous screen');
    }
  };

  const requestStoragePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission',
            message: 'App needs access to your storage to save the export file',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const handleExport = async () => {
    try {
      // Request permission for Android
      const hasPermission = await requestStoragePermission();
      if (!hasPermission) {
        Alert.alert('Permission Denied', 'Storage permission is required to export files');
        return;
      }

      // Format data for export
      const exportData = inventoryData.map((item, index) => ({
        'S.No': index + 1,
        'Product Name': item.name || 'N/A',
        'Available Qty': item.qty || 'N/A',
        'Price (Per Piece)': item.price || 'N/A',
        'Total Value': item.value || 'N/A'
      }));

      // Convert to CSV format
      const headers = ['S.No', 'Product Name', 'Available Qty', 'Total Value'];
      const csvContent = [
        headers.join(','),
        ...exportData.map(row => 
          headers.map(header => {
            const value = row[header];
            // Escape commas and quotes in values
            return typeof value === 'string' && value.includes(',') 
              ? `"${value}"` 
              : value;
          }).join(',')
        )
      ].join('\n');

      // Create filename with timestamp
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
      const filename = `inventory_export_${timestamp}.csv`;

      // Determine save path based on platform
      const path = Platform.OS === 'ios'
        ? `${RNFS.DocumentDirectoryPath}/${filename}`
        : `${RNFS.DownloadDirectoryPath}/${filename}`;

      // Write file
      await RNFS.writeFile(path, csvContent, 'utf8');

      // Show success message with file location
      Alert.alert(
        'Export Successful',
        `File saved to:\n${Platform.OS === 'ios' ? 'Documents' : 'Downloads'} folder\n\nFilename: ${filename}\n\nTotal Items: ${exportData.length}`,
        [
          { 
            text: 'OK', 
            onPress: () => console.log('Exported to:', path) 
          }
        ]
      );

      // Log export details
      console.log('=== EXPORTED INVENTORY DATA ===');
      console.log('File Path:', path);
      console.log('Data:', exportData);

    } catch (error) {
      console.error('Export Error:', error);
      Alert.alert('Export Failed', `Error: ${error.message}`);
    }
  };

  const handleFilterSort = () => {
    Alert.alert('Filter/Sort', 'Filter and sort functionality');
  };

  const handleMenu = () => {
    Alert.alert('Menu', 'Menu options');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}> Inventory Items</Text>
        <TouchableOpacity style={styles.menuButton} onPress={handleMenu}>
          <Icon name="menu" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by Product Name, ID, or Barcode..."
          placeholderTextColor="#999"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.exportButton} onPress={handleExport}>
          <Icon name="file-download" size={18} color="#fff" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Export</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton} onPress={handleFilterSort}>
          <Icon name="filter-list" size={18} color="#fff" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Filter/Sort</Text>
        </TouchableOpacity>
      </View>

      {/* Table Header */}
      <View style={styles.tableHeader}>
        <Text style={[styles.headerCell, styles.productNameHeader]}>Product Name</Text>
        <Text style={[styles.headerCell, styles.qtyHeader]}>Available Qty</Text>
        <Text style={[styles.headerCell, styles.priceHeader]}>Price</Text>
        <Text style={[styles.headerCell, styles.valueHeader]}>Total Value</Text>
      </View>

      {/* Table Content */}
      <ScrollView style={styles.tableContent}>
        {inventoryData.map((item) => (
          <View key={item.id} style={styles.tableRow}>
            <View style={styles.productNameCell}>
              <Text style={styles.cellText}>{item.name}</Text>
            </View>
            <View style={styles.qtyCell}>
              <Text style={styles.cellText}>{item.qty}</Text>
            </View>
            <View style={styles.priceCell}>
              <Text style={styles.cellText}>{item.price}</Text>
            </View>
            <View style={styles.valueCell}>
              <Text style={styles.cellText}>{item.value}</Text>
            </View> 
          </View>
        ))}
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Total Items-{inventoryData.length}
        </Text>
      </View>
    </View>
  );
};

export default InventoryScreen;