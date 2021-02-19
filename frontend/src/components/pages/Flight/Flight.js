import React from 'react'
import MainSection from '../MainSection'

import {homeObjOne} from './Data';

function Flight() {
    return (
        <div>
            <MainSection{...homeObjOne}/>
            
        </div>
    )
}

export default Flight;
