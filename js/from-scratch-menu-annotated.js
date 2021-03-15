// MIT License

// Copyright (c) 2020-2021 Andrew Cooper Dozier

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

// source: https://www.savetheoxygen.org/js/from-scratch-menu-annotated.js
// comment-less production copy at https://www.savetheoxygen.org/js/from-scratch-menu.js

// *** to change the number of menu and submenu items, just change the css height settings
// *** marked with triple asterisks below

// there are, of course, things that have to be set up a certain way in HTML and CSS for this to work correctly
// --------
// the affected HTML is the stuff between the <nav> *** </nav> tag, which is the first thing in the body on every page
// --------
// the active CSS in this case includes the 2 @media declarations at the top of the file
// (file: either https://www.savetheoxygen.org/css/combined-styles.css or https://www.savetheoxygen.org/css/syles-lb-combined.css
// for standard and low bandwidth pages respectively)
// and all the stuff below "/* collapsing menu */" except the 'low-bandwidth-only {xxx}' and 'standard-bandwidth-only {xxx}' blocks at the
// end of the file.
// most of it is not strictly necessary for the menu/submenu to work, except for the 'display: xxx;' statements, the 'position: absolute;' statement,
// and the @media declaration. In particular none of the .x-switch-animation rules are needed if you don't mind a switch that stays still.
// the 'vertical-align: top;' statement is not necessary, but thing are rather ugly without it
// --------
// there are currently a maximum of 6 items in the widescreen navigation on the right side (including More and $low-bandwidth?) because if there are any
// more than that (with present length and style settings), the furthest right ones start to disappear past the window boundary before the menu 
// can change state to the narrow/collapsed form

let layoutState = ['wide', 'closed', 'none'];
// layoutState[0] - screen wider or narrower than 47.999em
// layoutState[1] - submenu & switch hidden ('none' since 'null' is a reserved word, avoid it),
//                  submenu 'open', or submenu 'closed'
// layoutState[2] - main-menu horizontal ('none' since switch is hidden when screen is wide with horizontal menu),
//                  main-menu 'open', or main-menu 'closed'

let mediaVar = window.matchMedia('screen and (max-width:47.999em)');

// this 2 line bit survives from the script I gave up on adapting from https://purecss.io/layouts/tucked-menu-vertical/
// which I was using before I added a foldable submenu. Did change the function from closeMenu to completely different closeVisible
//
// listen for mobile orientation change and any window resize, store in WINDOW_CHANGE_EVENT
WINDOW_CHANGE_EVENT = ('onorientationchange' in window) ? 'orientationchange' : 'resize';
// listen for orientation change or window resize to close menu and submenu if open
window.addEventListener(WINDOW_CHANGE_EVENT, closeVisible);

// set layout state array to given values when max-width passes up or down through 47.999em
// closes menu and submenu, switches from 'narrow' to 'wide'
// used in window.onload statement just below
function checkMedia() {
    if (mediaVar.matches) {
        layoutState = ['narrow', 'none', 'closed'];
    } else {
        layoutState = ['wide','closed','none'];
    }
}

// on page load or reload, set page width variable, close menus if open
window.onload = checkMedia;
// close menus when closing a tab, using back or forward buttons, or clicking away to another page
window.onunload = closeVisible;

// when window is resized, close menus, set again layoutState
mediaVar.addEventListener("change", (e) => {
    if (e.matches) {
        document.getElementById('main-menu-list').style.display = 'none';
        layoutState = ['narrow', 'none', 'closed'];
    } else {
        layoutState = ['wide','closed','none'];
    }
});

