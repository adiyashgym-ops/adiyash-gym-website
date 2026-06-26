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
      trainers: [
        { name: 'Rehemat Khan', specialty: 'Head Trainer' },
        { name: 'Sahil Shaikh', specialty: 'Strength & Conditioning' },
        { name: 'Aisha Khan', specialty: 'Nutrition & Wellness' },
      ],
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
      trainers: [
        { name: 'Vikram Singh', specialty: 'Personal Training' },
        { name: 'Neha Sharma', specialty: 'Yoga & Mobility' },
      ],
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
      trainers: [
        { name: 'Rahul Singh', specialty: 'CrossFit & Strength' },
        { name: 'Priya Jain', specialty: 'Spinning & Cardio' },
      ],
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
      trainers: [
        { name: 'Suresh Patil', specialty: 'General Fitness' },
        { name: 'Deepika Reddy', specialty: 'Nutrition Counselling' },
      ],
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
      trainers: [
        { name: 'Shweta Nair', specialty: 'Ladies Fitness' },
        { name: 'Kavita Sharma', specialty: 'Yoga & Wellness' },
      ],
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
      trainers: [
        { name: 'Ajay Yadav', specialty: 'Personal Training' },
        { name: 'Mrunal Desai', specialty: 'Strength & Conditioning' },
      ],
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
      trainers: [
        { name: 'Rohan Patil', specialty: 'CrossFit' },
        { name: 'Sneha Menon', specialty: 'Nutrition & Wellness' },
      ],
    },
  ],
  
  // ----- PROGRAMS / FACILITIES -----
  programs: [
    { id: 'strength', title: 'Strength Training', description: 'Build muscle and increase power with expert-guided weight training.', icon: '🏋️' },
    { id: 'cardio', title: 'Cardio', description: 'Boost endurance and heart health with structured cardio sessions.', icon: '🏃' },
    { id: 'crossfit', title: 'CrossFit', description: 'High-intensity functional fitness for all levels.', icon: '💪' },
    { id: 'general-trainer', title: "General Trainer's", description: 'Expert guidance from certified trainers.', icon: '👨‍🏫' },
    { id: 'spinning', title: 'Spinning', description: 'High-energy indoor cycling classes.', icon: '🚴' },
    { id: 'personal-training', title: 'Personal Training', description: 'One-on-one coaching customized to your fitness goals.', icon: '👤' },
    { id: 'lockers', title: 'Lockers', description: 'Secure locker facilities for your belongings.', icon: '🔒' },
    { id: 'steam-shower', title: 'Steam & Shower', description: 'Relax and refresh with steam and shower facilities.', icon: '🚿' },
    { id: 'nutrition-counselling', title: 'Nutrition Counselling', description: 'Personalized meal plans and dietary guidance.', icon: '🥗' },
    { id: 'parking', title: 'Parking', description: 'Ample parking space for members.', icon: '🅿️' },
    { id: 'transfer', title: 'Transfer', description: 'Flexible membership transfer between branches.', icon: '🔄' },
    { id: 'cafeteria', title: 'Cafeteria', description: 'Healthy food and beverages at our in-house cafeteria.', icon: '☕' },
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