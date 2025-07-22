import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleLeft } from '@fortawesome/free-regular-svg-icons';
import { faCircleRight } from '@fortawesome/free-regular-svg-icons';

export default function NewCollections() {

  const [info, setInfo] = useState([])
  const [loading, setLoading] = useState(true);

  async function fetchApiData() {
    try {
      setLoading(true)
      const { data } = await axios.get("https://remote-internship-api-production.up.railway.app/newCollections")
      setInfo(data.data);
      
    }
    catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    console.log(info)
    fetchApiData();
  }, [])

  
  
  return (
    <section id="new-collections">
      <div className="container">
        <div className="row">
        <FontAwesomeIcon className="arrow__swiper__left" icon={faCircleLeft} />
        <FontAwesomeIcon className="arrow__swiper__right" icon={faCircleRight} />
          <h2 className="new-collections__title">New Collections</h2>
          <div className="new-collections__body">
            {loading ? "loading" : new Array(6).fill(0).map((_, index) => (
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
                        <span className="collection__stat__data">{info[index].floor} ETH</span>
                      </div>
                      <div className="collection__stat">
                        <span className="collection__stat__label">
                          Total Volume
                        </span>
                        <span className="collection__stat__data">{info[index].totalVolume} ETH</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
