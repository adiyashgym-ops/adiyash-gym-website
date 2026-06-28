import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// === CONFIG ===
const INPUT_DIR = path.join(__dirname, '../raw-photos') // Drop raw photos here
const OUTPUT_DIR = path.join(__dirname, '../public')

// === MAP: filename pattern → destination ===
// Example: 'rehemat.jpg' → 'trainers/rehemat-khan.jpg'
const PHOTO_MAP = {
  // Trainers (format: 'name.jpg' → 'trainers/name.jpg')
  'rehemat.jpg': 'trainers/rehemat-khan.jpg',
  'sahil.jpg': 'trainers/sahil-shaikh.jpg',
  'aisha.jpg': 'trainers/aisha-khan.jpg',
  'vikram.jpg': 'trainers/vikram-singh.jpg',
  'neha.jpg': 'trainers/neha-sharma.jpg',
  'rahul.jpg': 'trainers/rahul-singh.jpg',
  'priya.jpg': 'trainers/priya-jain.jpg',
  'suresh.jpg': 'trainers/suresh-patil.jpg',
  'deepika.jpg': 'trainers/deepika-reddy.jpg',
  'shweta.jpg': 'trainers/shweta-nair.jpg',
  'kavita.jpg': 'trainers/kavita-sharma.jpg',
  'ajay.jpg': 'trainers/ajay-yadav.jpg',
  'mrunal.jpg': 'trainers/mrunal-desai.jpg',
  'rohan.jpg': 'trainers/rohan-patil.jpg',
  'sneha.jpg': 'trainers/sneha-menon.jpg',
  
  // Locations (format: 'kurla.jpg' → 'locations/kurla.jpg')
  'kurla.jpg': 'locations/kurla.jpg',
  'vikhroli.jpg': 'locations/vikhroli.jpg',
  'kandivali.jpg': 'locations/kandivali.jpg',
  'asalfa-unisex.jpg': 'locations/asalfa-unisex.jpg',
  'asalfa-ladies.jpg': 'locations/asalfa-ladies.jpg',
  'marol.jpg': 'locations/marol.jpg',
  'vfour9.jpg': 'locations/vfour9.jpg',
}

// Ensure output directories exist
const outputDirs = ['trainers', 'locations']
outputDirs.forEach(dir => {
  const fullPath = path.join(OUTPUT_DIR, dir)
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true })
  }
})

async function processImages() {
  console.log('🚀 Processing real photos...\n')
  
  if (!fs.existsSync(INPUT_DIR)) {
    console.error(`❌ Input folder not found: ${INPUT_DIR}`)
    console.log('📁 Create a "raw-photos" folder and put your photos there.')
    return
  }
  
  const files = fs.readdirSync(INPUT_DIR)
  let processed = 0
  let skipped = 0
  
  for (const [inputName, outputPath] of Object.entries(PHOTO_MAP)) {
    const inputFile = path.join(INPUT_DIR, inputName)
    
    if (!fs.existsSync(inputFile)) {
      console.log(`⚠️  Skipped: ${inputName} (file not found)`)
      skipped++
      continue
    }
    
    const outputFile = path.join(OUTPUT_DIR, outputPath)
    const outputDir = path.dirname(outputFile)
    
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }
    
    // Determine resize settings based on destination
    let resizeOptions = { width: 400, height: 400, fit: 'cover' }
    if (outputPath.startsWith('locations/')) {
      resizeOptions = { width: 600, height: 338, fit: 'cover' }
    }
    
    try {
      await sharp(inputFile)
        .resize(resizeOptions)
        .jpeg({ quality: 85, progressive: true })
        .toFile(outputFile)
      
      console.log(`✅ Processed: ${inputName} → ${outputPath}`)
      processed++
    } catch (error) {
      console.error(`❌ Failed: ${inputName} → ${error.message}`)
    }
  }
  
  console.log(`\n✅ Done! Processed: ${processed}, Skipped: ${skipped}`)
}

processImages().catch(console.error)