import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faDog, 
  faCat, 
  faFrog, 
  faOtter, 
  faDove, 
  faFish, 
  faPaw, 
  faDragon, 
  faSpider 
} from '@fortawesome/free-solid-svg-icons';

const categories = [
  { id: 1, name: 'Dogs', icon: faDog },
  { id: 2, name: 'Cats', icon: faCat },
  { id: 3, name: 'Amphibians', icon: faFrog },
  { id: 4, name: 'Mammals', icon: faOtter },
  { id: 5, name: 'Birds', icon: faDove },
  { id: 6, name: 'Fish', icon: faFish },
  { id: 7, name: 'Rodents', icon: faPaw },
  { id: 9, name: 'Insects', icon: faSpider },
  { id: 10, name: 'Reptiles', icon: faDragon },

];

const CategoryList: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const handleCategoryClick = (categoryId: number) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div className="w-full max-w-[900px] mx-auto px-6">
      <div className="flex flex-wrap justify-center gap-4">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className={`flex flex-col cursor-pointer items-center justify-center w-[80px] h-[80px] rounded-full transition-all`}
          >
            <div className={`w-12 h-12 flex items-center justify-center rounded-full 
              ${selectedCategory === category.id ? 'bg-gray-700 text-white' : 'bg-gray-200'}`}>
              <FontAwesomeIcon icon={category.icon} size="lg" />
            </div>
            <span className="text-xs text-center mt-1">{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
