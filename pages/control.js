import React,{useEffect, useState} from 'react';
import Card from '../src/components/card';
import { fetchDataWithXcsrf} from '../src/services/apiServices';
import Router from 'next/router';

function control(props) {
    const [deviceData,setDeviceData] = useState([]);

    const checkCsrf = () => {
      const csrf = localStorage.getItem('token');
      if (!csrf) {
        Router.push('/', { shallow: true });
      } else {
        return true
      }
    };
    const getDeviceData = async () => {
        const response = await fetchDataWithXcsrf('GET_USER_DEVICES');
        setDeviceData(response);
      };

    useEffect(async () => {
        if(await checkCsrf()){
          getDeviceData();
        }
    },[])

    return (
        <>
        <style jsx>
        {`
          .container {
              width:100vw;
          }
          .container-inner {
            max-width:1400px;
            width:97%;
            margin:auto;
            margin-top:20px;
            display:flex;
            flex-direction:row;
            justify-content:space-evenly;
            flex-wrap:wrap;
          }
        `}
      </style>
        <div className="container">
            <div className="container-inner">
            {
               
                deviceData.length>=1?
                deviceData.map((device) => (
                    <div>
                        {
                            console.log(device)
                        }
                    <Card
                    name={device.deviceName}
                    lastOnline={device.lastOnline}
                    type={"Light"}
                    macAddress={device.macAddress}
                    />
                    </div>
                ))
                
                :
                ":("
            }
        </div>
        </div>
        </>
    );
}
export default control;