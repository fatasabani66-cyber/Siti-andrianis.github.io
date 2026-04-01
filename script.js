// Fungsi untuk membuat efek salju
function createSnowflakes() {
    const snowflakesContainer = document.getElementById('snowflakes');
    const snowflakeChars = ['❄', '❅', '❆'];

    function createSnowflake() {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        snowflake.textContent = snowflakeChars[Math.floor(Math.random() * snowflakeChars.length)];
        snowflake.style.left = Math.random() * window.innerWidth + 'px';
        snowflake.style.animationDuration = (Math.random() * 3 + 5) + 's';
        snowflake.style.opacity = Math.random() * 0.5 + 0.3;

        snowflakesContainer.appendChild(snowflake);

        setTimeout(() => {
            snowflake.remove();
        }, 8000);
    }

    // Buat salju secara periodik
    setInterval(createSnowflake, 300);
}

// Fungsi untuk menambah pesan
function addMessage() {
    const input = document.getElementById('messageInput');
    const message = input.value.trim();

    if (message === '') {
        alert('Silakan tulis pesan terlebih dahulu 💌');
        return;
    }

    const commentsContainer = document.getElementById('commentsContainer');
    const commentDiv = document.createElement('div');
    commentDiv.classList.add('comment');
    commentDiv.innerHTML = `
        <p><strong>Anda:</strong></p>
        <p>${escapeHtml(message)}</p>
        <small style="color: #999;">Baru saja</small>
    `;

    commentsContainer.insertBefore(commentDiv, commentsContainer.firstChild);
    input.value = '';

    // Simpan ke localStorage
    saveMessages();
}

// Fungsi untuk escape HTML (keamanan)
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// Simpan pesan ke localStorage
function saveMessages() {
    const commentsContainer = document.getElementById('commentsContainer');
    const comments = [];
    commentsContainer.querySelectorAll('.comment').forEach(comment => {
        comments.push(comment.innerHTML);
    });
    localStorage.setItem('birthdayMessages', JSON.stringify(comments));
}

// Load pesan dari localStorage
function loadMessages() {
    const saved = localStorage.getItem('birthdayMessages');
    if (saved) {
        const comments = JSON.parse(saved);
        const commentsContainer = document.getElementById('commentsContainer');
        comments.forEach(commentHtml => {
            const commentDiv = document.createElement('div');
            commentDiv.classList.add('comment');
            commentDiv.innerHTML = commentHtml;
            commentsContainer.appendChild(commentDiv);
        });
    }
}

// Fungsi untuk membuka modal foto
function openModal(emoji, title, description, date) {
    const modal = document.getElementById('photoModal');
    document.getElementById('modalEmoji').textContent = emoji;
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalShortDesc').textContent = description;
    document.getElementById('modalDate').textContent = date;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Fungsi untuk menutup modal foto
function closeModal() {
    const modal = document.getElementById('photoModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Tutup modal saat klik overlay
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('photoModal');
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Tutup modal dengan tombol Escape
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    });
});

// Inisialisasi saat halaman dimuat
window.addEventListener('load', () => {
    createSnowflakes();
    loadMessages();
});

// Membuat confetti sederhana saat page dimuat
function createConfetti() {
    const confettiPieces = 50;
    for (let i = 0; i < confettiPieces; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.width = Math.random() * 10 + 5 + 'px';
        confetti.style.height = Math.random() * 10 + 5 + 'px';
        confetti.style.background = ['#ff69b4', '#ff1493', '#ff69b4', '#ffb6c1'][Math.floor(Math.random() * 4)];
        confetti.style.opacity = Math.random() * 0.7 + 0.3;
        confetti.style.zIndex = '0';
        confetti.style.pointerEvents = 'none';
        confetti.style.animation = `fall ${Math.random() * 3 + 3}s linear infinite`;
        document.body.appendChild(confetti);

        // Hapus confetti setelah animasi selesai
        setTimeout(() => confetti.remove(), (Math.random() * 3 + 3) * 1000);
    }
}

// Jalankan confetti setiap beberapa detik
setInterval(createConfetti, 2000);
