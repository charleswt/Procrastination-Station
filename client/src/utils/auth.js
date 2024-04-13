import decode from 'jwt-decode';
import Cookies from 'universal-cookie';

const cookies = new Cookies()

class AuthCookieToken {
    login(token) {
        cookies.set('toke_auth', token);
        window.location.reload();
    }

    getToken() {
        return cookies.get('token_auth');
    }

    logout() {
        cookies.remove('token_auth');
        window.location.reload();
    }

    loggedIn() {
        const token = this.getToken();
        return token && !this.checkExpiration(token) ? true:false;
    }

    checkExpiration(token) {
        const decoded = decode(token);

        if(decoded.exp < Date.now()/1000) {
            cookies.remove('token_auth');
            return true;
        }
        return false;
    }
}

export default new AuthCookieToken()