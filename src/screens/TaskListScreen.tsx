import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, TextInput, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { Task } from '../types/Task';
import TaskItem from '../components/TaskItem';
import uuid from 'react-native-uuid';
import PrimaryButton from '../components/PrimaryButton';

type Props = NativeStackScreenProps<RootStackParamList, 'TaskList'>;

export default function TaskListScreen({ navigation }: Props) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

useFocusEffect(
  useCallback(() => {
    loadTasks();
  }, [])
);

  const loadTasks = async () => {
    const stored = await AsyncStorage.getItem('tasks');
    const parsed = stored ? JSON.parse(stored) : [];
    setTasks(parsed);
  };

  const saveTasks = async (newTasks: Task[]) => {
    setTasks(newTasks);
    await AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
  };

  const addTask = () => {
    if (!title.trim()) {
      Alert.alert('Erro', 'Título não pode estar vazio');
      return;
    }

    const newTask: Task = {
      id: uuid.v4().toString(),
      title,
      description,
      completed: false,
    };

    const updatedTasks = [...tasks, newTask];
    saveTasks(updatedTasks);
    setTitle('');
    setDescription('');
  };

  const toggleComplete = (id: string) => {
    const updated = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    saveTasks(updated);
  };

  const deleteTask = (id: string) => {
    const updated = tasks.filter(task => task.id !== id);
    saveTasks(updated);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas Tarefas</Text>

      <TextInput
        style={styles.input}
        placeholder="Título da tarefa"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={description}
        onChangeText={setDescription}
      />

      <PrimaryButton title="Adicionar Tarefa" onPress={addTask} />

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onToggleComplete={() => toggleComplete(item.id)}
            onDelete={() => deleteTask(item.id)}
            onPress={() => navigation.navigate('TaskDetail', { taskId: item.id })}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    paddingTop: 40,
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
    padding: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
  },
});
