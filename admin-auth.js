(() => {
  const SESSION_KEY = "jedjcAdminGateAuthenticated";
  const EXPECTED_SHA256 = "3ba2352ff9d149af8d8c6ae1bb839f99f684b8f6da6a3c7d55ebd51d4437d8da";

  async function sha256(value) {
    const bytes = new TextEncoder().encode(value);
    const digest = await crypto.subtle.digest("SHA-256", bytes);
    return Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, "0")).join("");
  }

  function revealProtectedPage(gate) {
    sessionStorage.setItem(SESSION_KEY, "1");
    document.body.classList.remove("auth-pending");
    if (gate) gate.hidden = true;
  }

  function signOut() {
    sessionStorage.removeItem(SESSION_KEY);
    window.location.reload();
  }

  document.addEventListener("DOMContentLoaded", () => {
    const gate = document.getElementById("admin-auth-gate");
    const form = document.getElementById("admin-auth-form");
    const error = document.getElementById("admin-auth-error");

    document.querySelectorAll("[data-admin-logout]").forEach(button => {
      button.addEventListener("click", signOut);
    });

    if (sessionStorage.getItem(SESSION_KEY) === "1") {
      revealProtectedPage(gate);
      return;
    }

    if (!gate || !form) {
      console.error("Admin login gate is not configured correctly.");
      return;
    }

    gate.hidden = false;
    const usernameInput = document.getElementById("admin-username");
    usernameInput?.focus();

    form.addEventListener("submit", async event => {
      event.preventDefault();
      error.textContent = "";
      const submit = form.querySelector("button[type='submit']");
      submit.disabled = true;
      submit.textContent = "Checking…";

      try {
        const username = document.getElementById("admin-username").value.trim();
        const password = document.getElementById("admin-password").value;
        const candidate = await sha256(`${username}:${password}`);

        if (candidate === EXPECTED_SHA256) {
          revealProtectedPage(gate);
          form.reset();
        } else {
          error.textContent = "Invalid username or password.";
        }
      } catch (authError) {
        console.error(authError);
        error.textContent = "Login could not be checked in this browser.";
      } finally {
        submit.disabled = false;
        submit.textContent = "Sign in";
      }
    });
  });
})();