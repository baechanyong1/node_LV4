// routes/users.route.js

const express = require("express");
const { Users, UserInfos } = require("../models");
const router = express.Router();
const jwt = require("jsonwebtoken");

// 회원가입
router.post("/users", async (req, res) => {
  const { email, password, nickname } = req.body;
  const isExistUser = await Users.findOne({ where: { email } });
  // 이 정규식 표현이 의도한 대로 작동하지 않음
  // 의도한 것 = 알파벳 + 숫자 + .@ 를 포함한 것
  if (!/^[a-zA-Z0-9.@]{13,50}$/.test(email)) {
    return res.status(410).json({
      message: "이메일은 영어와 숫자로 13자 이상 50자 까지 가능합니다.",
    });
  }
  // if (!email.match("^.{13,50}$")) {
  //   return res.status(410).json({
  //     message: "이메일은 영어와 숫자로 13자 이상 50자 까지 가능합니다.",
  //   });
  // }

  if (isExistUser) {
    return res.status(409).json({ message: "이미 존재하는 이메일입니다." });
  }

  // Users 테이블에 사용자를 추가합니다.
  const user = await Users.create({ email, password });
  // UserInfos 테이블에 사용자 정보를 추가합니다.
  const userInfo = await UserInfos.create({
    UserId: user.userId,
    email: email, // 생성한 유저의 userId를 바탕으로 사용자 정보를 생성합니다.
    nickname: nickname,
    password: password,
    userDesc: null,
  });

  return res.status(201).json({ message: "회원가입이 완료되었습니다." });
});

// routes/users.route.js

// 로그인
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await Users.findOne({ where: { email } });
  if (!user) {
    return res.status(401).json({ message: "존재하지 않는 이메일입니다." });
  } else if (user.password !== password) {
    return res.status(401).json({ message: "비밀번호가 일치하지 않습니다." });
  }

  const token = jwt.sign(
    {
      userId: user.userId,
    },
    "customized_secret_key"
  );
  res.cookie("authorization", `Bearer ${token}`);
  return res.status(200).json({ message: "로그인 성공" });
});

// 사용자 조회 API (GET)
router.get("/users/:userId", async (req, res) => {
  const { userId } = req.params;

  const user = await Users.findOne({
    attributes: ["userId", "email", "createdAt", "updatedAt"],
    include: [
      {
        model: UserInfos, // 1:1 관계를 맺고있는 UserInfos 테이블을 조회합니다.
        attributes: ["userDesc"],
      },
    ],
    where: { userId },
  });

  return res.status(200).json({ data: user });
});

module.exports = router;
