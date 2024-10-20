const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const userModel = require("./models/user");
const auctionModel = require("./models/auction");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");


const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

mongoose.connect("mongodb://127.0.0.1:27017/user");

//swagger
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Auction System API",
      version: "1.0.0",
      description: "API documentation for the Auction System",
    },
    servers: [
      {
        url: "http://localhost:3001",
      },
    ],
  },
  apis: ["./index.js"], 
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));


//signUp
/**
* @swagger
* /signUp:
*   post:
*     summary: Sign up a new user
*     tags: [User]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               email:
*                 type: string
*               password:
*                 type: string
*     responses:
*       200:
*         description: User created successfully
*       400:
*         description: Error creating user
*/
app.post("/signUp", async (req, res) => {
  const { password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  req.body.password = hashedPassword;

  userModel
    .create(req.body)
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json(err));
});

//login
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Log in a user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid credentials
 */
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user._id }, "your_jwt_secret", {
    expiresIn: "1h",
  });
  res.json({ token });
});

//Auction Creation
/**
 * @swagger
 * /auctions:
 *   post:
 *     summary: Create a new auction
 *     tags: [Auction]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               des:
 *                 type: string
 *               currBid:
 *                 type: number
 *               imageSrc:
 *                 type: string
 *               userEmail:
 *                 type: string
 *               validTillDays:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Auction created successfully
 *       400:
 *         description: Error creating auction
 */
app.post("/auctions", (req, res) => {
  const { title, des, currBid, imageSrc, userEmail, validTillDays } = req.body;
  const minBid = currBid;
  userModel
    .findOne({ email: userEmail })
    .then((user) => {
      if (user) {
        auctionModel
          .create({
            title,
            des,
            currBid,
            minBid,
            imageSrc,
            validTillDays,
            userEmail: userEmail,
            bidHistory:[
          {
            userEmail:userEmail,
            bidAmount:minBid, 
            timestamp: new Date(),
          },
        ],
          })
          .then((auction) => res.json(auction))
          .catch((err) => console.log(err));
      } else {
        res.json("User not found");
      }
    })
    .catch((err) => res.json(err));
});

//auction get
/**
 * @swagger
 * /auctions:
 *   get:
 *     summary: Retrieve all auctions
 *     tags: [Auction]
 *     responses:
 *       200:
 *         description: List of auctions
 *       500:
 *         description: Server error
 */
app.get("/auctions", (req, res) => {
  auctionModel
    .find({})
    .then((auctions) => res.json(auctions))
    .catch((err) => res.json(err));
});

// Update auction
/**
 * @swagger
 * /myAuctions/{id}:
 *   put:
 *     summary: Update an existing auction
 *     tags: [Auction]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the auction to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               des:
 *                 type: string
 *               currBid:
 *                 type: number
 *               validTillDays:
 *                 type: integer
 *               imageSrc:
 *                 type: string
 *               userEmail:
 *                 type: string
 *     responses:
 *       200:
 *         description: Auction updated successfully
 *       403:
 *         description: You don't have permission to update this auction
 *       404:
 *         description: Auction not found
 *       500:
 *         description: Server error
 */
app.put("/myAuctions/:id", (req, res) => {
  const { id } = req.params;
  const { title, des, currBid, validTillDays, imageSrc, userEmail } = req.body;

  auctionModel
    .findOne({ _id: id })
    .then((auction) => {
      if (auction && auction.userEmail === userEmail) {
        auction.title = title || auction.title;
        auction.des = des || auction.des;
        auction.currBid = currBid || auction.currBid;
        auction.imageSrc = imageSrc || auction.imageSrc;
        auction.validTillDays = validTillDays || auction.validTillDays;
        auction
          .save()
          .then((updatedAuction) => res.json(updatedAuction))
          .catch((err) => res.status(500).json(err));
      } else {
        res
          .status(403)
          .json("You don't have permission to update this auction");
      }
    })
    .catch((err) => res.status(500).json(err));
});

// Delete auction
/**
 * @swagger
 * /myAuctions/{id}:
 *   delete:
 *     summary: Delete an auction
 *     tags: [Auction]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the auction to delete
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userEmail:
 *                 type: string
 *     responses:
 *       200:
 *         description: Auction deleted successfully
 *       403:
 *         description: You don't have permission to delete this auction
 *       404:
 *         description: Auction not found
 *       500:
 *         description: Server error
 */
app.delete("/myAuctions/:id", (req, res) => {
  const { id } = req.params;
  const { userEmail } = req.body;

  auctionModel
    .findOne({ _id: id })
    .then((auction) => {
      if (auction && auction.userEmail === userEmail) {
        auction
          .deleteOne()
          .then(() => res.json("Auction deleted"))
          .catch((err) => res.status(500).json(err));
      } else {
        res
          .status(403)
          .json("You don't have permission to delete this auction");
      }
    })
    .catch((err) => res.status(500).json(err));
});

//Update Bid History
/**
 * @swagger
 * /myAuctions/{id}:
 *   post:
 *     summary: Place a bid on an auction
 *     tags: [Auction]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the auction to bid on
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userEmail:
 *                 type: string
 *               bidAmount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Bid placed successfully
 *       400:
 *         description: Bid amount must be higher than the current bid
 *       404:
 *         description: Auction not found
 *       500:
 *         description: Server error
 */

app.post("/myAuctions/:id", async (req, res) => {
  const { id } = req.params; // Auction ID
  const { userEmail, bidAmount } = req.body;

  try {
    const auction = await auctionModel.findOne({_id:id});
    if (!auction) {
      return res.status(404).json("Auction not found");
    }
    // Update current bid if bidAmount is higher
    if (bidAmount > auction.currBid) {
      auction.currBid = bidAmount;

      // Add the bid to the bid history
      auction.bidHistory.push({
        userEmail,
        bidAmount,
      });

      await auction.save();

      res.json({ message: "Bid placed successfully", auction });
    } else {
      res
        .status(400)
        .json({ message: "Bid amount must be higher than the current bid" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

//get Bid History
/**
 * @swagger
 * /myAuctions/{id}:
 *   get:
 *     summary: Retrieve the bid history of an auction
 *     tags: [Auction]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the auction to retrieve bid history
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Bid history retrieved successfully
 *       404:
 *         description: Auction not found
 *       500:
 *         description: Server error
 */
app.get("/myAuctions/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const auction = await auctionModel.findOne({_id:id});
    if (!auction) {
      return res.status(404).json("Auction not found");
    }

    res.json({ bidHistory: auction.bidHistory });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});


app.listen(3001, () => {
  console.log("server is running on port 3001");
});
