const form = document.getElementById("appointmentForm");
const msg = document.getElementById("msg");

document.addEventListener("DOMContentLoaded", () => {
  const burger = document.getElementById("burger");
  const navMenu = document.getElementById("navMenu");
  const closeMenu = document.getElementById("closeMenu");

  if (burger && navMenu && closeMenu) {
    burger.addEventListener("click", () => {
      navMenu.classList.add("active");
    });

    closeMenu.addEventListener("click", () => {
      navMenu.classList.remove("active");
    });

    document.addEventListener("click", (e) => {
      if (!navMenu.contains(e.target) && !burger.contains(e.target)) {
        navMenu.classList.remove("active");
      }
    });

    document.querySelectorAll("#navMenu a").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
      });
    });
  }
});

// Get form & inputs
const appointmentForm = document.getElementById("appointmentForm");
const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const problemInput = document.getElementById("problem");
const dateInput = document.getElementById("date");
const whatsappLink = document.getElementById("whatsappLink");

// Backend URL (Render)
const BACKEND_URL =
  "https://physio-clinic-backend-eydm.onrender.com/api/appointments/book";

appointmentForm.addEventListener("submit", async (e) => {
  e.preventDefault(); // Stop default form submission

  const formData = {
    name: nameInput.value.trim(),
    phone: phoneInput.value.trim(),
    problem: problemInput.value.trim(),
    date: dateInput.value,
  };

  // 1️⃣ Save to backend (MongoDB via Render)
  try {
    const response = await fetch(BACKEND_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      msg.innerText = "✅ Appointment booked successfully!";
      msg.style.color = "green";

      // 2️⃣ Prepare WhatsApp message
      const text = encodeURIComponent(
        `Hello Doctor, my name is ${formData.name}. I want to book a physiotherapy appointment for ${formData.problem || "general consultation"} on ${formData.date}. Please let me know available slots.`,
      );

      whatsappLink.href = `https://wa.me/919320539142?text=${text}`;
      whatsappLink.style.display = "inline-block";

      // Optionally: reset form
      appointmentForm.reset();
    } else {
      msg.innerText = "❌ Failed to book appointment. Try again!";
      msg.style.color = "red";
    }
  } catch (error) {
    console.error("Error booking appointment:", error);
    msg.innerText = "❌ Something went wrong. Try again!";
    msg.style.color = "red";
  }
});

// STATS COUNTER
const counters = document.querySelectorAll(".stat-box h2");

counters.forEach((counter) => {
  const target = +counter.innerText.replace(/\D/g, "");
  let count = 0;

  const update = () => {
    if (count < target) {
      count += Math.ceil(target / 80);
      counter.innerText = count + "+";
      setTimeout(update, 30);
    } else {
      counter.innerText = target + "+";
    }
  };

  update();
});
