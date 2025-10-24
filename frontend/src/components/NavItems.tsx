import { Link } from "react-router-dom";

export const NavItems: React.FC = () => {
    return (
      <>
       {/*Provide the appropriate navigational links in the "to" prop*/}
        <h4>Are you a New User, Please <Link to="/register">Join Now</Link></h4>
        <h4>Existing User, Please <Link to="/login">Click Here</Link></h4>
  
      </>
    );
  };
  