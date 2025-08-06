import { faShoppingBag, faTableCells } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import axios from "axios";

export default function RecommendedItems() {

      const [info, setInfo] = useState([]);
      const { id } = useParams();
      const [loading, setLoading] = useState(true);
      const collection = info[0]; //this is to find the collection by id
    
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
      }, []);



  return (
    <section id="recommended-items">
      <div className="container">
        <div className="row recommended-items__row">
          <div className="recommended-items__wrapper">
            <div className="recommended-items__header">
              <FontAwesomeIcon icon={faTableCells} />
              <h3 className="recommended-items__header__title">
                More from this collection
              </h3>
            </div>
            <div className="recommended-items__body">
              {new Array(6).fill(0).map((_, index) => (
                <div className="item-column">
                  <Link to={"/item"} key={index} className="item">
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
                    <div className="item__see-more">
                      <button className="item__see-more__button">
                        See More
                      </button>
                      <div className="item__see-more__icon">
                        <FontAwesomeIcon icon={faShoppingBag} />
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            <div className="recommended-items__footer">
              <Link
                to={"/collection"}
                className="recommended-items__footer__button"
              >
                View Collection
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
