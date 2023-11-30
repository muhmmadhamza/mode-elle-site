import Image from 'next/image'
import styled from 'styled-components';
import { Box } from 'theme-ui'

const LogoWrapper = styled.div`
    transition: opacity 0.2s ease-out;
    opacity: 0;
    height: 0;
    padding-left: 1px;
    overflow: hidden;
    width: 200px;

    ${
        props => props.isHome !== true ? `
            opacity: 1;
            height: auto;
        ` : 
        ``
    }

    @media (max-width: 979px) {
        opacity: 1;
        height: auto;
    }
`;

export default function Logo(props) {
    return (
        <LogoWrapper isHome={props.isHome}>
            <Image
                src="/mode-elle-logo-white.png"
                width={162}
                height={30}
            />
        </LogoWrapper>
    )
}