import { getcategory, getcuscategory, delcuscath, delprocath, addcategory } from 'action/product'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AiFillDelete ,AiFillEdit} from "react-icons/ai";
import { ToastContainer, toast } from 'react-toastify';
import { AiOutlineSearch} from "react-icons/ai";
import { Modal, Button } from 'react-bootstrap'
import { addcustomercath as addcuscath, updatecathuser } from 'action/user'

function Cuscategory() {
    const dispatch = useDispatch()
    const cathdata = useSelector(state => state.acart.category)
    const cathuser = useSelector(state => state.acart.categorycus)
    const del = useSelector(state => state?.acart?.delcategory)
    const error = useSelector(state => state.error)
    const success = useSelector(state => state.succes)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [active, setactive] = useState("pdt")
    const [word,setword] = useState("")
    const [result, setresult] = useState()
    useEffect(() => {
        dispatch(getcuscategory())
    }, [del,success])
    const[category, setcategory] = useState({
        _id:'', category:''
    })
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
            setShow(false)



        }

    }, [success])
    useEffect(() => {
        if (del?.length > 0) {
            toast(del, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setShow(false)



        }

    }, [del])
    const [addpdt, setaddpdt] = useState(false)
    const [editpdt, seteditpdt] = useState(false)
    const addcate =() =>{
        setShow(true)
        setaddpdt(true)
        seteditpdt(false)
    }
    const update = () =>{
      dispatch(updatecathuser(category))
    }
    console.log('cat',category)
    const addpdtone = () =>{
        if(category){
            dispatch(addcuscath({ category: category?.category }))
        }else{
            toast.error('fill the field')
        }

    }
    const editcath = () =>{
        setShow(true)
        setaddpdt(false)
        seteditpdt(true)
    }


    console.log('cmm', del)
    useEffect(() => {
        if (word !== "") {
            // console.log('aaa', word)
            const newlist = cathuser?.filter((con) => {
                return Object.values(con).join(" ").toLowerCase().includes(word.toLowerCase())
            })
            
            setresult(newlist)
        
            // console.log("slist",newlist)
        } else {
            setresult(cathuser)
            // console.log("slist",alldata)
        }

    }, [word,cathuser?.length])
    return (
        <div className="products">
        <div className="container">
            <div className="row pdtrow">
            <div className='col-md-8 col-12 px-5'>
                        <div className='inputcard'>
                            <AiOutlineSearch />
                            <input type='text' placeholder='search' onChange={(e) => setword(e.target.value)} />
                        </div>
                    </div>
                <div className='col-md-4 col-12 inputcard1'>
                    <button onClick={addcate} >Add Category</button>
                    
                </div>
                <div className="col-12">

                    <table id="customers" >
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Name</th>
                                <th>Edit</th>
                                <th>Delete</th>
                               

                            </tr>
                        </thead>
                        <tbody>
                            {
                                result?.map((v,i) => {
                                    return <tr>
                                        <td data-label="No" >{i+1}</td>
                                        <td data-label="Name" >{v?.category}</td>
                                        
                                        <td data-label="Edit">
                                            <button className='shadow' style={{border:'none',outline:'none',backgroundColor:'#58418'}}>
                                            <AiFillEdit onClick={() => {
                                                setcategory(v)
                                                editcath()
                                            // setmodatadata(v)
                                            // editpdtclk()

                                        }} />
                                            </button>
                                            
                                            </td>
                                            <td data-label="Delete">
                                            <button className='shadow' style={{border:'none',outline:'none',backgroundColor:'#58418'}}>
                                            <AiFillDelete onClick={() => {
                                                dispatch(delcuscath(v?._id))
                                            // setmodatadata(v)
                                            // editpdtclk()

                                        }} />
                                            </button>
                                            </td>
                                    </tr>
                                })
                            }
                        </tbody>



                    </table>
                </div>
            </div>

        </div>
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    {
                        addpdt ? "Add Customer Category" : "Edit Customer Category"
                    }

                </Modal.Title>
            </Modal.Header>
            <form>
                <Modal.Body>
                    
                    <p>Category</p>
                    <input type="text" placeholder="Category" value={category?.category} className="w-100 my-2" onChange={(e) => setcategory({...category,category: e.target.value} )} />
                   
                    
                </Modal.Body>
            </form>
            <Modal.Footer>
                
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                {
                    editpdt ? <Button variant="primary" onClick={update}>Update</Button> :
                        <Button variant="primary" onClick={addpdtone} >Add</Button>
                }

            </Modal.Footer>
        </Modal>
        <ToastContainer />
    </div>
    )
}

export default Cuscategory
