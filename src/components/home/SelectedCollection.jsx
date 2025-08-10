import React, { useEffect, useState } from "react";
import SelectedItemVideo from "../../assets/selected-collection.mp4";
import SelectedItemThumbnail from "../../assets/selected-collection-thumbnail.jpg";
import SelectedItemLogo from "../../assets/selected-collection-logo.avif";
import VerifiedIcon from "../../assets/verified.png";
import { Link } from "react-router-dom";
import axios from "axios";


export default function SelectedCollection() {

  const [info, setInfo] = useState([])
  const [loading, setLoading] = useState(false);

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
