import localforage from 'localforage';
import { FOUNDATIONS, ORGANIZATIONS, COLLECTIONS } from "../constants/cacheItems";

export function Institution(name, goal, description, proteges, localization) {
    this.id = 0;
    this.name = name;
    this.goal = goal;
    this.description = description;
    this.proteges = proteges;
    this.localization = localization;
    this.keyWords = [];
    this.collectedThings = [];
}

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

            if (!item) {

                const foundations = [];

                let name = 'Fundacja  “Dbam o Zdrowie”';
                let goal = 'Cel i misja: Pomoc osobom znajdującym się w trudnej sytuacji życiowej.';
                let description = 'ubrania, jedzenie, sprzęt AGD, meble, zabawki';
                let proteges = 'homeless, singleMothers,';
                let localization = 'Kraków';

                let foundation = new Institution(name, goal, description, proteges, localization);
                foundation.id = 1;
                foundation.keyWords = ['dbam', 'zdrowie'];
                foundation.collectedThings = ['goodClothes', 'toys', 'other'];
                foundations.push(foundation);

                name = 'Fundacja  “Dla dzieci”';
                goal = 'Cel i misja: Pomoc dzieciom z ubogich rodzin.';
                description = 'ubrania, meble, zabawki';
                proteges = 'children,';
                localization = 'Gdańsk';

                foundation = new Institution(name, goal, description, proteges, localization);
                foundation.id = 2;
                foundation.keyWords = ['dzieci'];
                foundation.collectedThings = ['goodClothes', 'toys', 'other'];
                foundations.push(foundation);

                name = 'Fundacja  “Bez domu”';
                goal = 'Cel i misja: Pomoc dla osób nie posiadających miejsca zamieszkania';
                description = 'ubrania, jedzenie, ciepłe koce';
                proteges = 'homeless,';
                localization = 'Wrocław';

                foundation = new Institution(name, goal, description, proteges, localization);
                foundation.id = 3;
                foundation.keyWords = ['bez', 'domu'];
                foundation.collectedThings = ['goodClothes', 'other'];
                foundations.push(foundation);

                foundation = new Institution('Fundacja A', 'Cel i misja: A', 'opis A', 'disabled,', 'Warszawa');
                foundation.id = 4;
                foundation.keyWords = ['a'];
                foundation.collectedThings = ['goodClothes', 'books', 'other'];
                foundations.push(foundation);
                foundation = new Institution('Fundacja B', 'Cel i misja: B', 'opis B', 'elderly, disabled,', 'Gdańsk');
                foundation.id = 5;
                foundation.keyWords = ['b'];
                foundation.collectedThings = ['toys', 'other', 'books'];
                foundations.push(foundation);
                foundation = new Institution('Fundacja C', 'Cel i misja: C', 'opis C', 'homeless,', 'Warszawa');
                foundation.id = 6;
                foundation.keyWords = ['c'];
                foundation.collectedThings = ['goodClothes', 'books'];
                foundations.push(foundation);
                foundation = new Institution('Fundacja D', 'Cel i misja: D', 'opis D', 'children, singleMothers,', 'Poznań');
                foundation.id = 7;
                foundation.keyWords = ['d'];
                foundation.collectedThings = ['toys', 'other'];
                foundations.push(foundation);
                foundation = new Institution('Fundacja E', 'Cel i misja: E', 'opis E', 'elderly, singleMothers,', 'Wrocław');
                foundation.id = 8;
                foundation.keyWords = ['e'];
                foundation.collectedThings = ['goodClothes', 'other'];
                foundations.push(foundation);



                // foundations.push({
                //     name: 'Fundacja  “Dbam o Zdrowie”',
                //     goal: 'Cel i misja: Pomoc osobom znajdującym się w trudnej sytuacji życiowej.',
                //     description: 'ubrania, jedzenie, sprzęt AGD, meble, zabawki'
                // });
                // foundations.push({
                //     name: 'Fundacja  “Dla dzieci”',
                //     goal: 'Cel i misja: Pomoc dzieciom z ubogich rodzin.',
                //     description: 'ubrania, meble, zabawki'
                // });
                // foundations.push({
                //     name: 'Fundacja  “Bez domu”',
                //     goal: 'Cel i misja: Pomoc dla osób nie posiadających miejsca zamieszkania',
                //     description: 'ubrania, jedzenie, ciepłe koce'
                // });
                // foundations.push({ name: 'Fundacja A', goal: 'Cel i misja: A', description: 'opis A' });
                // foundations.push({ name: 'Fundacja B', goal: 'Cel i misja: B', description: 'opis B' });
                // foundations.push({ name: 'Fundacja C', goal: 'Cel i misja: C', description: 'opis C' });
                // foundations.push({ name: 'Fundacja D', goal: 'Cel i misja: D', description: 'opis D' });
                // foundations.push({ name: 'Fundacja E', goal: 'Cel i misja: E', description: 'opis E' });

                localforage.setItem(FOUNDATIONS, foundations).then((value) => console.log(value));
            }
        });

        localforage.getItem(ORGANIZATIONS).then((item) => {

            if(!item) {

                const organizations = [];

                let organization = new Institution('Organizacja A', 'Cel i misja: A', 'opis A', 'homeless,', 'Gdańsk');
                organization.id = 1;
                organization.keyWords = ['a'];
                organization.collectedThings = ['goodClothes', 'toys', 'other'];
                organizations.push(organization);

                organization = new Institution('Organizacja B', 'Cel i misja: B', 'opis B', 'disabled,', 'Wrocław');
                organization.id = 2;
                organization.keyWords = ['b'];
                organization.collectedThings = ['other', 'books'];
                organizations.push(organization);

                organization = new Institution('Organizacja C', 'Cel i misja: C', 'opis C', 'disabled, children,', 'Poznań');
                organization.id = 3;
                organization.keyWords = ['c'];
                organization.collectedThings = ['goodClothes', 'books'];
                organizations.push(organization);

                organization = new Institution('Organizacja D', 'Cel i misja: D', 'opis D', 'singleMothers,', 'Warszawa');
                organization.id = 4;
                organization.keyWords = ['d'];
                organization.collectedThings = ['toys', 'other', 'books'];
                organizations.push(organization);

                // organizations.push({ name: 'Organizacja A', goal: 'Cel i misja: A', description: 'opis A' });
                // organizations.push({ name: 'Organizacja B', goal: 'Cel i misja: B', description: 'opis B' });
                // organizations.push({ name: 'Organizacja C', goal: 'Cel i misja: C', description: 'opis C' });
                // organizations.push({ name: 'Organizacja D', goal: 'Cel i misja: D', description: 'opis D' });

                localforage.setItem(ORGANIZATIONS, organizations).then((value) => console.log(value));
            }
        });

        localforage.getItem(COLLECTIONS).then((item) => {

            if(!item) {

                const collections = [];

                let collection = new Institution('Zbiórka A', 'Cel i misja: A', 'opis A', 'elderly,', 'Wrocław');
                collection.id = 1;
                collection.keyWords = ['a'];
                collection.collectedThings = ['badClothes', 'other'];
                collections.push(collection);

                collection = new Institution('Zbiórka B', 'Cel i misja: B', 'opis B', 'elderly, disabled,', 'Poznań');
                collection.id = 2;
                collection.keyWords = ['b'];
                collection.collectedThings = ['badClothes', 'other', 'books'];
                collections.push(collection);

                // collections.push({ name: 'Zbiórka A', goal: 'Cel i misja: A', description: 'opis A' });
                // collections.push({ name: 'Zbiórka B', goal: 'Cel i misja: B', description: 'opis B' });

                localforage.setItem(COLLECTIONS, collections).then((value) => console.log(value));
            }
        });
    };

    setInstitutionId(institutionType) {
        this.getInstitutions(institutionType).then((institutions) => {

            if(!institutions) {
                return 1;
            } else {
                institutions.sort((a, b) => b.id - a.id );
                return ++institutions[0].id;
            }
        });
    }

    getInstitutions = (institutionsType) => {
        return localforage.getItem(institutionsType);
    };

    getAllInstitutions() {

        // let institutions = [];

        return Promise.resolve(this.getInstitutions(FOUNDATIONS).then((foundations) => {
            return [...foundations];
        }).then((institutions) => {
            return this.getInstitutions(ORGANIZATIONS).then((organizations) => {
                return institutions.concat(organizations);
            }).then((institutions) => {
                return this.getInstitutions(COLLECTIONS).then((collections) => {
                    return institutions.concat(collections);
                });
            });
        }));
    }


    saveFoundation = (foundation) => {
        let foundations = [];
        this.getInstitutions(FOUNDATIONS).then((value) => {
            foundations = value;
            foundations.push(foundation);
            localforage.setItem(FOUNDATIONS, foundations);
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