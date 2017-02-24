import React from "react";
import { shallow } from "enzyme";
import Address from "./component";

it("renders pending address while processing", () => {
  const result = shallow(<Address url="test" status="processing" />);
  const expected = (<i className="fa fa-question-circle">&nbsp;</i>);
  expect(result.contains(expected)).toEqual(true);
});

it("renders successful address on success", () => {
  const result = shallow(<Address url="test" status="success" />);
  const expected = (<i className="fa fa-thumbs-up">&nbsp;</i>);
  expect(result.contains(expected)).toEqual(true);
});

it("renders failed address on failure", () => {
  const result = shallow(<Address url="test" status="failed" />);
  const expected = (<i className="fa fa-thumbs-down">&nbsp;</i>);
  expect(result.contains(expected)).toEqual(true);
});

it("renders invalid address on mal-formed addresses", () => {
  const result = shallow(<Address url="test" status="invalid" />);
  const expected = (<i className="fa fa-exclamation-triangle">&nbsp;</i>);
  expect(result.contains(expected)).toEqual(true);
});