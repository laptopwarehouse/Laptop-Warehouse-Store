export type CategoryId =
  | 'gaming-laptops'
  | 'everyday-laptops'
  | 'premium-laptops'
  | 'desktops'
  | 'monitors-printers'
  | 'accessories'
  | 'phones-tablets'
  | 'software-upgrades';

export type ArtKind =
  | 'laptop'
  | 'desktop'
  | 'aio'
  | 'monitor'
  | 'printer'
  | 'phone'
  | 'tablet'
  | 'headset'
  | 'mouse'
  | 'keyboard'
  | 'controller'
  | 'software'
  | 'ram';

export interface Category {
  id: CategoryId;
  name: string;
  tagline: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: CategoryId;
  art: ArtKind;
  color: string;
  price: number;
  originalPrice?: number;
  highlights: string[];
  specs: Record<string, string>;
  freebies?: string[];
  stock: number;
  bestseller?: boolean;
  badge?: string;
  warranty: string;
  // Where this unit is physically stocked. Assigned by the AVAILABILITY map below.
  availability?: 'all' | 'metro' | 'online';
  // Marketplace listings (a button shows only where listed).
  marketplaces?: { shopee?: boolean; tiktok?: boolean; lazada?: boolean };
}

export const CATEGORIES: Category[] = [
  { id: 'gaming-laptops', name: 'Gaming Laptops', tagline: 'RTX power for ranked grinds and AAA titles' },
  { id: 'everyday-laptops', name: 'Everyday Laptops', tagline: 'Reliable picks for school, WFH and business' },
  { id: 'premium-laptops', name: 'Premium Laptops', tagline: 'Thin, light, and built to impress' },
  { id: 'desktops', name: 'Desktops & All-in-One', tagline: 'Workstations and AIOs for home and office' },
  { id: 'monitors-printers', name: 'Monitors & Printers', tagline: 'Bigger screens and ink-saving printers' },
  { id: 'accessories', name: 'Accessories', tagline: 'Headsets, mice, keyboards and controllers' },
  { id: 'phones-tablets', name: 'Phones & Tablets', tagline: 'Pocket and couch-friendly devices' },
  { id: 'software-upgrades', name: 'Software & Upgrades', tagline: 'Genuine licenses, RAM and SSD upgrades' },
];

const LAPTOP_WARRANTY = '1 year parts & service warranty';

