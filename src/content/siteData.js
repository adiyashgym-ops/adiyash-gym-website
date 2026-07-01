// ============================================
// ADIYASH GYM - CENTRAL CONTENT DATA
// Edit this file to update all content site-wide
// ============================================

export const siteConfig = {
  // ----- BASIC INFO -----
  gymName: 'Adiyash Gym',
  tagline: 'We Make Your Life Fitter and Better',
  description: 'Premium fitness studio in Mumbai. Transform your body with expert trainers and world-class facilities.',
  
  // ----- CONTACT -----
  email: 'adiyashgym.mail@gmail.com',
  mainPhone: '9076336653',
  
  // ----- SOCIAL LINKS -----
  social: {
    instagram: 'https://instagram.com/adiyashgymkurla',
    youtube: 'https://youtube.com/@adiyashgym',
    facebook: 'https://facebook.com/adiyashgym',
  },
  
  // ----- STATS -----
  stats: [
    { number: '500+', label: 'Transformations' },
    { number: '7', label: 'Locations' },
    { number: '12+', label: 'Years of Excellence' },
    { number: '25+', label: 'Certified Trainers' },
  ],
  
  // ----- STORIES (Before & After) -----
  stories: [
    { 
      id: 'story1', 
      title: 'Adiyash Gym | Before & After Stories | Ep 5 | Kandivali', 
      tagline: 'A powerful transformation journey of a strong woman', 
      videoId: 'ZRRQor-5eOE', 
      thumbnail: '/stories/ep5.jpg' 
    },
    { 
      id: 'story2', 
      title: 'Adiyash Gym | Before & After Stories | Ep 4 | Kandivali', 
      tagline: 'From overweight to transformation — real journey', 
      videoId: 'c2blybicHac', 
      thumbnail: '/stories/ep4.jpg' 
    },
    { 
      id: 'story3', 
      title: 'Adiyash Gym | Before & After Stories | Ep 8 | Kurla', 
      tagline: 'Weight loss journey with dedication and consistency', 
      videoId: 'XivOEGm-1rE', 
      thumbnail: '/stories/ep8.jpg' 
    },
  ],
  
  // ----- BRANCHES (7 locations) -----
  branches: [
    {
      id: 'kurla',
      name: 'Kurla',
      whatsapp: '918291743902',
      phone: '+91 82917 43902',
      address: 'Khushiram Estate, Opp Pearl Hans Residency Near Pheonix Marketcity, Lbs Road, Sunder Baug Ln, Kurla, Mumbai - 400070',
      timings: '24/7',
      mapLink: 'https://maps.google.com/?q=Kurla+Mumbai',
      instagram: 'adiyashgymkurla',
      image: '/locations/kurla.jpg',
    },
    {
      id: 'vikhroli',
      name: 'Vikhroli',
      whatsapp: '918291432839',
      phone: '+91 82914 32839',
      address: '4W8Q+262, Kannamwar Nagar II, Vikhroli East, Mumbai - 400083',
      timings: '24/7',
      mapLink: 'https://maps.google.com/?q=Vikhroli+Mumbai',
      instagram: 'adiyashgymvikhroli',
      image: '/locations/vikhroli.jpg',
    },
    {
      id: 'kandivali',
      name: 'Kandivali',
      whatsapp: '919324337728',
      phone: '+91 93243 37728',
      address: '29, Road No. 1, Kandivali, Ashok Nagar, Kandivali East, Mumbai - 400101',
      timings: '24/7',
      mapLink: 'https://maps.google.com/?q=Kandivali+Mumbai',
      instagram: 'adiyashgymkandivali',
      image: '/locations/kandivali.jpg',
    },
    {
      id: 'asalfa-unisex',
      name: 'Asalfa Unisex',
      whatsapp: '918268652812',
      phone: '+91 82686 52812',
      address: 'Shop no 3, Dhumal Estate, A Link Road Asalfa, Ghatkopar West, Mumbai - 400084',
      timings: '24/7',
      mapLink: 'https://maps.google.com/?q=Ghatkopar+Mumbai',
      instagram: 'adiyashgymasalfa',
      image: '/locations/asalfa-unisex.jpg',
    },
    {
      id: 'asalfa-ladies',
      name: 'Asalfa Ladies',
      whatsapp: '919869565863',
      phone: '+91 98695 65863',
      address: 'Shop no 3, Dhumal Estate, A Link Road Asalfa, Ghatkopar West, Mumbai - 400084',
      timings: '5:00 AM - 10:00 PM',
      mapLink: 'https://maps.google.com/?q=Ghatkopar+Mumbai',
      instagram: 'adiyashladisegym',
      image: '/locations/asalfa-ladies.jpg',
    },
    {
      id: 'marol',
      name: 'Marol',
      whatsapp: '918104579053',
      phone: '+91 81045 79053',
      address: 'A Wing, Twin Arcade, Orchid Business Park, Building C, Military Rd, Marol, Mumbai - 400059',
      timings: '5:00 AM - 12:00 PM',
      mapLink: 'https://maps.google.com/?q=Marol+Mumbai',
      instagram: 'adiyashgymmarol',
      image: '/locations/marol.jpg',
    },
    {
      id: 'vfour9',
      name: 'Vfour9',
      whatsapp: '918879410763',
      phone: '+91 88794 10763',
      address: '4W8Q+262, Kannamwar Nagar II, Vikhroli East, Mumbai - 400083',
      timings: '24/7',
      mapLink: 'https://maps.google.com/?q=Vikhroli+Mumbai',
      instagram: 'adiyashgymvfour9',
      image: '/locations/vfour9.jpg',
    },
  ],
  
  // ----- PROGRAMS / FACILITIES -----
  programs: [
    { 
      id: 'strength', 
      title: 'Strength Training', 
      description: 'Build muscle and increase power with expert-guided weight training.', 
      image: '/programs/strength-training.jpg',
      featured: true 
    },
    { 
      id: 'cardio', 
      title: 'Cardio', 
      description: 'Boost endurance and heart health with structured cardio sessions.', 
      image: '/programs/cardio.jpg',
      featured: true 
    },
    { 
      id: 'crossfit', 
      title: 'CrossFit', 
      description: 'High-intensity functional fitness for all levels.', 
      image: '/programs/crossfit.jpg',
      featured: true 
    },
    { 
      id: 'personal-training', 
      title: 'Personal Training', 
      description: 'One-on-one coaching customized to your fitness goals.', 
      image: '/programs/personal-training.jpg',
      featured: true 
    },
    { 
      id: 'nutrition-counselling', 
      title: 'Nutrition Counselling', 
      description: 'Personalized meal plans and dietary guidance.', 
      image: '/programs/nutrition-counselling.jpg',
      featured: true 
    },
    { 
      id: 'general-trainer', 
      title: "General Trainer's", 
      description: 'Expert guidance from certified trainers.', 
      image: '/programs/general-trainer.jpg',
      featured: false 
    },
    { 
      id: 'spinning', 
      title: 'Spinning', 
      description: 'High-energy indoor cycling classes.', 
      image: '/programs/spinning.jpg',
      featured: false 
    },
    { 
      id: 'lockers', 
      title: 'Lockers', 
      description: 'Secure locker facilities for your belongings.', 
      image: '/programs/lockers.jpg',
      featured: false 
    },
    { 
      id: 'steam-shower', 
      title: 'Steam & Shower', 
      description: 'Relax and refresh with steam and shower facilities.', 
      image: '/programs/steam-shower.jpg',
      featured: false 
    },
    { 
      id: 'parking', 
      title: 'Parking', 
      description: 'Ample parking space for members.', 
      image: '/programs/parking.jpg',
      featured: false 
    },
    { 
      id: 'transfer', 
      title: 'Transfer', 
      description: 'Flexible membership transfer between branches.', 
      image: '/programs/transfer.jpg',
      featured: false 
    },
    { 
      id: 'cafeteria', 
      title: 'Cafeteria', 
      description: 'Healthy food and beverages at our in-house cafeteria.', 
      image: '/programs/cafeteria.jpg',
      featured: false 
    },
  ],
  
  // ----- FAQ -----
  faqs: [
    { question: 'What are your gym timings?', answer: 'Most branches are open 24/7. Asalfa Ladies: 5:00 AM - 10:00 PM. Marol: 5:00 AM - 12:00 PM.' },
    { question: 'How do I book a free trial?', answer: 'Click the "Join Now" button on any branch page and send us a WhatsApp message. We\'ll schedule your free trial within 24 hours.' },
    { question: 'What\'s included in the membership?', answer: 'Full access to gym equipment, group classes, lockers, steam & shower, and complimentary fitness assessment.' },
    { question: 'Do I need to bring my own equipment?', answer: 'We provide all necessary equipment including weights, mats, and accessories. Just bring your workout clothes, shoes, and a water bottle!' },
    { question: 'Are there different membership plans?', answer: 'Yes! We offer flexible monthly, quarterly, and annual plans. Contact us on WhatsApp for details.' },
    { question: 'Can I transfer my membership between branches?', answer: 'Yes! We offer flexible transfer options between all 7 branches.' },
  ],
  
  // ----- CTA -----
  cta: {
    title: 'Your Transformation Starts Here',
    subtitle: 'Join Adiyash Gym today and train with Mumbai\'s best fitness experts.',
    buttonText: 'Join Now',
    buttonLink: 'https://wa.me/919076633653',
  },
  
  // ----- FOOTER -----
  footer: {
    copyright: '© 2026 Adiyash Gym. All rights reserved.',
    credit: 'Designed & Developed by Tozi',
    creditLink: 'https://tozi.dev',
  },
  
  // ----- OFFERS (will be managed via admin) -----
  offers: [
    // Admin will add these dynamically
  ],
}

// ----- SEO -----
export const seo = {
  title: 'Adiyash Gym Mumbai - Premium Fitness Studio',
  description: 'Transform your body at Mumbai\'s premium gym. Expert trainers, 7 locations, and state-of-the-art facilities. Join now!',
  ogImage: '/og-image.jpg',
  keywords: 'gym Mumbai, fitness studio, personal training, weight loss, strength training, Adiyash Gym',
}