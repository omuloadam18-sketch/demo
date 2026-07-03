/* =========================================================
   CONTACT.JS — validates and submits the inquiry form
   Depends on api/contact-api.js being loaded first (submitInquiry()).
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#inquiry-form");
  if (!form) return;

  const statusBox = document.querySelector("#form-status");
  const submitBtn = form.querySelector("button[type='submit']");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    clearErrors(form);

    const values = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      phone: form.phone.value.trim(),
      grade: form.grade.value,
      message: form.message.value.trim(),
    };

    const errors = validate(values);
    if (Object.keys(errors).length) {
      showErrors(form, errors);
      return;
    }

    setLoading(true);
    const result = await window.submitInquiry(values);
    setLoading(false);

    if (result.ok) {
      showStatus(
        result.demo
          ? "Thanks! Your message looks great. (Demo mode: connect the Google Apps Script endpoint in api/contact-api.js to actually deliver it.)"
          : "Thank you! Your inquiry has been sent. We'll get back to you shortly.",
        "success"
      );
      form.reset();
    } else {
      showStatus("Something went wrong sending your message. Please call us directly at +254 726 381 944.", "error");
    }
  });

  function validate(values) {
    const errors = {};
    if (!values.name || values.name.length < 2) errors.name = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = "Please enter a valid email address.";
    if (!/^[0-9+\s-]{7,15}$/.test(values.phone)) errors.phone = "Please enter a valid phone number.";
    if (!values.grade) errors.grade = "Please select a grade level.";
    if (!values.message || values.message.length < 10) errors.message = "Please tell us a bit more (at least 10 characters).";
    return errors;
  }

  function showErrors(form, errors) {
    Object.entries(errors).forEach(([field, msg]) => {
      const wrap = form.querySelector(`[data-field-wrap="${field}"]`);
      if (!wrap) return;
      wrap.classList.add("has-error");
      const err = wrap.querySelector(".err");
      if (err) err.textContent = msg;
    });
    const firstBad = Object.keys(errors)[0];
    form.querySelector(`[name="${firstBad}"]`)?.focus();
  }

  function clearErrors(form) {
    form.querySelectorAll(".field").forEach((f) => f.classList.remove("has-error"));
  }

  function setLoading(isLoading) {
    if (!submitBtn) return;
    submitBtn.disabled = isLoading;
    submitBtn.textContent = isLoading ? "Sending…" : "Send Inquiry";
  }

  function showStatus(message, type) {
    if (!statusBox) return;
    statusBox.textContent = message;
    statusBox.className = `form-status show ${type}`;
  }
});
