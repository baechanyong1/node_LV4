const express = require("express");
const router = express.Router();
const { Posts } = require("../models");
// Middleware
const authMiddleware = require("../middleware/authMiddleware");

// router.post("/like/:postId", async (req, res) => {
//   const postId = req.params.postId;

//   try {
//     // Post 모델에서 해당 postId의 게시글 조회
//     const post = await Posts.findOne(postId);

//     if (!post) {
//       // 게시글이 없는 경우
//       return res
//         .status(404)
//         .json({ success: false, message: "게시글을 찾을 수 없습니다." });
//     }

//     if (post.likeCount > 0) {
//       // 좋아요 삭제
//       post.likeCount -= 1;
//       await post.save();
//       return res.json({
//         success: true,
//         message: "좋아요 삭제",
//         likeCount: post.likeCount,
//       });
//     } else {
//       // 좋아요 생성
//       post.likeCount = 1;
//       await post.save();
//       return res.json({
//         success: true,
//         message: "좋아요 생성",
//         likeCount: post.likeCount,
//       });
//     }
//   } catch (error) {
//     console.error("오류 발생", error);
//     return res
//       .status(500)
//       .json({ success: false, message: "서버 오류가 발생했습니다." });
//   }
// });

router.put("/like/:postId", authMiddleware, async (req, res) => {
  const postId = req.params.postId;

  try {
    // Posts 모델에서 해당 postId의 게시글 조회
    const post = await Posts.findByPk(postId);

    if (!post) {
      // 게시글이 없는 경우
      return res
        .status(404)
        .json({ success: false, message: "게시글을 찾을 수 없습니다." });
    }

    if (post.like > 0) {
      // 좋아요 삭제
      post.like -= 1;
    } else {
      // 좋아요 생성
      post.like = 1;
    }

    // 게시글 정보를 데이터베이스에 저장
    await post.save();

    return res.json({
      success: true,
      message: post.like > 0 ? "좋아요 생성" : "좋아요 삭제",
      likeCount: post.like,
    });
  } catch (error) {
    console.error("오류 발생", error);
    return res
      .status(500)
      .json({ success: false, message: "서버 오류가 발생했습니다." });
  }
});

router.get("/post/like", authMiddleware, async (req, res) => {
  const likePosts = await Posts.findAll({
    attributes: ["title", "createdAt", "like"],
    order: [["like", "DESC"]],
    // where: { Posts },
  });
  console.log(likePosts);
  res.status(200).json({ message: likePosts });
});

module.exports = router;
