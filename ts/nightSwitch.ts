export function changeStyle() {
    const nav = document.querySelector("nav");
    const sidebar = document.querySelector("#sidebar");
    const sidebarHeader = document.getElementById("sidebar-header");
    const navBtns = nav!.querySelectorAll("button");
    const inputBtns = document.querySelectorAll(".input-btn");
    const algorithmSelector = document.getElementById("algorithm-selector");

    inputBtns.forEach((btn) => {
        btn.classList.toggle("light-input-btn");
    });
    
    document.querySelector("body")!.classList.toggle("light-body");
    sidebar!.classList.toggle("light-sidebar");

    sidebarHeader?.classList.toggle("light-sidebar-header");
    sidebarHeader!.firstElementChild!.firstElementChild?.classList.toggle("light-sidebar-header-contents");
    sidebarHeader?.lastElementChild?.classList.toggle("light-sidebar-header-contents");

    algorithmSelector?.firstElementChild?.classList.toggle("light-sidebar-header-contents");

    nav!.classList.toggle("light-nav"); 
    nav!.children[1].classList.toggle("light-nav-contents");

    navBtns.forEach((btn) => {
        btn.children[0].classList.toggle("light-nav-contents");
    })
    
}