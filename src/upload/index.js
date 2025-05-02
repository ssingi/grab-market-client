import { DribbbleCircleFilled, SelectOutlined } from "@ant-design/icons";
import {
  Form,
  Divider,
  Input,
  InputNumber,
  Button,
  Upload,
  message,
} from "antd";
import "./index.css";
import { useState } from "react";
import { API_URL } from "../config/constants.js";
import axios from "axios";
import { replace, useNavigate } from "react-router-dom";

function UploadPage() {
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();
  const onSubmit = (values) => {
    const { name, description, price, seller, quantity } = values;
    if (!name || !description || !price || !seller || !imageUrl || !quantity) {
      return message.error("모든 필드를 입력해주세요!");
    }
    if (isNaN(price)) {
      return message.error("가격은 숫자여야 합니다.");
    }
    axios
      .post(`${API_URL}/products`, {
        name: values.name,
        description: values.description,
        seller: values.seller,
        price: parseInt(values.price),
        imageUrl: imageUrl,
        quantity: parseInt(values.quantity),
      })
      .then((result) => {
        navigate("/", { replace: true });
        console.log(result);
      })
      .catch((error) => {
        message.error(`상품 업로드 중 오류가 발생했습니다. ${error.message}`);
        console.error(error);
      });
  };

  const onChangeImage = (info) => {
    if (info.file.status === "uploading") {
      return;
    }
    if (info.file.status === "done") {
      const response = info.file.response;
      const imageUrl = response.imageUrl;
      setImageUrl(imageUrl);
    } else if (info.file.status === "error") {
      alert("이미지 업로드에 실패했습니다.");
    }
  };
  return (
    <div id="upload-container">
      <Form name="상품 업로드" onFinish={onSubmit} initialValues={{ price: 0 }}>
        <Form.Item
          name="upload"
          label={<div className="upload-label">상품 사진</div>}
        >
          <Upload
            name="image"
            action={`${API_URL}/image`}
            listType="picture"
            showUploadList={false}
            onChange={onChangeImage}
          >
            {imageUrl ? (
              <img id="upload-img" src={`${API_URL}/${imageUrl}`} />
            ) : (
              <div id="upload-img-placeholder">
                <img src="/images/icons/camera.png" alt="카메라 아이콘" />
                <span>이미지를 업로드해주세요</span>
              </div>
            )}
          </Upload>
        </Form.Item>
        <Divider />

        <Form.Item
          label={<div className="upload-label">판매자 명</div>}
          name="seller"
          rules={[{ required: true, message: "판매자 이름을 입력해주세요" }]}
        >
          <Input
            className="upload-name"
            size="large"
            placeholder="이름을 입력해 주세요."
          />
        </Form.Item>
        <Divider />
        <Form.Item
          name="name"
          label={<div className="upload-label">상품이름</div>}
          rules={[{ required: true, message: "상품 이름을 입력해주세요" }]}
        >
          <Input
            className="upload-name"
            size="large"
            placeholder="상품 이름을 입력해주세요"
          />
        </Form.Item>
        <Divider />
        <Form.Item
          name="price"
          label={<div className="upload-label">상품 가격</div>}
          rules={[{ required: true, message: "상품 가격을 입력해주세요" }]}
        >
          <InputNumber defaultValue={0} className="upload-price" size="large" />
        </Form.Item>
        <Divider />

        <Form.Item
          name="quantity"
          label={<div className="upload-label">상품 수량</div>}
          rules={[{ required: true, message: "상품 수량을 입력해주세요" }]}
        >
          <InputNumber
            min={1}
            className="upload-quantity"
            size="large"
            placeholder="수량을 입력해주세요"
          />
        </Form.Item>
        <Divider />

        <Form.Item
          name="description"
          label={<div className="upload-label">상품소개</div>}
          rules={[{ required: true, message: "상품 소개를 입력해주세요." }]}
        >
          <Input.TextArea
            size="large"
            id="product-description"
            showCount
            maxLength={300}
            placeholder="상품 소개를 적어주세요"
          />
        </Form.Item>
        <Form.Item>
          <Button id="submit-button" size="large" htmlType="submit">
            상품 등록하기
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
export default UploadPage;