export const PRODUCTS: Product[] = [
  // Gaming laptops
  {
    id: 'acer-nitro-v15-i5',
    name: 'Acer Nitro V 15 ANV15-52 Gaming Laptop',
    brand: 'Acer',
    category: 'gaming-laptops',
    art: 'laptop',
    color: '#e11d48',
    price: 52995,
    originalPrice: 59995,
    highlights: ['Intel Core i5-13420H', '16GB DDR5 / 512GB SSD', 'RTX 4050 6GB', '15.6" FHD 165Hz', 'Windows 11 Home'],
    specs: { Processor: 'Intel Core i5-13420H (up to 4.6GHz, 8 cores)', Graphics: 'NVIDIA GeForce RTX 4050 6GB GDDR6', Memory: '16GB DDR5-5200 (upgradeable to 32GB)', Storage: '512GB PCIe Gen4 NVMe SSD', Display: '15.6" FHD IPS 165Hz', OS: 'Windows 11 Home', Weight: '2.1 kg' },
    freebies: ['Gaming backpack', 'Wired gaming mouse'],
    stock: 8,
    bestseller: true,
    warranty: LAPTOP_WARRANTY,
  },
  {
    id: 'hp-victus-15-r5',
    name: 'HP Victus 15 fb2000 Gaming Laptop',
    brand: 'HP',
    category: 'gaming-laptops',
    art: 'laptop',
    color: '#2563eb',
    price: 47995,
    originalPrice: 54995,
    highlights: ['AMD Ryzen 5 7535HS', '16GB DDR5 / 512GB SSD', 'RTX 3050 6GB', '15.6" FHD 144Hz', 'Windows 11 Home'],
    specs: { Processor: 'AMD Ryzen 5 7535HS (6 cores, 12 threads)', Graphics: 'NVIDIA GeForce RTX 3050 6GB', Memory: '16GB DDR5-4800', Storage: '512GB PCIe NVMe SSD', Display: '15.6" FHD IPS 144Hz', OS: 'Windows 11 Home', Weight: '2.29 kg' },
    freebies: ['HP backpack'],
    stock: 12,
    bestseller: true,
    warranty: LAPTOP_WARRANTY,
  },
  {
    id: 'asus-tuf-a15-r7',
    name: 'ASUS TUF Gaming A15 FA507NVR',
    brand: 'ASUS',
    category: 'gaming-laptops',
    art: 'laptop',
    color: '#64748b',
    price: 64995,
    originalPrice: 72995,
    highlights: ['AMD Ryzen 7 7435HS', '16GB DDR5 / 512GB SSD', 'RTX 4060 8GB', '15.6" FHD 144Hz', 'Windows 11 Home'],
    specs: { Processor: 'AMD Ryzen 7 7435HS (8 cores, 16 threads)', Graphics: 'NVIDIA GeForce RTX 4060 8GB', Memory: '16GB DDR5-4800', Storage: '512GB PCIe Gen4 SSD', Display: '15.6" FHD IPS 144Hz', OS: 'Windows 11 Home', Build: 'MIL-STD-810H tested chassis' },
    freebies: ['ASUS TUF backpack', 'Gaming mouse'],
    stock: 6,
    bestseller: true,
    warranty: LAPTOP_WARRANTY,
  },
  {
    id: 'lenovo-loq-15-i5',
    name: 'Lenovo LOQ 15IRX9 Gaming Laptop',
    brand: 'Lenovo',
    category: 'gaming-laptops',
    art: 'laptop',
    color: '#0f766e',
    price: 58995,
    originalPrice: 66995,
    highlights: ['Intel Core i5-13450HX', '16GB DDR5 / 512GB SSD', 'RTX 4050 6GB', '15.6" FHD 144Hz', 'Windows 11 Home'],
    specs: { Processor: 'Intel Core i5-13450HX (10 cores)', Graphics: 'NVIDIA GeForce RTX 4050 6GB', Memory: '16GB DDR5-4800', Storage: '512GB PCIe Gen4 SSD', Display: '15.6" FHD IPS 144Hz', OS: 'Windows 11 Home + Office H&S 2021' },
    stock: 5,
    warranty: LAPTOP_WARRANTY,
  },
  {
    id: 'msi-katana-15-i7',
    name: 'MSI Katana 15 B13VFK',
    brand: 'MSI',
    category: 'gaming-laptops',
    art: 'laptop',
    color: '#dc2626',
    price: 79995,
    originalPrice: 89995,
    highlights: ['Intel Core i7-13620H', '16GB DDR5 / 1TB SSD', 'RTX 4060 8GB', '15.6" FHD 144Hz', 'Windows 11 Home'],
    specs: { Processor: 'Intel Core i7-13620H (10 cores)', Graphics: 'NVIDIA GeForce RTX 4060 8GB', Memory: '16GB DDR5-5200', Storage: '1TB PCIe Gen4 SSD', Display: '15.6" FHD IPS 144Hz', OS: 'Windows 11 Home', Keyboard: '4-zone RGB backlit' },
    stock: 3,
    badge: 'Hot',
    warranty: LAPTOP_WARRANTY,
  },
  {
    id: 'asus-rog-strix-g16',
    name: 'ASUS ROG Strix G16 G614JV',
    brand: 'ASUS',
    category: 'gaming-laptops',
    art: 'laptop',
    color: '#7c3aed',
    price: 99995,
    originalPrice: 112995,
    highlights: ['Intel Core i7-13650HX', '16GB DDR5 / 1TB SSD', 'RTX 4060 8GB', '16" FHD+ 165Hz', 'Windows 11 Home'],
    specs: { Processor: 'Intel Core i7-13650HX (14 cores)', Graphics: 'NVIDIA GeForce RTX 4060 8GB', Memory: '16GB DDR5-4800', Storage: '1TB PCIe Gen4 SSD', Display: '16" FHD+ 16:10 165Hz', OS: 'Windows 11 Home' },
    stock: 4,
    warranty: LAPTOP_WARRANTY,
  },

  // Everyday laptops
  {
    id: 'acer-aspire-lite-15',
    name: 'Acer Aspire Lite AL15-52',
    brand: 'Acer',
    category: 'everyday-laptops',
    art: 'laptop',
    color: '#94a3b8',
    price: 26995,
    originalPrice: 31995,
    highlights: ['Intel Core i5-1235U', '16GB RAM / 512GB SSD', 'Intel Iris Xe', '15.6" FHD IPS', 'Windows 11 Home'],
    specs: { Processor: 'Intel Core i5-1235U (10 cores)', Graphics: 'Intel Iris Xe', Memory: '16GB DDR4', Storage: '512GB NVMe SSD', Display: '15.6" FHD IPS', OS: 'Windows 11 Home', Weight: '1.6 kg' },
    freebies: ['Laptop sleeve'],
    stock: 20,
    bestseller: true,
    warranty: LAPTOP_WARRANTY,
  },
  {
    id: 'asus-vivobook-15-i3',
    name: 'ASUS Vivobook Go 15 E1504FA',
    brand: 'ASUS',
    category: 'everyday-laptops',
    art: 'laptop',
    color: '#1e3a8a',
    price: 22995,
    originalPrice: 27995,
    highlights: ['AMD Ryzen 5 7520U', '8GB LPDDR5 / 512GB SSD', 'AMD Radeon Graphics', '15.6" FHD', 'Windows 11 Home'],
    specs: { Processor: 'AMD Ryzen 5 7520U (4 cores, 8 threads)', Graphics: 'AMD Radeon 610M', Memory: '8GB LPDDR5 (soldered)', Storage: '512GB NVMe SSD', Display: '15.6" FHD', OS: 'Windows 11 Home + Office H&S 2021' },
    stock: 15,
    bestseller: true,
    warranty: LAPTOP_WARRANTY,
  },
  {
    id: 'lenovo-ideapad-slim3-i5',
    name: 'Lenovo IdeaPad Slim 3 15IAH8',
    brand: 'Lenovo',
    category: 'everyday-laptops',
    art: 'laptop',
    color: '#475569',
    price: 31995,
    originalPrice: 36995,
    highlights: ['Intel Core i5-12450H', '16GB RAM / 512GB SSD', 'Intel UHD Graphics', '15.6" FHD IPS', 'Windows 11 Home'],
    specs: { Processor: 'Intel Core i5-12450H (8 cores)', Graphics: 'Intel UHD Graphics', Memory: '16GB LPDDR5', Storage: '512GB NVMe SSD', Display: '15.6" FHD IPS 300 nits', OS: 'Windows 11 Home + Office H&S 2021' },
    stock: 10,
    warranty: LAPTOP_WARRANTY,
  },
  {
    id: 'hp-15-fd-i5',
    name: 'HP Laptop 15-fd0000',
    brand: 'HP',
    category: 'everyday-laptops',
    art: 'laptop',
    color: '#9ca3af',
    price: 29995,
    originalPrice: 34995,
    highlights: ['Intel Core i5-1334U', '8GB RAM / 512GB SSD', 'Intel Iris Xe', '15.6" FHD', 'Windows 11 Home'],
    specs: { Processor: 'Intel Core i5-1334U (10 cores)', Graphics: 'Intel Iris Xe', Memory: '8GB DDR4 (upgradeable)', Storage: '512GB NVMe SSD', Display: '15.6" FHD anti-glare', OS: 'Windows 11 Home + Office H&S 2021' },
    stock: 9,
    warranty: LAPTOP_WARRANTY,
  },
  {
    id: 'chuwi-corebook-x',
    name: 'Chuwi CoreBook X 14"',
    brand: 'Chuwi',
    category: 'everyday-laptops',
    art: 'laptop',
    color: '#52525b',
    price: 21995,
    originalPrice: 25995,
    highlights: ['Intel Core i5-1235U', '16GB RAM / 512GB SSD', 'Intel Iris Xe', '14" 2.2K IPS', 'Windows 11 Home'],
    specs: { Processor: 'Intel Core i5-1235U', Graphics: 'Intel Iris Xe', Memory: '16GB LPDDR4x', Storage: '512GB NVMe SSD', Display: '14" 2.2K IPS 16:10', OS: 'Windows 11 Home', Body: 'Aluminum unibody' },
    stock: 7,
    warranty: LAPTOP_WARRANTY,
  },
  {
    id: 'dell-vostro-3520',
    name: 'Dell Vostro 15 3520',
    brand: 'Dell',
    category: 'everyday-laptops',
    art: 'laptop',
    color: '#111827',
    price: 33995,
    originalPrice: 38995,
    highlights: ['Intel Core i5-1235U', '8GB RAM / 512GB SSD', 'Intel Iris Xe', '15.6" FHD 120Hz', 'Windows 11 Pro'],
    specs: { Processor: 'Intel Core i5-1235U', Graphics: 'Intel Iris Xe', Memory: '8GB DDR4', Storage: '512GB NVMe SSD', Display: '15.6" FHD 120Hz', OS: 'Windows 11 Pro', Security: 'Fingerprint reader' },
    stock: 6,
    warranty: LAPTOP_WARRANTY,
  },

  // Premium laptops
  {
    id: 'apple-macbook-air-m3-13',
    name: 'Apple MacBook Air 13" M3',
    brand: 'Apple',
    category: 'premium-laptops',
    art: 'laptop',
    color: '#cbd5e1',
    price: 62990,
    originalPrice: 69990,
    highlights: ['Apple M3 8-core CPU', '16GB unified / 256GB SSD', '8-core GPU', '13.6" Liquid Retina', 'macOS'],
    specs: { Chip: 'Apple M3 (8-core CPU, 8-core GPU)', Memory: '16GB unified memory', Storage: '256GB SSD', Display: '13.6" Liquid Retina 500 nits', Battery: 'Up to 18 hours', OS: 'macOS', Weight: '1.24 kg' },
    stock: 10,
    bestseller: true,
    badge: 'Authorized',
    warranty: '1 year Apple limited warranty',
  },
  {
    id: 'asus-zenbook-14-oled',
    name: 'ASUS Zenbook 14 OLED UX3405MA',
    brand: 'ASUS',
    category: 'premium-laptops',
    art: 'laptop',
    color: '#1e40af',
    price: 64995,
    originalPrice: 72995,
    highlights: ['Intel Core Ultra 7 155H', '16GB LPDDR5X / 1TB SSD', 'Intel Arc Graphics', '14" 3K OLED 120Hz', 'Windows 11 Home'],
    specs: { Processor: 'Intel Core Ultra 7 155H (AI Boost NPU)', Graphics: 'Intel Arc Graphics', Memory: '16GB LPDDR5X', Storage: '1TB PCIe Gen4 SSD', Display: '14" 3K OLED 120Hz', OS: 'Windows 11 Home + Office H&S 2021', Weight: '1.2 kg' },
    stock: 5,
    warranty: LAPTOP_WARRANTY,
  },
  {
    id: 'hp-omnibook-x-14',
    name: 'HP OmniBook X 14 AI PC',
    brand: 'HP',
    category: 'premium-laptops',
    art: 'laptop',
    color: '#e5e7eb',
    price: 69995,
    originalPrice: 79995,
    highlights: ['Snapdragon X Elite', '16GB RAM / 1TB SSD', 'Qualcomm Adreno', '14" 2.2K touch', 'Windows 11 Home'],
    specs: { Processor: 'Snapdragon X Elite X1E-78-100 (45 TOPS NPU)', Graphics: 'Qualcomm Adreno', Memory: '16GB LPDDR5x', Storage: '1TB SSD', Display: '14" 2.2K IPS touch', OS: 'Windows 11 Home (Copilot+ PC)' },
    stock: 4,
    badge: 'New',
    warranty: LAPTOP_WARRANTY,
  },
  {
    id: 'lenovo-yoga-slim-7',
    name: 'Lenovo Yoga Slim 7 14IMH9',
    brand: 'Lenovo',
    category: 'premium-laptops',
    art: 'laptop',
    color: '#334155',
    price: 67995,
    originalPrice: 75995,
    highlights: ['Intel Core Ultra 7 155H', '32GB LPDDR5X / 1TB SSD', 'Intel Arc Graphics', '14" 2.8K OLED', 'Windows 11 Home'],
    specs: { Processor: 'Intel Core Ultra 7 155H', Graphics: 'Intel Arc Graphics', Memory: '32GB LPDDR5X', Storage: '1TB PCIe Gen4 SSD', Display: '14" 2.8K OLED 120Hz', OS: 'Windows 11 Home + Office H&S 2021' },
    stock: 3,
    warranty: LAPTOP_WARRANTY,
  },
  {
    id: 'apple-macbook-pro-14-m4',
    name: 'Apple MacBook Pro 14" M4',
    brand: 'Apple',
    category: 'premium-laptops',
    art: 'laptop',
    color: '#71717a',
    price: 99990,
    originalPrice: 105990,
    highlights: ['Apple M4 10-core CPU', '16GB unified / 512GB SSD', '10-core GPU', '14.2" Liquid Retina XDR', 'macOS'],
    specs: { Chip: 'Apple M4 (10-core CPU, 10-core GPU)', Memory: '16GB unified memory', Storage: '512GB SSD', Display: '14.2" Liquid Retina XDR', Battery: 'Up to 24 hours', OS: 'macOS' },
    stock: 4,
    badge: 'Authorized',
    warranty: '1 year Apple limited warranty',
  },

  // Desktops
  {
    id: 'lenovo-ideacentre-aio-3',
    name: 'Lenovo IdeaCentre AIO 3 24"',
    brand: 'Lenovo',
    category: 'desktops',
    art: 'aio',
    color: '#0f172a',
    price: 38995,
    originalPrice: 44995,
    highlights: ['Intel Core i5-13420H', '16GB RAM / 512GB SSD', 'Intel UHD Graphics', '23.8" FHD IPS', 'Windows 11 Home'],
    specs: { Processor: 'Intel Core i5-13420H', Graphics: 'Intel UHD Graphics', Memory: '16GB DDR4', Storage: '512GB NVMe SSD', Display: '23.8" FHD IPS', OS: 'Windows 11 Home', Included: 'Wireless keyboard and mouse' },
    stock: 6,
    warranty: LAPTOP_WARRANTY,
  },
  {
    id: 'hp-aio-24',
    name: 'HP All-in-One 24-cr0000',
    brand: 'HP',
    category: 'desktops',
    art: 'aio',
    color: '#f8fafc',
    price: 41995,
    originalPrice: 47995,
    highlights: ['Intel Core i5-1335U', '8GB RAM / 512GB SSD', 'Intel Iris Xe', '23.8" FHD IPS', 'Windows 11 Home'],
    specs: { Processor: 'Intel Core i5-1335U', Graphics: 'Intel Iris Xe', Memory: '8GB DDR4', Storage: '512GB NVMe SSD', Display: '23.8" FHD IPS', OS: 'Windows 11 Home + Office H&S 2021' },
    stock: 4,
    warranty: LAPTOP_WARRANTY,
  },
  {
    id: 'asus-rog-g22ch',
    name: 'ASUS ROG G22CH Compact Gaming Desktop',
    brand: 'ASUS',
    category: 'desktops',
    art: 'desktop',
    color: '#be123c',
    price: 109995,
    originalPrice: 124995,
    highlights: ['Intel Core i7-14700F', '16GB DDR5 / 1TB SSD', 'RTX 4060 Ti 8GB', 'Wi-Fi 6E', 'Windows 11 Home'],
    specs: { Processor: 'Intel Core i7-14700F (20 cores)', Graphics: 'NVIDIA GeForce RTX 4060 Ti 8GB', Memory: '16GB DDR5-5600', Storage: '1TB PCIe Gen4 SSD', Connectivity: 'Wi-Fi 6E, BT 5.3', OS: 'Windows 11 Home' },
    stock: 2,
    warranty: LAPTOP_WARRANTY,
  },

  // Monitors & printers
  {
    id: 'lg-24mr400',
    name: 'LG 24MR400 24" IPS Monitor',
    brand: 'LG',
    category: 'monitors-printers',
    art: 'monitor',
    color: '#1f2937',
    price: 4995,
    originalPrice: 6495,
    highlights: ['23.8" FHD IPS', '100Hz refresh', 'AMD FreeSync', 'HDMI / VGA'],
    specs: { Panel: '23.8" IPS 1920x1080', Refresh: '100Hz', Response: '5ms GtG', Ports: 'HDMI, D-Sub', Features: 'AMD FreeSync, Reader Mode' },
    stock: 25,
    bestseller: true,
    warranty: '3 years LG warranty',
  },
  {
    id: 'msi-g255f',
    name: 'MSI G255F 24.5" 180Hz Gaming Monitor',
    brand: 'MSI',
    category: 'monitors-printers',
    art: 'monitor',
    color: '#b91c1c',
    price: 7995,
    originalPrice: 9995,
    highlights: ['24.5" FHD Rapid IPS', '180Hz / 1ms', 'Adaptive-Sync', 'HDMI / DP'],
    specs: { Panel: '24.5" Rapid IPS 1920x1080', Refresh: '180Hz', Response: '1ms GtG', Ports: '2x HDMI, 1x DisplayPort', Features: 'Adaptive-Sync, Night Vision' },
    stock: 10,
    warranty: '3 years MSI warranty',
  },
  {
    id: 'epson-l3210',
    name: 'Epson EcoTank L3210 All-in-One Printer',
    brand: 'Epson',
    category: 'monitors-printers',
    art: 'printer',
    color: '#1d4ed8',
    price: 8495,
    originalPrice: 9495,
    highlights: ['Print / Scan / Copy', 'Ink tank system', 'Up to 4,500 pages black', 'USB'],
    specs: { Functions: 'Print, scan, copy', 'Print speed': 'Up to 10 ipm black / 5 ipm color', Yield: '4,500 black / 7,500 color pages', Connectivity: 'USB 2.0' },
    stock: 14,
    warranty: '2 years Epson warranty',
  },
  {
    id: 'hp-smart-tank-580',
    name: 'HP Smart Tank 580 Wireless All-in-One',
    brand: 'HP',
    category: 'monitors-printers',
    art: 'printer',
    color: '#0ea5e9',
    price: 9995,
    originalPrice: 11495,
    highlights: ['Print / Scan / Copy', 'Wi-Fi + HP Smart app', 'Ink tank system', 'Borderless printing'],
    specs: { Functions: 'Print, scan, copy', Connectivity: 'Wi-Fi, Bluetooth LE, USB', Yield: '6,000 black / 6,000 color pages' },
    stock: 8,
    warranty: '2 years HP warranty',
  },

  // Accessories
  {
    id: 'logitech-g102',
    name: 'Logitech G102 Lightsync Gaming Mouse',
    brand: 'Logitech',
    category: 'accessories',
    art: 'mouse',
    color: '#111827',
    price: 995,
    originalPrice: 1295,
    highlights: ['8,000 DPI sensor', 'RGB Lightsync', '6 programmable buttons'],
    specs: { Sensor: 'Gaming-grade, 200–8,000 DPI', Buttons: '6 programmable', Connection: 'USB wired', Weight: '85 g' },
    stock: 40,
    bestseller: true,
    warranty: '2 years Logitech warranty',
  },
  {
    id: 'logitech-h390',
    name: 'Logitech H390 USB Headset',
    brand: 'Logitech',
    category: 'accessories',
    art: 'headset',
    color: '#1f2937',
    price: 1795,
    originalPrice: 2195,
    highlights: ['Noise-cancelling mic', 'In-line controls', 'USB plug-and-play'],
    specs: { Connection: 'USB-A', Microphone: 'Noise-cancelling boom mic', Controls: 'Volume and mute on cable' },
    stock: 22,
    warranty: '2 years Logitech warranty',
  },
  {
    id: 'fantech-maxfit61',
    name: 'Fantech MAXFIT61 Mechanical Keyboard',
    brand: 'Fantech',
    category: 'accessories',
    art: 'keyboard',
    color: '#f97316',
    price: 1999,
    originalPrice: 2499,
    highlights: ['60% hot-swappable', 'RGB backlight', 'Detachable USB-C'],
    specs: { Layout: '60% (61 keys)', Switches: 'Hot-swappable mechanical', Lighting: 'RGB', Cable: 'Detachable USB-C' },
    stock: 18,
    warranty: '1 year warranty',
  },
  {
    id: 'fantech-wgp15',
    name: 'Fantech EOS Pro WGP15 Wireless Controller',
    brand: 'Fantech',
    category: 'accessories',
    art: 'controller',
    color: '#8b5cf6',
    price: 1899,
    originalPrice: 2299,
    highlights: ['2.4G + Bluetooth + wired', 'PC / Switch / Android', 'Hall-effect sticks'],
    specs: { Connection: '2.4G dongle, Bluetooth, USB-C', Compatibility: 'PC, Nintendo Switch, Android', Battery: '1,000 mAh rechargeable' },
    stock: 12,
    warranty: '1 year warranty',
  },

  // Phones & tablets
  {
    id: 'lenovo-tab-m11',
    name: 'Lenovo Tab M11 with Pen',
    brand: 'Lenovo',
    category: 'phones-tablets',
    art: 'tablet',
    color: '#64748b',
    price: 12995,
    originalPrice: 14995,
    highlights: ['MediaTek Helio G88', '8GB RAM / 128GB', '11" 90Hz display', 'Lenovo Tab Pen included'],
    specs: { Processor: 'MediaTek Helio G88', Memory: '8GB RAM', Storage: '128GB (microSD up to 1TB)', Display: '11" WUXGA 90Hz', Battery: '7,040 mAh' },
    stock: 9,
    warranty: '1 year warranty',
  },
  {
    id: 'samsung-galaxy-tab-a9-plus',
    name: 'Samsung Galaxy Tab A9+ Wi-Fi',
    brand: 'Samsung',
    category: 'phones-tablets',
    art: 'tablet',
    color: '#1e293b',
    price: 11990,
    originalPrice: 13990,
    highlights: ['Snapdragon 695', '8GB RAM / 128GB', '11" 90Hz display', 'Quad speakers'],
    specs: { Processor: 'Snapdragon 695', Memory: '8GB RAM', Storage: '128GB', Display: '11" 90Hz', Battery: '7,040 mAh' },
    stock: 11,
    bestseller: true,
    warranty: '1 year Samsung warranty',
  },
  {
    id: 'tecno-pova-6',
    name: 'Tecno POVA 6 5G',
    brand: 'Tecno',
    category: 'phones-tablets',
    art: 'phone',
    color: '#16a34a',
    price: 10999,
    originalPrice: 12999,
    highlights: ['Dimensity 6080 5G', '8GB RAM / 256GB', '6.78" 120Hz', '6,000 mAh battery'],
    specs: { Processor: 'MediaTek Dimensity 6080', Memory: '8GB RAM + 8GB extended', Storage: '256GB', Display: '6.78" FHD+ 120Hz', Battery: '6,000 mAh, 70W fast charge' },
    stock: 15,
    warranty: '1 year warranty',
  },
  {
    id: 'realme-c67',
    name: 'realme C67',
    brand: 'realme',
    category: 'phones-tablets',
    art: 'phone',
    color: '#facc15',
    price: 8499,
    originalPrice: 9999,
    highlights: ['Snapdragon 685', '8GB RAM / 256GB', '108MP camera', '5,000 mAh battery'],
    specs: { Processor: 'Snapdragon 685', Memory: '8GB RAM', Storage: '256GB', Camera: '108MP main', Battery: '5,000 mAh, 33W SUPERVOOC' },
    stock: 13,
    warranty: '1 year warranty',
  },

  // Software & upgrades
  {
    id: 'ms-365-family',
    name: 'Microsoft 365 Family (1 year, 6 users)',
    brand: 'Microsoft',
    category: 'software-upgrades',
    art: 'software',
    color: '#ea580c',
    price: 4295,
    originalPrice: 4995,
    highlights: ['Word, Excel, PowerPoint, Outlook', '1TB OneDrive per user', 'Up to 6 people'],
    specs: { License: '12-month subscription, digital code', Users: 'Up to 6', Storage: '1TB OneDrive each', Platforms: 'Windows, macOS, iOS, Android' },
    stock: 99,
    bestseller: true,
    warranty: 'Genuine license guarantee',
  },
  {
    id: 'eset-home-security-essential',
    name: 'ESET HOME Security Essential (1 year)',
    brand: 'ESET',
    category: 'software-upgrades',
    art: 'software',
    color: '#0d9488',
    price: 1095,
    originalPrice: 1295,
    highlights: ['Antivirus & anti-phishing', 'Banking & payment protection', '1 device'],
    specs: { License: '12-month, digital code', Devices: '1', Platforms: 'Windows, macOS, Android' },
    stock: 99,
    warranty: 'Genuine license guarantee',
  },
  {
    id: 'ram-upgrade-16gb-ddr5',
    name: 'RAM Upgrade: +16GB DDR5 SO-DIMM (installed)',
    brand: 'Kingston',
    category: 'software-upgrades',
    art: 'ram',
    color: '#2563eb',
    price: 2995,
    highlights: ['16GB DDR5-5600 SO-DIMM', 'Free in-store installation', 'Compatibility checked'],
    specs: { Module: 'Kingston 16GB DDR5-5600 SO-DIMM', Service: 'Installation and memory test at any branch' },
    stock: 50,
    warranty: 'Lifetime limited (module) / 30 days (service)',
  },
  {
    id: 'ssd-upgrade-1tb',
    name: 'SSD Upgrade: 1TB NVMe Gen4 (installed)',
    brand: 'Kingston',
    category: 'software-upgrades',
    art: 'ram',
    color: '#7c3aed',
    price: 3995,
    originalPrice: 4495,
    highlights: ['1TB PCIe Gen4 NVMe', 'Free cloning of your old drive', 'Same-day installation'],
    specs: { Drive: 'Kingston NV3 1TB PCIe Gen4 NVMe', Service: 'Installation and data cloning at any branch' },
    stock: 50,
    warranty: '3 years (drive) / 30 days (service)',
  },
];

