class Terminal {
    constructor() {
        this.history = [];
        this.historyIndex = -1;
        this.commands = {};
        this.typingSpeed = 20;
        this.asciiArts = [
            // Among Us
            `⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣤⣤⣤⣤⣤⣶⣦⣤⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⣿⡿⠛⠉⠙⠛⠛⠛⠛⠻⢿⣿⣷⣤⡀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⣼⣿⠋⠀⠀⠀⠀⠀⠀⠀⢀⣀⣀⠈⢻⣿⣿⡄⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⣸⣿⡏⠀⠀⠀⣠⣶⣾⣿⣿⣿⠿⠿⠿⢿⣿⣿⣿⣄⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⣿⣿⠁⠀⠀⢰⣿⣿⣯⠁⠀⠀⠀⠀⠀⠀⠀⠈⠙⢿⣷⡄⠀
⠀⠀⣀⣤⣴⣶⣶⣿⡟⠀⠀⠀⢸⣿⣿⣿⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣷⠀
⠀⢰⣿⡟⠋⠉⣹⣿⡇⠀⠀⠀⠘⣿⣿⣿⣿⣷⣦⣤⣤⣤⣶⣶⣶⣶⣿⣿⣿⠀
⠀⢸⣿⡇⠀⠀⣿⣿⡇⠀⠀⠀⠀⠹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠃⠀
⠀⣸⣿⡇⠀⠀⣿⣿⡇⠀⠀⠀⠀⠀⠉⠻⠿⣿⣿⣿⣿⡿⠿⠿⠛⢻⣿⡇⠀⠀
⠀⣿⣿⠁⠀⠀⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣧⠀⠀
⠀⣿⣿⠀⠀⠀⣿⣿⡇��⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⠀⠀
⠀⣿⣿⠀⠀⠀⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⠀⠀
⠀⢿⣿⡆⠀⠀⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⡇⠀⠀
⠀⠸⣿⣧⡀⠀⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⠃⠀⠀
⠀⠀⠛⢿⣿⣿⣿⣿⣇⠀⠀⠀⣰⣿⣿⣷⣶⣶⣶⣶⠶⠀⢠⣿⣿⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⣿⣿⠀⠀⠀⠀⠀⣿⣿⡇⠀⣽⣿⡏⠁⠀⠀⢸⣿⡇⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⣿⣿⠀⠀⠀⠀⠀⣿⣿⡇⠀⢹⣿⡆⠀⠀⠀⣸⣿⠇⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⢿⣿⣦⣄⣀⣠⣴⣿⣿⠁⠀⠈⠻⣿⣿⣿⣿⡿⠏⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠈⠛⠻⠿⠿⠿⠿⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀`,
            // Trollface
            `⠀⠀⠀⠀⠀⠀⠀⢀⡔⠋⢉⠩⡉⠛⠛⠛⠉⣉⣉⠒⠒⡦⣄⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⢀⠎⠀⠀⠠⢃⣉⣀⡀⠂⠀⠀⠄⠀⠀⠀⠀⢱⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⡰⠟⣀⢀⣒⠐⠛⡛⠳⢭⠆⠀⠤⡶⠿⠛⠂⠀⢈⠳⡀⠀⠀⠀⠀
⠀⠀⠀⠀⢸⢈⢘⢠⡶⢬⣉⠉⠀⠀⡤⠄⠀⠀⠣⣄⠐⠚⣍⠁⢘⡇⠀⠀⠀⠀
⠀⠀⠀⠀⠈⢫⡊⠀⠹⡦⢼⣍⠓⢲⠥⢍⣁⣒⣊⣀⡬⢴⢿⠈⡜⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠹⡄⠀⠘⢾⡉⠙⡿⠶⢤⣷⣤⣧⣤⣷⣾⣿⠀⡇⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠘⠦⡠⢀⠍⡒⠧⢄⣀⣁⣀⣏⣽⣹⠽⠊⠀⡇⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠑⠲⠤⠤⣀⣀⣀⣀⣀⠔⠁`
            // Add more ASCII art here
        ];
        
        // Get DOM elements
        this.terminalInput = document.querySelector('.terminal-input');
        this.terminalOutput = document.querySelector('.terminal-output');
        
        if (!this.terminalInput || !this.terminalOutput) {
            console.error('Terminal elements not found!');
            return;
        }

        // Initialize
        this.init();
    }

    async init() {
        await this.loadCommands();
        this.setupEventListeners();
        await this.showWelcome();
    }

    async loadCommands() {
        try {
            const response = await fetch('data/files.json');
            if (!response.ok) throw new Error('Failed to load commands');
            this.commands = await response.json();
            console.log('Commands loaded:', this.commands);
        } catch (error) {
            console.error('Error loading commands:', error);
            this.displayResponse('Error: Failed to load commands');
        }
    }

