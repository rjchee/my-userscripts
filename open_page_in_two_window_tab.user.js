// ==UserScript==
// @name         Open Page in New Two-Window Tab
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Opens the page in a split screen from the context menu.
// @author       Raymond Chee
// @match        *://*/*
// @noframes
// @grant        GM_registerMenuCommand
// @grant        GM_openInTab
// ==/UserScript==

(function() {
    'use strict';

    ["left", "right"].forEach(function (side) {
        GM_registerMenuCommand(`Open this page in ${side} split`, function () {
            GM_openInTab(`https://rjchee.github.io/webtools/two_windows.html?${side}=${window.location.href}`, {
                active: true,
                insert: true
            });
        }, side.charAt(0));
    });
})();
