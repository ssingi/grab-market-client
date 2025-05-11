import axios from "axios";
import { API_URL, ERROR_MESSAGES } from "../../config/constants";

/**
 * 상품 데이터 가져오기
 * @param {Function} setProducts - 상품 상태 업데이트 함수
 * @param {Function} handleError - 에러 처리 함수
 */
export const fetchProducts = async (setProducts) => {
  try {
    const result = await axios.get(`${API_URL}/products`);
    setProducts(result.data.products);
  } catch (error) {
    handleError(error, ERROR_MESSAGES.PRODUCT_ERROR);
  }
};

/**
 * 배너 데이터 가져오기
 * @param {Function} setBanners - 배너 상태 업데이트 함수
 * @param {Function} handleError - 에러 처리 함수
 */
export const fetchBanners = async (setBanners) => {
  try {
    const { data } = await axios.get(`${API_URL}/banners`);
    setBanners(data.banners);
  } catch (error) {
    handleError(error, ERROR_MESSAGES.BANNER_ERROR);
  }
};

/**
 * 에러 처리 함수
 * @param {Error} error - 에러 객체
 * @param {string} defaultMessage - 기본 에러 메시지
 */
const handleError = (error, defaultMessage) => {
  console.error(error);
  alert(defaultMessage);
};
