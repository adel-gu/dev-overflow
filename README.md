<a name="readme-top"></a>

<div align="center">

  <img src="dev_overflow_logo.png" alt="logo" width="140" height="auto" />
  <br/>

  <h3><b>Dev Overflow</b></h3>

</div>

# 📗 Table of Contents

- [📖 About the Project](#about-project)
  - [🛠 Built With](#built-with)
    - [Tech Stack](#tech-stack)
    - [Key Features](#key-features)
  - [🚀 Live Demo](#live-demo)
- [💻 Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Setup](#setup)
  - [Install](#install)
  - [Usage](#usage)
  - [Run tests](#run-tests)
  - [Deployment](#triangular_flag_on_post-deployment)
- [👥 Authors](#authors)
- [🔭 Future Features](#future-features)
- [🤝 Contributing](#contributing)
- [⭐️ Show your support](#support)
- [🙏 Acknowledgements](#acknowledgements)
- [❓ FAQ](#faq)
- [📝 License](#license)

# 📖 Dev Overflow <a name="about-project"></a>

**Dev-Overflow** is a modern Stack Overflow clone designed for developers to share knowledge and solve problems collaboratively.

## 🛠 Built With <a name="built-with"></a>

### Tech Stack <a name="tech-stack"></a>

- **Frontend:** Next.js, TypeScript, TailwindCSS, Shadcn
- **Backend:** MongoDB, Mongoose
- **Authentication:** Clerk

### Key Features <a name="key-features"></a>

- **Create and answer questions**
- **Interactive likes and commenting**
- **Reward system for user engagement**
- **WYSIWYG editor for creating questions and answers**
- **Advanced search filters**

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🚀 Live Demo <a name="live-demo"></a>

- [Live Demo Link](https://dev-overflow-adels-projects-d623dcad.vercel.app/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 💻 Getting Started <a name="getting-started"></a>

To get a local copy up and running, follow these steps:

### Prerequisites

Ensure you have the following installed on your system:

- Node.js (>= 14.x)
- npm or yarn
- MongoDB account

### Setup

Clone this repository to your desired folder:

```sh
git clone git@github.com:adel-gu/dev-overflow.git
```

### Install

Navigate to the project directory and install dependencies:

```sh
cd dev-overflow
npm install --legacy-peer-deps
```

### Usage

Create a `.env.local` file at the root level with the following keys:

```sh
NEXT_PUBLIC_CLERK_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_SIGN_UP_URL=
NEXT_PUBLIC_TINY_EDITOR_API_KEY=
MONGODB_STRING_CONNECTION=
SIGNING_SECRET=
NEXT_PUBLIC_SERVER_URL=
```

To run the project locally:

```sh
npm run dev
```

### Run tests

To run tests, execute the following command:

```sh
npm run test
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 👥 Authors <a name="authors"></a>

👤 **Adel Guitoun**

- GitHub: [@adel-gu](https://github.com/adel-gu)
- Twitter: [@GuitounAdel](https://x.com/GuitounAdel)
- LinkedIn: [adelguitoun](https://www.linkedin.com/in/adelguitoun/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🔭 Future Features <a name="future-features"></a>

- **Real-time notifications**
- **Notifications toast component**

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## ⭐️ Show your support <a name="support"></a>

If you like this project, please give it a ⭐️!

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🙏 Acknowledgements <a name="acknowledgements"></a>

I want to thank [JSM](https://www.youtube.com/@javascriptmastery) for the Figma design file.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## ❓ FAQ <a name="faq"></a>

- **How do I reset my password?**

  - Go to the login page and click "Forgot Password" to reset your credentials.

- **Can I delete my account?**
  - Yes, you can delete your account from the profile settings page.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 📝 License <a name="license"></a>

This project is [MIT](./LICENSE) licensed.

<p align="right">(<a href="#readme-top">back to top</a>)</p>
