export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: '2-digit' });
};

export const getSpeedLim = (speed) => {
    const speed_lim = speed / 1000
    if (speed_lim < 1000) {
        return `${speed_lim} Мб/с`
    } else if (speed_lim >= 1000) {
        return `${speed_lim / 1000} Гб/с`
    }
}

export const getTraffic = (bytes) => {
    const megaBytes = +(bytes / 1048576)
    if (megaBytes < 1000) {
        return `${megaBytes.toFixed(2)} Мб`
    } else if (megaBytes >= 1000) {
        return `${(megaBytes / 1000).toFixed(2)} Гб`
    }
}