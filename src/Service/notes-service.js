import axios from "axios";

let baseUrl = "https://notes-app-redux-toolkit-default-rtdb.firebaseio.com";

// Create Notees On The Server
export async function createNotesOnServer(data) {
  let url = `${baseUrl}/notes.json`;
  try {
    let response = await axios.post(url, data);
    return response.data.name;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function readNoteByIdFromServer(id) {
  let url = `${baseUrl}/notes/${id}.json`;
  try {
    let response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function readNotesFromServer() {
  //get request
  let url = `${baseUrl}/notes.json`;
  try {
    let response = await axios.get(url);
    let data = [];
    for (const key in response.data) {
      data.push({ ...response.data[key], id: key });
    }
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function deleteNotesFromServer(id) {
  let url = `${baseUrl}/notes/${id}.json`;
  try {
    await axios.delete(url);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function updateNoteOnServer(data) {
  let url = `${baseUrl}/notes/${data.id}.json`;

  try {
    await axios.put(url, data);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
