import React from 'react';
import { View,  StatusBar, ScrollView} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../styles';
import ActionCardsGrid from './ActionCardGrid';
import QuickStatsSection from './StatsSection';
import Header from './Header';

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
     <StatusBar barStyle="light-content" backgroundColor="#7c3aed" />
        <Header />
        <ScrollView  style={styles.mainContent}>

        <View>

         
        <ActionCardsGrid navigation={navigation} />
        <QuickStatsSection />
       </View>
       </ScrollView>
    </SafeAreaView>
  );
};
export default HomeScreen;