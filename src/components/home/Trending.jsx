import React, { useEffect, useState } from "react";
import VerifiedIcon from "../../assets/verified.png";
import TrendingCollection from "../../assets/trending-collection.avif";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function Trending() {

  const [info, setInfo] = useState([])
  const [loading, setLoading] = useState(true);
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [animate, setAnimate] = useState(false);

  async function fetchApiData() {
    try {
      setLoading(true)
      const { data } = await axios.get("https://remote-internship-api-production.up.railway.app/trendingNFTs")
      setInfo(data.data);
    }
    catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
      // Hide skeleton after a brief delay to let animation complete
      setTimeout(() => {
        setShowSkeleton(false);
      }, 1000);
    }
  }

  useEffect(() => {
    console.log(info)
    fetchApiData();
    setTimeout(() => {
      setAnimate(true);
    }, 100);
  }, [])

  // Control when to show actual content vs skeleton
  const shouldShowSkeleton = loading || showSkeleton;

  const TrendingCollectionSkeleton = () => (
  <div className="trending-collection">
    <div className="trending-collection__rank">
      <Skeleton width={20} />
    </div>
    <div className="trending-collection__collection">
      <figure className="trending-collection__img__wrapper">
        <Skeleton 
          height={100} 
          width={70} 
          borderRadius="0%" 
          className="trending-collection__img"
        />
      </figure>
      <div className="trending-collection__name">
        <Skeleton width={120} height={16} />
      </div>
      <Skeleton 
        width={16} 
        height={16} 
        borderRadius="50%" 
        className="trending-collection__verified"
      />
    </div>
    <div className="trending-collection__price">
      <span className="trending-collection__price__span">
        <Skeleton width={80} />
      </span>
    </div>
    <div className="trending-collection__volume">
      <span className="trending-collection__volume__span">
        <Skeleton width={100} />
      </span>
    </div>
  </div>
);

  return (
    <>
      <style jsx>{`
        .fade-up-load {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        
        .fade-up-load.animate {
          opacity: 1;
          transform: translateY(0);
        }
        
        .fade-up-load-delayed {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 1s ease-out, transform 1s ease-out;
          transition-delay: 0.2s;
        }
        
        .fade-up-load-delayed.animate {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
      
      <section id="trending">
        <div className="container">
          <div className="row trending__row">
            <div className={`trending__header fade-up-load ${animate ? 'animate' : ''}`}>
              <h2 className="trending__header__title">Trending NFTs</h2>
              <Link className="trending__header__button" to={"/collections"}>
                View All
              </Link>
            </div>
            <div className={`trending__body fade-up-load-delayed ${animate ? 'animate' : ''}`}>
              <SkeletonTheme baseColor="#dfdfdfff" highlightColor="#dfdfdfff">
                <div className="trending-column">
                  <div className="trending-column__header">
                    <div className="trending-column__header__rank">#</div>
                    <div className="trending-column__header__collection">
                      Collection
                    </div>
                    <div className="trending-column__header__price">
                      Floor Price
                    </div>
                    <div className="trending-column__header__price">Volume</div>
                  </div>
                  <div className="trending-column__body">
                    {shouldShowSkeleton ? (
                      Array.from({ length: 5 }, (_, index) => (
                        <TrendingCollectionSkeleton key={index} rank={index + 1} />
                      ))
                    ) : (
                      new Array(5).fill(0).map((_, index) => (
                        <Link
                          to={`/collection/${info[index].collectionId}`}
                          key={index}
                          className="trending-collection"
                        >
                          <div className="trending-collection__rank">{info[index].rank}</div>
                          <div className="trending-collection__collection">
                            <figure className="trending-collection__img__wrapper">
                              <img
                                src={info[index].imageLink}
                                alt=""
                                className="trending-collection__img"
                              />
                            </figure>
                            <div className="trending-collection__name">
                              {info[index].title}
                            </div>
                            <img
                              src={VerifiedIcon}
                              className="trending-collection__verified"
                            />
                          </div>
                          <div className="trending-collection__price">
                            <span className="trending-collection__price__span">
                              {Number(info[index].floor).toFixed(2)} ETH
                            </span>
                          </div>
                          <div className="trending-collection__volume">
                            <span className="trending-collection__volume__span">
                              {info[index].totalVolume} ETH
                            </span>
                          </div>
                        </Link>
                      ))
                    )}
                  </div>
                </div>
                <div className="trending-column">
                  <div className="trending-column__header trending-column__header2">
                    <div className="trending-column__header__rank">#</div>
                    <div className="trending-column__header__collection">
                      Collection
                    </div>
                    <div className="trending-column__header__price">
                      Floor Price
                    </div>
                    <div className="trending-column__header__price">Volume</div>
                  </div>
                  <div className="trending-column__body">
                    {shouldShowSkeleton ? (
                      Array.from({ length: 5 }, (_, index) => (
                        <TrendingCollectionSkeleton key={index + 5} rank={index + 6} />
                      ))
                    ) : (
                      new Array(5).fill(0).map((_, index) => (
                        <Link
                          to={`/collection/${info[index + 5].collectionId}`}
                          key={index}
                          className="trending-collection"
                        >
                          <div className="trending-collection__rank">{info[index + 5].rank}</div>
                          <div className="trending-collection__collection">
                            <figure className="trending-collection__img__wrapper">
                              <img
                                src={info[index + 5].imageLink}
                                alt=""
                                className="trending-collection__img"
                              />
                            </figure>
                            <div className="trending-collection__name">
                              {info[index + 5].title}
                            </div>
                            <img
                              src={VerifiedIcon}
                              className="trending-collection__verified"
                            />
                          </div>
                          <div className="trending-collection__price">
                            <span className="trending-collection__price__span">
                              {Number(info[index + 5].floor).toFixed(2)} ETH
                            </span>
                          </div>
                          <div className="trending-collection__volume">
                            <span className="trending-collection__volume__span">
                              {info[index + 5].totalVolume} ETH
                            </span>
                          </div>
                        </Link>
                      ))
                    )}
                  </div>
                </div>
              </SkeletonTheme>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}