import * as Animator from "./animator.js";
import * as Sort from "./sortAlgorithms.js";
import Err from "./errors.js";

const addInput = document.querySelector(".add-input") as HTMLInputElement;
const removeInput = document.querySelector(".remove-input") as HTMLInputElement;
const elements = document.querySelector(".elements");

export default class Node {
  private static nextPosition: number = 0;
  private static _nodes: Node[] = [];
  private static _selectedSortAlgorithm: Sort.SortAlgorithm = Sort.SortAlgorithm.DirectSelection;
  private _num: number;
  private _position: number;
  private _box?: HTMLDivElement;

  constructor(num: number) {
    this._num = num;
    this._position = Node.nextPosition++;
    Node._nodes.push(this);
  }

  public static sort() {
    switch(Node.selectedSortAlgorithm) {
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

  public static renderNode(node: Node): void {
    if (node.num || node.num === 0) {
      // Create the box that contains the data the user inserted
      const box = document.createElement("div");
      box.setAttribute("id", node.position.toString());
      box.classList.add("element");
      box.innerText = node._num.toString();


      node.box = box;

      // Append the box to the "elements" element in HTML
      elements!.appendChild(box);
    }
  }

  public static removeNode(num?: number, index?: number) {
    let nodesToRemove: Node[] = [];
    
    if(num && !index) {
      nodesToRemove = Node._nodes.filter((node) => {
        return node._num === num;
      });

      Node._nodes = Node._nodes.filter((node) => {
        return node._num !== num;
      });
    } else if(!num && index) {
      nodesToRemove.push(Node._nodes.splice(index, 1)[0]);
    }

    if(nodesToRemove.length > 0) {
      Err.cleanErrors();
      nodesToRemove.forEach((node) => Animator.removeNode(node));

      setTimeout(() => {
        Node.removeAll();
        Node.renderAll();
      }, 1500);
      
      removeInput.value = "";
    } else {
      new Err("The element you want to remove hasn't been created yet!").render();
    }

  }

  public static renderAll(): void {
    Node._nodes.forEach((node) => {
      Node.renderNode(node);
    });
  }

  public static removeAll(): void {
    while (elements?.firstChild) {
      elements.removeChild(elements.firstChild);
    }
  }

  public static get selectedSortAlgorithm() {
    return Node._selectedSortAlgorithm;
  }

  public static set selectedSortAlgorithm(sortAlgorithm: Sort.SortAlgorithm) {
    Node._selectedSortAlgorithm = sortAlgorithm;
  }

  public static get nodes() {
    return Node._nodes;
  }

  public get num() {
    return this._num;
  }

  public get position() {
    return this._position;
  }

  public get box() {
    if(!this._box) throw new Error("Node has no attribute 'box' assigned");
      
    return this._box;
  }

  public set box(box: HTMLDivElement) {
    this._box = box;
  }

  public set num(num: number) {
    this._num = num;
  }

}
