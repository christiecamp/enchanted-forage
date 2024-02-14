//decode token & get user info
import decode from 'jwt-decode';

//instantiate a new AuthService object
class AuthService {
    //get user data
    getProfile() {
        return decode(this.getToken());
    }

    //check if user's logged in
    loggedIn() {
        //check for saved token & it's still valid
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token);
    }

    //check if token is expired
    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            } else return false;
        } catch (err) {
            return false;
        }
    }

    //retrieve token from localStorage
    getToken() {
        return localStorage.getItem('id_token');
    }

    //get user id from token
     getUserId() {
          const token = this.getToken();
          if (!token) {
               //handle error here
               console.error("no token found");
               return null;
          }
          try {
               const { data } = decode(token);
               return data._id;
          } catch (err) {
               //handle error here
               console.error("invalid token", err);
               return null;
          }
     }

    //set token to localStorage & reload page to homepage
    login(idToken) {
        localStorage.setItem('id_token', idToken);
        window.location.assign('/');
    }

    //clear token from localStorage & force logout with reload
    logout() {
        localStorage.removeItem('id_token');
        window.location.assign('/');
    }
}

export default new AuthService();