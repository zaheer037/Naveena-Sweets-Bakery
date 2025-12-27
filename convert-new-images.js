#!/usr/bin/env node

import { execSync } from 'child_process';
import { readdir, stat, unlink } from 'fs/promises';
import { join, basename, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration
const ASSETS_DIR = join(__dirname, 'src', 'assets');
const SUPPORTED_FORMATS = ['.jpg', '.jpeg', '.png'];
const WEBP_QUALITY = 75;
const DESKTOP_WIDTH = 800;
const MOBILE_WIDTH = 400;

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  bold: '\x1b[1m'
};

// Utility functions
const log = (message, color = 'white') => {
  console.log(`${colors[color]}${message}${colors.reset}`);
};

const formatBytes = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const getFileSize = async (filePath) => {
  try {
    const stats = await stat(filePath);
    return stats.size;
  } catch (error) {
    return 0;
  }
};

const executeCommand = (command) => {
  try {
    execSync(command, { stdio: 'pipe' });
    return true;
  } catch (error) {
    log(`Error executing command: ${command}`, 'red');
    log(`Error details: ${error.message}`, 'red');
    return false;
  }
};

// Main conversion functions
const convertToWebP = async (inputFile, outputFile, quality = WEBP_QUALITY, width = null) => {
  const inputPath = join(ASSETS_DIR, inputFile);
  const outputPath = join(ASSETS_DIR, outputFile);
  
  let command = `sharp -i "${inputPath}" -o "${outputPath}" -f webp -q ${quality}`;
  if (width) {
    command += ` resize ${width}`;
  }
  
  log(`Converting: ${inputFile} → ${outputFile}${width ? ` (${width}px wide)` : ''}`, 'cyan');
  
  const success = executeCommand(command);
  if (success) {
    const originalSize = await getFileSize(inputPath);
    const newSize = await getFileSize(outputPath);
    const savings = originalSize > 0 ? ((originalSize - newSize) / originalSize * 100).toFixed(1) : 0;
    
    log(`✅ Success! ${formatBytes(originalSize)} → ${formatBytes(newSize)} (${savings}% reduction)`, 'green');
    return { success: true, originalSize, newSize, savings };
  }
  
  return { success: false };
};

const findNewImages = async () => {
  try {
    const files = await readdir(ASSETS_DIR);
    const imageFiles = files.filter(file => {
      const ext = extname(file).toLowerCase();
      return SUPPORTED_FORMATS.includes(ext);
    });
    
    // Filter out images that already have WebP variants
    const newImages = [];
    for (const file of imageFiles) {
      const baseName = basename(file, extname(file));
      const hasWebP = files.some(f => f === `${baseName}.webp` || f === `${baseName}-800w.webp`);
      
      if (!hasWebP) {
        newImages.push(file);
      }
    }
    
    return newImages;
  } catch (error) {
    log(`Error reading assets directory: ${error.message}`, 'red');
    return [];
  }
};

const processImage = async (imageFile, options = {}) => {
  const baseName = basename(imageFile, extname(imageFile));
  const { createMobile = false, createDesktop = true, removeOriginal = true } = options;
  
  log(`\n📸 Processing: ${imageFile}`, 'bold');
  
  const results = [];
  
  // Create desktop variant (800w)
  if (createDesktop) {
    const desktopResult = await convertToWebP(
      imageFile, 
      `${baseName}-800w.webp`, 
      WEBP_QUALITY, 
      DESKTOP_WIDTH
    );
    results.push({ type: 'desktop', ...desktopResult });
  }
  
  // Create mobile variant (400w)
  if (createMobile) {
    const mobileResult = await convertToWebP(
      imageFile, 
      `${baseName}-400w.webp`, 
      WEBP_QUALITY, 
      MOBILE_WIDTH
    );
    results.push({ type: 'mobile', ...mobileResult });
  }
  
  // Remove original file if all conversions successful
  if (removeOriginal && results.every(r => r.success)) {
    try {
      await unlink(join(ASSETS_DIR, imageFile));
      log(`🗑️  Removed original: ${imageFile}`, 'yellow');
    } catch (error) {
      log(`Warning: Could not remove original file: ${error.message}`, 'yellow');
    }
  }
  
  return results;
};

