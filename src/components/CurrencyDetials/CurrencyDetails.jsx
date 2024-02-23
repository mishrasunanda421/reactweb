import React from "react";
import { useEffect,useState} from "react";
import axios from "axios";
import "./style.scss";
import {decode} from 'html-entities';
import dayjs from "dayjs";

const CurrencyDetails = () => {
    const [currency,setCurrency] = useState();
    const [time,setTime] = useState();
    const [loading,setLoading] = useState(null);
    const url = "https://api.coindesk.com/v1/bpi/currentprice.json";
    useEffect(()=>{
        const getCurrency = async () => {
            setLoading(true);
            try{
                const response = await axios.get(url).then((response) => {
                    setTime(response?.data?.time?.updated);
                    setCurrency(response?.data?.bpi);
                })
            }catch(error){
                console.log(error.message);
            }
            setLoading(false);
        }
        getCurrency();
    },[]);
    var arr = [];
    if(currency){
        Object.keys(currency).forEach(function(key){
            arr.push(currency[key]);
        });
    }
    return(
        <>{arr.length >0 ?(
            <>
              <table>
                <thead>
                    <tr>
                        <th>Currency Code</th>
                        <th>Symbol</th>
                        <th>Rate</th>
                        <th>Rate Float</th>
                        <th>Description</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {arr.map((item,index) =>
                    <tr key={index}>
                        <td>{item.code}</td>
                        <td>{decode(item.symbol)}</td>
                        <td>{parseFloat(item.rate)}</td>
                        <td>{item.rate_float.toFixed(2)}</td>
                        <td>{item.description}</td>
                        <td>{time?dayjs(time?.release_date).format("MMM D, YYYY"):''}</td>
                    </tr>
                    )}
                </tbody>
              </table>
              </>
        ):(
            <span>Loading...</span>
        )}
        </>
    )
}
export default CurrencyDetails;