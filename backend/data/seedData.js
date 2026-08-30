const products = [
  {
    id: 'balcony-herb-kit',
    title: 'Balcony Herb Starter Kit',
    type: 'product',
    category: 'Garden Kits',
    image:
      'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=900&q=80',
    description:
      'A compact planter kit with basil, mint, coriander, compost pods, and recycled coir pots for small-space growing.',
    price: 'LKR 3,200',
    availability: 'In stock',
  },
  {
    id: 'organic-compost-bag',
    title: 'Organic Compost Bag',
    type: 'product',
    category: 'Soil Care',
    image:
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=900&q=80',
    description:
      'Nutrient-rich compost made from community food scraps and dry leaves for vegetable beds and container gardens.',
    price: 'LKR 850',
    availability: 'In stock',
  },
  {
    id: 'seasonal-veggie-box',
    title: 'Seasonal Veggie Box',
    type: 'product',
    category: 'Fresh Produce',
    image:
      'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80',
    description:
      'A weekly box of locally grown greens, gourds, chillies, and herbs sourced from urban community gardens.',
    price: 'LKR 2,500',
    availability: 'Limited weekly harvest',
  },
]

const events = [
  {
    id: 'community-harvest-day',
    title: 'Community Harvest Day',
    type: 'event',
    category: 'Community',
    image:
      'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80',
    description:
      'Join residents and growers for a shared morning harvest, seed exchange, and zero-waste produce table.',
    price: 'Free',
    availability: 'Open registration',
    date: '2026-06-06',
  },
  {
    id: 'urban-farmers-market',
    title: 'Urban Farmers Market',
    type: 'event',
    category: 'Market',
    image:
      'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=900&q=80',
    description:
      'A weekend market featuring rooftop growers, compost makers, seed savers, and reusable household goods.',
    price: 'Free entry',
    availability: 'Every second Saturday',
    date: '2026-06-13',
  },
]

const workshops = [
  {
    id: 'composting-basics',
    title: 'Composting Basics',
    type: 'workshop',
    category: 'Composting',
    image:
      'https://images.unsplash.com/photo-1621460248083-6271cc4437a8?auto=format&fit=crop&w=900&q=80',
    description:
      'Learn how to turn kitchen scraps into healthy compost using low-odor methods suitable for apartments.',
    price: 'LKR 1,500',
    availability: '12 seats available',
    date: '2026-06-08',
  },
  {
    id: 'container-gardening',
    title: 'Container Gardening for Small Spaces',
    type: 'workshop',
    category: 'Growing Skills',
    image:
      'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?auto=format&fit=crop&w=900&q=80',
    description:
      'Plan a productive balcony garden with recycled containers, water-wise planting, and edible companion plants.',
    price: 'LKR 2,000',
    availability: '18 seats available',
    date: '2026-06-15',
  },
]

const bookings = [
  {
    id: 'booking-001',
    name: 'Sample User',
    email: 'sample@example.com',
    itemId: 'composting-basics',
    itemTitle: 'Composting Basics',
    itemType: 'workshop',
    bookingDateTime: '2026-06-08T10:00',
    participants: 1,
    notes: 'Seed booking for API testing.',
  },
]

module.exports = {
  products,
  events,
  workshops,
  bookings,
}
