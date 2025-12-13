import React from 'react';
import './css/Home.css'
import { Link } from 'react-router-dom'
import CustomMarquee from '../components/CustomMarquee'
import ImageCarousel from '../components/ImageCarousel'
import LatestNews from '../components/LatestNews'
import SideBar from '../components/SideBar'
import MissedArticles from '../components/MissedArticles'
import { PiTargetBold } from "react-icons/pi";
import { LuScanEye } from "react-icons/lu";
import useMediaQuery from '../components/MediaQuery';

import PlayersMobile from "../components/PlayersMobile"
import Players from "../components/Players"

const Home = () => {

  const isMobile = useMediaQuery('(max-width: 465px)')
  return (
    <>
      <div className="home-wrapper">
        <div className='marquee-container'>
          <div className='latest-news'>Updates</div>
          <div className="marquee-wrapper">
            <CustomMarquee />
          </div>
        </div>
        
        <div className="hero-section">
          <div className='carousel'>
            <ImageCarousel />
          </div>
          <div className='latest-section'>
            <LatestNews />
          </div>
        </div>
        
        <div className='home-container'>
          <h2 className="home-title">About Us</h2>
        </div>
        
        <div className="home-content">
          <div className='first-side'>
            <p>Alamu Football Club is a top rated professional football club, based in Osun, Nigeria which has featured in various football tournaments. It’s Registered with the Nigeria F.A and the Corporate Affairs Commission</p>
          
            <p>Alamu football club is not just a football club, it is the first football club with adequate hostel facilities where all payers are camped with zero fee payment. </p>

            <p>Although the primary aim of the football club is basically “Football”, everything that involves the round-leather game is excellently carried out. But to be the best provider of the brightest stars around, we believe there are some extra activities young people must be involved in to have upper chance among peers to make the dream come true.</p>
            
            <section className="values-container" aria-label="Core values of Iwo Land">
                
                  <div className="people-container">
                    <PiTargetBold className="people-icon" size={50} />
                    <h3>Our Mission</h3>
                    <p style={{textAlign: "center"}}>Our mission is to bring out the talent in you and build players. dkfldfdkjdfjdkldfjdljdjdkj</p>
                  </div>
                  <div className="people-container">
                    <LuScanEye className="people-icon"  size={50} />
                    <h3>Our Vision</h3>
                    <p style={{textAlign: "center"}}>Our mission is to bring out the talent in you and build players. dkfldfdkjdfjdkldfjdljdjdkj</p>
                  </div>
            </section>

            
            <div className="secondary-carousel-section">
              <h2 className="secondary-carousel-title">Our Players</h2>
              <div className='image-carousel-container'>
                { isMobile ? <PlayersMobile /> : <Players />}
              </div>
            </div>

            {/* <div className='map'>
                <h2 className="secondary-carousel-title">Map</h2>
              <Map />
            </div> */}


          </div>
          
          <div className='second-side'>
            <SideBar />
          </div>
        </div>
      </div>
      <div>
        <MissedArticles />
      </div>
    </>
    
  )
}

export default Home