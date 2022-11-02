import './Header.scss';

function Header() {
    return (
        <div class="header">
            <a href="#default" className="logo">stewie</a>
            <div class="header-right">
                <a className="active" href="#home">Home</a>
                <a href="#recipes">Recipes</a>
                <a href="#progress">Progress</a>
        </div>
  </div>
    )
}

export default Header;