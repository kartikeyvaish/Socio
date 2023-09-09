// Packages Imports
import { MMKV } from "react-native-mmkv"

const storage = new MMKV()

export function setAccessToken(token: string) {
    storage.set('accessToken', token)
}

export function getAccessToken() {
    return storage.getString('accessToken')
}

export function removeAccessToken() {
    storage.delete('accessToken')
}

