// Packages Imports
import * as SecureStore from 'expo-secure-store';

// function to set Item in SecureStore for a key
async function SetItem(key: string, value: string) {
    try {
        let result = await SecureStore.setItemAsync(key, value);

        return result;
    } catch (error) {
        return null;
    }
}

// function to get Item from SecureStore for a key
async function GetItem(key: string) {
    try {
        let result = await SecureStore.getItemAsync(key);

        return result;
    } catch (error) {
        return null;
    }
}

// function to delete Item from SecureStore for a key
async function RemoveItem(key: string) {
    try {
        let result = await SecureStore.deleteItemAsync(key);

        return result;
    } catch (error) {
        return null;
    }
}

// Exports
export default { SetItem, GetItem, RemoveItem };