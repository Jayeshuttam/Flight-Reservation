import React from 'react'
import FlightHero from '../Flight/FlightHero'

import { homeObjOne } from './Data';

function Flight() {
    return (
        <div>
            <FlightHero{...homeObjOne} />

        </div>
    )
}

export default Flight;
