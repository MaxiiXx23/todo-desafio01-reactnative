import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taksAlreadyExists = tasks.find(task => task.title === newTaskTitle)
    if(taksAlreadyExists){
      Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome"
      )
      return;
    }
    const task : Task = {
      id : new Date().getTime(),
      title: newTaskTitle,
      done: false,
    } 

    setTasks(oldState => [...oldState, task])
  }

  function handleToggleTaskDone(id: number) {
    //TODO - toggle task done if exists
    const updatedTasks = tasks.map(task => ({...task}))
    const task = updatedTasks.find(task => task.id === id)
    if(!task) return;
    if(task.done) {
      task.done = false;
    }else{
      task.done = true
    }
    setTasks(updatedTasks)

  }

  function handleRemoveTask(id: number) {
    //TODO - remove task from state
    Alert.alert(
      "Remover item",
      "Tem certeza que deseja remover este item?",
      [
        {
          text: "Não",
          onPress: () => { return;}
        },
        {
          text: "Sim",
          onPress: () => {
            const newTask = tasks.filter(task => task.id !== id)
            setTasks(newTask)
          }
        }
      ]
    )
  }

  function handleEditTask (taskId: number, taskNewTitle: string) {
      const updtedTasks = tasks.map(task => ({...task}))
      const task = updtedTasks.find(task => task.id === taskId)
      if(!task){
        return;
      }
      task.title === taskNewTitle;
      setTasks(updtedTasks);

  }
  

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask= {handleEditTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})