import React, { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AxiosClient from '../../hooks/axios';
import Toast from 'react-native-toast-message';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faImage, faPaperPlane, faTimes } from '@fortawesome/free-solid-svg-icons';
import { BACKGROUND_COLOR, BORDER_COLOR, TEXT_COLOR } from '../../utils/colors';
import { Input } from '@rneui/base';

const ConversationAddMessage = ({ onSubmit, conversationId }: { onSubmit: Function, conversationId: string }) => {
    const [message, setMessage] = useState('');
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleChangeText = (text: string) => {
        setMessage(text);
    };

    const openImagePicker = async () => {
        try {
            const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        
            if (!permissionResult.granted) {
                alert('Permission to access camera roll is required!');
                return;
            }
        
            const pickerResult = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 1,
            });      
        
            if (!pickerResult.canceled) {
                setSelectedImage(pickerResult.assets[0].uri);
            }
            
        } catch (error) {
            console.error('Error choosing image: ', error);
        }
    };
    
    const handleRemoveImage = () => {
        setSelectedImage(null);
    };

    const handleSubmit = async () => {
        try {
            if (!message.trim() && !selectedImage) {
                Toast.show({
                    type: 'error',
                    text1: 'Leurre non envoyé',
                    text2: 'Veuillez saisir un message avant de ferrer 🦈',
                });
                return;
            }
        
            const formData = new FormData();
            formData.append('conversationId', conversationId);
            formData.append('content', message);
        
            
            if (selectedImage) {
                const uriParts = selectedImage.split('.');
                const fileType = uriParts[uriParts.length - 1];
                formData.append('pictures', {
                    uri: selectedImage,
                    name: `pictures.${fileType}`,
                    type: `image/${fileType}`,
                });
            }

            const response = await AxiosClient.post('/messages/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            Toast.show({
                type: 'success',
                text1: 'Leurre envoyé ! 🎣',
                text2: 'Votre message a bien été envoyé.',
            });
        
            onSubmit(response.data);
            setMessage('');
            setSelectedImage(null);
        } catch (error) {
            console.error('Error submitting message:', error);
        }
    };
    

    return (
        <View style={styles.container}>
            {selectedImage && (
                <View style={styles.selectedImageContainer}>
                    <TouchableOpacity style={styles.removeImageButton} onPress={handleRemoveImage}>
                        <FontAwesomeIcon icon={faTimes} size={20} color="#fff" />
                    </TouchableOpacity>
                    <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
                </View>
            )}
            <View style={styles.inputContainer}>
                <TouchableOpacity style={styles.imageButton} onPress={openImagePicker}>
                    <FontAwesomeIcon icon={faImage} size={20} color="#ccc"/>
                </TouchableOpacity>        
                <Input
                    style={styles.input}
                    placeholder="Tapez votre message..."
                    placeholderTextColor={'#888'}
                    value={message}
                    onChangeText={handleChangeText}
                />
                <TouchableOpacity style={styles.sendButton} onPress={handleSubmit}>
                    <FontAwesomeIcon icon={faPaperPlane} size={20} color="#ccc"/>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: BACKGROUND_COLOR,
        borderTopColor: BORDER_COLOR,
        borderTopWidth: 1,
    },
    selectedImageContainer: {
        position: 'relative',
        alignItems: 'center',
        borderTopColor: '#414E51',
        borderTopWidth: 1,
    },
    removeImageButton: {
        position: 'absolute',
        top: 5,
        right: 5,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 50,
        padding: 5,
    },
    selectedImage: {
        width: 100,
        height: 100,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '80%',
        left: '10%',
    },
    imageButton: {
        marginRight: 10,
        paddingBottom: 15,
    },
    input: {
        color: TEXT_COLOR,
    },
    sendButton: {
        marginLeft: 10,
        paddingBottom: 15,
    },
});

export default ConversationAddMessage;
