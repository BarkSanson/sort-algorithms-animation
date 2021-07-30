var _a, _b;
import { changeStyle } from "./nightSwitch.js";
import Node from "./Node.js";
import Err from "./errors.js";
import * as Animator from "./animator.js";
import * as Sort from "./sortAlgorithms.js";
const sortBtn = document.querySelector(".sort-btn");
const addBtn = document.querySelector(".add-btn");
const removeBtn = document.querySelector(".remove-btn");
const addInput = document.querySelector(".add-input");
const removeInput = document.querySelector(".remove-input");
const algorithmSelector = document.getElementById("algorithms");
algorithmSelector.onchange = () => {
    switch (algorithmSelector.selectedIndex) {
        case 0:
            Node.selectedSortAlgorithm = Sort.SortAlgorithm.DirectSelection;
            break;
        case 1:
            Node.selectedSortAlgorithm = Sort.SortAlgorithm.DirectInsertion;
            break;
        case 2:
            Node.selectedSortAlgorithm = Sort.SortAlgorithm.BubbleSort;
            break;
        case 3:
            Node.selectedSortAlgorithm = Sort.SortAlgorithm.CocktailSort;
            break;
        case 4:
            Node.selectedSortAlgorithm = Sort.SortAlgorithm.ShellSort;
            break;
    }
};
(_a = document
    .getElementById("selector")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", toggleActiveSidebar);
(_b = document
    .getElementById("sidebar-close")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", toggleActiveSidebar);
document.getElementById("night").addEventListener("click", changeStyle);
addBtn.addEventListener("click", () => {
    const number = addInput.value;
    // If the input has a number, the number is
    // between -100 and 100, both inclusive, and
    // there are less than 10 nodes already rendered
    // create a new node and render it
    if (number) {
        let parsedNumber = parseInt(number);
        if (parsedNumber >= -100 && parsedNumber <= 100) {
            if (Node.nodes.length < 10) {
                Err.cleanErrors();
                let newNode = new Node(parsedNumber);
                Node.renderNode(newNode);
                Animator.addNode(newNode);
                addInput.value = "";
            }
            else {
                new Err("You can add a maximum of 10 elements!").render();
            }
        }
        else {
            new Err("Number must be between -100 and 100").render();
        }
    }
    else {
        new Err("Add element input can't be empty!").render();
    }
});
removeBtn.addEventListener("click", () => {
    const number = removeInput.value;
    if (number) {
        Node.removeNode(parseInt(removeInput.value));
    }
    else {
        new Err("Remove element input can't be empty!").render();
    }
});
sortBtn.addEventListener("click", () => {
    Err.cleanErrors();
    Node.sort();
});
function toggleActiveSidebar() {
    var _a;
    (_a = document.getElementById("sidebar")) === null || _a === void 0 ? void 0 : _a.classList.toggle("active");
}
