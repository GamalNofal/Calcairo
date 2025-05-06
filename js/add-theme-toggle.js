const fs = require('fs');
const path = require('path');

function addThemeToggleToFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if theme toggle already exists
    if (content.includes('id="theme-toggle"')) {
        console.log(`Theme toggle already exists in ${filePath}`);
        return;
    }
    
    // Add theme toggle button to navbar
    content = content.replace(
        /<\/ul>\s*<\/div>\s*<\/div>\s*<\/nav>/,
        `</ul>
                    <div class="d-flex">
                        <button id="theme-toggle" class="btn btn-link">
                            <i class="bi bi-moon-fill theme-icon-dark fs-5"></i>
                            <i class="bi bi-sun-fill theme-icon-light fs-5" style="display: none;"></i>
                        </button>
                    </div>
                </div>
            </div>
        </nav>`
    );
    
    fs.writeFileSync(filePath, content);
    console.log(`Added theme toggle to ${filePath}`);
}

function processDirectory(directory) {
    const files = fs.readdirSync(directory);
    
    files.forEach(file => {
        const fullPath = path.join(directory, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            processDirectory(fullPath);
        } else if (file.endsWith('.html')) {
            addThemeToggleToFile(fullPath);
        }
    });
}

// Start from the calculators directory
const calculatorsDir = path.join(__dirname, '..', 'calculators');
processDirectory(calculatorsDir);
