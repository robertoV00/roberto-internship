import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";



export default function CollectionHeader() {

  const [info, setInfo] = useState([])
  const {id} = useParams();
  const [loading, setLoading] = useState(true);
  const [collectionsCount, setCollectionsCount] = useState(12);
  const collection = info.find(item => String(item.id) === String(id)); //this is to find the collection by id
  
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

  if (loading || !collection) {
    return (
      <header id="collection-header">
        <div className="row collection-header__row">
          <div className="collection-header__content">
            <div className="collection-header__left">
              <Skeleton circle width={80} height={80} className="collection-header__img" />
              <div className="collection-header__name">
                <Skeleton width={200} height={32} />
              </div>
              <div className="collection-header__author">
                <Skeleton width={120} height={20} />
              </div>
            </div>
            <div className="collection-header__right">
              <div className="collection-header__columns">
                {[...Array(5)].map((_, i) => (
                  <div className="collection-header__column" key={i}>
                    <span className="collection-header__column__data">
                      <span className="semibold">
                        <Skeleton width={60} height={20} />
                      </span>
                    </span>
                    <span className="collection-header__column__label">
                      <Skeleton width={80} height={14} />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header
      style={{
        backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.95), rgba(0, 0, 0, 0.2)), 
        url('${collection.imageLink}')`,
      }}
      id="collection-header"
    >
      <div className="row collection-header__row">
        <div className="collection-header__content">
          <div className="collection-header__left">
            <img
              src={collection.logo}
              alt=""
              className="collection-header__img"
            />
            <div className="collection-header__name">{collection.title}</div>
            <Link to={'/user'} className="collection-header__author">{collection.creator}</Link>
          </div>
          <div className="collection-header__right">
            <div className="collection-header__columns">
              <div className="collection-header__column">
                <span className="collection-header__column__data">
                  <span className="semibold">{collection.totalVolume}</span> ETH
                </span>
                <span className="collection-header__column__label">
                  Total volume
                </span>
              </div>
              <div className="collection-header__column">
                <span className="collection-header__column__data">
                  <span className="semibold">{collection.floor}</span> ETH
                </span>
                <span className="collection-header__column__label">
                  Floor price
                </span>
              </div>
              <div className="collection-header__column">
                <span className="collection-header__column__data">
                  <span className="semibold">{collection.bestOffer}</span> ETH
                </span>
                <span className="collection-header__column__label">
                  Best offer
                </span>
              </div>
              <div className="collection-header__column">
                <span className="collection-header__column__data">
                  <span className="semibold">{collection.listed}%</span>
                </span>
                <span className="collection-header__column__label">Listed</span>
              </div>
              <div className="collection-header__column">
                <span className="collection-header__column__data">
                  <span className="semibold">{collection.owners}</span>
                </span>
                <span className="collection-header__column__label">
                  Owners (Unique)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
