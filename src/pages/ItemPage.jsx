import { faEye, faHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faShapes,
  faTag,
  faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import RecommendedItems from "../components/item/RecommendedItems";
import { faEthereum } from "@fortawesome/free-brands-svg-icons";
import { Link, useParams } from "react-router-dom";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import axios from "axios";

export default function ItemPage() {
    const [info, setInfo] = useState([]);
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const collection = info[0]; //this is to find the collection by id

    const [timeLeft, setTimeLeft] = useState({
      hours: 2,
      minutes: 30,
      seconds: 56
    })
    


  
    // Fetch the collection by id
    async function fetchApiData() {
      try {
        setLoading(true);
        const { data } = await axios.get(`https://remote-internship-api-production.up.railway.app/item/${id}`);
        setInfo([data.data]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
  
    useEffect(() => {
      window.scrollTo(0, 0);
      fetchApiData();
    }, [id]);
    
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prevTime => {
                let { hours, minutes, seconds } = prevTime;
                
                if (seconds > 0) {
                    seconds--;
                } else if (minutes > 0) {
                    minutes--;
                    seconds = 59;
                } else if (hours > 0) {
                    hours--;
                    minutes = 59;
                    seconds = 59;
                } else {
                    // this is when the timer reaches zero
                    return { hours: 0, minutes: 0, seconds: 0 };
                }
                
                return { hours, minutes, seconds };
            });
        }, 1000);

        // this clears the timer
        return () => clearInterval(timer);
    }, []);

    if (loading || !collection) {
      return (
        <section id="item-info">
          <div className="container">
            <div className="row item-page__row">
              <div className="item-page__left">
                <figure className="item-page__img__wrapper">
                  <div className="item-page__img__details">
                    <Skeleton width={32} height={32} circle />
                    <div className="item-page__img__likes">
                      <Skeleton width={32} height={32} circle />
                      <Skeleton width={30} height={18} />
                    </div>
                  </div>
                  <Skeleton width={400} height={400} />
                </figure>
              </div>
              <div className="item-page__right">
                <Skeleton width={120} height={24} style={{ marginBottom: 8 }} />
                <Skeleton width={220} height={40} style={{ marginBottom: 8 }} />
                <Skeleton width={180} height={20} style={{ marginBottom: 16 }} />
                <div className="item-page__details">
                  <Skeleton width={100} height={20} count={3} style={{ marginBottom: 8 }} />
                </div>
                <div className="item-page__sale">
                  <div className="item-page__sale__header">
                    <Skeleton width={160} height={20} />
                  </div>
                  <div className="item-page__sale__body">
                    <Skeleton width={100} height={18} style={{ marginBottom: 8 }} />
                    <Skeleton width={120} height={32} style={{ marginBottom: 8 }} />
                    <Skeleton width={200} height={40} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    }

  return (
    <>
      <section id="item-info">
        <div className="container">
          <div className="row item-page__row">
            <div className="item-page__left">
              <figure className="item-page__img__wrapper">
                <div className="item-page__img__details">
                  <FontAwesomeIcon
                    icon={faEthereum}
                    className="item-page__img__icon"
                  />
                  <div className="item-page__img__likes">
                    <FontAwesomeIcon
                      icon={faHeart}
                      className="item-page__img__icon"
                    />
                    <span className="item-page__img__likes__text">{collection.favorites}</span>
                  </div>
                </div>
                <img
                  src={collection.imageLink}
                  alt=""
                  className="item-page__img"
                />
              </figure>
            </div>
            <div className="item-page__right">
              <Link
                to={"/collection"}
                className="item-page__collection light-blue"
              >
                {collection.collection}
              </Link>
              <h1 className="item-page__name">{collection.title}</h1>
              <span className="item-page__owner">
                Owned by{" "}
                <Link
                  to={"/user"}
                  className="light-blue item-page__owner__link"
                >
                  {collection.owner}
                </Link>
              </span>
              <div className="item-page__details">
                <div className="item-page__detail">
                  <FontAwesomeIcon
                    icon={faEye}
                    className="item-page__detail__icon"
                  />
                  <span className="item-page__detail__text">{collection.views} views</span>
                </div>
                <div className="item-page__detail">
                  <FontAwesomeIcon
                    icon={faHeart}
                    className="item-page__detail__icon"
                  />
                  <span className="item-page__detail__text">{collection.favorites} favorites</span>
                </div>
                <div className="item-page__detail">
                  <FontAwesomeIcon
                    icon={faShapes}
                    className="item-page__detail__icon"
                  />
                  <span className="item-page__detail__text">PFPs</span>
                </div>
              </div>
              <div className="item-page__sale">
                <div className="item-page__sale__header">
                  <div className="green-pulse"></div>
                  <span>Sale ends in
                    <span className="item-page__hour"> {timeLeft.hours}h</span> 
                    <span className="item-page__minutes"> {timeLeft.minutes}m</span> 
                    <span className="item-page__seconds"> {timeLeft.seconds}s</span>
                  </span>
                </div>
                <div className="item-page__sale__body">
                  <span className="item-page__sale__label">Current price</span>
                  <div className="item-page__sale__price">
                    <span className="item-page__sale__price__eth">{collection.ethPrice} ETH</span>
                    <span className="item-page__sale__price__dollars">
                      {collection.usdPrice}
                    </span>
                  </div>
                  <div className="item-page__sale__buttons">
                    <div className="item-page__sale__buy">
                      <button className="item-page__sale__buy__button disabled">
                        Buy now
                      </button>
                      <button className="item-page__sale__buy__icon disabled">
                        <FontAwesomeIcon icon={faShoppingBag} />
                      </button>
                    </div>
                    <button className="item-page__sale__offer disabled">
                      <FontAwesomeIcon icon={faTag} />
                      Make offer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <RecommendedItems />
    </>
  );
}
