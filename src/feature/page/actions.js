import callApi from "./api";

export function processAddress( dispatch, address ) {
  return function send( dispatch ) {
    dispatch( processingStarted( address ) );
    callApi( address,
      ( addressList ) => {
        dispatch( addressListParsed( addressList ) );
      },
      ( addressStatus ) => {
        dispatch( addressStatusReceived( addressStatus ) );
      },
      ( processComplete ) => {
        dispatch( pageProcessingCompleted( address ) )
      } );
  };
}

export function changeAddress( address ) {
  return { type: "addressChanged", address: address };
}

function processingStarted( address ) {
  return { type: "pageProcessStarted", page: address };
}

function addressListParsed( addressList ) {
  return { type: "addressListReceived", list: addressList };
}

function addressStatusReceived( addressStatus ) {
  return { type: "addressStatusUpdated", update: addressStatus };
}

function pageProcessingCompleted( address ) {
  return { type: "pageProcessCompleted", page: address };
}