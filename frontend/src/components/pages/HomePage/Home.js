import React from 'react'
import MainSection from '../MainSection'

import {homeObjOne, homeObjTwo, homeObjThree, homeObjFour} from './Data';

function Home() {
    return (
        <div>
            <MainSection{...homeObjOne}/>
            <MainSection {...homeObjThree} />
      <MainSection {...homeObjTwo} />
      
      <MainSection {...homeObjFour} />
        </div>
    )
}

export default Home
