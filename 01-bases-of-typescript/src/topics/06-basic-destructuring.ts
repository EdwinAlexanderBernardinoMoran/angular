interface AudioPlayer {
    audioVolume: number;
    songDuration: number;
    song: string;
    details: Details;
}

interface Details {
    author: string;
    year: number;
}

const audioPlayer: AudioPlayer = {
    audioVolume: 90,
    songDuration: 36,
    song: "We dont we go",
    details: {
        author: "Kaleo",
        year: 2016,
    }
}

// Destructuring the Object
const { song, songDuration, details} = audioPlayer; // Destructuring
const { author } = details; // Destructuring

console.log('song: ', song);
console.log('Duration: ', songDuration);
console.log('Author: ', author);


// Destructuring the Arrays
const dbz: string[] = ['Goku', 'Vegeta', 'Trunks'];
const [goku, vegeta, trunks] = dbz; // Destructuring

console.log('Character 1: ', goku);
console.log('Character 2: ', vegeta);
console.log('Character 3: ', trunks);




export {};