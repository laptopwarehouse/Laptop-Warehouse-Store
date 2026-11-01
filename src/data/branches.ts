
export interface BranchLocation {
  id: string;
  name: string;
  shortName: string;
  region: 'Metro Manila' | 'Luzon Provincial' | 'Visayas & Mindanao';
  address: string;
  landmark: string;
  phone: string;
  hours: string;
}

// Verified from official Laptop Warehouse branch posts (Am's Trending Computer Center OPC)
export const BRANCH_LOCATIONS: BranchLocation[] = [
  // --- METRO MANILA ---
  {
    id: 'mnl-manila-sampaloc',
    name: 'Manila (Sampaloc)',
    shortName: 'Manila Sampaloc',
    region: 'Metro Manila',
    address: '421 Figueras St., Sampaloc, Manila 1015',
    landmark: 'In front of McDonald’s Bustillos',
    phone: '0927 700 3432',
    hours: 'Mon–Sat 9:00 AM - 6:00 PM',
  },
  {
    id: 'mnl-qc-commonwealth',
    name: 'Quezon City (Commonwealth)',
    shortName: 'QC Commonwealth',
    region: 'Metro Manila',
    address: '44 Saint Vincent St., Brgy. Holy Spirit, Quezon City',
    landmark: 'Near Commonwealth Market',
    phone: '0927 700 3432',
    hours: 'Mon–Sat 9:00 AM - 8:00 PM, Sun 9:00 AM - 6:00 PM',
  },
  {
    id: 'mnl-qc-sandigan',
    name: 'Quezon City (Sandigan)',
    shortName: 'QC Sandigan',
    region: 'Metro Manila',
    address: 'M3PP+MHX, Commonwealth Ave., Quezon City',
    landmark: 'Along Commonwealth Avenue',
    phone: '0927 700 3432',
    hours: 'Mon–Sat 10:00 AM - 8:00 PM, Sun 10:00 AM - 7:00 PM',
  },
  {
    id: 'mnl-qc-cubao',
    name: 'Quezon City (Cubao)',
    shortName: 'QC Cubao',
    region: 'Metro Manila',
    address: '16D Don Alfredo Egea, Cubao, Quezon City 1109',
    landmark: 'Near Cubao Expo',
    phone: '0927 700 3432',
    hours: 'Mon–Sat 9:00 AM - 6:00 PM',
  },
  {
    id: 'mnl-caloocan-monumento',
    name: 'Caloocan (Monumento)',
    shortName: 'Caloocan Monumento',
    region: 'Metro Manila',
    address: 'Cor. Samson Rd. & Dagohoy St., Caloocan City',
    landmark: 'Puregold Monumento',
    phone: '0927 700 3432',
    hours: 'Mon–Sat 9:00 AM - 6:00 PM',
  },

  // --- LUZON PROVINCIAL ---
  {
    id: 'lzn-rizal-montalban',
    name: 'Rizal (Montalban)',
    shortName: 'Rizal Montalban',
    region: 'Luzon Provincial',
    address: '52 E. Rodriguez Hwy., Rodriguez, Rizal 1860',
    landmark: 'Along E. Rodriguez Highway',
    phone: '0927 700 3432',
    hours: 'Mon–Sat 9:00 AM - 6:00 PM',
  },
  {
    id: 'lzn-cavite-imus',
    name: 'Cavite (Imus)',
    shortName: 'Cavite Imus',
    region: 'Luzon Provincial',
    address: '1-D, Anabu, Emilio Aguinaldo Hi-way, Imus, Cavite',
    landmark: 'Anabu, Aguinaldo Highway',
    phone: '0927 700 3432',
    hours: 'Mon–Sat 9:00 AM - 6:00 PM',
  },
  {
    id: 'lzn-laguna-calamba',
    name: 'Laguna (Calamba)',
    shortName: 'Laguna Calamba',
    region: 'Luzon Provincial',
    address: '762 Pan-Philippine Hwy., Calamba, Laguna 4027',
    landmark: 'Along Pan-Philippine Highway',
    phone: '0927 700 3432',
    hours: 'Mon–Sat 9:00 AM - 6:00 PM',
  },
  {
    id: 'lzn-bataan-balanga',
    name: 'Bataan (Balanga)',
    shortName: 'Bataan Balanga',
    region: 'Luzon Provincial',
    address: 'No. 6 Tuazon Bldg., Capitol Dr., Balanga, Bataan',
    landmark: 'Capitol Drive',
    phone: '0927 700 3432',
    hours: 'Mon–Sat 9:00 AM - 6:00 PM',
  },
  {
    id: 'lzn-olongapo',
    name: 'Olongapo',
    shortName: 'Olongapo MCC',
    region: 'Luzon Provincial',
    address: 'MCC Building, Olongapo City, Zambales 2200',
    landmark: 'Downtown Olongapo',
    phone: '0927 700 3432',
    hours: 'Mon–Sat 9:00 AM - 6:00 PM',
  },
  {
    id: 'lzn-batangas-lipa',
    name: 'Batangas (Lipa)',
    shortName: 'Batangas Lipa',
    region: 'Luzon Provincial',
    address: 'Clara Bldg., Mataas na Lupa, J.P. Laurel Hwy., Lipa City, Batangas',
    landmark: 'Mataas na Lupa, Lipa',
    phone: '0927 700 3432',
    hours: 'Mon–Sat 9:00 AM - 6:00 PM',
  },
  {
    id: 'lzn-bulacan-sjdm',
    name: 'Bulacan (SJDM)',
    shortName: 'Bulacan SJDM',
    region: 'Luzon Provincial',
    address: '3023 RHC Builders Warehouse, Quirino Hwy., San Jose del Monte, Bulacan',
    landmark: 'Along Quirino Highway',
    phone: '0927 700 3432',
    hours: 'Mon–Sat 9:00 AM - 6:00 PM',
  },

  // --- VISAYAS & MINDANAO ---
  {
    id: 'vim-cebu-city',
    name: 'Cebu City',
    shortName: 'Cebu Sanciangko',
    region: 'Visayas & Mindanao',
    address: 'J Marketing Bldg., 155 Sanciangko St., Cebu City 6000',
    landmark: 'Sanciangko Street, downtown Cebu',
    phone: '0927 700 3432',
    hours: 'Mon–Sat 9:00 AM - 6:00 PM',
  },
];
