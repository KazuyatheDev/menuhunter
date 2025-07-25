const MenuManager = {
    menuData: {
        ulam: [
            {name: "Adobong Manok", description: "Classic chicken adobo with soy sauce and vinegar", price: "₱85"},
            {name: "Sinigang na Baboy", description: "Pork sinigang with fresh vegetables and tamarind broth", price: "₱95"},
            {name: "Ginisang Monggo", description: "Sautéed mung beans with pork and vegetables", price: "₱65"},
            {name: "Fried Chicken", description: "Crispy golden fried chicken", price: "₱75"},
            {name: "Sweet and Sour Fish", description: "Fresh fish fillet in sweet and sour sauce", price: "₱90"},
            {name: "Beef Caldereta", description: "Tender beef stew with vegetables", price: "₱110"},
            {name: "Pork Menudo", description: "Pork menudo with liver and vegetables", price: "₱80"},
            {name: "Chicken Curry", description: "Spicy chicken curry with coconut milk", price: "₱88"},
            {name: "Fish Sinigang", description: "Fish sinigang with okra and kangkong", price: "₱85"},
            {name: "Pork Sisig", description: "Sizzling pork sisig with onions", price: "₱95"}
        ],
        sides: [
            {name: "Kanin", description: "Freshly steamed white rice", price: "₱15"},
            {name: "Iced Tea", description: "Refreshing homemade iced tea", price: "₱25"},
            {name: "Softdrinks", description: "Assorted cold beverages", price: "₱30"},
            {name: "Hot Soup", description: "Hot soup of the day", price: "₱20"},
            {name: "Garlic Rice", description: "Fragrant garlic fried rice", price: "₱25"},
            {name: "Fresh Juice", description: "Freshly squeezed fruit juice", price: "₱35"},
            {name: "Coffee", description: "Hot brewed coffee", price: "₱20"},
            {name: "Pancit", description: "Stir-fried noodles with vegetables", price: "₱45"},
            {name: "Lumpia", description: "Fresh spring rolls (2 pieces)", price: "₱35"},
            {name: "Banana Turon", description: "Fried banana rolls with sugar", price: "₱25"}
        ]
    },

    restaurantInfo: {
        name: "HUNTER MENU",
        subtitle: "CARENDERIA MENU",
        phone: "+63 915 686 7134",
        location: "Arezzo Place Condominium Pasig, Philippines"
    },

    sectionTitles: {
        ulam: "ULAM NG ARAW",
        sides: "KANIN AT INUMIN"
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
        document.getElementById('sidesTitleInput').value = this.sectionTitles.sides;
        document.getElementById('ulamTitle').value = this.sectionTitles.ulam;
        document.getElementById('sidesTitle').value = this.sectionTitles.sides;
        
        // Update editor titles
        document.getElementById('ulamEditorTitle').textContent = this.sectionTitles.ulam;
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
        this.sectionTitles.sides = document.getElementById('sidesTitleInput').value.toUpperCase();
        
        // Update display titles
        document.getElementById('ulamTitle').value = this.sectionTitles.ulam;
        document.getElementById('sidesTitle').value = this.sectionTitles.sides;
        
        // Update editor titles
        document.getElementById('ulamEditorTitle').textContent = this.sectionTitles.ulam;
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
        this.updateMenuSection('sidesSection', this.menuData.sides);
    },

    updateMenuSection(sectionId, items) {
        const section = document.getElementById(sectionId);
        section.innerHTML = '';

        items.forEach(item => {
            if (item.name.trim() !== '') {
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
    },

    addMenuItem(section) {
        this.menuData[section].push({name: "", description: "", price: ""});
        Editor.createMenuEditor();
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