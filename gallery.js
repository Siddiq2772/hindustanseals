/**
 * Dynamic Gallery Loader
 * Uses Bootstrap grid and styles defined in style.css
 */
document.addEventListener('DOMContentLoaded', () => {
    const galleryContainer = document.getElementById('gallery-container');
    if (!galleryContainer) return;

    // Get category from data attribute (set in HTML)
    const categoryKey = galleryContainer.getAttribute('data-category');
    if (!categoryKey) {
        console.error('Gallery error: No data-category specified on #gallery-container');
        return;
    }

    // Use the globally available CATALOG_DATA from catalog_data.js
    if (typeof CATALOG_DATA === 'undefined') {
        console.error('Gallery error: catalog_data.js not loaded.');
        return;
    }
    
    const categoryData = CATALOG_DATA[categoryKey];
    if (!categoryData) {
        console.error(`Gallery error: Category "${categoryKey}" not found in CATALOG_DATA`);
        return;
    }

    const { path, images } = categoryData;
    
    // Clear container
    galleryContainer.innerHTML = '';

    images.forEach((fileName, index) => {
        // Formatted display name
        let displayName = fileName.replace('.jpg', '');
        const prefixes = ['single-spring-seal-', 'bellows-seal-', 'multi-spring-seal-', 'specialty-seal-'];
        prefixes.forEach(prefix => {
            if (displayName.startsWith(prefix)) {
                displayName = displayName.replace(prefix, '');
            }
        });

        displayName = displayName
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

        // Bootstrap column container
        const col = document.createElement('div');
        col.className = 'col-lg-3 col-md-4 col-6 mb-4';
        
        col.innerHTML = `
            <div class="card h-100 border-0" data-index="${index}">
                <div class="gallery-img-wrapper position-relative overflow-hidden" style="aspect-ratio: 1/1; background: #000;">
                    <img src="${path}${fileName}" alt="${displayName}" class="card-img-top img-fluid p-3" style="height: 100%; object-fit: contain; transition: transform 0.3s ease;">
                    <div class="gallery-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style="background: rgba(0,0,0,0.6); opacity: 0; transition: opacity 0.3s ease;">
                        <button class="btn btn-light btn-sm rounded-pill px-3" onclick="window.open('${path}${fileName}', '_blank')">
                            View Full Size
                        </button>
                    </div>
                </div>
                <div class="card-body p-3 text-center">
                    <h5 class="h6 card-title mb-0">${displayName}</h5>
                </div>
            </div>
        `;
        
        galleryContainer.appendChild(col);
    });

    // Handle intersection animations (if observer is available in main.js)
    if (typeof observer !== 'undefined') {
        const cards = galleryContainer.querySelectorAll('.gallery-card');
        cards.forEach(card => observer.observe(card));
    }
});
