// packages Imports
import jwtDecode from "jwt-decode";

// function to verify a JWT Token
function decodeToken<T>(token: string): T {
    try {
        const payload = jwtDecode<T>(token);

        return payload;
    } catch (error) {
        return null;
    }
}

// exports
export default {
    decodeToken
}