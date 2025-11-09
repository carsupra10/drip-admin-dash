// Mock data for DripXplore Admin Panel

export const partnersData = [
  {
    id: "ptr_001",
    name: "Urban Fashion Store",
    owner: "Sarah Wilson",
    email: "sarah@urbanfashion.com",
    status: "active",
    productsCount: 234,
    ordersCount: 1567,
    revenue: "$45,230",
    joinDate: "2024-01-15",
    driveFolder: "https://drive.google.com/drive/folders/1ABC..."
  },
  {
    id: "ptr_002",
    name: "Tech Gadgets Hub",
    owner: "David Lee",
    email: "david@techgadgets.com",
    status: "active",
    productsCount: 189,
    ordersCount: 2341,
    revenue: "$78,900",
    joinDate: "2024-02-20",
    driveFolder: "https://drive.google.com/drive/folders/2DEF..."
  },
  {
    id: "ptr_003",
    name: "Home Decor Paradise",
    owner: "Emma Brown",
    email: "emma@homedecor.com",
    status: "pending",
    productsCount: 156,
    ordersCount: 892,
    revenue: "$32,450",
    joinDate: "2024-03-10",
    driveFolder: "https://drive.google.com/drive/folders/3GHI..."
  }
];

export const productsData = [
  {
    id: "prd_001",
    name: "Classic White T-Shirt",
    partner: "Urban Fashion Store",
    partnerId: "ptr_001",
    category: "Clothing",
    basePrice: 29.99,
    status: "active",
    stock: 245,
    createdAt: "2024-10-15"
  },
  {
    id: "prd_002",
    name: "Wireless Bluetooth Headphones",
    partner: "Tech Gadgets Hub",
    partnerId: "ptr_002",
    category: "Electronics",
    basePrice: 89.99,
    status: "active",
    stock: 254,
    createdAt: "2024-10-20"
  },
  {
    id: "prd_003",
    name: "Modern Table Lamp",
    partner: "Home Decor Paradise",
    partnerId: "ptr_003",
    category: "Home",
    basePrice: 45.50,
    status: "pending",
    stock: 87,
    createdAt: "2024-11-01"
  }
];

export const ordersData = [
  {
    id: "ORD-2024-0001",
    customer: "John Doe",
    email: "john@example.com",
    total: "$234.50",
    status: "delivered",
    date: "2024-11-05",
    items: 3
  },
  {
    id: "ORD-2024-0002",
    customer: "Jane Smith",
    email: "jane@example.com",
    total: "$89.99",
    status: "shipped",
    date: "2024-11-07",
    items: 1
  },
  {
    id: "ORD-2024-0003",
    customer: "Mike Johnson",
    email: "mike@example.com",
    total: "$456.00",
    status: "processing",
    date: "2024-11-09",
    items: 5
  }
];

export const reviewsData = [
  {
    id: "rev_001",
    product: "Classic White T-Shirt",
    productId: "prd_001",
    user: "John Doe",
    rating: 5,
    comment: "Great quality! Fits perfectly and very comfortable.",
    status: "approved",
    date: "2024-11-05"
  },
  {
    id: "rev_002",
    product: "Wireless Bluetooth Headphones",
    productId: "prd_002",
    user: "Jane Smith",
    rating: 4,
    comment: "Good sound quality but battery life could be better.",
    status: "pending",
    date: "2024-11-08"
  }
];

export const offersData = [
  {
    id: "off_001",
    name: "Black Friday Sale",
    type: "PERCENTAGE",
    discount: "25%",
    partner: "All Partners",
    active: true,
    starts: "2024-11-24",
    ends: "2024-11-27",
    usage: 1234
  },
  {
    id: "off_002",
    name: "Buy 2 Get 1 Free",
    type: "BUY2GET1",
    discount: "33%",
    partner: "Urban Fashion Store",
    active: true,
    starts: "2024-11-01",
    ends: "2024-11-30",
    usage: 567
  }
];

export const usersData = [
  {
    id: "usr_001",
    username: "superadmin",
    email: "admin@dripxplore.com",
    name: "Super Administrator",
    role: "superadmin",
    totpEnabled: true,
    lastLogin: "2024-11-09 08:30"
  },
  {
    id: "usr_002",
    email: "sarah@urbanfashion.com",
    name: "Sarah Wilson",
    role: "partner_owner",
    partner: "Urban Fashion Store",
    totpEnabled: false,
    lastLogin: "2024-11-09 07:45"
  }
];

export const kpiData = {
  totalPartners: 47,
  totalProducts: 2834,
  totalOrders: 12459,
  totalRevenue: "$487,230",
  monthlyGrowth: "+12.5%",
  activeUsers: 8943,
  pendingReviews: 23,
  systemHealth: "Good"
};

export const revenueData = [
  { month: "Jan", revenue: 45230, orders: 982 },
  { month: "Feb", revenue: 52100, orders: 1124 },
  { month: "Mar", revenue: 48900, orders: 1056 },
  { month: "Apr", revenue: 61200, orders: 1389 },
  { month: "May", revenue: 58400, orders: 1267 },
  { month: "Jun", revenue: 67800, orders: 1543 }
];
