import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import fetch from 'node-fetch'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// === CONFIG ===
const PEXELS_API_KEY = 'mDNEGnXxd1SzThqAIDHK1krMkvtz3k3zfChLMA5RMhMJfhqqjQWcdkm0' // Your Pexels API key
const OUTPUT_DIR = path.join(__dirname, '../public/programs')

const PROGRAMS = [
  { name: 'strength-training', keyword: 'strength training gym' },
  { name: 'cardio', keyword: 'cardio workout' },
  { name: 'crossfit', keyword: 'crossfit gym' },
  { name: 'general-trainer', keyword: 'personal trainer gym' },
  { name: 'spinning', keyword: 'spinning cycling class' },
  { name: 'personal-training', keyword: 'personal training gym' },
  { name: 'lockers', keyword: 'gym lockers' },
  { name: 'steam-shower', keyword: 'gym steam room' },
  { name: 'nutrition-counselling', keyword: 'nutrition healthy food' },
  { name: 'parking', keyword: 'gym parking' },
  { name: 'transfer', keyword: 'gym transfer' },
  { name: 'cafeteria', keyword: 'gym cafeteria healthy food' },
]

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true })
}

async function downloadImage(url, filepath) {
  const response = await fetch(url)
  const buffer = await response.buffer()
  fs.writeFileSync(filepath, buffer)
  console.log(`✅ Downloaded: ${path.basename(filepath)}`)
}

async function fetchPexelsImage(keyword, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(keyword)}&per_page=1&page=1`
      const response = await fetch(url, {
        headers: { Authorization: PEXELS_API_KEY }
      })
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }
      
      const data = await response.json()
      
      if (data.photos && data.photos.length > 0) {
        // Get the 'large' size (≈ 800x600, close to our 400x300 target)
        return data.photos[0].src.large
      }
      throw new Error('No photos found')
    } catch (error) {
      console.log(`⏳ Retry ${i + 1}/${retries} for "${keyword}"...`)
      if (i === retries - 1) throw error
      await new Promise(r => setTimeout(r, 1000))
    }
  }
}

async function main() {
  console.log('🚀 Starting program image download...\n')
  
  for (const program of PROGRAMS) {
    try {
      const imageUrl = await fetchPexelsImage(program.keyword)
      const filepath = path.join(OUTPUT_DIR, `${program.name}.jpg`)
      await downloadImage(imageUrl, filepath)
    } catch (error) {
      console.error(`❌ Failed for "${program.name}": ${error.message}`)
    }
  }
  
  console.log('\n✅ All program images downloaded!')
}

main().catch(console.error)