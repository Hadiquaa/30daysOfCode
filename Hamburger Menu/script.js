const menuBar = document.getElementsByClassName("menu-icon")[0];
console.log(menuBar);
menuBar.addEventListener("click", () => {
  if (menuBar.classList.contains("menu-active")) {
    menuBar.classList.add("menu-closed");
    menuBar.classList.remove("menu-active");
  } else {
    menuBar.classList.add("menu-active");
    menuBar.classList.remove("menu-closed");
  }
});
