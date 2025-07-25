const Editor = {
    init() {
        this.createMenuEditor();
        this.setupLogoUpload();
        this.setupKeyboardShortcuts();
    },

    createMenuEditor() {
        const ulamEditor = document.getElementById('ulamEditor');
        const sidesEditor = document.getElementById('sidesEditor');
        
        ulamEditor.innerHTML = '';
        sidesEditor.innerHTML = '';

        MenuManager.menuData.ulam.forEach((item, index) => {
            ulamEditor.appendChild(this.createItemEditor('ulam', index, item));
        });

        MenuManager.menuData.sides.forEach((item, index) => {
            sidesEditor.appendChild(this.createItemEditor('sides', index, item));
        });
    },

    createItemEditor(section, index, item) {
        const div = document.createElement('div');
        div.className = 'item-editor';
        div.innerHTML = `
            <input type="text" placeholder="Item name" value="${item.name}" 
                   onchange="Editor.updateItemData('${section}', ${index}, 'name', this.value)"
                   oninput="Editor.updateItemData('${section}', ${index}, 'name', this.value)">
            <input type="text" placeholder="Description" value="${item.description}" 
                   onchange="Editor.updateItemData('${section}', ${index}, 'description', this.value)"
                   oninput="Editor.updateItemData('${section}', ${index}, 'description', this.value)">
            <input type="text" placeholder="Price (₱00)" value="${item.price}" 
                   onchange="Editor.updateItemData('${section}', ${index}, 'price', this.value)"
                   oninput="Editor.formatPrice(this, '${section}', ${index})">
            <button class="remove-btn" onclick="Editor.removeMenuItem('${section}', ${index})" title="Remove item">
                🗑️ REMOVE
            </button>
        `;
        return div;
    },

    updateItemData(section, index, field, value) {
        if (MenuManager.menuData[section] && MenuManager.menuData[section][index]) {
            MenuManager.menuData[section][index][field] = value;
            MenuManager.saveData();
        }
    },

    formatPrice(input, section, index) {
        let value = input.value.replace(/[^\d]/g, ''); // Remove non-digits
        if (value) {
            value = '₱' + value;
        }
        input.value = value;
        this.updateItemData(section, index, 'price', value);
    },

    removeMenuItem(section, index) {
        if (confirm('Are you sure you want to remove this item?')) {
            MenuManager.menuData[section].splice(index, 1);
            this.createMenuEditor();
            MenuManager.saveData();
            MenuManager.showMessage('Item removed successfully!', 'success');
        }
    },

    setupLogoUpload() {
        const logoUpload = document.getElementById('logoUpload');
        
        logoUpload.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                // Validate file size (max 5MB)
                if (file.size > 5 * 1024 * 1024) {
                    alert('File size too large. Please choose an image under 5MB.');
                    return;
                }

                // Validate file type
                if (!file.type.startsWith('image/')) {
                    alert('Please select a valid image file.');
                    return;
                }

                const reader = new FileReader();
                reader.onload = function(e) {
                    Editor.updateLogo(e.target.result);
                    MenuManager.showMessage('Logo updated successfully!', 'success');
                };
                reader.readAsDataURL(file);
            }
        });

        // Add drag and drop functionality
        const logoContainer = document.getElementById('logoContainer');
        
        logoContainer.addEventListener('dragover', function(e) {
            e.preventDefault();
            logoContainer.style.backgroundColor = '#f0f0f0';
        });

        logoContainer.addEventListener('dragleave', function(e) {
            logoContainer.style.backgroundColor = '';
        });

        logoContainer.addEventListener('drop', function(e) {
            e.preventDefault();
            logoContainer.style.backgroundColor = '';
            
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                logoUpload.files = files;
                logoUpload.dispatchEvent(new Event('change'));
            }
        });
    },

    updateLogo(imageSrc) {
        const logoContainer = document.getElementById('logoContainer');
        const logoPlaceholder = document.getElementById('logoPlaceholder');
        
        logoPlaceholder.style.display = 'none';
        
        let logoImg = document.getElementById('logoImg');
        if (!logoImg) {
            logoImg = document.createElement('img');
            logoImg.id = 'logoImg';
            logoImg.className = 'logo-img';
            logoContainer.appendChild(logoImg);
        }
        
        logoImg.src = imageSrc;
        
        // Save logo to localStorage
        localStorage.setItem('carenderiaLogo', imageSrc);
    },

    loadSavedLogo() {
        const savedLogo = localStorage.getItem('carenderiaLogo');
        if (savedLogo) {
            this.updateLogo(savedLogo);
        }
    },

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', function(e) {
            // Ctrl+S to update menu
            if (e.ctrlKey && e.key === 's') {
                e.preventDefault();
                MenuManager.updateMenu();
            }
            
            // Ctrl+D to download
            if (e.ctrlKey && e.key === 'd') {
                e.preventDefault();
                SocialShare.downloadImage();
            }
        });
    },

    clearAllData() {
        if (confirm('Are you sure you want to clear all menu data? This cannot be undone.')) {
            localStorage.removeItem('carenderiaMenuData');
            localStorage.removeItem('carenderiaRestaurantInfo');
            localStorage.removeItem('carenderiaLogo');
            location.reload();
        }
    },

    duplicateItem(section, index) {
        const item = MenuManager.menuData[section][index];
        const duplicatedItem = {
            name: item.name + ' (Copy)',
            description: item.description,
            price: item.price
        };
        MenuManager.menuData[section].splice(index + 1, 0, duplicatedItem);
        this.createMenuEditor();
        MenuManager.saveData();
    }
};