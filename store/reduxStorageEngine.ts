// Packages Imports
import { MMKV } from "react-native-mmkv"
import { Storage } from 'redux-persist'

// Create a MMKV instance
const storage = new MMKV()

// Exporting the storage engine
const reduxStorageEngine: Storage = {
    // function to set a key value pair
    setItem: (key, value) => {
        storage.set(key, value)
        return Promise.resolve(true)
    },
    // function to get a value for a key
    getItem: (key) => {
        const value = storage.getString(key)
        return Promise.resolve(value)
    },
    // function to remove a key from the storage
    removeItem: (key) => {
        storage.delete(key)
        return Promise.resolve()
    },
}

// export the storage engine
export default reduxStorageEngine