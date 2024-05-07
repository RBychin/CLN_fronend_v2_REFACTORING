


const getConfig = () => {
    let tgWindow = false
    let user = {
        first_name: 'Профиль',
        id: 1234567890
    }

    try {
        tgWindow = window.Telegram.WebApp
        if (tgWindow.initDataUnsafe.user) {
            user = tgWindow.initDataUnsafe.user
        }
    } catch (error) {

    }

    return {
        apiUrl: 'https://rbychin.ddns.net/cln-v2/api',
        user: user,
        tgWindow: tgWindow
    }
}

export const Config = getConfig()