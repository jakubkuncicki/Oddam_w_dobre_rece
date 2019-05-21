import localforage from 'localforage';
import { FOUNDATIONS } from "../constants/cacheItems";

const organizations = [];
organizations.push({ name: 'Organizacja A', goal: 'Cel i misja: A', description: 'opis A' });
organizations.push({ name: 'Organizacja B', goal: 'Cel i misja: B', description: 'opis B' });
organizations.push({ name: 'Organizacja C', goal: 'Cel i misja: C', description: 'opis C' });
organizations.push({ name: 'Organizacja D', goal: 'Cel i misja: D', description: 'opis D' });

const collections = [];
collections.push({ name: 'Zbiórka A', goal: 'Cel i misja: A', description: 'opis A' });
collections.push({ name: 'Zbiórka B', goal: 'Cel i misja: B', description: 'opis B' });


localforage.setItem('organizations', organizations).then((value) => console.log(value));
localforage.setItem('collections', collections).then((value) => console.log(value));

export class Institutions {
    /**
     * To odpal w App.jsx
     */
    init() {
        localforage.config();

// localforage.config({
//     driver: [localforage.WEBSQL,
//         localforage.INDEXEDDB,
//         localforage.LOCALSTORAGE],
//     name: 'WebSQL-Rox'
// });

        localForage.getItem(FOUNDATIONS).then((item) => {
            if (!item) {
                const fundations = [];
                fundations.push({
                    name: 'Fundacja  “Dbam o Zdrowie”',
                    goal: 'Cel i misja: Pomoc osobom znajdującym się w trudnej sytuacji życiowej.',
                    description: 'ubrania, jedzenie, sprzęt AGD, meble, zabawki'
                });
                fundations.push({
                    name: 'Fundacja  “Dla dzieci”',
                    goal: 'Cel i misja: Pomoc zieciom z ubogich rodzin.',
                    description: 'ubrania, meble, zabawki'
                });
                fundations.push({
                    name: 'Fundacja  “Bez domu” ',
                    goal: 'Cel i misja: Pomoc dla osób nie posiadających miejsca zamieszkania',
                    description: 'ubrania, jedzenie, ciepłe koce'
                });
                fundations.push({ name: 'Fundacja A', goal: 'Cel i misja: A', description: 'opis A' });
                fundations.push({ name: 'Fundacja B', goal: 'Cel i misja: B', description: 'opis B' });
                fundations.push({ name: 'Fundacja C', goal: 'Cel i misja: C', description: 'opis C' });
                fundations.push({ name: 'Fundacja D', goal: 'Cel i misja: D', description: 'opis D' });
                fundations.push({ name: 'Fundacja E', goal: 'Cel i misja: E', description: 'opis E' });

                localforage.setItem(FOUNDATIONS, fundations).then((value) => console.log(value));
            }
        });
    }

    getOrganizations() {

    }

    getFoundations() {
        return localforage.getItem(FOUNDATIONS);
    }

    getCollections() {

    }

    saveOrganization() {

    }

    saveCollection() {

    }
}
