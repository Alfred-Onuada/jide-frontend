import { Stack, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default function App() {
  const [page, setPage] = useState(0);
  
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      {
        page === 0 && 
        <View>
          <Image source={require('./../assets/home1.png')}></Image>
          <View style={styles.bottomStyle}>
            <Text style={styles.mainText}>Thousands of Doctors</Text>
            <Text style={styles.secondText}>You can easily contact with a thousands of doctors and contact for your needs.</Text>
            <View style={{marginVertical: 40, display: 'flex', flexDirection: 'row'}}>
              <View style={{...styles.circle, backgroundColor: '#2972FE' }}></View>
              <View style={{...styles.circle, marginHorizontal: 10}}></View>
              <View style={styles.circle}></View>
            </View>
            <TouchableOpacity style={styles.skipBtn} onPress={() => router.navigate('/auth/selection')}>
              <Text style={styles.btnTextSkip}>Skip</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.nextBtn} onPress={() => setPage(1)}>
              <Text style={styles.btnTextNext}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      }

      {
        page === 1 && 
        <View>
          <Image source={require('./../assets/home2.png')}></Image>
          <View style={styles.bottomStyle}>
            <Text style={styles.mainText}>Chat with doctors</Text>
            <Text style={styles.secondText}>Book an appointment with doctor. Chat with doctor via appointment letter and get consultation.</Text>
            <View style={{marginVertical: 40, display: 'flex', flexDirection: 'row'}}>
              <View style={{...styles.circle }}></View>
              <View style={{...styles.circle, marginHorizontal: 10, backgroundColor: '#2972FE'}}></View>
              <View style={styles.circle}></View>
            </View>
            <TouchableOpacity style={styles.skipBtn} onPress={() => router.navigate('/auth/selection')}>
              <Text style={styles.btnTextSkip}>Skip</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.nextBtn} onPress={() => setPage(2)}>
              <Text style={styles.btnTextNext}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      }

      {
        page === 2 && 
        <View>
          <Image source={require('./../assets/home3.png')}></Image>
          <View style={styles.bottomStyle}>
            <Text style={styles.mainText}>Live talk with doctor</Text>
            <Text style={styles.secondText}>Easily connect with doctor, start voice and video call for your better treatment & prescription.</Text>
            <View style={{marginVertical: 40, display: 'flex', flexDirection: 'row'}}>
              <View style={{...styles.circle, }}></View>
              <View style={{...styles.circle, marginHorizontal: 10}}></View>
              <View style={{...styles.circle, backgroundColor: '#2972FE'}}></View>
            </View>
            <TouchableOpacity style={styles.skipBtn} onPress={() => router.navigate('/auth/selection')}>
              <Text style={styles.btnTextSkip}>Skip</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.nextBtn} onPress={() => router.navigate('/auth/selection')}>
              <Text style={styles.btnTextNext}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      }
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
  },
  bottomStyle: {
    backgroundColor: '#fff',
    height: 500,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnTextNext: {
    paddingVertical: 20,
    textAlign: 'center',
    fontSize: 18,
    color: '#fff'
  },
  btnTextSkip: {
    paddingVertical: 20,
    textAlign: 'center',
    fontSize: 18,
    color: '#2972FE',
  },
  nextBtn: {
    width: '90%',
    backgroundColor: '#2972FE',
    borderRadius: 10
  },
  skipBtn: {
    width: '90%',
    borderRadius: 10
  },
  mainText: {
    color: '#2972FE',
    fontWeight: '600',
    fontSize: 24,
    marginBottom: 20
  },
  secondText: {
    textAlign: 'center',
    fontWeight: '300',
    fontSize: 16,
    marginBottom: 20
  },
  circle: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: 'grey'
  }
});
