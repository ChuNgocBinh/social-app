const router = require("express").Router();
const auth = require('../../middleware/auth')

const profileController = require("./profile.controller");

router.post("/", profileController.createProfile);
router.get("/:userId", auth, profileController.getProfileByUserId);
router.put("/", auth, profileController.updateProfile);
router.put("/save", auth, profileController.savePostByPostId);

module.exports = router;
