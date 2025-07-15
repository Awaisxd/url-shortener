Here’s a cleaned-up and properly styled version of your **GitHub README** file for your **Node.js + MongoDB URL Shortener API**. This version is optimized for readability and formatting on GitHub:

---

# 📎 URL Shortener REST API

A high-performance RESTful API that converts long URLs into short, trackable links. Built using **Node.js**, **Express**, and **MongoDB**, this project was developed as part of an assignment from **Innovaxel**. It provides a scalable and developer-friendly solution for URL management.

---

## 🚀 Features

* 🔗 **URL Shortening** – Converts long URLs into unique short links (e.g., `short.com/abc123`)
* 🔁 **Smart Redirection** – 301 redirects with tracking
* 🛠 **Full CRUD Support** – Manage shortened URLs via REST API
* 📊 **Access Analytics** – Tracks visit counts for each link
* ⚠️ **Robust Error Handling** – Validates and manages user input errors gracefully

---

## 🧰 Tech Stack

| Component     | Technology        |
| ------------- | ----------------- |
| Backend       | Node.js, Express  |
| Database      | MongoDB Atlas     |
| URL Generator | `shortid` library |
| Logging       | Winston           |
| Environment   | Dotenv            |

---

## 🧠 Challenges & Solutions

### 1. **Duplicate Short Codes**

* **Challenge**: Ensuring uniqueness under high load
* **Solution**: Retry logic with `shortid` fallback for uniqueness

### 2. **MongoDB Connection Failures**

* **Challenge**: Occasional Atlas connectivity issues
* **Solution**: Added validation with fallback to local DB

### 3. **Accurate Access Counting**

* **Challenge**: Maintaining count consistency
* **Solution**: Used atomic updates via `findOneAndUpdate()`

---

## 🛠️ Getting Started

### 1. **Clone the Repository**

```bash
git clone https://github.com/your-username/url-shortener.git
cd url-shortener
```

### 2. **Install Dependencies**

```bash
npm install
```

### 3. **Configure Environment**

Create a `.env` file:

```ini
MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.abc123.mongodb.net/urlshortener?retryWrites=true&w=majority
PORT=5000
```

### 4. **Run the Server**

```bash
node app.js
# or for development
npx nodemon app.js
```

> Server is live at: `http://localhost:5000`

---

## 📡 API Endpoints

| Method | Endpoint                    | Description                  |
| ------ | --------------------------- | ---------------------------- |
| POST   | `/shorten`                  | Create a short URL           |
| GET    | `/:shortCode`               | Redirect to the original URL |
| GET    | `/shorten/:shortCode`       | Retrieve short URL details   |
| PUT    | `/shorten/:shortCode`       | Update the destination URL   |
| DELETE | `/shorten/:shortCode`       | Delete the short URL         |
| GET    | `/shorten/:shortCode/stats` | Get access analytics         |

---

## 🧪 Troubleshooting

| Problem                  | Fix                                         |
| ------------------------ | ------------------------------------------- |
| MongoDB connection fails | Check `.env` and whitelist your IP on Atlas |
| 404 errors               | Ensure short code exists in database        |
| Validation errors        | Use `Content-Type: application/json`        |
| Duplicate short codes    | Handled with automatic retry generation     |

---

## 📄 License

Licensed under the **ISC License**. See [LICENSE](LICENSE) for more details.

---

> ⚠️ **Note**: Replace placeholder values (`<user>`, `<password>`, etc.) with actual MongoDB credentials. For production, implement HTTPS, rate limiting, and other security best practices.

