const tree = document.getElementById("tree");
const list = document.getElementById("list");

list.onclick = function (event) {
  if (event.target.className != "remove-button") return;
  let pane = event.target.closest(".pane");
  pane.remove();
};

tree.onclick = function (event) {
  if (event.target.tagName !== "LI") return;

  let childrenContainer = event.target.parentNode.querySelector("ul");
  if (!childrenContainer) return;

  childrenContainer.hidden = !childrenContainer.hidden;
};
