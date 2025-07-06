
document.addEventListener("DOMContentLoaded", () => {
  const firstVisit = document.getElementById("firstVisit");
  const waiverSection = document.getElementById("waiver-section");
  const form = document.getElementById("checkin-form");
  const responseMsg = document.getElementById("response-msg");

  firstVisit.addEventListener("change", () => {
    waiverSection.style.display = firstVisit.value === "yes" ? "block" : "none";
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("https://cartpath-checkin-backend.vercel.app/api/checkin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      const result = await res.json();
      responseMsg.textContent = result.message || "Check-in successful.";
      responseMsg.style.color = result.success ? "green" : "red";
    } catch (error) {
      responseMsg.textContent = "Network or server error.";
      responseMsg.style.color = "red";
    }
  });
});
