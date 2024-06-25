import entries from "./entries.js";

const oneup = new Audio("/1up.mp3");
const logo = document.querySelector("#logo");

const entryList = document.querySelector("#entries");

for (const entry of entries) {
  const anchor = document.createElement("a");

  const main = document.createElement("main");
  const title = document.createElement("b");
  const year = document.createElement("small");

  anchor.href = "#";
  anchor.appendChild(main);

  main.appendChild(title);
  main.appendChild(year);

  title.innerText = entry.title;
  year.innerText = String(entry.year);

  anchor.style.backgroundImage = `url("${entry.cover}")`;

  entryList.appendChild(anchor);

  anchor.addEventListener("click", () => {
    document.body.dataset.transition = true;

    setTimeout(() => {
      location.hash = entry.link;
      location.pathname = "/article.html";
    }, 250);
  });
}

logo.addEventListener("click", () => {
  oneup.currentTime = 0;
  oneup.play();
})

setTimeout(() => {
  document.body.dataset.transition = false;
}, 250);