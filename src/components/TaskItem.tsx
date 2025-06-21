import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Task } from '../types/Task';
import { Feather } from '@expo/vector-icons';

interface Props {
  task: Task;
  onToggleComplete: () => void;
  onDelete: () => void;
  onPress: () => void;
}

export default function TaskItem({ task, onToggleComplete, onDelete, onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity onPress={onToggleComplete}>
          <Feather
            name={task.completed ? 'check-circle' : 'circle'}
            size={24}
            color={task.completed ? 'green' : 'gray'}
            style={{ marginRight: 10 }}
          />
        </TouchableOpacity>
        <Text style={[styles.title, task.completed && styles.completed]}>
          {task.title}
        </Text>
      </View>
      <TouchableOpacity onPress={onDelete}>
        <Feather name="trash" size={20} color="red" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 5,
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
  },
  title: {
    fontSize: 16,
    flexShrink: 1,
  },
  completed: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
});
