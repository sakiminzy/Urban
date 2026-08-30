const db = require('./db')

const products = [
  {
    id: 'balcony-herb-kit',
    title: 'Balcony Herb Starter Kit',
    category: 'Garden Kits',
    image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=900&q=80',
    description: 'A compact planter kit with basil, mint, coriander, compost pods, and recycled coir pots for small-space growing.',
    price: 'LKR 3,200',
    availability: 'In stock',
  },
  {
    id: 'organic-compost-bag',
    title: 'Organic Compost Bag',
    category: 'Soil Care',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=900&q=80',
    description: 'Nutrient-rich compost made from community food scraps and dry leaves for vegetable beds and container gardens.',
    price: 'LKR 850',
    availability: 'In stock',
  },
  {
    id: 'seasonal-veggie-box',
    title: 'Seasonal Veggie Box',
    category: 'Fresh Produce',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80',
    description: 'A weekly box of locally grown greens, gourds, chillies, and herbs sourced from urban community gardens.',
    price: 'LKR 2,500',
    availability: 'Limited weekly harvest',
  },
  {
    id: 'reusable-produce-bags',
    title: 'Reusable Produce Bags',
    category: 'Eco Supplies',
    image: 'https://images.unsplash.com/photo-1604187351574-c75ca79f5807?auto=format&fit=crop&w=900&q=80',
    description: 'Washable cotton mesh bags for plastic-free shopping at farmers markets and neighbourhood stores.',
    price: 'LKR 1,100',
    availability: 'In stock',
  },
  {
    id: 'rainwater-planter',
    title: 'Self-Watering Rain Planter',
    category: 'Water Saving',
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=900&q=80',
    description: 'A recycled-plastic planter designed to conserve water for herbs and leafy greens.',
    price: 'LKR 4,400',
    availability: 'Low stock',
  },
  {
    id: 'seed-saving-kit',
    title: 'Seed Saving Kit',
    category: 'Garden Kits',
    image: 'https://images.unsplash.com/photo-1492496913980-501348b61469?auto=format&fit=crop&w=900&q=80',
    description: 'Labelled envelopes, drying tray, and guide cards for saving seeds from home harvests.',
    price: 'LKR 1,650',
    availability: 'In stock',
  },
]

const events = [
  {
    id: 'community-harvest-day',
    title: 'Community Harvest Day',
    category: 'Community',
    image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80',
    description: 'Join residents and growers for a shared morning harvest, seed exchange, and zero-waste produce table.',
    price: 'Free',
    availability: 'Open registration',
    date: '2026-06-06',
    location: 'Colombo Community Garden',
  },
  {
    id: 'urban-farmers-market',
    title: 'Urban Farmers Market',
    category: 'Market',
    image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=900&q=80',
    description: 'A weekend market featuring rooftop growers, compost makers, seed savers, and reusable household goods.',
    price: 'Free entry',
    availability: 'Every second Saturday',
    date: '2026-06-13',
    location: 'Viharamahadevi Park',
  },
  {
    id: 'seed-swap-social',
    title: 'Seed Swap Social',
    category: 'Education',
    image: 'https://images.unsplash.com/photo-1492496913980-501348b61469?auto=format&fit=crop&w=900&q=80',
    description: 'Bring saved seeds, meet local gardeners, and learn how to label and store seeds for the next season.',
    price: 'LKR 500',
    availability: '25 seats available',
    date: '2026-06-20',
    location: 'Urban Harvest Hub Studio',
  },
  {
    id: 'zero-waste-pantry-day',
    title: 'Zero-Waste Pantry Day',
    category: 'Lifestyle',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80',
    description: 'Meet vendors offering refill staples, reusable containers, and practical waste-reduction tips.',
    price: 'Free',
    availability: 'Open to public',
    date: '2026-07-04',
    location: 'Good Market Colombo',
  },
  {
    id: 'rooftop-garden-tour',
    title: 'Rooftop Garden Tour',
    category: 'Community',
    image: 'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?auto=format&fit=crop&w=900&q=80',
    description: 'Visit a working rooftop garden and learn how city spaces can become productive growing areas.',
    price: 'LKR 750',
    availability: '15 seats available',
    date: '2026-07-11',
    location: 'Fort Rooftop Collective',
  },
  {
    id: 'local-growers-meetup',
    title: 'Local Growers Meetup',
    category: 'Networking',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=900&q=80',
    description: 'A casual meetup for urban growers to share harvest plans, soil tips, and collaboration ideas.',
    price: 'Free',
    availability: 'Open registration',
    date: '2026-07-18',
    location: 'Nugegoda Green Hall',
  },
  {
    id: 'eco-family-market',
    title: 'Eco Family Market',
    category: 'Market',
    image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=900&q=80',
    description: 'A family-friendly market with local snacks, plant stalls, repair stations, and eco activity corners.',
    price: 'Free entry',
    availability: 'Weekend event',
    date: '2026-07-25',
    location: 'Independence Arcade Courtyard',
  },
  {
    id: 'community-clean-green-day',
    title: 'Community Clean & Green Day',
    category: 'Community',
    image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=900&q=80',
    description: 'Help clean a neighbourhood space and plant edible herbs in shared containers for residents.',
    price: 'Free',
    availability: 'Volunteers welcome',
    date: '2026-08-01',
    location: 'Borella Community Lane',
  },
  {
    id: 'sustainable-cooking-demo',
    title: 'Sustainable Cooking Demo',
    category: 'Education',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80',
    description: 'Learn low-waste meal planning using seasonal vegetables, herbs, and simple preservation methods.',
    price: 'LKR 900',
    availability: '30 seats available',
    date: '2026-08-08',
    location: 'Urban Harvest Hub Kitchen',
  },
  {
    id: 'urban-compost-open-day',
    title: 'Urban Compost Open Day',
    category: 'Composting',
    image: 'https://images.unsplash.com/photo-1621460248083-6271cc4437a8?auto=format&fit=crop&w=900&q=80',
    description: 'Tour a community composting site and learn how neighbourhood food scraps are turned into garden nutrients.',
    price: 'Free',
    availability: 'Open to public',
    date: '2026-08-15',
    location: 'Colombo Compost Collective',
  },
  {
    id: 'green-startup-showcase',
    title: 'Green Startup Showcase',
    category: 'Networking',
    image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80',
    description: 'Meet small sustainability businesses working on refill systems, edible gardens, compost, and circular products.',
    price: 'LKR 1,000',
    availability: '40 seats available',
    date: '2026-08-22',
    location: 'Colombo Innovation Hub',
  },
  {
    id: 'school-garden-volunteer-day',
    title: 'School Garden Volunteer Day',
    category: 'Community',
    image: 'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?auto=format&fit=crop&w=900&q=80',
    description: 'Help prepare raised beds, plant herbs, and set up simple compost systems for a local school garden.',
    price: 'Free',
    availability: 'Volunteers welcome',
    date: '2026-08-29',
    location: 'Rajagiriya Model School',
  },
  {
    id: 'sustainable-living-fair',
    title: 'Sustainable Living Fair',
    category: 'Lifestyle',
    image: 'https://images.unsplash.com/photo-1604187351574-c75ca79f5807?auto=format&fit=crop&w=900&q=80',
    description: 'A one-day fair with eco product stalls, repair demos, plant swaps, and short talks on low-impact living.',
    price: 'Free entry',
    availability: 'One-day event',
    date: '2026-09-05',
    location: 'BMICH Outdoor Pavilion',
  },
]

