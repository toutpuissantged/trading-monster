import React, { useState, useEffect } from "react";
import CoinGecko from "coingecko-api";
import Converter from "./converter";

export default function Details(props) {
  const [res, setRes] = useState([]);
  const [all_data,setAll_data] = useState([]);
  //console.log(props);
  const name = props.match.params.name;
  useEffect(() => {
    const CoinGeckoClient = new CoinGecko();
    var func = async () => {
      let data = await CoinGeckoClient.coins.all();
      console.log(data);
      setAll_data(data)
      data.data.map((info, index) => {
        //console.log(info, index);
        if (info.symbol === name) {
          setRes(info);
        }
      });
      console.log(res);
      return data;
    };
    func();
  }, []);

  if (res.id===undefined) return <> chargement ...</>;
  else
    return (
      <div className='container'>
        <div className="d-flex  my-3 p-4 col-4 border rounded justify-content-center mx-4">
          <img
            src={res.image.small}
            alt="logo de la crypto"
            srcset=""
            className="mx-1"
          />
          <h1>{res.id}</h1>
          
        </div>
        <div className="row">
        <h2>current price :  {res.market_data.current_price.usd} $</h2>
        </div>
        <Converter data={res} all_data={all_data} />
      </div>
    );
}
