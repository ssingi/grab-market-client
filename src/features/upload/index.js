import { Form, Divider, Input, InputNumber, Button, Upload } from "antd";
import "./index.css";
import { useState } from "react";
import { API_URL } from "../../config/constants.js";
import { useNavigate } from "react-router-dom";
import { onChangeImage, onSubmit } from "./uploadHandlers.js";
import { useAuth } from "../auth/AuthContext.js";

/**
 * **업로드 페이지 컴포넌트**
 * - 상품 업로드를 위한 폼을 제공하는 컴포넌트입니다.
 * - 사용자가 상품 사진, 판매자 이름, 상품 이름, 가격, 수량, 설명을 입력할 수 있습니다.
 * - 업로드된 사진은 미리보기로 표시됩니다.
 * - 제출 버튼을 클릭하면 상품 정보가 서버에 전송됩니다.
 *
 * @returns {JSX.Element} 업로드 페이지 컴포넌트
 */
// ↓↓↓ 변경: products, setProducts를 props로 받기
const UploadPage = ({ products, setProducts }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();
  const [form] = Form.useForm();

  return (
    <div id="upload-container">
      <Form
        form={form}
        name="상품 업로드"
        // ↓↓↓ 변경: onSubmit에 products, setProducts 전달
        onFinish={(values) =>
          onSubmit({
            values,
            imageUrl,
            navigate,
            products,      // 추가
            setProducts,   // 추가
          })
        }
        initialValues={{ price: 0 }}
      >
        {/* 상품 사진 업로드 */}
        <Form.Item
          name="upload"
          label={<div className="upload-label">상품 사진</div>}
        >
          <Upload
            name="image"
            action={`${API_URL}/image`}
            listType="picture"
            showUploadList={false}
            onChange={(info) => onChangeImage(info, setImageUrl)}
          >
            {imageUrl ? (
              <img
                id="upload-img"
                src={`${API_URL}/${imageUrl}`}
                alt="상품 사진"
              />
            ) : (
              <div id="upload-img-placeholder">
                <img src="/images/icons/camera.png" alt="카메라 아이콘" />
                <span>이미지를 업로드해주세요</span>
              </div>
            )}
          </Upload>
        </Form.Item>

        {/* 판매자 ID */}
        <Form.Item
          label={<div className="upload-label">판매자 ID</div>}
          name="seller"
        >
          <Input
            className="upload-name"
            size="large"
            placeholder="판매자 ID를 입력해 주세요."
            addonAfter={
              <Button
                id="set-my-id-btn"
                type="link"
                size="small"
                onClick={() => form.setFieldsValue({ seller: user?.userID })}
              >
                내 아이디로 입력
              </Button>
            }
          />
        </Form.Item>
        <Divider />

        {/* 상품 이름 */}
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

        {/* 상품 가격 */}
        <Form.Item
          name="price"
          label={<div className="upload-label">상품 가격</div>}
          rules={[{ required: true, message: "상품 가격을 입력해주세요" }]}
        >
          <InputNumber defaultValue={0} className="upload-price" size="large" />
        </Form.Item>
        <Divider />

        {/* 상품 수량 */}
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

        {/* 상품 설명 */}
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

        {/* 제출 버튼 */}
        <Form.Item>
          <Button id="submit-button" size="large" htmlType="submit">
            상품 등록하기
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UploadPage;
