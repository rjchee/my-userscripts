// ==UserScript==
// @name         Detect Zero-Width characters when copying text
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  This script alerts you if you copy a zero-width character and allows you to remove them to prevent being fingerprinted.
// @author       Raymond Chee
// @match        *://*/*
// @grant        none
// @noframes
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    var zeroWidthChars = /[\u200B-\u200D\uFEFF]/;
    function containsZeroWidth(s) {
        return zeroWidthChars.test(s);
    }
    function replaceZeroWidth(s) {
        return s.split(zeroWidthChars).join('\u2022');
    }
    function removeZeroWidth(s) {
        return s.split(zeroWidthChars).join('');
    }
    function handleCopyEvent(e) {
        var selection = window.getSelection();
        var data = selection.toString();
        if (containsZeroWidth(data)) {
            var msg = "Your " + (e.type === "copy" ? "copied" : "cut" ) + " selection contains zero-width characters! Do you want to remove them? Here are the locations of those characters:\n\n";
            msg += replaceZeroWidth(data);
            if (window.confirm(msg)) {
                e.preventDefault();
                e.clipboardData.setData('text/plain', removeZeroWidth(data));
            }
        }
    }
    document.addEventListener('copy', handleCopyEvent);
    document.addEventListener('cut', handleCopyEvent);
})();