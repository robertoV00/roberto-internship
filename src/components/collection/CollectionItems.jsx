import { faEye } from "@fortawesome/free-regular-svg-icons";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function CollectionItems() {
  const [info, setInfo] = useState([]);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [collectionsCount, setCollectionsCount] = useState(12);
  const [sortOption, setSortOption] = useState(""); // <-- Add sort option state

  async function fetchApiData() {
    try {
      setLoading(true);
      const { data } = await axios.get(`https://remote-internship-api-production.up.railway.app/collection/${id}`);
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
  }, []);

  // Get the collection object
  const collection = info[0];

  let sortedItems = [...(collection?.items || [])];
  if (sortOption === "price-high") {
    sortedItems.sort((a, b) => Number(b.price) - Number(a.price));
  } else if (sortOption === "price-low") {
    sortedItems.sort((a, b) => Number(a.price) - Number(b.price));
  }

  if (loading || !collection) {
    return (
      <section id="collection-items">
        <div className="row collection-items__row">
          <div className="collection-items__body">
            {[...Array(collectionsCount)].map((_, idx) => (
              <div className="item-column" key={idx}>
                <div className="item">
                  <figure className="item__img__wrapper">
                    <Skeleton width={180} height={180} />
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
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="collection-items">
      <div className="row collection-items__row">
        <div className="collection-items__header">
          <div className="collection-items__header__left">
            <span className="collection-items__header__live">
              <div className="green-pulse"></div>
              Live
            </span>
            <span className="collection-items__header__results">
              {collection.items.length} results
            </span>
          </div>
          <select
            className="collection-items__header__sort"
            value={sortOption}
            onChange={e => setSortOption(e.target.value)}
          >
            <option value="">Default</option>
            <option value="price-high">Price high to low</option>
            <option value="price-low">Price low to high</option>
          </select>
        </div>
        <div className="collection-items__body">
          {sortedItems.slice(0, collectionsCount).map((item, index) => (
            <div className="item-column" key={item.id || index}>
              <Link to={`/item/${item.id}`} className="item">
                <figure className="item__img__wrapper">
                  <img
                    src={item.imageLink}
                    alt={item.name}
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
          ))}
        {collectionsCount < collection.items.length && (
          <button
            className="collections-page__button"
            style={{ margin: "32px auto 0", display: "block" }}
            onClick={() => setCollectionsCount(prev => prev + 6)}
          >
            Load more
          </button>
        )}
        </div>
      </div>
    </section>
  );
}