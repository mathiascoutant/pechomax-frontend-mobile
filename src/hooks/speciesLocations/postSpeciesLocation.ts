import Toast from 'react-native-toast-message';
import AxiosClient from '../axios';

export const postSpeciesLocation = async (speciesId: string, locationId: string) => {
    try {
        console.log('speciesId', speciesId);
        console.log('locationId', locationId);
        
        
        const response = await AxiosClient.post('/speciesLocation/create', {
            speciesId: speciesId,
            locationId: locationId
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.status !== 200 && response.status !== 201) {
            throw new Error('Failed to send data to speciesLocationRoute');
        }
        Toast.show({
            type: 'success',
            text1: 'Espèce bien ajoutée',
            text2: 'Merci pour votre contribution !',
            visibilityTime: 4000,
            autoHide: true,
        });
        
        const data = response.data;
        return data;
    } catch (error) {
        console.error(error);
        Toast.show({
            type: 'error',
            text1: 'Erreur lors de l\'ajout de l\'espèce',
            text2: 'Veuillez réessayer plus tard',
            visibilityTime: 4000,
            autoHide: true,
        });
        return null;
    }
};
