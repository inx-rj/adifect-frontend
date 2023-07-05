import { setQueryParams } from "helper/utility/customFunctions";
import axiosPrivate from "../../api/axios";

class HelpApiClientCls {
  //fetch company list
  fetchHelpList = (filters: any, endpoint: string) =>
    axiosPrivate.get(endpoint + setQueryParams(filters));

  //fetch company list
  addHelp = (data, endpoint: string) =>
    axiosPrivate.post(`${endpoint}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

  //fetch company list
    getParticularHelpDetails = (id:string, endpoint: string) =>
    axiosPrivate.get(`${endpoint}${id}/`);

  //chat
  addChat = (data, endpoint: string) =>
  axiosPrivate.post(`${endpoint}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

const HelpApiClient = new HelpApiClientCls();

export default HelpApiClient;
