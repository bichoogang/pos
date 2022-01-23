import React, { useEffect } from 'react'
import { MdOutlineProductionQuantityLimits, MdPeopleAlt, MdCategory, MdOutlineCategory } from "react-icons/md";
// import { Line , Bar} from 'react-chartjs-2'
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import TodayTrendsComponent from 'routes/dashboard/TodayTrendsComponent';
import { getGraph, getProduct, outOfStock } from 'action/product';
import { getcategory, getcustomer } from 'action/user';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { GiMoneyStack } from "react-icons/gi";
// import {Bar} from 'chart.js'
function Dashboardmain() {
    const dispatch = useDispatch()
    // const data = {
    //     labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    //     datasets: [
    //       {
    //         label: 'My First dataset',
    //         fill: false,
    //         lineTension: 0.1,
    //         backgroundColor: 'rgba(75,192,192,0.4)',
    //         borderColor: 'rgba(75,192,192,1)',
    //         borderCapStyle: 'butt',
    //         borderDash: [],
    //         borderDashOffset: 0.0,
    //         borderJoinStyle: 'miter',
    //         pointBorderColor: 'rgba(75,192,192,1)',
    //         pointBackgroundColor: '#fff',
    //         pointBorderWidth: 1,
    //         pointHoverRadius: 5,
    //         pointHoverBackgroundColor: 'rgba(75,192,192,1)',
    //         pointHoverBorderColor: 'rgba(220,220,220,1)',
    //         pointHoverBorderWidth: 2,
    //         pointRadius: 1,
    //         pointHitRadius: 10,
    //         data: [65, 59, 80, 81, 56, 55, 40]
    //       }
    //     ]
    //   };
    const alldata = useSelector(state => state.product)
    const cathdata = useSelector(state => state.acart.category)
    const alluser = useSelector(state => state.normal?.allcustomer)
    const graphdata = useSelector(state => state.graph)
    const outofstock = useSelector(state=>state.normal?.outofstock)
    console.log('ggg',outofstock)

    useEffect(() => {
        // alert('kl')
        dispatch(getProduct())
        dispatch(getcategory())
        dispatch(getcustomer())
        dispatch(getGraph())
        dispatch(outOfStock())
    }, [])
    // const data = {
    //     labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    //     datasets: [
    //         {
    //             label: 'Purchase Price',
    //             data: [65, 59, 80, 81, 56, 55, 40],
    //             backgroundColor: [
    //                 'rgba(255, 99, 132, 0.2)',
    //                 'rgba(54, 162, 235, 0.2)',
    //                 'rgba(255, 206, 86, 0.2)',
    //                 'rgba(75, 192, 192, 0.2)',
    //                 'rgba(153, 102, 255, 0.2)',
    //                 'rgba(255, 159, 64, 0.2)',
    //             ],
    //             borderColor: [
    //                 'rgba(255, 99, 132, 1)',
    //                 'rgba(54, 162, 235, 1)',
    //                 'rgba(255, 206, 86, 1)',
    //                 'rgba(75, 192, 192, 1)',
    //                 'rgba(153, 102, 255, 1)',
    //                 'rgba(255, 159, 64, 1)',
    //             ],
    //             borderWidth: 1,
    //         },
    //     ],
    // };
    // const options = {
    //     scales: {
    //         yAxes: [
    //             {
    //                 ticks: {
    //                     beginAtZero: true,
    //                 },
    //             },
    //         ],
    //     },
    // };
    const data = [
        {
            name: 'Page A',
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: 'Page B',
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: 'Page C',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: 'Page D',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: 'Page E',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: 'Page F',
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: 'Page G',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
        {
            name: 'Page A',
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: 'Page B',
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: 'Page C',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: 'Page D',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: 'Page E',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: 'Page F',
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: 'Page G',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
    ];
    const getcost = () => {
        return graphdata?.reduce((price, item) => Number(item?.cost) + Number(price), 0)
    }
    const getsell = () => {
        return graphdata?.reduce((price, item) => Number(item?.sell) + Number(price), 0)
    }
    console.log("aaa",getcost())
    return (
        <div className='dashboardmain'>
            <div className='container'>
                {/* <div className='row'>
                    <div className='col-md-2 col-3  px-2 '>
                        <NavLink to="/product">
                            <div className='shadow card dashcard'>
                                <MdOutlineProductionQuantityLimits />
                                <h4>Products</h4>
                            </div>
                        </NavLink>

                    </div>
                    <div className='col-md-2 col-3  px-2 '>
                        <NavLink to="/customers">
                            <div className='shadow card dashcard'>
                                <MdPeopleAlt />
                                <h4>Customers</h4>
                            </div>

                        </NavLink>
                    </div>
                    <div className='col-md-2 col-3  px-2 '>
                        <NavLink to="/category">
                            <div className='shadow card dashcard'>
                                <MdCategory />
                                <h4>Category(pdt)</h4>

                            </div>
                        </NavLink>
                    </div>
                    <div className='col-md-2 col-3  px-2 '>
                        <NavLink to="/cuscategory">
                            <div className='shadow card dashcard'>
                                <MdOutlineCategory />
                                <h4>Category(Customer)</h4>
                            </div>
                        </NavLink>
                    </div>

                </div> */}
                 <div className='row'>
                    <div className='col-xl-2 col-md-3 col-12  px-2 '>
                        
                            <div className='shadow card dashcardm'>
                                {/* <MdOutlineProductionQuantityLimits /> */}
                                <div className='d-flex justify-content-between align-content-center align-items-center'>
                                <h4>TOTAL COST PRICE</h4>
                                    <GiMoneyStack/>
                                </div>
                                <h2>₹ {getcost()}</h2>
                                
                            </div>
                       

                    </div>
                    <div className='col-xl-2 col-md-3 col-12  px-2 '>
                       
                    <div className='shadow card dashcardm dashcardm2'>
                                {/* <MdOutlineProductionQuantityLimits /> */}
                                <div className='d-flex justify-content-between align-content-center align-items-center'>
                                <h4>TOTAL SELL PRICE</h4>
                                    <GiMoneyStack/>
                                </div>
                                <h2>₹ {getsell()}</h2>
                                
                            </div>

                     
                    </div>
                    <div className='col-xl-2 col-md-3 col-12  px-2 '>
                        
                    <div className='shadow card dashcardm dashcardm2'>
                                {/* <MdOutlineProductionQuantityLimits /> */}
                                <div className='d-flex justify-content-between align-content-center align-items-center'>
                                <h4>PROFIT</h4>
                                    <GiMoneyStack/>
                                </div>
                                <h2>₹ {(getsell() - getcost()).toFixed(2)}</h2>
                                
                            </div>
                       
                    </div>
                    <div className='col-xl-2 col-md-3 col-12  px-2 '>
                    <div className='shadow card dashcardm dashcardm2'>
                    <div className='d-flex justify-content-between align-content-center align-items-center'>
                                <h4>OUT OF STOCK</h4>
                                    <GiMoneyStack/>
                                </div>
                                <h2>{outofstock?.length} items</h2>
                                
                            </div>
                       
                    </div>

                </div>
                <div className='row mt-3'>
                    {/* <Line
                        data={data} options={options} height={100} width="auto"
                        /> */}
                        <ResponsiveContainer height="100%" aspect={3}>
                    <BarChart
                        width={500}
                        height={300}
                        data={graphdata}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 15
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="cost" fill="#8884d8" />
                        <Bar dataKey="sell" fill="#82ca9d" />
                        <Bar dataKey="profit" fill="#29ca90" />
                    </BarChart>
                    </ResponsiveContainer>

                    {/* <TodayTrendsComponent dataa={data} product={alldata} cath={cathdata} cus={alluser} /> */}
                </div>
            </div>

        </div>
    )
}

export default Dashboardmain
