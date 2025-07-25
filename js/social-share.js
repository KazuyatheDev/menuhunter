// Social Share functionality for Menu App
const SocialShare = {
    downloadImage() {
        const menuBoard = document.getElementById('menuBoard');
        const controls = document.querySelector('.controls');
        const body = document.body;
        
        // Hide controls and force desktop layout temporarily
        controls.style.display = 'none';
        body.classList.add('force-desktop-layout');
        
        // Wait a moment for layout to update
        setTimeout(() => {
            html2canvas(menuBoard, {
                backgroundColor: '#ffffff',
                scale: 2,
                useCORS: true,
                allowTaint: false,
                foreignObjectRendering: false,
                logging: false,
                width: 900, // Fixed desktop width
                height: menuBoard.scrollHeight
            }).then(canvas => {
                // Restore mobile layout and show controls
                body.classList.remove('force-desktop-layout');
                controls.style.display = 'block';
                
                // Create download link
                const link = document.createElement('a');
                link.download = `menu-${new Date().toISOString().split('T')[0]}.png`;
                link.href = canvas.toDataURL();
                link.click();
            }).catch(error => {
                // Restore mobile layout and show controls on error
                body.classList.remove('force-desktop-layout');
                controls.style.display = 'block';
                console.error('Error generating image:', error);
                alert('Error generating image. Please try again.');
            });
        }, 100); // Small delay to ensure layout change is applied
    },

    shareToSocial() {
        const menuBoard = document.getElementById('menuBoard');
        const controls = document.querySelector('.controls');
        const body = document.body;
        
        // Hide controls and force desktop layout temporarily
        controls.style.display = 'none';
        body.classList.add('force-desktop-layout');
        
        // Wait a moment for layout to update
        setTimeout(() => {
            html2canvas(menuBoard, {
                backgroundColor: '#ffffff',
                scale: 2,
                useCORS: true,
                allowTaint: false,
                foreignObjectRendering: false,
                logging: false,
                width: 900, // Fixed desktop width
                height: menuBoard.scrollHeight
            }).then(canvas => {
                // Restore mobile layout and show controls
                body.classList.remove('force-desktop-layout');
                controls.style.display = 'block';
                
                canvas.toBlob(blob => {
                    if (navigator.share && navigator.canShare && navigator.canShare({ files: [new File([blob], 'menu.png', { type: 'image/png' })] })) {
                        const file = new File([blob], 'menu.png', { type: 'image/png' });
                        navigator.share({
                            title: 'Daily Menu',
                            text: 'Check out our delicious menu for today!',
                            files: [file]
                        });
                    } else {
                        // Fallback: copy image to clipboard or show instructions
                        const item = new ClipboardItem({ 'image/png': blob });
                        navigator.clipboard.write([item]).then(() => {
                            alert('Menu image copied to clipboard! You can now paste it on Facebook, Instagram, or other social media.');
                        }).catch(() => {
                            alert('To share on social media:\n1. Right-click and save the menu\n2. Upload the saved image to Facebook/Instagram\n3. Add your caption and post!');
                        });
                    }
                }, 'image/png');
            }).catch(error => {
                // Restore mobile layout and show controls on error
                body.classList.remove('force-desktop-layout');
                controls.style.display = 'block';
                console.error('Error generating image for sharing:', error);
                alert('Error preparing image for sharing. Please try again.');
            });
        }, 100); // Small delay to ensure layout change is applied
    }
};