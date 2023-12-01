import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, AsyncStorage } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const RegistrationScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegistration = async () => {
    try {
      await AsyncStorage.setItem(username, JSON.stringify({ username, password }));
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Username"
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
      />
      <Button title="Register" onPress={handleRegistration} />
    </View>
  );
};

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const userData = await AsyncStorage.getItem(username);
      if (userData) {
        const { password: storedPassword } = JSON.parse(userData);
        if (password === storedPassword) {
          navigation.navigate('CVForm', { username });
        } else {
          console.error('Incorrect password');
        }
      } else {
        console.error('User not found');
      }
    } catch (error) {
      console.error('Error retrieving user data:', error);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Username"
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const CVFormScreen = ({ route }) => {
  const { username } = route.params;
  const [cvData, setCVData] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await AsyncStorage.getItem(username);
        if (userData) {
          const { cvData: storedCVData } = JSON.parse(userData);
          setCVData(storedCVData || '');
        }
      } catch (error) {
        console.error('Error retrieving CV data:', error);
      }
    };

    fetchData();
  }, [username]);

  const handleSaveCVData = async () => {
    try {
      const userData = await AsyncStorage.getItem(username);
      if (userData) {
        const existingData = JSON.parse(userData);
        await AsyncStorage.setItem(username, JSON.stringify({ ...existingData, cvData }));
      }
    } catch (error) {
      console.error('Error saving CV data:', error);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Enter CV Data"
        multiline
        value={cvData}
        onChangeText={setCVData}
      />
      <Button title="Save" onPress={handleSaveCVData} />
    </View>
  );
};

const CVDisplayScreen = ({ route }) => {
  const { username } = route.params;
  const [cvData, setCVData] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await AsyncStorage.getItem(username);
        if (userData) {
          const { cvData: storedCVData } = JSON.parse(userData);
          setCVData(storedCVData || '');
        }
      } catch (error) {
        console.error('Error retrieving CV data:', error);
      }
    };

    fetchData();
  }, [username]);

  return (
    <View>
      <Text>{cvData}</Text>
      <Button
        title="Go Back to CV Form"
        onPress={() => navigation.navigate('CVForm', { username })}
      />
    </View>
  );
};

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Registration">
        <Stack.Screen name="Registration" component={RegistrationScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="CVForm" component={CVFormScreen} />
        <Stack.Screen name="CVDisplay" component={CVDisplayScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;