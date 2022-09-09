import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import Icon from 'react-native-vector-icons/Feather';
import trashIcon from '../assets/icons/trash/trash.png';
import editIcon from '../assets/icons/edit/edit.png';

interface TasksListProps {
    index: number;
    item: {
        id: number;
        title: string;
        done: boolean;
    }
    toggleTaskDone: (id: number) => void;
    removeTask: (id: number) => void;
    editTask: (taskId: number, taskNewTitle: string) => void;
}


export default function TaskItem({ index, item, toggleTaskDone, removeTask, editTask }: TasksListProps) {

    const [isEditing, setIsEditing] = useState(false);
    const [taksNewTitleValue, setTaskNewTitleValue] = useState(item.title)
    const textInputRef = useRef<TextInput>(null)

    function handleStartEditing() {
        setIsEditing(true)
    }

    function handleCancelEditing() {
        setTaskNewTitleValue(item.title);
        setIsEditing(false)
    }

    function handleSubmitEditing() {
        editTask(item.id, taksNewTitleValue);
        setIsEditing(false)
    }

    useEffect(() => {
        if (textInputRef.current) {
            if (isEditing) {
                textInputRef.current.focus();
            } else {
                textInputRef.current.blur();
            }
        }
    }, [isEditing])

    return (
        <>
            <View>
                <TouchableOpacity
                    testID={`button-${index}`}
                    activeOpacity={0.7}
                    style={styles.taskButton}
                    //TODO - use onPress (toggle task) prop
                    onPress={() => toggleTaskDone(item.id)}
                >
                    <View
                        testID={`marker-${index}`}
                        //TODO - use style prop
                        style={item.done ? styles.taskMarkerDone : styles.taskMarker
                        }
                    >
                        {item.done && (
                            <Icon
                                name="check"
                                size={12}
                                color="#FFF"
                            />
                        )}
                    </View>

                    <TextInput
                        ref={textInputRef}
                        value={taksNewTitleValue}
                        onChangeText={setTaskNewTitleValue}
                        editable={isEditing}
                        onSubmitEditing={handleSubmitEditing}
                        style={item.done ? styles.taskTextDone : styles.taskText}
                    />

                </TouchableOpacity>
            </View>

            <TouchableOpacity
                testID={`trash-${index}`}
                style={{ paddingHorizontal: 24 }}
                //TODO - use onPress (remove task) prop
                onPress={() => removeTask(item.id)}
            >
                <View style={styles.iconsContainer}>
                    {isEditing ? (
                        <TouchableOpacity
                            onPress={handleCancelEditing}
                        >
                            <Icon name="x" size={24} color="#b2b2b2" />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            onPress={handleStartEditing}
                        >
                            <Image source={editIcon} />
                        </TouchableOpacity>
                    )}
                    <View
                        style={styles.iconsDivider}
                    />
                    <TouchableOpacity
                        disabled={isEditing}
                        onPress={() => removeTask(item.id)}
                    >
                        <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1 }} />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </>
    )
}


const styles = StyleSheet.create({
    taskButton: {
        flex: 1,
        paddingHorizontal: 24,
        paddingVertical: 15,
        marginBottom: 4,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center'
    },
    taskMarker: {
        height: 16,
        width: 16,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#B2B2B2',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskText: {
        color: '#666',
        fontFamily: 'Inter-Medium'
    },
    taskMarkerDone: {
        height: 16,
        width: 16,
        borderRadius: 4,
        backgroundColor: '#1DB863',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskTextDone: {
        color: '#1DB863',
        textDecorationLine: 'line-through',
        fontFamily: 'Inter-Medium'
    },
    iconsContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly"
    },
    iconsDivider: {
        width: 15,
        height: 24,
        color: "rgba(196, 196, 196, 0.24)"
    }
})