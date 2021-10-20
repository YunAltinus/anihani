const router = require("express").Router();
const authMiddleware = require("../middlewares/auth");
const adminMiddleware = require("../middlewares/admin");

const {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/admin");

router.get("/users", [authMiddleware, adminMiddleware], getAllUsers);

router.get("/:id", [authMiddleware, adminMiddleware], getUser);

router.patch("/:id", [authMiddleware, adminMiddleware], updateUser);

router.delete("/:id", [authMiddleware, adminMiddleware], deleteUser);

module.exports = router;
