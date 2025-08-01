import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
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
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Navigation, Pagination, Scrollbar} from 'swiper/modules';

export default function NewCollections() {

  const [info, setInfo] = useState([])
  const [loading, setLoading] = useState(true);

  async function fetchApiData() {
    try {
      setLoading(true)
      const { data } = await axios.get("https://remote-internship-api-production.up.railway.app/newCollections")
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
  }, [])

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
    <section id="new-collections">
      <div className="container">
        <div className="row">
          <h2 className="new-collections__title">New Collections</h2>
          <div className="arrow__swiper__left">
            <FontAwesomeIcon icon={faCircleLeft} />
          </div>
          <div className="arrow__swiper__right">
            <FontAwesomeIcon icon={faCircleRight} />
          </div>
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
            <div className="new-collections__body">
              {loading ? "loading" : info.map((_, index) => (
                <SwiperSlide key={index}>
                  <div className="collection-column new__collections__column">
                    <Link to="/collection" key={index} className="collection">
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
                            <span className="collection__stat__data">{info[index].floor} ETH</span>
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
    </section>
  );
}
