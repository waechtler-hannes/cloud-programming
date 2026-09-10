import "./styles.css";

const headlineText = "Olive & Greens";

const descriptionText = "Where the world of salads meets the distinctive variety of olives. From crisp leafy greens and Mediterranean compositions to creative bowls, we focus on fresh ingredients and the unique flavor that only high-quality olives can provide. Discover your new favorite salad.";

function loadPage() {
    const contentArea = document.querySelector("#content");
    setActivePageButton();
    loadBackground();
    contentArea.appendChild(getHeadlineHtml());
    contentArea.appendChild(getDescriptionHtml());
}

function setActivePageButton() {
    document.getElementById("homepage").classList.add("activePage");
}

function loadBackground() {
    const body = document.querySelector("body");
    body.classList.add("homeImage");
}

function getHeadlineHtml() {
    const headlineHtml = document.createElement("h1");
    headlineHtml.textContent = headlineText;
    headlineHtml.classList.add("homeHeadline");
    return headlineHtml;
}

function getDescriptionHtml() {
    const descriptionHtml = document.createElement("p");
    descriptionHtml.textContent = descriptionText;
    descriptionHtml.classList.add("homeDescription");
    return descriptionHtml;
}

export default loadPage;