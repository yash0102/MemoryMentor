const readline = require('readline');

class MemoryMentor {
    constructor() {
        this.score = 0;
        this.options = ['apple', 'banana', 'cherry', 'date', 'grape', 'kiwi', 'mango'];
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    async memoryGame() {
        const sequence = [];
        for (let i = 0; i < 3; i++) {
            const index = Math.floor(Math.random() * this.options.length);
            sequence.push(this.options[index]);
        }

        console.log('Memorize the sequence:');
        console.log(sequence.join(', '));
        await this.askAndWait('Press Enter to continue...');

        console.log('\nNow recall the sequence (comma-separated):');
        const userInput = await this.askAndWait('');
        const userSequence = userInput.split(', ').map(item => item.toLowerCase());

        if (JSON.stringify(sequence) === JSON.stringify(userSequence)) {
            this.score++;
            console.log('Congratulations! You remembered the sequence.');
        } else {
            console.log(`Oops! The sequence was: ${sequence.join(', ')}`);
        }

        this.start();
    }

    async askAndWait(question) {
        return new Promise(resolve => {
            this.rl.question(question, resolve);
        });
    }

    start() {
        console.log('Welcome to MemoryMentor!\n');

        this.askAndWait('1. Play Memory Game\n2. View Score\n3. Exit\nSelect an option: ')
            .then(choice => {
                switch (choice) {
                    case '1':
                        return this.memoryGame();
                    case '2':
                        console.log(`Your current score: ${this.score}`);
                        break;
                    case '3':
                        console.log('Exiting MemoryMentor...');
                        this.rl.close();
                        process.exit(0);
                        break;
                    default:
                        console.log('Invalid choice. Please select again.');
                }
                this.start();
            });
    }
}

const mentor = new MemoryMentor();
mentor.start();
