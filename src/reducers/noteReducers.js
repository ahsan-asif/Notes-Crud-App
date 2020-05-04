import {GET_NOTES} from "../actionTypes";

export default function (state = {data: [],comments:[]}, action) {
  switch (action.type) {
    case GET_NOTES:
      return {
        data: [...state.data, action.payload],
        
      };
      case "DELETE_NOTES":
        return{
         data: state.data.filter(key=>key.id !== action.payload)
        };
        case "GET_COMMENT":
          return {
            ...state, 
            comments:action.payload
          }
          
    default:
      return state;
  }
}
