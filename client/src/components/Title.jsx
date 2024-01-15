import './Title.css'
import logo from '../assets/worldwallet-logo.svg'

export default function Title() {
  return (
    <>
      <div className="title-div">
        <img src={logo} alt=''/>
        <p>worldwallet</p>
      </div>
    </>
  );
}