const workshops = [
  {
    id: 'composting-basics',
    title: 'Composting Basics',
    category: 'Composting',
    image: 'https://images.unsplash.com/photo-1621460248083-6271cc4437a8?auto=format&fit=crop&w=900&q=80',
    description: 'Learn how to turn kitchen scraps into healthy compost using low-odor methods suitable for apartments.',
    price: 'LKR 1,500',
    availability: '12 seats available',
    date: '2026-06-08',
    location: 'Urban Harvest Hub Studio',
  },
  {
    id: 'container-gardening',
    title: 'Container Gardening for Small Spaces',
    category: 'Growing Skills',
    image: 'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?auto=format&fit=crop&w=900&q=80',
    description: 'Plan a productive balcony garden with recycled containers, water-wise planting, and edible companion plants.',
    price: 'LKR 2,000',
    availability: '18 seats available',
    date: '2026-06-15',
    location: 'Colombo Community Garden',
  },
  {
    id: 'rainwater-harvesting',
    title: 'Rainwater Harvesting Setup',
    category: 'Water Saving',
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=900&q=80',
    description: 'A practical session on collecting, filtering, and safely using rainwater for home vegetable gardens.',
    price: 'LKR 2,400',
    availability: '10 seats available',
    date: '2026-06-22',
    location: 'Urban Harvest Hub Studio',
  },
  {
    id: 'seed-saving',
    title: 'Seed Saving for Beginners',
    category: 'Growing Skills',
    image: 'https://images.unsplash.com/photo-1492496913980-501348b61469?auto=format&fit=crop&w=900&q=80',
    description: 'Understand seed selection, drying, storage, and labelling for resilient home food gardens.',
    price: 'LKR 1,800',
    availability: '16 seats available',
    date: '2026-07-01',
    location: 'Urban Harvest Hub Studio',
  },
  {
    id: 'natural-pest-control',
    title: 'Natural Pest Control',
    category: 'Soil Care',
    image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=900&q=80',
    description: 'Use companion planting, neem sprays, and healthy soil methods to reduce garden pests naturally.',
    price: 'LKR 2,100',
    availability: '14 seats available',
    date: '2026-07-08',
    location: 'Nawala Learning Garden',
  },
  {
    id: 'balcony-microgreens',
    title: 'Balcony Microgreens',
    category: 'Growing Skills',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80',
    description: 'Grow nutrient-rich microgreens indoors with trays, simple light setups, and reusable growing media.',
    price: 'LKR 1,600',
    availability: '20 seats available',
    date: '2026-07-15',
    location: 'Urban Harvest Hub Studio',
  },
  {
    id: 'plastic-free-home',
    title: 'Plastic-Free Home Setup',
    category: 'Lifestyle',
    image: 'https://images.unsplash.com/photo-1604187351574-c75ca79f5807?auto=format&fit=crop&w=900&q=80',
    description: 'Build practical routines for refills, reusable storage, and low-waste shopping without overwhelming your home.',
    price: 'LKR 1,900',
    availability: '18 seats available',
    date: '2026-07-22',
    location: 'Urban Harvest Hub Studio',
  },
  {
    id: 'urban-bee-friendly-gardens',
    title: 'Urban Bee-Friendly Gardens',
    category: 'Biodiversity',
    image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80',
    description: 'Choose flowering herbs, safe pest practices, and small-space designs that support city pollinators.',
    price: 'LKR 2,200',
    availability: '12 seats available',
    date: '2026-07-29',
    location: 'Colombo Community Garden',
  },
  {
    id: 'food-preservation-basics',
    title: 'Food Preservation Basics',
    category: 'Food Skills',
    image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=900&q=80',
    description: 'Learn simple pickling, drying, and storage techniques to make seasonal harvests last longer.',
    price: 'LKR 2,300',
    availability: '15 seats available',
    date: '2026-08-05',
    location: 'Urban Harvest Hub Kitchen',
  },
  {
    id: 'vertical-garden-design',
    title: 'Vertical Garden Design',
    category: 'Growing Skills',
    image: 'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?auto=format&fit=crop&w=900&q=80',
    description: 'Design a compact vertical garden using recycled materials, modular planters, and water-wise planting plans.',
    price: 'LKR 2,600',
    availability: '14 seats available',
    date: '2026-08-12',
    location: 'Urban Harvest Hub Studio',
  },
  {
    id: 'soil-health-lab',
    title: 'Soil Health Lab',
    category: 'Soil Care',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=900&q=80',
    description: 'Test soil texture, drainage, organic matter, and simple amendments for healthier container gardens.',
    price: 'LKR 2,500',
    availability: '12 seats available',
    date: '2026-08-19',
    location: 'Nawala Learning Garden',
  },
  {
    id: 'eco-market-vendor-training',
    title: 'Eco Market Vendor Training',
    category: 'Business Skills',
    image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=900&q=80',
    description: 'Learn pricing, display, food safety basics, and low-waste packaging for selling at community markets.',
    price: 'LKR 3,000',
    availability: '20 seats available',
    date: '2026-08-26',
    location: 'Urban Harvest Hub Studio',
  },
  {
    id: 'home-mushroom-growing',
    title: 'Home Mushroom Growing',
    category: 'Food Skills',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80',
    description: 'Start small-scale oyster mushroom growing using safe, simple methods and locally available materials.',
    price: 'LKR 2,800',
    availability: '16 seats available',
    date: '2026-09-02',
    location: 'Urban Harvest Hub Kitchen',
  },
]

