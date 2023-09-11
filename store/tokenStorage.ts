// Packages Imports
import { MMKV } from "react-native-mmkv"

const storage = new MMKV()

export function getMMKVItem(key: string) {
    return storage.getString(key)
}

export function setMMKVItem(key: string, value: string) {
    storage.set(key, value)
}

export function removeMMKVItem(key: string) {
    storage.delete(key)
}

export function setRefreshToken(token: string) {
    setMMKVItem('refreshToken', token)
}

export function getRefreshToken() {
    return getMMKVItem('refreshToken')
}

export function removeRefreshToken() {
    removeMMKVItem('refreshToken')
}

export function setAccessToken(token: string) {
    setMMKVItem('accessToken', token)
}

export function getAccessToken() {
    return getMMKVItem('accessToken')
}

export function removeAccessToken() {
    removeMMKVItem('accessToken')
}

