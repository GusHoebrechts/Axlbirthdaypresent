const SCARE_DURATION = 3000;

const jumpscare = document.getElementById("jumpscare");
const jumpscareImg = document.getElementById("jumpscare-img");

let hideTimer = null;

function startJumpscare(src) {
    clearTimeout(hideTimer);

    jumpscareImg.src = src;

    jumpscare.classList.add("is-active");
    document.body.classList.add("scare-active");

    hideTimer = setTimeout(endJumpscare, SCARE_DURATION);
}

function endJumpscare() {
    clearTimeout(hideTimer);

    jumpscare.classList.remove("is-active");
    document.body.classList.remove("scare-active");
}

document.querySelectorAll(".support-card .contact-btn").forEach((button) => {
    button.addEventListener("click", () => {
        const photo = button
            .closest(".support-card")
            .querySelector(".photo-frame img");

        startJumpscare(photo.currentSrc || photo.src);
    });
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && jumpscare.classList.contains("is-active")) {
        endJumpscare();
    }
});

const GAME_DURATION = 500;

const moralButton = document.getElementById("moral-btn");
const gameScreen = document.getElementById("game-screen");
const gameAudio = document.getElementById("game-audio");

let gameTimer = null;

function startGame() {
    clearTimeout(gameTimer);

    gameScreen.classList.add("is-active");
    document.body.classList.add("scare-active");

    gameAudio.currentTime = 0;
    gameAudio.play().catch(() => {});

    gameTimer = setTimeout(hideGame, GAME_DURATION);
}

function hideGame() {
    clearTimeout(gameTimer);

    gameScreen.classList.remove("is-active");
    document.body.classList.remove("scare-active");
}

function stopAudio() {
    gameAudio.pause();
    gameAudio.currentTime = 0;
}

moralButton.addEventListener("click", startGame);

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        hideGame();
        stopAudio();
    }
});