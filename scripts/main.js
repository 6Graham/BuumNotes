document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const settingsButton = document.querySelector('.settings');
    const settingsMenu = document.querySelector('.settings-menu');
    const toggleThemeButton = document.getElementById('toggle-theme');
    const logoutButton = document.getElementById('logout');

    const noteForm = document.getElementById('note-form');
    const noteTitle = document.getElementById('note-title');
    const noteContent = document.getElementById('note-content');
    const noteReminder = document.getElementById('note-reminder');
    const notesContainer = document.getElementById('notes-container');

    const upgradeElement = document.querySelector('.Upgrade');
    let isDragging = false;
    let startX = 0;

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const target = link.getAttribute('data-target');
            sections.forEach(section => {
                section.classList.toggle('active-section', section.classList.contains(target));
            });
        });
    });

    settingsButton.addEventListener('click', () => {
        settingsMenu.classList.toggle('visible');
    });

    toggleThemeButton.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        document.body.classList.toggle('dark-theme');
    });

    logoutButton.addEventListener('click', () => {
        alert('Cerrando sesión...');
    });

    noteForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const title = noteTitle.value;
        const content = noteContent.value;
        const reminder = noteReminder.value;
        
        addNoteToList(title, content, reminder);
        noteForm.reset();
    });

    function addNoteToList(title, content, reminder) {
        const noteItem = document.createElement('li');
        
        const noteTitleElem = document.createElement('div');
        noteTitleElem.classList.add('note-title');
        noteTitleElem.textContent = title;
        
        const noteContentElem = document.createElement('div');
        noteContentElem.classList.add('note-content');
        noteContentElem.textContent = content;
        
        noteItem.appendChild(noteTitleElem);
        noteItem.appendChild(noteContentElem);
        
        if (reminder) {
            const noteReminderElem = document.createElement('div');
            noteReminderElem.classList.add('note-reminder');
            noteReminderElem.textContent = `Recordatorio: ${new Date(reminder).toLocaleDateString()}`;
            noteItem.appendChild(noteReminderElem);
        }
        
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-button');
        deleteButton.textContent = 'Borrar';
        deleteButton.addEventListener('click', () => {
            notesContainer.removeChild(noteItem);
        });
        
        noteItem.appendChild(deleteButton);
        notesContainer.appendChild(noteItem);
    }

    upgradeElement.addEventListener('touchstart', (event) => {
        startX = event.touches[0].clientX;
        isDragging = true;
    });

    upgradeElement.addEventListener('touchmove', (event) => {
        if (!isDragging) return;

        const currentX = event.touches[0].clientX;
        const diffX = currentX - startX;

        if (Math.abs(diffX) > 50) { 
            upgradeElement.classList.add('hidden');
            isDragging = false;

            setTimeout(() => {
                upgradeElement.style.display = 'none';
            }, 300); // Duración de la transición en CSS
        }
    });

    upgradeElement.addEventListener('touchend', () => {
        isDragging = false;
    });

    upgradeElement.addEventListener('touchcancel', () => {
        isDragging = false;
    });
});
