// packages Imports
import { jwtDecode } from 'jwt-decode';

// function to verify a JWT Token
export function decodeToken(token: string) {
  try {
    let payload = jwtDecode(token);

    delete payload.iat;
    delete payload.exp;

    return payload;
  } catch (error) {
    return null;
  }
}
