import React, { useEffect, useState } from "react";
import VerifiedIcon from "../../assets/verified.png";
import TrendingCollection from "../../assets/trending-collection.avif";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Trending() {

  const [info, setInfo] = useState([])
  const [loading, setLoading] = useState(true);

  async function fetchApiData() {
    try {
      setLoading(true)
      const { data } = await axios.get("https://remote-internship-api-production.up.railway.app/trendingNFTs")
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
    <section id="trending">
      <div className="container">
        <div className="row trending__row">
          <div className="trending__header">
            <h2 className="trending__header__title">Trending NFTs</h2>
            <Link className="trending__header__button" to={"/collections"}>
              View All
            </Link>
          </div>
          <div className="trending__body">
            <div className="trending-column">
              <div className="trending-column__header">
                <div className="trending-column__header__rank">#</div>
                <div className="trending-column__header__collection">
                  Collection
                </div>
                <div className="trending-column__header__price">
                  Floor Price
                </div>
                <div className="trending-column__header__price">Volume</div>
              </div>
              <div className="trending-column__body">
                {loading ? "loading" : new Array(5).fill(0).map((_, index) => (
                  <Link
                    to={`/collection${info.collectionId}`}
                    key={index}
                    className="trending-collection"
                  >
                    <div className="trending-collection__rank">{info[index].rank}</div>
                    <div className="trending-collection__collection">
                      <figure className="trending-collection__img__wrapper">
                        <img
                          src={info[index].imageLink}
                          alt=""
                          className="trending-collection__img"
                        />
                      </figure>
                      <div className="trending-collection__name">
                        {info[index].title}
                      </div>
                      <img
                        src={VerifiedIcon}
                        className="trending-collection__verified"
                      />
                    </div>
                    <div className="trending-collection__price">
                      <span className="trending-collection__price__span">
                        {Number(info[index].floor).toFixed(2)} ETH
                      </span>
                    </div>
                    <div className="trending-collection__volume">
                      <span className="trending-collection__volume__span">
                        {info[index].totalVolume} ETH
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <div className="trending-column">
              <div className="trending-column__header trending-column__header2">
                <div className="trending-column__header__rank">#</div>
                <div className="trending-column__header__collection">
                  Collection
                </div>
                <div className="trending-column__header__price">
                  Floor Price
                </div>
                <div className="trending-column__header__price">Volume</div>
              </div>
              <div className="trending-column__body">
                {loading ? "loading" : new Array(5).fill(0).map((_, index) => (
                  <Link
                    to={"/collection"}
                    key={index}
                    className="trending-collection"
                  >
                    <div className="trending-collection__rank">{info[index + 5].rank}</div>
                    <div className="trending-collection__collection">
                      <figure className="trending-collection__img__wrapper">
                        <img
                          src={info[index + 5 ].imageLink}
                          alt=""
                          className="trending-collection__img"
                        />
                      </figure>
                      <div className="trending-collection__name">
                        {info[index + 5].title}
                      </div>
                      <img
                        src={VerifiedIcon}
                        className="trending-collection__verified"
                      />
                    </div>
                    <div className="trending-collection__price">
                      <span className="trending-collection__price__span">
                        {Number(info[index + 5].floor).toFixed(2)} ETH
                      </span>
                    </div>
                    <div className="trending-collection__volume">
                      <span className="trending-collection__volume__span">
                        {info[index + 5].totalVolume} ETH
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
