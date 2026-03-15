// js/animations.js

document.addEventListener("DOMContentLoaded", () => {
    // Basic GSAP entry animations
    gsap.from("h1", { opacity: 0, y: -20, duration: 0.8, ease: "power2.out", delay: 0.1 });
    gsap.from(".ascii", { opacity: 0, scale: 0.9, duration: 0.8, ease: "power2.out", delay: 0.2 });
    gsap.from(".marquee-text", { opacity: 0, x: -50, duration: 0.8, ease: "power2.out", delay: 0.3 });
    gsap.from(".section", { opacity: 0, y: 30, duration: 0.8, ease: "power2.out", stagger: 0.2, delay: 0.4 });

    // Micro-interactions for buttons and links
    const topbarLinks = document.querySelectorAll(".menu a, .theme-toggle-btn");
    topbarLinks.forEach(link => {
        link.addEventListener("mouseenter", () => {
            gsap.to(link, { scale: 1.1, duration: 0.2, ease: "power1.out" });
        });
        link.addEventListener("mouseleave", () => {
            gsap.to(link, { scale: 1, duration: 0.2, ease: "power1.in" });
        });
        link.addEventListener("mousedown", () => {
            gsap.to(link, { scale: 0.95, duration: 0.1 });
        });
        link.addEventListener("mouseup", () => {
            gsap.to(link, { scale: 1.1, duration: 0.1 });
        });
    });

    // Profile image hover effect
    const profileImage = document.querySelector(".profile-image");
    if (profileImage) {
        profileImage.addEventListener("mouseenter", () => {
            gsap.to(profileImage, { scale: 1.05, rotation: 1, duration: 0.3, ease: "power1.out" });
        });
        profileImage.addEventListener("mouseleave", () => {
            gsap.to(profileImage, { scale: 1, rotation: 0, duration: 0.3, ease: "power1.in" });
        });
    }

    // Terminal popup animation override (assuming terminalPopup display is managed in scripts.js)
    // We will attach an observer to animate when it becomes visible
    const terminalPopup = document.getElementById("terminal");
    if (terminalPopup) {
        let isVisible = window.getComputedStyle(terminalPopup).display !== "none";
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === "style" || mutation.attributeName === "class") {
                    const currentlyVisible = window.getComputedStyle(terminalPopup).display !== "none";
                    if (currentlyVisible && !isVisible) {
                        gsap.fromTo(terminalPopup,
                            { opacity: 0, scale: 0.8, y: "-50%", x: "-50%" },
                            { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.7)", y: "-50%", x: "-50%" }
                        );
                    }
                    isVisible = currentlyVisible;
                }
            });
        });
        observer.observe(terminalPopup, { attributes: true });
    }

    // Post Popup animation override
    const postPopup = document.getElementById("post-popup");
    if (postPopup) {
        let isVisible = window.getComputedStyle(postPopup).display !== "none";
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === "style" || mutation.attributeName === "class") {
                    const currentlyVisible = window.getComputedStyle(postPopup).display !== "none";
                    if (currentlyVisible && !isVisible) {
                        gsap.fromTo(postPopup,
                            { opacity: 0, scale: 0.8, y: "-50%", x: "-50%" },
                            { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.7)", y: "-50%", x: "-50%" }
                        );
                    }
                    isVisible = currentlyVisible;
                }
            });
        });
        observer.observe(postPopup, { attributes: true });
    }

    // Animate Posts and Tutorials dynamically loaded
    // We observe the containers
    const postsList = document.getElementById("posts-list");
    const tutorialsList = document.getElementById("tutoriais-list");

    const observeList = (list) => {
        if(list) {
            const listObserver = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.addedNodes.length > 0) {
                        mutation.addedNodes.forEach(node => {
                            if (node.nodeType === 1 && node.classList.contains("post")) {
                                gsap.fromTo(node,
                                    { opacity: 0, y: 20 },
                                    { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
                                );

                                // Hover effect
                                node.addEventListener("mouseenter", () => {
                                    gsap.to(node, { scale: 1.02, duration: 0.2, ease: "power1.out" });
                                });
                                node.addEventListener("mouseleave", () => {
                                    gsap.to(node, { scale: 1, duration: 0.2, ease: "power1.in" });
                                });
                            }
                        });
                    }
                });
            });
            listObserver.observe(list, { childList: true });
        }
    };

    observeList(postsList);
    observeList(tutorialsList);
});
