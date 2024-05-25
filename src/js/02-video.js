import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const getPlayerCurrentTime = function (data) {
  localStorage.setItem('videoplayer-current-time', data.seconds);
};

if (localStorage.getItem('videoplayer-current-time')) {
  player.setCurrentTime(localStorage.getItem('videoplayer-current-time'));
}

player.on('timeupdate', throttle(getPlayerCurrentTime, 1000));
