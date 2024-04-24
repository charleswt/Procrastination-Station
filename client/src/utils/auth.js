import decode from 'jwt-decode';
import Cookies from 'universal-cookie';

const cookies = new Cookies()

class AuthCookieToken {
    login(tokenId) {
        cookies.set('token_auth', tokenId);
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

    async checkExpiration() {
        try{
        console.log('Hello')
        const token = cookies.get('token_auth');
        const decoded = decode(token);

        if(decoded.exp < Date.now()/1000) {
            cookies.remove('token_auth');
            return true;
        }
        return false;
        }catch(err){
            console.error(err)
        }
    }
}

export default new AuthCookieToken()