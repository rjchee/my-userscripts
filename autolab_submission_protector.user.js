// ==UserScript==
// @name         Autolab Submission Protector
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Ask for confirmation that autolab submissions are in the right format before submitting.
// @author       Raymond Chee
// @match        https://autolab.andrew.cmu.edu/courses/*/assessments/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    let submitButton = document.getElementById('fake-submit');
    if (submitButton === null) {
        console.error("Page does not have a submit button!");
        return;
    }
    let oldHandler = submitButton.onclick;
    submitButton.onclick = function(event) {
        if (confirm("Is your submission zipped up correctly?")) {
            return oldHandler(event);
        }
        event.stopImmediatePropagation();
        return false;
    };
    let submitForm = document.getElementById("new_submission");
    if (submitForm === null) {
        console.error("Page does not have the expected form!");
        return;
    }
    submitForm.onsubmit = function(event) {
        return confirm("Are you absolutely sure your submission is zipped up correctly?");
    };
})();
