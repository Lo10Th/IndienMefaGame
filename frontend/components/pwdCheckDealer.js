import { View, Text, StyleSheet } from 'react-native';
import PwdCheckDealerInput from './pwd-input/pwdInput-dealer';


export default function PwdCheckDealer() {
  return (
    <View style={styles.container}>
      <Text style={styles.HeaderText}>Passwort eingeben</Text>
      <View style={styles.pwdContainer}>
        <PwdCheckDealerInput />
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#080B0F',
    flex: 1,
  },
  HeaderText: {
    color: '#F7F7F7',
    fontSize: 30,
    fontFamily: 'sans-serif',
    textAlign: 'center',
    marginTop: 60,
  },
  pwdContainer: {
    marginTop: 50,
  }
});