// listen for click on #submenu-switch
// case 1 - open submenu in wide screen
// case 2 - open submenu in narrow screen (only available when main menu is open)
// case 3 - close submenu in wide screen
// case 4 - close submenu in narrow screen
// default - error message will never be seen until you change the code and break something
document.getElementById('submenu-switch').addEventListener('click', function (e) {
    switch (true) {
        // wide or narrow - window/viewport is greater or less than 47.999em
        case (layoutState[0] === 'wide' && layoutState[1] === 'closed'):
            document.getElementById('submenu').style.display = "block";
// *** to add or remove items in submenu for wide screen, simply change the "12em" here to a different height
            document.getElementById('main-menu').style.height = "12em";
            layoutState[1] = 'open';
            break;
        case (layoutState[0] === 'narrow' && layoutState[1] === 'closed'):
            document.getElementById('submenu').style.display = "block";
// *** to add or remove menu items for narrow with both main and submenu open, simply change "27em" here to a different height
            document.getElementById('main-menu').style.height = "27em";
            document.getElementById('submenu').classList.add('narrow-menu');
            layoutState[1] = 'open';
            break;
        case (layoutState[0] === 'wide' && layoutState[1] === 'open'):
            document.getElementById('submenu').style.display = "none";
// *** to change the height of the navigation bar in widescreen with submenu closed, simply change the "2.1em" here and in the closeVisible()
// *** function to a different height
            document.getElementById('main-menu').style.height = "2.1em";
            layoutState[1] = 'closed';
            break;
        case (layoutState[0] === 'narrow' && layoutState[1] === 'open'):
            document.getElementById('submenu').style.display = "none";
// *** to add or remove menu items in narrow screen with main-menu open but submenu closed, simply change the "17em" here
// *** and in the main-menu-switch event listener just below to a different height
            document.getElementById('main-menu').style.height = "17em";
            layoutState[1] = 'closed';
            break;
        default:
            console.log('something is wrong - from submenu-switch listener');
    }
});

// list for click on #main-menu-switch
// case 1 - open main menu in narrow screen
// case 2 - close main menu in narrow screen
// default - error message will never be seen until you change the code and break something
// main menu is always open in wide screen, and main-menu-switch is never visible in wide screen,
// so no cases for wide screen
document.getElementById('main-menu-switch').addEventListener('click', function (e) {
    switch (true) {
        case (layoutState[0] === 'narrow' && layoutState[2] === 'closed'):
            // submenu-switch should be display inline-block when window is wide i think
            // no need to display submenu-switch, because it is always visible when main-menu is
            // visible, horizontal or vertical
            document.getElementById('main-menu-list').style.display = "block";
// *** see lines 120-121 for info on height="17em"
            document.getElementById('main-menu').style.height = "17em";
            document.getElementById('i-can-transform').classList.remove('pure-menu-horizontal');
            document.getElementById('main-menu-switch').classList.add('x-shape');
            layoutState[1] = 'closed';
            layoutState[2] = 'open';
            break;
        case (layoutState[0] === 'narrow' && layoutState[2] === 'open'):
            // submenu and submenu switch are inside main-menu, so they disappear when main menu closes,
            // but if main-menu closes while submenu is open, we want submenu to be closed
            // if main menu is reopened
            document.getElementById('submenu').style.display = "none";
            document.getElementById('main-menu-list').style.display = "none";
// *** to change the height of the navigation bar in narrow screen with the menu closed, simply change the "2.1em" here
// *** and in the closeVisible() function below to a different height
            document.getElementById('main-menu').style.height = "2.1em";
            document.getElementById('main-menu-switch').classList.remove('x-shape');
            // .pure-menu-horizontal must already be removed from #cct in order for main-menu to be in open state
            // so no need to remove it when operating the main-menu switch to close
            layoutState[1] = 'none';
            layoutState[2] = 'closed';
            break;
        default:
            console.log('something is wrong - from main-menu-switch listener')
            // *fixed*
            // after resizing within 'narrow' have to click main-menu-switch twice to open it,
            // but clicking submenu-switch to toggle resets that, so main-menu-switch must only be clicked once to open
    }
});


// close submenu in widescreen, close submenu and main menu in narrow screen
// used in window.addEventListener and window.onunload statements near top
function closeVisible() {
    document.getElementById('submenu').style.display = 'none';
// *** see lines 113-114 and 156-157 for info on height="2.1em"
    document.getElementById('main-menu').style.height = "2.1em";
    document.getElementById('main-menu-switch').classList.remove('x-shape');
    if (!mediaVar.matches) {
        document.getElementById('main-menu-list').style.display = 'inline-block';
        document.getElementById('i-can-transform').classList.add('pure-menu-horizontal');
        // adding these 4 layoutState settings below where before there were none fixes the must-be-clicked-twice-after-resize-within-narrow issue
        // not certain what the exact bump was in the flow, but I noticed i was changing state w/o changing the state variable here,
        // so these lines were *logically* required for consistency
        // somewhat surprising that was the only broken behavior without them
        layoutState[1] = 'closed';
        layoutState[2] = 'none';
    } else {
        layoutState[1] = 'none';
        layoutState[2] = 'closed';
        document.getElementById('submenu').classList.remove('narrow-menu');
    }
}
