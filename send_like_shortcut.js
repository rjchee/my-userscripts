// ==UserScript==
// @name         Send Like Keyboard Shortcut
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  adds Ctrl+Shift+L as a shortcut to send a like on Facebook Messenger
// @author       Raymond Chee
// @match        https://www.messenger.com/t/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    var sendingLike = false;
    // capture keyboard shortcut
    document.addEventListener("keydown", function (e) {
        if (e.code == "KeyL" && e.shiftKey && e.ctrlKey && !sendingLike) {
            var likeButton = document.querySelector("a[title=\"Send a Like\"]");
            // start holding the like button
            var mouseOverEvent = new MouseEvent("mouseover", {bubbles: true});
            var mouseDownEvent = new MouseEvent("mousedown", {bubbles: true});
            likeButton.dispatchEvent(mouseOverEvent);
            likeButton.dispatchEvent(mouseDownEvent);
            sendingLike = true;
        }
    }, false);
    document.addEventListener("keyup", function (e) {
        if (sendingLike) {
            var likeButton = document.querySelector("a[title=\"Send a Like\"]");
            // send the like
            var mouseUpEvent = new MouseEvent("mouseup", {bubbles: true});
            likeButton.dispatchEvent(mouseUpEvent);
            sendingLike = false;
        }
    }, false);
})();
