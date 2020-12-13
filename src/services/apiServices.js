
import apiCalls from '../constants/apiEndpoints';
import { httpHandler, httpXcsrfHandler } from './httpHandlers';

export const API_ENDPOINT = 'https://bami-lights-staging.herokuapp.com';


export function fetchOperation(
  handler,
  apiPath,
  config = {},
  apiRoute,
  domain = API_ENDPOINT,
) {
  
  return new Promise((resolve, reject) => {
    handler
      .get(domain + apiPath, config)
      .then((res) => {
        const data = typeof res.data.data !== 'undefined' ? res.data.data : res.data;
        resolve(data);
      })
      .catch((error) => {
        console.log(error)
        reject(error);
      });
  });
}

function postOperation(
  handler,
  apiPath,
  dataContent,
  apiRoute,
  domain = API_ENDPOINT,
) {
  return new Promise((resolve, reject) => {
    handler
      .post(domain + apiPath, dataContent)
      .then((res) => {
        const data = typeof res.data.data !== 'undefined' ? res.data.data : res.data;
        resolve(data);
      })
      .catch((error) => {
        console.log(error)
        reject(error);
      });
  });
}

export const fetchData = (apiRoute, queryParams) => fetchOperation(
  httpHandler(), apiCalls[apiRoute], queryParams, apiRoute,
);

export const fetchRestData = (apiRoute, customPath, queryParams) => {
  let endPointParameterised = apiCalls[apiRoute];
  Object.keys(customPath.params).forEach((a) => {
    endPointParameterised = endPointParameterised.replace(
      `:${a}`,
      customPath.params[a],
    );
  });
  return fetchOperation(
    httpHandler(),
    endPointParameterised,
    queryParams,
    apiRoute,
  );
};

export const fetchDataWithXcsrf = (apiRoute, dataContent) => fetchOperation(
  httpXcsrfHandler(), apiCalls[apiRoute], dataContent, apiRoute,
);

export const fetchRestDataWithXcsrf = (apiRoute, customPath, queryParams) => {
  let endPointParameterised = apiCalls[apiRoute];
  Object.keys(customPath.params).forEach((a) => {
    endPointParameterised = endPointParameterised.replace(
      `:${a}`,
      customPath.params[a],
    );
  });
  return fetchOperation(
    httpXcsrfHandler(),
    endPointParameterised,
    queryParams,
    apiRoute,
  );
};

export const postDataWithXcsrf = (apiRoute, dataContent) => postOperation(
  httpXcsrfHandler(), apiCalls[apiRoute], dataContent, apiRoute,
);

export const postData = (apiRoute, dataContent) => postOperation(
  httpHandler(), apiCalls[apiRoute], dataContent, apiRoute,
);
