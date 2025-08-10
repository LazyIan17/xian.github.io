// Dark mode toggle with persistence
const darkToggle = document.getElementById("darkModeToggle");
const root = document.documentElement;

function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    darkToggle.setAttribute("aria-pressed", theme === "dark");
    darkToggle.textContent =
        theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode";
}

function toggleTheme() {
    const current = root.getAttribute("data-theme") || "dark";
    const next = current === "dark" ? "light" : "dark";
    applyTheme(next);
    localStorage.setItem("theme", next);
}

darkToggle.addEventListener("click", toggleTheme);

// Load theme preference
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
    applyTheme(savedTheme);
} else {
    // Default to dark mode
    applyTheme("dark");
}

// Project modal
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalLink = document.getElementById("modalLink");

function openModal(project) {
    modalTitle.textContent = project.dataset.title;
    modalDesc.textContent = project.dataset.desc;
    modalLink.href = project.dataset.link || "#";
    modalLink.setAttribute(
        "aria-label",
        `View project: ${project.dataset.title}`
    );
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    modal.focus();
}
function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
}

// Enable keyboard opening with Enter or Space on projects
document.querySelectorAll(".project").forEach((project) => {
    project.addEventListener("click", () => openModal(project));
    project.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openModal(project);
        }
    });
});

document.querySelector(".close-btn").addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        closeModal();
    }
});

window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeModal();
    }
});

// Simple contact form demo with validation messages
const form = document.getElementById("contactForm");
const inputs = {
    name: form.name,
    email: form.email,
    message: form.message,
};
const helps = {
    name: document.getElementById("nameHelp"),
    email: document.getElementById("emailHelp"),
    message: document.getElementById("messageHelp"),
};

function validateInput(input) {
    if (!input.checkValidity()) {
        helps[input.name].style.display = "block";
        return false;
    } else {
        helps[input.name].style.display = "none";
        return true;
    }
}

Object.values(inputs).forEach((input) => {
    input.addEventListener("input", () => validateInput(input));
});

function submitForm(e) {
    e.preventDefault();

    let valid = true;
    Object.values(inputs).forEach((input) => {
        if (!validateInput(input)) valid = false;
    });
    if (!valid) return;

    // Disable submit to prevent double submits
    const submitBtn = form.querySelector("button[type=submit]");
    submitBtn.disabled = true;

    // Demo alert
    alert(`Thanks, ${inputs.name.value.trim()} — message received (demo).`);

    form.reset();
    submitBtn.disabled = false;
}