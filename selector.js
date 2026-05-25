document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('seal-selector-form');
    const industrySelect = document.getElementById('industry');
    const pumpSelect = document.getElementById('pump');
    const resultsContainer = document.getElementById('results-container');
    const resultsGrid = document.getElementById('results-grid');
    const matchCount = document.getElementById('match-count');
    const noMatchesSpan = document.getElementById('no-matches');

    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const industry = industrySelect.value;
        const pump = pumpSelect.value;

        //reset the ui
        resultsGrid.innerHTML = '';
        resultsContainer.classList.remove('d-none');
        noMatchesSpan.classList.add('d-none');
        resultsGrid.classList.remove("d-none");

        //logic check: Validate availability of rule mapping
        if (typeof RECOMMENDATION_MAPPING === 'undefined' || typeof CATALOG_DATA === 'undefined') {
            console.console.error('Selector error: data files not loaded.');
            return;
        }
        const rules = RECOMMENDATION_MAPPING[industry]?.[pump];

        if (!rules) {
            matchCount.textContent = '0 matches';
            noMatchesSpan.classList.remove('d-none');
            resultsGrid.classList.add("d-none");
            return;
        }
        const { categories, keywords } = rules;
        const recommendedProducts = [];
        //loop through catalog categories specified in rules
        categories.forEach(catKey => {
            const categoryData = CATALOG_DATA[catKey];
            if (categoryData) {
                //find matching images within this category based on keywords
                const matchingImages = categoryData.images.filter(img =>
                    keywords.some(keyword => img.includes(keyword))
                );

                matchingImages.forEach(img => {
                    recommendedProducts.push({
                        categoryTitle: categoryData.title,
                        imagePath: `${categoryData.path}${img}`,
                        imageName: img
                    });

                });
            }
        });
        //update match count badge
        matchCount.textContent = `${recommendedProducts.length} match${recommendedProducts.length === 1 ? '' : 'es'}`;

        if (recommendedProducts.length === 0) {
            noMatchesSpan.classList.remove('d-none');
            resultsGrid.classList.add("d-none");
        } else {
            //Render result cards
            recommendedProducts.forEach((product, index) => {
                // Extract serial number if present (ends with -XXX.jpg)
                let nameWithoutExt = product.imageName.replace('.jpg', '');
                let serial = '';
                const parts = nameWithoutExt.split('-');
                const lastPart = parts[parts.length - 1];
                if (/^\d+$/.test(lastPart)) {
                    serial = `HS-${lastPart}`;
                    parts.pop(); // Remove serial from display name
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

                const col = document.createElement('div');
                col.className = 'col-lg-4 col-md-6 mb-4';

                col.innerHTML = `
                <div class="card h-100 border-0 product-card position-relative overflow-hidden" style="opacity: 0; transform: translateY(20px); transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.08}s;">
                        <!-- Serial Code Badge -->
                        <div class="product-badge position-absolute top-0 start-0 m-3 z-3">
                            <span class="badge rounded-pill">${serial}</span>
                        </div>
                        
                        <!-- Premium Image Container -->
                        <div class="gallery-img-wrapper position-relative overflow-hidden" style="aspect-ratio: 1/1;">
                            <img src="${product.imagePath}" alt="${displayName}" class="card-img-top img-fluid product-image">
                            
                            <!-- Frosted Blur Hover Overlay -->
                            <div class="gallery-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
                                <a href="${product.imagePath}" target="_blank" class="btn btn-primary rounded-pill px-4 py-2 shadow-sm d-flex align-items-center gap-2">
                                    <span>View Product</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11M13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0"/>
                                        <path d="M10.344 11.742c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1 6.5 6.5 0 0 1-1.398 1.4z"/>
                                        <path fill-rule="evenodd" d="M6.5 3a.5.5 0 0 1 .5.5V6h2.5a.5.5 0 0 1 0 1H7v2.5a.5.5 0 0 1-1 0V7H3.5a.5.5 0 0 1 0-1H6V3.5a.5.5 0 0 1 .5-.5"/>
                                    </svg>
                                </a>
                            </div>
                        </div>
                        
                        <!-- Card Body details -->
                        <div class="card-body p-3 d-flex flex-column justify-content-between text-center">
                            <div>
                                <span class="badge bg-primary bg-opacity-10 text-primary rounded-pill mb-2 px-3" style="font-size: 0.65rem;">
                                    ${product.categoryTitle}
                                </span>
                                <h5 class="h6 card-title mb-1 fw-bold text-dark text-truncate-2">${displayName}</h5>
                                <p class="small text-secondary mb-0">Match for ${industry} ${pump}</p>
                            </div>
                            <div class="mt-3 pt-2 border-top border-dark border-opacity-10 d-flex justify-content-between align-items-center">
                                <span class="small text-muted text-uppercase tracking-wider font-monospace" style="font-size: 0.6rem;">Hindustan Seal</span>
                                <span class="small text-success fw-bold d-flex align-items-center gap-1">
                                    <span class="d-inline-block rounded-circle bg-success" style="width: 6px; height: 6px;"></span>
                                    AI Recommendation
                                </span>
                            </div>
                        </div>
                    </div>
                `;
                resultsGrid.appendChild(col);
            });

            // Trigger animation in the next frame
            requestAnimationFrame(() => {
                const addedCards = resultsGrid.querySelectorAll('.product-card');
                addedCards.forEach(card => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                });
            });
        }

        resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });

    });
});