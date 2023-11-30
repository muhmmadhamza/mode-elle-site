import styled from 'styled-components';
import Image from 'next/image'

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
`;


const SuccessStory = styled.div`
    width: 130px;
    height: 200px;
    margin: 0 6px;
    position: relative;
    box-shadow: rgba(50, 50, 93, 0.15) 0px 50px 100px -20px, rgba(0, 0, 0, 0.20) 0px 30px 60px -30px, rgba(10, 37, 64, 0.27) 0px -2px 6px 0px inset;
    border-radius: 1px;
    overflow: hidden;
    background-color: grey;
`;

const Vignette = styled.div`
    position: absolute;
    height: 100%;
    width: 100%;
    display: block;
    background-size: cover;
    z-index: 9999;
  
  &::after {
    content: '';
    position: absolute;
    top: 0; left: 0; bottom: 0; right: 0;
    background: radial-gradient(circle, transparent 40%, rgba(0,0,0,0.2) 150%);
  }
  
  /* removing shadow on hover
  for demonstration purposes */
  &:hover:after {
    background: none;
  }
`;

export default function SuccessStories() {
    return(
        <Wrapper>
            
                <SuccessStory>
                    <Vignette />
                    <Image
                        src="/success-stories/1a.jpg"
                        alt="Picture"
                        width={215}
                        height={332}
                        objectFit="cover"
                    />
                </SuccessStory>
                <SuccessStory>
                    <Vignette />
                    <Image
                        src="/success-stories/3-2.jpg"
                        alt="Picture"
                        width={215}
                        height={330}
                        objectFit="cover"
                    />
                </SuccessStory>
                <SuccessStory>
                    <Vignette />
                    <Image
                        src="/success-stories/20a.jpg"
                        alt="Picture"
                        width={215}
                        height={330}
                        objectFit="cover"
                    />
                </SuccessStory>
            
        </Wrapper>
    );
}