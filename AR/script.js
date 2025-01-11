// Start the camera
async function startCamera() {
    const video = document.getElementById("camera");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
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
    camera.position.set(0, 1.6, 0); // Simulate eye height for AR experience
  
    // Create multiple cubes with different positions
    const cubes = [];
    for (let i = 0; i < 5; i++) {
      const geometry = new THREE.BoxGeometry();
      const material = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff });
      const cube = new THREE.Mesh(geometry, material);
  
      // Random positions in a virtual space
      cube.position.set(
        Math.random() * 6 - 3, // X between -3 and 3
        1.5, // Fixed height (1.5m above ground)
        Math.random() * -6 - 1 // Z between -1 and -7 (farther away)
      );
  
      scene.add(cube);
      cubes.push(cube);
    }
  
    // Animate the scene
    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
  
      // Check for proximity to each cube
      cubes.forEach((cube, index) => {
        const distance = cube.position.distanceTo(camera.position);
  
        if (distance < 1.5) { // If within 1.5 meters
          showPopup(index);
        }
      });
    }
    animate();
  
    // Device orientation for AR-like movement
    window.addEventListener("deviceorientation", (event) => {
      const gamma = event.gamma || 0; // Left/Right tilt
      const beta = event.beta || 0; // Up/Down tilt
  
      // Adjust camera position based on tilt
      camera.position.x = gamma / 10; // Adjust sensitivity if needed
      camera.position.y = 1.6 - beta / 50; // Maintain relative height
    });
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
  