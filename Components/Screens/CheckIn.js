import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, Animated, Easing, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../../styles';

const CheckIn = ({navigation}) => {
  const [productName, setProductName] = useState('Wireless Mouse');
  const [price, setPrice] = useState('25.99');
  const [quantity, setQuantity] = useState('1');

  const scanAnimation = useRef(new Animated.Value(0)).current;

  const handleBack = () => {
      // Navigate back to previous screen
      if (navigation) {
        navigation.goBack();
      } else {
        Alert.alert('Back', 'Navigation to previous screen');
      }
    };
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanAnimation, {
          toValue: 1,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scanAnimation, {
          toValue: 0,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [scanAnimation]);

  // Interpolate the animation value to move the line
  const scannerTranslateY = scanAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 180],
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      
      <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <MaterialIcons name="arrow-back-ios" size={24} color="#fff" style={{ marginLeft: 10 }}/>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Check-In</Text>
          <View style={{ width: 40 }} />
        </View>

      {/* This View acts as the main container for the screen content */}
      <View style={styles.checkIncontainer}>
         <TouchableOpacity style={styles.checkInButton}>
          <Text style={styles.GenerateBarcode}>Generate BarCode</Text>
        </TouchableOpacity>


        {/* Barcode Scanner Area */}
        <View style={styles.scannerContainer}>
          <Text style={styles.scannerText}>Align barcode within the frame</Text>
          <Animated.View
            style={[
              styles.scannerLine,
              { transform: [{ translateY: scannerTranslateY }] },
            ]}
          />
        </View>

        {/* Form Fields */}
        <View style={styles.form}>
          <Text style={styles.label}>Product Name</Text>
          <TextInput
            style={styles.input}
            value={productName}
            onChangeText={setProductName}
          />

          <View style={styles.row}>
            <View style={styles.priceContainer}>
              <Text style={styles.label}>Price</Text>
              <TextInput
                style={styles.input}
                value={`₹${price}`}
                onChangeText={setPrice}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.quantityContainer}>
              <Text style={styles.label}>Quantity</Text>
              <TextInput
                style={styles.input}
                value={quantity}
                onChangeText={setQuantity}
                keyboardType="numeric"
              />
            </View>
            
          </View>
          <TouchableOpacity style={styles.checkInButton}>
          <Text style={styles.checkInIamge}>CheckIn using Image</Text>
        </TouchableOpacity>
        </View>

        {/* Check-In Button */}
        <TouchableOpacity style={styles.checkInButton}>
          <Text style={styles.checkInButtonText}>Check-In Product</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CheckIn;