const insertProduct = db.prepare(`
  INSERT OR IGNORE INTO products (id, title, category, image, description, price, availability)
  VALUES (@id, @title, @category, @image, @description, @price, @availability)
`)

const insertEvent = db.prepare(`
  INSERT OR IGNORE INTO events (id, title, category, image, description, price, availability, date, location)
  VALUES (@id, @title, @category, @image, @description, @price, @availability, @date, @location)
`)

const insertWorkshop = db.prepare(`
  INSERT OR IGNORE INTO workshops (id, title, category, image, description, price, availability, date, location)
  VALUES (@id, @title, @category, @image, @description, @price, @availability, @date, @location)
`)

function getCount(table) {
  return db.prepare(`SELECT COUNT(*) AS count FROM ${table}`).get().count
}

function seedCatalog({ reset = false } = {}) {
  const seedDatabase = db.transaction(() => {
    if (reset) {
      db.prepare('DELETE FROM bookings').run()
      db.prepare('DELETE FROM products').run()
      db.prepare('DELETE FROM events').run()
      db.prepare('DELETE FROM workshops').run()
    }

    products.forEach((product) => insertProduct.run(product))
    events.forEach((event) => insertEvent.run(event))
    workshops.forEach((workshop) => insertWorkshop.run(workshop))
  })

  seedDatabase()
}

function seedCatalogIfEmpty() {
  const beforeCount =
    getCount('products') +
    getCount('events') +
    getCount('workshops')

  seedCatalog()

  const afterCount =
    getCount('products') +
    getCount('events') +
    getCount('workshops')

  return afterCount > beforeCount
}

if (require.main === module) {
  seedCatalog({ reset: true })
  console.log('SQLite database initialized with Urban Harvest Hub seed data.')
}

module.exports = {
  seedCatalog,
  seedCatalogIfEmpty,
}
