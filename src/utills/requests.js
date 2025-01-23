import {Config, Config as cfg} from "./config";

export const getApiRequest = async (prefix, params_data) => {
    const params = new URLSearchParams(params_data)
    const response = await fetch(`${cfg.apiUrl}${prefix}/?${params}`,
        {
            method: 'GET',
            headers: {
                'Authorization': Config.tgWindow.initData,
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning':'Any'
            }
        });
    return await response.json()
}


export const postApiRequest = async (prefix, params_data, data) => {
    const params = new URLSearchParams(params_data)
    const response = await fetch(`${cfg.apiUrl}${prefix}/?${params}`,
        {
            method: 'POST',
            headers: {
                'Authorization': Config.tgWindow.initData,
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'Any',
                'platform': Config.tgWindow.platform,
            },
            body: JSON.stringify(data)
        });
    return response;
}