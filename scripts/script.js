const menuButton = document.querySelector(".menu-icon");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("sidebar-overlay");

function setMenu(open) {
    document.body.classList.toggle("menu-open", open);

    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Close menu" : "Open menu");

    if (open) {
        sidebar.querySelector("a").focus();
    } else {
        menuButton.focus();
    }
}

menuButton.addEventListener("click", () => {
    setMenu(!document.body.classList.contains("menu-open"));
});

overlay.addEventListener("click", () => setMenu(false));

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && document.body.classList.contains("menu-open")) {
        setMenu(false);
    }
});

sidebar.querySelector('[aria-current="page"]').addEventListener("click", (event) => {
    event.preventDefault();
    setMenu(false);
});