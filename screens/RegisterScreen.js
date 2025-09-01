// screens/RegisterScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [specialty, setSpecialty] = useState('');

  const handleRegister = async () => {
    if (!name || !email || !password || !age || !specialty) {
      Alert.alert('Error', 'Todos los campos son obligatorios.');
      return;
    }

    try {
      // Crear usuario con Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Guardar datos adicionales en Firestore
      await setDoc(doc(db, 'users', user.uid), {
        name,
        email,
        age,
        specialty,
      });

      Alert.alert('Éxito', 'Usuario registrado correctamente.');
      navigation.replace('Home');
    } catch (error) {
      console.error(error);
      Alert.alert('Error al registrar', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Nombre" value={name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder="Correo electrónico" value={email} onChangeText={setEmail} keyboardType="email-address" style={styles.input} />
      <TextInput placeholder="Contraseña" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
      <TextInput placeholder="Edad" value={age} onChangeText={setAge} keyboardType="numeric" style={styles.input} />
      <TextInput placeholder="Especialidad" value={specialty} onChangeText={setSpecialty} style={styles.input} />

      <Button title="Registrarse" onPress={handleRegister} />
      <Button title="¿Ya tienes cuenta? Inicia sesión" onPress={() => navigation.navigate('Login')} color="gray" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 12,
    padding: 10,
    borderRadius: 5,
  },
});
