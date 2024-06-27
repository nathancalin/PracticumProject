import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useWindowSize } from '../../utils/useWindowSize';

function Orb() {
    const { width, height } = useWindowSize();

    const moveOrb = keyframes`
        0% {
            transform: translate(0, 0);
        }
        25% {
            transform: translate(${width / 4}px, ${height / 8}px);  /* Shorter distance */
        }
        50% {
            transform: translate(${width / 2}px, ${height / 4}px);  /* Shorter distance */
        }
        75% {
            transform: translate(${width * 3 / 4}px, ${height * 3 / 8}px);  /* Shorter distance */
        }
        100% {
            transform: translate(0, 0);
        }
    `;

    const OrbStyled = styled.div`
        width: 500vh;   /* Increased size for the orb */
        height: 500vh;
        position: absolute;
        border-radius: 50%;
        margin-left: -50vh;
        margin-top: -50vh;
        background: linear-gradient(180deg, #0A75BC 0%, #097DAC 100%);  /* Darker shades of blue */
        filter: blur(400px);
        animation: ${moveOrb} 15s alternate linear infinite;
    `;

    return <OrbStyled></OrbStyled>;
}

export default Orb;
