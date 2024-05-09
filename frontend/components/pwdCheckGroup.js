import { View, Text, StyleSheet } from 'react-native';
import AnimatedExample from './pwd-input/pwdInput-group';


export default function PwdCheckGroup() {
  return (
    <View style={styles.container}>
      <Text style={styles.HeaderText}>Passwort eingeben</Text>
      <View style={styles.pwdContainer}>
        <AnimatedExample />
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