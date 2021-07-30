export function changeStyle() {
    const nav = document.querySelector("nav");
    const navBtns = nav!.querySelectorAll("button");
    const inputBtns = document.querySelectorAll(".input-btn");

    inputBtns.forEach((btn) => {
        btn.classList.toggle("light-input-btn");
    });
    
    document.querySelector("body")!.classList.toggle("light-body");   
    nav!.classList.toggle("light-nav"); 
    nav!.children[1].classList.toggle("light-nav-contents");

    navBtns.forEach((btn) => {
        btn.children[0].classList.toggle("light-nav-contents");
    })
    
}