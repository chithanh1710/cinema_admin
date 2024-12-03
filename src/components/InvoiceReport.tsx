/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal, Button } from "antd";
import { useState } from "react";

function InvoiceReport({ invoiceData }: { invoiceData: any }) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handlePrint = () => {
    window.print(); // In nội dung trên màn hình
  };

  return (
    <div>
      <Button onClick={showModal}>Xem báo cáo</Button>
      <Modal
        title="Chi tiết hóa đơn"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="print" type="primary" onClick={handlePrint}>
            In
          </Button>,
          <Button key="cancel" onClick={() => setIsModalVisible(false)}>
            Đóng
          </Button>,
        ]}
      >
        {invoiceData.map((invoice: any) => (
          <div key={invoice.id} className="mb-4">
            <h3>Hóa đơn #{invoice.id}</h3>
            <p>Khách hàng: {invoice.customerName}</p>
            <p>Ngày: {invoice.date}</p>
            <table>
              <thead>
                <tr>
                  <th>Sản phẩm</th>
                  <th>Số lượng</th>
                  <th>Giá</th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item: any, index: any) => (
                  <tr key={index}>
                    <td>{item.product}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price.toLocaleString()} đ</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p>Tổng tiền: {invoice.total.toLocaleString()} đ</p>
          </div>
        ))}
      </Modal>
    </div>
  );
}

export default InvoiceReport;
