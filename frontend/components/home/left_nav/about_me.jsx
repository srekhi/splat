import React from 'react';
const AboutMe = () =>(
  <section id="about-container">
    <section id="about-me-section">
      <section id="about-description-container">
        <div id="about-header-info">
          <img id="about-logo"
            src="http://res.cloudinary.com/dbbzpmyvc/image/upload/c_scale,w_28/v1494891230/slack_zawidf.svg" />

          <h4 id="about-header">About Splat</h4>
        </div>
        <p id="about-me-intro">
          This application is an App Academy portfolio project inspired by
          Slack.
        </p>
        <aside id="about-me-credits">Created by Sunny Rekhi</aside>
    </section>

    <div id="about-me-links">
      <a className="about-me-link" href="mailto:rohit.rekhi@gmail.com">
        <i className="fa fa-envelope"></i> E-mail
      </a>
      <a className="about-me-link" href="https://github.com/srekhi">
        <i className="fa fa-github"></i> Github
      </a>
    </div>
    </section>
  </section>
);

export default AboutMe;
