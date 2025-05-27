
# 🏝️ Wonderlust

**Wonderlust** is a travel and property listing web application built with Node.js, Express, MongoDB, and EJS. Users can register, log in, create travel destination listings, review listings, and upload images to Cloudinary.

---

## 📁 Project Structure

```bash
.
├── app.js                    # Entry point of the application
├── models/                  # Mongoose models (User, Listing, Review)
├── route/                   # Express routers for listings, users, and reviews
├── utils/                   # Utility files including error classes
├── views/                   # EJS templates
├── public/                  # Static assets (CSS, images)
├── Schema.js                # Joi validation schemas
├── middlleware.js           # Custom middlewares for auth and validation
├── cloudConfig.js           # Cloudinary configuration
├── .env                     # Environment variables (not included)
├── package.json
└── README.md                # You’re here!
```

---

## 🚀 Features

* 🔐 User Authentication (Register, Login, Logout)
* ✏️ Create, Update, Delete Listings
* 📝 Add, Edit, and Delete Reviews
* ☁️ Image Upload via Cloudinary
* 🛡️ Input Validation using Joi
* ⚠️ Flash messages for feedback
* 🔍 Session-based Redirects after Login
* ❌ Custom Error Handling

---

## 🧰 Tech Stack

* **Backend**: Node.js, Express.js, Mongoose
* **Frontend**: EJS, EJS-Mate (Layout Engine), Bootstrap (assumed)
* **Authentication**: Passport.js, Passport-Local-Mongoose
* **Storage**: MongoDB (local), Cloudinary (image uploads)
* **Validation**: Joi
* **Environment Config**: dotenv

---

## 🛠️ Installation

```bash
# Clone the repository
git clone https://github.com/your-username/wonderlust.git
cd wonderlust

# Install dependencies
npm install
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory and add the following:

```env
CLOUD_NAME=your_cloud_name
CLOUD_API_KEY=your_api_key
CLOUD_API_SECRET=your_api_secret
NODE_ENV=development
```

---

## 🏃 Usage

Start your server:

```bash
node app.js
# Or use nodemon for development
npx nodemon app.js
```

Visit `http://localhost:8080` in your browser.

---

## ✅ Routes Overview

### Public Routes

* `/` - Root (simple message)
* `/listings` - View all listings
* `/listings/:id` - View specific listing

### Auth Routes

* `/register` - User registration
* `/login` - Login
* `/logout` - Logout

### Protected Routes

* `POST /listings` - Create listing
* `PUT /listings/:id` - Update listing
* `DELETE /listings/:id` - Delete listing
* `POST /listings/:id/reviews` - Add review
* `DELETE /listings/:id/reviews/:reviewId` - Delete review

---

## 🧪 Validation & Middleware

* **Joi Schema Validation**: All user inputs are validated via `Schema.js`.
* **Middleware Checks**:

  * `isLoggedIn`
  * `isOwner` for listings
  * `isReviewAuthor` for reviews

---

## 🐛 Error Handling

Custom error handler using an `ExpressError` class. All unmatched routes trigger a 404 error.

---

## 📦 Dependencies

See [`package.json`](./package.json) for full list. Key packages include:

* `express`, `mongoose`, `ejs`, `ejs-mate`
* `passport`, `passport-local`, `passport-local-mongoose`
* `connect-flash`, `express-session`
* `multer`, `cloudinary`, `multer-storage-cloudinary`
* `joi`, `dotenv`

---

## ✍️ License

This project is licensed under the ISC License.

---

## 👤 Author

Feel free to add your name or GitHub profile link here.

---

Would you like this saved as a file or pushed to your repo?
