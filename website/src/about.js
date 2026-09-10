import "./styles.css";

const content = [
    {
        title: "Our Story",
        description: "At Olive & Greens, it all started with a simple idea: to elevate the world of salads. We believe that a salad can be more than just a side dish. It can be a main course full of flavor, texture, and fresh, high-quality ingredients. Inspired by the rich flavors of the Mediterranean and the incredible variety of olives, our founders wanted to create a place where salads take center stage. A place where crisp leafy greens meet the unique, fruity, and sometimes spicy notes of carefully selected olives."
    },
    {
        title: "Our Philosophy: The Art of the Salad",
        description: "Every salad at Olive & Greens is a commitment to freshness and quality. We source our ingredients from local partners and make sure that only the best reaches your plate. At the heart of our concept is the olive—a small powerhouse that adds a special depth to every one of our dishes. We feature an impressive selection of olive varieties from different regions, each with its own unmistakable character. From classic Mediterranean bowls and vibrant compositions to creative house-made creations, we invite you to rediscover the world of salads."
    },
    {
        title: "Visit Us",
        description: "Come in and experience how we combine the simplicity of fresh ingredients with the richness of exquisite olives. We look forward to welcoming you and serving you your new favorite salad."
    },
]

function loadPage() {
    const contentArea = document.querySelector("#content");
    setActivePageButton();
    loadBackground();
    contentArea.appendChild(getAboutHtml(content));
}

function setActivePageButton() {
    document.getElementById("aboutpage").classList.add("activePage");
}

function loadBackground() {
    const body = document.querySelector("body");
    body.classList.add("aboutImage");
}

function getAboutHtml(content) {
    const aboutContainer = getContainerHtml();
    content.map((contentBlock) => {
        aboutContainer.appendChild(getTitleHtml(contentBlock));
        aboutContainer.appendChild(getDescriptionHtml(contentBlock));
    })
    return aboutContainer;
}

function getContainerHtml() {
    const containerHtml = document.createElement("div");
    containerHtml.classList.add("container");
    return containerHtml;
}

function getTitleHtml(contentBlock) {
    const titleHtml = document.createElement("h2");
    titleHtml.textContent = contentBlock.title;
    titleHtml.classList.add("title");
    return titleHtml;
}

function getDescriptionHtml(contentBlock) {
    const descriptionHtml = document.createElement("p");
    descriptionHtml.textContent = contentBlock.description;
    descriptionHtml.classList.add("description");
    return descriptionHtml;
}

export default loadPage;