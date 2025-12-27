#!/usr/bin/env node

/**
 * Image Optimization Script
 * This script helps optimize images for the React project
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ASSETS_DIR = path.join(__dirname, 'src', 'assets');
const SUPPORTED_FORMATS = ['.jpg', '.jpeg', '.png', '.gif'];

// Get all image files in assets directory
function getImageFiles() {
  if (!fs.existsSync(ASSETS_DIR)) {
    console.log('Assets directory not found:', ASSETS_DIR);
    return [];
  }

  const files = fs.readdirSync(ASSETS_DIR);
  return files.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return SUPPORTED_FORMATS.includes(ext);
  });
}

// Calculate file size in KB
function getFileSizeKB(filepath) {
  const stats = fs.statSync(filepath);
  return Math.round(stats.size / 1024);
}

// Analyze current images
function analyzeImages() {
  const images = getImageFiles();
  
  console.log('\n📊 IMAGE ANALYSIS REPORT');
  console.log('========================');
  console.log(`Total images found: ${images.length}`);
  
  let totalSize = 0;
  const imageData = [];

  images.forEach(filename => {
    const filepath = path.join(ASSETS_DIR, filename);
    const sizeKB = getFileSizeKB(filepath);
    totalSize += sizeKB;
    
    imageData.push({
      filename,
      size: sizeKB,
      needsOptimization: sizeKB > 500 // Flag large images
    });
  });

  // Sort by size (largest first)
  imageData.sort((a, b) => b.size - a.size);

  console.log(`Total size: ${Math.round(totalSize / 1024 * 100) / 100} MB\n`);

  console.log('📁 INDIVIDUAL FILES:');
  imageData.forEach(img => {
    const flag = img.needsOptimization ? '⚠️ ' : '✅ ';
    console.log(`${flag}${img.filename}: ${img.size} KB`);
  });

  // Recommendations
  console.log('\n💡 RECOMMENDATIONS:');
  const largeImages = imageData.filter(img => img.needsOptimization);
  
  if (largeImages.length > 0) {
    console.log(`${largeImages.length} images are larger than 500KB and should be optimized:`);
    largeImages.forEach(img => {
      console.log(`  - ${img.filename} (${img.size} KB)`);
    });
    
    console.log('\nSuggested actions:');
    console.log('1. Convert to WebP format (25-35% size reduction)');
    console.log('2. Resize to appropriate dimensions');
    console.log('3. Compress with 80-85% quality');
    console.log('4. Create responsive variants (400w, 800w, 1200w)');
  } else {
    console.log('✅ All images are reasonably sized!');
  }

  return imageData;
}

// Generate WebP conversion commands
function generateConversionCommands(imageData) {
  console.log('\n🔧 WEBP CONVERSION COMMANDS:');
  console.log('===========================');
  console.log('Install Sharp CLI: npm install -g sharp-cli\n');
  
  imageData.forEach(img => {
    const nameWithoutExt = path.parse(img.filename).name;
    const inputPath = `src/assets/${img.filename}`;
    const outputPath = `src/assets/${nameWithoutExt}.webp`;
    
    console.log(`sharp -i "${inputPath}" -o "${outputPath}" -f webp -q 80`);
  });

  console.log('\nOr convert all at once:');
  console.log('sharp -i "src/assets/*.{jpg,jpeg,png}" -o "src/assets/" -f webp -q 80');
}

// Generate responsive image variants commands
function generateResponsiveCommands(imageData) {
  console.log('\n📱 RESPONSIVE VARIANTS COMMANDS:');
  console.log('===============================');
  
  imageData.forEach(img => {
    const nameWithoutExt = path.parse(img.filename).name;
    const inputPath = `src/assets/${img.filename}`;
    
    // Generate different sizes
    const sizes = [400, 800, 1200];
    sizes.forEach(width => {
      const outputPath = `src/assets/${nameWithoutExt}-${width}w.webp`;
      console.log(`sharp -i "${inputPath}" -o "${outputPath}" -f webp -q 80 --width ${width}`);
    });
  });
}

// Main execution
function main() {
  console.log('🎨 NAVEENA BAKERY - IMAGE OPTIMIZATION TOOL');
  console.log('==========================================');
  
  const imageData = analyzeImages();
  
  if (imageData.length > 0) {
    generateConversionCommands(imageData);
    generateResponsiveCommands(imageData);
    
    console.log('\n📚 ADDITIONAL RESOURCES:');
    console.log('=======================');
    console.log('• Online converter: https://squoosh.app/');
    console.log('• Batch converter: https://convertio.co/');
    console.log('• Image optimization guide: ./IMAGE_OPTIMIZATION_GUIDE.md');
    console.log('• Performance testing: https://pagespeed.web.dev/');
  }
  
  console.log('\n✨ Optimization complete! Run this script again after converting images.');
}

// Run the script
main();

export {
  analyzeImages,
  getImageFiles,
  getFileSizeKB
};