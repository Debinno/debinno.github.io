async function getUserInfo() {
    try {
        // Try to get username from system environment
        const hostname = window.location.hostname;
        const userAgent = navigator.userAgent;
        const language = navigator.language;
        const platform = navigator.platform;
        
        // Try to get OS username from userAgent
        let username = '';
        
        if (platform.includes('Win')) {
            // Windows detection
            username = userAgent.match(/Windows NT [0-9.]+; (.+?)[;)]/)?.[1] || '';
        } else if (platform.includes('Mac')) {
            // MacOS detection
            username = userAgent.match(/Macintosh; (.+?) Mac/)?.[1] || '';
        } else if (platform.includes('Linux')) {
            // Linux detection
            username = userAgent.match(/Linux (.+?);/)?.[1] || '';
        }

        // Clean up username or use fallback
        username = username.replace(/[^a-zA-Z0-9]/g, '').trim();
        return username || 'ADMIN';
    } catch {
        return 'ADMIN';
    }
}

async function getSystemInfo() {
    const userAgent = navigator.userAgent;
    const platform = navigator.platform;
    const memory = navigator.deviceMemory || 'Unknown';
    const cores = navigator.hardwareConcurrency || 1;
    const gpu = await getGPUInfo();
    const username = await getUserInfo();

    return {
        username: username,
        cpu: userAgent.includes('Win64') ? 'x86_64' : 'x86',
        cores: cores,
        memory: `${memory}GB`,
        gpu: gpu,
        platform: platform
    };
}

async function getGPUInfo() {
    const gl = document.createElement('canvas').getContext('webgl');
    if (!gl) return 'Standard VGA';
    
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    return debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : 'Standard VGA';
}

async function typeBootMessage() {
    const bootText = document.querySelector('.boot-text');
    const terminal = document.querySelector('.terminal');
    const bootSequence = document.querySelector('.boot-sequence');
    
    const messages = [
        'Initializing system...',
        'Checking memory...',
        'Loading system files...',
        'Starting DEBIN-OS...',
        'Detecting hardware...',
        await getFormattedSystemInfo(),
        '\nPress any key to continue...'
    ];

    for (const message of messages) {
        await new Promise(resolve => setTimeout(resolve, 800));
        bootText.innerHTML += message + '\n';
        bootText.scrollTop = bootText.scrollHeight;
    }

    // Wait for keypress
    await new Promise(resolve => {
        document.addEventListener('keypress', resolve, { once: true });
    });

    // Smooth transition
    bootSequence.classList.add('hidden');
    terminal.classList.remove('hidden');
    
    // Small delay before showing terminal
    await new Promise(resolve => setTimeout(resolve, 750));
    terminal.classList.add('visible');
}

async function getFormattedSystemInfo() {
    const info = await getSystemInfo();
    return `
CPU: ${info.cpu}
Cores: ${info.cores}
Memory: ${info.memory}
GPU: ${info.gpu}
Platform: ${info.platform}
`;
}

async function startBootSequence() {
    const bootSequence = document.querySelector('.boot-sequence');
    const terminal = document.querySelector('.terminal');
    const bootText = document.querySelector('.boot-text');
    
    if (!bootSequence || !terminal || !bootText) {
        console.error('Boot elements not found');
        return;
    }

    // Wait for first user interaction
    await new Promise(resolve => {
        document.addEventListener('click', resolve, { once: true });
        document.addEventListener('keypress', resolve, { once: true });
    });

    // Now we can play the sound
    audioManager.playSound('boot');
    bootSequence.classList.remove('hidden');
    typeBootMessage();
}

document.addEventListener('DOMContentLoaded', startBootSequence);