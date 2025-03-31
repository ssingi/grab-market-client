const express = require("express");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const fs = require("fs").promises;
const path = require("path");
const app = express();
const port = 3001;

// CORS 설정
app.use(
  cors({
    origin: ["http://localhost:3002", "http://localhost:8080"], // 허용할 클라이언트 주소들
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // 허용할 HTTP 메서드
    credentials: true, // 쿠키를 포함한 요청 허용
  })
);

// Preflight 요청 처리
app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin); // 요청 출처를 동적으로 설정
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  res.sendStatus(200);
});

// JSON 파싱 미들웨어
app.use(express.json());

// 파일 경로 설정
const usersFilePath = path.join(__dirname, "user.json");
let users = [];

// 사용자 데이터 로드 함수
async function loadUsers() {
  try {
    const data = await fs.readFile(usersFilePath, "utf-8");
    users = JSON.parse(data);
  } catch (error) {
    console.error("파일 로드 오류:", error);
    users = [];
  }
}

// 서버 시작 시 데이터 로드
loadUsers();

// 회원가입 엔드포인트
app.post("/register", async (req, res) => {
  try {
    const { username, password, email } = req.body;

    if (users.some((u) => u.username === username)) {
      return res.status(400).json({ message: "이미 존재하는 사용자입니다." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: Date.now(),
      username,
      password: hashedPassword,
      email,
    };

    users.push(newUser);
    await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2));
    res.status(201).json({ message: "회원가입 완료" });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "회원가입 오류" });
  }
});

// 로그인 엔드포인트
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("로그인 요청 데이터:", { username, password });

    const user = users.find((u) => u.username === username);
    if (!user) {
      console.log("사용자를 찾을 수 없습니다.");
      return res.status(401).json({ message: "존재하지 않는 사용자입니다" });
    }

    console.log("저장된 비밀번호 해시:", user.password);

    const isValid = await bcrypt.compare(password, user.password);
    console.log("비밀번호 검증 결과:", isValid);

    if (!isValid) {
      console.log("비밀번호가 일치하지 않습니다.");
      return res.status(401).json({ message: "잘못된 비밀번호입니다" });
    }

    console.log("로그인 성공:", user.username);
    res.json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("로그인 처리 중 오류:", error);
    res.status(500).json({ message: "서버 오류" });
  }
});

// 서버 시작
app.listen(port, () => {
  console.log(`서버 실행: http://localhost:${port}`);
});
