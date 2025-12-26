
async function loadProjects() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        renderProjects(data.projects);
    } catch (error) {
        console.error('Error al cargar proyectos:', error);
        showErrorMessage();
    }
}

function renderProjects(projects) {
    const container = document.getElementById('projects-container');
    
    if (!projects || projects.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">No hay proyectos disponibles.</p>';
        return;
    }

    projects.forEach((project, index) => {
        const projectCard = createProjectCard(project, index);
        container.appendChild(projectCard);
    });
}

// Crear tarjeta de proyecto
function createProjectCard(project, index) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.style.animationDelay = `${index * 0.1}s`;

    const title = document.createElement('h3');
    title.textContent = project.name;

    const description = document.createElement('p');
    description.textContent = project.description;

    const techContainer = document.createElement('div');
    techContainer.className = 'project-tech';

    project.technologies.forEach(tech => {
        const techTag = document.createElement('span');
        techTag.className = 'tech-tag';
        techTag.textContent = tech;
        techContainer.appendChild(techTag);
    });

    const link = document.createElement('a');
    link.href = project.github;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.className = 'project-link';
    link.innerHTML = 'Ver en GitHub →';

    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(techContainer);
    card.appendChild(link);

    return card;
}


function showErrorMessage() {
    const container = document.getElementById('projects-container');
    container.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">Error al cargar proyectos. Por favor, recarga la página.</p>';
}


function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    if (window.scrollY > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.boxShadow = 'none';
    }
}


function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);


    const animatedElements = document.querySelectorAll('.tech-card, .project-card, .about-content p');
    animatedElements.forEach(el => observer.observe(el));
}


function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}


window.addEventListener('scroll', handleNavbarScroll);


document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
    setupScrollAnimations();
    setupSmoothScroll();
});