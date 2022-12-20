import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryContainer = document.querySelector(".gallery");

const createGalleryMarkup = galleryItems
  .map(
    ({ preview, original, description }) => `<div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>`
  )
  .join("");

galleryContainer.insertAdjacentHTML("beforeend", createGalleryMarkup);

galleryContainer.addEventListener("click", openModal);

const instance = basicLightbox.create(
  `<img src="" >`,
  {
    onShow: (instance) => {
      window.addEventListener("keydown", closeModal);
    },
  },
  {
    onClose: (instance) => {
      window.removeEventListener("keydown", closeModal);
    },
  }
);

function openModal(evt) {
  evt.preventDefault();
  if (!evt.target.classList.contains("gallery__image")) {
    return;
  }

  instance.element().querySelector("img").src = evt.target.dataset.source;

  instance.show();
}

function closeModal(evt) {
  if (evt.code === "Escape") {
    return instance.close();
  }
}
