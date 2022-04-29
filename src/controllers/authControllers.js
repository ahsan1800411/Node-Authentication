const User = require('../models/User');
const ErrorHandler = require('../utils/errorHandler');
const { StatusCodes } = require('http-status-codes');

exports.register = async (req, res) => {
  const { name, email, password: userPassword } = req.body;

  if (!name || !userPassword || !email)
    throw new ErrorHandler('Please provide all the vlaues', 400);

  const userExists = await User.findOne({ email });
  if (userExists) throw new ErrorHandler('User already Exists', 400);

  const user = await User.create({ name, email, password: userPassword });

  const token = user.createJWT();

  const { password, ...others } = user._doc;

  res.status(201).json({
    success: true,
    user: others,
    token,
  });
};

// login

exports.login = async (req, res) => {
  const { email, password: userPassword } = req.body;
  if (!email || !userPassword)
    throw new ErrorHandler(
      'Please provide all the values',
      StatusCodes.BAD_REQUEST
    );

  const user = await User.findOne({ email }).select('+password');

  if (!user)
    throw new ErrorHandler('Invalid Credentials!!', StatusCodes.BAD_REQUEST);
  const isMatch = await user.comparePassword(userPassword);
  // const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    throw new ErrorHandler('Invalid Credentials', StatusCodes.BAD_REQUEST);

  const { password, ...others } = user._doc;

  const token = user.createJWT();

  res.status(StatusCodes.OK).json({
    success: true,
    user: others,
    token,
  });
};

// exports.update = async (req, res) => {
//   const { email, name } = req.body;

//   if (!email || !name)
//     throw new ErrorHandler(
//       'Please provide all the values',
//       StatusCodes.BAD_REQUEST
//     );

//   const { id } = req.params;
//   const user = await User.findOne({ id });

//   if (!user)
//     throw new ErrorHandler(
//       `User not found with this id ${id}`,
//       StatusCodes.BAD_REQUEST
//     );

//   user.name = name;
//   user.email = email;

//   await user.save();

//   res.status(StatusCodes.OK).json({ success: true, user });
// };

exports.update = async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ id });
  if (!user)
    throw new ErrorHandler(
      `User not found with this id ${id}`,
      StatusCodes.BAD_REQUEST
    );

  const updatedUser = await User.findOneAndUpdate({ id }, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(StatusCodes.OK).json({ success: true, updatedUser });
};

exports.deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) throw new ErrorHandler('User not found', StatusCodes.BAD_REQUEST);
  console.log(typeof req.user.id);
  console.log(typeof user.id);
};
