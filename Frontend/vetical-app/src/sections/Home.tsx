import React from 'react'
import Search from '../components/Search'
import CategoryList from '../components/CategoryList'

const Home:React.FC = () => {
  return (
    <section className='w-full min-h-screen '>
        <Search/>
       <CategoryList />

       

    </section>
  )
}

export default Home