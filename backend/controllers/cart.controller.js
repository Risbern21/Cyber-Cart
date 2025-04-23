import { getCartByIdSerivce } from "../models/cartModels.js";

export const getCartById = async (req, res) => {
  const { cart_id } = req.body;

  try {
    const data = await getCartByIdSerivce(cart_id);

    return res.status(200).json({
      success: true,
      data: data,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "something went wrong",
    });
  }
};
