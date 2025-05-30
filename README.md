# 🍽️ restoHome

**restoHome** is a modern and responsive restaurant web application that allows users to browse menus, place orders, and explore various food options. Designed for food businesses looking to digitize their services, restoHome provides a clean, intuitive UI and smooth user experience.

---

## 🚀 Features

- 🏠 Landing page with featured restaurants and promotions
- 📂 Browse menu by category
- 🔍 Search for dishes or restaurants
- 🛒 Shopping cart functionality
- 🔐 User authentication (signup/login/logout)
- ⭐ Ratings and customer reviews
- 🧑‍🍳 Admin panel for managing menus and orders
- 📱 Responsive design (mobile/tablet/desktop)
- 📡 REST API integration with backend

---

## 🛠️ Tech Stack

### Frontend
- React.js (JavaScript)
- Bootstrap 5
- Axios (API requests)
- React Router DOM

### Backend (Optional)
- Node.js + Express.js
- MongoDB / PostgreSQL
- REST API with JWT Authentication

---

## 📂 Folder Structure

```
restoHome/
├── public/
├── src/
│   ├── components/        # Reusable UI components
│   ├── pages/             # All route-based pages
│   ├── services/          # API calls
│   ├── assets/            # Images, icons, etc.
│   └── App.js
├── .env
├── package.json
└── README.md
```

---

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone git@github.com:anupCod/RestoHome.git
cd restoHome
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Development Server

```bash
npm start
```

The app should now be running at `http://localhost:3000`.

---

## 🌐 API Configuration

Create a `.env` file in the root and add your API base URL:

```
REACT_APP_API_BASE_URL=http://localhost:5000/api
```

Use this environment variable in your API service files via `process.env.REACT_APP_API_BASE_URL`.

---

## 📸 Screenshots

> _You can add images of your UI here once available._

---

## 📌 Roadmap

- [ ] Integrate payment gateway (e.g., Stripe)
- [ ] Add order history and real-time status
- [ ] Enhance accessibility and SEO
- [ ] Add filtering and sorting for menu items

---

## 🤝 Contributing

Contributions are welcome! If you find a bug or want to add features, feel free to fork the repo and open a pull request.

---

## 📄 License

Licensed under the [MIT License](LICENSE).

---

## 📬 Contact

Made with ❤️ by Anup Bashyal(bashyalanup789@email.com) 