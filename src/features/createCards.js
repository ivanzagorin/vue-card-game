import { ref } from 'vue';
import response from '../../response.json';
import { shuffle } from '../helpers';

const cards = ref([]);

const getCards = () => {
  // const cardsResponse = shuffle(response).slice(0, 9);
  const cardsResponse = shuffle(response).slice(0, 1);
  cardsResponse.forEach((item, i) => {
    cards.value.push({
      img: item.img,
      id: i,
      variant: 1,
      visible: false,
      matched: false
    })
    cards.value.push({
      img: item.img,
      id: i,
      variant: 2,
      visible: false,
      matched: false
    })
  });

  cards.value = shuffle(cards.value)
}

export default function createCards() {
  cards.value = [];
  getCards();
  return { cards }
}