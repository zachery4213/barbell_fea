const cases = {
  "case-25": {
    title: "25 lb / side",
    description: "One 25 lb plate on each sleeve, producing the baseline response.",
    mass: "50 lb",
    force: "111.2 N",
    stress: "59.47 MPa",
    deform: "7.71 mm",
    safety: "4.20"
  },
  "case-70": {
    title: "25 + 45 lb / side",
    description: "A 25 lb and 45 lb plate on each side, showing the middle loading condition.",
    mass: "140 lb",
    force: "311.4 N",
    stress: "116.35 MPa",
    deform: "14.93 mm",
    safety: "2.15"
  },
  "case-90": {
    title: "45 + 45 lb / side",
    description: "Two 45 lb plates on each side, the governing case with the lowest safety factor.",
    mass: "180 lb",
    force: "400.3 N",
    stress: "141.66 MPa",
    deform: "18.14 mm",
    safety: "1.76"
  }
};

const updateCase = (caseId) => {
  const selected = cases[caseId];
  if (!selected) return;

  document.querySelectorAll(".case-tab").forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.case === caseId);
  });

  document.querySelector("#caseTitle").textContent = selected.title;
  document.querySelector("#caseDescription").textContent = selected.description;
  document.querySelector("#massValue").textContent = selected.mass;
  document.querySelector("#forceValue").textContent = selected.force;
  document.querySelector("#stressValue").textContent = selected.stress;
  document.querySelector("#deformValue").textContent = selected.deform;
  document.querySelector("#safetyValue").textContent = selected.safety;
};

document.querySelectorAll(".case-tab").forEach((tab) => {
  tab.addEventListener("click", () => updateCase(tab.dataset.case));
});

document.querySelectorAll(".filter").forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    document.querySelectorAll(".filter").forEach((item) => {
      item.classList.toggle("active", item === button);
    });

    document.querySelectorAll(".image-row").forEach((row) => {
      const isVisible = filter === "all" || row.dataset.group === filter;
      row.classList.toggle("is-hidden", !isVisible);
    });
  });
});

const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightboxImage");
const lightboxTitle = document.querySelector("#lightboxTitle");

document.querySelectorAll(".plot").forEach((plot) => {
  plot.addEventListener("click", () => {
    const image = plot.querySelector("img");
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightboxTitle.textContent = plot.dataset.title;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
  });
});

const closeLightbox = () => {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.removeAttribute("src");
};

document.querySelector(".close-lightbox").addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox.classList.contains("open")) {
    closeLightbox();
  }
});
