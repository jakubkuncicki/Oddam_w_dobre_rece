export const auth = {
    isLogged: false,
    signIn() {
        this.isLogged = true;
    },
    signOut() {
        this.isLogged = false;
    }
};