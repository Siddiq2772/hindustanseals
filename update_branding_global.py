import os
import re

# Brand Logo and Subtext
# Note: logo.svg is now transparent; we add background in HTML for the footer specifically
NEW_LOGO = '<a class="navbar-brand" href="index.html" style="padding:0; border:none; background:none;"><img src="logo.svg" alt="Hindustan Seal" style="height: 60px;"></a>'
NEW_FOOTER_BRAND = '<div class="mb-4 d-inline-block bg-white rounded-3 p-2" style="border:none;"><img src="logo.svg" alt="Hindustan Seal" style="height: 50px;"></div>'

for file in os.listdir('.'):
    if file.endswith('.html'):
        with open(file, 'r') as f:
            content = f.read()
        
        # Replace navbar-brand
        # Regex to find <a ... class="navbar-brand ..." ...> ... </a>
        content = re.sub(r'<a[^>]*class="[^"]*navbar-brand[^"]*"[^>]*>.*?</a>', NEW_LOGO, content, flags=re.DOTALL)
        
        # Unify body bg/nav colors if they are old style
        content = content.replace('navbar-light bg-light', 'navbar-dark fixed-top')
        content = content.replace('bg-light py-5 mt-5 border-top', 'bg-dark text-secondary py-5 mt-5 border-top border-secondary border-opacity-10')
        
        # Replace brand references in h1/h4
        content = re.sub(r'<h4[^>]*>Hindustan Seal</h4>', NEW_FOOTER_BRAND, content, flags=re.IGNORECASE)
        content = re.sub(r'<div[^>]*><img src="logo.png"[^>]*></div>', NEW_FOOTER_BRAND, content, flags=re.IGNORECASE)
        
        # Fix brand colors classes if they exist
        content = content.replace('text-brand-blue', 'text-primary')
        content = content.replace('text-brand-green', 'text-primary')
        content = content.replace('btn-outline-brand', 'btn-outline-primary')
        
        with open(file, 'w') as f:
            f.write(content)
        print(f"Updated {file}")
