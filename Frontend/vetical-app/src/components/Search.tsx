import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Search: React.FC = () => {
    return (
        <div className="flex items-center justify-center p-4">
            <div className="bg-white border border-gray-300 shadow-lg shadow-gray-400/50 rounded-full flex w-full max-w-xl">
                <input
                    type="text"
                    placeholder="Search for clinics or veterinarians"
                    className="rounded-l-full w-full py-5 px-4 text-gray-700 leading-tight focus:outline-none"
                />
                <button className="bg-orange-500 cursor-pointer text-white rounded-r-full py-2 px-4 hover:bg-orange-600 transition duration-300">
                    <FontAwesomeIcon icon={faSearch} />
                </button>

            </div>
        </div>


    )
}

export default Search