/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import {dateFormatter} from '../../utils/dateTime';
import {  postDataWithXcsrf } from '../../services/apiServices';
import IsOnline from '../isOnline';
const qs = require('querystring')

const OverviewCard = (props) => {
  const buttonValue = [4,5,13,14];
  
 const clickHandler = async (event) => {
  
  const payload = {
    macAddress:props.macAddress,
    gpio:event
  };
  try {
    const switchRes = await  postDataWithXcsrf('SEND_LIGHTS_REQUEST', qs.stringify(payload));
    console.log(switchRes);
  } catch (error) {
    console.log(error);
  }
}
  return (
    <>
      <style jsx>
        {`
          .card {
            overflow: hidden;
          }
          .card-first-section {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            color: #445;
          }
          .ip-container {
            display: flex;
            flex-direction: row;
          }
          .device-name {
            font-size: 20px;
            font-weight:700;
            margin-bottom: 8px;
            width: 200px;
            color: #6944ff;
            white-space: nowrap;
            overflow: hidden;

          }
          .online-info {
            font-size: 16px;
            color: #445;
            width: 200px;
            margin-bottom: 16px;
            white-space: nowrap;
            overflow: hidden;
            display:flex;
            flex-direction:row;
            align-items:center;
          }
          .last-known-ip {
            font-size: 13px;
          }
          .button-container {
            width: 100%;
            display: flex;
            flex-direction: row;
           justify-content:space-evenly;
          }
          .card-cover {
            width: 100%;
            max-width:400px;
            height: 250px;
            background: #222226 ;
            border-radius: 10px;
            box-shadow: 0 6px 13px 6px rgba(0,0,0,0.15);
            border-radius: 4px;
            transition: all 0.1s ease;
          }
          .squishy {
            position: relative;
            display: inline-block;
            vertical-align: middle;
            margin: 10px;
            color: #fff;
            text-align: center;
            background: #1e1e1f;
            box-shadow: inset 2px 2px 4px rgba(124, 132, 150, .3), inset -2px -2px 4px rgba(0, 0, 3, .3), 1px 1px 3px rgba(0, 0, 5, .5);
            transition: box-shadow .07s;
          }
          
          .squishy:active {
            box-shadow: inset 1px 1px 1px rgba(124, 132, 150, .3), inset -1px -1px 1px rgba(0, 0, 0, .5), 1px 1px 1px rgba(0, 0, 0, .7);
            color: #6944ff;
          }
          
          .squishy span {
            position: absolute;
            display: inline-block;
            white-space: nowrap;
            top: 0;
            left: 0;
            vertical-align: middle;
            line-height: 50px; /*change to btn height*/
            width: 100%;
            height: 100%;
            transition: transfrom .1s;
          }
          
          .squishy:active span {
            -webkit-transform: scale(.95);
            transform: scale(.95);
          }
          
          a.squishy {
            cursor: pointer;
            -webkit-touch-callout: none; 
            -webkit-user-select: none;
            -khtml-user-select: none; 
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
          }
          
          .button {
            width: 50px;
            height: 50px;
            border-radius: 10px;
          }
          .date {
            padding-left:5px;
          }

          @media (min-width: 992px) {
            .card-first-section {
              display: flex;
              flex-direction: row;
              justify-content: space-between;
            }
            .card-cover {
              width: 400px;
              background: #1f1f22 ;
              border-radius: 10px;
              box-shadow: 0 6px 26px 6px rgba(0,0,0,0.25);
              border-radius: 4px;
            }
          }
        `}
      </style>
      <div className="card-cover mb32">
          <div className="card p16 flex d-flex-column">
            <div className="card-first-section">
              <div className="name-section flex d-flex-column">
        <span className="device-name">{props.name}</span>
        <div className="online-info">
          <IsOnline
            size="8px"
            color={((Date.now() - new Date(props.lastOnline))/1000)<7200?"#2ed9a8":"#d92e53"}
          />
          <span className="date">
          {dateFormatter(props.lastOnline)}
          </span>
          </div>
              </div>
              <div className="ip-container">
                <div className="flex d-flex-column">
                  <span className="mb8 mobile-number">
                  </span>
                  <span className="last-known-ip">
                    {props.ipAddress}
                  </span>
                </div>
              </div>
            </div>
            <div className="button-container mt24">
              {
                Object.keys(buttonValue).map(button => (
                  <button
                  className="squishy button"
                  onClick={ () => {clickHandler(buttonValue[button]) }}
                  >
                    <i>{parseInt(button)+1}</i>
                  </button>
                ))
              }
            </div>
          </div>
        </div>
    </>
  );
};

export default OverviewCard;