    setupEventListeners() {
        this.terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                audioManager.playSound('success');
                const command = this.terminalInput.value.trim();
                if (command) {
                    this.displayResponse(`C:\\>${command}`);
                    this.executeCommand(command);
                    this.terminalInput.value = '';
                    this.history.push(command);
                    this.historyIndex = this.history.length;
                }
            } else if (e.key.startsWith('Arrow')) {
                // Play sound for arrow keys
                audioManager.playSound('keypress');
                
                // Handle arrow key navigation
                if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                    e.preventDefault(); // Prevent cursor from moving
                    this.navigateHistory(e.key === 'ArrowUp' ? -1 : 1);
                }
            } else {
                audioManager.playSound('keypress');
            }
        });
    }

    async executeCommand(command) {
        const cmd = command.toUpperCase();
        
        if (cmd === 'LAMAR') {
            this.displayResponse('Playing Lamar sound...');
            await audioManager.playLamar();
            return;
        }
        
        const args = command.split(' ');
        
        switch(cmd) {
            case 'LOGIN':
                this.handleLogin(args[1]);
                break;
            case 'HELP':
                this.showHelp();
                break;
            case 'CLS':
                this.clearScreen();
                break;
            case 'DIR':
                this.showDirectory();
                break;
            case 'ART':
                this.showRandomArt();
                break;
            default:
                if (this.commands[cmd.toUpperCase() + '.TXT'] ||
                    this.commands[cmd.toUpperCase() + '.EXE'] ||
                    this.commands[cmd.toUpperCase() + '.SYS'] ||
                    this.commands[cmd.toUpperCase() + '.DAT']) {
                    this.displayResponse(this.commands[cmd.toUpperCase()].content);
                } else {
                    audioManager.playSound('error');
                    this.displayResponse(`Bad command or file name: ${command}`);
                }
        }
    }

    handleLogin(username) {
        if (!username) {
            this.displayResponse('Usage: LOGIN <username>');
            return;
        }
        localStorage.setItem('username', username);
        this.displayResponse(`Welcome, ${username}! Username set successfully.`);
    }

    displayResponse(text) {
        const responseDiv = document.createElement('pre');
        responseDiv.textContent = text;
        responseDiv.style.whiteSpace = 'pre';
        responseDiv.style.margin = '0';
        responseDiv.style.lineHeight = '1.2';
        this.terminalOutput.appendChild(responseDiv);
        this.terminalOutput.scrollTop = this.terminalOutput.scrollHeight;
    }

    clearScreen() {
        this.terminalOutput.innerHTML = '';
    }

    showHelp() {
        const help = `
Available Commands:
------------------
ABOUT     - View about information
PROJECTS  - View project portfolio
SOCIALS   - View social media links
CONTACT   - Contact information
DIR       - List files
CLS       - Clear screen
ART       - Show random ASCII art
HELP      - Show this help menu
`;
        this.displayResponse(help);
    }

    showDirectory() {
        let output = '\n Volume in drive C is DEBIN_OS\n';
        output += ' Volume Serial Number is 1337-DEAD\n\n';
        output += ' Directory of C:\\\n\n';

        for (const [fileName, fileData] of Object.entries(this.commands)) {
            output += `${fileName.padEnd(12)} ${fileData.size.toString().padStart(8)} ${fileData.date} ${fileData.time}\n`;
        }

        output += `\n     ${Object.keys(this.commands).length} File(s)     ${Object.values(this.commands).reduce((acc, file) => acc + file.size, 0)} bytes\n`;
        output += '     0 Dir(s)      42.0 MB free\n';
        this.displayResponse(output);
    }

    async showWelcome() {
        const welcome = `
DEBIN-OS v1.0.25
(C) 2025 All rights reserved.

Welcome, USER!

Type HELP for commands.
`;
        this.displayResponse(welcome);
    }

    showRandomArt() {
        const randomArt = this.asciiArts[Math.floor(Math.random() * this.asciiArts.length)];
        this.displayResponse('\n' + randomArt + '\n');
    }

    // Add this method to handle command history navigation
    navigateHistory(direction) {
        if (this.history.length === 0) return;

        this.historyIndex += direction;
        
        // Keep index within bounds
        if (this.historyIndex < 0) this.historyIndex = 0;
        if (this.historyIndex >= this.history.length) this.historyIndex = this.history.length - 1;
        
        // Set input value to historical command
        this.terminalInput.value = this.history[this.historyIndex];
        
        // Move cursor to end of input
        setTimeout(() => {
            this.terminalInput.selectionStart = this.terminalInput.value.length;
            this.terminalInput.selectionEnd = this.terminalInput.value.length;
        }, 0);
    }
}

// Initialize terminal when page loads
document.addEventListener('DOMContentLoaded', () => {
    const terminal = new Terminal();
});