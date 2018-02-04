// ==UserScript==
// @name         AmazonSmile Reminder
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Reminds you to switch to AmazonSmile
// @author       Raymond Chee
// @match        https://www.amazon.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    var navBar = document.getElementsByClassName("nav-right");
    if (navBar) {
        var smileDiv = document.createElement("div");
        smileDiv.style.cssText = "margin-top: 8px; line-height: 40px;";
        var smileSpan = document.createElement("span");
        smileSpan.textContent = "Don't forget to purchase from ";
        smileSpan.style.cssText = "vertical-align: middle; color: #ccc";
        smileDiv.appendChild(smileSpan);
        var smileLink = document.createElement("a");
        smileLink.href = new URL(window.location.href);
        smileLink.hostname = "smile.amazon.com";
        var image = document.createElement("img");
        image.src = "https://github.com/rjchee/my-userscripts/raw/master/Amazon_Smile_logo.png";
        image.height = 40;
        smileLink.appendChild(image);
        smileDiv.appendChild(smileLink);
        navBar[0].appendChild(smileDiv);
    }
})();
