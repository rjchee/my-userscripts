// ==UserScript==
// @name         Have I Filled out This Form Before?
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Script to mark whether you've filled out a Google Form before
// @author       Raymond Chee
// @match        https://docs.google.com/forms/d/e/*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    var url = new URL(window.location);
    var path = url.pathname.split("/");
    var id = "filled-"+path[4];
    var stored = localStorage.getItem(id);
    var indicator = document.createElement("div");
    var titleBox = document.getElementsByClassName("freebirdFormviewerViewHeaderTitleRow")[0];
    if (titleBox !== undefined) {
        if (stored === null) {
            indicator.textContent = "(0)";
            indicator.style.color = "red";
        } else {
            indicator.textContent = "(" + stored + ")";
            indicator.style.color = "green";
        }
        titleBox.appendChild(indicator);
    } else {
        var val = (stored === null ? 0 : parseInt(stored, 10)) + 1;
        localStorage.setItem(id, val);
        var pageTitle = document.getElementsByClassName("freebirdFormviewerViewResponsePageTitle")[0];
        indicator.textContent = "(" + val + ")";
        indicator.style.color = "green";
        pageTitle.appendChild(indicator);
    }
})();