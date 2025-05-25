const fs = require('fs');
const path = require('path');

function removeTimeDisplay(directory) {
    const files = fs.readdirSync(directory);
    
    files.forEach(file => {
        const fullPath = path.join(directory, file);
        const stats = fs.statSync(fullPath);
        
        if (stats.isDirectory()) {
            removeTimeDisplay(fullPath);
        } else if (file.endsWith('.html')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            
            // Remove time display script tag
            content = content.replace(/<script src="[.\/]*js\/time-display\.js"><\/script>\n?/g, '');
            
            // Remove time display element if it exists
            content = content.replace(/<div[^>]*id="currentTime"[^>]*>.*?<\/div>\n?/g, '');
            
            fs.writeFileSync(fullPath, content);
        }
    });
}

// Start from the root directory
const rootDir = process.cwd();
removeTimeDisplay(rootDir);
