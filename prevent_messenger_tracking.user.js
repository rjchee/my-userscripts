// ==UserScript==
// @name         Prevent Messenger from Tracking Links
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Rewrites links on messenger.com to go directly to the link instead of through l.messenger.com
// @author       Raymond Chee
// @match        https://www.messenger.com/t/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    function rewriteHref(el) {
        Array.from(el.attributes)
            .filter(a => a.name.startsWith("data-lynx-"))
            .forEach(a => el.removeAttribute(a.name));
        if (el.href && el.href.startsWith("https://l.messenger.com/l.php")) {
            el.href = new URL(el.href).searchParams.get("u");
        }
    }
    var mutationObserver = new MutationObserver(
        mutations => mutations.forEach(
            m => {
                var nodes;
                switch (m.type) {
                    case "childList":
                        nodes = Array.from(m.addedNodes).filter(el => el.attributes);
                        break;
                    case "attributes":
                        nodes = [m.target];
                        break;
                    default:
                        return;
                }
                nodes.forEach(rewriteHref)
            }
        )
    );
    mutationObserver.observe(document.documentElement, {
        childList: true,
        subtree: true,
        attribute: true,
        attributeFilter: ["href", "data-lynx-hover"],
    });
})();