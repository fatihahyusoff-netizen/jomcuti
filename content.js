/* =========================================================================
   JOM CUTI — CONTENT FILE
   =========================================================================
   Edit this file to change any text, price, destination, package,
   testimonial, or photo on the site. See README.md for full instructions.
   ========================================================================= */

window.JOM_CUTI_CONTENT = {

  site: {
    name: "Jom Cuti",
    tagline: "Malaysia holidays, made easy.",
    whatsappNumber: "601135020551",   // country code + number, no + and no spaces
    bookingEmail: "fatihahyusoff@ai-lumina.io",
  },

  hero: {
    eyebrow: "Your dream Malaysian holiday starts here",
    headline: "Let's Cuti, Malaysia!",
    subheadline:
      "From Langkawi's shores to the cool hills of Cameron Highlands — we plan it, you just pack. Easy holidays, honest prices, memories that last.",
    primaryButtonText: "Explore Destinations",
    secondaryButtonText: "Plan My Trip",
    floatingStamps: [
      { label: "Langkawi", emoji: "🏝️" },
      { label: "Penang", emoji: "🍜" },
      { label: "Cameron", emoji: "🍃" },
      { label: "Melaka", emoji: "🏛️" },
    ],
  },

  // "category" is used by the destination filter buttons.
  // "tags" are just the small pills shown on each card (can differ from category).
  destinations: [
    {
      id: "langkawi",
      name: "Langkawi",
      state: "Kedah",
      category: "Beach & Islands",
      tags: ["Beach & Islands", "Honeymoon"],
      priceFrom: 320,
      description:
        "A legendary island with crystal-clear beaches, waterfalls and jaw-dropping sunsets from the Sky Bridge.",
      image: "",
      iconEmoji: "🏝️",
      iconColor: "#0E7C7B",
      lat: 6.3500,
      lng: 99.8000,
    },
    {
      id: "penang",
      name: "Penang",
      state: "Penang",
      category: "Food & Heritage",
      tags: ["Food", "Heritage"],
      priceFrom: 250,
      description:
        "A street-food paradise and colourful George Town street art — every corner has a story to tell.",
      image: "",
      iconEmoji: "🍜",
      iconColor: "#E0384B",
      lat: 5.4141,
      lng: 100.3288,
    },
    {
      id: "cameron",
      name: "Cameron Highlands",
      state: "Pahang",
      category: "Nature & Adventure",
      tags: ["Nature", "Cool Climate"],
      priceFrom: 210,
      description:
        "Rolling green tea plantations, year-round cool weather, and strawberries fresh from the farm.",
      image: "",
      iconEmoji: "🍃",
      iconColor: "#3F8F5B",
      lat: 4.4700,
      lng: 101.3800,
    },
    {
      id: "kl",
      name: "Kuala Lumpur",
      state: "Federal Territory",
      category: "City & Culture",
      tags: ["City Life", "Shopping"],
      priceFrom: 180,
      description:
        "The iconic Petronas Twin Towers skyline, lively night markets, and entertainment that never sleeps.",
      image: "",
      iconEmoji: "🏙️",
      iconColor: "#F0A83E",
      lat: 3.1390,
      lng: 101.6869,
    },
    {
      id: "melaka",
      name: "Melaka",
      state: "Melaka",
      category: "Food & Heritage",
      tags: ["Heritage", "History"],
      priceFrom: 190,
      description:
        "A UNESCO heritage town with historic buildings, quirky decorated trishaws, and neon lights after dark.",
      image: "",
      iconEmoji: "🏛️",
      iconColor: "#B8283A",
      lat: 2.1896,
      lng: 102.2501,
    },
    {
      id: "kk",
      name: "Kota Kinabalu",
      state: "Sabah",
      category: "Nature & Adventure",
      tags: ["Nature", "Adventure"],
      priceFrom: 350,
      description:
        "Gateway to Mount Kinabalu and crystal-clear coral islands — a paradise for snorkelling and hiking.",
      image: "",
      iconEmoji: "⛰️",
      iconColor: "#0A5C5B",
      lat: 5.9804,
      lng: 116.0735,
    },
  ],

  packages: [
    {
      id: "langkawi-escape",
      name: "Langkawi Island Escape",
      nights: 3,
      destinationId: "langkawi",
      price: 899,
      includes: [
        "2 nights beachfront resort stay",
        "Langkawi Sky Bridge & Cable Car tickets",
        "Full-day island hopping tour",
        "Daily breakfast",
        "Airport transfers",
      ],
    },
    {
      id: "penang-food-trail",
      name: "Penang Heritage & Food Trail",
      nights: 2,
      destinationId: "penang",
      price: 549,
      includes: [
        "2 nights hotel stay in George Town",
        "Guided heritage & street art walking tour",
        "Evening food trail with a local guide",
        "Daily breakfast",
        "Airport transfers",
      ],
    },
    {
      id: "cameron-cool-retreat",
      name: "Cameron Highlands Cool Retreat",
      nights: 2,
      destinationId: "cameron",
      price: 479,
      includes: [
        "2 nights highland chalet stay",
        "BOH Tea Plantation tour",
        "Strawberry farm & vegetable market visit",
        "Daily breakfast",
        "Round-trip transfer from KL",
      ],
    },
    {
      id: "sabah-rainforest-reef",
      name: "Sabah Rainforest & Reef Adventure",
      nights: 4,
      destinationId: "kk",
      price: 1499,
      includes: [
        "4 nights (city + island)",
        "Snorkelling at Manukan & Sapi Islands",
        "Kinabalu Park & hot springs tour",
        "Daily breakfast",
        "Airport & inter-island transfers",
      ],
    },
  ],

  trust: {
    heading: "Why Jom Cuti?",
    subheading: "We make your holiday easy, from planning to touchdown back home.",
    points: [
      {
        emoji: "💰",
        title: "Honest Pricing",
        text: "No hidden fees. What you see is what you pay.",
      },
      {
        emoji: "🧭",
        title: "Thoughtfully Planned",
        text: "Every package is checked by a local team who knows the destination.",
      },
      {
        emoji: "💬",
        title: "Support Anytime",
        text: "Reach us anytime on WhatsApp or email, before and during your trip.",
      },
      {
        emoji: "🔄",
        title: "Easy Date Changes",
        text: "Plans changed? We'll help you rearrange, hassle-free.",
      },
    ],
  },

  testimonialsHeading: "Traveller Stories",

  testimonials: [
    {
      name: "Siti & Family",
      location: "Shah Alam",
      rating: 5,
      quote:
        "The Langkawi package was totally worth it! The kids loved island hopping and we still got to relax. Booking again next year.",
    },
    {
      name: "Arjun",
      location: "Singapore",
      rating: 5,
      quote:
        "The Penang food trail was next level. Our local guide took us to places regular tourists never find. Super knowledgeable!",
    },
    {
      name: "Mei Ling",
      location: "Kuala Lumpur",
      rating: 4,
      quote:
        "Cameron Highlands was cool and peaceful, perfect for escaping the city buzz. Booking was a breeze over WhatsApp too.",
    },
    {
      name: "Wei Jian",
      location: "Johor Bahru",
      rating: 5,
      quote:
        "The Sabah package was seamless from start to finish. Snorkelling at Manukan Island was the highlight of our whole year.",
    },
  ],

  adBanner: {
    enabled: true,
    text: "🎉 Merdeka Promo: RM50 off package bookings before 31 August!",
    ctaText: "Book Now",
    ctaLink: "#booking",
  },

  booking: {
    heading: "Plan Your Trip",
    subheading:
      "Fill in your details below — we'll follow up on WhatsApp or email to confirm your booking.",
    whatsappMessageIntro: "Hi, I'd like to book a holiday through Jom Cuti:",
    emailSubject: "New Booking Request — Jom Cuti",
    emailIntro: "Hi Jom Cuti team, I'd like to book a holiday:",
  },

  footer: {
    text: "Jom Cuti — made with ❤️ for Malaysian holiday lovers.",
  },
};
