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

export default function ItemPage() {
    const [info, setInfo] = useState([]);
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const collection = info.find(item => String(item.id) === String(id)); //this is to find the collection by id
  
    // Fetch the collection by id
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
                    <span className="item-page__img__likes__text">11</span>
                  </div>
                </div>
                <img
                  src="https://i.seadn.io/gcs/files/0a085499e0f3800321618af356c5d36b.png?auto=format&dpr=1&w=1000"
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
                Meebits
              </Link>
              <h1 className="item-page__name">Meebit #18854</h1>
              <span className="item-page__owner">
                Owned by{" "}
                <Link
                  to={"/user"}
                  className="light-blue item-page__owner__link"
                >
                  shilpixels
                </Link>
              </span>
              <div className="item-page__details">
                <div className="item-page__detail">
                  <FontAwesomeIcon
                    icon={faEye}
                    className="item-page__detail__icon"
                  />
                  <span className="item-page__detail__text">324 views</span>
                </div>
                <div className="item-page__detail">
                  <FontAwesomeIcon
                    icon={faHeart}
                    className="item-page__detail__icon"
                  />
                  <span className="item-page__detail__text">11 favorites</span>
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
                  <span>Sale ends in 2h 30m 56s</span>
                </div>
                <div className="item-page__sale__body">
                  <span className="item-page__sale__label">Current price</span>
                  <div className="item-page__sale__price">
                    <span className="item-page__sale__price__eth">100 ETH</span>
                    <span className="item-page__sale__price__dollars">
                      $314,884.00
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
