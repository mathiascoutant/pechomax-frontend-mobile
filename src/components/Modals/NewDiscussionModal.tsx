import React, { useState, useEffect } from 'react';
import { Modal, View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useModal } from '../../contexts/ModalContext';
import { Conversation } from '../../interfaces/Conversation';
import { Message } from '../../interfaces/Message';
import { getCategories } from '../../hooks/categories/getCategories';
import { Category } from '../../interfaces/Category';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { User } from '../../interfaces/User';
import AxiosClient from '../../hooks/axios';
import Toast from 'react-native-toast-message';

interface NewDiscussionModalProps {
  onCreateDiscussion: (conversation: Conversation, message: Message) => void;
}

const NewDiscussionModal: React.FC<NewDiscussionModalProps> = () => {
  const { isModalVisible, toggleModal } = useModal();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categoryId, setSelectedCategoryId] = useState<string>('');
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await getCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleCreateDiscussion = async () => {
    try {
      let response;
  
      if (content === '') {
        response = await AxiosClient.post(
          '/conversations/create',
          JSON.stringify({
            title,
            categoryId
          }),
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );  
      } else {
        const formData = new FormData();
        formData.append('title', title);        
        formData.append('categoryId', categoryId);        
        formData.append('content', content);        
        response = await AxiosClient.post(
          '/conversations/start',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );  
      }
      
      Toast.show({
        type: 'success',
        text1: 'Conversation créée !',
        text2: 'Prêt à pêcher avec la communauté ? 🎣'
      });

      setContent('');
      setTitle('');
      setSelectedCategoryId('');
      toggleModal();
      return response;
    } catch (error) {
      console.error('Erreur lors de la création de la conversation:', error);
      Toast.show({
        type: 'error',
        text1: 'Conversation non créée !',
        text2: 'Êtes-vous sûr de bien remplir tous les champs ? 🤔'
      });
      toggleModal();
      throw error;
    }
  };

  
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={toggleModal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
            <FontAwesomeIcon icon={faClose} size={25}/>
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Nouveau Post</Text>
          <TextInput style={styles.input} placeholder="Titre du post" value={title} onChangeText={setTitle} />
          <TextInput style={styles.input} placeholder="Premier message" multiline value={content} onChangeText={setContent} />
          <SelectDropdown
            data={categories}
            onSelect={(selectedItem) => {
              setSelectedCategoryId(selectedItem.id);
            }}
            renderButton={(selectedItem, isOpened) => {
              return (
                <View style={styles.dropdownButtonStyle}>
                  <Text style={styles.dropdownButtonTxtStyle}>
                    {(selectedItem && selectedItem.name) || 'Sélectionner une catégorie'}
                  </Text>
                  <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
                </View>
              );
            }}
            renderItem={(item, isSelected) => {
              return (
                <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
                  <Text style={styles.dropdownItemTxtStyle}>{item.name}</Text>
                </View>
              );
            }}
            showsVerticalScrollIndicator={true}
            dropdownStyle={styles.dropdownMenuStyle}
          />

          <TouchableOpacity style={styles.createButton} onPress={handleCreateDiscussion}>
            <Text>Créer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    maxHeight: 100,
  },
  dropdownButtonStyle: {
    width: '100%',
    height: 50,
    backgroundColor: '#E9ECEF',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  closeButton: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: '#c7f9cc',
    borderRadius: 50,
    padding: 5,
  },
  createButton: {
    backgroundColor: '#c7f9cc',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
});

export default NewDiscussionModal;