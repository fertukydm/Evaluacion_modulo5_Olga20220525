// screens/EditProfileScreen.js
import React, { useEffect, useState } from 'react';
import { View, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { auth, db } from '../firebase/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import FormInput from '../components/FormInput';

export default function EditProfileScreen({ navigation }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            setName(data.name || '');
            setAge(data.age || '');
            setSpecialty(data.specialty || '');
          } else {
            Alert.alert('Error', 'No se encontró información del usuario.');
          }
        }
      } catch (error) {
        Alert.alert('Error', 'No se pudo cargar la información.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleSave = async () => {
    if (!name || !age || !specialty) {
      Alert.alert('Error', 'Todos los campos son obligatorios.');
      return;
    }

    try {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        await updateDoc(docRef, {
          name,
          age,
          specialty,
        });
        Alert.alert('Éxito', 'Información actualizada.');
        navigation.goBack();
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo actualizar la información.');
      console.error(error);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FormInput
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
      />
      <FormInput
        placeholder="Edad"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />
      <FormInput
        placeholder="Especialidad"
        value={specialty}
        onChangeText={setSpecialty}
      />

      <Button title="Guardar Cambios" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
});
