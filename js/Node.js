import * as Animator from "./animator.js";
import * as Sort from "./sortAlgorithms.js";
import Err from "./errors.js";
const addInput = document.querySelector(".add-input");
const removeInput = document.querySelector(".remove-input");
const elements = document.querySelector(".elements");
export default class Node {
    constructor(num) {
        this._num = num;
        this._position = Node.nextPosition++;
        Node._nodes.push(this);
    }
    static sort() {
        switch (Node.selectedSortAlgorithm) {
            case Sort.SortAlgorithm.DirectSelection:
                Sort.directSelection(Node.nodes);
                break;
            case Sort.SortAlgorithm.DirectInsertion:
                Sort.directInsertion(Node.nodes);
                break;
            case Sort.SortAlgorithm.BubbleSort:
                Sort.bubbleSort(Node.nodes);
                break;
            case Sort.SortAlgorithm.CocktailSort:
                Sort.cocktailSort(Node.nodes);
                break;
            case Sort.SortAlgorithm.ShellSort:
                Sort.shellSort(Node.nodes);
                break;
        }
        console.log(Node.nodes);
    }
    static renderNode(node) {
        if (node.num || node.num === 0) {
            // Create the box that contains the data the user inserted
            const box = document.createElement("div");
            box.setAttribute("id", node.position.toString());
            box.classList.add("element");
            box.innerText = node._num.toString();
            node.box = box;
            // Append the box to the "elements" element in HTML
            elements.appendChild(box);
        }
    }
    static removeNode(num, index) {
        let nodesToRemove = [];
        if (num && !index) {
            nodesToRemove = Node._nodes.filter((node) => {
                return node._num === num;
            });
            Node._nodes = Node._nodes.filter((node) => {
                return node._num !== num;
            });
        }
        else if (!num && index) {
            nodesToRemove.push(Node._nodes.splice(index, 1)[0]);
        }
        if (nodesToRemove.length > 0) {
            Err.cleanErrors();
            nodesToRemove.forEach((node) => Animator.removeNode(node));
            setTimeout(() => {
                Node.removeAll();
                Node.renderAll();
            }, 1500);
            removeInput.value = "";
        }
        else {
            new Err("The element you want to remove hasn't been created yet!").render();
        }
    }
    static renderAll() {
        Node._nodes.forEach((node) => {
            Node.renderNode(node);
        });
    }
    static removeAll() {
        while (elements === null || elements === void 0 ? void 0 : elements.firstChild) {
            elements.removeChild(elements.firstChild);
        }
    }
    static get selectedSortAlgorithm() {
        return Node._selectedSortAlgorithm;
    }
    static set selectedSortAlgorithm(sortAlgorithm) {
        Node._selectedSortAlgorithm = sortAlgorithm;
    }
    static get nodes() {
        return Node._nodes;
    }
    get num() {
        return this._num;
    }
    get position() {
        return this._position;
    }
    get box() {
        if (!this._box)
            throw new Error("Node has no attribute 'box' assigned");
        return this._box;
    }
    set box(box) {
        this._box = box;
    }
    set num(num) {
        this._num = num;
    }
}
Node.nextPosition = 0;
Node._nodes = [];
Node._selectedSortAlgorithm = Sort.SortAlgorithm.DirectSelection;
