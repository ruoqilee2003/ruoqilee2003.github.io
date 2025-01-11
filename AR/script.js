// Start the camera with the back camera
async function startCamera() {
  const video = document.getElementById("camera");
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "environment" }, // Use the back camera
    });
    video.srcObject = stream;
  } catch (err) {
    console.error("Error accessing camera:", err);
  }
}

// Initialize WebGL with Three.js
function startWebGL() {
  const canvas = document.getElementById("webgl");
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 1.6, 0); // Starting position: simulate eye height for AR

  // Create 5 cubes around the user in a circle
  const cubes = [];
  const radius = 2; // Radius of the circle
  for (let i = 0; i < 5; i++) {
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff });
    const cube = new THREE.Mesh(geometry, material);

    // Position cubes in a circle around the user
    const angle = (i / 5) * Math.PI * 2; // Equal spacing for 5 cubes
    cube.position.set(
      Math.cos(angle) * radius,
      1.5, // Fixed height
      Math.sin(angle) * radius
    );

    scene.add(cube);
    cubes.push(cube);
  }

  // Device orientation to allow user to look around
  window.addEventListener("deviceorientation", (event) => {
    const gamma = event.gamma || 0; // Left/Right tilt
    const beta = event.beta || 0; // Up/Down tilt

    // Adjust camera position or rotation based on tilt
    camera.rotation.y = THREE.MathUtils.degToRad(gamma); // Horizontal rotation
    camera.rotation.x = THREE.MathUtils.degToRad(beta); // Vertical rotation
  });

  // Check for proximity to each cube
  function checkProximity() {
    cubes.forEach((cube, index) => {
      const distance = cube.position.distanceTo(camera.position);
      if (distance < 2) { // If the cube is within 2 meters
        showPopup(index); // Trigger the popup for this cube
      }
    });
  }

  // Animate the scene
  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    checkProximity(); // Check if any cube is close enough for interaction
  }
  animate();
}

// Show popup when close to a cube
function showPopup(index) {
  const popup = document.getElementById("popup");
  const popupText = document.getElementById("popup-text");

  popupText.innerText = `You found box #${index + 1}!`;
  popup.style.display = "block";

  // Close popup on button click
  document.getElementById("close-popup").onclick = () => {
    popup.style.display = "none";
  };
}

// Start everything
startCamera();
startWebGL();
