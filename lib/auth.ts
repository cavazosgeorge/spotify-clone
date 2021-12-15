/* eslint-disable prettier/prettier */
// auth validation middleware
import jwt from "jsonwebtoken";
import prisma from "./prisma";

export const validateRoute = (handler) => {
  return async (req, res) => {
    const token = req.cookies.TRAX_ACCESS_TOKEN;

    if (token) {
      let user;

      try {
        const { id } = jwt.verify(token, "hello secret");
        user = await prisma.user.findUnique({
          where: { id },
        });

        if (!user) {
          throw new Error("Not real user");
        }
      } catch (err) {
        res.status(401).json({
          success: false,
          message: "Not Authorized",
        });
      }

      return handler(req, res, user);
    }

    res.status(401).json({
      success: false,
      message: "You need a token to access this",
    });
  };
};

export const validateToken = (token) => {
  const user = jwt.verify(token, "hello secret");
  return user;
};
