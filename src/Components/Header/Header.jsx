import "./Header.css";

const Header = () => {
  return (
    <>
      <div className="header">
        <div className="header-titles">
          <span className="headerTitleSm">React & Node</span>
          <span className="headerTitleLg">Blog</span>
        </div>
        <img src={require("../../Images/Back/3.jpg")} alt="" />
      </div>
    </>
  );
};

export default Header;
