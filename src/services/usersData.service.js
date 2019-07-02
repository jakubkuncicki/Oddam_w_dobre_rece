import localforage from 'localforage';
import {Institution} from "./institutions.service";

export function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export function User(name, email, password) {
    this.id = 0;
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
    this.institution = new Institution('','','','','');
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
export const ACTIVE_GIFT_PERSISTENCE_KEY = 'gift';

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

    getCurrentGift() {
        return localforage.getItem(ACTIVE_GIFT_PERSISTENCE_KEY).then((gift) => {
            return gift || null;
        })
    }

    setNewGift() {
        return this.getCurrentUser().then((user) => {
            if(user) {
                const newGift = new Gift();
                return localforage.setItem(ACTIVE_GIFT_PERSISTENCE_KEY, newGift);
            }
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

    saveNewUser = (name, email, password) => {
        const user = new User(name, email, password);
        user.id = this.setUserId();
        return this.getUsers().then((users) => {
            users.push(user);
            localforage.setItem(USERS_PERSISTENCE_KEY, users);
            return localforage.setItem(ACTIVE_USER_PERSISTENCE_KEY, user);
        });
    };

    saveGift = (gift) => {
        return this.getCurrentUser().then((user) => {
            if(user) {
                user.gifts.push(gift);
                localforage.removeItem(ACTIVE_GIFT_PERSISTENCE_KEY);
                localforage.setItem(ACTIVE_USER_PERSISTENCE_KEY, user);
                this.getUsers().then((users) => {
                    for (let i = 0; i < users.length; i++) {
                        if (users[i].id === user.id) {
                            users[i] = user;
                            return localforage.setItem(USERS_PERSISTENCE_KEY, users);
                        }
                    }
                });
            }
        });
    };

    savePartialGift(gift) {
        return localforage.setItem(ACTIVE_GIFT_PERSISTENCE_KEY, gift);
    }

    signIn(username, password) {
        return this.getUsers().then((users) => {
            const userExists = this.hasUserAccount(username, password, users);

            if (userExists) {
               return this.getUser(username).then((user) => {
                   return localforage.setItem(ACTIVE_USER_PERSISTENCE_KEY, user);
               });
            }

            throw new Error(INVALID_USERNAME_PASSWORD);
        });
    }

    saveUserChanges() {
        return this.getCurrentUser().then((user) => {
            if(user) {
                this.getUsers().then((users) => {
                    for(let i = 0; i < users.length; i++) {
                        if(users[i].id === user.id) {
                            users[i] = user;
                            return localforage.setItem(USERS_PERSISTENCE_KEY, users);
                        }
                    }

                });
            }
        });
    }

    signOut() {
        return this.saveUserChanges().then(() => {
            localforage.removeItem(ACTIVE_GIFT_PERSISTENCE_KEY);
            return localforage.removeItem(ACTIVE_USER_PERSISTENCE_KEY);
        });
    }
}
