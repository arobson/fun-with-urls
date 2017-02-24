import { combineReducers } from "redux";
import Nav from "./nav";
import page from "./feature/page/reducer";

export default function Reducer( history ) {
  const nav = Nav( history );

  return combineReducers( {
    nav,
    page
  } );
}