import jwt from "jsonwebtoken";

const verifToken = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token)
    return res.status(401).json({
      error: [
        {
          status: res.statusCode,
          title: "Authorization Failed",
          detail: "Autentifikasi gagal",
        },
      ],
    });
  try {
    const verifed = jwt.verify(token, process.env.SECRET_KEY);
    req.user = verifed;
    next();
  } catch (e) {
    res.status(400).json({
      status: res.statusCode,
      message: "invalid token!",
    });
  }
};

export default verifToken;
