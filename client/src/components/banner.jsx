import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useState, useEffect } from 'react';

export default function Banner() {
    const [indexNum, setIndexNum] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [text, setText] = useState('');
    const time = 2000; // amount of time between words
    const brand = ["Procrastination Station"]
    const [delta, setDelta] = useState(300 -Math.random() * 100) // how fast each letter is typed

    useEffect(()=> {
        let ticker= setInterval(()=>{
            tick();
        }, delta)

        return ()=>{ clearInterval(ticker)}
    }, [text])

    const tick = () => {
        let i = indexNum % brand.length;
        let fullText = brand[i];
        let updatedText = isDeleting ? fullText.substring(0, text.length-1) : fullText.substring(0, text.length + 1)

        setText(updatedText);

        if (isDeleting){
            setDelta(prevDelta => prevDelta /2)
        }

        if (!isDeleting && updatedText === fullText){
            setIsDeleting(true);
            setDelta(time);
        } else if (isDeleting && updatedText === ''){
            setIsDeleting(false);
            setIndexNum(indexNum +1 );
            setDelta(500);
        }
    }
  return (
    <section className="banner" id="home">
      <CssBaseline />
      <Container maxWidth="sm">
        <h1> Hi! Welcome to the <span> {text} </span></h1>
        <Box sx={{ bgcolor: '#cfe8fc', height: '40vh' }} />
      </Container>
    </section>
  );
}