export const BRANDS = Array.from(new Set(PRODUCTS.map((p) => p.brand))).sort((a, b) => a.localeCompare(b));

export const brandSlug = (brand: string) => brand.toLowerCase().replace(/[^a-z0-9]+/g, '-');

export const getCategory = (id: string) => CATEGORIES.find((c) => c.id === id);

export const getProduct = (id: string) => PRODUCTS.find((p) => p.id === id);

export const discountPercent = (p: Product) =>
  p.originalPrice && p.originalPrice > p.price ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100) : 0;

export const formatPeso = (n: number) => `₱${n.toLocaleString('en-PH', { maximumFractionDigits: 0 })}`;

/**
 * Per-product stock + marketplace presence (edit here when inventory changes).
 * Availability: 'all' = every branch, 'metro' = Metro Manila branches only,
 * 'online' = not held in stores (marketplace only).
 * Defaults: 'metro' + Shopee; bestsellers get 'all' + Shopee & TikTok.
 */
const AVAILABILITY: Record<string, { a: Product['availability']; m: Product['marketplaces'] }> = {
  'acer-nitro-v15-i5': { a: 'all', m: { shopee: true, tiktok: true, lazada: true } },
  'hp-victus-15-r5': { a: 'all', m: { shopee: true, tiktok: true } },
  'asus-tuf-a15-r7': { a: 'metro', m: { shopee: true, tiktok: true } },
  'lenovo-loq-15-i5': { a: 'metro', m: { shopee: true, lazada: true } },
  'msi-katana-15-i7': { a: 'metro', m: { shopee: true } },
  'asus-rog-strix-g16': { a: 'metro', m: { shopee: true, lazada: true } },
  'acer-aspire-lite-15': { a: 'all', m: { shopee: true, tiktok: true } },
  'asus-vivobook-15-i3': { a: 'all', m: { shopee: true, tiktok: true } },
  'lenovo-ideapad-slim3-i5': { a: 'metro', m: { shopee: true, lazada: true } },
  'hp-15-fd-i5': { a: 'all', m: { shopee: true, tiktok: true } },
  'chuwi-corebook-x': { a: 'online', m: { shopee: true, tiktok: true } },
  'dell-vostro-3520': { a: 'metro', m: { shopee: true, lazada: true } },
  'apple-macbook-air-m3-13': { a: 'metro', m: { lazada: true } },
  'asus-zenbook-14-oled': { a: 'metro', m: { shopee: true, lazada: true } },
  'hp-omnibook-x-14': { a: 'metro', m: { shopee: true, lazada: true } },
  'lenovo-yoga-slim-7': { a: 'metro', m: { lazada: true } },
  'apple-macbook-pro-14-m4': { a: 'metro', m: { lazada: true } },
  'lenovo-ideacentre-aio-3': { a: 'metro', m: { shopee: true } },
  'hp-aio-24': { a: 'metro', m: { shopee: true } },
  'asus-rog-g22ch': { a: 'metro', m: { shopee: true, lazada: true } },
  'lg-24mr400': { a: 'all', m: { shopee: true, tiktok: true } },
  'msi-g255f': { a: 'metro', m: { shopee: true, tiktok: true } },
  'epson-l3210': { a: 'all', m: { shopee: true, tiktok: true, lazada: true } },
  'hp-smart-tank-580': { a: 'metro', m: { shopee: true, lazada: true } },
  'logitech-g102': { a: 'all', m: { shopee: true, tiktok: true, lazada: true } },
  'logitech-h390': { a: 'all', m: { shopee: true, tiktok: true } },
  'fantech-maxfit61': { a: 'all', m: { shopee: true, tiktok: true } },
  'fantech-wgp15': { a: 'metro', m: { shopee: true, tiktok: true } },
  'lenovo-tab-m11': { a: 'metro', m: { shopee: true, lazada: true } },
  'samsung-galaxy-tab-a9-plus': { a: 'all', m: { shopee: true, tiktok: true, lazada: true } },
  'tecno-pova-6': { a: 'all', m: { shopee: true, tiktok: true } },
  'realme-c67': { a: 'metro', m: { shopee: true, tiktok: true } },
  'ms-365-family': { a: 'all', m: { shopee: true, lazada: true } },
  'eset-home-security-essential': { a: 'all', m: { shopee: true, lazada: true } },
  'ram-upgrade-16gb-ddr5': { a: 'all', m: { shopee: true } },
  'ssd-upgrade-1tb': { a: 'all', m: { shopee: true } },
};

for (const p of PRODUCTS) {
  const o = AVAILABILITY[p.id];
  p.availability = o?.a ?? 'metro';
  p.marketplaces = o?.m ?? { shopee: true };
}
