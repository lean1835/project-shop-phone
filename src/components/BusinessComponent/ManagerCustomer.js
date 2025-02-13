import React, {useEffect, useRef, useState} from "react";
import {Link, useNavigate} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js'
import { getAllCustomers, searchByNameOrAddress } from "../../services/customerService";
function ManagerCustomer (){
        const [customerList,setCustomerList]=useState([]);
        const [selectedCustomer,setSelectedCustomer]=useState(null);
        const [typeId,setTypeId]=useState("1");
        const navigate=useNavigate();
        const [isReload,setIsReload]=useState(false);
        const searchNameRef=useRef();
        const searchAddressRef=useRef();
        
        useEffect(() => {
            const fetchData = async () => {
                const nameSearch = searchNameRef.current?.value || "";
                const addressSearch = searchAddressRef.current?.value || "";
                try {
                    const customers = await searchByNameOrAddress(nameSearch, addressSearch);
                    setCustomerList(customers);
                } catch (error) {
                    console.error("Lỗi khi lấy dữ liệu khách hàng:", error);
                    setCustomerList([]); // Nếu lỗi, hiển thị danh sách rỗng
                }
            };
            fetchData();
        }, [isReload]);
    
        const handleRadioChange = (customerId) => {
            setSelectedCustomer(customerId);
        };

        const handleOut=()=>{
            navigate('/home/manager')
        }  
        const handleChoice=(event)=>{
            const newTypeId = event.target.value;
            setTypeId(newTypeId);
            setIsReload((prev) => !prev);
        } 
        const handleSearch=()=>{
            setIsReload((pre)=>!pre);
        } 
    return(
        <>

            <div className="manager_customer">
                <form >
                    <br/>
                    <span>Tìm kiếm theo:  </span> 
                    <select onChange={handleChoice} value={typeId}  className={'w-17'}>
                        <option  onChange={handleChoice} value={"1"}>Tìm kiếm theo tên</option>
                        <option  onChange={handleChoice} value={"2"}>Tìm kiếm Địa chỉ</option>
                        
                    </select>                    
                    {typeId === "1" ? (
                    <input className="form-control d-inline w-25 mx-2" ref={searchNameRef} placeholder="Nhập tên khách hàng" />
                ) : (
                    <input className="form-control d-inline w-25 mx-2" ref={searchAddressRef} placeholder="Nhập địa chỉ" />
                )}
                    <button onClick={handleSearch} className="btn btn-success btn-sm">
                    <i className="fa-solid fa-magnifying-glass"></i> Tìm kiếm
                </button>
                </form>
                <table className={'table table-light'}>
                <thead>
                <tr>
                    <th>Tên</th>
                    <th>Số điện thoại</th>
                    <th>Tuổi </th>
                    <th>Địa chỉ</th>
                    <th>Email</th>
                    <th>Chọn</th>
                </tr>
                </thead>
                <tbody>
                {customerList.map((c,i)=>(
                    <tr key={c.id}>
                        <td>{c.name}</td>
                        <td>{c.phone}</td>
                        <td>{c.age}</td>
                        <td>{c.address}</td>
                        <td>{c.email}</td>
                        <td>
                            <input
                                type="radio"
                                name="product"
                                checked={selectedCustomer === c.id}
                                onChange={() => handleRadioChange(c.id)}
                                className="form-check-input"
                            />
                        </td>
                    </tr>
                ))}

                </tbody>
            </table>
            {selectedCustomer !=null &&(
                <button>
                    <Link to={'/home/manager/customer/edit/'+selectedCustomer}>Chỉnh sửa</Link>
                </button>
            )}
                
                
                <button onClick={handleOut}>Thoát</button>

            </div>
        </>
    );
}
export default ManagerCustomer;