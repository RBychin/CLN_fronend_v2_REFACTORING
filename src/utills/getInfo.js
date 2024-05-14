import {getApiRequest, postApiRequest} from "./requests";
import {WebUrls} from "./config";

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


export const Logout = async (accepted, data) => {
    if (accepted) {
        const response = await getApiRequest(
            '/logout',
            data,
        )
    }
}


export const getPinSettings = async (pin) => {
    try {
        const response = await postApiRequest('/settings', {}, {
            getSettings: {pin: pin}
        })
        return await response.json()

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}


export const SetNotifications = async (pin, value) => {

    const response = await postApiRequest(
        '/settings',
        {},
        {setNotifications: {pin: pin, value: value}}
    ).then((response) => {
        return response;
    })
}