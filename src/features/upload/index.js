import { Form, Divider, Input, InputNumber, Button, Upload } from "antd";
import "./index.css";
import { useState } from "react";
import { API_URL } from "../../config/constants.js";
import { useNavigate } from "react-router-dom";
import { onChangeImage, onSubmit } from "./uploadHandlers.js";

/**
 * **폼 필드 설정**
 * - 각 입력 필드의 속성과 유효성 검사 규칙을 정의합니다.
 */
const FORM_FIELDS = [
  {
    label: "판매자 명",
    name: "seller",
    type: "input",
    rules: [{ required: true, message: "판매자 이름을 입력해주세요" }],
    placeholder: "이름을 입력해 주세요.",
  },
  {
    label: "상품이름",
    name: "name",
    type: "input",
    rules: [{ required: true, message: "상품 이름을 입력해주세요" }],
    placeholder: "상품 이름을 입력해주세요",
  },
  {
    label: "상품 가격",
    name: "price",
    type: "number",
    rules: [{ required: true, message: "상품 가격을 입력해주세요" }],
    defaultValue: 0,
  },
  {
    label: "상품 수량",
    name: "quantity",
    type: "number",
    rules: [{ required: true, message: "상품 수량을 입력해주세요" }],
    min: 1,
    placeholder: "수량을 입력해주세요",
  },
  {
    label: "상품소개",
    name: "description",
    type: "textarea",
    rules: [{ required: true, message: "상품 소개를 입력해주세요." }],
    placeholder: "상품 소개를 적어주세요",
    id: "product-description",
  },
];

/**
 * **업로드 페이지 컴포넌트**
 * - 상품 업로드를 위한 폼을 제공하는 컴포넌트입니다.
 * - 사용자가 상품 사진, 판매자 이름, 상품 이름, 가격, 수량, 설명을 입력할 수 있습니다.
 * - 업로드된 사진은 미리보기로 표시됩니다.
 * - 제출 버튼을 클릭하면 상품 정보가 서버에 전송됩니다.
 *
 * @returns {JSX.Element} 업로드 페이지 컴포넌트
 */
const UploadPage = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();

  return (
    <div id="upload-container">
      <Form
        name="상품 업로드"
        onFinish={(values) => onSubmit({ values, imageUrl, navigate })}
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

        {/* 입력 필드 반복 랜더링 */}
        {FORM_FIELDS.map((field, index) => (
          <div key={index}>
            <Divider />
            <CustomFormItem {...field} />
          </div>
        ))}

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

/**
 * **CustomFormItem 컴포넌트**
 * - 다양한 유형의 입력 필드를 처리할 수 있는 재사용 가능한 컴포넌트입니다.
 *
 * @param {string} label - 입력 필드의 라벨 텍스트
 * @param {string} name - 입력 필드의 name 속성
 * @param {string} type - 입력 필드의 유형 (input, textarea, number, upload)
 * @param {Array} rules - 유효성 검사 규칙
 * @param {JSX.Element} children - 자식 요소 (업로드 버튼 등)
 * @param {object} rest - 추가 속성 (placeholder, id 등)
 * @returns {JSX.Element} Form.Item 컴포넌트
 */
const CustomFormItem = ({
  label,
  name,
  type = "input",
  rules = [],
  children,
  ...rest
}) => {
  let inputComponent;

  switch (type) {
    case "textarea":
      inputComponent = (
        <Input.TextArea size="large" showCount maxLength={300} {...rest} />
      );
      break;
    case "number":
      inputComponent = <InputNumber size="large" {...rest} />;
      break;
    case "upload":
      inputComponent = <Upload {...rest}>{children}</Upload>;
      break;
    default:
      inputComponent = <Input size="large" {...rest} />;
  }

  return (
    <Form.Item
      name={name}
      label={<div className="upload-label">{label}</div>}
      rules={rules}
    >
      {inputComponent}
    </Form.Item>
  );
};

export default UploadPage;
