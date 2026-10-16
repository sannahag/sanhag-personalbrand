const temaknapp = document.querySelector("#tema");
temaknapp.hidden = false;

function bytTema() {
    document.body.classList.toggle("morkt");
    if (document.body.classList.contains("morkt")) {
        temaknapp.textContent = "Byt till ljust läge";
    } else {
        temaknapp.textContent = "Byt till mörkt läge";
    }
}

temaknapp.addEventListener("click", bytTema);


let sparadPosition = 0;
const bildvisare = document.querySelector("#bildvisare");
const storBild = bildvisare.querySelector("img");

document.querySelectorAll("#projekt .kort img").forEach((bild) => {
    bild.addEventListener("click", () => {
        storBild.src = bild.src;
        storBild.alt = bild.alt;
        bildvisare.showModal();
    });
});

bildvisare.querySelector(".bildvisare-stang").addEventListener("click", () => {
    bildvisare.close();
});

bildvisare.addEventListener("click", (event) => {
    if (event.target === bildvisare) {
        bildvisare.close();
    }
});
