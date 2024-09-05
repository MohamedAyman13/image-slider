// variables declaring

let list = document.querySelector(".list");
let items = document.querySelectorAll(".list .item");
let dots = document.querySelectorAll(".dots li");
let nxtBtn = document.querySelector(".next");
let prevBtn = document.querySelector(".prev");

let active = 0;
let listLength = items.length - 1;

// auto play every 4 seconds
let refreshSlider = setInterval(() => nxtBtn.click(), 4000);
items.forEach((item) => {
  item.addEventListener("mouseover", () => {
    clearInterval(refreshSlider);
  });

  item.addEventListener("mouseout", () => {
    refreshSlider = setInterval(() => nxtBtn.click(), 4000);
  });
});

// swipe by touch screen
let touchStartX = 0;
let touchEndX = 0;
items.forEach((item) => {
  item.addEventListener("touchstart", (element) => {
    touchStartX = element.changedTouches[0].screenX;
    clearInterval(refreshSlider);
  });

  item.addEventListener("touchend", (element) => {
    touchEndX = element.changedTouches[0].screenX;
    if (touchEndX > touchStartX) {
      prevBtn.click();
    } else if (touchStartX > touchEndX) {
      nxtBtn.click();
    }
  });
});

// click next and prev buttons functionality
nxtBtn.onclick = () => {
  if (active + 1 > listLength) {
    active = 0;
  } else {
    active++;
  }
  reloadImage();
};

prevBtn.onclick = () => {
  if (active == 0) {
    active = listLength;
  } else {
    active--;
  }

  reloadImage();
};

reloadImage = () => {
  let checkLeft = items[active].offsetLeft;
  list.style.left = -checkLeft + "px";

  let lastActiveDot = document.querySelector("li.active");
  lastActiveDot.classList.remove("active");
  dots[active].classList.add("active");

  clearInterval(refreshSlider);
  refreshSlider = setInterval(() => nxtBtn.click(), 4000);
};

// dots functionality
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    active = index;
    reloadImage();
  });
});
