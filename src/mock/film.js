import {MONTH_NAMES} from "../consts";
import {EMOJI_LIST} from "../consts";

const MAX_DESCRIPTION_LENGTH = 140;


const posters = [
  `made-for-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`
].map((poster) => `../images/posters/${poster}`);

const filmNames = [
  `Made for each other`,
  `Popeye meets sinbad`,
  `Sagebrush trail`,
  `Santa claus conquers the martians`,
  `The dance of life`,
  `The great Flamarion`,
  `The man with the golden arm`
];

const genreList = [
  `Horror`,
  `Musical`,
  `Comedy`
];

const directorsList = [
  `Steven Spielberg`,
  `Martin Scorsese`,
  `Alfred Hitchcock`,
  `Stanley Kubrick`,
  `Quentin Tarantino`
];

const writersList = [
  `Anne Wigton`,
  `Heinz Herald`,
  `Richard Weil`
];

const actorsList = [
  `Marlon Brando`,
  `Marcello Mastroianni`,
  `Laurence Olivier`,
  `John Gielgud`,
  `Anatoliy Solonitsyn`
];

const countryList = [
  `USA`,
  `Italy`,
  `Russia`,
  `China`
];

const ratingSystem = [
  `0+`,
  `6+`,
  `12+`,
  `16+`,
  `18+`
];

const createRandomDigit = (max, min = 1) => {
  return min + Math.floor(Math.random() * (max - min));
};

const descriptionList = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus`
];

const commentTextList = [
  `Interesting setting and a good cast`,
  `Booooooooooring`,
  `Very very old. Meh`,
  `Almost two hours? Seriously?`
];

const commentAuthor = [
  `Tim Macoveev`,
  `John Doe`,
  `John D`,
  `Tim Maceev`
];

export const getRandomDate = () => {
  const targetDate = new Date();
  const sign = Math.random() > 0.5 ? 1 : -1;
  const diffValue = sign * createRandomDigit(8, 0);

  targetDate.setDate(targetDate.getDate() - diffValue);

  return targetDate;
};


const emojiList = EMOJI_LIST;


const generateComment = () => {
  return ({
    text: commentTextList[createRandomDigit(4)],
    emoji: emojiList[createRandomDigit(4, 0)],
    author: commentAuthor[createRandomDigit(4)],
    data: getRandomDate()
  });
};

const generateComments = () => {
  return new Array(createRandomDigit(5, 0))
    .fill(``)
    .map(generateComment);
};

const generateYear = () => {
  return createRandomDigit(2020, 1950);
};


export const createFilmMock = () => {
  const year = generateYear();
  const digit = createRandomDigit(filmNames.length);
  return {
    title: filmNames[digit],
    originalTitle: filmNames[digit],
    poster: posters[digit],
    writers: writersList[createRandomDigit(3)],
    director: directorsList[createRandomDigit(5)],
    actors: actorsList.slice(0, createRandomDigit(5)).join(`, `),
    releaseDate: `${createRandomDigit(30)} ${MONTH_NAMES[createRandomDigit(12)]} ${year}`,
    rate: `${createRandomDigit(10)}.${createRandomDigit(10)}`,
    year,
    time: `${createRandomDigit(3)}h ${createRandomDigit(59)}min`,
    country: countryList[createRandomDigit(4)],
    genres: genreList,
    description: descriptionList.slice(0, createRandomDigit(descriptionList.length)).join(` `),
    maxDescriptionLength: MAX_DESCRIPTION_LENGTH, // подумал, что тут самое оптимальное место для обозначения максимального описания
    ratingSystem: ratingSystem[createRandomDigit(5)],
    comments: generateComments(),
    commentEmoji: null,
    isWatchlist: false,
    isWatched: false,
    isFavorite: false,
  };
};

export const generateMock = (count) => {
  return new Array(count)
    .fill(``)
    .map(createFilmMock);
};
