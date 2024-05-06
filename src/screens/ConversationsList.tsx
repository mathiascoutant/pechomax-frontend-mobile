import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { BACKGROUND_COLOR, TEXT_COLOR } from '../utils/colors';
import { getCategories } from '../hooks/categories/getCategories';
import { getAllUsers } from '../hooks/users/getAllUsers';
import { getConversations } from '../hooks/conversations/getConversations';
import ConversationsFilterComponent from '../components/ConversationsList/ConversationFilterComponent';
import ConversationsListComponent from '../components/ConversationsList/ConversationListComponent';
import { Conversation } from '../interfaces/Conversation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/Navigation';
import { Category } from '../interfaces/Category';
import { User } from '../interfaces/User';
import AddButton from '../components/AddButton';

const ConversationsListContainer = () => {
  type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [showMore, setShowMore] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('Toutes les catégories');
  const [selectedUser, setSelectedUser] = useState<string>('Tout les pêcheurs');
  const [categories, setCategories] = useState<Category[]>([]);
  const [initialConversations, setInitialConversations] = useState<Conversation[]>([]);
  const [initialFilteredConversations, setInitialFilteredConversations] = useState<Conversation[]>([]);
  const [filteredConversations, setFilteredConversations] = useState<Conversation[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [sortBy, setSortBy] = useState<'asc' | 'desc' | ''>('');

  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const isFocused = useIsFocused();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedConversations = await getConversations();
        fetchedConversations.sort((a: { createdAt: Date; }, b: { createdAt: Date; }) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        const fetchedCategories = await getCategories();
        const fetchedUsers = await getAllUsers();
        setUsers(fetchedUsers);
        setCategories(fetchedCategories);
        setInitialFilteredConversations(fetchedConversations);
        setFilteredConversations(fetchedConversations.slice(0, 10));
        setInitialConversations(fetchedConversations);
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      }
    };

    if (isFocused) {
      fetchData();
    }

    return () => {
      handleShowMore();
    };
  }, [isFocused]);

  useEffect(() => {
    setConversations(initialConversations);
  }, [initialConversations]);

  useEffect(() => {
    filterConversations(selectedCategory, selectedUser);
  }, [selectedCategory, selectedUser, sortBy]);

  const filterConversations = (category: string, selectedUser: string) => {
    let filteredConversations: Conversation[] = initialConversations.slice();
    if (sortBy === 'desc') {
      filteredConversations = filteredConversations.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else {
      filteredConversations = filteredConversations.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    }

    if (category !== 'Toutes les catégories') {
      filteredConversations = filteredConversations.filter((conversation: Conversation) => conversation.category.name === category);
    }

    if (selectedUser !== 'Tout les pêcheurs') {
      filteredConversations = filteredConversations.filter((conversation: Conversation) => conversation.user.username === selectedUser);
    }

    setConversations(filteredConversations);
    setFilteredConversations(filteredConversations.slice(0, 10));
    setInitialFilteredConversations(filteredConversations);
  };

  const handleShowMore = () => {
    const remainingConversations = initialFilteredConversations.slice(filteredConversations.length);
    const nextBatch = remainingConversations.slice(0, 10);
    setFilteredConversations(prevState => [...prevState, ...nextBatch]);
    if (remainingConversations.length <= 10) {
      setShowMore(false);
    }
  };

  const toggleSortOrder = () => {
    setSortBy(sortBy === 'asc' ? 'desc' : 'asc');
  };  

  return (
    <View style={styles.container}>
      <ConversationsFilterComponent
        categories={categories}
        users={users}
        setSelectedCategory={setSelectedCategory}
        setSelectedUser={setSelectedUser}
      />
      <ConversationsListComponent
        filteredConversations={filteredConversations}
        showMore={showMore}
        handleShowMore={handleShowMore}
        navigation={navigation}
        sortBy={sortBy}
        toggleSortOrder={toggleSortOrder}
      />
      <AddButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    paddingHorizontal: '2%',
  },
});

export default ConversationsListContainer;
