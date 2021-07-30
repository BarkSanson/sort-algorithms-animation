import Node from "./Node";

const elements = document.querySelector(".elements");

let animationDuration = 1750;

export function addNode(node: Node) {
  const box = document.getElementById(node.position.toString());

  box!.animate(
    [
      { transform: "scale(0)" },
      { transform: "scale(0.5)" },
      { transform: "scale(1.05)" },
      { transform: "scale(1.0)" },
    ],
    {
      duration: 1500,
    }
  );
}

export function removeNode(node: Node) {
  const box = document.getElementById(node.position.toString());

  box!.animate(
    [
      { transform: "scale(1.0)" },
      { transform: "scale(1.05)", backgroundColor: "red" },
      { transform: "scale(0.5)", backgroundColor: "red" },
      { transform: "scale(0)", backgroundColor: "red" },
    ],
    {
      duration: 1500,
    }
  );
}

export function switchNodes(node1: Node, node2: Node) {
  return new Promise(async (resolve) => {
    let sibling1: HTMLDivElement;
    let sibling2: HTMLDivElement;
    // First, we get the containers of each node
    const box1 = document.getElementById(
      node1.position.toString()
    ) as HTMLDivElement;
    const box2 = document.getElementById(
      node2.position.toString()
    ) as HTMLDivElement;

    // Next, we get its coordinates
    const coordinates1 = box1?.getBoundingClientRect();
    const coordinates2 = box2?.getBoundingClientRect();

    // Now we just have to calculate the vector between them 2
    let x = coordinates2!.left - coordinates1!.left;

    // Finally, we have to check where the elements are.
    // This is, if x is greater than zero, that means
    // that the second element is at the right of the first element.
    // Otherwise, it means the second element is
    // at the left of the first element.

    if (x < 0) {
      x = -x;
    } 

    animateNode(node1, x);
    animateNode(node2, -x)!.onfinish = () => {
      // We have to check if nodes are adjacent or not and where they are
      // at elements div
      if (checkIfAdjacent(node1, node2)) {
        if (checkIfFirstChild(box1)) {
          sibling1 = box2;
          sibling2 = box2.nextElementSibling as HTMLDivElement;

          sibling2.before(box1);
        } else if (checkIfFirstChild(box2)) {
          sibling1 = box1.nextElementSibling as HTMLDivElement;
          sibling2 = box1;

          sibling1.before(box2);
        } else if (checkIfLastChild(box1)) {
          sibling1 = box2;
          sibling2 = box2.previousElementSibling as HTMLDivElement;

          sibling2.after(box1);
        } else if (checkIfLastChild(box2)) {
          sibling1 = box1.previousElementSibling as HTMLDivElement;
          sibling2 = box1;

          sibling1.after(box2);
        } else {
          sibling1 = box1.previousElementSibling as HTMLDivElement;
          sibling2 = box2.nextElementSibling as HTMLDivElement;

          sibling1.after(box2);
          sibling2.before(box1);
        }
      } else {
        if (checkIfFirstChild(box1) && checkIfLastChild(box2)) {
          sibling1 = box1.nextElementSibling as HTMLDivElement;
          sibling2 = box2.previousElementSibling as HTMLDivElement;

          sibling1.before(box2);
          sibling2.after(box1);
        } else if (checkIfFirstChild(box2) && checkIfLastChild(box1)) {
          sibling1 = box1.previousElementSibling as HTMLDivElement;
          sibling2 = box2.nextElementSibling as HTMLDivElement;

          sibling1.after(box2);
          sibling2.before(box1);
        } else if (checkIfFirstChild(box1) && !checkIfLastChild(box2)) {
          sibling1 = box1.nextElementSibling as HTMLDivElement;
          sibling2 = box2.nextElementSibling as HTMLDivElement;

          sibling1.before(box2);
          sibling2.before(box1);
        } else if (checkIfFirstChild(box2) && !checkIfLastChild(box1)) {
          sibling1 = box1.nextElementSibling as HTMLDivElement;
          sibling2 = box2.nextElementSibling as HTMLDivElement;

          sibling1.before(box2);
          sibling2.before(box1);
        } else if (
          (checkIfLastChild(box1) && !checkIfFirstChild(box2)) ||
          (checkIfLastChild(box2) && !checkIfFirstChild(box1))
        ) {
          sibling1 = box1.previousElementSibling as HTMLDivElement;
          sibling2 = box2.previousElementSibling as HTMLDivElement;

          sibling1.after(box2);
          sibling2.after(box1);
        } else if (
          (!checkIfFirstChild(box1) && !checkIfLastChild(box2)) ||
          (!checkIfFirstChild(box2) && !checkIfLastChild(box1))
        ) {
          sibling1 = box1.nextElementSibling as HTMLDivElement;
          sibling2 = box2.nextElementSibling as HTMLDivElement;

          sibling1.before(box2);
          sibling2.before(box1);
        }
      }
    };

    setTimeout(resolve, animationDuration, "Done!");
  });
}

export function animateNode(node: Node, x: number) {
  const box = document.getElementById(node.position.toString());
  const clone = box!.cloneNode(true) as HTMLDivElement;

  return box?.animate([{ transform: `translate(${x}px)` }], {
    duration: animationDuration,
    fill: "none",
  });
}

function checkIfFirstChild(box: HTMLDivElement) {
  return elements?.firstChild === box;
}

function checkIfLastChild(box: HTMLDivElement) {
  return elements?.lastChild === box;
}

function checkIfAdjacent(node1: Node, node2: Node): boolean {
  const box1 = document.getElementById(node1.position.toString());
  const box2 = document.getElementById(node2.position.toString());

  return (
    box1?.nextElementSibling === box2 ||
    box2?.nextElementSibling === box1 ||
    box1?.previousElementSibling === box2 ||
    box2?.previousElementSibling === box1
  );
}
