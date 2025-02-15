interface FilterCategory {
    id: number;
    name: string;
    imageUrl: string;
  }

export const  categories: FilterCategory[] = [
    { id: 1, name: 'General Checkup', imageUrl: '/images/checkup.jpg' },
    { id: 2, name: 'Vaccinations', imageUrl: '/images/vaccinations.jpg' },
    // Add more categories as needed
  ];