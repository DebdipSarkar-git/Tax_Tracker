
import {NavItems} from "./NavItems";

const Home = () => {
    return (
        <div className="container-fluid" >
            <div className="row" >
                <div className="col-md-7 offset-md-4 col-sm-6 offset-sm-1 " >
                    <br />
                    <div className=" text-justify form-background" >

                        <h1 className="book "><b>Tax Tracker</b></h1>

                        <h3 className="message">TaxTracker is a comprehensive web-based platform designed to streamline the process of tax filing and management for individual taxpayers in India. 
                            It offers a user-friendly interface for registering, logging in, viewing yearly transactions, 
                            downloading tax-related documents, and submitting Form 90C. </h3>
                        <h4 className="messageOne">"Discover a New Era of Tax Excellence"
                        </h4>
                        <br/>
                        <br/>
                        
                        <ul><NavItems /></ul>
                        
                    </div>
                </div>
            </div>


        </div>
    );
};
export default Home;