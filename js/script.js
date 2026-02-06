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

  const response = await fetch(
    "https://physio-clinic-backend-eydm.onrender.com/api/appointments/book",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        body: JSON.stringify({
          name: "Rahul Gupta",
          phone: "9320539142",
          problem: "Back Pain",
          date: "2026-02-06",
        }),
      },
      body: JSON.stringify({
        name: document.getElementById("name").value,
        phone: document.getElementById("phone").value,
        problem: document.getElementById("problem").value,
        date: document.getElementById("date").value,
      }),
    },
  );

  const data = await response.json();
  console.log(data);
  alert(data.message || data.error);
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
