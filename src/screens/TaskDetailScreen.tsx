import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { Task } from '../types/Task';
import PrimaryButton from '../components/PrimaryButton';

type Props = NativeStackScreenProps<RootStackParamList, 'TaskDetail'>;

export default function TaskDetailScreen({ route, navigation }: Props) {
  const { taskId } = route.params;
  const [task, setTask] = useState<Task | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    loadTask();
  }, []);

  const loadTask = async () => {
    const stored = await AsyncStorage.getItem('tasks');
    const tasks: Task[] = stored ? JSON.parse(stored) : [];

    const foundTask = tasks.find(t => t.id === taskId);
    if (foundTask) {
      setTask(foundTask);
      setTitle(foundTask.title);
      setDescription(foundTask.description);
    } else {
      Alert.alert('Erro', 'Tarefa não encontrada');
      navigation.goBack();
    }
  };

  const saveTask = async () => {
    if (!task) return;

    const stored = await AsyncStorage.getItem('tasks');
    const tasks: Task[] = stored ? JSON.parse(stored) : [];

    const updatedTasks = tasks.map(t =>
      t.id === task.id ? { ...t, title, description } : t
    );

    await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
    Alert.alert('Sucesso', 'Tarefa atualizada');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Tarefa</Text>

      <TextInput
        style={styles.input}
        placeholder="Título"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={description}
        onChangeText={setDescription}
      />

      <PrimaryButton title="Salvar Alterações" onPress={saveTask} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    justifyContent: 'center',
    backgroundColor: '#001F3F',
  },
  title: { 
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#FFFFFF', 
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
  },
});
