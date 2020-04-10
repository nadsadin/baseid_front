import './../scss/app.scss';
import * as mdc from 'material-components-web';
import {MDCTopAppBar} from '@material/top-app-bar';
import {MDCDrawer} from "@material/drawer";
import {MDCList} from "@material/list";
import {MDCIconButtonToggle} from '@material/icon-button';
import mdcAutoInit from '@material/auto-init';
import {MDCTextField} from '@material/textfield';
import './bootstrap';
import 'popper.js'
import './../img/logo.png';
$(function() {
    console.log('Hello world');
    $('[data-toggle="tooltip"]').tooltip();
});

mdcAutoInit.register('MDCTextField', MDCTextField);
mdc.autoInit();
// Select DOM elements

const topAppBarElement = document.querySelector('.mdc-top-app-bar');
const listEl = document.querySelector('.mdc-drawer .mdc-list');
const drawerElement = document.querySelector('.mdc-drawer');
const mainContentEl = document.querySelector('.top-app-bar__scroll-target');

if(topAppBarElement){
    const topAppBar = MDCTopAppBar.attachTo(topAppBarElement);
    topAppBar.setScrollTarget(mainContentEl);
}
// Initialize either modal or permanent drawer

const initModalDrawer = () => {
    drawerElement.classList.add("mdc-drawer--modal");
    const drawer = MDCDrawer.attachTo(drawerElement);
    drawer.open = false;

    topAppBar.listen('MDCTopAppBar:nav', () => {
        drawer.open = !drawer.open;
    });

    listEl.addEventListener('click', (event) => {
        drawer.open = false;
    });

    return drawer;
}

const initPermanentDrawer = () => {
    drawerElement.classList.remove("mdc-drawer--modal");
    const list = new MDCList(listEl);
    list.wrapFocus = true;
    return list;
}
if(drawerElement){
    // let drawer = window.matchMedia("(max-width: 900px)").matches ? initModalDrawer() : initPermanentDrawer();
}

// Toggle between permanent drawer and modal drawer at breakpoint 900px

const resizeHandler = () => {
    if (window.matchMedia("(max-width: 900px)").matches && drawer instanceof MDCList) {
        drawer.destroy();
        drawer = initModalDrawer();
    } else if (window.matchMedia("(min-width: 900.5px)").matches && drawer instanceof MDCDrawer) {
        drawer.destroy();
        drawer = initPermanentDrawer();
    }
}
// window.addEventListener('resize', resizeHandler);

let vh = window.innerHeight * 0.01;
let bar_width = document.querySelector('.top-app-bar__scroll-target').clientWidth;
document.documentElement.style.setProperty('--vh', `${vh}px`);
document.documentElement.style.setProperty('--mdc-top-app-bar-width', `${bar_width}px`);
window.addEventListener('resize', () => {
    let vh = window.innerHeight * 0.01;
    let bar_width = document.querySelector('.top-app-bar__scroll-target').clientWidth;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    document.documentElement.style.setProperty('--mdc-top-app-bar-width', `${bar_width}px`);
});

const icon_buttons = document.querySelectorAll(".mdc-icon-button");
for(const icon_button of icon_buttons){
    new MDCIconButtonToggle(icon_button);
}
