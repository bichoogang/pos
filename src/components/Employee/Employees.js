import { employeeper, getalluser } from 'action/user'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AiOutlineCheck,AiOutlineClose} from "react-icons/ai";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Employees() {
    const dispatch = useDispatch()
    const error = useSelector(state => state.error)
    const success = useSelector(state => state.succes)
    useEffect(()=>{
        dispatch(getalluser())

    },[success])
    const alluser = useSelector(state=>state.normal?.alluser)
    
    console.log(alluser)
    useEffect(() => {
        if (error?.length > 0) {
            toast.error(error, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

        }

    }, [error])
    useEffect(() => {
        if (success?.length > 0) {
            toast(success, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
           


        }

    }, [success])
    return (
        <div className="employee">
            <div className="container">
                <div className="row">
                <div className="col-12">
                        <table id="customers">
                            <thead>
                            <tr>
                                <th>Sl.No</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Mobile</th>
                                <th>Page1</th>
                                <th>Page2</th>
                                <th>Page3</th>
                                <th>Page4</th>
                                <th>Approve</th>

                            </tr>
                            </thead>
                            <tbody>
                            {
                                alluser?.map((v,i) => {

                                    return <>
                                    {
                                        v?.role==="admin"?null:
                                    
                                     <tr>
                                         <td data-label="Sl.No" >{i+1}</td>
                                        <td data-label="Name" >{v.name}</td>
                                        <td data-label="Email">{v.email}</td>
                                        <td data-label="Mobile">{v.mobile}</td>
                                        <td data-label="Page1" onClick={()=>dispatch(employeeper({"id":v._id,data:{"access1":(!v?.access1)}}))}>{v.access1?<AiOutlineCheck/>:<AiOutlineClose/>}</td>
                                        <td data-label="Page2" onClick={()=>dispatch(employeeper({"id":v._id,data:{"access2":(!v?.access2)}}))}>{v.access2?<AiOutlineCheck/>:<AiOutlineClose/>}</td>
                                        <td data-label="Page3" onClick={()=>dispatch(employeeper({"id":v._id,data:{"access3":(!v?.access3)}}))}>{v.access3?<AiOutlineCheck/>:<AiOutlineClose/>}</td>
                                        <td data-label="Page4" onClick={()=>dispatch(employeeper({"id":v._id,data:{"access4":(!v?.access4)}}))} >{v.access4?<AiOutlineCheck/>:<AiOutlineClose/>}</td>
                                        <td data-label="Edit">{v.approve?<AiOutlineCheck/>:<AiOutlineClose/>}</td>
                                    </tr>}
                                    </>
                                })
                            }
                            </tbody>



                        </table>
                    </div>
                </div>
            </div>
            <ToastContainer />
            
        </div>
    )
}

export default Employees
