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
    { number: '5000+', label: 'Transformations' },
    { number: '7', label: 'Locations' },
    { number: '16+', label: 'Years of Excellence' },
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
      mapLink: 'https://maps.app.goo.gl/WyZ5bmJxfCCkMBNk6',
      instagram: 'adiyashgymkurla',
      image: '/locations/kurla.jpg',
      gallery: [
        '/locations/kurla/gallery-1.jpg',
        '/locations/kurla/gallery-2.jpg',
        '/locations/kurla/gallery-3.jpg',
        '/locations/kurla/gallery-4.jpg',
        '/locations/kurla/gallery-5.jpg',
        '/locations/kurla/gallery-6.jpg',
        '/locations/kurla/gallery-7.jpg',
        '/locations/kurla/gallery-8.jpg',
        '/locations/kurla/gallery-9.jpg',
        '/locations/kurla/gallery-10.jpg',
        '/locations/kurla/gallery-11.jpg',
        '/locations/kurla/gallery-12.jpg',
        '/locations/kurla/gallery-13.jpg',
      ],
      facilities: [
        { id: 'strength', name: 'Strength Training', icon: '🏋️', image: '/facilities/kurla/strength.jpg' },
        { id: 'cardio', name: 'Cardio', icon: '🏃', image: '/facilities/kurla/cardio.jpg' },
        { id: 'crossfit', name: 'CrossFit', icon: '💪', image: '/facilities/kurla/crossfit.jpg' },
        { id: 'general-trainer', name: "General Trainer's", icon: '👨‍🏫', image: '/facilities/kurla/general-trainer.jpg' },
        { id: 'spinning', name: 'Spinning', icon: '🚴', image: '/facilities/kurla/spinning.jpg' },
        { id: 'personal-training', name: 'Personal Training', icon: '👤', image: '/facilities/kurla/personal-training.jpg' },
        { id: 'lockers', name: 'Lockers', icon: '🔒', image: '/facilities/kurla/lockers.jpg' },
        { id: 'steam-shower', name: 'Steam & Shower', icon: '🚿', image: '/facilities/kurla/steam-shower.jpg' },
        { id: 'nutrition-counselling', name: 'Nutrition Counselling', icon: '🥗', image: '/facilities/kurla/nutrition.jpg' },
        { id: 'parking', name: 'Parking', icon: '🅿️', image: '/facilities/kurla/parking.jpg' },
        { id: 'transfer', name: 'Transfer', icon: '🔄', image: '/facilities/kurla/transfer.jpg' },
        { id: 'cafeteria', name: 'Cafeteria', icon: '☕', image: '/facilities/kurla/cafeteria.jpg' },
        { id: 'all-branch-access', name: 'All Branch Access', icon: '🏢', image: '/facilities/kurla/all-branch.jpg', note: 'Available only when joining from Kurla' },
      ],
    },
    {
      id: 'vikhroli',
      name: 'Vikhroli',
      whatsapp: '918291432839',
      phone: '+91 82914 32839',
      address: '4W8Q+262, Kannamwar Nagar II, Vikhroli East, Mumbai - 400083',
      timings: '24/7',
      mapLink: 'https://maps.app.goo.gl/jFj6CeFbghmRL9JD8',
      instagram: 'adiyashgymvikhroli',
      image: '/locations/vikhroli.jpg',
      gallery: [
        '/locations/vikhroli/gallery-1.jpg',
        '/locations/vikhroli/gallery-2.jpg',
        '/locations/vikhroli/gallery-3.jpg',
        '/locations/vikhroli/gallery-4.jpg',
        '/locations/vikhroli/gallery-5.jpg',
        '/locations/vikhroli/gallery-6.jpg',
        '/locations/vikhroli/gallery-7.jpg',
        '/locations/vikhroli/gallery-8.jpg',
        '/locations/vikhroli/gallery-9.jpg',
        '/locations/vikhroli/gallery-10.jpg',
        '/locations/vikhroli/gallery-11.jpg',
        '/locations/vikhroli/gallery-12.jpg',
        '/locations/vikhroli/gallery-13.jpg',
        '/locations/vikhroli/gallery-14.jpg',
        '/locations/vikhroli/gallery-15.jpg',
        '/locations/vikhroli/gallery-16.jpg',
        '/locations/vikhroli/gallery-17.jpg',
      ],
      facilities: [
        { id: 'strength', name: 'Strength Training', icon: '🏋️', image: '/facilities/vikhroli/strength.jpg' },
        { id: 'cardio', name: 'Cardio', icon: '🏃', image: '/facilities/vikhroli/cardio.jpg' },
        { id: 'crossfit', name: 'CrossFit', icon: '💪', image: '/facilities/vikhroli/crossfit.jpg' },
        { id: 'general-trainer', name: "General Trainer's", icon: '👨‍🏫', image: '/facilities/vikhroli/general-trainer.jpg' },
        { id: 'spinning', name: 'Spinning', icon: '🚴', image: '/facilities/vikhroli/spinning.jpg' },
        { id: 'personal-training', name: 'Personal Training', icon: '👤', image: '/facilities/vikhroli/personal-training.jpg' },
        { id: 'lockers', name: 'Lockers', icon: '🔒', image: '/facilities/vikhroli/lockers.jpg' },
        { id: 'shower', name: 'Shower', icon: '🚿', image: '/facilities/vikhroli/shower.jpg' },
        { id: 'nutrition-counselling', name: 'Nutrition Counselling', icon: '🥗', image: '/facilities/vikhroli/nutrition.jpg' },
        { id: 'parking', name: 'Parking', icon: '🅿️', image: '/facilities/vikhroli/parking.jpg' },
        { id: 'transfer', name: 'Transfer', icon: '🔄', image: '/facilities/vikhroli/transfer.jpg' },
        { id: 'all-branch-access', name: 'All Branch Access', icon: '🏢', image: '/facilities/vikhroli/all-branch.jpg', note: 'Available only when joining from Kurla' },
      ],
    },
    {
      id: 'kandivali',
      name: 'Kandivali',
      whatsapp: '919324337728',
      phone: '+91 93243 37728',
      address: '29, Road No. 1, Kandivali, Ashok Nagar, Kandivali East, Mumbai - 400101',
      timings: '24/7',
      mapLink: 'https://maps.app.goo.gl/Fg2NdibFVJ3chzZn7',
      instagram: 'adiyashgymkandivali',
      image: '/locations/kandivali.jpg',
      gallery: [
        '/locations/kandivali/gallery-1.jpg',
        '/locations/kandivali/gallery-2.jpg',
        '/locations/kandivali/gallery-3.jpg',
        '/locations/kandivali/gallery-4.jpg',
        '/locations/kandivali/gallery-5.jpg',
        '/locations/kandivali/gallery-6.jpg',
        '/locations/kandivali/gallery-7.jpg',
        '/locations/kandivali/gallery-8.jpg',
      ],
      facilities: [
        { id: 'strength', name: 'Strength Training', icon: '🏋️', image: '/facilities/kandivali/strength.jpg' },
        { id: 'cardio', name: 'Cardio', icon: '🏃', image: '/facilities/kandivali/cardio.jpg' },
        { id: 'crossfit', name: 'CrossFit', icon: '💪', image: '/facilities/kandivali/crossfit.jpg' },
        { id: 'general-trainer', name: "General Trainer's", icon: '👨‍🏫', image: '/facilities/kandivali/general-trainer.jpg' },
        { id: 'spinning', name: 'Spinning', icon: '🚴', image: '/facilities/kandivali/spinning.jpg' },
        { id: 'personal-training', name: 'Personal Training', icon: '👤', image: '/facilities/kandivali/personal-training.jpg' },
        { id: 'lockers', name: 'Lockers', icon: '🔒', image: '/facilities/kandivali/lockers.jpg' },
        { id: 'steam-shower', name: 'Steam & Shower', icon: '🚿', image: '/facilities/kandivali/steam-shower.jpg' },
        { id: 'nutrition-counselling', name: 'Nutrition Counselling', icon: '🥗', image: '/facilities/kandivali/nutrition.jpg' },
        { id: 'transfer', name: 'Transfer', icon: '🔄', image: '/facilities/kandivali/transfer.jpg' },
        { id: 'all-branch-access', name: 'All Branch Access', icon: '🏢', image: '/facilities/kandivali/all-branch.jpg', note: 'Available only when joining from Kurla' },
      ],
    },
    {
      id: 'asalfa-unisex',
      name: 'Asalfa Unisex',
      whatsapp: '918268652812',
      phone: '+91 82686 52812',
      address: 'Shop no 3, Dhumal Estate, A Link Road Asalfa, Ghatkopar West, Mumbai - 400084',
      timings: '24/7',
      mapLink: 'https://maps.app.goo.gl/wci1RTsK3JbhZmRn9',
      instagram: 'adiyashgymasalfa',
      image: '/locations/asalfa-unisex.jpg',
      gallery: [
        '/locations/asalfa-unisex/gallery-1.jpg',
        '/locations/asalfa-unisex/gallery-2.jpg',
        '/locations/asalfa-unisex/gallery-3.jpg',
        '/locations/asalfa-unisex/gallery-4.jpg',
        '/locations/asalfa-unisex/gallery-5.jpg',
        '/locations/asalfa-unisex/gallery-6.jpg',
        '/locations/asalfa-unisex/gallery-7.jpg',
        '/locations/asalfa-unisex/gallery-8.jpg',
        '/locations/asalfa-unisex/gallery-9.jpg',
        '/locations/asalfa-unisex/gallery-10.jpg',
        '/locations/asalfa-unisex/gallery-11.jpg',
      ],
      facilities: [
        { id: 'strength', name: 'Strength Training', icon: '🏋️', image: '/facilities/asalfa-unisex/strength.jpg' },
        { id: 'cardio', name: 'Cardio', icon: '🏃', image: '/facilities/asalfa-unisex/cardio.jpg' },
        { id: 'crossfit', name: 'CrossFit', icon: '💪', image: '/facilities/asalfa-unisex/crossfit.jpg' },
        { id: 'general-trainer', name: "General Trainer's", icon: '👨‍🏫', image: '/facilities/asalfa-unisex/general-trainer.jpg' },
        { id: 'spinning', name: 'Spinning', icon: '🚴', image: '/facilities/asalfa-unisex/spinning.jpg' },
        { id: 'personal-training', name: 'Personal Training', icon: '👤', image: '/facilities/asalfa-unisex/personal-training.jpg' },
        { id: 'lockers', name: 'Lockers', icon: '🔒', image: '/facilities/asalfa-unisex/lockers.jpg' },
        { id: 'shower', name: 'Shower', icon: '🚿', image: '/facilities/asalfa-unisex/shower.jpg' },
        { id: 'nutrition-counselling', name: 'Nutrition Counselling', icon: '🥗', image: '/facilities/asalfa-unisex/nutrition.jpg' },
        { id: 'parking', name: 'Parking', icon: '🅿️', image: '/facilities/asalfa-unisex/parking.jpg' },
        { id: 'transfer', name: 'Transfer', icon: '🔄', image: '/facilities/asalfa-unisex/transfer.jpg' },
        { id: 'all-branch-access', name: 'All Branch Access', icon: '🏢', image: '/facilities/asalfa-unisex/all-branch.jpg', note: 'Available only when joining from Kurla' },
      ],
    },
    {
      id: 'asalfa-ladies',
      name: 'Asalfa Ladies',
      whatsapp: '919869565863',
      phone: '+91 98695 65863',
      address: 'Shop no 3, Dhumal Estate, A Link Road Asalfa, Ghatkopar West, Mumbai - 400084',
      timings: '5:00 AM - 10:00 PM',
      mapLink: 'https://maps.app.goo.gl/3gKCc37DSFwh11UK7',
      instagram: 'adiyashladiesgym',
      image: '/locations/asalfa-ladies.jpg',
      gallery: [
        '/locations/asalfa-ladies/gallery-1.jpg',
        '/locations/asalfa-ladies/gallery-2.jpg',
        '/locations/asalfa-ladies/gallery-3.jpg',
        '/locations/asalfa-ladies/gallery-4.jpg',
        '/locations/asalfa-ladies/gallery-5.jpg',
        '/locations/asalfa-ladies/gallery-6.jpg',
        '/locations/asalfa-ladies/gallery-7.jpg',
        '/locations/asalfa-ladies/gallery-8.jpg',
      ],
      facilities: [
        { id: 'strength', name: 'Strength Training', icon: '🏋️', image: '/facilities/asalfa-ladies/strength.jpg' },
        { id: 'cardio', name: 'Cardio', icon: '🏃', image: '/facilities/asalfa-ladies/cardio.jpg' },
        { id: 'crossfit', name: 'CrossFit', icon: '💪', image: '/facilities/asalfa-ladies/crossfit.jpg' },
        { id: 'general-trainer', name: "General Trainer's", icon: '👨‍🏫', image: '/facilities/asalfa-ladies/general-trainer.jpg' },
        { id: 'spinning', name: 'Spinning', icon: '🚴', image: '/facilities/asalfa-ladies/spinning.jpg' },
        { id: 'personal-training', name: 'Personal Training', icon: '👤', image: '/facilities/asalfa-ladies/personal-training.jpg' },
        { id: 'lockers', name: 'Lockers', icon: '🔒', image: '/facilities/asalfa-ladies/lockers.jpg' },
        { id: 'shower', name: 'Shower', icon: '🚿', image: '/facilities/asalfa-ladies/shower.jpg' },
        { id: 'nutrition-counselling', name: 'Nutrition Counselling', icon: '🥗', image: '/facilities/asalfa-ladies/nutrition.jpg' },
        { id: 'parking', name: 'Parking', icon: '🅿️', image: '/facilities/asalfa-ladies/parking.jpg' },
        { id: 'transfer', name: 'Transfer', icon: '🔄', image: '/facilities/asalfa-ladies/transfer.jpg' },
        { id: 'all-branch-access', name: 'All Branch Access', icon: '🏢', image: '/facilities/asalfa-ladies/all-branch.jpg', note: 'Available only when joining from Kurla' },
      ],
    },
    {
      id: 'marol',
      name: 'Marol',
      whatsapp: '918104579053',
      phone: '+91 81045 79053',
      address: 'A Wing, Twin Arcade, Orchid Business Park, Building C, Military Rd, Marol, Mumbai - 400059',
      timings: '5:00 AM - 12:00 PM',
      mapLink: 'https://maps.app.goo.gl/YLQBKrQwerAgVSWD6',
      instagram: 'adiyashgymmarol',
      image: '/locations/marol.jpg',
      gallery: [
        '/locations/marol/gallery-1.jpg',
        '/locations/marol/gallery-2.jpg',
        '/locations/marol/gallery-3.jpg',
        '/locations/marol/gallery-4.jpg',
        '/locations/marol/gallery-5.jpg',
        '/locations/marol/gallery-6.jpg',
        '/locations/marol/gallery-7.jpg',
        '/locations/marol/gallery-8.jpg',
        '/locations/marol/gallery-9.jpg',
        '/locations/marol/gallery-10.jpg',
      ],
      facilities: [
        { id: 'strength', name: 'Strength Training', icon: '🏋️', image: '/facilities/marol/strength.jpg' },
        { id: 'cardio', name: 'Cardio', icon: '🏃', image: '/facilities/marol/cardio.jpg' },
        { id: 'crossfit', name: 'CrossFit', icon: '💪', image: '/facilities/marol/crossfit.jpg' },
        { id: 'general-trainer', name: "General Trainer's", icon: '👨‍🏫', image: '/facilities/marol/general-trainer.jpg' },
        { id: 'spinning', name: 'Spinning', icon: '🚴', image: '/facilities/marol/spinning.jpg' },
        { id: 'personal-training', name: 'Personal Training', icon: '👤', image: '/facilities/marol/personal-training.jpg' },
        { id: 'lockers', name: 'Lockers', icon: '🔒', image: '/facilities/marol/lockers.jpg' },
        { id: 'steam-shower', name: 'Steam & Shower', icon: '🚿', image: '/facilities/marol/steam-shower.jpg' },
        { id: 'nutrition-counselling', name: 'Nutrition Counselling', icon: '🥗', image: '/facilities/marol/nutrition.jpg' },
        { id: 'parking', name: 'Parking', icon: '🅿️', image: '/facilities/marol/parking.jpg' },
        { id: 'transfer', name: 'Transfer', icon: '🔄', image: '/facilities/marol/transfer.jpg' },
        { id: 'cafeteria', name: 'Cafeteria', icon: '☕', image: '/facilities/marol/cafeteria.jpg' },
        { id: 'all-branch-access', name: 'All Branch Access', icon: '🏢', image: '/facilities/marol/all-branch.jpg', note: 'Available only when joining from Kurla' },
      ],
    },
    {
      id: 'vfour9',
      name: 'Thane-Vfour9',
      whatsapp: '918879410763',
      phone: '+91 88794 10763',
      address: '1st floor, Bld No.1, Pushpamangal Complex, Lal Bahadur Shastri Marg, above Bank Of Baroda, next to Babubhai Petrol Pump, Uthalsar, Thane West, Thane, Maharashtra 400601',
      timings: '24/7',
      mapLink: 'https://maps.app.goo.gl/YhtWPPHfNpUn4vps7',
      instagram: 'vfour9gym',
      image: '/locations/vfour9.jpg',
      gallery: [
        '/locations/vfour9/gallery-1.jpg',
        '/locations/vfour9/gallery-2.jpg',
        '/locations/vfour9/gallery-3.jpg',
        '/locations/vfour9/gallery-4.jpg',
        '/locations/vfour9/gallery-5.jpg',
        '/locations/vfour9/gallery-6.jpg',
        '/locations/vfour9/gallery-7.jpg',
        '/locations/vfour9/gallery-8.jpg',
        '/locations/vfour9/gallery-9.jpg',
      ],
      facilities: [
        { id: 'strength', name: 'Strength Training', icon: '🏋️', image: '/facilities/vfour9/strength.jpg' },
        { id: 'cardio', name: 'Cardio', icon: '🏃', image: '/facilities/vfour9/cardio.jpg' },
        { id: 'crossfit', name: 'CrossFit', icon: '💪', image: '/facilities/vfour9/crossfit.jpg' },
        { id: 'general-trainer', name: "General Trainer's", icon: '👨‍🏫', image: '/facilities/vfour9/general-trainer.jpg' },
        { id: 'personal-training', name: 'Personal Training', icon: '👤', image: '/facilities/vfour9/personal-training.jpg' },
        { id: 'lockers', name: 'Lockers', icon: '🔒', image: '/facilities/vfour9/lockers.jpg' },
        { id: 'steam', name: 'Steam', icon: '♨️', image: '/facilities/vfour9/steam.jpg' },
        { id: 'shower', name: 'Shower', icon: '🚿', image: '/facilities/vfour9/shower.jpg' },
        { id: 'nutrition-counselling', name: 'Nutrition Counselling', icon: '🥗', image: '/facilities/vfour9/nutrition.jpg' },
        { id: 'parking', name: 'Parking', icon: '🅿️', image: '/facilities/vfour9/parking.jpg' },
        { id: 'membership-transfer', name: 'Membership Transfer', icon: '🔄', image: '/facilities/vfour9/membership-transfer.jpg' },
        { id: 'all-branch-access', name: 'All Branch Access', icon: '🏢', image: '/facilities/vfour9/all-branch.jpg', note: 'Available only when joining from Kurla' },
      ],
    },
  ],
  
  // ----- PROGRAMS / FACILITIES (READY FOR IMAGES) -----
  programs: [
    { 
      id: 'strength', 
      title: 'Strength Training', 
      description: 'Build muscle and increase power with expert-guided weight training.',
      icon: '🏋️',
      image: '/programs/strength-training.jpg',
      featured: true 
    },
    { 
      id: 'cardio', 
      title: 'Cardio', 
      description: 'Boost endurance and heart health with structured cardio sessions.',
      icon: '🏃',
      image: '/programs/cardio.jpg',
      featured: true 
    },
    { 
      id: 'crossfit', 
      title: 'CrossFit', 
      description: 'High-intensity functional fitness for all levels.',
      icon: '💪',
      image: '/programs/crossfit.jpg',
      featured: true 
    },
    { 
      id: 'personal-training', 
      title: 'Personal Training', 
      description: 'One-on-one coaching customized to your fitness goals.',
      icon: '👤',
      image: '/programs/personal-training.jpg',
      featured: true 
    },
    { 
      id: 'nutrition-counselling', 
      title: 'Nutrition Counselling', 
      description: 'Personalized meal plans and dietary guidance.',
      icon: '🥗',
      image: '/programs/nutrition-counselling.jpg',
      featured: true 
    },
    { 
      id: 'general-trainer', 
      title: "General Trainer's", 
      description: 'Expert guidance from certified trainers.',
      icon: '👨‍🏫',
      image: '/programs/general-trainer.jpg',
      featured: false 
    },
    { 
      id: 'spinning', 
      title: 'Spinning', 
      description: 'High-energy indoor cycling classes.',
      icon: '🚴',
      image: '/programs/spinning.jpg',
      featured: false 
    },
    { 
      id: 'lockers', 
      title: 'Lockers', 
      description: 'Secure locker facilities for your belongings.',
      icon: '🔒',
      image: '/programs/lockers.jpg',
      featured: false 
    },
    { 
      id: 'steam-shower', 
      title: 'Steam & Shower', 
      description: 'Relax and refresh with steam and shower facilities.',
      icon: '🚿',
      image: '/programs/steam-shower.jpg',
      featured: false 
    },
    { 
      id: 'parking', 
      title: 'Parking', 
      description: 'Ample parking space for members.',
      icon: '🅿️',
      image: '/programs/parking.jpg',
      featured: false 
    },
    { 
      id: 'transfer', 
      title: 'Transfer', 
      description: 'Flexible membership transfer between branches.',
      icon: '🔄',
      image: '/programs/transfer.jpg',
      featured: false 
    },
    { 
      id: 'cafeteria', 
      title: 'Cafeteria', 
      description: 'Healthy food and beverages at our in-house cafeteria.',
      icon: '☕',
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