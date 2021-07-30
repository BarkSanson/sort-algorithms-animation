var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as Animator from "./animator.js";
export var SortAlgorithm;
(function (SortAlgorithm) {
    SortAlgorithm["DirectInsertion"] = "DIRECT_INSERTION";
    SortAlgorithm["DirectSelection"] = "DIRECT_SELECTION";
    SortAlgorithm["BubbleSort"] = "BUBBLE_SORT";
    SortAlgorithm["CocktailSort"] = "COCKTAIL_SORT";
    SortAlgorithm["ShellSort"] = "SHELL_SORT";
})(SortAlgorithm || (SortAlgorithm = {}));
export function directSelection(nodes) {
    return __awaiter(this, void 0, void 0, function* () {
        let i, j, posMin;
        let num = nodes.length;
        for (let i = 0; i < num - 1; i++) {
            posMin = i;
            for (let j = i + 1; j < num; j++) {
                if (nodes[j].num < nodes[posMin].num)
                    posMin = j;
            }
            yield Animator.switchNodes(nodes[i], nodes[posMin]);
            let aux = nodes[i];
            nodes[i] = nodes[posMin];
            nodes[posMin] = aux;
        }
        return nodes;
    });
}
export function directInsertion(nodes) {
    return __awaiter(this, void 0, void 0, function* () {
        let i, j;
        let num = nodes.length;
        for (let i = 1; i < num; i++) {
            let aux = nodes[i];
            for (j = i; (j > 0) && (aux.num < nodes[j - 1].num); j--) {
                nodes[j] = nodes[j - 1];
                yield Animator.switchNodes(nodes[j], aux);
            }
            nodes[j] = aux;
        }
        return nodes;
    });
}
export function bubbleSort(nodes) {
    return __awaiter(this, void 0, void 0, function* () {
        let n = nodes.length;
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - 1; j++) {
                if (nodes[j].num > nodes[j + 1].num) {
                    yield Animator.switchNodes(nodes[j], nodes[j + 1]);
                    let aux = nodes[j];
                    nodes[j] = nodes[j + 1];
                    nodes[j + 1] = aux;
                }
            }
        }
        return nodes;
    });
}
export function cocktailSort(nodes) {
    return __awaiter(this, void 0, void 0, function* () {
        let last = 0, left, right, num = nodes.length;
        do {
            for (let i = num - 1; i > 0; i--) {
                if (nodes[i - 1].num > nodes[i].num) {
                    yield Animator.switchNodes(nodes[i - 1], nodes[i]);
                    let aux = nodes[i];
                    nodes[i] = nodes[i - 1];
                    nodes[i - 1] = aux;
                    last = i;
                }
            }
            left = last + 1;
            for (let j = 1; j < num; j++) {
                if (nodes[j - 1].num > nodes[j].num) {
                    yield Animator.switchNodes(nodes[j - 1], nodes[j]);
                    let aux = nodes[j];
                    nodes[j] = nodes[j - 1];
                    nodes[j - 1] = aux;
                    last = j;
                }
            }
            right = last - 1;
        } while (right >= left);
        return nodes;
    });
}
export function shellSort(nodes) {
    return __awaiter(this, void 0, void 0, function* () {
        let n = nodes.length;
        for (let inc = Math.floor(n / 2); inc > 0; inc = Math.floor(inc / 2)) {
            for (let i = inc; i < n; i++) {
                for (let j = i; (j >= inc) && (nodes[j - inc].num > nodes[j].num); j -= inc) {
                    yield Animator.switchNodes(nodes[j - inc], nodes[j]);
                    let aux = nodes[j];
                    nodes[j] = nodes[j - inc];
                    nodes[j - inc] = aux;
                }
            }
        }
        return nodes;
    });
}
