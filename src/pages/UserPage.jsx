import { faEthereum } from "@fortawesome/free-brands-svg-icons";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function UserPage() {

    const [info, setInfo] = useState([]);
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [collectionsCount, setCollectionsCount] = useState(12);
    const [sortOption, setSortOption] = useState(""); // <-- Add sort option state
  
    async function fetchApiData() {
      try {
        setLoading(true);
        const { data } = await axios.get(`https://remote-internship-api-production.up.railway.app/user/${id}`);
        setInfo(data.data);
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!info) {
    return <div>User not found</div>;
  }

  

  return (
    <>
      <header
        style={{
          backgroundImage: `url('${info.imageLink}')`,
        }}
        id="user-header"
      ></header>

      <section id="user-info">
        <div className="row">
          <div className="user-info__wrapper">
            <figure className="user-info__img__wrapper">
              <img
                src={info.profilePicture}
                alt=""
                className="user-info__img"
              />
            </figure>
            <h1 className="user-info__name">{info.name}</h1>
            <div className="user-info__details">
              <span className="user-info__wallet">
                <FontAwesomeIcon
                  icon={faEthereum}
                  className="user-info__wallet__icon"
                />
                <span className="user-info__wallet__data">{info.walletCode}</span>
              </span>
              <span className="user-info__year">
                <span className="user-info__year__data">
                  Joined {info.creationDate}
                </span>
              </span>
            </div>
          </div>
        </div>
      </section>

      <section id="user-items">
        <div className="row user-items__row">
          <div className="user-items__header">
            <div className="user-items__header__left">
              <span className="user-items__header__text">163 items</span>
            </div>
            <select className="user-items__header__sort">
              <option value="">Recently purchased</option>
              <option value="">Price high to low</option>
              <option value="">Price low to high</option>
            </select>
          </div>
          <div className="user-items__body">
            {new Array(10).fill(0).map((_, index) => (
              <div className="item-column" key={index}>
                <Link to={"/item"} className="item">
                  <figure className="item__img__wrapper">
                    <img
                      src="https://i.seadn.io/gcs/files/0a085499e0f3800321618af356c5d36b.png?auto=format&dpr=1&w=384"
                      alt=""
                      className="item__img"
                    />
                  </figure>
                  <div className="item__details">
                    <span className="item__details__name">Meebit #0001</span>
                    <span className="item__details__price">0.98 ETH</span>
                    <span className="item__details__last-sale">
                      Last sale: 7.45 ETH
                    </span>
                  </div>
                  <a className="item__see-more" href="#">
                    <button className="item__see-more__button">See More</button>
                    <div className="item__see-more__icon">
                      <FontAwesomeIcon icon={faShoppingBag} />
                    </div>
                  </a>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <button className="collection-page__button">Load more</button>
      </section>
    </>
  );
}