const generateUsageCode = (imageName) => {
  const baseName = basename(imageName, extname(imageName));
  
  return `
// Import the optimized image:
import ${baseName} from '../assets/${baseName}-800w.webp';

// Use in your component:
<img src={${baseName}} alt="${baseName}" loading="lazy" />

// Or with our OptimizedImage component:
<ProductImage src={${baseName}} alt="${baseName}" className="your-class" />
`;
};

// Main execution
const main = async () => {
  log('\n🎨 NAVEENA BAKERY - AUTOMATED IMAGE CONVERTER', 'bold');
  log('=' .repeat(50), 'blue');
  
  // Check if Sharp CLI is available
  try {
    execSync('sharp --version', { stdio: 'pipe' });
  } catch (error) {
    log('❌ Sharp CLI not found! Installing...', 'red');
    log('Please run: npm install -g sharp-cli', 'yellow');
    process.exit(1);
  }
  
  // Find new images to convert
  log('\n🔍 Scanning for new images...', 'cyan');
  const newImages = await findNewImages();
  
  if (newImages.length === 0) {
    log('✅ No new images found! All images are already optimized.', 'green');
    log('\n💡 To add new images:', 'blue');
    log('1. Copy your JPG/PNG files to src/assets/', 'white');
    log('2. Run this script again: npm run convert-images', 'white');
    return;
  }
  
  log(`📋 Found ${newImages.length} new image(s) to convert:`, 'yellow');
  newImages.forEach(img => log(`   • ${img}`, 'white'));
  
  // Process each image
  let totalOriginalSize = 0;
  let totalNewSize = 0;
  const processedImages = [];
  
  for (const imageFile of newImages) {
    const results = await processImage(imageFile);
    
    // Calculate totals
    results.forEach(result => {
      if (result.success) {
        totalOriginalSize += result.originalSize || 0;
        totalNewSize += result.newSize || 0;
      }
    });
    
    processedImages.push({
      name: imageFile,
      baseName: basename(imageFile, extname(imageFile)),
      results
    });
  }
  
  // Summary
  log('\n📊 CONVERSION SUMMARY', 'bold');
  log('=' .repeat(30), 'blue');
  
  processedImages.forEach(({ name, baseName, results }) => {
    log(`\n${name}:`, 'yellow');
    results.forEach(result => {
      if (result.success) {
        log(`  ✅ ${result.type}: ${result.savings}% reduction`, 'green');
      } else {
        log(`  ❌ ${result.type}: conversion failed`, 'red');
      }
    });
  });
  
  if (totalOriginalSize > 0) {
    const totalSavings = ((totalOriginalSize - totalNewSize) / totalOriginalSize * 100).toFixed(1);
    log(`\n🎯 TOTAL SAVINGS: ${formatBytes(totalOriginalSize)} → ${formatBytes(totalNewSize)}`, 'green');
    log(`📈 Overall reduction: ${totalSavings}%`, 'green');
  }
  
  // Generate usage examples
  log('\n💻 USAGE EXAMPLES:', 'bold');
  log('=' .repeat(20), 'blue');
  
  processedImages.forEach(({ baseName }) => {
    log(generateUsageCode(baseName), 'cyan');
  });
  
  log('\n🚀 Next steps:', 'yellow');
  log('1. Import the optimized images in your components', 'white');
  log('2. Replace old imports with new WebP versions', 'white');
  log('3. Test your application: npm run build', 'white');
  log('4. Deploy to Azure for lightning-fast loading! ⚡', 'white');
  
  log('\n✨ Image optimization complete!', 'green');
};

// Handle command line arguments
const args = process.argv.slice(2);
if (args.includes('--help') || args.includes('-h')) {
  log('\n🎨 NAVEENA BAKERY - AUTOMATED IMAGE CONVERTER', 'bold');
  log('\nUsage: node convert-new-images.js [options]', 'white');
  log('\nOptions:', 'yellow');
  log('  --help, -h     Show this help message', 'white');
  log('  --no-mobile    Skip creating 400w mobile variants', 'white');
  log('  --no-desktop   Skip creating 800w desktop variants', 'white');
  log('  --keep-original Keep original files after conversion', 'white');
  log('\nExamples:', 'yellow');
  log('  node convert-new-images.js                 # Convert all new images', 'white');
  log('  npm run convert-images                     # Using npm script', 'white');
  log('  node convert-new-images.js --no-mobile    # Only create desktop variants', 'white');
  process.exit(0);
}

// Run the main function
main().catch(error => {
  log(`\n❌ Unexpected error: ${error.message}`, 'red');
  process.exit(1);
});