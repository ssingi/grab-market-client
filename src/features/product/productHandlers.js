import axios from "axios";
import { API_URL, ERROR_MESSAGES } from "../../config/constants";
import { message } from "antd";

/**
 * 상품 정보 가져오기
 * @param {string} productID - 상품 ID
 * @param {Function} setProduct - 상품 상태 업데이트 함수
 * @param {Function} setIsLoading - 로딩 상태 업데이트 함수
 */
export const getProduct = async (productID, setProduct, setIsLoading) => {
  try {
    const result = await axios.get(`${API_URL}/products/${productID}`);
    setProduct(result.data.product);
  } catch (error) {
    console.error(error);
    message.error(ERROR_MESSAGES.PRODUCT_ERROR);
  } finally {
    setIsLoading(false);
  }
};

/**
 * 에러 처리 함수
 * @param {Error} error - 에러 객체
 * @param {string} defaultMessage - 기본 에러 메시지
 */
const handleError = (error, defaultMessage) => {
  console.error(error);
  message.error(error.response?.data?.message || defaultMessage);
};

/**
 * 구매 처리 함수
 * @param {string} productID - 상품 ID
 * @param {Function} getProduct - 상품 정보 갱신 함수
 */
export const onClickPurchase = async (productID, getProduct, userID) => {
  try {
    console.log("구매시도: ", userID);
    await axios.post(`${API_URL}/purchase/${productID}`, { userID });
    message.info("구매가 완료되었습니다.");
    getProduct();
  } catch (error) {
    handleError(error, ERROR_MESSAGES.PURCHASE_ERROR);
  }
};

/**
 * 상품 구매 요청
 * @param {string} productID - 상품 ID
 * @param {number} quantity - 구매 수량
 * @param {number} userID - 구매자 ID
 * @param {string} deliveryAddress - 배송지 주소
 */
export const purchaseProduct = async (
  productID,
  quantity,
  userID,
  deliveryAddress = "주소 미입력"
) => {
  try {
    const res = await axios.post(`${API_URL}/purchase/${productID}`, {
      userID,
      quantity,
      deliveryAddress,
    });
    return res.data;
  } catch (error) {
    throw error.response?.data || ERROR_MESSAGES.PURCHASE_ERROR;
  }
};
