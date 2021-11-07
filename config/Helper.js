import moment from "moment";

const CommentCountWords = (count) => {
  if (count === 0) {
    return "No comments";
  } else if (count === 1) {
    return `View ${count} comment`;
  } else {
    return `View all ${count} comments`;
  }
};

const LikesCountWords = (likes) => {
  if (likes === 0) {
    return "No likes";
  } else if (likes === 1) {
    return `1 like`;
  } else {
    return `${likes} likes`;
  }
};

const SecondsFormat = (SECONDS) => {
  var sec_num = parseInt(Math.round(SECONDS), 10);
  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor(sec_num / 60) % 60;
  var seconds = sec_num % 60;
  return [hours, minutes, seconds]
    .map((v) => (v < 10 ? "0" + v : v))
    .filter((v, i) => v !== "00" || i > 0)
    .join(":");
};

const GenerateUniqueID = () => {
  return Math.floor(Math.random() * Date.now()).toString();
};

const GiveMimeType = (File) => {
  let URL = File.toLowerCase();
  let ImageExts = ["jpg", "png", "jpeg"];
  let VideoExts = ["mp4", "3gp"];
  let AudioExts = ["m4a", "mp3", "wav"];
  let Exts = URL.split(".").pop();
  if (ImageExts.indexOf(Exts) > -1) {
    return `image/${ImageExts[ImageExts.indexOf(Exts)]}`;
  } else if (VideoExts.indexOf(Exts) > -1) {
    return `video/${VideoExts[VideoExts.indexOf(Exts)]}`;
  } else if (AudioExts.indexOf(Exts) > -1) {
    return `audio/${AudioExts[AudioExts.indexOf(Exts)]}`;
  } else {
    return "none";
  }
};

const GiveMimeName = (File) => {
  let URL = File.toLowerCase();
  let ImageExts = ["jpg", "png", "jpeg"];
  let VideoExts = ["mp4", "3gp"];
  let AudioExts = ["m4a", "mp3", "wav"];
  let Exts = URL.split(".").pop();
  if (ImageExts.indexOf(Exts) > -1) {
    return `image`;
  } else if (VideoExts.indexOf(Exts) > -1) {
    return `video`;
  } else if (AudioExts.indexOf(Exts) > -1) {
    return `audio`;
  } else {
    return "none";
  }
};

const GetExtension = (File) => {
  let Exts = File.split(".").pop();
  return Exts;
};

const GiveTimeDifference = (DateTime) => {
  const PostDate = moment(new Date(DateTime));
  const TodayDate = moment().utcOffset(330);

  let differenceSeconds = TodayDate.diff(PostDate, "seconds");

  if (differenceSeconds <= 345600) {
    return PostDate.from(TodayDate);
  } else if (differenceSeconds > 31536000) {
    return PostDate.format("MMMM Do, YYYY");
  } else {
    return PostDate.format("MMMM Do");
  }
};

const abbreviateNumber = (value) => {
  var newValue = value;
  if (value >= 1000) {
    var suffixes = ["", "k", "m", "b", "t"];
    var suffixNum = Math.floor(("" + value).length / 3);
    var shortValue = "";
    for (var precision = 2; precision >= 1; precision--) {
      shortValue = parseFloat(
        (suffixNum != 0
          ? value / Math.pow(1000, suffixNum)
          : value
        ).toPrecision(precision)
      );
      var dotLessShortValue = (shortValue + "").replace(/[^a-zA-Z 0-9]+/g, "");
      if (dotLessShortValue.length <= 2) {
        break;
      }
    }
    if (shortValue % 1 != 0) shortValue = shortValue.toFixed(1);
    newValue = shortValue + suffixes[suffixNum];
  }
  return newValue;
};

const MessageTimeAgo = (Time) => {
  var start = moment(Time);
  var end = moment();
  return end.to(start);
};

const GetTimeFromObject = (DateTime) => {
  const newDate = moment(DateTime);
  return newDate.format("h:mm A");
};

const GiveDateTopData = (dateOne, dateTwo) => {
  const OBJ_ONE = moment(dateOne);
  const OBJ_TWO = moment(dateTwo);

  if (dateTwo === null || dateOne === null) {
    return OBJ_ONE.format("dddd, MMMM Do YYYY, h:mm:ss a");
  }

  let dayOne = OBJ_ONE.dayOfYear();
  let yearOne = OBJ_ONE.year();

  let dayTwo = OBJ_TWO.dayOfYear();
  let yearTwo = OBJ_TWO.year();

  if (dayOne !== dayTwo || yearOne !== yearTwo) {
    return OBJ_ONE.format("dddd, MMMM Do YYYY, h:mm:ss a");
  }

  return null;
};

const GetFileName = (url) => {
  var filename = url.substring(url.lastIndexOf("/") + 1);
  return filename;
};

export default {
  CommentCountWords,
  LikesCountWords,
  SecondsFormat,
  GenerateUniqueID,
  GiveMimeType,
  GiveMimeName,
  GetExtension,
  GiveTimeDifference,
  abbreviateNumber,
  MessageTimeAgo,
  GetTimeFromObject,
  GiveDateTopData,
  GetFileName,
};
