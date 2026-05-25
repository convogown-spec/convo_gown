import os
import re

def optimize_svg(filepath):
    if not os.path.exists(filepath):
        print(f"Error: {filepath} does not exist.")
        return
        
    original_size = os.path.getsize(filepath)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Simple regex-based SVG optimization:
    # 1. Remove comments
    content = re.sub(r'<!--.*?-->', '', content, flags=re.DOTALL)
    # 2. Remove extra whitespace/newlines between tags
    content = re.sub(r'>\s+<', '><', content)
    # 3. Collapse multiple spaces inside tags
    content = re.sub(r'\s+', ' ', content)
    
    # Write back optimized SVG
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content.strip())
        
    optimized_size = os.path.getsize(filepath)
    saving = original_size - optimized_size
    percent = (saving / original_size) * 100 if original_size > 0 else 0
    print(f"Optimized {filepath}: {original_size}B -> {optimized_size}B (-{saving}B, {percent:.1f}% saved)")

def run_optimization():
    assets_dir = 'public/assets'
    if not os.path.exists(assets_dir):
        print(f"Error: {assets_dir} directory not found.")
        return
        
    svg_files = [f for f in os.listdir(assets_dir) if f.endswith('.svg')]
    print(f"Found {len(svg_files)} SVG assets to optimize in {assets_dir}...")
    for f in svg_files:
        optimize_svg(os.path.join(assets_dir, f))
    print("Optimization completed successfully!")

if __name__ == '__main__':
    run_optimization()
