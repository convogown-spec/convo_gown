const fs = require('fs');
const path = require('path');

function generateGalleryRegistry() {
  const galleryDir = path.resolve(__dirname, '../public/assets/gallery');
  const categories = ['Our Assets', 'Happy Customers'];
  const items = [];

  for (const category of categories) {
    const categoryDir = path.join(galleryDir, category);
    if (!fs.existsSync(categoryDir)) {
      console.warn(`Directory not found: ${categoryDir}`);
      continue;
    }

    const files = fs.readdirSync(categoryDir);
    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      if (['.png', '.jpg', '.jpeg', '.webp', '.svg'].includes(ext)) {
        // Form a user-friendly title from the filename
        const title = path.basename(file, ext)
          .replace(/[_-]/g, ' ')
          .replace(/\b\w/g, (char) => char.toUpperCase());

        items.push({
          title,
          category,
          image: `/assets/gallery/${category}/${file}`,
        });
      }
    }
  }

  // Create src/data directory if it doesn't exist
  const dataDir = path.resolve(__dirname, '../src/data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const outputPath = path.join(dataDir, 'gallery-images.json');
  fs.writeFileSync(outputPath, JSON.stringify(items, null, 2), 'utf-8');
  console.log(`Successfully generated gallery registry at ${outputPath} with ${items.length} items.`);
}

generateGalleryRegistry();
