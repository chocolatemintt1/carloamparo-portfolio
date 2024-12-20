const init = () => {
    setupTabSwitching();
    setupThemeToggle();
    setupCertPopup();
};

const setupTabSwitching = () => {
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and contents
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Add active class to clicked tab and corresponding content
            tab.classList.add('active');
            document.getElementById(tab.dataset.tab).classList.add('active');
        });
    });
};

const setupThemeToggle = () => {
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    // Set initial theme based on user's system preference
    if (prefersDarkScheme.matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        themeToggle.innerHTML = newTheme === 'dark' ?
            '<i class="fas fa-sun"></i>' :
            '<i class="fas fa-moon"></i>';
    });

    // Listen for system theme changes
    prefersDarkScheme.addEventListener('change', (e) => {
        const newTheme = e.matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        themeToggle.innerHTML = newTheme === 'dark' ?
            '<i class="fas fa-sun"></i>' :
            '<i class="fas fa-moon"></i>';
    });
};

const setupCertPopup = () => {
    const certCount = document.querySelector('.cert-count');
    const certPopup = document.getElementById('cert-popup');
    const imagePopup = document.getElementById('cert-image-popup');
    const closePopup = document.querySelector('.close-popup');
    const closeImagePopup = document.querySelector('.close-image-popup');
    const certItems = document.querySelectorAll('.cert-item');
    const certImage = document.getElementById('cert-image');

    // Open certification list popup
    certCount.addEventListener('click', () => {
        certPopup.classList.add('active');
    });

    // Close certification list popup
    closePopup.addEventListener('click', () => {
        certPopup.classList.remove('active');
    });

    // Close image popup
    closeImagePopup.addEventListener('click', () => {
        imagePopup.classList.remove('active');
    });

    // Handle clicking outside popups to close them
    window.addEventListener('click', (e) => {
        if (e.target === certPopup) {
            certPopup.classList.remove('active');
        }
        if (e.target === imagePopup) {
            imagePopup.classList.remove('active');
        }
    });

    // Handle certificate item clicks
    certItems.forEach(item => {
        item.addEventListener('click', () => {
            const imageUrl = item.dataset.image;
            certImage.src = imageUrl;
            certPopup.classList.remove('active');
            imagePopup.classList.add('active');
        });
    });
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);