import "./styles.css";

const menu = [
    {
        type: "Salads",
        name: "The Classic Greek",
        description: "A fresh salad with crisp romaine lettuce, cucumbers, tomatoes, red onions, feta cheese, and, of course, Kalamata olives. Finished with a classic lemon-oregano dressing."
    },
    {
        type: "Salads",
        name: "Oriental Dream",
        description: "A colorful mix of couscous, chickpeas, roasted bell peppers, fresh mint, and parsley, enhanced with marinated green olives. Served with a pomegranate dressing."
    },
    {
        type: "Salads",
        name: "The Wild South",
        description: "A hearty salad with grilled chicken, avocado, corn, black beans, tomatoes, and green olives. Paired with a slightly spicy chili-lime dressing."
    },
    {
        type: "Bowls",
        name: "The Green Goddess",
        description: "A nutrient-rich bowl with quinoa, broccoli, edamame, avocado, baby spinach, and olive tapenade. Topped with a creamy herb dressing."
    },
    {
        type: "Bowls",
        name: "Pescador Bowl",
        description: "A Mediterranean delight with pan-seared salmon, wild rice, cherry tomatoes, cucumbers, red onions, and Kalamata olives. Served with a yogurt sauce and fresh dill."
    },
    {
        type: "Bowls",
        name: "Sweet Olive",
        description: "A surprising combination of sweet potato cubes, spinach, walnuts, goat cheese, and caramelized olives. Finished with a honey-mustard dressing."
    },
    {
        type: "Desserts",
        name: "Bread & Dip",
        description: "Fresh-baked bread with our homemade olive tapenade."
    },
    {
        type: "Desserts",
        name: "Creamy Yogurt with Honey and Walnuts",
        description: "A light and sweet dessert."
    }
]

function loadPage() {
    const contentArea = document.querySelector("#content");
    setActivePageButton();
    loadBackground();
    contentArea.appendChild(getContainerHtml());
    contentArea.appendChild(getMenuHtml(menu));
}

function setActivePageButton() {
    document.getElementById("menupage").classList.add("activePage");
}

function loadBackground() {
    const body = document.querySelector("body");
    body.classList.add("menuImage");
}

function getContainerHtml() {
    const containerHtml = document.createElement("div");
    containerHtml.classList.add("container");
    return containerHtml;
}

function getMenuHtml(menu) {
    const container = document.querySelector(".container")
    menu.map((dish) => {
        if (!lastTitleEquals(dish.type)) {
            container.appendChild(getTitleHtml(dish));
        }
        container.appendChild(getDishNameHtml(dish));
        container.appendChild(getDescriptionHtml(dish));
    })
    return container;
}

function lastTitleEquals(title) {
    const menuContainer = document.querySelector(".container");
    if(menuContainer.hasChildNodes()) {
        const titles = menuContainer.querySelectorAll("h2");
        const lastTitle = titles[titles.length-1];
        return lastTitle.textContent === title;
    } else {
        return false;
    }
}

function getTitleHtml(dish) {
    const titleHtml = document.createElement("h2");
    titleHtml.textContent = dish.type;
    titleHtml.classList.add("title");
    return titleHtml;
}

function getDishNameHtml(dish) {
    const dishNameHtml = document.createElement("h3");
    dishNameHtml.classList.add("dish");
    dishNameHtml.textContent = dish.name;
    return dishNameHtml;
}

function getDescriptionHtml(dish) {
    const descriptionHtml = document.createElement("p");
    descriptionHtml.classList.add("description");
    descriptionHtml.textContent = dish.description;
    return descriptionHtml;
}

export default loadPage;