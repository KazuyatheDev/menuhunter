const MenuManager = {
    menuData: {
        ulam: [
            {name: "Adobong Manok", description: "Classic chicken adobo with soy sauce and vinegar", price: "₱85"},
            {name: "Sinigang na Baboy", description: "Pork sinigang with fresh vegetables and tamarind broth", price: "₱95"},
            {name: "Ginisang Monggo", description: "Sautéed mung beans with pork and vegetables", price: "₱65"},
            {name: "Fried Chicken", description: "Crispy golden fried chicken", price: "₱75"}
        ],
        silog: [
            {name: "Tapsilog", description: "Beef tapa with garlic rice and fried egg", price: "₱75"},
            {name: "Longsilog", description: "Longganisa with garlic rice and fried egg", price: "₱65"},
            {name: "Tocilog", description: "Sweet pork tocino with garlic rice and fried egg", price: "₱70"},
            {name: "Bangsilog", description: "Bangus with garlic rice and fried egg", price: "₱80"}
        ],
        sides: [
            {name: "Kanin", description: "Freshly steamed white rice", price: "₱15"},
            {name: "Iced Tea", description: "Refreshing homemade iced tea", price: "₱25"},
            {name: "Softdrinks", description: "Assorted cold beverages", price: "₱30"},
            {name: "Coffee", description: "Hot brewed coffee", price: "₱20"}
        ]
    },

    restaurantInfo: {
        name: "HUNTER'S FOODHOUSE",
        subtitle: "DINE IN. TAKEOUT. DELIVERY.",
        phone: "+63 915 686 7134",
        location: "Arezzo Place Condominium Pasig, Philippines"
    },

    sectionTitles: {
        ulam: "TODAY'S MENU",
        silog: "SILOG OF THE DAY",
        sides: "MERIENDA AND DRINKS"
    },

    init() {
        this.loadData();
        this.updateDate();
        this.updateMenuDisplay();
        this.populateInputs();
        
        // Auto-update date every minute
        setInterval(() => this.updateDate(), 60000);
    },

    loadData() {
        // Load from localStorage if available
        const savedMenu = localStorage.getItem('carenderiaMenuData');
        const savedInfo = localStorage.getItem('carenderiaRestaurantInfo');
        const savedTitles = localStorage.getItem('carenderiaSectionTitles');
        
        if (savedMenu) {
            this.menuData = JSON.parse(savedMenu);
        }
        
        if (savedInfo) {
            this.restaurantInfo = JSON.parse(savedInfo);
        }
        
        if (savedTitles) {
            this.sectionTitles = JSON.parse(savedTitles);
        }
    },

    saveData() {
        localStorage.setItem('carenderiaMenuData', JSON.stringify(this.menuData));
        localStorage.setItem('carenderiaRestaurantInfo', JSON.stringify(this.restaurantInfo));
        localStorage.setItem('carenderiaSectionTitles', JSON.stringify(this.sectionTitles));
    },

    populateInputs() {
        // Populate section title inputs
        document.getElementById('ulamTitleInput').value = this.sectionTitles.ulam;
        document.getElementById('silogTitleInput').value = this.sectionTitles.silog;
        document.getElementById('sidesTitleInput').value = this.sectionTitles.sides;
        document.getElementById('ulamTitle').value = this.sectionTitles.ulam;
        document.getElementById('silogTitle').value = this.sectionTitles.silog;
        document.getElementById('sidesTitle').value = this.sectionTitles.sides;
        
        // Update editor titles
        document.getElementById('ulamEditorTitle').textContent = this.sectionTitles.ulam;
        document.getElementById('silogEditorTitle').textContent = this.sectionTitles.silog;
        document.getElementById('sidesEditorTitle').textContent = this.sectionTitles.sides;
    },

    updateDate() {
        const today = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        const dateStr = today.toLocaleDateString('en-US', options).toUpperCase();
        document.getElementById('dateDisplay').textContent = dateStr;
    },

    updateMenu() {
        // Update section titles
        this.sectionTitles.ulam = document.getElementById('ulamTitleInput').value.toUpperCase();
        this.sectionTitles.silog = document.getElementById('silogTitleInput').value.toUpperCase();
        this.sectionTitles.sides = document.getElementById('sidesTitleInput').value.toUpperCase();
        
        // Update display titles
        document.getElementById('ulamTitle').value = this.sectionTitles.ulam;
        document.getElementById('silogTitle').value = this.sectionTitles.silog;
        document.getElementById('sidesTitle').value = this.sectionTitles.sides;
        
        // Update editor titles
        document.getElementById('ulamEditorTitle').textContent = this.sectionTitles.ulam;
        document.getElementById('silogEditorTitle').textContent = this.sectionTitles.silog;
        document.getElementById('sidesEditorTitle').textContent = this.sectionTitles.sides;
        
        // Update menu items display
        this.updateMenuDisplay();
        this.updateDate();
        this.saveData();
        
        // Show success message
        this.showMessage('Menu updated successfully!', 'success');
    },

    updateMenuDisplay() {
        this.updateMenuSection('ulamSection', this.menuData.ulam);
        this.updateMenuSection('silogSection', this.menuData.silog);
        this.updateMenuSection('sidesSection', this.menuData.sides);
    },

    updateMenuSection(sectionId, items) {
        const section = document.getElementById(sectionId);
        const menuSection = section.closest('.menu-section');
        section.innerHTML = '';

        let hasItems = false;
        items.forEach(item => {
            if (item.name.trim() !== '') {
                hasItems = true;
                const menuItem = document.createElement('div');
                menuItem.className = 'menu-item';
                menuItem.innerHTML = `
                    <div class="item-header">
                        <div class="item-name">${item.name}</div>
                        <div class="item-price">${item.price}</div>
                    </div>
                    <div class="item-description">${item.description}</div>
                `;
                section.appendChild(menuItem);
            }
        });

        // Hide section if no items
        if (menuSection) {
            if (hasItems) {
                menuSection.classList.remove('empty-section');
            } else {
                menuSection.classList.add('empty-section');
            }
        }
    },

    addMenuItem(section) {
        this.menuData[section].push({name: "", description: "", price: ""});
        Editor.createMenuEditor();
        this.updateMenuDisplay();
        this.saveData();
    },

    showMessage(message, type = 'info') {
        // Create and show a temporary message
        const messageDiv = document.createElement('div');
        messageDiv.textContent = message;
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#27ae60' : '#3498db'};
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            z-index: 1000;
            font-size: 14px;
        `;
        
        document.body.appendChild(messageDiv);
        
        setTimeout(() => {
            document.body.removeChild(messageDiv);
        }, 3000);
    },

    exportData() {
        const data = {
            restaurantInfo: this.restaurantInfo,
            menuData: this.menuData,
            exportDate: new Date().toISOString()
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `carenderia-backup-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }
};