import React from 'react'
import { BsCashCoin } from 'react-icons/bs';
import { GrInProgress } from 'react-icons/gr';
import BottomNav from '@/components/shared/BottomNav'
import Greetings from '@/components/home/Greetings'
import MiniCard from '@/components/home/MiniCard'
import RecentOrders from '@/components/home/RecentOrders';
import PopularDishes from '@/components/home/PopularDishes';

const Home = () => {
  return (
    <section className="h-screen overflow-hidden flex gap-3 
                        bg-white dark:bg-[#1f1f1f] text-black dark:text-white">
      {/*  Div Izquierdo */}
      <div className="flex-[3] h-full flex flex-col 
                      bg-gray-100 dark:bg-[#1a1a1a]">
        {/* Saludo */}
        <Greetings />

        <div className="flex items-center w-full gap-3 px-8 mt-8">
          <MiniCard 
            title="Ventas del día" 
            icon={<BsCashCoin />} 
            number={100} 
            footerNum={1.6} 
          />

          <MiniCard 
            title="En Progreso" 
            icon={<GrInProgress />} 
            number={16} 
            footerNum={3.6} 
          />
        </div>

        {/* Lista de ordenes */}
        <div className="flex-1 overflow-hidden px-8 pb-24">
          <RecentOrders />
        </div>
      </div>

      {/* Div Derecho */}
      <div className="flex-[2] h-full overflow-y-auto scrollbar-hide pb-24
                      bg-gray-100 dark:bg-[#1a1a1a]">
        <PopularDishes />
      </div>

      <BottomNav />
    </section>
  )
}

export default Home
