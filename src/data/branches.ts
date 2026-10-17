
export interface BranchLocation {
  id: string;
  name: string; // e.g. "Quezon City (Aurora Blvd)"
  shortName: string; // e.g. "QC Aurora Blvd"
  region: 'Metro Manila' | 'Luzon Provincial' | 'Visayas & Mindanao';
  address: string;
  landmark: string;
  phone: string;
  hours: string;
}

export const BRANCH_LOCATIONS: BranchLocation[] = [
  // --- METRO MANILA ---
  {
    id: 'mnl-qc-aurora',
    name: 'Quezon City (Aurora Blvd)',
    shortName: 'QC Aurora Blvd',
    region: 'Metro Manila',
    address: 'RM 103 G/F, P&S Bldg., 717 Aurora Blvd., Quezon City',
    landmark: 'Across Robinsons Magnolia',
    phone: '0927 700 3432',
    hours: '9:00 AM - 7:00 PM'
  },
  {
    id: 'mnl-qc-fairview',
    name: 'Quezon City (Fairview)',
    shortName: 'QC Fairview',
    region: 'Metro Manila',
    address: '2nd Floor, Ever Gotesco Mall, Commonwealth Ave, Quezon City',
    landmark: 'Inside Ever Gotesco Mall',
    phone: '0927 700 3432',
    hours: '10:00 AM - 9:00 PM'
  },
  {
    id: 'mnl-qc-commonwealth',
    name: 'Quezon City (Commonwealth)',
    shortName: 'QC Commonwealth',
    region: 'Metro Manila',
    address: 'Unit 44, St. Vincent St., Brgy. Holy Spirit, Quezon City',
    landmark: 'In front of COA (Commission on Audit)',
    phone: '0927 700 3432',
    hours: '9:00 AM - 7:00 PM'
  },
  {
    id: 'mnl-qc-cubao',
    name: 'Quezon City (Cubao)',
    shortName: 'QC Cubao',
    region: 'Metro Manila',
    address: '16-C Don Alfredo Egea, Brgy. Pinagkaisahan, Cubao, Quezon City',
    landmark: 'Barangay Pinagkaisahan area',
    phone: '0927 700 3432',
    hours: '9:00 AM - 7:00 PM'
  },
  {
    id: 'mnl-manila-sampaloc',
    name: 'Manila (Sampaloc)',
    shortName: 'Manila Sampaloc',
    region: 'Metro Manila',
    address: '421 Figueras St., Sampaloc, Manila',
    landmark: "In front of McDonald's Bustillos",
    phone: '0927 700 3432',
    hours: '9:00 AM - 7:00 PM'
  },
  {
    id: 'mnl-caloocan',
    name: 'Caloocan',
    shortName: 'Caloocan Sangandaan',
    region: 'Metro Manila',
    address: '578 A. Mabini St., Sangandaan, Caloocan',
    landmark: 'Near SM Center Sangandaan',
    phone: '0927 700 3432',
    hours: '9:00 AM - 7:00 PM'
  },
  {
    id: 'mnl-las-pinas',
    name: 'Las Piñas',
    shortName: 'Las Piñas Alabang-Zapote',
    region: 'Metro Manila',
    address: 'Doña Nena Business Center Bldg., 481 Real St., Alabang-Zapote Road',
    landmark: 'In front of SM Southmall',
    phone: '0927 700 3432',
    hours: '9:00 AM - 7:00 PM'
  },
  {
    id: 'mnl-pasig',
    name: 'Pasig',
    shortName: 'Pasig Ortigas Center',
    region: 'Metro Manila',
    address: 'Ruby Rd., Ortigas Center, Pasig City',
    landmark: 'Behind Robinsons Galleria',
    phone: '0927 700 3432',
    hours: '9:00 AM - 7:00 PM'
  },

  // --- LUZON PROVINCIAL ---
  {
    id: 'luz-cavite-imus',
    name: 'Cavite (Imus)',
    shortName: 'Cavite Imus',
    region: 'Luzon Provincial',
    address: '1-D, Anabu, Emilio Aguinaldo Hi-way, Imus',
    landmark: 'Beside Sr. Pedro Chicken',
    phone: '0927 700 3432',
    hours: '9:00 AM - 7:00 PM'
  },
  {
    id: 'luz-rizal-montalban',
    name: 'Rizal (Montalban)',
    shortName: 'Rizal Montalban',
    region: 'Luzon Provincial',
    address: '52 San Jose, Montalban, Rizal',
    landmark: 'San Jose major route',
    phone: '0927 700 3432',
    hours: '9:00 AM - 7:00 PM'
  },
  {
    id: 'luz-bulacan-sjdm',
    name: 'Bulacan (Sanjose Del Monte)',
    shortName: 'Bulacan SJDM',
    region: 'Luzon Provincial',
    address: '3023 RHC Builders Warehouse, Quirino Highway, San Jose Del Monte, Bulacan',
    landmark: 'Inside RHC Builders Warehouse',
    phone: '0927 700 3432',
    hours: '9:00 AM - 7:00 PM'
  },
  {
    id: 'luz-laguna-calamba',
    name: 'Laguna (Calamba)',
    shortName: 'Laguna Calamba',
    region: 'Luzon Provincial',
    address: 'G/F, P&S Building, National Highway, Calamba, Laguna',
    landmark: 'Along National Highway',
    phone: '0927 700 3432',
    hours: '9:00 AM - 7:00 PM'
  },
  {
    id: 'luz-pampanga-angeles',
    name: 'Pampanga (Angeles)',
    shortName: 'Pampanga Angeles',
    region: 'Luzon Provincial',
    address: 'R.G. Gomez Bldg., 299 MacArthur Hwy, Angeles City, Pampanga',
    landmark: 'MacArthur Highway route',
    phone: '0927 700 3432',
    hours: '9:00 AM - 7:00 PM'
  },
  {
    id: 'luz-bataan-balanga',
    name: 'Bataan (Balanga)',
    shortName: 'Bataan Balanga',
    region: 'Luzon Provincial',
    address: 'No. 6 Tuazon Bldg., Capitol Dr., Balanga, Bataan',
    landmark: 'Along Capitol Drive',
    phone: '0927 700 3432',
    hours: '9:00 AM - 7:00 PM'
  },
  {
    id: 'luz-baguio',
    name: 'Baguio',
    shortName: 'Baguio Assumption Rd',
    region: 'Luzon Provincial',
    address: '2nd Floor, ECCO Building, Assumption Rd., Baguio City',
    landmark: 'Along Assumption Road',
    phone: '0927 700 3432',
    hours: '9:00 AM - 7:00 PM'
  },
  {
    id: 'luz-naga',
    name: 'Naga',
    shortName: 'Naga Elias Angeles',
    region: 'Luzon Provincial',
    address: 'G/F, Crown Hotel Building, Elias Angeles St., Naga City',
    landmark: 'Inside Crown Hotel Building',
    phone: '0927 700 3432',
    hours: '9:00 AM - 7:00 PM'
  },

  // --- VISAYAS & MINDANAO ---
  {
    id: 'vis-cebu',
    name: 'Cebu',
    shortName: 'Cebu City APM Mall',
    region: 'Visayas & Mindanao',
    address: 'G/F, APM Shopping Mall, A. Soriano Ave., Cebu City',
    landmark: 'Across SM City Cebu',
    phone: '0927 700 3432',
    hours: '10:00 AM - 9:00 PM'
  },
  {
    id: 'vis-iloilo',
    name: 'Iloilo',
    shortName: 'Iloilo Gen. Luna St',
    region: 'Visayas & Mindanao',
    address: 'G/F, its Bldg., Gen. Luna St., Iloilo City',
    landmark: 'Near General Luna Street major hub',
    phone: '0927 700 3432',
    hours: '9:00 AM - 7:00 PM'
  },
  {
    id: 'skm-davao',
    name: 'Davao',
    shortName: 'Davao Jaltan Bldg',
    region: 'Visayas & Mindanao',
    address: 'Door #5, G/F, Jaltan Bldg., C.M. Recto Ave., Davao City',
    landmark: 'Recto Ave major zone',
    phone: '0927 700 3432',
    hours: '9:00 AM - 7:00 PM'
  }
];
