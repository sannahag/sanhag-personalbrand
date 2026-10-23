const kontaktForm = document.querySelector("#kontakt-form");
const kontaktStatus = document.querySelector("#kontakt-status");
kontaktForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(kontaktForm);
    const submitButton = kontaktForm.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    kontaktStatus.textContent = "Sending…";

    const submission = {
        fields: [
            { name: "firstname", value: formData.get("name") },
            { name: "email", value: formData.get("email") },
            { name: "message", value: formData.get("message") },
        ],
        context: {
            pageUri: window.location.href,
            pageName: document.title,
        },
    };

    try {
        const response = await fetch(
            "https://api.hsforms.com/submissions/v3/integration/submit/149565903/5b38959c-5e50-456f-a64a-23059b442c1a",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(submission),
            }
        );

        if (!response.ok) {
            throw new Error("HubSpot rejected the submission");
        }

        kontaktStatus.textContent = "Thank you! Your message has been sent.";
        kontaktForm.reset();
    } catch (error) {
        kontaktStatus.textContent = "Sorry, your message could not be sent. Please e-mail me directly.";
    } finally {
        submitButton.disabled = false;
    }
});


let sparadPosition = 0;
const bildvisare = document.querySelector("#bildvisare");
const storBild = bildvisare.querySelector("img");

function aterstallScrollposition() {
    const scrollBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(0, sparadPosition);
    document.documentElement.style.scrollBehavior = scrollBehavior;
}

function oppnaBildvisare(src, alt, arCv = false) {
    sparadPosition = window.scrollY;
    bildvisare.classList.toggle("cv-visning", arCv);
    bildvisare.classList.remove("cv-zoomad");
    storBild.src = src;
    storBild.alt = alt;
    bildvisare.showModal();
    bildvisare.focus({ preventScroll: true });
    aterstallScrollposition();
}

document.querySelectorAll("#projekt .kort img").forEach((bild) => {
    bild.addEventListener("click", () => {
        oppnaBildvisare(bild.src, bild.alt);
    });
});

document.querySelector("#visa-cv").addEventListener("click", () => {
    oppnaBildvisare("img/sannaCV.jpg", "Sanna Hagbergs CV", true);
});

storBild.addEventListener("click", () => {
    if (bildvisare.classList.contains("cv-visning")) {
        bildvisare.classList.toggle("cv-zoomad");
    }
});

bildvisare.addEventListener("close", aterstallScrollposition);

bildvisare.querySelector(".bildvisare-stang").addEventListener("click", () => {
    bildvisare.close();
});

bildvisare.addEventListener("click", (event) => {
    if (event.target === bildvisare) {
        bildvisare.close();
    }
});

const tillToppen = document.querySelector(".till-toppen");
const visaTillToppenEfter = 400;

function uppdateraTillToppen() {
    tillToppen.hidden = window.scrollY < visaTillToppenEfter;
}

window.addEventListener("scroll", uppdateraTillToppen, { passive: true });
tillToppen.addEventListener("click", () => {
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
    window.scrollTo({ top: 0, behavior });
});
uppdateraTillToppen();
