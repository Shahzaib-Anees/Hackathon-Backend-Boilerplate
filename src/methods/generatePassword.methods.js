import { sentEmail } from "./nodemailer.methods.js";
const generatePassword = async (name, email) => {
    if (!name) {
        throw new Error("Name is required to generate a password");
    }

    const initials = name.toLowerCase().slice(0, 3);
    const randomNumbers = Math.floor(1000 + Math.random() * 200032300);
    const password = `${initials}${randomNumbers}`;

    const subject = "Welcome to my Saylani Microfinance!";
    const message = `<h1>Hello ${name}</h1>
    <h3>Welcome to Sayani App!</h3>
    <p>Thanks for registering to our platform</p>
    <p>Your password is ${password}</p>
    <p>Please login in to Saylani Microfinance with this password</p>`;

    await sentEmail(email, subject, message);
    return password;
};

export { generatePassword }