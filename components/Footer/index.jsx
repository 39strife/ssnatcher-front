import React from "react";
import {
  FacebookIcon,
  InstagramIcon,
  DiscordIcon,
  TwitterIcon,
} from "../../styles/icons";

export default function Footer() {
  return (
    <footer>
      <div className="wrapper wrapper-fluid b-t-1">
        <div className="row">
          <div className="col-lg-3">
            <h3>➰ Stay in the loop!</h3>
            <p>
              Sign up for our newsletter and beat everyone to the punch! (pun
              intented)
            </p>
            <form>
              <div className="form-group">
                <input type="email" placeholder="your@email.com" />
              </div>
              <div className="form-group">
                <button className="btn">Sign up</button>
              </div>
            </form>
          </div>
          <div className="col-lg-6">
            <h3>🔗 Navigation</h3>
            <ul>
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Blog</a>
              </li>
              <li>
                <a href="#">Games</a>
              </li>
              <li>
                <a href="#">Characters</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
              <li>
                <a href="#">FAQ</a>
              </li>
              <li>
                <a href="#">Terms of Service</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
            </ul>
          </div>
          <div className="col--lg-3">
            <h3>😳 Stalk us</h3>
            <ul className="socials">
              <li>
                <a href="facebook">
                  <FacebookIcon />
                </a>
              </li>
              <li>
                <a href="instagram">
                  <InstagramIcon />
                </a>
              </li>
              <li>
                <a href="discord">
                  <DiscordIcon />
                </a>
              </li>
              <li>
                <a href="twitter">
                  <TwitterIcon />
                </a>
              </li>
            </ul>
            <p>© SPLUS 2020. All Rights Reserved.</p>
          </div>
        </div>
      </div>
      <div className="wrapper copyright">
        <div className="text-center">
          <p>Developed and designed by Alek Angelov</p>
        </div>
      </div>
    </footer>
  );
}
