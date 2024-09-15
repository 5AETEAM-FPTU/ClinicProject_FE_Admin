import React from 'react'

import Banner from '@/components/Core/modules/Landing/Banner'
import CustomerFeedback from '@/components/Core/modules/Landing/CustomerFeedback'
import OurTeam from '@/components/Core/modules/Landing/OurTeam'
import Specialty from '@/components/Core/modules/Landing/Specialty'
import WhoAreWe from '@/components/Core/modules/Landing/WhoAreWe'

function LandingHome() {
    return (
        <div>
            <Banner/>
            <WhoAreWe/>
            <OurTeam/>
            <Specialty/>
            <CustomerFeedback/>
        </div>
    )
}

export default LandingHome
