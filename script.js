// ==========================
// TYPING ANIMATION
// ==========================

var typed = new Typed("#typed", {
    strings: [
        "Machine Learning Engineer",
        "Python Developer",
        "Java Developer",
        "Data Analytics Enthusiast",
        "NCC Air Squadron Cadet"
    ],
    typeSpeed: 60,
    backSpeed: 40,
    backDelay: 1500,
    loop: true
});


// ==========================
// SMOOTH SCROLL
// ==========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        e.preventDefault();

        document.querySelector(
            this.getAttribute("href")
        ).scrollIntoView({
            behavior: "smooth"
        });

    });

});


// ==========================
// ACTIVE NAV LINK
// ==========================

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 150;

        if (
            pageYOffset >= sectionTop
        ) {
            current = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href")
            === "#" + current
        ) {
            link.classList.add("active");
        }

    });

});


// ==========================
// SCROLL REVEAL
// ==========================

const revealElements =
    document.querySelectorAll(
        ".glass-card, .project-card, .timeline-item, .skill"
    );

function revealOnScroll() {

    revealElements.forEach(el => {

        const windowHeight =
            window.innerHeight;

        const revealTop =
            el.getBoundingClientRect().top;

        if (revealTop < windowHeight - 100) {

            el.style.opacity = "1";
            el.style.transform =
                "translateY(0)";

        }

    });

}

revealElements.forEach(el => {

    el.style.opacity = "0";

    el.style.transform =
        "translateY(40px)";

    el.style.transition =
        "all 0.8s ease";

});

window.addEventListener(
    "scroll",
    revealOnScroll
);

revealOnScroll();

// ==========================
// VISITOR COUNTER
// ==========================

fetch("https://api.countapi.xyz/hit/md-jahiruddin-portfolio/visits")
    .then(res => res.json())
    .then(data => {
        document.getElementById("visitor-count").innerText = data.value;
    })
    .catch(() => {
        document.getElementById("visitor-count").innerText = "N/A";
    });

    
// ==========================
// PARTICLE BACKGROUND
// ==========================

const canvas =
    document.createElement("canvas");

canvas.id = "particleCanvas";

document
    .getElementById("particles")
    .appendChild(canvas);

const ctx =
    canvas.getContext("2d");

canvas.width =
    window.innerWidth;

canvas.height =
    window.innerHeight;

const particles = [];

const particleCount = 100;

class Particle {

    constructor() {

        this.x =
            Math.random() *
            canvas.width;

        this.y =
            Math.random() *
            canvas.height;

        this.radius =
            Math.random() * 2 + 1;

        this.dx =
            (Math.random() - 0.5) * 1;

        this.dy =
            (Math.random() - 0.5) * 1;
    }

    draw() {

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.radius,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            "#00f5ff";

        ctx.fill();
    }

    update() {

        this.x += this.dx;
        this.y += this.dy;

        if (
            this.x < 0 ||
            this.x > canvas.width
        ) {
            this.dx *= -1;
        }

        if (
            this.y < 0 ||
            this.y > canvas.height
        ) {
            this.dy *= -1;
        }

        this.draw();
    }

}

for (
    let i = 0;
    i < particleCount;
    i++
) {
    particles.push(
        new Particle()
    );
}

function connectParticles() {

    for (
        let a = 0;
        a < particles.length;
        a++
    ) {

        for (
            let b = a;
            b < particles.length;
            b++
        ) {

            let dx =
                particles[a].x -
                particles[b].x;

            let dy =
                particles[a].y -
                particles[b].y;

            let distance =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );

            if (distance < 120) {

                ctx.beginPath();

                ctx.strokeStyle =
                    "rgba(0,245,255,0.15)";

                ctx.lineWidth = 1;

                ctx.moveTo(
                    particles[a].x,
                    particles[a].y
                );

                ctx.lineTo(
                    particles[b].x,
                    particles[b].y
                );

                ctx.stroke();

            }

        }

    }

}

function animate() {

    requestAnimationFrame(
        animate
    );

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    particles.forEach(
        particle =>
            particle.update()
    );

    connectParticles();

}

animate();

window.addEventListener(
    "resize",
    () => {

        canvas.width =
            window.innerWidth;

        canvas.height =
            window.innerHeight;

    }
);