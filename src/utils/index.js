import image1 from '../assets/images/human.png';
import image2 from '../assets/images/manhappy.png';
import image4 from '../assets/images/manwithpen.png';

export const tourData = [
    {
      titleText: 'Welcome',
      subtitle: `This apps helps you to write your goals on daily basis, you know writing things will reflect in our behaviour , routine and so, yeah what you are waiting for join this platform now.`,
      imgRelativeURL: image1,
      buttonName: 'Next'
    },
    {
      titleText: 'Distractions',
      subtitle: 'Distraction will not let you down this time, we are going to utilize our time and make complete routine.',
      imgRelativeURL: image2,
      buttonName: 'Next'
    },
    {
      titleText: 'MIT',
      subtitle: 'Most Important Task, Note down all your MIT and feel productive to work toward them whole day and write your progress too.' , 
      imgRelativeURL: image4,
      buttonName: 'Next'
    },

  ];

  export const Screen_Constants = {
    LOGIN_SCENE : 'LOGIN_SCENE',
    SIGNUP_SCENE: 'SIGNUP_SCENE',
  }