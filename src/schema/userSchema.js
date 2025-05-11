import * as z from "zod";

/** 사용자 스키마 정의 */
export const UserSchema = z.object({
  /** 사용자 ID */
  userID: z
    .string()
    .min(3, "최소 3자 이상 입력해주세요")
    .max(20, "20자 이내로 입력해주세요"),

  /** 비밀번호 */
  password: z.string().min(6, "최소 6자 이상 입력해주세요"),

  /** 이메일 */
  email: z.string().email("유효한 이메일 주소를 입력해주세요"),
});
