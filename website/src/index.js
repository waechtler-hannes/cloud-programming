import unloadContent from "./unloadContent.js"
import loadHome from "./home.js";
import loadMenu from "./menu.js";
import loadAbout from "./about.js";

document.querySelector("nav").addEventListener("click", (event) => {
    const buttonClass = event.target.classList[0];
    if (buttonClass === "activePage") {
        return;
    } else {
        unloadContent();
        const buttonId = event.target.id;
        switch (buttonId) {
            case "homepage":
                loadHome();
                break;
            case "menupage":
                loadMenu();
                break;
            case "aboutpage":
                loadAbout();
                break;
        }
    }
})


loadHome();