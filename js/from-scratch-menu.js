// Annotated copy at https://www.savetheoxygen.org/js/from-scratch-menu-annotated.js

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

let layoutState = ['wide', 'closed', 'none'];
let mediaVar = window.matchMedia('screen and (max-width:47.999em)');

WINDOW_CHANGE_EVENT = ('onorientationchange' in window) ? 'orientationchange' : 'resize';
window.addEventListener(WINDOW_CHANGE_EVENT, closeVisible);

function checkMedia() {
    if (mediaVar.matches) {
        layoutState = ['narrow', 'none', 'closed'];
    } else {
        layoutState = ['wide','closed','none'];
    }
}

window.onload = checkMedia;
window.onunload = closeVisible;

mediaVar.addEventListener("change", (e) => {
    if (e.matches) {
        document.getElementById('main-menu-list').style.display = 'none';
        layoutState = ['narrow', 'none', 'closed'];
    } else {
        layoutState = ['wide','closed','none'];
    }
});

document.getElementById('submenu-switch').addEventListener('click', function (e) {
    switch (true) {
        case (layoutState[0] === 'wide' && layoutState[1] === 'closed'):
            document.getElementById('submenu').style.display = "block";
            document.getElementById('main-menu').style.height = "10em";
            layoutState[1] = 'open';
            break;
        case (layoutState[0] === 'narrow' && layoutState[1] === 'closed'):
            document.getElementById('submenu').style.display = "block";
            document.getElementById('main-menu').style.height = "25em";
            document.getElementById('submenu').classList.add('narrow-menu');
            layoutState[1] = 'open';
            break;
        case (layoutState[0] === 'wide' && layoutState[1] === 'open'):
            document.getElementById('submenu').style.display = "none";
            document.getElementById('main-menu').style.height = "2.1em";
            layoutState[1] = 'closed';
            break;
        case (layoutState[0] === 'narrow' && layoutState[1] === 'open'):
            document.getElementById('submenu').style.display = "none";
            document.getElementById('main-menu').style.height = "17em";
            layoutState[1] = 'closed';
            break;
        default:
            console.log('something is wrong - from submenu-switch listener');
    }
});

document.getElementById('main-menu-switch').addEventListener('click', function (e) {
    switch (true) {
        case (layoutState[0] === 'narrow' && layoutState[2] === 'closed'):
            document.getElementById('main-menu-list').style.display = "block";
            document.getElementById('main-menu').style.height = "17em";
            document.getElementById('i-can-transform').classList.remove('pure-menu-horizontal');
            document.getElementById('main-menu-switch').classList.add('x-shape');
            layoutState[1] = 'closed';
            layoutState[2] = 'open';
            break;
        case (layoutState[0] === 'narrow' && layoutState[2] === 'open'):
            document.getElementById('submenu').style.display = "none";
            document.getElementById('main-menu-list').style.display = "none";
            document.getElementById('main-menu').style.height = "2.1em";
            document.getElementById('main-menu-switch').classList.remove('x-shape');
            layoutState[1] = 'none';
            layoutState[2] = 'closed';
            break;
        default:
            console.log('something is wrong - from main-menu-switch listener')
    }
});

function closeVisible() {
    document.getElementById('submenu').style.display = 'none';
    document.getElementById('main-menu').style.height = "2.1em";
    document.getElementById('main-menu-switch').classList.remove('x-shape');
    if (!mediaVar.matches) {
        document.getElementById('main-menu-list').style.display = 'inline-block';
        document.getElementById('i-can-transform').classList.add('pure-menu-horizontal');
        layoutState[1] = 'closed';
        layoutState[2] = 'none';
    } else {
        layoutState[1] = 'none';
        layoutState[2] = 'closed';
        document.getElementById('submenu').classList.remove('narrow-menu');
    }
}