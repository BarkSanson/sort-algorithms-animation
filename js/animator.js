var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const elements = document.querySelector(".elements");
let animationDuration = 1750;
export function addNode(node) {
    const box = document.getElementById(node.position.toString());
    box.animate([
        { transform: "scale(0)" },
        { transform: "scale(0.5)" },
        { transform: "scale(1.05)" },
        { transform: "scale(1.0)" },
    ], {
        duration: 1500,
    });
}
export function removeNode(node) {
    const box = document.getElementById(node.position.toString());
    box.animate([
        { transform: "scale(1.0)" },
        { transform: "scale(1.05)", backgroundColor: "red" },
        { transform: "scale(0.5)", backgroundColor: "red" },
        { transform: "scale(0)", backgroundColor: "red" },
    ], {
        duration: 1500,
    });
}
export function switchNodes(node1, node2) {
    return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
        let sibling1;
        let sibling2;
        // First, we get the containers of each node
        const box1 = document.getElementById(node1.position.toString());
        const box2 = document.getElementById(node2.position.toString());
        // Next, we get its coordinates
        const coordinates1 = box1 === null || box1 === void 0 ? void 0 : box1.getBoundingClientRect();
        const coordinates2 = box2 === null || box2 === void 0 ? void 0 : box2.getBoundingClientRect();
        // Now we just have to calculate the vector between them 2
        let x = coordinates2.left - coordinates1.left;
        // Finally, we have to check where the elements are.
        // This is, if x is greater than zero, that means
        // that the second element is at the right of the first element.
        // Otherwise, it means the second element is
        // at the left of the first element.
        if (x < 0) {
            x = -x;
        }
        animateNode(node1, x);
        animateNode(node2, -x).onfinish = () => {
            // We have to check if nodes are adjacent or not and where they are
            // at elements div
            if (checkIfAdjacent(node1, node2)) {
                if (checkIfFirstChild(box1)) {
                    sibling1 = box2;
                    sibling2 = box2.nextElementSibling;
                    sibling2.before(box1);
                }
                else if (checkIfFirstChild(box2)) {
                    sibling1 = box1.nextElementSibling;
                    sibling2 = box1;
                    sibling1.before(box2);
                }
                else if (checkIfLastChild(box1)) {
                    sibling1 = box2;
                    sibling2 = box2.previousElementSibling;
                    sibling2.after(box1);
                }
                else if (checkIfLastChild(box2)) {
                    sibling1 = box1.previousElementSibling;
                    sibling2 = box1;
                    sibling1.after(box2);
                }
                else {
                    sibling1 = box1.previousElementSibling;
                    sibling2 = box2.nextElementSibling;
                    sibling1.after(box2);
                    sibling2.before(box1);
                }
            }
            else {
                if (checkIfFirstChild(box1) && checkIfLastChild(box2)) {
                    sibling1 = box1.nextElementSibling;
                    sibling2 = box2.previousElementSibling;
                    sibling1.before(box2);
                    sibling2.after(box1);
                }
                else if (checkIfFirstChild(box2) && checkIfLastChild(box1)) {
                    sibling1 = box1.previousElementSibling;
                    sibling2 = box2.nextElementSibling;
                    sibling1.after(box2);
                    sibling2.before(box1);
                }
                else if (checkIfFirstChild(box1) && !checkIfLastChild(box2)) {
                    sibling1 = box1.nextElementSibling;
                    sibling2 = box2.nextElementSibling;
                    sibling1.before(box2);
                    sibling2.before(box1);
                }
                else if (checkIfFirstChild(box2) && !checkIfLastChild(box1)) {
                    sibling1 = box1.nextElementSibling;
                    sibling2 = box2.nextElementSibling;
                    sibling1.before(box2);
                    sibling2.before(box1);
                }
                else if ((checkIfLastChild(box1) && !checkIfFirstChild(box2)) ||
                    (checkIfLastChild(box2) && !checkIfFirstChild(box1))) {
                    sibling1 = box1.previousElementSibling;
                    sibling2 = box2.previousElementSibling;
                    sibling1.after(box2);
                    sibling2.after(box1);
                }
                else if ((!checkIfFirstChild(box1) && !checkIfLastChild(box2)) ||
                    (!checkIfFirstChild(box2) && !checkIfLastChild(box1))) {
                    sibling1 = box1.nextElementSibling;
                    sibling2 = box2.nextElementSibling;
                    sibling1.before(box2);
                    sibling2.before(box1);
                }
            }
        };
        setTimeout(resolve, animationDuration, "Done!");
    }));
}
export function animateNode(node, x) {
    const box = document.getElementById(node.position.toString());
    const clone = box.cloneNode(true);
    return box === null || box === void 0 ? void 0 : box.animate([{ transform: `translate(${x}px)` }], {
        duration: animationDuration,
        fill: "none",
    });
}
function checkIfFirstChild(box) {
    return (elements === null || elements === void 0 ? void 0 : elements.firstChild) === box;
}
function checkIfLastChild(box) {
    return (elements === null || elements === void 0 ? void 0 : elements.lastChild) === box;
}
function checkIfAdjacent(node1, node2) {
    const box1 = document.getElementById(node1.position.toString());
    const box2 = document.getElementById(node2.position.toString());
    return ((box1 === null || box1 === void 0 ? void 0 : box1.nextElementSibling) === box2 ||
        (box2 === null || box2 === void 0 ? void 0 : box2.nextElementSibling) === box1 ||
        (box1 === null || box1 === void 0 ? void 0 : box1.previousElementSibling) === box2 ||
        (box2 === null || box2 === void 0 ? void 0 : box2.previousElementSibling) === box1);
}
