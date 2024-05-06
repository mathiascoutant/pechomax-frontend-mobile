import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';
import { Message } from '../../interfaces/Message';
import { formatTimeDifference } from '../../hooks/utils';
import { TEXT_COLOR } from '../../utils/colors';

const ConversationMessages = ({ message }: { message: Message }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleImagePress = (uri: string) => {
        setSelectedImage(uri);
        setModalVisible(true);
    };

    return (
        <View style={styles.messageContainer}>
            <Image style={styles.profilePic} source={{ uri: message.user?.profilePic }} />
            <View style={styles.messageContentContainer}>
                <Text style={styles.messageContent}>{message.content}</Text>
                {message.pictures && message.pictures[0] && (
                    <TouchableOpacity onPress={() => handleImagePress(message.pictures[0])}>
                        <Image source={{ uri: message.pictures[0] }} style={{ width: 100, height: 100 }} />
                    </TouchableOpacity>
                )}
                <Text style={styles.messageDetails}>{message.user.username} - {formatTimeDifference(message.createdAt)}</Text>
            </View>
            <Modal visible={modalVisible} transparent={true} onRequestClose={() => setModalVisible(false)}>
              <TouchableOpacity style={styles.modalContainer} onPress={() => setModalVisible(false)}>
              </TouchableOpacity>
              <Image source={{ uri: selectedImage || '' }} style={styles.modalImage} />
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 20,
  },
  messageContentContainer: {
    flex: 1,
  },
  messageContent: {
    fontSize: 16,
    marginBottom: 5,
    color: TEXT_COLOR,
  },
  messageDetails: {
    fontSize: 12,
    color: '#888',
  },
  profilePic: {
    width: 30,
    height: 30,
    borderRadius: 50,
    marginRight: 10,
  },
  modalContainer: {
    flex: 1,
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalImage: {
    width: '95%',
    height: '50%',
    resizeMode: 'contain',
    alignSelf: 'center',
    position: 'absolute',
    backgroundColor: 'black',
    top: '20%',
  },
  closeButton: {
    // position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 16,
  },
});

export default ConversationMessages;
