import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";


export default function CollectionInfo() {

    const [info, setInfo] = useState([])
    const {id} = useParams();
    const [loading, setLoading] = useState(true);
    const collection = info.find(item => String(item.id) === String(id)); //this is to find the collection by id
    
    async function fetchApiData() {
      try {
        setLoading(true)
        const { data } = await axios.get(`https://remote-internship-api-production.up.railway.app/collection/${id}`)
        setInfo([data.data]);
        
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
      <section id="collection-info">
        <div className="row">
          <div className="collection-info__wrapper">
            <p className="collection-info__description">
              <Skeleton count={4} height={18} />
            </p>
            <div className="collection-info__details">
              <span className="collection-info__detail">
                <span className="collection-info__detail__data">
                  <Skeleton width={50} height={16} inline />
                </span>
              </span>
              
              <span className="collection-info__detail">
                <span className="collection-info__detail__data">
                  <Skeleton width={160} height={16} inline />
                </span>
              </span>
              
              <span className="collection-info__detail">
                <span className="collection-info__detail__data">
                  <Skeleton width={60} height={16} inline />
                </span>
              </span>
              
              <span className="collection-info__detail">
                <span className="collection-info__detail__data">
                  <Skeleton width={60} height={16} inline />
                </span>
              </span>
            </div>
          </div>
        </div>
      </section>
    );
  }
  

  return (
    <section id="collection-info">
      <div className="row">
        <div className="collection-info__wrapper">
          <p className="collection-info__description">
            {collection.description}
          </p>
          <div className="collection-info__details">
            <span className="collection-info__detail">
              Items
              <span className="collection-info__detail__data"> 30</span>
            </span>
            ·
            <span className="collection-info__detail">
              Created
              <span className="collection-info__detail__data"> {collection.createdDate}</span>
            </span>
            ·
            <span className="collection-info__detail">
              Creator earnings
              <span className="collection-info__detail__data"> {collection.creatorEarnings}%</span>
            </span>
            ·
            <span className="collection-info__detail">
              Chain
              <span className="collection-info__detail__data"> {collection.chain}</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
