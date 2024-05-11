import {getApiRequest} from "./requests";

export const getTransaction = async () => {
    try {
        return await getApiRequest('/transactions', {})
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};


export const getStories = async () => {
    try {
        const storiesResponse = await getApiRequest('/stories', {})
        return Object.values(storiesResponse);

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}


export const getProfile = async () => {
    try {
        const response = await getApiRequest('/me', {})
        return await response;

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}