document.addEventListener("DOMContentLoaded", () => {
  // Burger Menu
  const burger = document.getElementById("burger");
  const navMenu = document.getElementById("navMenu");
  const closeMenu = document.getElementById("closeMenu");

  if (burger && navMenu && closeMenu) {
    burger.addEventListener("click", () => navMenu.classList.add("active"));
    closeMenu.addEventListener("click", () =>
      navMenu.classList.remove("active"),
    );

    document.addEventListener("click", (e) => {
      if (!navMenu.contains(e.target) && !burger.contains(e.target)) {
        navMenu.classList.remove("active");
      }
    });

    document.querySelectorAll("#navMenu a").forEach((link) => {
      link.addEventListener("click", () => navMenu.classList.remove("active"));
    });
  }

  // Appointment Form
  const form = document.getElementById("appointmentForm");
  const msg = document.getElementById("msg");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const data = {
        name: form.name.value,
        phone: form.phone.value,
        problem: form.problem.value,
        date: form.date.value,
      };

      try {
        const res = await fetch(
          "https://physio-clinic-backend-eydm.onrender.com/api/appointments/book",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          },
        );

        const result = await res.json();
        if (res.ok) {
          msg.innerText = result.message;
          form.reset();
        } else {
          msg.innerText = result.error || "Failed to book appointment";
        }
      } catch (err) {
        console.error(err);
        msg.innerText = "Server error. Try again later.";
      }
    });
  }

  // Stats Counter
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
});
