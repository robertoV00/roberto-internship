import { faEthereum } from "@fortawesome/free-brands-svg-icons";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function UserPage() {
  const [info, setInfo] = useState([]);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [collectionsCount, setCollectionsCount] = useState(12);
  const [sortOption, setSortOption] = useState("");

  async function fetchApiData() {
    try {
      setLoading(true);
      const { data } = await axios.get(`https://remote-internship-api-production.up.railway.app/user/${id}`);
      setInfo(data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(true); // Fixed: was setting to true
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchApiData();
  }, [id]);

  let sortedItems = [...(info?.items || [])];
  if (sortOption === "price-high") {
    sortedItems.sort((a, b) => Number(b.price) - Number(a.price));
  } else if (sortOption === "price-low") {
    sortedItems.sort((a, b) => Number(a.price) - Number(b.price));
  }

  return (
    <SkeletonTheme baseColor="#ebebeb" highlightColor="#f5f5f5">
      <>
        {/* Header Section */}
        <header
          style={{
            backgroundImage: loading ? 'none' : `url('${info.imageLink}')`,
            backgroundColor: loading ? '#ebebeb' : 'transparent',
            minHeight: '300px'
          }}
          id="user-header"
        >
          {loading && <Skeleton height="300px" />}
        </header>

        {/* User Info Section */}
        <section id="user-info">
          <div className="row">
            <div className="user-info__wrapper">
              <figure className="user-info__img__wrapper">
                {loading ? (
                  <Skeleton circle width={120} height={120} className="user-info__img" />
                ) : (
                  <img
                    src={info.profilePicture}
                    alt=""
                    className="user-info__img"
                  />
                )}
              </figure>
              
              <h1 className="user-info__name">
                {loading ? <Skeleton width={200} height={32} /> : info.name}
              </h1>
              
              <div className="user-info__details">
                <span className="user-info__wallet">
                  {loading ? (
                    <>
                      <Skeleton width={24} height={24} style={{ marginRight: '8px' }} />
                      <Skeleton width={180} height={20} />
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon
                        icon={faEthereum}
                        className="user-info__wallet__icon"
                      />
                      <span className="user-info__wallet__data">{info.walletCode}</span>
                    </>
                  )}
                </span>
                
                <span className="user-info__year">
                  <span className="user-info__year__data">
                    {loading ? (
                      <Skeleton width={120} height={20} />
                    ) : (
                      `Joined ${info.creationDate}`
                    )}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* User Items Section */}
        <section id="user-items">
          <div className="row user-items__row">
            <div className="user-items__header">
              <div className="user-items__header__left">
                <span className="user-items__header__text">
                  {loading ? (
                    <Skeleton width={80} height={24} />
                  ) : (
                    `${info?.items?.length || 0} items`
                  )}
                </span>
              </div>
              
              {loading ? (
                <Skeleton width={160} height={40} />
              ) : (
                <select 
                  className="user-items__header__sort"
                  value={sortOption}
                  onChange={e => setSortOption(e.target.value)}
                >
                  <option value="">Default</option>
                  <option value="price-high">Price high to low</option>
                  <option value="price-low">Price low to high</option>
                </select>
              )}
            </div>
            
            <div className="user-items__body">
              {loading ? (
                // Loading skeleton for items
                [...Array(collectionsCount)].map((_, idx) => (
                  <div className="item-column" key={idx}>
                    <div className="item">
                      <figure className="item__img__wrapper">
                        <Skeleton width="100%" height={250} />
                      </figure>
                      
                      <div className="item__details">
                        <span className="item__details__name">
                          <Skeleton width="80%" height={18} />
                        </span>
                        <span className="item__details__price">
                          <Skeleton width={60} height={16} />
                        </span>
                        <span className="item__details__last-sale">
                          <Skeleton width={100} height={14} />
                        </span>
                      </div>
                      
                    </div>
                  </div>
                ))
              ) : (
                // Actual items when loaded
                sortedItems.slice(0, collectionsCount).map((item, index) => (
                  <div className="item-column" key={item.itemId || index}>
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
                        <button className="item__see-more__button">See More</button>
                        <div className="item__see-more__icon">
                          <FontAwesomeIcon icon={faShoppingBag} />
                        </div>
                      </div>
                    </Link>
                  </div>
                ))
              )}
              
              {/* Load more button */}
              {!loading && collectionsCount < (info?.items?.length || 0) && (
                <button
                  className="collection-page__button"
                  style={{ margin: "32px auto 0", display: "block" }}
                  onClick={() => setCollectionsCount(prev => prev + 6)}
                >
                  Load more
                </button>
              )}
            </div>
          </div>
        </section>
      </>
    </SkeletonTheme>
  );
}