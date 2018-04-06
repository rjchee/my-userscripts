// ==UserScript==
// @name         Detect Zero-Width characters when copying text
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  This script alerts you if you copy a zero-width character and allows you to remove them to prevent being fingerprinted.
// @author       Raymond Chee
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    var zeroWidthChars = /[\u200B-\u200D\uFEFF]/;
    function containsZeroWidth(s) {
        return zeroWidthChars.test(s);
    }
    function replaceZeroWidth(s) {
        return s.split(zeroWidthChars).join('•');
    }
    function removeZeroWidth(s) {
        return s.split(zeroWidthChars).join('');
    }
    function handleCopyEvent(e) {
        var selection = window.getSelection();
        var data = selection.toString();
        if (containsZeroWidth(data)) {
            var msg =
                `Your ${e.type === "copy" ? "copied" : "cut"} selection contains zero-width characters! Here are the locations of those characters:

${replaceZeroWidth(data)}

Do you want to remove them? Press OK to remove the zero-width characters, or press Cancel to keep them.`;
            if (window.confirm(msg)) {
                e.preventDefault();
                e.clipboardData.setData('text/plain', removeZeroWidth(data));
            }
        }
    }
    function handlePasteEvent(e) {
        var data = e.clipboardData.getData('text');
        if (containsZeroWidth(data)) {
            var msg = `Your pasted text contains zero-width characters! Here are the locations of those characters:

${replaceZeroWidth(data)}

If you want to fix it, here is your pasted text without the zero-width characters (you will have to copy and paste it again):

${removeZeroWidth(data)}`;
            window.alert(msg);
        }
    }
    document.addEventListener('copy', handleCopyEvent);
    document.addEventListener('cut', handleCopyEvent);
    document.addEventListener('paste', handlePasteEvent);
})();