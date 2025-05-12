import { Link } from "react-router-dom";
import { API_URL } from "../../config/constants";
import "./Banner.css";

/**
 * **배너 컴포넌트**
 * - 단일 배너를 렌더링하는 컴포넌트입니다.
 *
 * @param {Object} props - 배너 컴포넌트의 props
 * @param {string} props.href - 배너 클릭 시 이동할 링크
 * @param {string} props.imageUrl - 배너 이미지의 URL
 * @returns {JSX.Element} 배너 컴포넌트
 */
export function Banner({ href, imageUrl }) {
  return (
    <Link to={href}>
      <div id="banner">
        <img src={`${API_URL}/${imageUrl}`} alt="배너 이미지" />
      </div>
    </Link>
  );
}
