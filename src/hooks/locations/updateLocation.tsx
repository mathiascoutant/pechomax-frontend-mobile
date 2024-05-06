import Toast from 'react-native-toast-message';
import AxiosClient from '../axios';

export const updateLocation = async (locationId: string, updateData: any) => {
    try {
        console.log('updateData', updateData);
        
        const response = await AxiosClient.put(`/locations/update/${locationId}`, updateData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (![200, 201].includes(response.status)) {
            throw new Error('Failed to update location');
        }

        Toast.show({
            type: 'success',
            text1: 'Localisation mise à jour avec succès',
            visibilityTime: 4000,
            autoHide: true,
        });

        const data = response.data;
        return data;
    } catch (error) {
        console.error(error);

        Toast.show({
            type: 'error',
            text1: 'Erreur lors de la mise à jour de la localisation',
            text2: 'Veuillez réessayer plus tard',
            visibilityTime: 4000,
            autoHide: true,
        });

        return null;
    }
};
