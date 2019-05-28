import localforage from 'localforage';
import { FOUNDATIONS, ORGANIZATIONS, COLLECTIONS } from "../constants/cacheItems";

export class InstitutionsData {
    static instanceVal = null;

    static get instance() {
        if (!this.instanceVal) {
            this.instanceVal = new InstitutionsData();
        }

        return this.instanceVal;
    }

    init = () => {
        localforage.config();

        localforage.getItem(FOUNDATIONS).then((item) => {

            console.log(item);
            if (!item) {console.log('w localforage nic jeszcze nie ma');

                const foundations = [];
                foundations.push({
                    name: 'Fundacja  “Dbam o Zdrowie”',
                    goal: 'Cel i misja: Pomoc osobom znajdującym się w trudnej sytuacji życiowej.',
                    description: 'ubrania, jedzenie, sprzęt AGD, meble, zabawki'
                });
                foundations.push({
                    name: 'Fundacja  “Dla dzieci”',
                    goal: 'Cel i misja: Pomoc zieciom z ubogich rodzin.',
                    description: 'ubrania, meble, zabawki'
                });
                foundations.push({
                    name: 'Fundacja  “Bez domu” ',
                    goal: 'Cel i misja: Pomoc dla osób nie posiadających miejsca zamieszkania',
                    description: 'ubrania, jedzenie, ciepłe koce'
                });
                foundations.push({ name: 'Fundacja A', goal: 'Cel i misja: A', description: 'opis A' });
                foundations.push({ name: 'Fundacja B', goal: 'Cel i misja: B', description: 'opis B' });
                foundations.push({ name: 'Fundacja C', goal: 'Cel i misja: C', description: 'opis C' });
                foundations.push({ name: 'Fundacja D', goal: 'Cel i misja: D', description: 'opis D' });
                foundations.push({ name: 'Fundacja E', goal: 'Cel i misja: E', description: 'opis E' });

                localforage.setItem(FOUNDATIONS, foundations).then((value) => console.log(value));
            }
        });

        localforage.getItem(ORGANIZATIONS).then((item) => {

            if(!item) {

                const organizations = [];
                organizations.push({ name: 'Organizacja A', goal: 'Cel i misja: A', description: 'opis A' });
                organizations.push({ name: 'Organizacja B', goal: 'Cel i misja: B', description: 'opis B' });
                organizations.push({ name: 'Organizacja C', goal: 'Cel i misja: C', description: 'opis C' });
                organizations.push({ name: 'Organizacja D', goal: 'Cel i misja: D', description: 'opis D' });

                localforage.setItem(ORGANIZATIONS, organizations).then((value) => console.log(value));
            }
        });

        localforage.getItem(COLLECTIONS).then((item) => {

            if(!item) {

                const collections = [];
                collections.push({ name: 'Zbiórka A', goal: 'Cel i misja: A', description: 'opis A' });
                collections.push({ name: 'Zbiórka B', goal: 'Cel i misja: B', description: 'opis B' });

                localforage.setItem(COLLECTIONS, collections).then((value) => console.log(value));
            }
        });
    };

    // getOrganizations() {
    //     return localforage.getItem(ORGANIZATIONS);
    // }
    //
    // getFoundations() {
    //     return localforage.getItem(FOUNDATIONS);
    // }
    //
    // getCollections() {
    //     return localforage.getItem(COLLECTIONS);
    // }

    getInstitutions = (institutionsType) => {
        return localforage.getItem(institutionsType);
    };

    saveFoundation = (foundation) => {
        let foundations = [];

        return this.getInstitutions(FOUNDATIONS).then((value) => {
            foundations = value;
            foundations.push(foundation);
            return localforage.setItem(FOUNDATIONS, foundations);
        });
    };

    saveOrganization = (organization) => {
        let organizations = [];
        this.getInstitutions(ORGANIZATIONS).then((value) => {
            organizations = value;
            organizations.push(organization);
            localforage.setItem(ORGANIZATIONS, organizations);
        });
    };

    saveCollection = (collection) => {
        let collections = [];
        this.getInstitutions(COLLECTIONS).then((value) => {
            collections = value;
            collections.push(collection);
            localforage.setItem(COLLECTIONS, collections);
        });
    };
}
