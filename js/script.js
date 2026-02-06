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

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    name: document.getElementById("name").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    problem: document.getElementById("problem").value.trim(),
    date: document.getElementById("date").value,
  };

  try {
    // Backend API call
    const res = await fetch(
      "https://physio-clinic-backend-eydm.onrender.com/api/appointments/book",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      },
    );

    const result = await res.json();
    msg.innerText = result.message || "Appointment Booked!";
    msg.style.color = "green";
    form.reset();

    // ✅ WhatsApp professional message
    const whatsappLink = `https://wa.me/919320539142?text=${encodeURIComponent(
      `Hello Doctor, I would like to book a physiotherapy appointment. My name is ${data.name}, phone number is ${data.phone}, and problem is: ${data.problem || "Not specified"}. Please let me know the available slots.`,
    )}`;
    window.open(whatsappLink, "_blank");
  } catch (err) {
    msg.innerText = "Server Error. Try Again!";
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
