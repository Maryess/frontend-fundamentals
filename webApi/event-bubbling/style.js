const box1 = document.querySelector(".box-1");
const box2 = document.querySelector(".box-2");
const box3 = document.querySelector(".box-3");

const highlight = (element, delay) => {
  setTimeout(() => {
    element.style.border = `3px solid #fff`;
    setTimeout(() => {
      element.style.border = "3px solid #000";
    }, 800);
  }, delay);
};

box1.addEventListener("click", () => {
  console.log("Box 1");
  highlight(box1, 600);
});

box2.addEventListener("click", (event) => {
  console.log("Box 2");
  highlight(box2, 300);
  event.stopImmediatePropagation();
});

box3.addEventListener("click", () => {
  console.log("Box 3");
  highlight(box3, 0);
});
