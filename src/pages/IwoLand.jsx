import React from 'react'
import { SlPeople } from 'react-icons/sl'
import ImageCarousel from '../components/ImageCarousel'
import SideBar from '../components/SideBar'

const IwoLand = () => {
  return (
    <div>
      <div className='home-container'>
        <h2 style={{color:"#222222", fontSize: "35px", fontWeight: "600"}}>IWO LAND</h2>
      </div>
      <div className="home-content">
          <div className='first-side'>
              <ImageCarousel />
              <p>Iwo is a prominent Yoruba town in Osun State, southwestern Nigeria. Rich in cultural, spiritual, and historical heritage, Iwo has long been an important center of Yoruba civilization, It is founded by Adekola Telu, the son of Luwo Gbagida, a female Ooni of Ife — one of the few female traditional rulers in Yoruba history.</p>
              <h4>Discover the Iwo People</h4>
              <p>Iwo People are predominantly Yoruba-speaking, culturally rich, religiously diverse, and proud of their deep-rooted heritage. They are widely respected for their resilience, hospitality, and contributions to religion, education, and culture in Nigeria.</p>
              <h4>Explore Our Land</h4>
              <p>Iwo is the ancestral home of the Oluwo of Iwo, one of the most revered monarchs in Yorubaland. The royal palace, a striking symbol of authority and tradition, welcomes visitors eager to witness age-old customs, ceremonies, and the enduring pride of Yoruba royalty, wo is famous for its deep-rooted Islamic heritage, vibrant Christian institutions, and enduring traditional beliefs. The skyline is dotted with majestic mosques and historic churches, including Bowen University, one of Nigeria’s leading faith-based academic institutions. Pilgrims, scholars, and tourists alike are drawn to Iwo’s serene atmosphere, sacred sites, and rich spiritual history.</p>
              {/* <div style={{display: "flex", textAlign: "center", marginTop: "20px"}}>
                  <div className='people-container'>
                      <SlPeople color='red' size={50}/>
                      <h2>ONE PEOPLE</h2>
                      <p>We are one group of people united by our love for our land and mutually work together, for the greater good of the Iwo Land</p>
                  </div>
                  <div className='people-container'>
                      <SlPeople color='red' size={50}/>
                      <h2>ONE PEOPLE</h2>
                      <p>We are one group of people united by our love for our land and mutually work together, for the greater good of the Iwo Land</p>
                  </div>
                  <div className='people-container'>
                      <SlPeople color='red' size={50}/>
                      <h2>ONE PEOPLE</h2>
                      <p>We are one group of people united by our love for our land and mutually work together, for the greater good of the Iwo Land</p>
                  </div>
              </div> */}
              <div>
                <h1 style={{color: "", textAlign: "center", marginTop: "35px", marginBottom: "35px"}}>The Iwo People</h1>
                <ImageCarousel />
              </div>
              
          </div>
          <div className='second-side'>
            <SideBar />
          </div>
      </div>
    </div>
  )
}

export default IwoLand