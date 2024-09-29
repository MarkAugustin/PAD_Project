<template>
  <div class="footer-container">
    <div class="footer-menu">
      <div class="footer-column">
        <span class="footer-column-head">Company Info</span>
        <span class="footer-column-element">About Us</span>
        <span class="footer-column-element">Contact Us</span>
        <span class="footer-column-element">Careers</span>
        <span class="footer-column-element">FAQs</span>
        <span class="footer-column-element">Terms of service</span>
        <span class="footer-column-element">Privacy Policy</span>
      </div>
      <div class="footer-column">
        <span class="footer-column-head">Help</span>
        <span class="footer-column-element">Account Support</span>
        <span class="footer-column-element">Listing Events</span>
        <span class="footer-column-element">Event Tickening</span>
        <span class="footer-column-element">Ticket Purchase Term & Conditions</span>
      </div>
      <div class="footer-column">
        <span class="footer-column-head">Categories</span>
        <span class="footer-column-element">Concert & Gigs</span>
        <span class="footer-column-element">Festivals & Lifestyle</span>
        <span class="footer-column-element">Business & Networking</span>
        <span class="footer-column-element">Food & Drinks</span>
        <span class="footer-column-element">Performing Arts</span>
        <span class="footer-column-element">Sports & Outdoors</span>
        <span class="footer-column-element">Exhibitions</span>
        <span class="footer-column-element">Workshops, Conferences & Classes</span>
      </div>
      <div class="footer-column">
        <span class="footer-column-head">Follow Us</span>
        <span class="footer-column-element">Facebook</span>
        <span class="footer-column-element">Instagram</span>
        <span class="footer-column-element">Twitter</span>
        <span class="footer-column-element">Youtube</span>
      </div>
      <div class="footer-column">
        <span class="footer-column-head">Download The App</span>
        <img src="@/assets/Apps.svg"/>
      </div>
    </div>
  </div>
</template>

<style>
.footer-container {
  width: 100%;
  height: 482px;
  background-color: #2b293d;
  display: flex;
  align-items: center;
  justify-content: center;
}
.footer-menu {
  display: flex;
  justify-content: space-evenly;
  align-items: flex-start;
  width: 1920px;
}
.footer-column {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}
.footer-column-head {
  color: white;
  font-size: 24px;
  margin-bottom: 15px;
}
.footer-column-element {
  color: #a9a9a9;
  font-size: 18px;
  margin-top: 15px;
}
.footer-apps {
    margin-top: 1em;
}
</style>
