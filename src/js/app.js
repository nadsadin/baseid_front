import './../scss/app.scss';
import * as mdc from 'material-components-web';
import {MDCTopAppBar} from '@material/top-app-bar';
import {MDCDrawer} from "@material/drawer";
import {MDCList} from "@material/list";
import {MDCIconButtonToggle} from '@material/icon-button';
import mdcAutoInit from '@material/auto-init';
import {MDCTextField} from '@material/textfield';
import {MDCSelect} from '@material/select';
import {MDCSwitch} from '@material/switch';
import {MDCChipSet} from '@material/chips';
import {MDCDataTable} from '@material/data-table';
import './bootstrap';
import 'popper.js'
import './../img/logo.png';
import './../img/service_email.png';
import './../img/service_104.png';
import './../img/service_105.png';
$(function() {
    console.log('Hello world');
    $('[data-toggle="tooltip"]').tooltip();
    document.querySelectorAll( '[data-mdc-auto-init="MDCSelect"]' ).forEach( function( sel ) {
        sel.My_MDCSelect__Value = sel.querySelector('input.my_mdc-select__value');
        if ( null !== sel.My_MDCSelect__Value ) {
            sel.addEventListener( 'MDCSelect:change', function( a ) {
                if ( sel.MDCSelect ) {
                    sel.My_MDCSelect__Value.value = sel.MDCSelect.value;
                }
            } );
        }
    } );
//    file field file name
    $('.my-mdc-file-field input:not(:disabled)').on('change',  function (e) {
        let filename = e.target.files[0].name;
        $(this).next('.my-mdc-file-field__filename').text(filename);
    })
    document.querySelectorAll( '.mdc-switch' ).forEach(function (sw) {
        const switchControl = new MDCSwitch(sw);
    });
    document.querySelectorAll( '.mdc-chip-set' ).forEach(function (chip_set) {
        const chipSet = new MDCChipSet(chip_set);
        chipSet.listen('MDCChip:selection', function (event) {
            console.log(event.detail.chipId);
            console.log(event.detail);
        })
    });
    document.querySelectorAll( '.mdc-data-table' ).forEach(function (table) {
        const dataTable = new MDCDataTable(table);
    });
});

mdcAutoInit.register('MDCSelect', MDCSelect);
mdcAutoInit.register('MDCTextField', MDCTextField);
// mdcAutoInit.register('MDCTextField', MDCSwitch);
mdc.autoInit();
// Select DOM elements

const topAppBarElement = document.querySelector('.mdc-top-app-bar');
const listEl = document.querySelector('.mdc-drawer .mdc-list');
const drawerElement = document.querySelector('.mdc-drawer');
const mainContentEl = document.querySelector('.top-app-bar__scroll-target');

if(topAppBarElement) {
    const topAppBar = MDCTopAppBar.attachTo(topAppBarElement);
    topAppBar.setScrollTarget(mainContentEl);

// Initialize either modal or permanent drawer

    const initModalDrawer = () => {
        drawerElement.classList.add("mdc-drawer--modal");
        const drawer = MDCDrawer.attachTo(drawerElement);
        drawer.open = false;

        topAppBar.listen('MDCTopAppBar:nav', () => {
            drawer.open = !drawer.open;
        });

        return drawer;
    }

    const initPermanentDrawer = () => {
        drawerElement.classList.remove("mdc-drawer--modal");
        return drawerElement;
    }
    let drawer = window.matchMedia("(max-width: 839px)").matches ? initModalDrawer() : initPermanentDrawer();
    if (drawerElement) {
    }

// Toggle between permanent drawer and modal drawer at breakpoint 839px

    const resizeHandler = () => {
        if (window.matchMedia("(max-width: 839px)").matches && !(drawer instanceof MDCDrawer)) {
            drawer = initModalDrawer();
        } else if (window.matchMedia("(min-width: 840px)").matches && drawer instanceof MDCDrawer) {
            drawer.destroy();
            drawer = initPermanentDrawer();
        }
    }
    window.addEventListener('resize', resizeHandler);
}
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
