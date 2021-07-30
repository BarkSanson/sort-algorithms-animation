import Node from "./Node.js";
import * as Animator from "./animator.js";

export enum SortAlgorithm {
    DirectInsertion = "DIRECT_INSERTION",
    DirectSelection = "DIRECT_SELECTION",
    BubbleSort = "BUBBLE_SORT",
    CocktailSort = "COCKTAIL_SORT",
    ShellSort = "SHELL_SORT"
}

export async function directSelection(nodes: Node[]) {
    let i, j, posMin: number;
    let num = nodes.length;

    for(let i = 0; i < num - 1; i++) {
        posMin = i;

        for(let j = i + 1; j < num; j++) {
            if(nodes[j].num < nodes[posMin].num) posMin = j;
        }

        await Animator.switchNodes(nodes[i], nodes[posMin]) ;
        let aux = nodes[i];
        nodes[i] = nodes[posMin];
        nodes[posMin] = aux;
    }

    return nodes;
}

export async function directInsertion(nodes: Node[])  {
    let i, j: number;
    let num = nodes.length;

    for(let i = 1; i < num; i++) {
        let aux = nodes[i];

        for(j = i; (j > 0) && (aux.num < nodes[j - 1].num); j--) {
            nodes[j] = nodes[j - 1];
            await Animator.switchNodes(nodes[j], aux);
        }
        nodes[j] = aux;
    }

    return nodes;
}

export async function bubbleSort(nodes: Node[]) {
    let n = nodes.length;

    for(let i = 0; i < n - 1; i++) {
        for(let j = 0; j < n - 1; j++) {
            if(nodes[j].num > nodes[j + 1].num) {
                await Animator.switchNodes(nodes[j], nodes[j + 1]);
                let aux = nodes[j];
                nodes[j] = nodes[j + 1];
                nodes[j + 1] = aux;
            }
        }
    }

    return nodes;
}

export async function cocktailSort(nodes: Node[]) {
    let last = 0, left, right, num = nodes.length;
    
    do {
        for(let i = num - 1; i > 0; i--) {
            if(nodes[i - 1].num > nodes[i].num) {
                await Animator.switchNodes(nodes[i - 1], nodes[i]);
                let aux = nodes[i];
                nodes[i] = nodes[i - 1];
                nodes[i - 1] = aux;
                last = i;
            }
        }
        left = last + 1;

        for(let j = 1; j < num; j++) {
            if(nodes[j - 1].num > nodes[j].num) {
                await Animator.switchNodes(nodes[j - 1], nodes[j]);
                let aux = nodes[j];
                nodes[j] = nodes[j - 1];
                nodes[j - 1] = aux;
                last = j;
            }
        }
        right = last - 1;

    } while(right >= left);

    return nodes;
}

export async function shellSort(nodes: Node[]) {
    let n = nodes.length;

    for(let inc = Math.floor(n/2); inc > 0; inc = Math.floor(inc/2)) {
        for(let i = inc; i < n; i++) {
            for(let j = i; (j >= inc) && (nodes[j - inc].num > nodes[j].num); j -= inc) {
                await Animator.switchNodes(nodes[j - inc], nodes[j]);
                let aux = nodes[j];
                nodes[j] = nodes[j - inc];
                nodes[j - inc] = aux;
            }
        }
    }

    return nodes;
}