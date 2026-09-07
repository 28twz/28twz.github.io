/* =========================================
   MENU MOBILE
========================================= */

const menuButton = document.getElementById("menuButton");
const navLinks = document.getElementById("navLinks");

if (menuButton && navLinks) {

    menuButton.addEventListener("click", () => {

        navLinks.classList.toggle("active");

    });

}


/* =========================================
   FERMER LE MENU APRÈS UN CLIC
========================================= */

const links = document.querySelectorAll(".nav-link");

links.forEach(link => {

    link.addEventListener("click", () => {

        if (navLinks) {

            navLinks.classList.remove("active");

        }

    });

});


/* =========================================
   NAVIGATION ACTIVE
========================================= */

const sections = document.querySelectorAll("section[id]");

function updateActiveNavigation() {

    let currentSection = "accueil";

    const scrollPosition =
        window.scrollY + 150;


    sections.forEach(section => {

        const sectionTop =
            section.offsetTop;

        const sectionHeight =
            section.offsetHeight;

        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    links.forEach(link => {

        link.classList.remove("active");

        const target =
            link.getAttribute("href");

        if (target === "#" + currentSection) {

            link.classList.add("active");

        }

    });

}


window.addEventListener(
    "scroll",
    updateActiveNavigation
);


window.addEventListener(
    "load",
    updateActiveNavigation
);


/* =========================================
   MODE CLAIR / MODE SOMBRE
========================================= */

const themeToggle =
    document.getElementById("themeToggle");

const root =
    document.documentElement;


/*
   Appliquer le thème
*/

function applyTheme(isDark) {

    root.classList.toggle(
        "dark",
        isDark
    );


    if (!themeToggle) {
        return;
    }


    themeToggle.classList.toggle(
        "dark",
        isDark
    );


    themeToggle.setAttribute(
        "aria-pressed",
        String(isDark)
    );


    themeToggle.setAttribute(
        "aria-label",
        isDark
            ? "Activer le mode clair"
            : "Activer le mode sombre"
    );

}


/*
   Charger le thème sauvegardé
*/

if (themeToggle) {

    const savedTheme =
        localStorage.getItem("portfolio-theme");


    applyTheme(
        savedTheme === "dark"
    );


    /*
       Changement du thème
    */

    themeToggle.addEventListener(
        "click",
        () => {

            const isDark =
                !root.classList.contains("dark");


            applyTheme(isDark);


            localStorage.setItem(
                "portfolio-theme",
                isDark
                    ? "dark"
                    : "light"
            );

        }
    );

}


/* =========================================
   ANIMATION TITRE ACCUEIL
========================================= */

const heroTitle = document.querySelector(".hero h1");

if (heroTitle) {

    const firstName = "Enzo";
    const lastName = "Rabet.";

    heroTitle.innerHTML = `
        <span class="typing-line first-line"></span><br>
        <span class="typing-line last-line"></span>
    `;

    const firstLine =
        heroTitle.querySelector(".first-line");

    const lastLine =
        heroTitle.querySelector(".last-line");


    let firstIndex = 0;
    let secondIndex = 0;


    function createCursor() {

        const cursor =
            document.createElement("span");

        cursor.className =
            "typing-cursor";

        cursor.textContent = "|";

        return cursor;

    }


    let cursor =
        createCursor();

    firstLine.appendChild(cursor);


    function typeFirstName() {

        if (firstIndex < firstName.length) {

            cursor.remove();

            firstLine.textContent +=
                firstName[firstIndex];

            firstIndex++;

            firstLine.appendChild(cursor);

            setTimeout(
                typeFirstName,
                220
            );

        } else {

            setTimeout(
                moveCursorToLastName,
                300
            );

        }

    }


    function moveCursorToLastName() {

        cursor.remove();

        lastLine.appendChild(cursor);

        typeLastName();

    }


    function typeLastName() {

        if (secondIndex < lastName.length) {

            cursor.remove();

            lastLine.textContent +=
                lastName[secondIndex];

            secondIndex++;

            lastLine.appendChild(cursor);

            setTimeout(
                typeLastName,
                220
            );

        } else {

            setTimeout(
                blinkBeforeErase,
                2500
            );

        }

    }


    function blinkBeforeErase() {

        cursor.classList.add(
            "typing-cursor-slow"
        );

        setTimeout(
            eraseText,
            1800
        );

    }


    function eraseText() {

        cursor.classList.remove(
            "typing-cursor-slow"
        );


        const eraseInterval =
            setInterval(() => {

                if (secondIndex > 0) {

                    cursor.remove();

                    secondIndex--;

                    lastLine.textContent =
                        lastName.substring(
                            0,
                            secondIndex
                        );

                    lastLine.appendChild(
                        cursor
                    );

                } else if (firstIndex > 0) {

                    cursor.remove();

                    firstIndex--;

                    firstLine.textContent =
                        firstName.substring(
                            0,
                            firstIndex
                        );

                    firstLine.appendChild(
                        cursor
                    );

                } else {

                    clearInterval(
                        eraseInterval
                    );

                    cursor.remove();

                    firstLine.appendChild(
                        cursor
                    );

                    setTimeout(
                        typeFirstName,
                        1000
                    );

                }

            }, 120);

    }


    typeFirstName();

}