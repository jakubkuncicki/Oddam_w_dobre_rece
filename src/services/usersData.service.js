import localforage from 'localforage';

export function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export function User(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.settings = {};
    this.gifts = [];
    this.collections= [];
}

export function Gift() {
    this.realized = false;
    this.giftType = '';
    this.bagsNumber = 0;
    this.institutionName = '';
    this.institutionId = '';
    this.address = {
        street: '',
        city: '',
        postCode: '',
        tel: '',
    };
    this.date = {
        day: '',
        time: '',
        message: '',
    };
}

export const ACTIVE_USER_PERSISTENCE_KEY = 'user';
export const USERS_PERSISTENCE_KEY = 'users';

// Error codes
export const INVALID_USERNAME_PASSWORD = 'invalid username or password';

export class UsersData {
    static instanceVal = null;

    static get instance() {
        if (!this.instanceVal) {
            this.instanceVal = new UsersData();
        }

        return this.instanceVal;
    }

    init() {
        localforage.config();
        localforage.getItem(USERS_PERSISTENCE_KEY).then((users) => {
            if (!users) {
                let testUser = new User('Kuba', 'jakub.kuncicki@gmail.com', '123456');
                let initUsers = [testUser];

                localforage.setItem(USERS_PERSISTENCE_KEY, initUsers);
            }
        });
    };

    getCurrentUser() {
        return localforage.getItem(ACTIVE_USER_PERSISTENCE_KEY).then((user) => {
           return user || null;
        });
    }

    getUsers = () => {
        return localforage.getItem(USERS_PERSISTENCE_KEY);
    };

    hasUserAccount = (email, password, users) => {
        if (users !== null) {

            for (let i = 0; i < users.length; i++) {
                if (email === users[i].email && password === users[i].password) {
                    return true;
                }
            }
        }

        return false;

        // return this.getUsers().then((users) => {
        //
        //     for(let i = 0; i < users.length; i++) {
        //     if(email === users[i].email) {
        //         if(password === users[i].password){
        //             console.log('password and email correct');
        //             return true;
        //         }
        //     }
        // }
        //     console.log('password and email incorrect');
        //
        // return false;
        // });
    };

    getUser = (email) => {
        return this.getUsers().then((users) => {
            for(let i = 0; i < users.length; i++) {
                if(users[i].email === email) {
                    return users[i];
                }
            }
        });
    };

    setUserId = () => {
        this.getUsers().then((users) => {

            if(users.length === 0) {
                return 1;
            } else {
                users.sort((a, b) => b.id - a.id );
                return ++users[0].id;
            }
        });
    };

    saveUser = (user) => {
        user.id = this.setUserId();
        return this.getUsers().then((users) => {
            users.push(user);
            return localforage.setItem(USERS_PERSISTENCE_KEY, users);
        });
    };

    saveGift = (email, gift) => {
        return this.getUsers().then((users) => {
            for(let i = 0; i < users.length; i++) {
                if(users[i].email === email) {
                    users[i].gifts.push(gift);
                    return localforage.setItem(USERS_PERSISTENCE_KEY, users);
                }
            }
        });
    };

    signIn(username, password) {
        return this.getUsers().then((users) => {
            const userExists = this.hasUserAccount(username, password, users);

            if (userExists) {
               return this.getUser(username).then((user) => {
                   return localforage.setItem(ACTIVE_USER_PERSISTENCE_KEY, user)
               });
            }

            throw new Error(INVALID_USERNAME_PASSWORD);
        });
    }

    signOut() {
        return localforage.removeItem(ACTIVE_USER_PERSISTENCE_KEY);
    }
}
