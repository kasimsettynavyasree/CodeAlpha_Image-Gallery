const images = document.querySelectorAll(".gallery-item");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const filterButtons = document.querySelectorAll(".filters button");

let currentIndex = 0;
let visibleImages = [...images];


images.forEach((img, index) => {
  img.addEventListener("click", () => {
    visibleImages = [...document.querySelectorAll(".gallery-item:not([style*='display: none'])")];
    currentIndex = visibleImages.indexOf(img);
    lightbox.style.display = "flex";
    lightboxImg.src = img.src;
  });
});


closeBtn.onclick = () => lightbox.style.display = "none";


function showImage(index) {
  currentIndex = (index + visibleImages.length) % visibleImages.length;
  lightboxImg.src = visibleImages[currentIndex].src;
}

nextBtn.onclick = () => showImage(currentIndex + 1);
prevBtn.onclick = () => showImage(currentIndex - 1);


document.addEventListener("keydown", (e) => {
  if (lightbox.style.display === "flex") {
    if (e.key === "ArrowRight") showImage(currentIndex + 1);
    if (e.key === "ArrowLeft") showImage(currentIndex - 1);
    if (e.key === "Escape") lightbox.style.display = "none";
  }
});


filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;

    images.forEach(img => {
      img.style.display =
        filter === "all" || img.classList.contains(filter)
          ? "block"
          : "none";
    });
  });
});