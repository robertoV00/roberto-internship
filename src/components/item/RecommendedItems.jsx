import { faShoppingBag, faTableCells } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules'

export default function RecommendedItems({ collectionId }) {
  const [info, setInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const {id} = useParams();

  async function fetchApiData() {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://remote-internship-api-production.up.railway.app/collection/${collectionId}`
      );
      setInfo(data.data.items);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchApiData();
  }, [id]);

  return (
    <section id="recommended-items">
      <div className="container">
        <div className="row recommended-items__row">
          <div className="recommended-items__wrapper">
            <div className="recommended-items__header">
              <FontAwesomeIcon icon={faTableCells} />
              <h3 className="recommended-items__header__title">
                More from this collection
              </h3>
            </div>
            <div className="recommended-items__body">
              <Swiper
                modules={[Navigation]}
                loop={true}
                spaceBetween={20}
                slidesPerView={6}
                navigation
                // breakpoints={{
                //   640: { slidesPerView: 1 },
                //   900: { slidesPerView: 2 },
                //   1200: { slidesPerView: 3 },
                //   1599: { slidesPerView: 5 }
                // }}
              >
                {loading
                  ? new Array(6).fill(0).map((_, index) => (
                      <SwiperSlide key={index}>
                        <div className="item-column item-column-skeleton">
                          <div className="item recommended__item">
                            <figure className="item__img__wrapper">
                              <Skeleton width={300} height={280} />
                            </figure>
                            <div className="item__details">
                              <span className="item__details__name">
                                <Skeleton width={100} />
                              </span>
                              <span className="item__details__price">
                                <Skeleton width={60} />
                              </span>
                              <span className="item__details__last-sale">
                                <Skeleton width={80} />
                              </span>
                            </div>
                            <div className="item__see-more">
                              <Skeleton width={80} height={32} />
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))
                  : info.filter(item => item.itemId !== id).map((item, index) => (
                      <SwiperSlide className="recommended__item__swiper" key={item.itemId || index}>
                        <div className="item-column recommended__item__column">
                          <Link to={`/item/${item.itemId}`} className="item">
                            <figure className="item__img__wrapper">
                              <img
                                src={item.imageLink}
                                alt={item.title}
                                className="item__img"
                              />
                            </figure>
                            <div className="item__details">
                              <span className="item__details__name">{item.title}</span>
                              <span className="item__details__price">{item.price} ETH</span>
                              <span className="item__details__last-sale">
                                Last sale: {item.lastSale} ETH
                              </span>
                            </div>
                            <div className="item__see-more">
                              <button className="item__see-more__button">
                                See More
                              </button>
                              <div className="item__see-more__icon">
                                <FontAwesomeIcon icon={faShoppingBag} />
                              </div>
                            </div>
                          </Link>
                        </div>
                      </SwiperSlide>
                    ))}
              </Swiper>
            </div>
            <div className="recommended-items__footer">
              <Link
                to={`/collection/${collectionId}`}
                className="recommended-items__footer__button"
              >
                View Collection
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}