const imageList = [
  {
    imageId:
      "https://i.pinimg.com/originals/55/7a/ee/557aee3ce530f6ae193cdb08a384ad3c.jpg",
  },
  {
    imageId:
      "https://i.pinimg.com/originals/55/7a/ee/557aee3ce530f6ae193cdb08a384ad3c.jpg",
  },
  {
    imageId:
      "https://pm1.narvii.com/7349/f2b5bc33911fc5c0301373f82e2290adfb2dbc7er1-753-774v2_hq.jpg",
  },
  {
    imageId:
      "https://i0.wp.com/numericcitizen.me/wp-content/uploads/2018/11/img_5262.jpg?fit=483%2C530&ssl=1",
  },
  {
    imageId: "https://pbs.twimg.com/media/EFsqx6YXUAELRTu.png",
  },
];

const randomImage =
  imageList[Math.floor(Math.random() * imageList.length)].imageId;

export default randomImage;
