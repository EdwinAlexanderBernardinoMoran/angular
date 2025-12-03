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

const { song, songDuration, details} = audioPlayer; // Destructuring
const { author } = details; // Destructuring

console.log('song: ', song);
console.log('Duration: ', songDuration);
console.log('Author: ', author);

export {};