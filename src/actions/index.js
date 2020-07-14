import {
  FETCH_CLASS_NAMES,
  FETCH_SUBJECT_NAMES,
  UPLOAD_HOME_WORK,
  RESET_UPLOADER,
  GET_ALL_HOME_WORK,
  FETCH_LASTEST_NEWS,
} from "./types";

import { realTimeDB, myStorage } from "../firebaseConfig/firebase";
export const fetchClassNames = () => async (dispatch) => {
  const eventref = realTimeDB.ref("ClassInfo/ClassNames");
  const snapshot = await eventref.once("value");
  dispatch({
    type: FETCH_CLASS_NAMES,
    payload: snapshot.val(),
  });
};
export const fetchLatestNews = () => async (dispatch) => {
  const eventref = realTimeDB.ref("latestNews");
  const snapshot = await eventref.once("value");
  dispatch({
    type: FETCH_LASTEST_NEWS,
    payload: snapshot.val(),
  });
};
export const fetchSubjectNames = () => async (dispatch) => {
  const eventref = realTimeDB.ref("ClassInfo/Subjects");
  const snapshot = await eventref.once("value");
  dispatch({
    type: FETCH_SUBJECT_NAMES,
    payload: snapshot.val(),
  });
};
export const uploadHomeWork = (homeWorkObj) => async (dispatch) => {
  let className = homeWorkObj.className;
  let homeWorkName = homeWorkObj.homeWorkName;
  let subjectName = homeWorkObj.subjectName;
  let fileToUpload = homeWorkObj.fileToUpload;
  var downloadURL = false;
  try {
    const uploadTask = await myStorage
      .ref(`homeworks/${className}/${subjectName}/{${homeWorkName}}`)
      .put(fileToUpload);
    downloadURL = await uploadTask.ref.getDownloadURL();
  } catch (error) {
    console.log("ERR ===", error);
    alert("HomeWork uploading failed!");
  }
  dispatch({
    type: UPLOAD_HOME_WORK,
    payload: downloadURL,
  });
};
export const resetUploader = (text) => {
  return {
    type: RESET_UPLOADER,
    payload: false,
  };
};
export const getListOfHomeWork = (className, subjectName) => async (
  dispatch
) => {
  var homeWorkUrls = await myStorage
    .ref(`homeworks/${className}/${subjectName}`)
    .listAll();
  homeWorkUrls = Promise.all(
    homeWorkUrls.items.map(async (curr) => {
      var name = curr.location.path_;
      name = await name.substring(
        name.lastIndexOf("{") + 1,
        name.lastIndexOf("}")
      );
      var dateTimeArray = name.split("-");
      var url = await curr.getDownloadURL();
      return {
        name: dateTimeArray[0],
        dateposted: dateTimeArray[1],
        timePosted: dateTimeArray[2],
        url: url,
      };
    })
  );
  dispatch({
    type: GET_ALL_HOME_WORK,
    payload: await homeWorkUrls,
  });
};
