import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleLeft } from '@fortawesome/free-regular-svg-icons';
import { faCircleRight } from '@fortawesome/free-regular-svg-icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/swiper-bundle.css'
import { Navigation, Pagination, Scrollbar} from 'swiper/modules';
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function PopularCollections() {

  const [info, setInfo] = useState([])
    const [loading, setLoading] = useState(true);
  
    async function fetchApiData() {
      try {
        setLoading(true)
        const { data } = await axios.get("https://remote-internship-api-production.up.railway.app/popularCollections")
        setInfo(data.data);
        
      }
      catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
  
  
    useEffect(() => {
      console.log(info)
      fetchApiData();
      
      // Initialize AOS
      AOS.init({
        duration: 1000, // Default duration
        once: true, // Animation happens only once
        offset: 200, // Higher offset means animation triggers earlier when scrolling
        delay: 0, // No global delay
        easing: 'ease-out', // Smooth easing
        mirror: false, // Don't repeat animation when scrolling up
      });
    }, [])

    // Refresh AOS when loading changes
    useEffect(() => {
      if (!loading) {
        AOS.refresh();
      }
    }, [loading]);
  
    if (loading) {
      return (
        <section id="popular-collections">
          <div className="container">
            <div className="row">
              <h2 className="popular-collections__title">Popular Collections</h2>
              <div className="popular-collections__body" style={{ display: "flex", gap: "30px" }}>
                {Array.from({ length: 6 }).map((_, index) => (
                  <div className="collection-column popular__collections__column" key={index}>
                    <div className="collection">
                      <Skeleton height={180} style={{ borderRadius: "12px 12px 0 0" }} />
                      <div className="collection__info">
                        <h3 className="collection__name">
                          <Skeleton width={120} height={24} />
                        </h3>
                        <div className="collection__stats">
                          <div className="collection__stat">
                            <span className="collection__stat__label">
                              <Skeleton width={40} height={16} />
                            </span>
                            <span className="collection__stat__data">
                              <Skeleton width={60} height={18} />
                            </span>
                          </div>
                          <div className="collection__stat">
                            <span className="collection__stat__label">
                              <Skeleton width={80} height={16} />
                            </span>
                            <span className="collection__stat__data">
                              <Skeleton width={60} height={18} />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      );
    }

  return (
    <section id="popular-collections">
      <div className="container">
        <div className="row">
          <h2 className="popular-collections__title" data-aos="fade-up" data-aos-duration="800">
            Popular Collections
          </h2>
          <div className="arrow__swiper__left">
            <FontAwesomeIcon icon={faCircleLeft} />
          </div>
          <div className="arrow__swiper__right">
            <FontAwesomeIcon icon={faCircleRight} />
          </div>
          <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
            <Swiper
                        modules={[Navigation, Scrollbar]}
                        slidesPerView={6}
                        slidesPerGroup={1}
                        spaceBetween={30}
                        navigation={true}
                        loop={true}
                        breakpoints={{
                          1600: { slidesPerView: 6 },
                          1200: { slidesPerView: 4 },
                          1024: { slidesPerView: 3 },
                          900:  { slidesPerView: 3 },
                          600:  { slidesPerView: 2 },
                          0:    { slidesPerView: 1 }
                        }}
            >
              <div className="popular-collections__body">
                {loading ? "loading" : info.map((_, index) => (
                  <SwiperSlide key={index}>
                    <div className="collection-column popular__collections__column">
                        <Link to={`/collection/${info[index].collectionId}`} key={index} className="collection">
                          <img
                            src={info[index].imageLink}
                            alt=""
                            className="collection__img"
                          />
                          <div className="collection__info">
                            <h3 className="collection__name">{info[index].title}</h3>
                            <div className="collection__stats">
                              <div className="collection__stat">
                                <span className="collection__stat__label">Floor</span>
                                <span className="collection__stat__data">{Number(info[index].floor).toFixed(2)} ETH</span>
                              </div>
                              <div className="collection__stat">
                                <span className="collection__stat__label">
                                  Total Volume
                                </span>
                                <span className="collection__stat__data">{info[index].totalVolume} ETH</span>
                              </div>
                            </div>
                          </div>
                        </Link>
                    </div>
                  </SwiperSlide>
                ))}
              </div>
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}