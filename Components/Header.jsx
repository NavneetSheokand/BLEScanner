import React, { useState, useRef } from 'react';
import { View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';

// --- Sidebar Component ---
// This is the menu that will slide in from the side.
const Sidebar = ({ onClose }) => {
  const menuItems = [
    { icon: 'dashboard', name: 'Dashboard' },
    { icon: 'inventory-2', name: 'Inventory' },
    { icon: 'settings', name: 'Settings' },
    { icon: 'person', name: 'Profile' },
    { icon: 'logout', name: 'Logout' },
  ];

  return (
    <View style={styles.sidebarContainer}>
      <View style={styles.sidebarHeader}>
        <Text style={styles.sidebarTitle}>Menu</Text>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <MaterialIcon name="close" size={24} color="#333" />
        </TouchableOpacity>
      </View>
      {menuItems.map((item, index) => (
        <TouchableOpacity key={index} style={styles.sidebarItem}>
          <MaterialIcon name={item.icon} size={24} color="#4F4F4F" />
          <Text style={styles.sidebarItemText}>{item.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};


const AppList = ({ onMenuPress }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.headerButton}>
        <MaterialIcon name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>INVENTORY MANAGER</Text>
      <View style={styles.headerIcons}>
        <TouchableOpacity style={styles.headerButton}>
          <MaterialIcon name="notifications" size={24} color="white" />
        </TouchableOpacity>
        {/* This button will now open the sidebar */}
        <TouchableOpacity style={styles.headerButton} onPress={onMenuPress}>
          <MaterialIcon name="menu" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// This component manages the state and animation for the sidebar.
const Header = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const slideAnimation = useRef(new Animated.Value(0)).current;

  const sidebarWidth = Dimensions.get('window').width * 0.75;

  const openSidebar = () => {
    setSidebarVisible(true);
    Animated.timing(slideAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeSidebar = () => {
    Animated.timing(slideAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setSidebarVisible(false));
  };

  const sidebarTranslateX = slideAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-sidebarWidth, 0],
  });

  const overlayOpacity = slideAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.5],
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <AppList onMenuPress={openSidebar} />
        
      {isSidebarVisible && (
          <TouchableOpacity
            style={StyleSheet.absoluteFill}
            onPress={closeSidebar}
            activeOpacity={1}
          >
            <Animated.View style={[styles.overlay, { opacity: overlayOpacity }]} />
          </TouchableOpacity>
        )}

        <Animated.View
          style={[
            styles.sidebar,
            { width: sidebarWidth, transform: [{ translateX: sidebarTranslateX }] },
          ]}
        >
          <Sidebar onClose={closeSidebar} />
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

// --- Styles ---
const styles = StyleSheet.create({
  safeArea: {  backgroundColor: '#6366f1' },
  container: {  backgroundColor: '#f8fafc' },
  content: {  alignItems: 'center', justifyContent: 'center' },
  contentText: { fontSize: 18, color: '#333' },
  header: {
    backgroundColor: '#6366f1',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  headerTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
  headerIcons: { flexDirection: 'row' },
  headerButton: { padding: 8 },
  sidebar: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    backgroundColor: '#FFF',
    zIndex: 100,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
    zIndex: 99,
  },
  sidebarContainer: { flex: 1 },
  sidebarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sidebarTitle: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  closeButton: { padding: 5 },
  sidebarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  sidebarItemText: {
    fontSize: 16,
    marginLeft: 15,
    color: '#333',
    fontWeight: '500',
  },
});

export default Header;

