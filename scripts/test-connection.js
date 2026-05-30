const fs = require('fs');
const path = require('path');

// Manual .env loader
const envPath = path.resolve(__dirname, '../.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const match = line.trim().match(/^([\w.\-]+)\s*=\s*(.*)?$/);
    if (match) {
      const key = match[1];
      let value = match[2] || '';
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.substring(1, value.length - 1);
      } else if (value.startsWith("'") && value.endsWith("'")) {
        value = value.substring(1, value.length - 1);
      }
      process.env[key] = value;
    }
  });
}

const { PrismaClient } = require('@prisma/client');

async function testConnection() {
  if (!process.env.DATABASE_URL) {
    console.error("\x1b[31m[CONFIG ERROR]\x1b[0m DATABASE_URL is not set in your .env file!");
    return;
  }

  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL
      }
    }
  });

  try {
    console.log("Connecting to your Neon PostgreSQL...");
    // Perform a basic read query
    const count = await prisma.galleryImage.count();
    console.log(`\x1b[32m[SUCCESS]\x1b[0m Successfully connected! Current record count in 'gallery_images': ${count}`);
  } catch (error) {
    console.error("\x1b[31m[CONNECTION ERROR]\x1b[0m Failed to connect to PostgreSQL database:");
    console.error(error.message || error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
