import React, { useEffect, useState } from "react";
import staffService from "../../service/staffService";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import { getAllAccounts } from "../../service/accountService";

export default function StaffingComponent() {
  const [staff, setStaff] = useState([]);

  useEffect(() => {
    try {
      Promise.all([staffService.getAll(), getAllAccounts()]).then(([staffResponse, accountResponse]) => {
        const staffData = staffResponse.data;
        const accountData = accountResponse.data;

        const combinedData = staffData.map((staff) => ({
          ...staff,
          account: accountData.find((account) => account.id == staff.accountID),
        }));

        setStaff(combinedData);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className='container py-5'>
      <Card>
        <Card.Header>Nhân viên</Card.Header>
        <Card.Body>
          <Table bordered hover>
            <thead>
              <tr>
                <th>Họ và tên</th>
                <th>Ngày sinh</th>
                <th>Địa chỉ</th>
                <th>Công việc</th>
                <th>Số điện thoại</th>
              </tr>
            </thead>
            <tbody>
              {staff.map((staff) => (
                <tr key={staff.id}>
                  <td>{staff.name}</td>
                  <td>{staff.dob}</td>
                  <td>{staff.address}</td>
                  <td>{staff.account.role}</td>
                  <td>{staff.phone}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
        <Card.Footer>
          <div className='d-flex justify-content-center gap-3'>
            <Button variant='primary'>Tạo nhân viên</Button>
            <Button variant='danger'>Xóa nhân viên</Button>
            <Button variant='warning'>Cập nhật thông tin nhân viên</Button>
          </div>
        </Card.Footer>
      </Card>
    </div>
  );
}
