import "./globals.css";

export const metadata = {
  title: "QuizApp",
  description: "Test your knowledge",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: "#0e0b16", margin: 0 }}>
        {children}
      </body>
    </html>
  );
}