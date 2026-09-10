function unloadContent() {
    unsetActivePageButton();
    removeBackground();
    removeText();
}

function unsetActivePageButton() {
    document.getElementById("homepage").classList.remove("activePage");
    document.getElementById("menupage").classList.remove("activePage");
    document.getElementById("aboutpage").classList.remove("activePage");
}

function removeBackground() {
    document.querySelector("body").classList.remove("homeImage", "menuImage", "aboutImage")
}

function removeText() {
    const contentArea = document.querySelector("#content");
    while(contentArea.firstChild) {
        contentArea.removeChild(contentArea.lastChild);
    }
}

export default unloadContent;