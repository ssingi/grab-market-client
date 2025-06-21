import React, { useState } from "react";
import "./ContactPage.css";

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // 여기서 실제 문의 전송 로직(API 등) 추가 가능
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="contact-container">
      <form className="contact-form" onSubmit={handleSubmit}>
        <h2>문의하기</h2>
        <label htmlFor="name">이름</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="이름을 입력하세요"
          value={form.name}
          onChange={handleChange}
          required
        />
        <label htmlFor="email">이메일</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="이메일을 입력하세요"
          value={form.email}
          onChange={handleChange}
          required
        />
        <label htmlFor="message">문의 내용</label>
        <textarea
          id="message"
          name="message"
          placeholder="문의 내용을 입력하세요"
          value={form.message}
          onChange={handleChange}
          required
        />
        <button type="submit">보내기</button>
        {submitted && <div className="contact-success">문의가 접수되었습니다!</div>}
      </form>
    </div>
  );
}

export default ContactPage;
