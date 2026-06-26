// ============================================
// ADIYASH GYM - CENTRAL CONTENT DATA
// Edit this file to update all content site-wide
// ============================================

export const siteConfig = {
  // ----- BASIC INFO -----
  gymName: 'Adiyash Gym',
  tagline: 'Train Harder. Live Better.',
  description: 'Premium fitness studio in Mumbai. Transform your body with expert trainers and world-class facilities.',
  
  // ----- CONTACT -----
  phone: '+919876543210',
  whatsappNumber: '919876543210',
  whatsappLink: 'https://wa.me/919876543210',
  email: 'info@adiyashgym.com',
  
  // ----- SOCIAL LINKS -----
  social: {
    instagram: 'https://instagram.com/adiyashgym',
    facebook: 'https://facebook.com/adiyashgym',
    youtube: 'https://youtube.com/adiyashgym',
    whatsapp: 'https://wa.me/919876543210',
  },
  
  // ----- STATS -----
  stats: [
    { number: '500+', label: 'Transformations' },
    { number: '7', label: 'Locations' },
    { number: '12+', label: 'Years of Excellence' },
    { number: '25+', label: 'Certified Trainers' },
  ],
  
  // ----- LOCATIONS (7 Mumbai locations) -----
  locations: [
    { 
      name: 'Andheri West', 
      address: '123, Linking Road, Andheri West, Mumbai - 400053',
      mapLink: 'https://maps.google.com/?q=Andheri+West+Mumbai',
    },
    { 
      name: 'Bandra', 
      address: '45, Hill Road, Bandra West, Mumbai - 400050',
      mapLink: 'https://maps.google.com/?q=Bandra+Mumbai',
    },
    { 
      name: 'Juhu', 
      address: '78, Juhu Tara Road, Juhu, Mumbai - 400049',
      mapLink: 'https://maps.google.com/?q=Juhu+Mumbai',
    },
    { 
      name: 'Dadar', 
      address: '56, Gokhale Road, Dadar West, Mumbai - 400028',
      mapLink: 'https://maps.google.com/?q=Dadar+Mumbai',
    },
    { 
      name: 'Powai', 
      address: '90, Hiranandani Gardens, Powai, Mumbai - 400076',
      mapLink: 'https://maps.google.com/?q=Powai+Mumbai',
    },
    { 
      name: 'Malad', 
      address: '34, Link Road, Malad West, Mumbai - 400064',
      mapLink: 'https://maps.google.com/?q=Malad+Mumbai',
    },
    { 
      name: 'Thane', 
      address: '12, Ghodbunder Road, Thane West - 400607',
      mapLink: 'https://maps.google.com/?q=Thane+Mumbai',
    },
  ],
  
  // ----- PROGRAMS -----
  programs: [
    { id: 'strength', title: 'Strength Training', description: 'Build muscle and increase power with expert-guided weight training.', icon: '🏋️' },
    { id: 'personal', title: 'Personal Training', description: 'One-on-one coaching customized to your fitness goals.', icon: '👤' },
    { id: 'group', title: 'Group Classes', description: 'High-energy group workouts led by certified instructors.', icon: '👥' },
    { id: 'nutrition', title: 'Nutrition Coaching', description: 'Personalized meal plans and dietary guidance for optimal results.', icon: '🥗' },
    { id: 'yoga', title: 'Yoga & Mobility', description: 'Improve flexibility, balance, and mental wellness.', icon: '🧘' },
    { id: 'cardio', title: 'Cardio Conditioning', description: 'Boost endurance and heart health with structured cardio sessions.', icon: '🏃' },
  ],
  
  // ----- TRAINERS -----
  trainers: [
    { name: 'Rahul Sharma', specialty: 'Strength & Conditioning', image: '/trainers/rahul.jpg' },
    { name: 'Priya Patel', specialty: 'Yoga & Mobility', image: '/trainers/priya.jpg' },
    { name: 'Amit Kumar', specialty: 'Personal Training', image: '/trainers/amit.jpg' },
    { name: 'Sneha Reddy', specialty: 'Nutrition & Wellness', image: '/trainers/sneha.jpg' },
    { name: 'Vikram Singh', specialty: 'Cardio & Endurance', image: '/trainers/vikram.jpg' },
    { name: 'Neha Joshi', specialty: 'Group Fitness', image: '/trainers/neha.jpg' },
  ],
  
  // ----- YOUTUBE STORIES -----
  stories: [
    { id: 'story1', title: "Rahul's 6-Month Transformation", tagline: 'Lost 20kg and gained confidence', videoId: 'dQw4w9WgXcQ', thumbnail: '/stories/rahul.jpg' },
    { id: 'story2', title: "Priya's Strength Journey", tagline: 'From beginner to powerlifter', videoId: 'dQw4w9WgXcQ', thumbnail: '/stories/priya.jpg' },
    { id: 'story3', title: "Amit's Body Transformation", tagline: 'Built muscle and changed his life', videoId: 'dQw4w9WgXcQ', thumbnail: '/stories/amit.jpg' },
  ],
  
  // ----- FAQ -----
  faqs: [
    { question: 'What are your gym timings?', answer: 'We are open 5:00 AM to 11:00 PM, 7 days a week.' },
    { question: 'How do I book a free trial?', answer: 'Click the "Join Now" button and send us a WhatsApp message. We\'ll schedule your free trial within 24 hours.' },
    { question: 'What\'s included in the membership?', answer: 'Full access to all gym equipment, group classes, changing rooms, and complimentary fitness assessment.' },
    { question: 'Do I need to bring my own equipment?', answer: 'We provide all necessary equipment. Just bring your workout clothes, shoes, and a water bottle!' },
    { question: 'Are there different membership plans?', answer: 'Yes! We offer flexible monthly, quarterly, and annual plans. Contact us on WhatsApp for details.' },
    { question: 'How do I cancel my membership?', answer: 'Membership cancellations can be done at the end of your billing cycle. Contact us on WhatsApp for assistance.' },
  ],
  
  // ----- CTA -----
  cta: {
    title: 'Your Transformation Starts Here',
    subtitle: 'Join Adiyash Gym today and train with Mumbai\'s best fitness experts.',
    buttonText: 'Join Now',
    buttonLink: 'https://wa.me/919876543210',
  },
  
  // ----- FOOTER -----
  footer: {
    copyright: '© 2026 Adiyash Gym. All rights reserved.',
    credit: 'Designed & Developed by Tozi',
    creditLink: 'https://tozi.dev',
  },
}

// ----- SEO -----
export const seo = {
  title: 'Adiyash Gym Mumbai - Premium Fitness Studio',
  description: 'Transform your body at Mumbai\'s premium gym. Expert trainers, 7 locations, and state-of-the-art facilities.',
  ogImage: '/og-image.jpg',
  keywords: 'gym Mumbai, fitness studio, personal training, weight loss, strength training',
}