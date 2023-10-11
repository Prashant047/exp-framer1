import { motion, LayoutGroup } from 'framer-motion';
import { useState } from 'react';
import { ChevronRightIcon, ChevronLeftIcon } from '@radix-ui/react-icons';

import image1 from './img1.jpg';
import image2 from './img2.jpg';
import image3 from './img3.jpg';
import image4 from './img4.jpg';
import image5 from './img5.jpg';
import image6 from './img6.jpg';


const content = [
  {name: 'Adrian', hex: "#15803d", index: 0, title: 'Assistant Product Manager', image: image1, score: 90, description: 'Kind of an idiot to be honest...but works good'},
  {name: 'William', hex: "#0e7490", index: 1, title: 'Analyst', image: image2, score: 50, description: 'Good guy makes really nice brownies'},
  {name: 'Conway', hex: "#be185d", index: 2, title: 'CEO', image: image3, score: 25, description: 'Well, he is the CEO so no comments on this person, he is nice though'},
  {name: 'Randall', hex: "#b91c1c", index: 3, title: 'Writer', image: image4, score: 75, description: '10 cups of coffee a day...? bruhhh what??'},
  {name: 'Edward', hex: "#44403c", index: 4, title: 'Software Engineer', image: image5, score: 100, description: 'Best Dude, Super Intelligent...reminds me of Prashant'},
  {name: 'Weir', hex: "#ca8a04", index: 5, title: 'Designer', image: image6, score: 60, description: 'He is good at throwing parties...always fun to have him around'},
]

export default function App() {
  const [index, setIndex] = useState(1);
  const [selected, setSelected] = useState<null | number>(null);

  const slideRight = () => setIndex(prev => prev === 6? prev : prev + 1)
  const slideLeft = () => setIndex(prev => prev === 1? prev : prev - 1)
  
  let containerWidth = 400;
  let containerHeight = 180;

  return (
    <div 
      className='relative text-neutral-200 mx-auto my-24'
      style={{height: `${containerHeight}px`, width: `${containerWidth}px`}}
    >
      <div className='absolute w-full h-full flex items-center justify-between'>
        <button 
          className='w-10 h-10 -translate-x-16 bg-neutral-900 rounded-full border-2 border-neutral-700 flex justify-center items-center' 
          onClick={slideRight}
        >
          <ChevronLeftIcon/>
        </button>
        <button 
          className='w-10 h-10 translate-x-16 bg-neutral-900 rounded-full border-2 border-neutral-700 flex justify-center items-center' 
          onClick={slideLeft}
        >
          <ChevronRightIcon/>
        </button>
      </div>
      <div 
        className='relative w-full h-full bg-neutral-900 rounded-full overflow-hidden border border-neutral-700'
      >
        <LayoutGroup>
        {selected === null? (
          <>
            <div className='absolute flex justify-center items-stretch w-full h-full'>
              <div className='flex flex-col justify-center items-center'>
                  <motion.span
                    key={`name-${index-1}`}
                    initial={{opacity:0, y: 10}}
                    animate={{opacity:1, y: 0}}
                    exit={{opacity:0, y: 10}}
                    className='text-xs text-neutral-100'
                    transition={{ ease: [0.32, 0.72, 0, 1]}}
                  >{content[index-1].name}</motion.span>
                <div
                  className=''
                  style={{
                    width: '120px',
                    height: '120px'
                  }}
                >
                  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <motion.circle 
                      cx="50" 
                      cy="50" 
                      r="48" 
                      fill='none' 
                      stroke='#a3a3a3' 
                      strokeWidth={2} 
                      strokeDasharray={314} 
                      animate={{strokeDashoffset: 314-(content[index-1].score/100)*(314)}}
                      transition={{duration: 0.5}}
                    />
                  </svg>
                </div>
                  <motion.span
                    key={`title-${index-1}`}
                    className='text-xs text-neutral-400'
                    initial={{opacity:0, y: -10}}
                    animate={{opacity:1, y: 0}}
                    exit={{opacity:0, y: -10}}
                    transition={{ ease: [0.32, 0.72, 0, 1]}}
                  >{content[index-1].title}</motion.span>
              </div>
            </div>
            {content.map(({hex, image}, i) => (
              <Panel
                color={hex}
                key={`animal-${i}`}
                offset={index-i}
                image={image}
                index={i}
                onClick={() => setSelected(i)}
              />
            ))}
          </>
        ):(
          <div
            className='w-full h-full flex items-center px-4 gap-4'
          >
            <motion.div
              key={`animal-${selected}`}
              layoutId={`animal-${selected}`}
              className='shrink-0 h-36 w-36 flex justify-center items-center text-neutral-100 rounded-full overflow-hidden'
              onClick={() => setSelected(null)}
            >
              <img 
                className='w-full h-full object-cover object-center cursor-pointer'
                src={content[selected].image} 
                alt="" 
              />
            </motion.div>
            <motion.div
              initial={{opacity:0, x:20}}
              animate={{opacity:1, x:0}}
            >
              <span> <strong>{content[selected].name}</strong>  <small className='text-neutral-400'>{content[selected].title}</small></span>
              <p className='text-sm text-neutral-200'>
                {content[selected].description}
              </p>
            </motion.div>
          </div>
        )}
        </LayoutGroup>
      </div>
      <p className='text-sm text-neutral-400 text-center my-4'>
        click on avatar to expand, click again to close
      </p>

    </div>
  )
}

function Panel({
  color,
  image,
  offset,
  index,
  onClick
}:{
  color: string,
  image: string,
  offset: number,
  index: number,
  onClick: () => void
}){
  
  const boxWidth = 100;
  const gap = 10;
  const sidePadding = 40;
  
  const isInBox = offset >=0 && offset <=2;
  const x = isInBox ? sidePadding + (offset*(boxWidth + gap)) : offset*(boxWidth + gap + sidePadding) 

  return (
    <motion.div
      layoutId={`animal-${index}`}
      key={`animal-${index}`}
      className='absolute flex justify-center items-center text-neutral-100 rounded-full overflow-hidden'
      onClick={onClick}
      style={{
        x,
        y: 40,
        height: '100px', 
        width: '100px', 
        backgroundColor: color,
      }}
      animate={{x, scale:offset === 1?1:0.8, opacity:offset === 1?1:0.7}}
      transition={{ ease: [0.32, 0.72, 0, 1] , duration: 0.5}}
    >
      <img 
        className='w-full h-full object-cover object-center cursor-pointer'
        src={image} 
        alt="" />
    </motion.div>
  )
}


