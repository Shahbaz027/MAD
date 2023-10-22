import React from 'react';
import { View, ImageBackground, TextInput, Button, Text, StyleSheet } from 'react-native';

const LoginPage = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('./assets/backk.jpg')}
        style={styles.backgroundImage}
      >
        <View style={styles.overlay}>
          <View style={styles.loginContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={true}
            />
            <Button title="Login" onPress={() => {/* Handle login logic */}} />
            <Text style={styles.forgotPasswordText}>Forgotten Password</Text>
            <Text style={styles.createAccountText}>Create your account</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 0.5, // Adjust the height to cover half of the screen
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)', // Add an overlay to make text readable
    justifyContent: 'center',
  },
  loginContainer: {
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  forgotPasswordText: {
    textAlign: 'center',
    marginTop: 20,
    color: 'black',
  },
  createAccountText: {
    textAlign: 'center',
    marginTop: 10,
    color: 'black',
  },
});

export default LoginPage;
