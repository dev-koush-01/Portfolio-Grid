const portfolioItems = [
    {
        title: "Project 1",
        image: "assets/images/project1.png",
        description: "Description for Project 1",
        category: "web"
    },
    {
        title: "Project 2",
        image: "assets/images/project2.png",
        description: "Description for Project 2",
        category: "mobile"
    },
    {
        title: "Project 3",
        image: "assets/images/project3.png",
        description: "Description for Project 3",
        category: "design"
    },
    {
        title: "Project 4",
        image: "assets/images/project4.png",
        description: "Description for Project 4",
        category: "web"
    },
    {
        title: "Project 5",
        image: "assets/images/project5.png",
        description: "Description for Project 5",
        category: "mobile"
    },
    {
        title: "Project 6",
        image: "assets/images/project6.png",
        description: "Description for Project 6",
        category: "mobile"
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.querySelector('.grid');
    const modal = document.querySelector('.modal');
    const modalImage = document.querySelector('.modal-image');
    const modalTitle = document.querySelector('.modal-title');
    const modalDescription = document.querySelector('.modal-description');
    const closeModal = document.querySelector('.close-modal');
    const categoryFilter = document.getElementById('categoryFilter');
    const searchInput = document.getElementById('searchInput');

    function createGridItems() {
        gridContainer.innerHTML = '';
        portfolioItems.forEach(item => {
            const gridItem = document.createElement('div');
            gridItem.classList.add('grid-item');
            gridItem.dataset.category = item.category.toLowerCase();
            gridItem.dataset.title = item.title.toLowerCase();

            const img = document.createElement('img');
            img.src = item.image;
            img.alt = item.title;

            const title = document.createElement('div');
            title.className = 'grid-item-title';
            title.textContent = item.title;

            const descOverlay = document.createElement('div');
            descOverlay.className = 'grid-item-desc';
            descOverlay.textContent = item.description;

            // Add preview button
            const previewBtn = document.createElement('button');
            previewBtn.className = 'preview-btn';
            previewBtn.textContent = 'Preview';
            previewBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                openModal(item);
            });

            gridItem.appendChild(img);
            gridItem.appendChild(title);
            gridItem.appendChild(descOverlay);
            gridItem.appendChild(previewBtn);
            gridContainer.appendChild(gridItem);
        });
    }

    function openModal(item) {
        modalImage.src = item.image;
        modalTitle.textContent = item.title;
        modalDescription.textContent = item.description;
        modal.classList.add('show');
    }

    function closeModalHandler() {
        modal.classList.remove('show');
    }

    closeModal.addEventListener('click', closeModalHandler);
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModalHandler();
        }
    });

    function filterItems() {
        const selectedCategory = categoryFilter.value;
        const searchValue = searchInput.value.trim().toLowerCase();
        const gridItems = document.querySelectorAll('.grid-item');
        gridItems.forEach(item => {
            const category = item.dataset.category;
            const title = item.dataset.title;
            const matchesCategory = selectedCategory === 'all' || category === selectedCategory;
            const matchesSearch = title.includes(searchValue);
            if (matchesCategory && matchesSearch) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }

    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterItems);
    }
    if (searchInput) {
        searchInput.addEventListener('input', filterItems);
    }

    createGridItems();
});