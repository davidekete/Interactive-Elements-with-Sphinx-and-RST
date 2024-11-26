// Track all active dropdown identifiers
let activeDropdownIds = [];
const copyCodeButton = document.getElementById("copy-code");

//add event listener to the copy code button
copyCodeButton?.addEventListener("click", function (e) {
  copyCode(e);
});

/**
 * Toggles visibility of the dropdown options.
 * @param {string} id - Unique identifier for the dropdown to toggle.
 */
function toggleDropdownOptions(id) {
  const dropdownOptionsContainer = document.querySelector(
    `[data-dropdown="${id}"]`
  );
  const dropdownTrigger = document.querySelector(
    `[data-dropdown-label="${id}"]`
  );

  // Check if the dropdown is already active
  const isActive = activeDropdownIds.includes(id);

  // Toggle visibility using a class
  dropdownOptionsContainer.classList.toggle("show-dropdown");

  // Add or remove the dropdown from active array
  if (isActive) {
    // Remove from active if it's currently open
    activeDropdownIds = activeDropdownIds.filter(
      (dropdownId) => dropdownId !== id
    );
  } else {
    // Get the position of the dropdown trigger in the document
    const triggerRect = dropdownTrigger.getBoundingClientRect();

    // Position the dropdown relative to the button
    dropdownOptionsContainer.style.top = `${
      triggerRect.bottom + window.scrollY // 10px for extra padding to the top, adjust as needed..
    }px`;
    dropdownOptionsContainer.style.left = `${
      triggerRect.left + window.scrollX
    }px`;

    // Add to active if it's being opened
    activeDropdownIds.push(id);
  }
}

// Add event listener to update label when an option is clicked
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("dropdown-option")) {
    updateDropdownLabel(e);
  }
});

// Add event listener to close all dropdowns when the snippet container is scrolled
document.querySelector(".options").addEventListener("scroll", () => {
  activeDropdownIds.forEach((id) => {
    const dropdownOptionsContainer = document.querySelector(
      `[data-dropdown="${id}"]`
    );
    if (dropdownOptionsContainer) {
      dropdownOptionsContainer.classList.remove("show-dropdown");
    }
  });
  activeDropdownIds = []; // Clear active dropdown IDs
});

/**
 * Updates the main dropdown label based on the selected option.
 * @param {Event} e - The click event from a dropdown option.
 */
function updateDropdownLabel(e) {
  const dropdownContainer = e.target.closest("[data-dropdown]");
  const dropdownId = dropdownContainer.getAttribute("data-dropdown");

  const dropdownLabel = document.querySelector(
    `[data-dropdown-label="${dropdownId}"]`
  );
  dropdownLabel.innerHTML = e.target.innerText;

  // Hide the dropdown options after selection
  toggleDropdownOptions(dropdownId);
}

/**
 * copies the code to user clipboard
 * @param {Event} e - The click event from a dropdown option.
 */
async function copyCode(e) {
  //get current code block
  const snippetElement = document.getElementsByClassName("options")[0];

  let snippet = snippetElement.innerText;

  console.log(snippet);

  console.log(snippet.split(/\r?\n/));

  //remove all newlines from text
  snippet = snippet.replace(/(\r\n|\n|\r)/gm, "");

  try {
    await navigator.clipboard.writeText(snippet);
    console.log(snippet);
    console.log("content copied to clipboard");
  } catch (error) {
    console.error("Failed to copy: ", error);
  }
}

/**
 * This function should assert code validity based on predefined rules.
 * It is called everytime a code variable is changed
 * @param {Event} e
 */
function assertCodeValidity(e) {}

function mouseDown() {
  const button = document.getElementById("copy-code");
  if (button) {
    button.style.backgroundColor = "#626262";
  }
}

function mouseUp() {
  const button = document.getElementById("copy-code");
  if (button) {
    button.style.backgroundColor = "#4e4e4e";
  }
}
