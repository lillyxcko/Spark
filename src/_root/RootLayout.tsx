import BottomBar from '@/components/shared/BottomBar'
import LeftSidebar from '@/components/shared/LeftSidebar'
import Topbar from '@/components/shared/Topbar'
import WelcomeDialog from '@/components/shared/WelcomeDialog'

import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <div className="w-full md:flex">
        <WelcomeDialog />
        <Topbar />
        <LeftSidebar />

        <section className="flex flex-1 h-full">
          <Outlet />
        </section>

        <BottomBar />
    </div>
  )
}

export default RootLayout