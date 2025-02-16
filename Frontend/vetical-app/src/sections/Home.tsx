import React from 'react'
import Search from '../components/Search'
import CategoryList from '../components/CategoryList'
import FilterButton from '../components/FilterButton'

const Home: React.FC = () => {
  return (
    <section className='w-full min-h-screen '>
      <div className=' w-full flex justify-center items-center flex-row'>
        <Search />
        <FilterButton />

      </div>

      <CategoryList />
    </section>
  )
}

export default Home