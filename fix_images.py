import re
import os

os.chdir(r'c:\Users\91956\Desktop\Aswin\Aaara decors.worktrees\copilot-worktree-2026-05-19T07-02-29')

files = ['stage.css', 'out.css', 'hall.css', 'church.css']

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace the old deck-card img block with new one  
    old_pattern = r'\.deck-card img \{[^}]*?min-width: 0;[^}]*?min-height: 0;[^}]*?object-fit: cover;[^}]*?object-position: center;[^}]*?display: block;[^}]*?filter: brightness\(0\.4\) grayscale\(0\.3\);[^}]*?transition: filter 0\.6s ease, transform 0\.6s ease;[^}]*?\}'
    
    new_content = '''.deck-card img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
        display: block;
        filter: brightness(0.4) grayscale(0.3);
        transition: filter 0.6s ease, transform 0.6s ease;
        position: absolute;
        top: 0;
        left: 0;
    }'''
    
    content = re.sub(old_pattern, new_content, content, flags=re.DOTALL)
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f'Updated {file}')

print('All CSS files updated successfully!')
