import FormGive from "../layouts/FormGive/FormGive";
import FormCollect from "../layouts/FormCollect/FormCollect"
import Register from "../layouts/Register/Register";
import Login from "../layouts/Login/Login";

export const pageRoutes = [{
    route: 'login',
    title: 'Login',
    component: Login
}, {
    route: 'register',
    title: 'Register',
    component: Register
}, {
    route: 'form',
    title: 'Form',
    component: FormGive
}, {
    route: 'collect',
    title: 'Collect',
    component: FormCollect
}];

export const sectionRoutes = [{
    route: 'welcome',
    title: 'Welcome'
}, {
    route: 'fourSteps',
    title: 'FourSteps'
}, {
    route: 'about',
    title: 'About'
}, {
    route: 'institutions',
    title: 'Institutions'
}, {
    route: 'contact',
    title: 'Contact'
}];