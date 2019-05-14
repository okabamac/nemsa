import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import multer from 'multer';
import {
  userSchema,
} from './validation';


import User from '../models/User';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(`${__dirname}/../uploads`));
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 1 * 256 * 1024 },
}).single('avatar');


const UserControls = {
  addUser: (req, res) => {
    upload(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(400).send({
          status: 'Error',
          message: `There is an error: ${err.message}`,
        });
      } if (err) {
        return res.status(400).send({
          status: 'Error',
          message: `There is an error: ${err.message}`,
        });
      }
      if (req.file.mimetype) {
        const {
          firstName,
          lastName,
          staffEmail,
          staffID,
          password,
          admin,
        } = req.body;


        User.findOne({
          staffEmail,
        }, (err, existingUser) => {
          if (existingUser === null) {
            // Creating one user.
            const user = new User({
              name: {
                first: firstName,
                last: lastName,
              },
              staffID,
              staffEmail,
              password,
              admin,
              avatar: {
                data: fs.readFileSync(req.file.path),
                contentType: req.file.mimetype,
              },
            });
            bcrypt.genSalt(10, (err, salt) => bcrypt.hash(user.password, salt, (err, hash) => {
              if (err) throw err;
              user.password = hash;
              user
                .save()
                .then(() => res.status(200).send({
                  message: `Staff with ID ${staffID} has been added successfully`,
                }))
                .catch((err) => {
                  res.status(401).send({
                    message: err,
                  });
                });
            }));
          } else {
            return res.status(400).send({
              status: 'Error',
              message: 'Email is not available',
            });
          }
        });
      } else {
        return res.status(400).send({
          status: 'Error',
          message: 'Please upload an image',
        });
      }
    });
  },

  editUser: async (req, res, next) => {
    try {
      const staff = await User.findOne({
        name: {
          first: req.body.firstName,
          last: req.body.lastName,
        },
        staffID: req.body.staffID,
      });
      if (staff !== null) {
        return res.status(200).send({
          staff,
        });
      }
      return res.status(404).json({
        status: 'Error',
        message: 'One of the fields is incorrect or this staff does not exist',
      });
    } catch (err) {
      res.status(500);
      return next(new Error('Please try again later'));
    }
  },
};

export default UserControls;
