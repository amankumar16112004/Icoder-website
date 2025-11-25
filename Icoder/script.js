/* script.js - shared across pages */

/* Read More toggle for all cards (works on any page with .readBtn) */
document.addEventListener("DOMContentLoaded", () => {
  // Read more toggles
  document.querySelectorAll(".readBtn").forEach(btn => {
    btn.addEventListener("click", function(){
      const card = this.closest(".card");
      if(!card) return;
      const shortEl = card.querySelector(".short");
      const fullEl = card.querySelector(".full-text");
      if(!fullEl) return;

      if(fullEl.style.display === "block"){
        fullEl.style.display = "none";
        if(shortEl) shortEl.style.display = "block";
        this.textContent = "Continue Reading";
      } else {
        fullEl.style.display = "block";
        if(shortEl) shortEl.style.display = "none";
        this.textContent = "Read Less";
      }
    });
  });

  // Simple nav highlight
  const path = location.pathname.split("/").pop();
  document.querySelectorAll(".nav-link").forEach(a => {
    if(a.getAttribute("href") === path) a.classList.add("active");
  });

  // Contact form submit (just demo)
  const contactForm = document.querySelector("#contactForm");
  if(contactForm){
    contactForm.addEventListener("submit", e => {
      e.preventDefault();
      const name = contactForm.querySelector("[name=name]").value.trim();
      const email = contactForm.querySelector("[name=email]").value.trim();
      const msg = contactForm.querySelector("[name=message]").value.trim();
      if(!name || !email || !msg){
        alert("Please fill all fields.");
        return;
      }
      // demo: save to localStorage
      const messages = JSON.parse(localStorage.getItem("icoder_messages") || "[]");
      messages.push({name, email, msg, date: new Date().toISOString()});
      localStorage.setItem("icoder_messages", JSON.stringify(messages));
      alert("Thanks! Your message has been saved (demo).");
      contactForm.reset();
    });
  }

  // Simple login demo (localStorage)
  const loginForm = document.querySelector("#loginForm");
  if(loginForm){
    loginForm.addEventListener("submit", e=>{
      e.preventDefault();
      const email = loginForm.querySelector("[name=email]").value.trim();
      const pass = loginForm.querySelector("[name=password]").value.trim();
      const users = JSON.parse(localStorage.getItem("icoder_users") || "[]");
      const found = users.find(u => u.email === email && u.password === pass);
      if(found){
        localStorage.setItem("icoder_current", JSON.stringify({email}));
        alert("Login success (demo).");
        location.href = "index.html";
      } else {
        alert("Invalid credentials or user doesn't exist.");
      }
    });
  }

  // Signup demo
  const signupForm = document.querySelector("#signupForm");
  if(signupForm){
    signupForm.addEventListener("submit", e=>{
      e.preventDefault();
      const name = signupForm.querySelector("[name=name]").value.trim();
      const email = signupForm.querySelector("[name=email]").value.trim();
      const pass = signupForm.querySelector("[name=password]").value.trim();
      if(!name || !email || !pass){ alert("Fill all fields"); return; }
      const users = JSON.parse(localStorage.getItem("icoder_users") || "[]");
      if(users.find(u => u.email === email)){ alert("User exists, login instead"); return; }
      users.push({name, email, password: pass});
      localStorage.setItem("icoder_users", JSON.stringify(users));
      alert("Signup successful. You can login now.");
      location.href = "login.html";
    });
  }
});
