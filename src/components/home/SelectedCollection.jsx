import React, { useEffect, useState } from "react";
import SelectedItemVideo from "../../assets/selected-collection.mp4";
import SelectedItemThumbnail from "../../assets/selected-collection-thumbnail.jpg";
import SelectedItemLogo from "../../assets/selected-collection-logo.avif";
import VerifiedIcon from "../../assets/verified.png";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function SelectedCollection() {

  const [info, setInfo] = useState([])
  const [loading, setLoading] = useState(true); // Changed to true for initial loading

  async function fetchApiData() {
    try {
      setLoading(true)
      const { data } = await axios.get("https://remote-internship-api-production.up.railway.app/selectedCollection")
      setInfo(data.data);
      
    }
    catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchApiData();
  }, [])

  if (loading) {
    return (
      <header>
        <div className="selected-collection">
          <SkeletonTheme baseColor="#f3f4f6" highlightColor="#e5e7eb">
            <div className="selected-collection__bg" style={{ 
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: -1
            }}>
              <Skeleton height="100%" width="100%" />
            </div>
          </SkeletonTheme>
        </div>
      </header>
    );
  }

  if (!info) return <div>No data found.</div>;

  return (
    <header>
      <div className="selected-collection">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={info.thumbnail}
          src={info.videoLink}
          className="selected-collection__bg"
        />
        <div className="selected-collection__description">
          <img
            src={info.logo}
            alt=""
            className="selected-collection__logo"
          />
          <h1 className="selected-collection__title">
            {info.title}
          </h1>
          <Link to={`/user/${info.creatorId}`} className="selected-collection__author">
            By {info.creator}
            <img
              src={VerifiedIcon}
              className="selected-collection__author__verified"
              alt="Verified"
            />
          </Link>
          <div className="selected-collection__details">{info.amountOfItems} Items · {info.floorPrice} ETH</div>
          <Link to={`/collection/${info.collectionId}`} className="selected-collection__button">
            <div className="green-pulse"></div>
            View Collection
          </Link>
        </div>
      </div>
    </header>
  );
}