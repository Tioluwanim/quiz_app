import "./globals.css";

export const metadata = {
  title: "QuizApp",
  description: "Test your knowledge",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: "#1a1018", margin: 0 }}>
        {children}
      </body>
    </html>
  );
}