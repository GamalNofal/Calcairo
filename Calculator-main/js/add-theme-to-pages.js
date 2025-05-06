const fs = require('fs');
const path = require('path');

function addThemeToHtmlFiles(directory) {
    const files = fs.readdirSync(directory);
    
    files.forEach(file => {
        const fullPath = path.join(directory, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            // Recursively process subdirectories
            addThemeToHtmlFiles(fullPath);
        } else if (path.extname(file) === '.html') {
            // Process HTML files
            let content = fs.readFileSync(fullPath, 'utf8');
            
            if (!content.includes('theme.js')) {
                // Add theme.js before closing body tag if it's not already there
                const relativePath = path.relative(directory, 'js/theme.js')
                    .split(path.sep)
                    .join('/');
                
                content = content.replace(
                    '</body>',
                    `    <script src="${relativePath}"></script>\n</body>`
                );
                
                fs.writeFileSync(fullPath, content);
                console.log(`Added theme.js to ${file}`);
            }
        }
    });
}

// Start from the calculators directory
const calculatorsDir = path.join(__dirname, '..', 'calculators');
addThemeToHtmlFiles(calculatorsDir);
