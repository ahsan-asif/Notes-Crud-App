import {GET_NOTES, NOTES_STATUS} from "../actionTypes";
import {db, fire} from "../firebase";

export function getNotes() {
  return async (dispatch) => {
    // for loading
    dispatch({
      type: NOTES_STATUS,
      payload: true,
    });
    await db.onSnapshot(async function (snapshot) {
      const changes = snapshot.docChanges();
      changes.forEach(
        async function (change) {
          const data = change.doc.data();
          data.id = change.doc.id;
          console.log(change.type);
          if (change.type === "added" || change.type === "modified") {
            console.log("nono");
            dispatch({
              type: GET_NOTES,
              payload: data,
            });

            // for Loading
            dispatch({
              type: NOTES_STATUS,
              payload: false,
            });
          } else if (change.type === "removed") {
            dispatch({
              type: "DELETE_NOTES",
              payload: change.doc.id,
            });

            // for Loading
            dispatch({
              type: NOTES_STATUS,
              payload: false,
            });
          }
          // for Loading
          dispatch({
            type: NOTES_STATUS,
            payload: false,
          });
        },
        () =>
          dispatch({
            type: NOTES_STATUS,
            payload: -1,
          })
      ); // for unit wait then something goes done
    });
  };
}

export function saveNotes(note) {
  return (dispatch) =>
    db
      .add(note)
      .then(function () {
        console.log("Data is submitted successfully");
      })
      .catch(function (err) {
        console.log(err);
      });
}

export function deleteNotes(id) {
  return (dispatch) => {
    db.doc(id)
      .delete()
      .then(function () {
        console.log("document succesfully deleted");
      })
      .catch(function (error) {
        console.log("document removing Problem", error);
      });
  };
}

export function updateNote(noteId, note) {
  return (dispatch) => db.doc(noteId).update(note);
}

export function saveComment(noteId, comment) {
  return (dispatch) => {
    db.doc(noteId)
      .collection("comments")
      .add(comment)
      .then(function () {
        console.log("Comment Save Successfully");
      })
      .catch(function (err) {
        console.log(err);
      });
  };
}

export function getComments(id) {
  let dataArray=[];
  return (dispatch) => {
    fire
      .collection(`/notes/${id}/comments`)
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          // console.log("in action",doc.data())
          dataArray.push(doc.data());
          //dispatch
          dispatch({
            type: "GET_COMMENT",
            payload: dataArray,
          });
        });
      });
  };
}
