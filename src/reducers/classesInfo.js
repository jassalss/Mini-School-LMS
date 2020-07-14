import {
  FETCH_CLASS_NAMES,
  FETCH_SUBJECT_NAMES,
  UPLOAD_HOME_WORK,
  RESET_UPLOADER,
  GET_ALL_HOME_WORK,
  FETCH_LASTEST_NEWS,
} from "../actions/types";
const INTIAL_STATE = {
  classNames: [],
  subjectNames: [],
  homeworkUploaded: false,
  homeWorkObj: [],
  latestNews: "",
};

export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_CLASS_NAMES:
      return { ...state, classNames: action.payload };
    case FETCH_SUBJECT_NAMES:
      return { ...state, subjectNames: action.payload };
    case UPLOAD_HOME_WORK:
      return { ...state, homeworkUploaded: action.payload };
    case RESET_UPLOADER:
      return { ...state, homeworkUploaded: action.payload };
    case GET_ALL_HOME_WORK:
      return { ...state, homeWorkObj: action.payload };
    case FETCH_LASTEST_NEWS:
      return { ...state, latestNews: action.payload };
    default:
      return state;
  }
};
