export const uploadImage = async (req, res) => {
  console.log("FILE:", req.file);

  try {
    res.status(200).json({
      success: true,
      imageUrl: req.file.path,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};