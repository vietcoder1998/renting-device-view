import Cookies from "universal-cookie";

export function saveToken(token: string) {
    return new Cookies().set('ssid', token)
}


export function getToken() {
    return new Cookies().get('ssid')
}

export function removeToken() {
    return new Cookies().remove('ssid')
}