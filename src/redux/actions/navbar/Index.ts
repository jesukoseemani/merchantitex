import axios from "axios"
export const loadSuggestions = () => {
  return (dispatch:any) => {
    axios.get("/api/search/bookmarks/data").then((response:any) => {
      dispatch({
        type: "MAYBE_UPDATE_SUGGESTIONS",
        suggestions: response?.data?.searchResult
      })
    })
  }
}

export const updateStarred =(object:any) => {
  return (dispatch:any) => {
    axios
      .post("api/update/bookmarks", {
        obj: object
      })
      .then(() => {
        dispatch({
          type: "UPDATE_STARRED",
          object
        })
        dispatch(loadSuggestions())
      })
  }
}
