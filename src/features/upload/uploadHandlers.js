import axios from "axios";
import { message } from "antd";
import { API_URL, ERROR_MESSAGES } from "../../config/constants";

/**
 * **데이터 유효성 검사**
 * - 상품 업로드 폼의 필수 입력값을 검사합니다.
 * - 모든 필드가 입력되었는지 확인합니다.
 * - 가격이 숫자인지 확인합니다.
 * - 유효하지 않은 경우 에러 메시지를 표시합니다.
 * @param {Object} values - 폼 데이터
 * @param {string} imageUrl - 업로드된 이미지 URL
 * @returns {boolean} - 유효성 검사 결과
 */
export const validateFields = (values, imageUrl) => {
  const { name, description, price, seller, quantity } = values;
  if (!name || !description || !price || !seller || !imageUrl || !quantity) {
    message.error(ERROR_MESSAGES.REQUIRED);
    return false;
  }
  if (isNaN(price)) {
    message.error(ERROR_MESSAGES.PRICE_INVALID);
    return false;
  }
  return true;
};

/**
 * **상품 업로드 처리**
 * - 상품 업로드 폼 제출 시 호출되는 함수입니다.
 * - 폼 데이터와 이미지 URL을 서버에 전송합니다.
 * - 성공 시 메인 페이지로 이동합니다.
 * - 실패 시 에러 메시지를 표시합니다.
 * @param {Object} params - 필요한 매개변수
 * @param {Object} params.values - 폼 데이터
 * @param {string} params.imageUrl - 업로드된 이미지 URL
 * @param {Function} params.navigate - 페이지 이동 함수
 */
export const onSubmit = async ({ values, imageUrl, navigate }) => {
  if (!validateFields(values, imageUrl)) return;

  try {
    const { name, description, price, seller, quantity } = values;
    const result = await axios.post(`${API_URL}/products`, {
      name,
      description,
      seller,
      price: parseInt(price),
      imageUrl,
      quantity: parseInt(quantity),
    });

    // 상품 업로드 성공 시
    navigate("/", { replace: true });
    console.log(result);
  } catch (error) {
    // 상품 업로드 실패 시
    message.error(`${ERROR_MESSAGES.UPLOAD_ERROR} ${error.message}`);
    console.error(error);
  }
};

/**
 * **이미지 업로드 처리**
 * - 이미지 업로드 상태에 따라 처리하는 함수입니다.
 * - 업로드 중일 때는 아무 작업도 하지 않습니다.
 * - 업로드 완료 시 이미지 URL을 상태에 저장합니다.
 * - 업로드 실패 시 에러 메시지를 표시합니다.
 * @param {Object} info - 업로드 정보
 * @param {Function} setImageUrl - 이미지 URL 상태 업데이트 함수
 */
export const onChangeImage = (info, setImageUrl) => {
  const { status, response } = info.file;
  if (status === "uploading") return;

  if (status === "done") {
    setImageUrl(response.imageUrl);
  } else if (status === "error") {
    alert(ERROR_MESSAGES.UPLOAD_IMAGE_FAILED);
  }
};
