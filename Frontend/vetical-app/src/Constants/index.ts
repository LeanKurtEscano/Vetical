interface FilterCategory {
    id: number;
    name: string;
    imageUrl: string;
  }

export const  categories: FilterCategory[] = [
    { id: 1, name: 'General Checkup', imageUrl: '/images/checkup.jpg' },
    { id: 2, name: 'Vaccinations', imageUrl: '/images/vaccinations.jpg' },

  ];


  import { 
    faStethoscope, faTooth, faCapsules, faVial, faXRay, faUserMd, 
    faPaw, faSyringe, faHeartbeat, faBone, faDog, faCat, faAmbulance, 
    faScissors, faHouseMedical, faMicroscope, faNotesMedical, faPrescriptionBottle 
} from "@fortawesome/free-solid-svg-icons";

export const services = [
  { id: 1, name: "General Checkup", icon: faStethoscope },
  { id: 2, name: "Dental Care", icon: faTooth },
  { id: 3, name: "Pharmacy", icon: faCapsules },
  { id: 4, name: "Lab Tests", icon: faVial },
  { id: 5, name: "X-Ray & Imaging", icon: faXRay },
  { id: 6, name: "Specialist Consultation", icon: faUserMd },
  { id: 7, name: "Vaccination & Preventive Care", icon: faSyringe },
  { id: 8, name: "Emergency Care", icon: faAmbulance },
  { id: 9, name: "Pet Grooming", icon: faScissors },
  { id: 10, name: "Nutritional Counseling", icon: faBone },
  { id: 11, name: "Microchipping & Identification", icon: faPaw },
  { id: 12, name: "Spay & Neuter Surgery", icon: faHouseMedical },
  { id: 13, name: "Dermatology & Skin Care", icon: faDog },
  { id: 14, name: "Cardiology (Heart Health)", icon: faHeartbeat },
  { id: 15, name: "Oncology (Cancer Treatment)", icon: faNotesMedical },
  { id: 16, name: "Orthopedic Surgery", icon: faXRay },
  { id: 17, name: "Parasite Control & Treatment", icon: faPrescriptionBottle },
  { id: 18, name: "Rehabilitation & Physiotherapy", icon: faMicroscope },
];
