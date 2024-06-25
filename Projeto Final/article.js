const articleTitle = document.querySelector("#article-title");
const articleThumbnail = document.querySelector("#article-thumbnail");
const articleContent = document.querySelector(".article-content");

const back = document.querySelector(".back");

const refreshArticle = async () => {
  const slug = location.hash.replace("#", "");

  try {
    const res = await fetch(`/articles/${slug}.html`);
    const text = await res.text();

    if (res.status === 404) {
      articleTitle.innerText = "Artigo não encontrado";
      articleContent.innerHTML = `Você talvez queira <a href="/">voltar ao início</a>.`;
      return;
    }

    articleContent.innerHTML = text;

    const title = articleContent.querySelector("title");
    articleTitle.innerText = title.innerText;
    title.remove();

    const img = articleContent.querySelector("img");
    if (img) {
      articleThumbnail.src = img.src;
      articleThumbnail.style.display = "block";
      img.remove();
    }

    document.title = `${title.innerText} | Super Mario Wiki`;
  } catch (err) {
    console.error("Failed to load article:", err);
    articleTitle.innerText = "Artigo não encontrado";
    articleContent.innerHTML = `Você talvez queira <a href="/">voltar ao início</a>.`;
  }
};

setTimeout(() => {
  document.body.dataset.transition = false;
}, 250);

back.addEventListener("click", () => {
  document.body.dataset.transition = true;

  setTimeout(() => {
    location.hash = "";
    location.pathname = "/";
  }, 250);
});

refreshArticle();
addEventListener("hashchange", () => {
  document.body.dataset.transition = true;

  setTimeout(async () => {
    await refreshArticle();
    document.body.dataset.transition = false;
  }, 250);
});