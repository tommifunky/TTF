// script.js
document.addEventListener("DOMContentLoaded", () => {
  const landingPage = document.getElementById("landing");
  const entraBtn = document.getElementById("entra-btn");
  const righelloCorner = document.querySelector(".righello-corner");
  const crosshairH = document.getElementById("crosshair-horizontal");
  const crosshairV = document.getElementById("crosshair-vertical");
  const coordBox = document.getElementById("mouse-coords");
  const normalBtn = document.getElementById("normal-btn");
  const crosshairBtn = document.getElementById("crosshair-btn");
  const dragBtn = document.getElementById("drag-btn");
  const menu = document.getElementById("menu");
  const menuTitle = document.getElementById("menu-title");

  righelloCorner.style.display = 'none';

  entraBtn.addEventListener("click", () => {
      landingPage.classList.add('shrink-landing');
      setTimeout(() => {
          righelloCorner.style.display = 'block';
      }, 1000);
  });

  righelloCorner.addEventListener("click", () => {
      landingPage.classList.remove('shrink-landing');
      righelloCorner.style.display = 'none';
  });

  document.addEventListener("mousemove", (e) => {
      const offset = 20;
      const x = Math.round(e.pageX - offset);
      const y = Math.round(e.pageY - offset);
      crosshairH.style.top = e.clientY + "px";
      crosshairV.style.left = e.clientX + "px";
      coordBox.textContent = `x: ${x}, y: ${y}`;
  });

  function generaRighelli() {
      const righelloTop = document.getElementById("righello-top");
      const righelloLeft = document.getElementById("righello-left");
      righelloTop.innerHTML = '';
      righelloLeft.innerHTML = '';

      const pageWidth = Math.max(document.body.scrollWidth, document.documentElement.scrollWidth);
      const taccheOrizz = Math.ceil((pageWidth + 30) / 10);
      righelloTop.style.width = pageWidth + "px";

      for (let i = 0; i <= taccheOrizz * 10; i += 10) {
          const div = document.createElement("div");
          div.className = "tacca";

          if (i === 0) {
              div.classList.add("grande", "zero");
              div.setAttribute("data-num", i);
          } else if (i % 100 === 0) {
              div.classList.add("grande");
              div.setAttribute("data-num", i);
          } else if (i % 50 === 0) {
              div.classList.add("media");
          }
          righelloTop.appendChild(div);
      }

      const pageHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
      const taccheVert = Math.ceil(pageHeight / 10);

      for (let i = 0; i <= taccheVert * 10; i += 10) {
          const div = document.createElement("div");
          div.className = "tacca-vert";

          if (i === 0 || i % 100 === 0) {
              div.classList.add("grande");
              const label = document.createElement("div");
              label.className = "label-vert";
              label.innerHTML = i.toString().split("").join("<br>");
              div.appendChild(label);
          } else if (i % 50 === 0) {
              div.classList.add("media");
          }
          righelloLeft.appendChild(div);
      }
  }

  generaRighelli();
  window.addEventListener("resize", generaRighelli);
  
  window.addEventListener("scroll", () => {
      const righelloLeft = document.getElementById("righello-left");
      const righelloTop = document.getElementById("righello-top");
      righelloLeft.style.top = 20 - window.scrollY + "px";
      righelloTop.style.left = 20 - window.scrollX + "px";  
  });

  setCursorNormal();

  normalBtn.addEventListener("click", setCursorNormal);
  crosshairBtn.addEventListener("click", setCursorCrosshair);
  dragBtn.addEventListener("click", setCursorDrag);

  function setCursorNormal() {
      removeSelected();
      normalBtn.classList.add("selected");
      document.body.style.cursor = "default";
      crosshairH.style.display = "none";
      crosshairV.style.display = "none";
      removeDragEvents();
      enableScroll();
  }

  function setCursorCrosshair() {
      removeSelected();
      crosshairBtn.classList.add("selected");
      document.body.style.cursor = "default";
      crosshairH.style.display = "block";
      crosshairV.style.display = "block";
      removeDragEvents();
      enableScroll();
  }

  function setCursorDrag() {
      removeSelected();
      dragBtn.classList.add("selected");
      document.body.style.cursor = "move";
      crosshairH.style.display = "none";
      crosshairV.style.display = "none";
      addDragEvents();
      disableScroll();
  }

  function removeSelected() {
      normalBtn.classList.remove("selected");
      crosshairBtn.classList.remove("selected");
      dragBtn.classList.remove("selected");
  }

  function addDragEvents() {
      window.addEventListener('mousedown', startDrag);
      window.addEventListener('mousemove', duringDrag);
      window.addEventListener('mouseup', stopDrag);
  }

  function removeDragEvents() {
      window.removeEventListener('mousedown', startDrag);
      window.removeEventListener('mousemove', duringDrag);
      window.removeEventListener('mouseup', stopDrag);
  }

  function startDrag(e) {
      isDragging = true;
      startX = e.pageX;
      startY = e.pageY;
      scrollLeft = window.scrollX;
      scrollTop = window.scrollY;
  }

  function duringDrag(e) {
      if (!isDragging) return;
      const x = e.pageX - startX;
      const y = e.pageY - startY;
      window.scrollTo(scrollLeft - x, scrollTop - y);
  }

  function stopDrag() {
      isDragging = false;
  }

  function disableScroll() {
      window.addEventListener('wheel', preventScroll, { passive: false });
  }

  function enableScroll() {
      window.removeEventListener('wheel', preventScroll, { passive: false });
  }

  function preventScroll(e) {
      e.preventDefault();
  }

  menuTitle.addEventListener("click", () => {
      document.querySelectorAll('.menu-content a').forEach(link => {
          link.addEventListener('click', (e) => {
              e.preventDefault();
              const targetId = link.getAttribute('href').substring(1);
              const targetElement = document.getElementById(targetId);

              if (targetElement) {
                  window.scrollTo({
                      top: targetElement.offsetTop - 30,
                      left: targetElement.offsetLeft - 81,
                      behavior: 'smooth'
                  });
              }
          });
      });
      menu.classList.toggle("open");
  });












  // Add this after your existing declarations at the top
const featurePositions = {
    'compatibility': { x: 500, y: 200 },
    'performance': { x: 800, y: 400 },
    'accessibility': { x: 300, y: 600 }
    // Add more positions for other features
};






window.handleFeatureClick = function(element) {
    const featureId = element.dataset.feature;
    
    // If clicking an already active box, deactivate it
    if (element.classList.contains('active')) {
        element.classList.remove('active');
        if (currentBox) {
            currentBox.remove();
            currentBox = null;
        }
        return;
    }

    // Remove active class and close any open box
    document.querySelectorAll('.feature-box').forEach(box => {
        box.classList.remove('active');
    });
    if (currentBox) {
        currentBox.remove();
    }

    // Add active class to clicked box
    element.classList.add('active');

    // Create new feature box
    if (featureContent[featureId]) {
        createFeatureBox(featureContent[featureId].title, featureContent[featureId].content);
    }
}








});