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
        // Extract serial number if present (ends with -XXX.jpg)
        let nameWithoutExt = fileName.replace('.jpg', '');
        let serial = '';
        const parts = nameWithoutExt.split('-');
        const lastPart = parts[parts.length - 1];
        if (/^\d+$/.test(lastPart)) {
            serial = `HS-${lastPart}`;
            parts.pop(); // Remove the serial number from display name
        } else {
            serial = 'HS-SPEC';
        }

        let displayName = parts.join('-');
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
        col.className = 'col-lg-3 col-md-4 col-sm-6 col-12 mb-4';
        
        col.innerHTML = `
            <div class="card h-100 border-0 product-card" data-index="${index}">
                <!-- Serial Code Badge -->
                <div class="product-badge position-absolute top-0 start-0 m-3 z-3">
                    <span class="badge rounded-pill">${serial}</span>
                </div>
                
                <!-- Premium Image Container -->
                <div class="gallery-img-wrapper position-relative overflow-hidden" style="aspect-ratio: 1/1;">
                    <img src="${path}${fileName}" alt="${displayName}" class="card-img-top img-fluid product-image">
                    
                    <!-- Frosted Blur Hover Overlay -->
                    <div class="gallery-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
                        <button class="btn btn-primary rounded-pill px-4 py-2 shadow-sm d-flex align-items-center gap-2" onclick="window.open('${path}${fileName}', '_blank')">
                            <span>View Full Size</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11M13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0"/>
                                <path d="M10.344 11.742c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1 6.5 6.5 0 0 1-1.398 1.4z"/>
                                <path fill-rule="evenodd" d="M6.5 3a.5.5 0 0 1 .5.5V6h2.5a.5.5 0 0 1 0 1H7v2.5a.5.5 0 0 1-1 0V7H3.5a.5.5 0 0 1 0-1H6V3.5a.5.5 0 0 1 .5-.5"/>
                            </svg>
                        </button>
                    </div>
                </div>
                
                <!-- Product Card Body -->
                <div class="card-body p-3 d-flex flex-column justify-content-between text-center">
                    <div>
                        <h5 class="h6 card-title mb-1 fw-bold text-dark text-truncate-2">${displayName}</h5>
                        <p class="small text-secondary mb-0">High-Precision Seal</p>
                    </div>
                    <div class="mt-3 pt-2 border-top border-dark border-opacity-10 d-flex justify-content-between align-items-center">
                        <span class="small text-muted text-uppercase tracking-wider font-monospace" style="font-size: 0.6rem;">Hindustan Seal</span>
                        <span class="small text-success fw-bold d-flex align-items-center gap-1">
                            <span class="d-inline-block rounded-circle bg-success" style="width: 6px; height: 6px;"></span>
                            Active Catalog
                        </span>
                    </div>
                </div>
            </div>
        `;
        
        galleryContainer.appendChild(col);
    });

    // Premium Fade-in on Scroll Animation for Gallery Cards
    const cardObserverOptions = {
        threshold: 0.05,
        rootMargin: '0px 0px -40px 0px'
    };

    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                cardObserver.unobserve(entry.target);
            }
        });
    }, cardObserverOptions);

    const cards = galleryContainer.querySelectorAll('.product-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(25px)';
        card.style.transition = `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${(index % 4) * 0.08}s`;
        cardObserver.observe(card);
    });
});
