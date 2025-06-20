import React from "react";

function ContactPage() {
  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 32 }}>
      <h1>문의하기</h1>
      <form>
        <div>
          <label>이름</label>
          <input type="text" name="name" required />
        </div>
        <div>
          <label>이메일</label>
          <input type="email" name="email" required />
        </div>
        <div>
          <label>문의 내용</label>
          <textarea name="message" rows={5} required />
        </div>
        <button type="submit">보내기</button>
      </form>
    </div>
  );
}

export default ContactPage;
