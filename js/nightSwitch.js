export function changeStyle() {
    var _a, _b, _c;
    var nav = document.querySelector("nav");
    var sidebar = document.querySelector("#sidebar");
    var sidebarHeader = document.getElementById("sidebar-header");
    var navBtns = nav.querySelectorAll("button");
    var inputBtns = document.querySelectorAll(".input-btn");
    var algorithmSelector = document.getElementById("algorithm-selector");
    inputBtns.forEach(function (btn) {
        btn.classList.toggle("light-input-btn");
    });
    document.querySelector("body").classList.toggle("light-body");
    sidebar.classList.toggle("light-sidebar");
    sidebarHeader === null || sidebarHeader === void 0 ? void 0 : sidebarHeader.classList.toggle("light-sidebar-header");
    (_a = sidebarHeader.firstElementChild.firstElementChild) === null || _a === void 0 ? void 0 : _a.classList.toggle("light-sidebar-header-contents");
    (_b = sidebarHeader === null || sidebarHeader === void 0 ? void 0 : sidebarHeader.lastElementChild) === null || _b === void 0 ? void 0 : _b.classList.toggle("light-sidebar-header-contents");
    (_c = algorithmSelector === null || algorithmSelector === void 0 ? void 0 : algorithmSelector.firstElementChild) === null || _c === void 0 ? void 0 : _c.classList.toggle("light-sidebar-header-contents");
    nav.classList.toggle("light-nav");
    nav.children[1].classList.toggle("light-nav-contents");
    navBtns.forEach(function (btn) {
        btn.children[0].classList.toggle("light-nav-contents");
    });
}
