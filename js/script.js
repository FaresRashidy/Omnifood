"use strict";

const btnNavEl = document.querySelector(".btn-mobile-nav");
const btnBurgerEl = document.querySelector(".burger-2");
const headerEl = document.querySelector(".header");
const currDateEl = document.querySelector(".curr-date");
const allNavEls = document.querySelectorAll(".main-nav-link");

const currentYear = new Date().getFullYear();
currDateEl.textContent = currentYear;

///////////////////////////////////
//////////Burger Button////////////
///////////////////////////////////
// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
const keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

// modern Chrome requires { passive: false } when adding event
let supportsPassive = false;
try {
  window.addEventListener(
    "test",
    null,
    Object.defineProperty({}, "passive", {
      get: function () {
        supportsPassive = true;
      },
    })
  );
} catch (e) {}

const wheelOpt = supportsPassive ? { passive: false } : false;
const wheelEvent =
  "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";

// call this to Disable
function disableScroll() {
  window.addEventListener("DOMMouseScroll", preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener("touchmove", preventDefault, wheelOpt); // mobile
  window.addEventListener("keydown", preventDefaultForScrollKeys, false);
}

// call this to Enable
function enableScroll() {
  window.removeEventListener("DOMMouseScroll", preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
  window.removeEventListener("touchmove", preventDefault, wheelOpt);
  window.removeEventListener("keydown", preventDefaultForScrollKeys, false);
}

const burgerFunc = function () {
  btnBurgerEl.classList.toggle("is-closed");
  headerEl.classList.toggle("nav-open");

  console.log(btnBurgerEl.classList.contains("is-closed"));

  if (btnBurgerEl.classList.contains("is-closed")) {
    disableScroll();
  } else {
    enableScroll();
  }
};

btnNavEl.addEventListener("click", burgerFunc);

allNavEls.forEach((el) => {
  el.addEventListener("click", () => {
    if (window.innerWidth / 16 <= 59) {
      burgerFunc();
    }
  });
});

///////////////////////////////////////
//////////STICKY NAVIGATION////////////
///////////////////////////////////////
const heroEl = document.querySelector(".section-hero");

const observer = new IntersectionObserver(
  (entry) => {
    if (!entry[0].isIntersecting) {
      headerEl.classList.add("sticky");
      heroEl.style.marginTop = "9.6rem";
    } else {
      headerEl.classList.remove("sticky");
      heroEl.style.marginTop = "0";
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: "-80px",
  }
);
observer.observe(heroEl);
