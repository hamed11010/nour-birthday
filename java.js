// Barcelona Birthday Celebration JS
document.addEventListener('DOMContentLoaded', function() {
    // ===== ORIGINAL FUNCTIONALITY =====
    const logo = document.getElementById('barcaLogo');
    const logoContainer = document.querySelector('.logo-container');
    const hiddenMessage = document.getElementById('hiddenMessage');
    const clickText = document.querySelector('.click-text');
    
    // Original logo click event
    logo.addEventListener('click', function() {
        // Logo animation
        logo.classList.add('logo-spin');
        
        // Container flash effect
        logoContainer.classList.add('color-flash');
        
        // Show hidden message
        hiddenMessage.classList.add('show');
        
        // Hide the "Click the logo!" text
        clickText.style.display = 'none';
        
        // Create confetti
        createConfetti();
        
        // Play celebration sound
        playCelebrationSound();
        
        // Remove animations after completion
        setTimeout(() => {
            logo.classList.remove('logo-spin');
            logoContainer.classList.remove('color-flash');
        }, 1000);
    });

    // ===== NEW PLAYER WISHES INTERACTION =====
    const playerCards = document.querySelectorAll('.player-card');
    
    playerCards.forEach(card => {
        card.addEventListener('click', function() {
            // Add pulse animation
            this.classList.add('player-pulse');
            
            // Play short cheer sound
            playShortCheer();
            
            // Remove animation after completion
            setTimeout(() => {
                this.classList.remove('player-pulse');
            }, 1000);
        });
    });

    // ===== MESSI TRIBUTE INTERACTION =====
    const voiceBtn = document.querySelector('.voice-message');
    
    voiceBtn.addEventListener('click', function() {
        // Change button text
        this.innerHTML = '🔊 Playing...';
        
        // Play Messi tribute audio
        playMessiTribute();
        
        // Add visual effect
        document.querySelector('.messi-img').classList.add('messi-nod');
        
        // Reset after completion
        setTimeout(() => {
            this.innerHTML = '🎙️ Play Voice Message';
            document.querySelector('.messi-img').classList.remove('messi-nod');
        }, 5000);
    });

    // ===== TROPHY INTERACTION =====
    const trophies = document.querySelectorAll('.trophy');
    
    trophies.forEach(trophy => {
        trophy.addEventListener('click', function() {
            // Add unwrap animation
            this.classList.add('unwrapped');
            
            // Create trophy-specific confetti
            createTrophyConfetti(this);
            
            // Play trophy sound
            playTrophySound();
            
            // Show special message
            const message = this.querySelector('.trophy-message');
            message.style.opacity = '1';
            message.style.transform = 'translateY(0)';
        });
    });

    // ===== HELPER FUNCTIONS =====
    
    // Original confetti function
    function createConfetti() {
        const colors = ['#004D98', '#A50044', '#FEFEFE', '#FEBE10'];
        const confettiCount = 200;
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.width = Math.random() * 12 + 5 + 'px';
            confetti.style.height = confetti.style.width;
            confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }
    }
    
    // Trophy-specific confetti
    function createTrophyConfetti(trophy) {
        const rect = trophy.getBoundingClientRect();
        const colors = ['#004D98', '#A50044'];
        
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'mini-confetti';
            confetti.style.left = rect.left + rect.width/2 + 'px';
            confetti.style.top = rect.top + 'px';
            confetti.style.backgroundColor = colors[i % 2];
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }
    }
    
    // Audio functions
    function playCelebrationSound() {
        // Original celebration melody
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            const audioContext = new AudioContext();
            const notes = [
                { freq: 523.25, duration: 0.2 }, 
                { freq: 587.33, duration: 0.2 },
                { freq: 659.25, duration: 0.2 },
                { freq: 698.46, duration: 0.4 },
                { freq: 783.99, duration: 0.4 },
                { freq: 880.00, duration: 0.6 }
            ];
            
            let time = audioContext.currentTime;
            notes.forEach((note, i) => {
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                oscillator.type = 'sine';
                oscillator.frequency.value = note.freq;
                time += i * 0.05;
                gainNode.gain.setValueAtTime(0.3, time);
                gainNode.gain.exponentialRampToValueAtTime(0.01, time + note.duration);
                oscillator.start(time);
                oscillator.stop(time + note.duration);
            });
        } catch (e) {
            console.log('Audio error:', e);
        }
    }
    
    function playShortCheer() {
        const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-achievement-bell-600.mp3');
        audio.volume = 0.3;
        audio.play().catch(e => console.log('Audio play failed:', e));
    }
    
 // Replace the playMessiTribute() function in script.js with:
// In script.js - Updated Messi Tribute function
function playMessiTribute() {
    const btn = document.querySelector('.voice-message');
    
    // Visual feedback
    btn.innerHTML = '🔊 Playing...';
    btn.disabled = true;
    
    // Option A - Crowd cheering (recommended)
    const audio = new Audio("C:\Users\ahmed\Downloads\preview.mp3");
    audio.volume = 0.7;
    
    audio.play()
        .then(() => {
            setTimeout(() => {
                btn.innerHTML = '🎙️ Play Again';
                btn.disabled = false;
            }, 3000);
        })
        .catch(e => {
            console.log("Audio blocked until user interaction");
            btn.innerHTML = '▶️ Click to Play';
            btn.onclick = () => audio.play(); // Fallback
        });
}
    function playTrophySound() {
        const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-winning-chimes-2015.mp3');
        audio.volume = 0.4;
        audio.play().catch(e => console.log('Audio play failed:', e));
    }
    
    // Inject dynamic styles if needed
    if (!document.querySelector('style[data-dynamic]')) {
        const style = document.createElement('style');
        style.setAttribute('data-dynamic', 'true');
        style.textContent = `
            .player-pulse {
                animation: pulse 0.5s ease;
                transform-origin: center;
            }
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
            }
            .messi-nod {
                animation: nod 1s ease-in-out;
            }
            @keyframes nod {
                0%, 100% { transform: translateY(0) rotate(0); }
                50% { transform: translateY(-10px) rotate(-5deg); }
            }
            .unwrapped {
                animation: unwrap 0.5s ease forwards;
            }
            @keyframes unwrap {
                to { transform: translateY(-10px); }
            }
            .mini-confetti {
                position: fixed;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                animation: mini-fall 2s linear forwards;
                z-index: 1000;
            }
            @keyframes mini-fall {
                to {
                    transform: translateY(100px) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
});