import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Compound from '@compound-finance/compound-js';
import calculateApy from '../apy.js';
import { useEffect, useState } from 'react';



export default function Home({ apys }) {
  const [loading, setLoading] = useState(true);

  const formatPercent = number =>
    `${new Number(number).toFixed(2)}%`

  useEffect(() => {
    // Simulate data fetching
    if (apys.length === 0) {
      setLoading(true);
      // Fetch data here if needed
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [apys]);

  return (
    <div className='container'>
      <Head>
        <title>Compound dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className='row mt-4'>
        <div className='col-sm-12'>
          <div className="jumbotron">
            <h1 className='text-center'>Compound Dashboard</h1>
            <h5 className="display-4 text-center"> Compound APYs <br /> with COMP token rewards</h5>
          </div>
        </div>
      </div>


      {loading ? (
        <div className="text-center">
          <h2>Loading Data...</h2>
        </div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Ticker</th>
              <th>Supply APY</th>
              <th>COMP APY</th>
              <th>Total APY</th>
            </tr>
          </thead>
          <tbody>
            {apys.map(apy => (
              <tr key={apy.ticker}>
                <td>
                  <Image
                    src={`/img/${apy.ticker.toLowerCase()}.png`}
                    width={25}
                    height={25}
                    alt='image'
                  />
                  {apy.ticker.toUpperCase()}
                </td>
                <td>{formatPercent(apy.supplyApy)}</td>
                <td>{formatPercent(apy.compApy)}</td>
                <td>{formatPercent(parseFloat(apy.supplyApy) + parseFloat(apy.compApy))}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

//https://nextjs.org/docs/pages/building-your-application/data-fetching/get-server-side-props#error-handling
//get data from blockchain to calculate APYs
export async function getServerSideProps(context) {
  const apys = await Promise.all([
    calculateApy(Compound.cDAI, 'DAI'),
    calculateApy(Compound.cUSDC, 'USDC'),
    calculateApy(Compound.cUSDT, 'USDT'),
    //  calculateApy(Compound.cBAT, 'BAT'),
    //calculateApy(Compound.cUNI, 'UNI')

    // add other tokens 
  ]);

  return {
    props: {
      apys
    },
  }
}

// also add other metrics besides APY