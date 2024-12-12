class AudioManager {
    constructor() {
        // Create audio elements with reliable CDN URLs
        this.keypress = new Audio('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3');
        this.error = new Audio('https://assets.mixkit.co/active_storage/sfx/2572/2572-preview.mp3');
        this.success = new Audio('https://assets.mixkit.co/active_storage/sfx/2573/2573-preview.mp3');
        this.boot = new Audio('https://assets.mixkit.co/active_storage/sfx/2574/2574-preview.mp3');
        this.lamar = new Audio();
        this.lamar.src = './lamar.mp3';
        this.lamar.volume = 0.5; // Higher volume for Lamar

        // Debug listener
        this.lamar.addEventListener('error', (e) => {
            console.error('Lamar sound error details:', {
                error: e.target.error,
                src: e.target.src,
                readyState: e.target.readyState,
                networkState: e.target.networkState
            });
        });

        // Set volume for all sounds
        [this.keypress, this.error, this.success, this.boot, this.lamar].forEach(sound => {
            sound.volume = 0.2;
            sound.load();
        });
    }

    playSound(soundName) {
        try {
            const sound = this[soundName];
            if (sound) {
                console.log(`Attempting to play sound: ${soundName}`);
                const clone = sound.cloneNode();
                clone.volume = sound.volume;
                clone.play().catch(e => console.error(`Sound playback failed for ${soundName}:`, e));
            }
        } catch (e) {
            console.error('Sound playback failed:', e);
        }
    }

    async playLamar() {
        try {
            console.log('Attempting to play Lamar sound...');
            console.log('Audio source:', this.lamar.src);
            console.log('Ready state:', this.lamar.readyState);
            
            await this.lamar.play();
            console.log('Lamar sound played successfully!');
        } catch (e) {
            console.error('Failed to play Lamar sound:', e);
        }
    }
}

const audioManager = new AudioManager();