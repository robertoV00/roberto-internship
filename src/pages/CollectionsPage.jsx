import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function CollectionsPage() {

    const [info, setInfo] = useState([])
    const [loading, setLoading] = useState(true);
    const [collectionsCount, setCollectionsCount] = useState(12);
  
    async function fetchApiData() {
      try {
        setLoading(true)
        const { data } = await axios.get("https://remote-internship-api-production.up.railway.app/collections")
        setInfo(data.data);
        
      }
      catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
  
    useEffect(() => {
      window.scrollTo(0, 0);
      fetchApiData();
    }, []);
    
    if (loading) {
      return (
        <header>
          <div className="selected-collection">
            <div className="skeleton-video skeleton" />
            <div className="selected-collection__description">
              <div className="skeleton-logo skeleton" />
              <div className="skeleton-title skeleton" />
              <div className="skeleton-author skeleton" />
              <div className="skeleton-details skeleton" />
              <div className="skeleton-button skeleton" />
            </div>
          </div>
        </header>
      );
    }
  return (

    <div className="container">
      <div className="row">
        <h1 className="collections-page__title">Collections</h1>
        <div className="collections__body">
          {loading ? "loading" : info.slice(0, collectionsCount).map((collection, index) => (
            <div className="collection-column">
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
                      <span className="collection__stat__data">{Number(info[index].floor).toFixed(2)} ETH</span>
                    </div>
                    <div className="collection__stat">
                      <span className="collection__stat__label">
                        Total Volume
                      </span>
                      <span className="collection__stat__data">{info[index].totalVolume}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        {collectionsCount < info.length && (
          <button
          className="collections-page__button"
          onClick={() => {
              setCollectionsCount(prevCount => prevCount + 6);
          }}>
            Load more
          </button>
      )}
      </div>
    </div>
  );
}
