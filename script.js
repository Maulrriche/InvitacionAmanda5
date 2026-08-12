
/* ==========================================
   ELEMENTOS
========================================== */

const video = document.getElementById("introVideo");
const startButton = document.getElementById("startButton");
const backgroundMusic = document.getElementById("backgroundMusic");

let introFinished = false;


/* ==========================================
   TERMINAR INTRO
========================================== */

function finishIntro() {

    // Evitar que se ejecute más de una vez

    if (introFinished) {
        return;
    }

    introFinished = true;


    // Activar transición

    document.body.classList.add("intro-finished");


    // Detener el video

    video.pause();


    // Eliminar completamente la intro
    // después de la transición

    setTimeout(() => {

        const intro = document.getElementById("intro");

        intro.style.display = "none";

    }, 1000);
}


/* ==========================================
   REPRODUCIR VIDEO
========================================== */

function playVideo() {

    video.play()
        .then(() => {

            console.log("Video reproduciéndose correctamente.");

            // Ocultar botón cuando el video comienza

            startButton.style.display = "none";

        })
        .catch((error) => {

            console.log(
                "El navegador bloqueó el autoplay.",
                error
            );

            // Mantener botón visible

            startButton.style.display = "block";

        });
}


/* ==========================================
   MOSTRAR BOTÓN INMEDIATAMENTE
========================================== */

// No esperamos al video.
// El botón aparece desde el principio.

startButton.style.display = "block";


/* ==========================================
   INTENTAR AUTOPLAY
========================================== */

window.addEventListener("load", () => {

    playVideo();

});


/* ==========================================
   BOTÓN "ENTRAR"
========================================== */

startButton.addEventListener("click", () => {

    video.play()
        .then(() => {

            console.log(
                "Video iniciado mediante interacción del usuario."
            );

            startButton.style.display = "none";

        })
        .catch((error) => {

            console.error(
                "No se pudo reproducir el video:",
                error
            );

        });

});


/* ==========================================
   CUANDO EL VIDEO TERMINA
========================================== */

video.addEventListener("ended", () => {

    console.log("Video terminado.");


    /* -------------------------------
       INICIAR MÚSICA
    -------------------------------- */

    backgroundMusic.play()
        .then(() => {

            console.log("Música iniciada.");

        })
        .catch((error) => {

            console.log(
                "El navegador bloqueó la música:",
                error
            );

        });


    /* -------------------------------
       MOSTRAR PÁGINA
    -------------------------------- */

    finishIntro();

});


/* ==========================================
   CUENTA REGRESIVA
========================================== */

// Fecha objetivo:
// 13 de septiembre de 2026 a las 00:00:00

const targetDate =
    new Date("2026-09-12T00:00:00").getTime();


function updateCountdown() {

    const now = new Date().getTime();

    const difference = targetDate - now;


    /* -------------------------------
       FECHA YA LLEGÓ
    -------------------------------- */

    if (difference <= 0) {

        document.getElementById("days").textContent = "00";

        document.getElementById("hours").textContent = "00";

        document.getElementById("minutes").textContent = "00";

        document.getElementById("seconds").textContent = "00";

        return;
    }


    /* -------------------------------
       CÁLCULOS
    -------------------------------- */

    const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (difference / (1000 * 60 * 60)) % 24
    );

    const minutes = Math.floor(
        (difference / (1000 * 60)) % 60
    );

    const seconds = Math.floor(
        (difference / 1000) % 60
    );


    /* -------------------------------
       MOSTRAR RESULTADOS
    -------------------------------- */

    document.getElementById("days").textContent =
        String(days).padStart(2, "0");

    document.getElementById("hours").textContent =
        String(hours).padStart(2, "0");

    document.getElementById("minutes").textContent =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds").textContent =
        String(seconds).padStart(2, "0");

}


/* ==========================================
   INICIAR CUENTA REGRESIVA
========================================== */

updateCountdown();


/* Actualizar cada segundo */

setInterval(updateCountdown, 1000);

