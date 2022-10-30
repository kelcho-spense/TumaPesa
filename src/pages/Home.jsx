import React from 'react';
import slider3 from "../images/slider3.png"
import slider4 from "../images/slider4.png"
import kevin from "../images/kevin.png"
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className='justify-center align-center h-fit'>
      <div className="carousel w-full h-fit">
        <div id="1" className="carousel-item relative w-full">
          <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
              <img src={slider4} className="max-w-sm rounded-lg shadow-2xl" alt='no pic' />
              <div>
                <h1 className="text-5xl font-bold">Welcome to Tuma Pesa App</h1>
                <p className="py-6">Tuma Pesa is a platform where thousands of users transfer funds with no limation...</p>
                <Link className="btn btn-outline btn-warning" to="/register">Register To Get Started</Link>
              </div>
            </div>
          </div>
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#3" className="btn btn-circle text-3xl">👈</a>
            <a href="#2" className="btn btn-circle text-3xl">👉</a>
          </div>
        </div>
        <div id="2" className="carousel-item relative w-full">
          <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
              <img src={slider3} className="max-w-xl rounded-lg shadow-2xl" alt='no pic' />
              <div>
                <h1 className="text-5xl font-bold">Our Goals 🤝</h1>
                <div className="py-6 text-xl">
                  <ul>
                    <li>➡️Easy money transfer between Users</li>
                    <li>➡️Simple UI for friendly user experience </li>
                  </ul>
                </div>
                <Link className="btn btn-secondary btn-outline" to="/register">Register To Get Started</Link>
              </div>
            </div>
          </div>
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#1" className="btn btn-circle text-3xl">👈</a>
            <a href="#3" className="btn btn-circle text-3xl">👉</a>
          </div>
        </div>
        <div id="3" className="carousel-item relative w-full">
          <div className="hero min-h-screen bg-base-200 sm:justify-center">
            <div className="hero-content flex-col lg:flex-row">
              <img src={kevin} className="sm:max-w-lg  rounded-lg shadow-2xl" alt='no pic' />
              <div className="py-8 text-xl">
                <h1 className="md:text-5xl font-bold sm:text-xl sm:pl-6 ">Hear from Kevin Comba</h1>
                <p className="py-6 text-xl">‶ I joined this community, 2022 may after watching their advert on youtube.This has been my best platform to send and transfer funds to another client. Upon registering i was able to credit my account and transfer any amount of funds to any of my clients ie.<span className='badge text-lg text-yellow-500 font-bold mx-1 py-2'>$5,000 </span>.″</p>
                <Link className="btn btn-success btn-outline" to="/register">Register To Get Started</Link>
              </div>
            </div>
          </div>
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#2" className="btn btn-circle text-3xl">👈</a>
            <a href="#1" className="btn btn-circle text-3xl">👉</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home