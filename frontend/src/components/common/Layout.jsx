import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main">
        <Navbar />
        <div className="page">{children}</div>
      </div>
    </div>
  );
}
