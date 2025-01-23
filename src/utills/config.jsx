class WebApp {
    tgWindow = window.Telegram.WebApp
    constructor() {
        this.user = this.tgWindow.initDataUnsafe.user
        this.themeParams = this.tgWindow.themeParams
        this.apiUrl = 'https://rbychin.ddns.net/cln-v2/api'

        this.colors = {
            buttonColor: this.tgWindow.themeParams.button_color,
            hintColor: this.tgWindow.themeParams.hint_color
        }

        this.HapticFeedback = {
            error: () => this.tgWindow.HapticFeedback.notificationOccurred('error'),
            success: () => this.tgWindow.HapticFeedback.notificationOccurred('success'),
            warning: () => this.tgWindow.HapticFeedback.notificationOccurred('warning'),
            light: () => this.tgWindow.HapticFeedback.impactOccurred('light'),
            medium: () => this.tgWindow.HapticFeedback.impactOccurred('medium'),
            heavy: () => this.tgWindow.HapticFeedback.impactOccurred('heavy'),
            soft: () => this.tgWindow.HapticFeedback.impactOccurred('soft')
        }
    }
}


class Urls {
    BASE_URL = '/v2/';

    constructor() {
        this.PaymentPage = this.addBaseUrl('pay');
        this.UserPage = this.addBaseUrl('user');
        this.Settings = this.addBaseUrl('settings');
        this.LoginPage = this.addBaseUrl('login');
        this.AccountPage = this.addBaseUrl('account');
        this.ErrorPage = this.addBaseUrl('error');
    }

    addBaseUrl(url) {
        return this.BASE_URL + url;
    }
}

export const WebUrls = new Urls()
export const Config = new WebApp()