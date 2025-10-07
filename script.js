// Aktifkan efek active pada menu navbar ketika di-scroll
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 80;
    if (scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// humberger menu
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("show");
  menuToggle.classList.toggle("active");
});

// project
function showContent(tab) {
  document.getElementById("content-projects").style.display = tab === "projects" ? "flex" : "none";
  document.getElementById("content-certificates").style.display = tab === "certificates" ? "flex" : "none";

  document.getElementById("tab-projects").classList.toggle("active", tab === "projects");
  document.getElementById("tab-certificates").classList.toggle("active", tab === "certificates");
}

let currentTab = "projects";
let currentPage = 1;
const itemsPerPage = 4;

function showContent(tab) {
  document.getElementById("content-projects").style.display = tab === "projects" ? "flex" : "none";
  document.getElementById("content-certificates").style.display = tab === "certificates" ? "flex" : "none";
  document.getElementById("tab-projects").classList.toggle("active", tab === "projects");
  document.getElementById("tab-certificates").classList.toggle("active", tab === "certificates");

  currentTab = tab;
  currentPage = 1;
  showPage();
}

// dinamis root
function showPage() {
  const container = document.getElementById(`content-${currentTab}`);
  const cards = container.querySelectorAll(".card");

  cards.forEach((card, index) => {
    card.style.display = index >= (currentPage - 1) * itemsPerPage && index < currentPage * itemsPerPage ? "block" : "none";
  });

  const totalPages = Math.ceil(cards.length / itemsPerPage);
  document.getElementById("prevBtn").style.display = currentPage > 1 ? "inline-block" : "none";
  document.getElementById("nextBtn").style.display = currentPage < totalPages ? "inline-block" : "none";
}

function nextPage() {
  currentPage++;
  showPage();
}

function prevPage() {
  currentPage--;
  showPage();
}

showPage();

// skill section
// === Skill Section Pagination ===
(() => {
  const skillsGrid = document.querySelector("#skillsGrid");
  const prevBtn = document.getElementById("prevSkill");
  const nextBtn = document.getElementById("nextSkill");

  if (!skillsGrid || !prevBtn || !nextBtn) return;

  const skills = skillsGrid.querySelectorAll(".skill-card");
  let currentPage = 0;
  const itemsPerPage = 4;

  function showSkillsPage() {
    const start = currentPage * itemsPerPage;
    const end = start + itemsPerPage;

    skills.forEach((skill, i) => {
      skill.style.display = i >= start && i < end ? "flex" : "none";
    });

    prevBtn.disabled = currentPage === 0;
    nextBtn.disabled = end >= skills.length;
  }

  nextBtn.addEventListener("click", () => {
    if ((currentPage + 1) * itemsPerPage < skills.length) {
      currentPage++;
      showSkillsPage();
    }
  });

  prevBtn.addEventListener("click", () => {
    if (currentPage > 0) {
      currentPage--;
      showSkillsPage();
    }
  });

  function checkResponsive() {
    if (window.innerWidth <= 768) {
      showSkillsPage();
      prevBtn.style.display = nextBtn.style.display = "inline-block";
    } else {
      skills.forEach((skill) => (skill.style.display = "flex"));
      prevBtn.style.display = nextBtn.style.display = "none";
    }
  }

  window.addEventListener("resize", checkResponsive);
  checkResponsive();
})();

// alert email
document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const form = e.target;

  fetch(form.action, {
    method: form.method,
    body: new FormData(form),
  }).then((response) => {
    if (response.ok) {
      Swal.fire("Berhasil!", "Pesan kamu sudah terkirim.", "success");
      form.reset();
    } else {
      Swal.fire("Gagal!", "Terjadi kesalahan. Coba lagi nanti.", "error");
    }
  });
});
