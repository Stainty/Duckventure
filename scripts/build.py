import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))

JS_FILES = [
    'src/js/assets.js',
    'src/js/core/persistence.js',
    'src/js/core/state.js',
    'src/js/audio.js',
    'src/js/particles.js',
    'src/js/economy.js',
    'src/js/achievements.js',
    'src/js/upgrades.js',
    'src/js/eggs.js',
    'src/js/creatures.js',
    'src/js/businesses.js',
    'src/js/inventory.js',
    'src/js/ui.js',
    'src/js/dialogs.js',
    'src/js/core/timers.js',
    'src/js/main.js'
]

def build():
    print("Building Duckventure (Python build runner)...")

    # 1. Read index.html template
    index_path = os.path.join(ROOT_DIR, 'src', 'index.html')
    with open(index_path, 'r', encoding='utf-8') as f:
        html = f.read()

    # 2. Read CSS
    css_path = os.path.join(ROOT_DIR, 'src', 'css', 'main.css')
    with open(css_path, 'r', encoding='utf-8') as f:
        css = f.read()

    # 3. Read and bundle JS in dependency order
    js_parts = []
    for rel_path in JS_FILES:
        full_path = os.path.join(ROOT_DIR, rel_path.replace('/', os.sep))
        if not os.path.exists(full_path):
            raise FileNotFoundError(f"Missing source file: {rel_path}")
        with open(full_path, 'r', encoding='utf-8') as f:
            content = f.read()
        js_parts.append(f"\n  /* ===== Module: {rel_path} ===== */\n{content}")
    bundled_js = '\n'.join(js_parts)

    # 4. Inline CSS into <style>...</style>
    html = html.replace(
        '<link rel="stylesheet" href="css/main.css">',
        f"<style>\n{css}\n</style>"
    )

    # 5. Inline JS into <script>...</script>
    import re
    html = re.sub(r'<script\s+src="js/assets\.js"></script>\s*', '', html)
    html = html.replace(
        '<script src="js/main.js"></script>',
        f"<script>\n{bundled_js}\n</script>"
    )

    # 6. Ensure dist directory exists
    dist_dir = os.path.join(ROOT_DIR, 'dist')
    os.makedirs(dist_dir, exist_ok=True)

    # 7. Write output files
    dist_file = os.path.join(dist_dir, 'duckventure-alpha.html')
    with open(dist_file, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f"Saved build artifact to: {dist_file}")

    root_file = os.path.join(ROOT_DIR, 'duckventure-alpha.html')
    with open(root_file, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f"Synchronized root standalone file: {root_file}")

    print("Build complete! Self-contained HTML ready for offline execution.")

if __name__ == '__main__':
    build()
