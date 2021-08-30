import React, { useState, useEffect } from "react";
import CoinGecko from "coingecko-api";
import {Link} from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  const [tokenData, SetTokenData] = useState([]);
  useEffect(() => {
    const CoinGeckoClient = new CoinGecko();
    var func = async () => {
      let data = await CoinGeckoClient.coins.all();
      console.log(data);
      SetTokenData(data.data);
      return data;
    };
    func();
  }, []);
  if (tokenData.lenght < 1) return <></>;
  else
    return (
      <div className="App container">
        <h1 className="border rounded text-center text-capitalize p-2 m-2">
          crypto monster
        </h1>
        <div className="d-flex row justify-content-center">
          {tokenData.map((data, index) => {
            return (
              <div
                key={index}
                className="col-1 border text-center rounded p-1 m-1 "
              >
                <Link to={'/details/'+data.symbol} className='text-decoration-none text-light'>
                  <p> {data.name} </p>
                  <img src={data.image.thumb} />
                </Link>
                
              </div>
            );
          })}
        </div>
      </div>
    );
}
